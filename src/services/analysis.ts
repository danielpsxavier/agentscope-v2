import { supabase } from '@/lib/supabase/client'
import { AgentIdea, AgentIdeasSummary } from '@/types'
import { AgentIdeaData } from '@/schemas/agentIdeaSchema'

/**
 * Invokes the Supabase Edge Function to process pending AI analyses.
 * @returns An object containing the function response data and any potential error.
 */
export const invokeAnalysisFunction = async () => {
  const { data, error } = await supabase.functions.invoke(
    'analyze-ai-analyses',
    {
      method: 'POST',
    },
  )
  return { data, error }
}

/**
 * Fetches agent ideas from the database, with optional status filtering.
 * @param statuses - An optional array of statuses to filter by.
 * @returns An object containing an array of agent ideas or null, and any potential error.
 */
export const getAgentIdeas = async (
  statuses?: string[],
): Promise<{
  data: AgentIdea[] | null
  error: any
}> => {
  let query = supabase
    .from('agent_ideas')
    .select(
      `
      *,
      ai_analyses (
        opportunity_mappings (
          client_name_on_mapping,
          department_on_mapping
        )
      )
    `,
    )
    .order('created_at', { ascending: false })

  if (statuses && statuses.length > 0) {
    query = query.in('status', statuses)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching agent ideas:', error)
    return { data: null, error }
  }

  return { data: data as AgentIdea[], error: null }
}

/**
 * Fetches agent ideas for a specific client.
 * @param clientId - The ID of the client.
 * @returns An object containing an array of agent ideas or null, and any potential error.
 */
export const getAgentIdeasByClientId = async (
  clientId: number,
): Promise<{
  data: AgentIdea[] | null
  error: any
}> => {
  const { data, error } = await supabase
    .from('agent_ideas')
    .select(
      `
      *,
      ai_analyses!inner(
        opportunity_mappings!inner(
          client_id,
          client_name_on_mapping,
          department_on_mapping
        )
      )
    `,
    )
    .eq('ai_analyses.opportunity_mappings.client_id', clientId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error(`Error fetching agent ideas for client ${clientId}:`, error)
    return { data: null, error }
  }

  return { data: data as AgentIdea[], error: null }
}

/**
 * Fetches a summary of agent ideas counts by status.
 * @returns An object containing the summary data or null, and any potential error.
 */
export const getAgentIdeasSummary = async (): Promise<{
  data: AgentIdeasSummary | null
  error: any
}> => {
  try {
    const [totalRes, draftRes, approvedRes, rejectedRes, implementedRes] =
      await Promise.all([
        supabase
          .from('agent_ideas')
          .select('*', { count: 'exact', head: true }),
        supabase
          .from('agent_ideas')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'Rascunho'),
        supabase
          .from('agent_ideas')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'Aprovado'),
        supabase
          .from('agent_ideas')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'Rejeitado'),
        supabase
          .from('agent_ideas')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'Implementado'),
      ])

    if (totalRes.error) throw totalRes.error
    if (draftRes.error) throw draftRes.error
    if (approvedRes.error) throw approvedRes.error
    if (rejectedRes.error) throw rejectedRes.error
    if (implementedRes.error) throw implementedRes.error

    const summary: AgentIdeasSummary = {
      total: totalRes.count ?? 0,
      draft: draftRes.count ?? 0,
      approved: approvedRes.count ?? 0,
      rejected: rejectedRes.count ?? 0,
      implemented: implementedRes.count ?? 0,
    }

    return { data: summary, error: null }
  } catch (error) {
    console.error('Error fetching agent ideas summary:', error)
    return { data: null, error }
  }
}

/**
 * Updates an existing agent idea in the database.
 * @param ideaData - The data to update, including the idea ID.
 * @returns An object containing the updated agent idea data or null, and any potential error.
 */
export const updateAgentIdea = async (
  ideaData: AgentIdeaData,
): Promise<{ data: AgentIdea | null; error: any }> => {
  const { id, ...updateData } = ideaData

  const { data, error } = await supabase
    .from('agent_ideas')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error(`Error updating agent idea ${id}:`, error)
    return { data: null, error }
  }

  return { data: data as AgentIdea, error: null }
}
