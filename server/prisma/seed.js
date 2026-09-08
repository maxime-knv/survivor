// Peuple la base avec les mêmes données que celles utilisées en mock côté
// front (src/data/*.js), pour que la démo reste identique une fois branchée
// sur la vraie base.
//
// Utilisation : npm run db:seed (depuis server/)
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const categories = [
  { id: 'restauration', label: 'Restauration' },
  { id: 'alimentation', label: 'Alimentation' },
  { id: 'sante', label: 'Santé' },
  { id: 'mobilite', label: 'Mobilité' },
  { id: 'sport', label: 'Sport' },
  { id: 'culture', label: 'Culture'},
]

const partners = [
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
  // Mot de passe de démo, en clair uniquement ici (seed) : "Demo1234!"
  const demoPasswordHash = await bcrypt.hash('Demo1234!', 10)
  const user = await prisma.user.upsert({
    where: { email: 'alex.martin@demo.ticket-tout.fr' },
    update: { password: demoPasswordHash },
    create: {
      email: 'alex.martin@demo.ticket-tout.fr',
      password: demoPasswordHash,
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
      label: 'Le Comptoir du Midi',
      partnerId: 'le-comptoir-du-midi',
      amount: -6.5,
      createdAt: new Date(now - 4 * 24 * 60 * 60000),
    },
    {
      id: 'txn-seed-2',
      label: 'Épicerie Sainte-Claire',
      partnerId: 'epicerie-sainte-claire',
      amount: 480,
      createdAt: new Date(now - 5 * 24 * 60 * 60000),
    },
    {
      id: 'txn-seed-3',
      label: 'Librairie Vasseur',
      partnerId: 'librairie-vasseur',
      amount: -32,
      createdAt: new Date(now - 8 * 24 * 60 * 60000),
    },
    {
      id: 'txn-seed-4',
      label: 'Pharmacie du Parc ',
      partnerId: 'pharmacie-du-parc ',
      amount: -45,
      createdAt: new Date(now - 10 * 24 * 60 * 60000),
    },
    {
      id: 'txn-seed-5',
      label: 'Transports Régionaux Unifiés',
      partnerId: 'transports-régionaux-unifiés',
      amount: -28,
      createdAt: new Date(now - 13 * 24 * 60 * 60000),
    },
    {
      id: 'txn-seed-6',
      label: 'Sport Loisirs Aubagne',
      partnerId: 'sport-loisirs-aubagne',
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
