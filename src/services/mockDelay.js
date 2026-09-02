const MOCK_LATENCY_MS = 300

// Simule une vraie latence réseau pour que les états de chargement des pages
// soient réellement exercés, pas seulement écrits pour la forme.
export function mockDelay(value) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(value), MOCK_LATENCY_MS)
    })
}
