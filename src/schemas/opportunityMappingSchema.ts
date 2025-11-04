import { z } from 'zod'

export const opportunityMappingSchema = z.object({
  // Section 1
  clientName: z.string().min(1, 'Nome do cliente é obrigatório'),
  department: z.string().min(1, 'Área / Departamento é obrigatório'),
  areaManager: z.string().min(1, 'Responsável da área é obrigatório'),
  operationSize: z.enum(['Pequena', 'Média', 'Grande']),
  digitalMaturity: z.enum(['Baixo', 'Médio', 'Alto']),
  mainSystems: z.string().min(1, 'Sistemas principais são obrigatórios'),

  // Section 2
  businessObjective: z.string().min(1, 'Objetivo de negócio é obrigatório'),
  repetitiveTasks: z.string().optional(),
  experienceBasedDecisions: z.string().optional(),
  emailSpreadsheetActivities: z.string().optional(),
  bottlenecks: z.string().optional(),
  multipleDataSources: z.string().optional(),

  // Section 3
  criticalSystems: z.string().optional(),
  hasOpenAPIs: z.enum(['Sim', 'Não']),
  unstructuredData: z
    .object({
      relevant: z.enum(['Sim', 'Não']),
      details: z.string().optional(),
    })
    .refine(
      (data) =>
        data.relevant === 'Não' ||
        (data.relevant === 'Sim' && data.details && data.details.length > 0),
      {
        message:
          'Detalhes são obrigatórios se dados não estruturados são relevantes.',
        path: ['details'],
      },
    ),
  securityRestrictions: z.string().optional(),
  usesAITools: z.enum(['Sim', 'Não']),

  // Section 4
  mainUser: z.string().min(1, 'Usuário principal é obrigatório'),
  interactionChannels: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: 'Você precisa selecionar pelo menos um canal de interação.',
    }),
  agentRole: z.enum(['Apenas Responder', 'Executar Ações', 'Ambos']),
  requestTypes: z.string().min(1, 'Tipos de solicitações são obrigatórios'),
  agentPersona: z.string().optional(),

  // Section 5
  expectedBenefit: z.string().min(1, 'Benefício esperado é obrigatório'),
  timeSpentToday: z.coerce
    .number()
    .positive('Deve ser um número positivo')
    .optional(),
  expectedImpact: z.coerce
    .number()
    .min(0)
    .max(100, 'Deve ser entre 0 e 100')
    .optional(),
  hasBudget: z.enum(['Sim', 'Não']),
  deadline: z.date().optional(),

  // Section 6
  additionalNotes: z.string().optional(),
  initialAgentIdeas: z.string().optional(),
  clientInterestLevel: z.enum(['Baixo', 'Médio', 'Alto', 'Muito Alto']),
})

export type OpportunityMappingData = z.infer<typeof opportunityMappingSchema>
