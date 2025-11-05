import { z } from 'zod'

const parseBenefits = (val: string, ctx: z.RefinementCtx) => {
  try {
    if (val.trim() === '') return []
    return val.split('\n').filter((line) => line.trim() !== '')
  } catch (e) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Formato de benefícios inválido.',
    })
    return z.NEVER
  }
}

const parseTools = (val: string, ctx: z.RefinementCtx) => {
  try {
    if (val.trim() === '') return []
    return val
      .split('\n')
      .filter((line) => line.trim() !== '' && line.includes(' - '))
      .map((line) => {
        const parts = line.split(' - ')
        return {
          nome: parts[0].trim(),
          descricao: parts.slice(1).join(' - ').trim(),
        }
      })
  } catch (e) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message:
        'Formato de ferramentas inválido. Use "Nome - Descrição" por linha.',
    })
    return z.NEVER
  }
}

export const agentIdeaSchema = z.object({
  id: z.number(),
  agent_name: z.string().min(1, 'O nome do agente é obrigatório.'),
  description: z.string().min(1, 'A descrição é obrigatória.'),
  objective: z.string().min(1, 'O objetivo é obrigatório.'),
  complexity: z.enum(['Baixa', 'Media', 'Alta']),
  status: z.enum(['Rascunho', 'Aprovado', 'Rejeitado', 'Implementado']),
  tools: z.string().transform(parseTools),
  expected_benefits: z.string().transform(parseBenefits),
})

export type AgentIdeaData = z.infer<typeof agentIdeaSchema>
