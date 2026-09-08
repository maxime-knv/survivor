import { config } from '../config'
// Client HTTP : le navigateur envoie automatiquement le cookie de session
// HttpOnly. L'identité n'est donc plus fournie par un en-tête modifiable.

export async function request(path, options = {}) {
  const response = await fetch(`${config.apiBaseUrl}${path}`, {
    ...options,
    signal: options.signal ?? AbortSignal.timeout(15000),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  }).catch((error) => {
    throw new Error(error.name === 'TimeoutError'
      ? 'Le serveur met trop de temps à répondre. Réessayez dans quelques instants.'
      : 'Impossible de joindre le serveur. Vérifiez votre connexion et réessayez.')
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    const error = new Error(body?.error || `Le service est indisponible (${response.status}).`)
    error.status = response.status
    throw error
  }

  if (response.status === 204) return null
  return response.json()
}
