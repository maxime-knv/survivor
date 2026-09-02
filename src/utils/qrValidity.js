// Règle métier confirmée par le cabinet : un QR CartePro est à usage unique,
// signé "côté serveur" (simulé ici), valide 30 minutes : jamais un montant
// rechargeable ou réutilisable après expiration.
export const QR_VALIDITY_MINUTES = 30

export function getExpiryDate(generatedAtIso) {
  return new Date(new Date(generatedAtIso).getTime() + QR_VALIDITY_MINUTES * 60000)
}

export function isQrValid(generatedAtIso) {
  return getExpiryDate(generatedAtIso).getTime() > Date.now()
}

export function formatTime(date) {
  return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}
