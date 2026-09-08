import express from 'express'
import { prisma } from '../lib/prisma.js'
import { requireAuth, requireRole } from '../middleware/requireAuth.js'
import { fail, readPaymentToken, checkQr } from '../lib/payment.js'

const router = express.Router()
router.use(requireAuth, requireRole('PARTNER'))
router.use(async (req, res, next) => {
  req.partner = await prisma.partner.findFirst({ where: { ownerId: req.user.id, archived: false } })
  if (!req.partner) throw fail(403, 'Aucun établissement actif associé à ce compte.')
  next()
})
router.get('/account', async (req, res) => {
  const application = await prisma.partnerApplication.findUnique({ where: { userId: req.user.id } })
  res.json({ ...req.partner, email: req.user.email, siret: application?.siret ?? '', phone: application?.phone ?? '', location: req.partner.city, category: req.partner.categoryId, status: 'Actif', official: true })
})
const shapeTransaction = (txn) => ({ ...txn, amount: Math.abs(Number(txn.amount)), reference: txn.qrCodeId, employee: `${txn.User.firstName} ${txn.User.lastName}`, date: txn.createdAt.toISOString().slice(0, 10), time: txn.createdAt.toISOString().slice(11, 16), status: 'Validée', User: undefined })
router.get('/transactions', async (req, res) => {
  const list = await prisma.transaction.findMany({ where: { partnerId: req.partner.id }, include: { User: { select: { firstName: true, lastName: true } } }, orderBy: { createdAt: 'desc' } })
  res.json(list.map(shapeTransaction))
})
router.post('/preview', async (req, res) => {
  const payload = readPaymentToken(req.body.reference)
  const qr = await prisma.qrCode.findUnique({ where: { id: payload.id } })
  checkQr(qr, payload)
  res.json({ reference: req.body.reference.trim(), amount: Number(qr.amount), label: qr.label, expiresAt: qr.expiresAt })
})
router.post('/validate', async (req, res) => {
  const payload = readPaymentToken(req.body.reference)
  const transaction = await prisma.$transaction(async (tx) => {
    // Serializable + écritures conditionnelles : deux validations concurrentes
    // ne peuvent ni consommer deux fois le QR, ni rendre un solde négatif.
    const partner = await tx.partner.findFirst({ where: { id: req.partner.id, archived: false, Owner: { status: 'ACTIVE' } } })
    if (!partner) throw fail(403, 'Partenaire inactif.')
    const qr = await tx.qrCode.findUnique({ where: { id: payload.id } })
    checkQr(qr, payload)
    const used = await tx.qrCode.updateMany({ where: { id: qr.id, status: 'ACTIVE', expiresAt: { gt: new Date() } }, data: { status: 'USED' } })
    if (!used.count) throw fail(409, 'QR déjà utilisé ou expiré.')
    const amount = Number(qr.amount)
    const debit = await tx.user.updateMany({ where: { id: qr.userId, role: 'EMPLOYEE', balance: { gte: amount }, OR: [{ status: null }, { status: 'ACTIVE' }] }, data: { balance: { decrement: amount }, monthlySpend: { increment: amount } } })
    if (!debit.count) throw fail(409, 'Solde insuffisant ou compte salarié inactif.')
    const txn = await tx.transaction.create({ data: { userId: qr.userId, partnerId: partner.id, redeemedByUserId: req.user.id, qrCodeId: qr.id, amount: -amount, label: qr.label || partner.name, status: 'SUCCESS' }, include: { User: { select: { firstName: true, lastName: true } } } })
    await tx.paymentAudit.create({ data: { transactionId: txn.id, qrCodeId: qr.id, actorId: req.user.id, amount } })
    return txn
  }, { isolationLevel: 'Serializable' })
  res.status(201).json(shapeTransaction(transaction))
})
export default router
