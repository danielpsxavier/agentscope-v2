import { supabase } from '@/lib/supabase/client'
import { AgentIdea } from '@/types'

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
 * Fetches all agent ideas from the database, joining related client information.
 * @returns An object containing an array of agent ideas or null, and any potential error.
 */
export const getAgentIdeas = async (): Promise<{
  data: AgentIdea[] | null
  error: any
}> => {
  const { data, error } = await supabase
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

  if (error) {
    console.error('Error fetching agent ideas:', error)
    return { data: null, error }
  }

  return { data: data as AgentIdea[], error: null }
}
