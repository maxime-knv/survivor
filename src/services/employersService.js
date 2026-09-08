import { account } from '../data/user'
import { otherEmployers } from '../data/employers'
import { mockDelay } from './mockDelay'

// "Entreprise Démo" est réconcilié avec account.monthlyCredit : changer son
// abondement ici change immédiatement ce que "Simuler l'abondement" applique
// côté salarié. Demain : `return request('/api/v1/employers')`.
export async function getEmployers() {
    return mockDelay([
        { id: 'employer-1', name: 'Entreprise Démo', employeeCount: 1, monthlyTopUp: account.monthlyCredit },
        ...otherEmployers,
    ])
}

export async function updateEmployerTopUp(id, amount) {
    if (id === 'employer-1') {
        account.monthlyCredit = amount
    } else {
        const employer = otherEmployers.find((entry) => entry.id === id)
        if (employer) employer.monthlyTopUp = amount
    }
    return mockDelay({ id, monthlyTopUp: amount })
}
