import { account } from '../data/user'
import { mockDelay } from './mockDelay'

export async function getAccount() {
    return mockDelay(account)
}
