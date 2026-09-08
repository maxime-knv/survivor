import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import QrCodePage from './pages/QrCodePage'
import QrLibraryPage from './pages/QrLibraryPage'
import PartnersPage from './pages/PartnersPage'
import HistoryPage from './pages/HistoryPage'
import HelpPage from './pages/HelpPage'
import ScanSuccess from './pages/ScanSuccess'
import EmployeeSpace from './pages/EmployeeSpace'
import PublicHomePage from './pages/PublicHomePage'
import NotFoundPage from './pages/NotFoundPage'
import { QrCodesProvider } from './context/QrCodesContext'
import Layout from './components/Layout.jsx'
import PartnerLayout from './components/PartnerLayout.jsx'
import AdminLayout from './components/AdminLayout.jsx'
import SignUp from './pages/Autentification/SignUp'
import SignIn from './pages/Autentification/SignIn'
import PartnerSignUp from './pages/Autentification/PartnerSignUp'
import PartnerDashboardPage from './pages/PartnerDashboardPage'
import PartnerTransactionsPage from './pages/PartnerTransactionsPage'
import PartnerAccountPage from './pages/PartnerAccountPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import AdminPartnerApplicationsPage from './pages/AdminPartnerApplicationsPage'
import AdminAccountsPage from './pages/AdminAccountsPage'
import AdminEmployerTopUpsPage from './pages/AdminEmployerTopUpsPage'

export default function App() {
    return (
        <QrCodesProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<PublicHomePage />} />
                    <Route path="/inscription" element={<SignUp />} />
                    <Route path="/inscription-partenaire" element={<PartnerSignUp />} />
                    <Route path="/connexion" element={<SignIn />} />

                    <Route element={<Layout />}>
                        <Route path="/accueil" element={<HomePage />} />
                        <Route path="/mes-qr-codes" element={<QrLibraryPage />} />
                        <Route path="/qr-code" element={<QrCodePage />} />
                        <Route path="/partenaires" element={<PartnersPage />} />
                        <Route path="/historique" element={<HistoryPage />} />
                        <Route path="/aide" element={<HelpPage />} />
                    </Route>

                    <Route element={<PartnerLayout />}>
                        <Route path="/partenaire" element={<Navigate to="/partenaire/tableau-de-bord" replace />} />
                        <Route path="/partenaire/tableau-de-bord" element={<PartnerDashboardPage />} />
                        <Route path="/partenaire/transactions" element={<PartnerTransactionsPage />} />
                        <Route path="/partenaire/catalogue" element={<PartnersPage />} />
                        <Route path="/partenaire/compte" element={<PartnerAccountPage />} />
                    </Route>

                    <Route element={<AdminLayout />}>
                        <Route path="/admin" element={<Navigate to="/admin/tableau-de-bord" replace />} />
                        <Route path="/admin/tableau-de-bord" element={<AdminDashboardPage />} />
                        <Route path="/admin/demandes-partenaires" element={<AdminPartnerApplicationsPage />} />
                        <Route path="/admin/comptes" element={<AdminAccountsPage />} />
                        <Route path="/admin/abondements" element={<AdminEmployerTopUpsPage />} />
                    </Route>

                    <Route path="/scan-reussi" element={<ScanSuccess />} />
                    <Route path="/espace-salarie" element={<EmployeeSpace />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </QrCodesProvider>
    )
}
