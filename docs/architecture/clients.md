# Clients — data & access architecture

> One "client" = one completed wizard submission. We store it in a single
> flat table with **no foreign keys, no relationships**. The public wizard
> can insert; the staff admin UI can read — but only after signing in to
> Supabase as `younes@gmail.com`.

---

## 1. Goals

- **Store**: every completed wizard submission lands as one row in the
  `clients` table.
- **See**: the staff can list every client in a sortable, filterable
  table at `/admin/clients`.
- **Fetch**: a typed helper (`listClients(...)`) returns the rows.
- **Auth**: the app requires a Supabase login. Only
  `younes@gmail.com` may access the admin surface.
- **No conflicts**: the existing tables (`diagnostics`, `leads`,
  `lead_scores`, `pain_points`, `recommendations`, `profiles`,
  `user_roles`, `sales_notes`) stay untouched. `completeDiagnostic()`
  writes to them as before *and* additionally writes the flat snapshot to
  `clients`. The public report URL (`/diagnostic/$id`) keeps working
  unchanged.

## 2. Decision: flat table, not a view

A view was considered and rejected. It would re-shape existing data
without storing anything new — useful when there is only one writer and
the data lives in normalized form. Here we want a **simple, standalone
table** that the admin UI can query directly, with no joins, no
relationships, and no dependency on the rest of the schema.

| Option | Verdict | Why |
|---|---|---|
| View over `leads` + `diagnostics` | ❌ rejected | Joins two tables on every read; couples the admin UI to the wizard schema; the user explicitly asked for a table. |
| Flat `clients` table, written to at submission time | ✅ chosen | One table, one round-trip, no FKs, no relationships. |

The price is a small redundancy: a `clients` row duplicates contact info
that already exists in `leads`. That's acceptable because:
- the wizard will only ever insert once,
- the two tables have different purposes (`leads` is a normalized piece
  of the report; `clients` is the staff listing),
- the redundancy is bounded and easy to reason about.

## 3. Schema — `public.clients`

Created in `supabase/migrations/20260810170000_clients_table.sql`.

```sql
CREATE TABLE public.clients (
  id                     uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name          text NOT NULL,
  owner_name             text,
  email                  text,
  whatsapp               text,
  phone                  text,
  city                   text,
  neighborhood           text,
  business_type          text,
  locations              text,
  status                 public.lead_status NOT NULL DEFAULT 'new',
  language               text NOT NULL DEFAULT 'en',
  total_score            integer,
  priority               text,
  recommended_plan       text,
  estimated_opportunity  numeric,
  missed_revenue         numeric,
  noshow_revenue         numeric,
  submitted_at           timestamptz,
  created_at             timestamptz NOT NULL DEFAULT now(),
  updated_at             timestamptz NOT NULL DEFAULT now()
);
```

No foreign keys. No relationships. Every column is a primitive.

Indexes:
- `idx_clients_status` on `status`
- `idx_clients_city` on `city`
- `idx_clients_created` on `created_at DESC`

## 4. Auth helpers — same migration

```sql
CREATE OR REPLACE FUNCTION public.current_user_email()
RETURNS text LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT email FROM auth.users WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.is_allowed_user()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.current_user_email() = 'younes@gmail.com';
$$;

REVOKE EXECUTE ON FUNCTION public.current_user_email() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.is_allowed_user()    FROM PUBLIC, anon, authenticated;
```

Both functions are `SECURITY DEFINER` (so they can read `auth.users`),
`STABLE`, and **revoked from everyone**. They are only ever called from
RLS policy `USING` clauses, which run with table-owner privileges.

`is_allowed_user()` is the single source of truth for "who is staff". To
grant access to a second email, change the literal in this one function
— every policy picks it up automatically.

## 5. RLS — strict, not bypassed

```sql
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Public wizard: anon can insert one row per submission.
CREATE POLICY "anyone can submit client"
  ON public.clients FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Staff only: the allowed email can read.
CREATE POLICY "allowed user reads clients"
  ON public.clients FOR SELECT TO authenticated
  USING (public.is_allowed_user());

-- Staff only: the allowed email can update.
CREATE POLICY "allowed user updates clients"
  ON public.clients FOR UPDATE TO authenticated
  USING (public.is_allowed_user()) WITH CHECK (public.is_allowed_user());

-- Staff only: the allowed email can delete.
CREATE POLICY "allowed user deletes clients"
  ON public.clients FOR DELETE TO authenticated
  USING (public.is_allowed_user());
```

Grant matrix:

| Role | SELECT | INSERT | UPDATE | DELETE |
|---|---|---|---|---|
| `anon` | ❌ | ✅ | � | ❌ |
| `authenticated` (other email) | ❌ | ✅ | � | ❌ |
| `authenticated` (`younes@gmail.com`) | ✅ | ✅ | ✅ | ✅ |
| `service_role` | ✅ (bypasses RLS) | ✅ | ✅ | ✅ |

The `service_role` bypass is intentional — server-side jobs (cron,
backfills) need it. The frontend only ever uses the `anon` and
`authenticated` clients.

## 6. App code

### 6.1 Auth — `src/lib/auth.ts`

- `ALLOWED_EMAIL` — mirrors the literal in `is_allowed_user()`.
- `signInWithPassword(email, password)` — short-circuits with an error
  if the email isn't `ALLOWED_EMAIL` (no network round-trip for the
  wrong account).
- `signOut()`, `getSession()`, `getCurrentUser()` — thin wrappers around
  `supabase.auth`.
- `isAllowedEmail(email)` — client-side mirror of the SQL predicate.
- `onAuthChange(cb)` — subscribe to login/logout events.

### 6.2 Login route — `src/routes/login.tsx`

- Path: `/login`.
- Form: email (pre-filled with `ALLOWED_EMAIL`) + password.
- On submit: `signInWithPassword`. On success → `/admin/clients`.
- Already-signed-in users are bounced straight to `/admin/clients`.

### 6.3 Admin gate — `src/routes/admin.clients.tsx`

`beforeLoad` runs before the component renders:

```ts
beforeLoad: async () => {
  const session = await getSession();
  if (!session) throw redirect({ to: "/login" });
  if (!isAllowedEmail(session.user.email)) {
    await signOut();
    throw redirect({ to: "/login" });
  }
}
```

The route renders the clients table. Filters: search (business/owner),
status, city, sort column, sort direction.

### 6.4 Reads — `src/lib/clients-api.ts`

```ts
listClients({ search, status, city, sort, order, limit }) → ClientRow[]
fetchClient(id) → ClientRow | null
```

Single round-trip via `supabase.from("clients").select("*")`. Returns
`[]` / `null` on error and logs — listing endpoints don't 500.

### 6.5 Writes — `src/lib/diagnostic-api.ts`

`completeDiagnostic()` now writes the flat snapshot **in addition to**
the existing `diagnostics` + `leads` writes. The two paths are
independent:

```
public wizard → supabase.from("diagnostics").insert(...)
              → supabase.from("diagnostic_answers").upsert(...)
              → supabase.from("leads").insert(...)            [unchanged]
              → supabase.from("clients").insert(...)           [NEW — flat snapshot]
              → supabase.from("lead_scores").insert(...)
              → supabase.from("pain_points").insert(...)
              → supabase.from("recommendations").insert(...)
```

The public report URL keeps reading from `diagnostics`; the staff UI
reads from `clients`. Same submission, two destinations.

## 7. Roll-out order

1. Apply this doc as the source of truth.
2. Apply the new migration to the remote Supabase project:
   ```bash
   supabase db push
   ```
3. Create the auth account in the Supabase dashboard
   (Authentication → Users → Add user → `younes@gmail.com`).
4. (Optional) regenerate types so the hand-written `clients` block in
   `src/integrations/supabase/types.ts` is replaced by the auto-generated
   version:
   ```bash
   supabase gen types typescript --project-id nyklicnkviumwegwgguh > src/integrations/supabase/types.ts
   ```
5. Visit `/login`, sign in, land on `/admin/clients`.

Because the new table is independent, no ordering constraint with prior
migrations. The existing data (diagnostics, leads) is untouched.

---

## TL;DR

One new flat table. No foreign keys, no relationships. Public wizard
inserts anonymously. Staff reads after signing in to Supabase — and only
`younes@gmail.com` passes the RLS gate. Everything else
(diagnostics, leads, report URL) keeps working unchanged.
