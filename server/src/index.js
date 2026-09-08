import app from './app.js'
import { prisma } from './lib/prisma.js'

await prisma.$connect()
const port = process.env.PORT || 3002
app.listen(port, () => console.log('API CartePro : http://localhost:' + port))
