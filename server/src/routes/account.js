import express from 'express'
import { resolveUser } from '../middleware/resolveUser.js'

const router = express.Router()

// GET /api/v1/account
router.get('/', resolveUser, (req, res) => {
  const { firstName, lastName, balance, monthlyCredit, monthlySpend } = req.user
  res.json({
    cardHolder: `${firstName} ${lastName}`,
    balance,
    monthlyCredit,
    monthlySpend,
  })
})

export default router
