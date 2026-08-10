
CREATE TYPE public.app_role AS ENUM ('admin','sales');
CREATE TYPE public.lead_status AS ENUM ('new','contacted','demo_scheduled','trial','won','lost','nurture');

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  email text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "staff read profiles" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "own profile write" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "own profile insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "read own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "admins manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

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
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TABLE public.diagnostics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  language text NOT NULL DEFAULT 'en',
  status text NOT NULL DEFAULT 'in_progress',
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  total_score integer,
  priority text,
  recommended_plan text,
  estimated_opportunity numeric,
  missed_revenue numeric,
  noshow_revenue numeric,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz
);
GRANT SELECT, INSERT, UPDATE ON public.diagnostics TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.diagnostics TO authenticated;
GRANT ALL ON public.diagnostics TO service_role;
ALTER TABLE public.diagnostics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can create diagnostic" ON public.diagnostics FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anyone can read diagnostic by link" ON public.diagnostics FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anyone can update own diagnostic session" ON public.diagnostics FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

CREATE TABLE public.diagnostic_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  diagnostic_id uuid NOT NULL REFERENCES public.diagnostics(id) ON DELETE CASCADE,
  question_id text NOT NULL,
  answer jsonb,
  language text NOT NULL DEFAULT 'en',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (diagnostic_id, question_id)
);
GRANT SELECT, INSERT, UPDATE ON public.diagnostic_answers TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.diagnostic_answers TO authenticated;
GRANT ALL ON public.diagnostic_answers TO service_role;
ALTER TABLE public.diagnostic_answers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can write answers" ON public.diagnostic_answers FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anyone can update answers" ON public.diagnostic_answers FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "staff read answers" ON public.diagnostic_answers FOR SELECT TO authenticated USING (true);

CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  diagnostic_id uuid NOT NULL REFERENCES public.diagnostics(id) ON DELETE CASCADE,
  business_name text NOT NULL,
  owner_name text,
  phone text,
  whatsapp text,
  email text,
  city text,
  neighborhood text,
  business_type text,
  locations text,
  status public.lead_status NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.leads TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can submit lead" ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "staff read leads" ON public.leads FOR SELECT TO authenticated USING (true);
CREATE POLICY "staff update leads" ON public.leads FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE TABLE public.lead_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  diagnostic_id uuid NOT NULL REFERENCES public.diagnostics(id) ON DELETE CASCADE,
  category text NOT NULL,
  score integer NOT NULL,
  max_score integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.lead_scores TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.lead_scores TO authenticated;
GRANT ALL ON public.lead_scores TO service_role;
ALTER TABLE public.lead_scores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can write scores" ON public.lead_scores FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "staff read scores" ON public.lead_scores FOR SELECT TO authenticated USING (true);

CREATE TABLE public.pain_points (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  diagnostic_id uuid NOT NULL REFERENCES public.diagnostics(id) ON DELETE CASCADE,
  key text NOT NULL,
  severity text NOT NULL,
  recommended_product text,
  estimated_impact numeric,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.pain_points TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.pain_points TO authenticated;
GRANT ALL ON public.pain_points TO service_role;
ALTER TABLE public.pain_points ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can write pains" ON public.pain_points FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "staff read pains" ON public.pain_points FOR SELECT TO authenticated USING (true);

CREATE TABLE public.recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  diagnostic_id uuid NOT NULL REFERENCES public.diagnostics(id) ON DELETE CASCADE,
  product text NOT NULL,
  priority text NOT NULL,
  rank integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.recommendations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.recommendations TO authenticated;
GRANT ALL ON public.recommendations TO service_role;
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can write recos" ON public.recommendations FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "staff read recos" ON public.recommendations FOR SELECT TO authenticated USING (true);

CREATE TABLE public.sales_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  diagnostic_id uuid NOT NULL REFERENCES public.diagnostics(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  note text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sales_notes TO authenticated;
GRANT ALL ON public.sales_notes TO service_role;
ALTER TABLE public.sales_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "staff read notes" ON public.sales_notes FOR SELECT TO authenticated USING (true);
CREATE POLICY "staff write own notes" ON public.sales_notes FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "staff edit own notes" ON public.sales_notes FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "staff delete own notes" ON public.sales_notes FOR DELETE TO authenticated USING (user_id = auth.uid());

CREATE INDEX idx_leads_diag ON public.leads(diagnostic_id);
CREATE INDEX idx_answers_diag ON public.diagnostic_answers(diagnostic_id);
