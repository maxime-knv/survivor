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

export const partnerApplicationSchema = z.object({
  companyName: z.string().trim().min(1, 'La raison sociale est requise.'),
  siret: z.string().transform((value) => value.replaceAll(' ', '')).pipe(z.string().regex(/^\d{14}$/, 'Le SIRET doit comporter 14 chiffres.')),
  objetSocial: z.string().trim().min(1, 'L’objet social est requis.'),
  categoryId: z.string().trim().min(1, 'La catégorie est requise.'),
  city: z.string().trim().min(1, 'La ville est requise.'),
  email: z.string().trim().toLowerCase().email('Email invalide.'),
  phone: z.string().trim().min(1, 'Le téléphone est requis.'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères.'),
})

export const reviewPartnerApplicationSchema = z.object({
  status: z.enum(['APPROVED', 'REJECTED']),
  motif: z.string().trim().min(1, 'Un motif est requis.'),
})
