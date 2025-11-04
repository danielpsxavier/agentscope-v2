-- Create a new storage bucket named 'avatars' for user profile pictures.
-- The bucket is marked as public to allow direct URL access to images.
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- RLS Policies for the 'avatars' bucket
-- Drop existing policies to ensure a clean state
DROP POLICY IF EXISTS "Avatar images are publicly accessible." ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload their own avatar." ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own avatar." ON storage.objects;

-- Allow public read access to all objects in the 'avatars' bucket.
CREATE POLICY "Avatar images are publicly accessible."
  ON storage.objects FOR SELECT
  USING ( bucket_id = 'avatars' );

-- Allow authenticated users to upload files into a folder named with their own user ID.
-- This prevents users from uploading files into other users' folders.
CREATE POLICY "Authenticated users can upload their own avatar."
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK ( bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1] );

-- Allow users to update files within their own user ID folder.
CREATE POLICY "Users can update their own avatar."
  ON storage.objects FOR UPDATE
  TO authenticated
  USING ( auth.uid()::text = (storage.foldername(name))[1] );

