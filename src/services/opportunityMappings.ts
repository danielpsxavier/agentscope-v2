import { supabase } from '@/lib/supabase/client'
import { TablesInsert } from '@/lib/supabase/types'
import { OpportunityMappingData } from '@/schemas/opportunityMappingSchema'
import { findClientByName, createClient } from './clients'

/**
 * Creates an opportunity mapping, ensuring the associated client exists.
 * If the client does not exist, it creates one first.
 * @param formData - The data from the opportunity mapping form.
 * @returns An object containing the created mapping data or null, and any potential error.
 */
export const createOpportunityMappingWithClientCheck = async (
  formData: OpportunityMappingData,
) => {
  // 1. Check if client exists by name
  const { data: existingClient, error: findError } = await findClientByName(
    formData.clientName,
  )

  if (findError) {
    console.error('Error finding client:', findError)
    return { data: null, error: findError }
  }

  let clientId: number

  if (existingClient) {
    // 2a. Use existing client's ID
    clientId = existingClient.id
  } else {
    // 2b. Create a new client if it doesn't exist
    const newClientPayload: TablesInsert<'clients'> = {
      name: formData.clientName,
      department: formData.department,
      responsible: formData.areaManager,
      operation_size: formData.operationSize,
      digital_maturity: formData.digitalMaturity,
      main_systems: formData.mainSystems,
      potential_status: 'Baixo', // Default as per acceptance criteria
      trend_status: 'Baixa', // Default as per acceptance criteria
    }

    const { data: newClient, error: createClientError } =
      await createClient(newClientPayload)

    if (createClientError || !newClient) {
      console.error('Error creating client:', createClientError)
      return { data: null, error: createClientError }
    }
    clientId = newClient.id
  }

  // 3. Prepare and insert the opportunity mapping with the correct client_id
  const mappingPayload: TablesInsert<'opportunity_mappings'> = {
    client_id: clientId,
    client_name_on_mapping: formData.clientName,
    department_on_mapping: formData.department,
    responsible_on_mapping: formData.areaManager,
    operation_size_on_mapping: formData.operationSize,
    digital_maturity_on_mapping: formData.digitalMaturity,
    main_systems_on_mapping: formData.mainSystems,
    business_objective: formData.businessObjective,
    repetitive_tasks: formData.repetitiveTasks,
    email_spreadsheet_activities: formData.emailSpreadsheetActivities,
    bottlenecks: formData.bottlenecks,
    critical_systems: formData.criticalSystems,
    client_interest_level: (() => {
      switch (formData.clientInterestLevel) {
        case 'Muito Alto':
        case 'Alto':
          return 'Alto'
        case 'Médio':
          return 'Medio'
        case 'Baixo':
          return 'Baixo'
        default:
          return 'Medio'
      }
    })(),
  }

  const { data, error } = await supabase
    .from('opportunity_mappings')
    .insert([mappingPayload])
    .select()
    .single()

  return { data, error }
}

// The old function is now replaced by the more comprehensive one above.
// To keep the file clean, we remove the old one.
export const createOpportunityMapping = async (
  mappingData: TablesInsert<'opportunity_mappings'>,
) => {
  console.warn(
    'createOpportunityMapping is deprecated. Use createOpportunityMappingWithClientCheck instead.',
  )
  const { data, error } = await supabase
    .from('opportunity_mappings')
    .insert([mappingData])
    .select()
    .single()

  return { data, error }
}
