export type Client = {
  id: string
  name: string
  department: string
  leads: number
  status: 'Alto' | 'Médio' | 'Baixo'
  trend: 'Alta' | 'Média' | 'Baixa'
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
