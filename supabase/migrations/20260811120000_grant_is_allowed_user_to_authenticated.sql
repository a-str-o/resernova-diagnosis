-- Grant EXECUTE on the helper functions used by RLS policies to the
-- authenticated role. The previous migration revoked EXECUTE from
-- anon, authenticated, and PUBLIC, which means even SECURITY DEFINER
-- functions can't be called by the role evaluating the policy, so
-- every UPDATE/DELETE on `diagnostics` returned 403 with
-- "permission denied for function is_allowed_user".
--
-- RLS policies still gate the actual rows — granting EXECUTE here
-- only lets the policy check run; the function itself just compares
-- the caller's email against the allow-list constant.

GRANT EXECUTE ON FUNCTION public.is_allowed_user()  TO authenticated;
GRANT EXECUTE ON FUNCTION public.current_user_email() TO authenticated;
