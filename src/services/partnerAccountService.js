import { partnerAccount, receivedTransactions } from '../data/partnerAccount'
import { mockDelay } from './mockDelay'

// Aujourd'hui : compte partenaire mock. Demain : `return request('/api/v1/partner-account')`.
export async function getPartnerAccount() {
    return mockDelay(partnerAccount)
}

export async function getReceivedTransactions() {
    return mockDelay(receivedTransactions)
}

// L'admin décide seul de l'activation/suspension d'un partenaire.
export async function setPartnerStatus(status) {
    partnerAccount.status = status
    return mockDelay(partnerAccount)
}

// Aujourd'hui : saisie simulée côté front, la transaction n'est pas persistée.
// Demain : `return request('/api/v1/partner-transactions', { method: 'POST', body: JSON.stringify({ reference, amount }) })`
export async function submitTransaction({ reference, amount }) {
    const now = new Date()
    const entry = {
        id: `received-${now.getTime()}`,
        reference: reference?.trim() || `CP-${now.toISOString().slice(0, 10).replace(/-/g, '')}-${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`,
        employee: 'Client CartePro',
        date: now.toISOString().slice(0, 10),
        time: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
        amount,
        status: 'En attente',
    }
    return mockDelay(entry)
}

// Une transaction validée est considérée irréversible côté produit.
// Demain : `return request(`/api/v1/partner-transactions/${id}/validate`, { method: 'POST' })`
export async function validateTransaction(id) {
    return mockDelay({ id, status: 'Validée' })
}
