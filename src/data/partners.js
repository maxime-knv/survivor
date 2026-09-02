// Catalogue conforme au cahier des charges annoté par le Ministre (v1.1) :
// partenaires réels du lancement, pas de données inventées.
// Catégories pilotées par la donnée : ajouter/renommer/retirer une catégorie ici
// suffit à faire évoluer le catalogue et l'écran de recherche, sans toucher aux gabarits.
export const partnerCategories = [
    { id: 'loisirs', label: 'Loisirs & Bien-être' },
    { id: 'gastronomie', label: 'Gastronomie' },
    { id: 'shopping', label: 'Shopping & Mode' },
    // Catégorie volontairement vide : les prochains partenaires en cours de
    // signature s'y rattacheront sans qu'il faille toucher à l'interface.
    { id: 'culture', label: 'Culture' },
]

export const partners = [
    {
        id: 'poney-dream-78',
        name: 'Poney Dream 78',
        categoryId: 'loisirs',
        city: 'Région parisienne',
        description: 'Club de poney, excellent pour le team building et la reconnexion à la nature.',
        featured: true,
    },
    {
        id: 'kostumparty',
        name: 'KostumParty',
        categoryId: 'shopping',
        city: 'Paris 11e',
        description: 'Magasin de déguisements : la créativité, c’est la clé du bonheur au travail.',
    },
    {
        id: 'glaces-artisanales-correze',
        name: 'Glaces Artisanales Corrèze',
        categoryId: 'gastronomie',
        city: 'En ligne · Click & collect',
        description: 'Glacier artisanal, en soutien à l’artisanat français.',
    },
    {
        id: 'chapelier-fontaine',
        name: 'Chapelier Fontaine',
        categoryId: 'shopping',
        city: 'Toulouse',
        description: 'Chapeaux en feutre, l’élégance à la française.',
    },
]
