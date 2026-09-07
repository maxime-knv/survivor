import { request } from './http'

// Branché sur le vrai backend (server/, Prisma + Postgres).
export async function getPartners() {
  return request('/partners')
}

export async function getPartnerCategories() {
  return request('/partner-categories')
}
