import { otherEmployeeAccounts } from '../data/employees'
import { mockDelay } from './mockDelay'

// Aujourd'hui : autres salariés mock. Demain : `return request('/api/v1/employees')`.
export async function getOtherEmployeeAccounts() {
    return mockDelay(otherEmployeeAccounts)
}
