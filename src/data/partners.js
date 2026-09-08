// Catalogue conforme au cahier des charges annoté par le Ministre (v1.1) :
// partenaires réels du lancement, pas de données inventées.
// Catégories pilotées par la donnée : ajouter/renommer/retirer une catégorie ici
// suffit à faire évoluer le catalogue et l'écran de recherche, sans toucher aux gabarits.
export const partnerCategories = [

    { id: 'restauration', label: 'Restauration' },
    { id: 'alimentation', label: 'Alimentation' },
    { id: 'sante', label: 'Santé' },
    { id: 'mobilite', label: 'Mobilité' },
    { id: 'sport', label: 'Sport' },
]

export const partners = [
    {
        id: 'le-comptoir-du-midi',
        name: 'Le Comptoir du Midi',
        categoryId: 'restauration',
        city: 'unknown',
        description: '',
        featured: true,
    },
    {
        id: 'epicerie-sainte-claire',
        name: 'Épicerie Sainte-Claire',
        categoryId: 'alimentation',
        city: 'unknown',
        description: '',
    },
    {
        id: 'librairie-vasseur',
        name: 'Librairie Vasseur',
        categoryId: 'culture',
        city: 'unknown',
        description: '',
    },
    {
        id: 'pharmacie-du-parc',
        name: 'Pharmacie du Parc',
        categoryId: 'sante',
        city: 'unknown',
        description: '',
    },
    {
        id: 'transports-regionaux-unifies',
        name: 'Transports Régionaux Unifiés',
        categoryId: 'mobilite',
        city: 'unknown',
        description: '',
    },
    {
        id: 'sport-loisirs-aubagne',
        name: 'Sport Loisirs Aubagne',
        categoryId: 'sport',
        city: 'unknown',
        description: '',
    },
]
