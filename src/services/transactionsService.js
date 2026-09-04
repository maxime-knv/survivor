import { transactions } from '../data/transactions'
import { mockDelay } from './mockDelay'

export async function getTransactions() {
    return mockDelay(transactions)
}
