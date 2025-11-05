-- This migration updates the user_profiles view to include the updated_at column from the profiles table.
-- It ensures a comprehensive view of user data by joining authentication and profile information.
CREATE OR REPLACE VIEW public.user_profiles AS
SELECT
  u.id,
  u.email,
  u.created_at,
  p.full_name,
  p.avatar_url,
  p.updated_at
FROM
  auth.users u
LEFT JOIN
  public.profiles p ON u.id = p.id;

-- Grant usage permissions to the authenticated role to ensure frontend can query the view.
GRANT SELECT ON public.user_profiles TO authenticated;
