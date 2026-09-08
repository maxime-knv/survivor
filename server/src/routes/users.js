import express from 'express'
import bcrypt from 'bcryptjs'
import { prisma } from '../lib/prisma.js'
import { resolveUser } from '../middleware/resolveUser.js'
import { signUpSchema } from '../lib/authSchemas.js'

const router = express.Router()

const ROLE_LABELS = {
  EMPLOYEE: 'Salarié',
  PARTNER: 'Partenaire',
  ADMIN: 'Administrateur',
}

// POST /api/v1/users
router.post('/', async (req, res) => {
  const parsed = signUpSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: 'Requête invalide.', details: parsed.error.flatten() })
  }

  const { email, password, firstName, lastName, company, role } = parsed.data

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return res.status(409).json({ error: 'Un compte existe déjà avec cet email.' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, firstName, lastName, company, role },
  })
  return res.status(201).json({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    company: user.company,
    role: user.role,
  })
})

// GET /api/v1/users/me
router.get('/me', resolveUser, (req, res) => {
  const { firstName, lastName, company, role } = req.user
  res.json({
    firstName,
    lastName,
    company,
    role: ROLE_LABELS[role] ?? role,
    avatarInitial: firstName?.charAt(0)?.toUpperCase() ?? '?',
  })
})

export default router
