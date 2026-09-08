import express from 'express'
import bcrypt from 'bcryptjs'
import { prisma } from '../lib/prisma.js'
import { loginSchema } from '../lib/authSchemas.js'
import { requireAuth } from '../middleware/requireAuth.js'
import { clearSessionCookie, createSessionToken, setSessionCookie, readSessionToken, verifySessionToken } from '../lib/session.js'

const router = express.Router()

router.get('/session', requireAuth, (req, res) => {
  const { id, email, firstName, lastName, company, role } = req.user
  res.json({ id, email, firstName, lastName, company, role })
})

// POST /api/v1/auth/login
router.post('/login', async (req, res) => {
  const parsed = loginSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: 'Requête invalide.', details: parsed.error.flatten() })
  }

  const { email, password } = parsed.data
  const user = await prisma.user.findUnique({ where: { email } })
  const passwordMatches = user ? await bcrypt.compare(password, user.password) : false

  if (!user || !passwordMatches) {
    return res.status(401).json({ error: 'Email ou mot de passe incorrect.' })
  }

  if (user.role === 'PARTNER' && user.status !== 'ACTIVE') {
    return res.status(403).json({ error: user.status === 'REJECTED' ? 'Votre demande partenaire a été refusée.' : 'Votre compte partenaire est en attente de validation administrative.' })
  }

  if (user.status === 'SUSPENDED') {
    return res.status(403).json({ error: 'Ce compte est suspendu.' })
  }

  const token = createSessionToken(user)
  const session = verifySessionToken(token)
  await prisma.session.create({ data: { id: session.sid, userId: user.id, expiresAt: new Date(session.exp * 1000) } })
  setSessionCookie(res, token)

  return res.json({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    company: user.company,
    role: user.role,
  })
})

// POST /api/v1/auth/logout
router.post('/logout', async (req, res) => {
  const session = verifySessionToken(readSessionToken(req))
  if (session) await prisma.session.deleteMany({ where: { id: session.sid } })
  clearSessionCookie(res)
  res.status(204).send()
})

export default router
