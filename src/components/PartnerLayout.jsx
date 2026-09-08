import { NavLink, Outlet } from 'react-router-dom'
import SignOutButton from './SignOutButton'
import { LayoutDashboard, ClipboardCheck, Store, UserRound } from 'lucide-react'
import { getPartnerAccount } from '../services/partnerAccountService'
import { useAsync } from '../services/useAsync'

const navigation = [
    { to: '/partenaire/tableau-de-bord', label: 'Tableau de bord', icon: LayoutDashboard },
    { to: '/partenaire/transactions', label: 'Transactions reçues', icon: ClipboardCheck },
    { to: '/partenaire/catalogue', label: 'Catalogue partenaires', icon: Store },
    { to: '/partenaire/compte', label: 'Mon compte', icon: UserRound },
]

export default function PartnerLayout() {
    const { data: partnerAccount, loading } = useAsync(getPartnerAccount, [])
    if (loading) return <p>Chargement du compte partenaire…</p>
    return (
        <div className="app-shell">
            <a className="skip-link" href="#main-content">
                Aller au contenu principal
            </a>

            <header className="gov-header">
                <div className="gov-header-inner">
                    <div className="gov-brand">
                        <div className="gov-brand-text">
                            <span className="gov-service-name">
                                CartePro
                                <span className="gov-service-tag">Espace partenaire</span>
                            </span>
                        </div>
                    </div>

                    <div className="gov-header-user">
                        <SignOutButton />
                        <div className="profile-text">
                            <div className="user-name">{partnerAccount.name}</div>
                            <div className="user-role">{partnerAccount.category}, {partnerAccount.location}</div>
                        </div>
                        <div className="avatar" aria-hidden="true">{partnerAccount.name.charAt(0)}</div>
                    </div>
                </div>

                <nav className="gov-nav" aria-label="Navigation de l’espace partenaire">
                    <div className="gov-nav-inner">
                        {navigation.map(({ to, label, icon: Icon }) => (
                            <NavLink
                                key={to}
                                to={to}
                                className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
                            >
                                <span className="nav-icon">
                                    <Icon size={16} strokeWidth={2.2} />
                                </span>
                                <span>{label}</span>
                            </NavLink>
                        ))}
                    </div>
                </nav>
            </header>

            <main className="main-panel" id="main-content">
                <div className="page-container">
                    <Outlet />
                </div>
            </main>

            <footer className="gov-footer">
                <div className="gov-footer-inner">
                    <span>Démonstrateur technique, ne constitue pas un service public en exploitation.</span>
                    <div className="gov-footer-links">
                        <a href="/aide">Aide</a>
                        <a href="mailto:support@cartepro.exemple">Nous contacter</a>
                        <a href="/aide">Accessibilité : non conforme</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
