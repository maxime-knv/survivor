import express from 'express'
import cors from 'cors'
import partnersRouter from './routes/partners.js'
import partnerCategoriesRouter from './routes/partnerCategories.js'
import transactionsRouter from './routes/transactions.js'
import usersRouter from './routes/users.js'
import accountRouter from './routes/account.js'
import qrCodesRouter from './routes/qrCodes.js'
import authRouter from './routes/auth.js'

const app = express()

// Port distinct de backend/ (qui gère les QR codes sur 3001), pour que les
// deux serveurs tournent en parallèle sans se marcher dessus. Voir
// vite.config.js pour le découpage du proxy entre les deux.
const PORT = process.env.PORT || 3002

app.use(cors())
app.use(express.json())

app.use('/api/v1/partners', partnersRouter)
app.use('/api/v1/partner-categories', partnerCategoriesRouter)
app.use('/api/v1/transactions', transactionsRouter)
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/account', accountRouter)
app.use('/api/v1/qr-codes', qrCodesRouter)
app.use('/api/v1/auth', authRouter)

app.get('/', (req, res) => {
  res.json({ message: 'Serveur CartePro (données) opérationnel' })
})

app.listen(PORT, () => {
  console.log(`Serveur "data" lancé sur http://localhost:${PORT}`)
})
