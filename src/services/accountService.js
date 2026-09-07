import { request } from './http'

// Branché sur le vrai backend (server/, Prisma + Postgres).
export async function getAccount() {
  return request('/account')
}
