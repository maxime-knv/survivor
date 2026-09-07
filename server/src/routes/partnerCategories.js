import express from 'express'
import { prisma } from '../lib/prisma.js'

const router = express.Router()

// GET /api/v1/partner-categories
router.get('/', async (req, res) => {
  const categories = await prisma.partnerCategory.findMany({
    orderBy: { label: 'asc' },
  })
  res.json(categories)
})

export default router
