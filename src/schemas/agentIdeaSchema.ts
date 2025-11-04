import { z } from 'zod'

const parseMultilineToArray = (val: string, ctx: z.RefinementCtx) => {
  try {
    if (val.trim() === '') return JSON.stringify([])
    return JSON.stringify(val.split('\n').filter((line) => line.trim() !== ''))
  } catch (e) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Formato inválido.',
    })
    return z.NEVER
  }
}

export const agentIdeaSchema = z.object({
  id: z.number(),
  agent_name: z.string().min(1, 'O nome do agente é obrigatório.'),
  description: z.string().min(1, 'A descrição é obrigatória.'),
  complexity: z.enum(['Baixa', 'Media', 'Alta']),
  status: z.enum(['Rascunho', 'Aprovado', 'Rejeitado', 'Implementado']),
  key_features: z.string().transform(parseMultilineToArray),
  expected_benefits: z.string().transform(parseMultilineToArray),
})

export type AgentIdeaData = z.infer<typeof agentIdeaSchema>
