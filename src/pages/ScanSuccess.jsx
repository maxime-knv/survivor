import { useEffect, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

export default function ScanSuccess() {
    const [message, setMessage] = useState('Vérification du scan en cours...')

    useEffect(() => {
        // Dès que la page s'ouvre (suite au scan), on déclenche l'action
        setScannedState()
    }, [])

    const setScannedState = () => {
        // Vous pouvez ici ajouter un appel API vers votre backend pour valider le paiement/scan
        setMessage('Le code QR a été scanné avec succès ! Bienvenue chez le partenaire.')
    }

    return (
        <div className="standalone-page">
            <div className="standalone-header">
                <div className="standalone-mark" aria-hidden="true">RF</div>
                <span className="standalone-eyebrow">République Française</span>
                <h1 className="standalone-title">Ticket Tout — Ministère du Job et Bonheur</h1>
            </div>

            <div className="standalone-card">
                <CheckCircle2 size={32} strokeWidth={2} color="#18753c" aria-hidden="true" />
                <p role="status">{message}</p>
            </div>
        </div>
    )
}
