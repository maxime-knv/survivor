import { mockDelay } from './mockDelay'

const STORAGE_KEY = 'cartepro.qrCodes'

function seedQrCodes() {
    const now = Date.now()
    return [
        { id: 'seed-1', amount: 12, label: 'Déjeuner équipe', generatedAt: new Date(now - 10 * 60000).toISOString() },
        { id: 'seed-2', amount: 45, label: 'Chapelier Fontaine', generatedAt: new Date(now - 45 * 60000).toISOString() },
        { id: 'seed-3', amount: 28, label: '', generatedAt: new Date(now - 2 * 24 * 60 * 60000).toISOString() },
    ]
}

function readStore() {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY)
        if (raw) return JSON.parse(raw)
    } catch {
        // stockage indisponible (navigation privée, etc.) : on repart des données de démo
    }
    return seedQrCodes()
}

function writeStore(list) {
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
    } catch {
        // stockage indisponible : la session reste utilisable sans persistance
    }
}

export async function listQrCodes() {
    return mockDelay(readStore())
}

export async function createQrCode({ amount, label }) {
    const entry = {
        id: `qr-${Date.now()}`,
        amount,
        label,
        generatedAt: new Date().toISOString(),
    }
    writeStore([entry, ...readStore()])
    return mockDelay(entry)
}
