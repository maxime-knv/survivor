import { transactions } from '../data/transactions'
import { mockDelay } from './mockDelay'

// Aujourd'hui : historique mock. Demain : `return request('/api/v1/employees/me/transactions')`.
export async function getTransactions() {
    return mockDelay(transactions)
}
