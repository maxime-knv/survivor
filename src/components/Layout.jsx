import { NavLink, Outlet } from 'react-router-dom'
import { House, QrCode, FolderOpen, Store, Activity, CircleHelp } from 'lucide-react'
import { currentUser } from '../data/user'

const navigation = [
    { to: '/accueil', label: 'Accueil', icon: House },
    { to: '/qr-code', label: 'Code QR', icon: QrCode },
    { to: '/mes-qr-codes', label: 'Mes QR codes', icon: FolderOpen },
    { to: '/partenaires', label: 'Partenaires', icon: Store },
    { to: '/historique', label: 'Historique', icon: Activity },
    { to: '/aide', label: 'Aide', icon: CircleHelp },
]

export default function Layout() {
    return (
        <div className="app-shell">
            <a className="skip-link" href="#main-content">
                Aller au contenu principal
            </a>

            <header className="gov-header">
                <div className="gov-header-inner">
                    <div className="gov-brand">
                        <div className="marianne-mark" aria-hidden="true">RF</div>
                        <div className="gov-brand-text">
                            <span className="gov-eyebrow">République Française</span>
                            <span className="gov-service-name">
                                Ticket Tout
                                <span className="gov-service-tag">Ministère du Job et Bonheur</span>
                            </span>
                        </div>
                    </div>

                    <div className="gov-header-user">
                        <div className="profile-text">
                            <div className="user-name">{currentUser.firstName} {currentUser.lastName}</div>
                            <div className="user-role">{currentUser.role}, {currentUser.company}</div>
                        </div>
                        <div className="avatar" aria-hidden="true">{currentUser.avatarInitial}</div>
                    </div>
                </div>

                <nav className="gov-nav" aria-label="Navigation principale">
                    <div className="gov-nav-inner">
                        {navigation.map(({ to, label, icon: Icon }) => (
                            <NavLink
                                key={to}
                                to={to}
                                className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
                                end={to === '/accueil'}
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
                    <span>© République Française — Ministère du Job et Bonheur</span>
                    <div className="gov-footer-links">
                        <a href="/aide">Aide</a>
                        <a href="mailto:support@tickettout.exemple">Nous contacter</a>
                        <a href="/aide">Accessibilité : non conforme</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
