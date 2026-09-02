// Historique simulé : une transaction validée est considérée immuable côté produit.
// aucune donnée de statut "modifiable" n'est représentée ici.
export const transactions = [
    {
        id: 'txn-1',
        label: 'Glaces Artisanales Corrèze',
        partnerId: 'glaces-artisanales-correze',
        date: '2026-09-02',
        time: '12:32',
        amount: -6.5,
        type: 'depense',
    },
    {
        id: 'txn-2',
        label: 'Abondement employeur (Entreprise Démo)',
        partnerId: null,
        date: '2026-09-01',
        time: '08:00',
        amount: 480,
        type: 'credit',
    },
    {
        id: 'txn-3',
        label: 'KostumParty',
        partnerId: 'kostumparty',
        date: '2026-08-29',
        time: '17:20',
        amount: -32,
        type: 'depense',
    },
    {
        id: 'txn-4',
        label: 'Chapelier Fontaine',
        partnerId: 'chapelier-fontaine',
        date: '2026-08-27',
        time: '15:10',
        amount: -45,
        type: 'depense',
    },
    {
        id: 'txn-5',
        label: 'Poney Dream 78',
        partnerId: 'poney-dream-78',
        date: '2026-08-24',
        time: '10:05',
        amount: -28,
        type: 'depense',
    },
]

// Données de graphique purement décoratives (pas de service dédié : ce n'est
// pas une fonctionnalité du cahier des charges, juste un aperçu visuel).
export const weeklyActivity = [
    { day: 'Lun', value: 64 },
    { day: 'Mar', value: 52 },
    { day: 'Mer', value: 78 },
    { day: 'Jeu', value: 92 },
    { day: 'Ven', value: 60 },
    { day: 'Sam', value: 72 },
    { day: 'Dim', value: 56 },
]
