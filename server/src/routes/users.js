import express from 'express'
import { resolveUser } from '../middleware/resolveUser.js'

const router = express.Router()

const ROLE_LABELS = {
  EMPLOYEE: 'Salarié',
  PARTNER: 'Partenaire',
  ADMIN: 'Administrateur',
}

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
