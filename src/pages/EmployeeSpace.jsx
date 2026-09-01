import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function EmployeeSpace() {
    // L'URL ou l'identifiant unique qui sera encodé dans le QR code
    // (Par exemple, un lien vers votre page de scan avec l'ID du salarié ou de la transaction)
    const qrValue = "https://votre-site-survivor.vercel.app/scan?employee=123";

    return (
        <div style={{ textAlign: 'center', fontFamily: 'sans-serif', padding: '20px' }}>
            <h1>Ministère du Job et Bonheur</h1>
            <h2>Mon Espace Salarié - Ticket Tout</h2>

            <div style={{ margin: '30px 0', padding: '20px', background: '#f7f7f7', display: 'inline-block', borderRadius: '12px' }}>
                <p style={{ marginBottom: '15px', fontWeight: 'bold', color: '#333' }}>
                    Présentez ce QR code au partenaire :
                </p>

                {/* Affichage du QR code */}
                <QRCodeSVG value={qrValue} size={220} />
            </div>

            <p style={{ fontSize: '18px', color: '#2b6cb0', fontWeight: 'bold' }}>
                32,50€ à dépenser chez vos partenaires préférés !
            </p>
        </div>
    );
}