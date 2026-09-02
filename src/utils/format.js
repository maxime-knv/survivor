const currencyFormatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
})

export function formatCurrency(amount) {
    return currencyFormatter.format(amount)
}

export function formatSignedCurrency(amount) {
    const sign = amount > 0 ? '+' : ''
    return `${sign}${formatCurrency(amount)}`
}

const weekdayFormatter = new Intl.DateTimeFormat('fr-FR', { weekday: 'short' })

// Repère "aujourd'hui" figé sur la date des données de démonstration :
// à réévaluer (ou passer new Date() par défaut) une fois branché sur de vraies
// transactions horodatées en continu.
export function formatTransactionDay(isoDate, referenceDate = new Date('2026-09-02')) {
    const date = new Date(isoDate)
    const diffDays = Math.round((referenceDate - date) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Aujourd’hui'
    if (diffDays === 1) return 'Hier'

    const label = weekdayFormatter.format(date)
    return `${label.charAt(0).toUpperCase()}${label.slice(1)} ${date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long' })}`
}
