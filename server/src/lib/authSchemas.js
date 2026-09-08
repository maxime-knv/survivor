import { z } from 'zod'

export const signUpSchema = z.object({
  email: z.string().trim().toLowerCase().email('Email invalide.'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères.'),
  firstName: z.string().trim().min(1, 'Le prénom est requis.'),
  lastName: z.string().trim().min(1, 'Le nom est requis.'),
  company: z.string().trim().min(1, "L'entreprise est requise."),
  role: z.enum(['EMPLOYEE', 'PARTNER', 'ADMIN'], {
    errorMap: () => ({ message: 'Profil invalide.' }),
  }),
})

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email('Email invalide.'),
  password: z.string().min(1, 'Mot de passe requis.'),
})
