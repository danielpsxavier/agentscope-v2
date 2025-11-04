-- Enable pgcrypto extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Insert the admin user with a hashed password.
-- NOTE: For the login to function correctly, a corresponding user must also be created
-- in Supabase's `auth.users` table with the email 'dani.sperche@gmail.com' and password 'Daniel123'.
-- This SQL script only seeds the `public.users` table as per the user story's text.
INSERT INTO public.users (username, email, password_hash)
VALUES (
  'Daniel Xavier',
  'dani.sperche@gmail.com',
  crypt('Daniel123', gen_salt('bf'))
)
ON CONFLICT (email) DO NOTHING;
