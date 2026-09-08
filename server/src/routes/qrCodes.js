import express from 'express'
import crypto from 'node:crypto'
import { prisma } from '../lib/prisma.js'
import { requireAuth, requireRole } from '../middleware/requireAuth.js'
import { validAmount, shapeQr, fail } from '../lib/payment.js'

const router = express.Router()
router.use(requireAuth, requireRole('EMPLOYEE'))
router.post('/', async (req, res) => {
  const { amount, label = '' } = req.body
  if (!validAmount(amount)) throw fail(400, 'Montant positif requis, avec deux décimales maximum.')
  if (typeof label !== 'string' || label.trim().length > 100) throw fail(400, 'Libellé limité à 100 caractères.')
  if (Number(req.user.balance) < amount) throw fail(409, 'Solde insuffisant.')
  const qr = await prisma.qrCode.create({ data: {
    id: crypto.randomUUID(), code: crypto.randomUUID(), amount,
    label: label.trim() || 'Paiement CartePro', userId: req.user.id,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
  } })
  res.status(201).json(shapeQr(qr))
})
router.get('/', async (req, res) => {
  const list = await prisma.qrCode.findMany({ where: { userId: req.user.id }, orderBy: { createdAt: 'desc' } })
  res.json(list.map(shapeQr))
})
router.get('/:id', async (req, res) => {
  const qr = await prisma.qrCode.findFirst({ where: { id: req.params.id, userId: req.user.id } })
  if (!qr) throw fail(404, 'QR introuvable.')
  res.json(shapeQr(qr))
})
router.delete('/:id', async (req, res) => {
  const qr = await prisma.qrCode.findFirst({ where: { id: req.params.id, userId: req.user.id } })
  if (!qr) throw fail(404, 'QR introuvable.')
  const result = await prisma.qrCode.updateMany({ where: { id: qr.id, userId: req.user.id, status: 'ACTIVE' }, data: { status: 'CANCELLED' } })
  if (!result.count) throw fail(409, 'Ce QR ne peut plus être annulé.')
  res.status(204).send()
})
export default router
