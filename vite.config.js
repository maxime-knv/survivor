import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // QR codes : backend/ (géré séparément), toujours sur le port 3001.
      '/api/v1/qr-codes': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      // Reste des données (partenaires, transactions, utilisateur, compte) :
      // server/ (Prisma + Postgres), sur le port 3002.
      '/api/v1': {
        target: 'http://localhost:3002',
        changeOrigin: true,
      },
    },
  },
})
