// Registre d'archives : les 4 partenaires nominatifs retirés du catalogue actif
// le 2026-09-07 (retour au cahier des charges v1.0). Ils ne sont plus supprimés
// mais conservés ici, `archived: true`, uniquement pour que les transactions
// historiques qui les référencent (voir data/transactions.js) restent
// résolvables — voir `resolvePartnerName` dans data/partners.js.
export const archivedPartners = [
    {
        id: 'poney-dream-78',
        name: 'Poney Dream 78',
        categoryId: 'loisirs',
        archived: true,
        archivedAt: '2026-09-07',
        archivedReason: 'Retrait du catalogue v1.1 non contractuel, retour au cahier des charges v1.0',
    },
    {
        id: 'kostumparty',
        name: 'KostumParty',
        categoryId: 'shopping',
        archived: true,
        archivedAt: '2026-09-07',
        archivedReason: 'Retrait du catalogue v1.1 non contractuel, retour au cahier des charges v1.0',
    },
    {
        id: 'glaces-artisanales-correze',
        name: 'Glaces Artisanales Corrèze',
        categoryId: 'gastronomie',
        archived: true,
        archivedAt: '2026-09-07',
        archivedReason: 'Retrait du catalogue v1.1 non contractuel, retour au cahier des charges v1.0',
    },
    {
        id: 'chapelier-fontaine',
        name: 'Chapelier Fontaine',
        categoryId: 'shopping',
        archived: true,
        archivedAt: '2026-09-07',
        archivedReason: 'Retrait du catalogue v1.1 non contractuel, retour au cahier des charges v1.0',
    },
]
