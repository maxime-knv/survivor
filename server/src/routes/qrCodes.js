import express from 'express'
import crypto from 'crypto'
import { prisma } from '../lib/prisma.js'
import { resolveUser } from '../middleware/resolveUser.js'


const router = express.Router()
router.use(resolveUser)

router.post('/', async (req, res) => {
  const { amount, label } = req.body
  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({
      error: 'Montant invalide',
    })
  }
  if (typeof label !== 'string' || label.trim() === '') {
    return res.status(400).json({
      error: 'Libellé invalide',
    })
  }
  if (label.trim().length > 100) {
    return res.status(400).json({
      error: 'Libellé trop long',
    })
  }
  const expiresAt = new Date(Date.now() + 30 * 60 *1000)
  const qrCode = await prisma.qrCode.create({
    data: {
      id: crypto.randomUUID(),
      code: crypto.randomUUID(),
      amount,
      label: label.trim(),
      userId: req.user.id,
      expiresAt,
    }
  })
  return res.status(201).json(qrCode)
})

router.get('/', async (req, res) => {
  const qrCodes = await prisma.qrCode.findMany({
    where: {
      userId: req.user.id,
    },
  })

  return res.status(200).json(qrCodes)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  if (!id || typeof id !== 'string') {
    return res.status(400).json({
      error: 'Identifiant invalide',
    })
  }
  const qrCode = await prisma.qrCode.findUnique({
    where: {
      id,
      userId: req.user.id,
     },
  })
  if (!qrCode) {
    return res.status(404).json({
      error: 'QR code introuvable',
    })
  }
  return res.status(200).json(qrCode)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  if (!id || typeof id !== 'string') {
    return res.status(400).json({
      error: 'Identifiant invalide',
    })
  }
  const qrCode = await prisma.qrCode.findUnique({
    where: {
      id,
      userId: req.user.id,
     },
  })
  if (!qrCode) {
    return res.status(404).json({
      error: 'QR code introuvable',
    })
  }
  await prisma.qrCode.delete({
    where: {
      id,
      userId: req.user.id,
    },
  })
  return res.status(204).send()
})

export default router