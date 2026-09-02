import { account } from '../data/user'
import { mockDelay } from './mockDelay'

// Aujourd'hui : données mock. Demain : `return request('/api/v1/employees/me/balance')`.
// La signature et la forme des données renvoyées ne changent pas pour les composants.
export async function getAccount() {
    return mockDelay(account)
}
