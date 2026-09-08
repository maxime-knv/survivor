import express from 'express'
import { prisma } from '../lib/prisma.js'

const router = express.Router()

// GET /api/v1/partners
router.get('/', async (req, res) => {
  const partners = await prisma.partner.findMany({
    where: { archived : false },
    orderBy: { name: 'asc' },
  })

  // Le front attend `categoryId` (voir src/data/partners.js) : on renomme
  // simplement le champ pour ne rien changer côté pages/composants.
  const shaped = partners.map(({ categoryId, ...partner }) => ({
    ...partner,
    categoryId,
  }))

  res.json(shaped)
})

export default router
