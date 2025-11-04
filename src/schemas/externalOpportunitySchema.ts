import { z } from 'zod'

export const externalOpportunitySchema = z.object({
  client_name_on_mapping: z.string().min(1, 'O nome do cliente é obrigatório.'),
  department_on_mapping: z.string().min(1, 'Área / Departamento é obrigatório'),
  responsible_on_mapping: z
    .string()
    .min(1, 'Responsável da área é obrigatório'),
  operation_size_on_mapping: z.enum(['Pequena', 'Média', 'Grande']),
  digital_maturity_on_mapping: z.enum(['Baixo', 'Médio', 'Alto']),
  main_systems_on_mapping: z
    .string()
    .min(1, 'Sistemas principais são obrigatórios'),

  business_objective: z.string().min(1, 'Objetivo de negócio é obrigatório'),
  repetitive_tasks: z.string().optional(),
  email_spreadsheet_activities: z.string().optional(),
  bottlenecks: z.string().optional(),
  main_user: z.string().optional(),
  time_spent_today: z.string().optional(),
  expected_benefit: z.string().optional(),

  critical_systems: z.string().optional(),

  expected_impact_percentage: z.coerce.number().optional(),
  budget: z.coerce.number().optional(),
  deadline_goal: z.string().optional(),
  client_interest_level: z.enum(['Alto', 'Medio', 'Baixo']),
})

export type ExternalOpportunityData = z.infer<typeof externalOpportunitySchema>
