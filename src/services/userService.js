import { request } from './http'

// Branché sur le vrai backend (server/, Prisma + Postgres).
export async function createUser(user) {
  return request('/users', {method: 'POST', body: JSON.stringify(user),})
}

export async function getCurrentUser() {
  return request('/users/me')
}
