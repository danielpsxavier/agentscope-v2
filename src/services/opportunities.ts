import { supabase } from '@/lib/supabase/client'
import { Opportunity } from '@/types'

/**
 * Fetches all opportunities (AI analyses with their mappings) from the database.
 * @returns An object containing an array of opportunities or null, and any potential error.
 */
export const getOpportunities = async (): Promise<{
  data: Opportunity[] | null
  error: any
}> => {
  const { data, error } = await supabase
    .from('ai_analyses')
    .select(
      `
      *,
      opportunity_mappings (
        *
      )
    `,
    )
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching opportunities:', error)
    return { data: null, error }
  }

  // Filter out analyses that don't have a mapping, as they can't be displayed.
  const validData = data.filter(
    (item) => item.opportunity_mappings,
  ) as Opportunity[]

  return { data: validData, error: null }
}
