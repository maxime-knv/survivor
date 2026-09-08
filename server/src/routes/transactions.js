import express from 'express'
import { prisma } from '../lib/prisma.js'
import { requireAuth, requireRole } from '../middleware/requireAuth.js'

const router = express.Router()

// GET /api/v1/transactions
// Historique de l'utilisateur courant, le plus récent en premier.
router.get('/', requireAuth, requireRole('EMPLOYEE'), async (req, res) => {
  const transactions = await prisma.transaction.findMany({
    where: { userId: req.user.id },
    include: { Partner: true },
    orderBy: { createdAt: 'desc' },
  })

  const shaped = transactions.map((txn) => ({
    id: txn.id,
    label: txn.label,
    partnerId: txn.partnerId,
    date: txn.createdAt.toISOString().slice(0, 10),
    time: txn.createdAt.toISOString().slice(11, 16),
    amount: txn.amount,
    // Dérivé du signe du montant : pas besoin d'une colonne dédiée en base.
    type: txn.amount >= 0 ? 'credit' : 'depense',
  }))

  res.json(shaped)
})

export default router
