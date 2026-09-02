import { currentUser } from '../data/user'
import { mockDelay } from './mockDelay'

export async function getCurrentUser() {
  return mockDelay(currentUser)
}
