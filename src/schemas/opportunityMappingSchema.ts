import { z } from 'zod'

export const opportunityMappingSchema = z.object({
  // Section 1: General Data
  clientName: z.string().min(1, 'Nome do cliente é obrigatório'),
  department: z.string().min(1, 'Área / Departamento é obrigatório'),
  areaManager: z.string().min(1, 'Responsável da área é obrigatório'),
  operationSize: z.enum(['Pequena', 'Média', 'Grande']),
  digitalMaturity: z.enum(['Baixo', 'Médio', 'Alto']),
  mainSystems: z.string().min(1, 'Sistemas principais são obrigatórios'),

  // Section 2: Context & Challenge
  businessObjective: z.string().min(1, 'Objetivo de negócio é obrigatório'),
  repetitiveTasks: z.string().optional(),
  emailSpreadsheetActivities: z.string().optional(),
  bottlenecks: z.string().optional(),
  mainUser: z.string().optional(),
  timeSpentToday: z.string().optional(),
  expectedBenefit: z.string().optional(),

  // Section 3: Processes & Tools
  criticalSystems: z.string().optional(),

  // Section 4: Final Observations
  expectedImpactPercentage: z.coerce.number().optional(),
  budget: z.coerce.number().optional(),
  deadlineGoal: z.string().optional(),
  clientInterestLevel: z.enum(['Baixo', 'Médio', 'Alto', 'Muito Alto']),
})

export type OpportunityMappingData = z.infer<typeof opportunityMappingSchema>
