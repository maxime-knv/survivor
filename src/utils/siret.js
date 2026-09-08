// Un SIRET est un numéro à 14 chiffres (espaces autorisés à la saisie, ignorés à la validation).
export function isValidSiret(value) {
    return /^\d{14}$/.test(value.replace(/\s/g, ''))
}

export function formatSiret(value) {
    const digits = value.replace(/\s/g, '')
    return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{5})/, '$1 $2 $3 $4')
}
