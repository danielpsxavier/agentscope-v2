-- Recreate the view that joins user authentication data with profile data.
CREATE OR REPLACE VIEW public.user_profiles AS
SELECT
  u.id,
  u.email,
  u.created_at,
  p.full_name,
  p.avatar_url
FROM
  auth.users u
LEFT JOIN
  public.profiles p ON u.id = p.id;

-- Grant usage permissions to the authenticated role
GRANT SELECT ON public.user_profiles TO authenticated;
