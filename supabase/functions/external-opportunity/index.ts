import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Use the Service Role Key to perform admin actions
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    const body = await req.json()
    const { client_name_on_mapping, ...mappingData } = body

    if (!client_name_on_mapping) {
      throw new Error('O nome do cliente é obrigatório.')
    }

    // 1. Find or create client
    let { data: client, error: findError } = await supabaseAdmin
      .from('clients')
      .select('id')
      .eq('name', client_name_on_mapping)
      .single()

    // PGRST116 means no rows found, which is not an error in this case.
    if (findError && findError.code !== 'PGRST116') {
      throw findError
    }

    let clientId: number
    if (client) {
      clientId = client.id
    } else {
      const { data: newClient, error: createError } = await supabaseAdmin
        .from('clients')
        .insert({
          name: client_name_on_mapping,
          potential_status: 'Baixo', // Default value
          trend_status: 'Baixa', // Default value
          department: mappingData.department_on_mapping || null,
          responsible: mappingData.responsible_on_mapping || null,
          operation_size: mappingData.operation_size_on_mapping || null,
          digital_maturity: mappingData.digital_maturity_on_mapping || null,
          main_systems: mappingData.main_systems_on_mapping || null,
        })
        .select('id')
        .single()

      if (createError || !newClient) {
        throw createError || new Error('Falha ao criar novo cliente.')
      }
      clientId = newClient.id
    }

    // 2. Create opportunity mapping
    const { error: mappingError } = await supabaseAdmin
      .from('opportunity_mappings')
      .insert({
        ...mappingData,
        client_id: clientId,
        client_name_on_mapping,
      })

    if (mappingError) {
      throw mappingError
    }

    return new Response(
      JSON.stringify({ message: 'Oportunidade criada com sucesso.' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 201,
      },
    )
  } catch (error) {
    console.error('Erro na função external-opportunity:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
