const STORAGE_KEY = 'cp-session-user'

// Session très simple : on retient l'email de l'utilisateur connecté pour
// que chaque requête au backend s'identifie via le header `x-user-email`
// (voir `server/src/middleware/resolveUser.js`). Pas de token, conforme au
// périmètre "simulation fonctionnelle" du prototype.
export function getSessionUser() {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY)
        return raw ? JSON.parse(raw) : null
    } catch {
        return null
    }
}

export function setSessionUser(user) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

export function clearSessionUser() {
    window.localStorage.removeItem(STORAGE_KEY)
}
