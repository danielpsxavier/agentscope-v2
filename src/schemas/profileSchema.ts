import { z } from 'zod'

export const profileSchema = z.object({
  full_name: z
    .string()
    .min(1, 'O nome completo é obrigatório.')
    .max(100, 'O nome não pode ter mais de 100 caracteres.'),
})

export type ProfileData = z.infer<typeof profileSchema>
