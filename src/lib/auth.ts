import { supabase } from "@/integrations/supabase/client";

/**
 * The single staff email allowed past the RLS gate. Mirrors the
 * `is_allowed_user()` Postgres function in the migration. Keep them in
 * sync — the SQL is the source of truth, this is a UX shortcut.
 */
export const ALLOWED_EMAIL = "younes@gmail.com";

export type SignInResult = { ok: true } | { ok: false; message: string };

/**
 * Password sign-in. The matching account must already exist in
 * `auth.users` (create it from the Supabase dashboard before first use).
 * Returns `{ ok: false }` if the email doesn't match ALLOWED_EMAIL so
 * we never even attempt the network round-trip for the wrong account.
 */
export async function signInWithPassword(email: string, password: string): Promise<SignInResult> {
  const normalized = email.trim().toLowerCase();
  if (normalized !== ALLOWED_EMAIL.toLowerCase()) {
    return { ok: false, message: "This account is not authorized to access the admin panel." };
  }

  const { error } = await supabase.auth.signInWithPassword({ email: normalized, password });
  if (error) return { ok: false, message: error.message };
  return { ok: true };
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export function isAllowedEmail(email: string | null | undefined): boolean {
  return !!email && email.toLowerCase() === ALLOWED_EMAIL.toLowerCase();
}

/**
 * Subscribe to auth changes. Returns an unsubscribe function.
 */
export function onAuthChange(cb: (userEmail: string | null) => void): () => void {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    cb(session?.user?.email ?? null);
  });
  return () => data.subscription.unsubscribe();
}
