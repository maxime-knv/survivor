import { partners, partnerCategories } from '../data/partners'
import { mockDelay } from './mockDelay'

// Aujourd'hui : catalogue mock. Demain : `return request('/api/v1/partners')`
// et `return request('/api/v1/partner-categories')`. Le catalogue restant
// piloté par la donnée (voir data/partners.js), aucun gabarit n'a à changer.
export async function getPartners() {
    return mockDelay(partners)
}

export async function getPartnerCategories() {
    return mockDelay(partnerCategories)
}
