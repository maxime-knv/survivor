import express from 'express'
import bcrypt from 'bcryptjs'
import { prisma } from '../lib/prisma.js'
import { requireAuth, requireRole } from '../middleware/requireAuth.js'
import { signUpSchema } from '../lib/authSchemas.js'

const router = express.Router()

const ROLE_LABELS = {
  EMPLOYEE: 'Salarié',
  PARTNER: 'Partenaire',
  ADMIN: 'Administrateur',
}

router.get('/partners', requireAuth, requireRole('ADMIN'), async (req, res) => {
  const partners = await prisma.partner.findMany({ include: { Owner: { select: { status: true } } } })
  res.json(partners.map(({ Owner, ...partner }) => ({ ...partner, status: Owner?.status === 'ACTIVE' ? 'Actif' : Owner?.status === 'SUSPENDED' ? 'Suspendu' : 'Sans compte actif' })))
})
router.patch('/partners/:id', requireAuth, requireRole('ADMIN'), async (req, res) => {
  const status = { Actif: 'ACTIVE', Suspendu: 'SUSPENDED' }[req.body.status]
  if (!status) return res.status(400).json({ error: 'Statut invalide.' })
  const partner = await prisma.partner.findUnique({ where: { id: req.params.id } })
  if (!partner?.ownerId) return res.status(404).json({ error: 'Compte partenaire introuvable.' })
  await prisma.user.update({ where: { id: partner.ownerId }, data: { status } })
  res.json({ ...partner, status: req.body.status })
})

router.get('/employees', requireAuth, requireRole('ADMIN'), async (req, res) => {
  const employees = await prisma.user.findMany({
    where: { role: 'EMPLOYEE' },
    select: { id: true, firstName: true, lastName: true, company: true, balance: true },
    orderBy: { createdAt: 'desc' },
  })
  res.json(employees.map(({ firstName, lastName, ...employee }) => ({
    ...employee, name: `${firstName} ${lastName}`,
  })))
})

// POST /api/v1/users
router.post('/', async (req, res) => {
  const parsed = signUpSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: 'Requête invalide.', details: parsed.error.flatten() })
  }

  const { email, password, firstName, lastName, company, role } = parsed.data

  // Un compte partenaire est créé après instruction administrative ; un admin
  // ne peut jamais être créé depuis un formulaire public.
  if (role !== 'EMPLOYEE') {
    return res.status(403).json({ error: 'L’inscription publique crée uniquement des comptes salariés.' })
  }

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
router.get('/me', requireAuth, (req, res) => {
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
