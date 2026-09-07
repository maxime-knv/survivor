import { config } from '../config'
import { neon } from '../lib/neon'

// Client HTTP générique, prêt pour le backend à venir. Aucun service ne
// l'utilise encore (tout est mock) : quand une route réelle existe, un
// service passe de "return mockDelay(...)" à "return request('/api/...')"
// sans que les pages qui le consomment aient à changer.

export async function request(path, options = {}) {
  const session = await neon.auth.getSession()
  const userEmail = session?.data?.user?.email

  const response = await fetch(`${config.apiBaseUrl}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...({ 'x-user-email': userEmail }),
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`Requête ${path} échouée (${response.status})`)
  }

  if (response.status === 204) return null
  return response.json()
}
