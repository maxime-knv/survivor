import { createContext, useContext, useEffect, useState } from 'react'
import { listQrCodes, createQrCode } from '../services/qrCodesService'

const QrCodesContext = createContext(null)

export function QrCodesProvider({ children }) {
    const [qrCodes, setQrCodes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let cancelled = false
        listQrCodes().then((list) => {
            if (!cancelled) {
                setQrCodes(list)
                setLoading(false)
            }
        })
        return () => {
            cancelled = true
        }
    }, [])

    async function addQrCode({ amount, label }) {
        const entry = await createQrCode({ amount, label })
        setQrCodes((prev) => [entry, ...prev])
        return entry
    }

    return (
        <QrCodesContext.Provider value={{ qrCodes, loading, addQrCode }}>
            {children}
        </QrCodesContext.Provider>
    )
}

export function useQrCodes() {
    const context = useContext(QrCodesContext)
    if (!context) throw new Error('useQrCodes doit être utilisé sous QrCodesProvider')
    return context
}
