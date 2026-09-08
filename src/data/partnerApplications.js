// Demandes d'inscription partenaire. Circuit v1.0 : contrôle par un agent avec
// pièces justificatives (SIRET/SIREN, objet social), décision motivée et tracée
// (`decidedAt`/`decidedBy`/`motif`) — pas de validation en un clic.
export const partnerApplications = [
    {
        id: 'application-1',
        companyName: 'Librairie Pages & Café',
        siret: '812 345 678 00019',
        objetSocial: 'Librairie indépendante avec coin café',
        categoryId: 'culture',
        city: 'Lyon',
        email: 'contact@pages-cafe.exemple',
        phone: '04 72 00 00 00',
        status: 'pending',
        submittedAt: '2026-09-04',
        decidedAt: null,
        decidedBy: null,
        motif: null,
    },
    {
        id: 'application-2',
        companyName: 'Le Comptoir du Midi',
        siret: '812 456 789 00034',
        objetSocial: 'Restauration rapide et formule déjeuner',
        categoryId: 'restauration',
        city: 'Marseille',
        email: 'contact@lecomptoirdumidi.exemple',
        phone: '04 91 00 00 00',
        status: 'approved',
        submittedAt: '2026-09-01',
        decidedAt: '2026-09-07',
        decidedBy: 'Régularisation administrative',
        motif: 'régularisation du 07/09',
    },
]
