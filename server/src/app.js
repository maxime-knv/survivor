import express from 'express'
import cors from 'cors'
import partnersRouter from './routes/partners.js'
import partnerCategoriesRouter from './routes/partnerCategories.js'
import transactionsRouter from './routes/transactions.js'
import usersRouter from './routes/users.js'
import accountRouter from './routes/account.js'
import qrCodesRouter from './routes/qrCodes.js'
import authRouter from './routes/auth.js'
import partnerApplicationsRouter from './routes/partnerApplications.js'
import partnerRouter from './routes/partner.js'

const app = express()

// Port distinct de backend/ (qui gère les QR codes sur 3001), pour que les
// deux serveurs tournent en parallèle sans se marcher dessus. Voir
// vite.config.js pour le découpage du proxy entre les deux.


// Nécessaire si le front est servi depuis une autre origine. En développement,
// le proxy Vite reste de même origine, mais cette configuration permet aussi
// l'envoi du cookie de session par un front explicitement autorisé.
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())
app.use('/api/v1', (req, res, next) => {
  res.set('Cache-Control', 'no-store')
  if (!['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    const origin = req.get('origin')
    const allowed = process.env.CLIENT_ORIGIN || 'http://localhost:5173'
    if (origin && origin !== allowed && origin !== `http://${req.get('host')}` && origin !== `https://${req.get('host')}`) return res.status(403).json({ error: 'Origine non autorisée.' })
  }
  next()
})

app.use('/api/v1/partners', partnersRouter)
app.use('/api/v1/partner-categories', partnerCategoriesRouter)
app.use('/api/v1/transactions', transactionsRouter)
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/account', accountRouter)
app.use('/api/v1/qr-codes', qrCodesRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/partner-applications', partnerApplicationsRouter)
app.use('/api/v1/partner', partnerRouter)
app.use((error, req, res, next) => {
  if (res.headersSent) return next(error)
  const status = error.status || ({ P2002: 409, P2034: 409, P2021: 503, P2022: 503, P1001: 503 }[error.code]) || 500
  const message = error.status ? error.message : status === 409 ? 'Opération concurrente ou donnée déjà enregistrée. Rechargez la page.' : status === 503 ? 'Base indisponible ou schéma incomplet. Lancez npm run db:setup dans server/.' : 'Erreur serveur. Consultez les journaux du backend.'
  console.error('API error:', error.code || error.name)
  res.status(status).json({ error: message })
})

app.get('/', (req, res) => {
  res.json({ message: 'Serveur CartePro (données) opérationnel' })
})

export default app
