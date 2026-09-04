import express from 'express'

const router = express.Router()

const qrCodes = []

router.post('/', (req, res) => {
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
  const qrCode = {
    id: crypto.randomUUID(),
    amount,
    label: label.trim(),
    createdAt: new Date().toISOString(),
  }
  qrCodes.push(qrCode)
  return res.status(201).json(qrCode)
})

router.get('/', (req, res) => {
  return res.status(200).json(qrCodes)
})

router.get('/:id', (req, res) => {
  const { id } = req.params

  if (!id || typeof id !== 'string') {
    return res.status(400).json({
      error: 'Identifiant invalide',
    })
  }
  const qrCode = qrCodes.find((qr) => qr.id === id)
  if (!qrCode) {
    return res.status(404).json({
      error: 'QR code introuvable',
    })
  }
  return res.status(200).json(qrCode)
})

router.delete('/:id', (req, res) => {
  const { id } = req.params

  if (!id || typeof id !== 'string') {
    return res.status(400).json({
      error: 'Identifiant invalide',
    })
  }
  const index = qrCodes.findIndex((qr) => qr.id === id)
  if (index === -1) {
    return res.status(404).json({
      error: 'QR code introuvable',
    })
  }
  qrCodes.splice(index, 1)
  return res.status(204).send()
})

export default router