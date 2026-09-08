import { QRCodeSVG } from 'qrcode.react'

export default function EmployeeSpace() {
    const qrValue = `${window.location.origin}/scan-reussi?employee=123`

    return (
        <div className="standalone-page">
            <div className="standalone-header">
                <h1 className="standalone-title">Mon espace salarié</h1>
            </div>

            <div className="standalone-card">
                <p>Présentez ce QR code au partenaire :</p>
                <div className="qr-preview-thumb">
                    <QRCodeSVG value={qrValue} size={200} />
                </div>
                <p className="standalone-amount">32,50 € à dépenser chez vos partenaires préférés !</p>
            </div>

            <p className="standalone-disclaimer">Démonstrateur technique, ne constitue pas un service public en exploitation.</p>
        </div>
    )
}
