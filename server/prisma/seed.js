// Peuple la base avec les mêmes données que celles utilisées en mock côté
// front (src/data/*.js), pour que la démo reste identique une fois branchée
// sur la vraie base.
//
// Utilisation : npm run db:seed (depuis server/)
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const categories = [
  { id: 'loisirs', label: 'Loisirs & Bien-être' },
  { id: 'gastronomie', label: 'Gastronomie' },
  { id: 'shopping', label: 'Shopping & Mode' },
  { id: 'culture', label: 'Culture' },
]

const partners = [
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

async function main() {
  console.log('Seed : catégories de partenaires...')
  for (const category of categories) {
    await prisma.partnerCategory.upsert({
      where: { id: category.id },
      update: category,
      create: category,
    })
  }

  console.log('Seed : partenaires...')
  for (const partner of partners) {
    await prisma.partner.upsert({
      where: { id: partner.id },
      update: partner,
      create: partner,
    })
  }

  console.log('Seed : utilisateur de démo...')
  const user = await prisma.user.upsert({
    where: { email: 'alex.martin@demo.ticket-tout.fr' },
    update: {},
    create: {
      email: 'alex.martin@demo.ticket-tout.fr',
      firstName: 'Alex',
      lastName: 'Martin',
      company: 'Entreprise Démo',
      role: 'EMPLOYEE',
      balance: 14248.5,
      monthlyCredit: 480,
      monthlySpend: 1240.1,
    },
  })

  console.log('Seed : transactions...')
  const now = Date.now()
  const demoTransactions = [
    {
      id: 'txn-seed-1',
      label: 'Glaces Artisanales Corrèze',
      partnerId: 'glaces-artisanales-correze',
      amount: -6.5,
      createdAt: new Date(now - 4 * 24 * 60 * 60000),
    },
    {
      id: 'txn-seed-2',
      label: 'Abondement employeur (Entreprise Démo)',
      partnerId: null,
      amount: 480,
      createdAt: new Date(now - 5 * 24 * 60 * 60000),
    },
    {
      id: 'txn-seed-3',
      label: 'KostumParty',
      partnerId: 'kostumparty',
      amount: -32,
      createdAt: new Date(now - 8 * 24 * 60 * 60000),
    },
    {
      id: 'txn-seed-4',
      label: 'Chapelier Fontaine',
      partnerId: 'chapelier-fontaine',
      amount: -45,
      createdAt: new Date(now - 10 * 24 * 60 * 60000),
    },
    {
      id: 'txn-seed-5',
      label: 'Poney Dream 78',
      partnerId: 'poney-dream-78',
      amount: -28,
      createdAt: new Date(now - 13 * 24 * 60 * 60000),
    },
  ]

  for (const txn of demoTransactions) {
    await prisma.transaction.upsert({
      where: { id: txn.id },
      update: txn,
      create: { ...txn, userId: user.id },
    })
  }

  console.log('Seed terminé ✅')
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
