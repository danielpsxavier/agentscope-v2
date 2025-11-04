import { Tables } from '@/lib/supabase/types'

export type Client = Tables<'clients'> & {
  leads: number
}

export type AIAnalysis = {
  analise_geral: {
    nivel_maturidade: string
    principais_dores: string[]
    potencial_impacto: string
  }
  ideias_de_agents: {
    nome_agente: string
    descricao: string
    funcionalidades_chave: string[]
    beneficios_esperados: string[]
    complexidade_estimada: 'Baixa' | 'Média' | 'Alta'
    status: 'Em análise'
  }[]
}

export type AgentIdea = Tables<'agent_ideas'> & {
  ai_analyses: {
    opportunity_mappings: {
      client_name_on_mapping: string
      department_on_mapping: string | null
    } | null
  } | null
}

export type AgentIdeasSummary = {
  total: number
  draft: number
  approved: number
  rejected: number
  implemented: number
}

export type Opportunity = Tables<'ai_analyses'> & {
  opportunity_mappings: Tables<'opportunity_mappings'> | null
}

export type UserProfile = {
  id: string
  email?: string
  created_at?: string
  full_name: string | null
  avatar_url: string | null
}
