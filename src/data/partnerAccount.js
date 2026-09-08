// Le partenaire de démonstration de l'espace partenaire est désormais l'une des
// six enseignes du catalogue v1.0 (voir data/partners.js). Il avait été activé
// directement (avant le retour du circuit de validation complet le 2026-09-07) :
// régularisé avec une décision et un motif plutôt que laissé sans traçabilité.
export const partnerAccount = {
    id: 'le-comptoir-du-midi',
    name: 'Le Comptoir du Midi',
    siret: '812 456 789 00034',
    category: 'Restauration',
    location: 'Marseille',
    email: 'contact@lecomptoirdumidi.exemple',
    phone: '04 91 00 00 00',
    status: 'Actif',
    official: true,
    decidedAt: '2026-09-07',
    decidedBy: 'Régularisation administrative',
    motif: 'régularisation du 07/09',
}

export const receivedTransactions = [
    { id: 'received-1', reference: 'CP-2026-0905-1842', employee: 'Client CartePro', date: '2026-09-05', time: '18:42', amount: 42, status: 'Validée' },
    { id: 'received-2', reference: 'CP-2026-0904-1027', employee: 'Client CartePro', date: '2026-09-04', time: '10:27', amount: 28, status: 'Validée' },
    { id: 'received-3', reference: 'CP-2026-09-02-1615', employee: 'Client CartePro', date: '2026-09-02', time: '16:15', amount: 35.5, status: 'Validée' },
    { id: 'received-4', reference: 'CP-2026-09-01-0931', employee: 'Client CartePro', date: '2026-09-01', time: '09:31', amount: 18, status: 'Validée' },
]
