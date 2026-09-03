import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
// import QrCodePage from './pages/QrCodePage'
import QrLibraryPage from './pages/QrLibraryPage'
// import PartnersPage from './pages/PartnersPage'
// import HistoryPage from './pages/HistoryPage'
// import HelpPage from './pages/HelpPage'
// import ScanSuccess from './pages/ScanSuccess'
// import EmployeeSpace from './pages/EmployeeSpace'
import { QrCodesProvider } from './context/QrCodesContext'
import Layout from './components/Layout.jsx'

export default function App() {
    return (
        <QrCodesProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/mes-qr-codes" element={<QrLibraryPage />} />
                        {/* <Route path="/qr-code" element={<QrCodePage />} /> */}
                        {/* <Route path="/partenaires" element={<PartnersPage />} /> */}
                        {/* <Route path="/historique" element={<HistoryPage />} /> */}
                        {/* <Route path="/aide" element={<HelpPage />} /> */}
                    </Route>
                    {/* <Route path="/scan-reussi" element={<ScanSuccess />} /> */}
                    {/* <Route path="/espace-salarie" element={<EmployeeSpace />} /> */}
                </Routes>
            </BrowserRouter>
        </QrCodesProvider>
    )
}
