import { supabase } from '@/lib/supabase/client'
import { Tables } from '@/lib/supabase/types'

export type Profile = Tables<'profiles'>

/**
 * Fetches the profile for a given user ID.
 * @param userId - The ID of the user.
 * @returns An object containing the profile data or null, and any potential error.
 */
export const getProfileById = async (
  userId: string,
): Promise<{ data: Profile | null; error: any }> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  return { data, error }
}

/**
 * Updates a user's profile.
 * @param userId - The ID of the user whose profile is to be updated.
 * @param profileData - The data to update.
 * @returns An object containing the updated profile data or null, and any potential error.
 */
export const updateProfile = async (
  userId: string,
  profileData: Partial<Profile>,
): Promise<{ data: Profile | null; error: any }> => {
  const { data, error } = await supabase
    .from('profiles')
    .update(profileData)
    .eq('id', userId)
    .select()
    .single()

  return { data, error }
}
