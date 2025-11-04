import { supabase } from '@/lib/supabase/client'
import { Tables, TablesInsert } from '@/lib/supabase/types'
import { Client } from '@/types'

/**
 * Fetches all clients from the database along with their lead count.
 * @returns An object containing an array of clients or null, and any potential error.
 */
export const getClients = async (): Promise<{
  data: Client[] | null
  error: any
}> => {
  const { data, error } = await supabase
    .from('clients')
    .select('*, opportunity_mappings(count)')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching clients:', error)
    return { data: null, error }
  }

  const clientsWithLeads = data.map((client: any) => {
    const leadCount =
      client.opportunity_mappings && client.opportunity_mappings.length > 0
        ? client.opportunity_mappings[0].count
        : 0
    const { opportunity_mappings, ...rest } = client
    return {
      ...rest,
      leads: leadCount,
    }
  })

  return { data: clientsWithLeads, error: null }
}

/**
 * Fetches a single client by its ID along with its lead count.
 * @param id - The ID of the client to fetch.
 * @returns An object containing the client data or null, and any potential error.
 */
export const getClientById = async (
  id: number,
): Promise<{ data: Client | null; error: any }> => {
  const { data, error } = await supabase
    .from('clients')
    .select('*, opportunity_mappings(count)')
    .eq('id', id)
    .single()

  if (error) {
    console.error(`Error fetching client with id ${id}:`, error)
    return { data: null, error }
  }

  if (!data) {
    return { data: null, error: null }
  }

  const client: any = data
  const leadCount =
    client.opportunity_mappings && client.opportunity_mappings.length > 0
      ? client.opportunity_mappings[0].count
      : 0
  const { opportunity_mappings, ...rest } = client

  return {
    data: {
      ...rest,
      leads: leadCount,
    },
    error: null,
  }
}

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
