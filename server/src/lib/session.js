import crypto from 'crypto'
import './config.js'

const COOKIE_NAME = 'cartepro_session'
const SESSION_DURATION_SECONDS = 8 * 60 * 60

function getSecret() {
  const secret = process.env.SESSION_SECRET
  if (secret) return secret
  if (process.env.NODE_ENV === 'production') throw new Error('SESSION_SECRET est obligatoire en production.')
  return 'cartepro-development-secret-change-me'
}

function encode(value) {
  return Buffer.from(JSON.stringify(value)).toString('base64url')
}

function sign(value) {
  return crypto.createHmac('sha256', getSecret()).update(value).digest('base64url')
}

export function createSessionToken(user) {
  const now = Math.floor(Date.now() / 1000)
  const body = encode({ sub: user.id, sid: crypto.randomUUID(), role: user.role, iat: now, exp: now + SESSION_DURATION_SECONDS })
  return `${body}.${sign(body)}`
}

export function verifySessionToken(token) {
  if (!token || typeof token !== 'string') return null
  const [body, signature, extra] = token.split('.')
  if (extra !== undefined) return null
  if (!body || !signature) return null
  const actual = Buffer.from(signature)
  const expected = Buffer.from(sign(body))
  if (actual.length !== expected.length || !crypto.timingSafeEqual(actual, expected)) return null
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'))
    return typeof payload.sub === 'string' && typeof payload.sid === 'string' && payload.role && Number.isFinite(payload.exp) && payload.exp > Math.floor(Date.now() / 1000) ? payload : null
  } catch {
    return null
  }
}

export function readSessionToken(req) {
  const entry = (req.headers.cookie || '').split(';').map((part) => part.trim()).find((part) => part.startsWith(`${COOKIE_NAME}=`))
  try { return entry ? decodeURIComponent(entry.slice(COOKIE_NAME.length + 1)) : null } catch { return null }
}

export function setSessionCookie(res, token) {
  res.cookie(COOKIE_NAME, token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: SESSION_DURATION_SECONDS * 1000, path: '/' })
}

export function clearSessionCookie(res) {
  res.clearCookie(COOKIE_NAME, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/' })
}
