import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import EmployeeSpace from './pages/EmployeeSpace';
import ScanSuccess from './pages/ScanSuccess';


function Home() {
    return (
        <div style={{ textAlign: 'center', marginTop: '60px', fontFamily: 'sans-serif' }}>
            <h1 style={{ color: '#2b2b2b' }}>Ministère du Job et Bonheur</h1>
            <h3>Projet : Ticket Tout</h3>
            <p>Bienvenue sur l'application officielle !</p>

            <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
                <Link to="/employee" style={{ padding: '10px 20px', background: '#319795', color: '#fff', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold' }}>
                    Accéder à l'Espace Salarié (Générer le QR Code)
                </Link>
            </div>
        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Route de la page d'accueil */}
                <Route path="/" element={<Home />} />

                {/* Route de l'Espace Salarié (avec le QR code de paiement) */}
                <Route path="/employee" element={<EmployeeSpace />} />


                <Route path="/scan" element={<ScanSuccess />} />
            </Routes>
        </BrowserRouter>



    );
}