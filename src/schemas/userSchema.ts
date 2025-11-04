import { z } from 'zod'

export const newUserSchema = z.object({
  email: z.string().email('Email inválido.'),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres.'),
  full_name: z.string().min(1, 'O nome completo é obrigatório.'),
  bio: z.string().optional(),
})

export type NewUserData = z.infer<typeof newUserSchema>
