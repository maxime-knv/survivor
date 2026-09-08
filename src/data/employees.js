// Base salariés simplifiée pour la démo de l'écran d'administration : les
// totaux affichés doivent refléter "tous salariés confondus", pas
// seulement le compte de démonstration Alex Martin (voir data/user.js).
// Soldes régularisés le 2026-09-07 (voir src/migrations/2026-09-07-regularisation-soldes.js) :
// aucun solde ne peut rester négatif.
export const otherEmployeeAccounts = [
    { id: 'emp-2', name: 'Sofia Nguyen', company: 'Atelier Nord', balance: 0 },
    { id: 'emp-3', name: 'Karim Belhadj', company: 'Atelier Nord', balance: 0 },
    { id: 'emp-4', name: 'Julie Perrot', company: 'Entreprise Démo', balance: 320 },
]
