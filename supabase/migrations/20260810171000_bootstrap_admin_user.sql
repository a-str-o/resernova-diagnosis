-- =====================================================================
-- Bootstrap the staff auth account.
-- Run this ONCE in the Supabase SQL Editor.
--
-- Alternative: create the user from the dashboard
-- (Authentication → Users → Add user → Create new user → Auto Confirm User)
-- — that path is schema-version-agnostic.
-- =====================================================================

INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_current,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'younes@gmail.com',
  crypt('ReserNova#2026', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now(),
  '',
  '',
  '',
  ''
)
ON CONFLICT (email) DO NOTHING;
