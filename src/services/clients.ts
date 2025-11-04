import { supabase } from '@/lib/supabase/client'
import { Tables, TablesInsert } from '@/lib/supabase/types'

/**
 * Finds a client by its exact name.
 * @param name - The name of the client to find.
 * @returns An object containing the client data or null, and any potential error.
 */
export const findClientByName = async (
  name: string,
): Promise<{ data: Tables<'clients'> | null; error: any }> => {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('name', name)
    .single()

  // Supabase's .single() returns an error if no rows are found (PGRST116).
  // We want to treat "not found" as a valid case (returning null data) rather than an error.
  if (error && error.code === 'PGRST116') {
    return { data: null, error: null }
  }

  return { data, error }
}

/**
 * Creates a new client in the database.
 * @param clientData - The data for the new client.
 * @returns An object containing the newly created client data or null, and any potential error.
 */
export const createClient = async (
  clientData: TablesInsert<'clients'>,
): Promise<{ data: Tables<'clients'> | null; error: any }> => {
  const { data, error } = await supabase
    .from('clients')
    .insert(clientData)
    .select()
    .single()

  return { data, error }
}
