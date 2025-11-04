-- This script seeds a profile for the admin user 'dani.sperche@gmail.com'.
-- It finds the user's ID from auth.users and inserts a corresponding record into public.profiles.
-- The ON CONFLICT clause makes the script safe to re-run without creating duplicate profiles.
INSERT INTO public.profiles (id, full_name, avatar_url, bio)
SELECT id, 'Daniel Xavier', 'https://img.usecurling.com/ppl/medium?gender=male&seed=1', 'Administrator of AgentScope.'
FROM auth.users
WHERE email = 'dani.sperche@gmail.com'
ON CONFLICT (id) DO NOTHING;
