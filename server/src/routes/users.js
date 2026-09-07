import express from 'express'
import { prisma } from '../lib/prisma.js'
import { resolveUser } from '../middleware/resolveUser.js'

const router = express.Router()

const ROLE_LABELS = {
  EMPLOYEE: 'Salarié',
  PARTNER: 'Partenaire',
  ADMIN: 'Administrateur',
}

// POST /api/v1/users
router.post('/', async (req, res) => {
  const { email, firstName, lastName, company, role } = req.body
  const user = await prisma.user.create({
    data: {
      email: email.trim().toLowerCase(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      company: company.trim(),
      role,
    },
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
