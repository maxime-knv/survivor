import dotenv from 'dotenv'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

dotenv.config({ path: fileURLToPath(new URL('../../.env', import.meta.url)), quiet: true })
if (!process.env.SESSION_SECRET) {
  if (process.env.NODE_ENV === 'production') throw new Error('SESSION_SECRET est obligatoire en production.')
  process.env.SESSION_SECRET = crypto.randomBytes(48).toString('hex')
  console.warn('Clé de développement temporaire : les sessions et QR expirent au redémarrage. Définir SESSION_SECRET pour les conserver.')
}
