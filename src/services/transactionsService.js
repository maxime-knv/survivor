import { request } from './http'

// Branché sur le vrai backend (server/, Prisma + Postgres).
export async function getTransactions() {
  return request('/transactions')
}
