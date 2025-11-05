import { supabase } from '@/lib/supabase/client'
import { UserProfile } from '@/types'
import { NewUserData } from '@/schemas/userSchema'

/**
 * Fetches all user profiles from the profiles table.
 * @returns An object containing an array of user profiles or null, and any potential error.
 */
export const getUsers = async (): Promise<{
  data: UserProfile[] | null
  error: any
}> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, created_at, full_name, avatar_url')
    .order('created_at', { ascending: false })

  return { data, error }
}

/**
 * Invokes the 'create-user' edge function to create a new user and their profile.
 * @param userData - The data for the new user (email, password, full_name, bio).
 * @returns An object containing the function response data and any potential error.
 */
export const createUser = async (userData: NewUserData) => {
  const { data, error } = await supabase.functions.invoke('create-user', {
    body: userData,
  })
  return { data, error }
}
