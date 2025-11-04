import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

// Mock function to simulate an AI analysis call
const analyzeWithAI = async (mapping: any) => {
  // Simulate network delay for realism
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const pains = [
    mapping.repetitive_tasks,
    mapping.email_spreadsheet_activities,
    mapping.bottlenecks,
  ]
    .filter(Boolean)
    .join(', ')

  return {
    maturity_level:
      mapping.digital_maturity_on_mapping === 'Alto'
        ? 'Avançado'
        : 'Intermediário',
    main_pains: `Principais dores: ${
      pains ||
      'Nenhuma dor explícita, mas há oportunidade de otimização de processos.'
    }`,
    agent_ideas: [
      {
        agent_name: `Agente Otimizador para ${mapping.department_on_mapping}`,
        description: `Um agente inteligente para automatizar tarefas repetitivas no departamento de ${mapping.department_on_mapping}, focado em ${mapping.business_objective}.`,
        key_features: JSON.stringify([
          `Integração com ${mapping.main_systems_on_mapping}`,
          'Processamento de e-mails e planilhas',
          'Geração de relatórios automáticos',
        ]),
        expected_benefits: JSON.stringify([
          'Redução de 30% no tempo de tarefas manuais',
          'Aumento da precisão dos dados',
          'Liberação da equipe para atividades estratégicas',
        ]),
        complexity: 'Media',
      },
      {
        agent_name: `Assistente de Dados de ${mapping.client_name_on_mapping}`,
        description: `Um assistente para responder a consultas e executar ações simples dentro dos sistemas críticos como ${mapping.critical_systems}.`,
        key_features: JSON.stringify([
          'Processamento de Linguagem Natural (PLN)',
          'Execução de comandos via chat',
          'Consulta de dados em tempo real',
        ]),
        expected_benefits: JSON.stringify([
          'Respostas mais rápidas para a equipe',
          'Disponibilidade 24/7 para consultas',
          'Redução da carga sobre o time de suporte interno',
        ]),
        complexity: 'Alta',
      },
    ],
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      },
    )

    const { data: analyses, error: analysesError } = await supabaseClient
      .from('ai_analyses')
      .select('*, opportunity_mappings(*)')
      .eq('processed', false)

    if (analysesError) throw analysesError

    if (!analyses || analyses.length === 0) {
      return new Response(
        JSON.stringify({ message: 'Nenhuma análise pendente encontrada.' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      )
    }

    for (const analysis of analyses) {
      if (!analysis.opportunity_mappings) continue

      const aiResult = await analyzeWithAI(analysis.opportunity_mappings)

      const { error: updateError } = await supabaseClient
        .from('ai_analyses')
        .update({
          processed: true,
          maturity_level: aiResult.maturity_level,
          main_pains: aiResult.main_pains,
        })
        .eq('id', analysis.id)

      if (updateError) {
        console.error(`Error updating analysis ${analysis.id}:`, updateError)
        continue
      }

      const ideasToInsert = aiResult.agent_ideas.map((idea) => ({
        ai_analysis_id: analysis.id,
        agent_name: idea.agent_name,
        description: idea.description,
        key_features: idea.key_features,
        expected_benefits: idea.expected_benefits,
        complexity: idea.complexity,
        status: 'Rascunho',
      }))

      const { error: insertError } = await supabaseClient
        .from('agent_ideas')
        .insert(ideasToInsert)

      if (insertError) {
        console.error(
          `Error inserting agent ideas for analysis ${analysis.id}:`,
          insertError,
        )
      }
    }

    return new Response(
      JSON.stringify({
        message: `${analyses.length} análises processadas com sucesso.`,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
