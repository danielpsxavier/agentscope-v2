-- Enable necessary extensions for UUID generation and password encryption.
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- This script seeds an admin user into the Supabase authentication system.
-- User: dani.sperche@gmail.com
-- Password: Daniel123
-- This approach is for development/seeding and not recommended for production user management.

DO $$
DECLARE
    user_id UUID;
    user_email TEXT := 'dani.sperche@gmail.com';
    user_password TEXT := 'Daniel123';
BEGIN
    -- Check if the user already exists in the auth.users table to avoid duplicates.
    SELECT id INTO user_id FROM auth.users WHERE email = user_email;

    -- If the user does not exist, proceed with creating the user and their identity.
    IF user_id IS NULL THEN
        -- Generate a new UUID for the user.
        user_id := uuid_generate_v4();

        -- Insert the new user into the auth.users table.
        -- The password is encrypted using bcrypt ('bf').
        -- The email is marked as confirmed immediately.
        INSERT INTO auth.users (id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
        VALUES
        (
            user_id,
            'authenticated',
            'authenticated',
            user_email,
            crypt(user_password, gen_salt('bf')),
            NOW(),
            '{"provider":"email","providers":["email"]}',
            '{}',
            NOW(),
            NOW()
        );

        -- Insert a corresponding entry into the auth.identities table.
        -- This links the user record to the email identity provider.
        INSERT INTO auth.identities (id, user_id, identity_data, provider, created_at, updated_at)
        VALUES
        (
            uuid_generate_v4(),
            user_id,
            jsonb_build_object('sub', user_id::text, 'email', user_email),
            'email',
            NOW(),
            NOW()
        );
    END IF;
END $$;
