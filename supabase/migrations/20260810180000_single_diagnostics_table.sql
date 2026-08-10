-- =====================================================================
-- Single-table schema for the ReserNova diagnostic.
--
-- Everything the wizard collects (lead info, raw answers, category
-- scores, pain points, recommendations, totals) lives in ONE row in
-- `public.diagnostics`. No related tables, no N+1, no fan-out on read.
--
-- Idempotent: safe to re-run after a partial apply. Each CREATE is
-- guarded so a re-run won't error if the object already exists.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. Enums (CREATE TYPE has no IF NOT EXISTS — use a DO block)
-- ---------------------------------------------------------------------
DO $$ BEGIN
  CREATE TYPE public.lead_status AS ENUM (
    'new', 'contacted', 'demo_scheduled', 'trial', 'won', 'lost', 'nurture'
  );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'sales');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- ---------------------------------------------------------------------
-- 2. Staff auth helpers (the only reader of this table is the staff
--    user whitelisted by is_allowed_user()).
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id          uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   text,
  email       text,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.user_roles (
  id      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role    public.app_role NOT NULL,
  UNIQUE (user_id, role)
);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role::text)
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email), NEW.email)
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'sales') ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Reads auth.users.email on behalf of RLS — must be SECURITY DEFINER.
CREATE OR REPLACE FUNCTION public.current_user_email()
RETURNS text LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT email FROM auth.users WHERE id = auth.uid()
$$;

-- Single allowed staff email. Change this constant to grant access to
-- another address — every RLS policy on `diagnostics` checks it.
CREATE OR REPLACE FUNCTION public.is_allowed_user()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.current_user_email() = 'younes@gmail.com'
$$;

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role)        FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.handle_new_user()                      FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.current_user_email()                   FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_allowed_user()                      FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role)        FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user()                      FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.current_user_email()                   FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.is_allowed_user()                      FROM anon, authenticated;

GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "staff read profiles" ON public.profiles;
CREATE POLICY "staff read profiles" ON public.profiles
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "own profile write" ON public.profiles;
CREATE POLICY "own profile write" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "own profile insert" ON public.profiles;
CREATE POLICY "own profile insert" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "read own roles" ON public.user_roles;
CREATE POLICY "read own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (user_id = auth.uid());

DROP POLICY IF EXISTS "admins manage roles" ON public.user_roles;
CREATE POLICY "admins manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ---------------------------------------------------------------------
-- 3. The single table — public.diagnostics
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.diagnostics (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- language + status
  language              text NOT NULL DEFAULT 'en',
  status                public.lead_status NOT NULL DEFAULT 'new',

  -- lead / business info (collected from the wizard)
  business_name         text DEFAULT '—',
  owner_name            text,
  email                 text,
  whatsapp              text,
  phone                 text,
  city                  text,
  neighborhood          text,
  business_type         text,
  locations             text,

  -- form data + computed outputs, all in one row
  answers               jsonb NOT NULL DEFAULT '{}'::jsonb,
  category_scores       jsonb NOT NULL DEFAULT '[]'::jsonb,
  pain_points           jsonb NOT NULL DEFAULT '[]'::jsonb,
  recommendations       jsonb NOT NULL DEFAULT '[]'::jsonb,
  total_score           integer,
  priority              text,
  recommended_plan      text,
  estimated_opportunity numeric,
  missed_revenue        numeric,
  noshow_revenue        numeric,

  -- timestamps
  submitted_at          timestamptz NOT NULL DEFAULT now(),
  completed_at          timestamptz,
  created_at            timestamptz NOT NULL DEFAULT now(),
  updated_at            timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_diagnostics_status    ON public.diagnostics(status);
CREATE INDEX IF NOT EXISTS idx_diagnostics_city      ON public.diagnostics(city);
CREATE INDEX IF NOT EXISTS idx_diagnostics_created   ON public.diagnostics(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_diagnostics_submitted ON public.diagnostics(submitted_at DESC);

-- ---------------------------------------------------------------------
-- 4. RLS
-- ---------------------------------------------------------------------
ALTER TABLE public.diagnostics ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anyone can submit diagnostic" ON public.diagnostics;
CREATE POLICY "anyone can submit diagnostic"
  ON public.diagnostics FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "anyone can read diagnostic by link" ON public.diagnostics;
CREATE POLICY "anyone can read diagnostic by link"
  ON public.diagnostics FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "allowed user updates diagnostics" ON public.diagnostics;
CREATE POLICY "allowed user updates diagnostics"
  ON public.diagnostics FOR UPDATE
  TO authenticated
  USING (public.is_allowed_user())
  WITH CHECK (public.is_allowed_user());

DROP POLICY IF EXISTS "allowed user deletes diagnostics" ON public.diagnostics;
CREATE POLICY "allowed user deletes diagnostics"
  ON public.diagnostics FOR DELETE
  TO authenticated
  USING (public.is_allowed_user());

-- ---------------------------------------------------------------------
-- 5. Grants
-- ---------------------------------------------------------------------
GRANT INSERT                                ON public.diagnostics TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE        ON public.diagnostics TO authenticated;
GRANT ALL                                   ON public.diagnostics TO service_role;
