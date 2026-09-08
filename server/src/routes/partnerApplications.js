import express from 'express'
import bcrypt from 'bcryptjs'
import { prisma } from '../lib/prisma.js'
import { partnerApplicationSchema, reviewPartnerApplicationSchema } from '../lib/authSchemas.js'
import { requireAuth, requireRole } from '../middleware/requireAuth.js'

const router = express.Router()

router.post('/', async (req, res) => {
  const parsed = partnerApplicationSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Requête invalide.', details: parsed.error.flatten() })
  const data = parsed.data

  const [existingUser, existingSiret, category] = await Promise.all([
    prisma.user.findUnique({ where: { email: data.email } }),
    prisma.partnerApplication.findUnique({ where: { siret: data.siret } }),
    prisma.partnerCategory.findUnique({ where: { id: data.categoryId } }),
  ])
  if (existingUser) return res.status(409).json({ error: 'Un compte existe déjà avec cet email.' })
  if (existingSiret) return res.status(409).json({ error: 'Une demande existe déjà pour ce SIRET.' })
  if (!category) return res.status(400).json({ error: 'Catégorie partenaire inconnue.' })

  const password = await bcrypt.hash(data.password, 10)
  const application = await prisma.partnerApplication.create({
    data: {
      companyName: data.companyName,
      siret: data.siret,
      objetSocial: data.objetSocial,
      categoryId: data.categoryId,
      city: data.city,
      phone: data.phone,
      User: { create: { email: data.email, password, firstName: data.companyName, lastName: 'Partenaire', company: data.companyName, role: 'PARTNER', status: 'PENDING' } },
    },
  })
  res.status(201).json({ id: application.id, status: application.status })
})

router.get('/', requireAuth, requireRole('ADMIN'), async (req, res) => {
  const applications = await prisma.partnerApplication.findMany({ orderBy: { submittedAt: 'desc' } })
  res.json(applications)
})

router.patch('/:id', requireAuth, requireRole('ADMIN'), async (req, res) => {
  const parsed = reviewPartnerApplicationSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Requête invalide.', details: parsed.error.flatten() })
  const application = await prisma.partnerApplication.findUnique({ where: { id: req.params.id } })
  if (!application) return res.status(404).json({ error: 'Demande introuvable.' })
  if (application.status !== 'PENDING') return res.status(409).json({ error: 'Cette demande a déjà été traitée.' })

  const reviewed = await prisma.$transaction(async (tx) => {
    const updated = await tx.partnerApplication.update({
      where: { id: application.id, status: 'PENDING' },
      data: { status: parsed.data.status, motif: parsed.data.motif, decidedAt: new Date(), decidedBy: req.user.email },
    })
    await tx.user.update({ where: { id: application.userId }, data: { status: parsed.data.status === 'APPROVED' ? 'ACTIVE' : 'REJECTED' } })
    if (parsed.data.status === 'APPROVED') {
      await tx.partner.create({ data: { name: application.companyName, categoryId: application.categoryId, city: application.city, description: application.objetSocial, ownerId: application.userId } })
    }
    return updated
  })
  res.json(reviewed)
})

export default router
