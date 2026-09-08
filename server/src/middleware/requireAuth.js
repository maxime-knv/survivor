import { prisma } from '../lib/prisma.js'
import { readSessionToken, verifySessionToken } from '../lib/session.js'

export async function requireAuth(req, res, next) {
  const session = verifySessionToken(readSessionToken(req))
  if (!session) return res.status(401).json({ error: 'Authentification requise.' })
  const stored = await prisma.session.findUnique({ where: { id: session.sid } })
  if (!stored || stored.userId !== session.sub || stored.expiresAt <= new Date()) return res.status(401).json({ error: 'Session expirée. Reconnectez-vous.' })
  const user = await prisma.user.findUnique({ where: { id: session.sub } })
  if (!user) return res.status(401).json({ error: 'Session invalide.' })
  if (['SUSPENDED', 'REJECTED', 'CLOSED'].includes(user.status) || (user.role === 'PARTNER' && user.status !== 'ACTIVE')) return res.status(403).json({ error: 'Compte non actif.' })
  req.user = user
  next()
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) return res.status(403).json({ error: 'Droits insuffisants.' })
    next()
  }
}
