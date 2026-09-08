// Compatibilité pour les routes existantes : l'identité est désormais issue
// du cookie signé, jamais d'un e-mail envoyé par le navigateur.
export { requireAuth as resolveUser } from './requireAuth.js'
