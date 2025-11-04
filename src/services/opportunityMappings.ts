import { supabase } from '@/lib/supabase/client'
import { TablesInsert } from '@/lib/supabase/types'

export const createOpportunityMapping = async (
  mappingData: TablesInsert<'opportunity_mappings'>,
) => {
  const { data, error } = await supabase
    .from('opportunity_mappings')
    .insert([mappingData])
    .select()
    .single()

  return { data, error }
}
