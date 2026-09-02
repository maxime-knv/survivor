import { NavLink, Outlet } from 'react-router-dom'
import { House, QrCode, FolderOpen, Store, Activity, CircleHelp } from 'lucide-react'
import { currentUser } from '../data/user'

const navigation = [
    { to: '/', label: 'Accueil', icon: House },
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

            <aside className="sidebar">
                <div className="brand-row">
                    <div className="brand-mark">C</div>
                    <span>CartePro</span>
                </div>

                <nav className="nav-menu" aria-label="Navigation principale">
                    {navigation.map(({ to, label, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
                            end={to === '/'}
                        >
              <span className="nav-icon">
                <Icon size={16} strokeWidth={2.2} />
              </span>
                            <span>{label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="profile-box">
                    <div className="avatar">{currentUser.avatarInitial}</div>
                    <div className="profile-text">
                        <div className="user-name">{currentUser.firstName} {currentUser.lastName}</div>
                        <div className="user-role">{currentUser.role}, {currentUser.company}</div>
                    </div>
                </div>
            </aside>

            <main className="main-panel" id="main-content">
                <Outlet />
            </main>
        </div>
    )
}
