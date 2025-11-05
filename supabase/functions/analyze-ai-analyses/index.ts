import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'
import { generateAgentIdeas, AIResponse } from './agent.ts'

// Helper to map AI size to database enum type
const mapSizeToComplexity = (size: 'P' | 'M' | 'G') => {
  switch (size) {
    case 'P':
      return 'Baixa'
    case 'M':
      return 'Media'
    case 'G':
      return 'Alta'
    default:
      return 'Media'
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

      const aiIdeas: AIResponse[] = await generateAgentIdeas(
        analysis.opportunity_mappings,
      )

      const ideasToInsert = aiIdeas.map((idea) => ({
        ai_analysis_id: analysis.id,
        agent_name: idea.nome,
        description: idea.descricao,
        objective: idea.objetivo,
        tools: idea.tools,
        expected_benefits: idea.beneficios_esperados,
        complexity: mapSizeToComplexity(idea.tamanho),
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
        continue
      }

      const { error: updateError } = await supabaseClient
        .from('ai_analyses')
        .update({
          processed: true,
        })
        .eq('id', analysis.id)

      if (updateError) {
        console.error(
          `Error updating analysis ${analysis.id} to processed:`,
          updateError,
        )
      }
    }

    return new Response(
      JSON.stringify({
        message: `${analyses.length} ${
          analyses.length === 1 ? 'análise processada' : 'análises processadas'
        } com sucesso.`,
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
