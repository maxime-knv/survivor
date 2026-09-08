import crypto from 'node:crypto'
import './config.js'

export function fail(status, message) { return Object.assign(new Error(message), { status }) }
export function validAmount(amount) {
  return typeof amount === 'number' && Number.isFinite(amount) && amount > 0 && amount <= 1000000 && Math.abs(amount * 100 - Math.round(amount * 100)) < 0.000001
}
function signature(body) {
  return crypto.createHmac('sha256', process.env.SESSION_SECRET).update(`payment:${body}`).digest('base64url')
}
export function paymentToken(qr) {
  const body = Buffer.from(JSON.stringify({ id: qr.id, userId: qr.userId, code: qr.code, cents: Math.round(Number(qr.amount) * 100), exp: new Date(qr.expiresAt).getTime() })).toString('base64url')
  return `CP1.${body}.${signature(body)}`
}
export function readPaymentToken(value) {
  if (typeof value !== 'string' || value.length > 4096) throw fail(400, 'Code de paiement invalide.')
  const [version, body, mac, extra] = value.trim().split('.')
  if (version !== 'CP1' || !body || !mac || extra !== undefined) throw fail(400, 'QR non signé ou invalide. Générez un nouveau QR.')
  const expected = Buffer.from(signature(body)), actual = Buffer.from(mac)
  if (actual.length !== expected.length || !crypto.timingSafeEqual(actual, expected)) throw fail(400, 'Signature du QR invalide.')
  try { return JSON.parse(Buffer.from(body, 'base64url').toString()) } catch { throw fail(400, 'QR invalide.') }
}
export function checkQr(qr, payload) {
  if (!qr || qr.userId !== payload.userId || qr.code !== payload.code || Math.round(Number(qr.amount) * 100) !== payload.cents || qr.expiresAt.getTime() !== payload.exp) throw fail(400, 'Le QR ne correspond pas aux données enregistrées.')
  if (qr.status !== 'ACTIVE') throw fail(409, 'Ce QR a déjà été utilisé ou annulé.')
  if (qr.expiresAt <= new Date()) throw fail(410, 'Ce QR a expiré. Demandez un nouveau QR.')
}
export function shapeQr(qr) {
  return { ...qr, amount: Number(qr.amount), status: qr.status === 'ACTIVE' && qr.expiresAt <= new Date() ? 'EXPIRED' : qr.status, token: paymentToken(qr) }
}
