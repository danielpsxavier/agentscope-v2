import { supabase } from '@/lib/supabase/client'
import { UserProfile } from '@/types'
import { NewUserData } from '@/schemas/userSchema'

/**
 * Fetches all user profiles from the user_profiles view.
 * @returns An object containing an array of user profiles or null, and any potential error.
 */
export const getUsers = async (): Promise<{
  data: UserProfile[] | null
  error: any
}> => {
  const { data, error } = await supabase.from('user_profiles').select('*')
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
