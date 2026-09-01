import React, { useEffect, useState } from 'react';

export default function ScanSuccess() {
    const [message, setMessage] = useState("Vérification du scan en cours...");

    useEffect(() => {
        // Dès que la page s'ouvre (suite au scan), on déclenche l'action
        setScannedState();
    }, []);

    const setScannedState = () => {
        // Vous pouvez ici ajouter un appel API vers votre backend pour valider le paiement/scan
        setMessage("✅ Le QR code a été scanné avec succès ! Bienvenue chez le partenaire.");
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
            <h1 style={{ color: '#2b2b2b' }}>Ministère du Job et Bonheur - Ticket Tout</h1>
            <div style={{ padding: '20px', background: '#e6fffa', border: '2px solid #319795', borderRadius: '8px', marginTop: '20px' }}>
                <p style={{ fontSize: '18px', color: '#234e52', fontWeight: 'bold' }}>{message}</p>
            </div>
        </div>
    );
}