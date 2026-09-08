import { NavLink, Outlet } from 'react-router-dom'
import { LayoutDashboard, FileCheck2, Users, HandCoins } from 'lucide-react'

const navigation = [
    { to: '/admin/tableau-de-bord', label: 'Tableau de bord national', icon: LayoutDashboard },
    { to: '/admin/demandes-partenaires', label: 'Demandes partenaires', icon: FileCheck2 },
    { to: '/admin/comptes', label: 'Comptes', icon: Users },
    { to: '/admin/abondements', label: 'Abondements employeurs', icon: HandCoins },
]

export default function AdminLayout() {
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
                                <span className="gov-service-tag">Administration</span>
                            </span>
                        </div>
                    </div>

                    <div className="gov-header-user">
                        <div className="profile-text">
                            <div className="user-name">Jean-Eudes Berlier</div>
                            <div className="user-role">Administrateur</div>
                        </div>
                        <div className="avatar" aria-hidden="true">M</div>
                    </div>
                </div>

                <nav className="gov-nav" aria-label="Navigation de l’espace administration">
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
