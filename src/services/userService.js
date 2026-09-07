import { request } from './http'

// Branché sur le vrai backend (server/, Prisma + Postgres).
export async function getCurrentUser() {
  return request('/users/me')
}
