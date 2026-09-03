import express from 'express'
import cors from 'cors'
import qrCodesRouter from './routes/qrCodes.js'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.use('/api/v1/qr-codes', qrCodesRouter)

app.get('/', (req, res) => {
    res.json({ message: 'Backend CartePro opérationnel' })
})

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`)
})
