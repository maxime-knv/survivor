import { config } from '../config'
import { getSessionUser } from './session'

// Client HTTP générique pour les services branchés sur le vrai backend
// (server/, Prisma + Postgres). Pas de token : on identifie l'utilisateur
// connecté via le header `x-user-email`, lu par `resolveUser` côté serveur
// (qui retombe sur un utilisateur de démo si l'en-tête est absent).

export async function request(path, options = {}) {
  const sessionUser = getSessionUser()

  const response = await fetch(`${config.apiBaseUrl}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(sessionUser?.email ? { 'x-user-email': sessionUser.email } : {}),
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.error || `Requête ${path} échouée (${response.status})`)
  }

  if (response.status === 204) return null
  return response.json()
}
