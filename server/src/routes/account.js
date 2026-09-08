import express from 'express'
import { requireAuth, requireRole } from '../middleware/requireAuth.js'

const router = express.Router()

// GET /api/v1/account
router.get('/', requireAuth, requireRole('EMPLOYEE'), (req, res) => {
  const { firstName, lastName, balance, monthlyCredit, monthlySpend } = req.user
  res.json({
    cardHolder: `${firstName} ${lastName}`,
    balance,
    monthlyCredit,
    monthlySpend,
  })
})

export default router
