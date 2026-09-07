import { prisma } from '../lib/prisma.js'

// ⚠️ Solution temporaire : l'app utilise Firebase Auth côté client, mais rien
// ne vérifie encore le token côté serveur (le token n'est pas envoyé par le
// front pour l'instant). En attendant ce branchement (vérifier le
// `Authorization: Bearer <idToken>` avec firebase-admin et en tirer l'email),
// on identifie l'utilisateur via un header `x-user-email`, ou par défaut
// l'utilisateur de démo créé par le seed.
const DEMO_EMAIL = 'alex.martin@demo.ticket-tout.fr'

export async function resolveUser(req, res, next) {
  const email = req.header('x-user-email') || DEMO_EMAIL

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return res.status(404).json({ error: 'Utilisateur introuvable. As-tu lancé le seed ?' })
  }

  req.user = user
  next()
}
