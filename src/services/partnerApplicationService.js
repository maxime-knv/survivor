import { partnerApplications } from '../data/partnerApplications'
import { mockDelay } from './mockDelay'

const STORAGE_KEY = 'cp-partner-applications'

// Persisté en localStorage pour survivre à un rechargement (démo mono-poste).
// Demain : `return request('/api/v1/partner-applications')`.
function readApplications() {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY)
        if (raw) return JSON.parse(raw)
    } catch {
        // stockage indisponible : on repart des données de démo
    }
    return partnerApplications
}

function writeApplications(list) {
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
    } catch {
        // stockage indisponible : la session reste utilisable sans persistance
    }
}

export async function getPartnerApplications() {
    return mockDelay(readApplications())
}

export async function submitPartnerApplication({ companyName, siret, objetSocial, categoryId, city, email, phone }) {
    const entry = {
        id: `application-${Date.now()}`,
        companyName,
        siret,
        objetSocial,
        categoryId,
        city,
        email,
        phone,
        status: 'pending',
        submittedAt: new Date().toISOString().slice(0, 10),
        decidedAt: null,
        decidedBy: null,
        motif: null,
    }
    writeApplications([entry, ...readApplications()])
    return mockDelay(entry)
}

// Décision motivée et tracée : un agent instruit le dossier (pièces
// justificatives : SIRET/SIREN, objet social) et doit justifier sa décision —
// pas de validation en un clic. `decidedBy` reste une chaîne libre en attendant
// un vrai système de comptes agent (voir data/user.js pour l'admin de démo).
export async function reviewPartnerApplication(id, status, motif, decidedBy = 'Administrateur') {
    if (!motif || !motif.trim()) {
        throw new Error('Un motif est requis pour justifier la décision.')
    }
    const updated = readApplications().map((application) =>
        application.id === id
            ? { ...application, status, motif: motif.trim(), decidedBy, decidedAt: new Date().toISOString().slice(0, 10) }
            : application,
    )
    writeApplications(updated)
    return mockDelay(updated.find((application) => application.id === id))
}
