-- Create the profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Add comments to the table and columns
COMMENT ON TABLE public.profiles IS 'Stores user profile information, linked to auth.users.';
COMMENT ON COLUMN public.profiles.id IS 'Links to auth.users.id';

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles table
-- 1. Allow users to read their own profile
CREATE POLICY "Users can view their own profile."
  ON public.profiles FOR SELECT
  USING ( auth.uid() = id );

-- 2. Allow users to insert their own profile
CREATE POLICY "Users can insert their own profile."
  ON public.profiles FOR INSERT
  WITH CHECK ( auth.uid() = id );

-- 3. Allow users to update their own profile
CREATE POLICY "Users can update their own profile."
  ON public.profiles FOR UPDATE
  USING ( auth.uid() = id );
