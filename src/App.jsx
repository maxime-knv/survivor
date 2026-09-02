import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Layout from './components/Layout'
import HomePage from './pages/HomePage'
// import QrCodePage from './pages/QrCodePage'
// import QrLibraryPage from './pages/QrLibraryPage'
import PartnersPage from './pages/PartnersPage'
// import HistoryPage from './pages/HistoryPage'
// import HelpPage from './pages/HelpPage'
import { QrCodesProvider } from './context/QrCodesContext'
import Layout from "./components/Layout.jsx";

export default function App() {
    return (
        <QrCodesProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<HomePage />} />
                       // {/* <Route path="/qr-code" element={<QrCodePage />} /> */}
                        // {/* <Route path="/mes-qr-codes" element={<QrLibraryPage />} /> */}
                        <Route path="/partenaires" element={<PartnersPage />} />
                        //{/* <Route path="/historique" element={<HistoryPage />} /> */}
                        //{/* <Route path="/aide" element={<HelpPage />} /> */}
                    </Route>
                </Routes>
            </BrowserRouter>
        </QrCodesProvider>
    )
}