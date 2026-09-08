import { request } from './http'
import { setSessionUser, clearSessionUser } from './session'

// Connexion réelle : le backend (server/, Prisma + Postgres) vérifie que le
// compte existe et que le mot de passe correspond au hash stocké. Voir
// `server/src/routes/auth.js` (validation Zod côté serveur).
export async function signIn({ email, password }) {
    const user = await request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    })
    setSessionUser(user)
    return user
}

export function signOut() {
    clearSessionUser()
}
