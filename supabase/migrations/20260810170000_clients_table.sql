-- =====================================================================
-- Flat clients table + auth gate.
-- One table, no foreign keys, no relationships.
-- Read access is restricted to the single allowed staff email.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. Clients table
-- ---------------------------------------------------------------------
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

CREATE INDEX idx_clients_status   ON public.clients(status);
CREATE INDEX idx_clients_city     ON public.clients(city);
CREATE INDEX idx_clients_created  ON public.clients(created_at DESC);

-- ---------------------------------------------------------------------
-- 2. Auth helpers (SECURITY DEFINER so we can read auth.users.email)
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.current_user_email()
RETURNS text LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT email FROM auth.users WHERE id = auth.uid();
$$;

-- Single allowed staff email. Change this constant to grant access
-- to another address — every RLS policy below checks this function.
CREATE OR REPLACE FUNCTION public.is_allowed_user()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.current_user_email() = 'younes@gmail.com';
$$;

REVOKE EXECUTE ON FUNCTION public.current_user_email() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_allowed_user()    FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.current_user_email() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.is_allowed_user()    FROM anon, authenticated;

-- ---------------------------------------------------------------------
-- 3. RLS
-- ---------------------------------------------------------------------
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- The public wizard inserts one row per completed diagnostic.
CREATE POLICY "anyone can submit client"
  ON public.clients FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only the allowed staff user can read the table.
CREATE POLICY "allowed user reads clients"
  ON public.clients FOR SELECT
  TO authenticated
  USING (public.is_allowed_user());

-- Only the allowed staff user can update.
CREATE POLICY "allowed user updates clients"
  ON public.clients FOR UPDATE
  TO authenticated
  USING (public.is_allowed_user())
  WITH CHECK (public.is_allowed_user());

-- Only the allowed staff user can delete.
CREATE POLICY "allowed user deletes clients"
  ON public.clients FOR DELETE
  TO authenticated
  USING (public.is_allowed_user());

-- ---------------------------------------------------------------------
-- 4. Grants
-- ---------------------------------------------------------------------
GRANT INSERT                                ON public.clients TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE        ON public.clients TO authenticated;
GRANT ALL                                   ON public.clients TO service_role;
