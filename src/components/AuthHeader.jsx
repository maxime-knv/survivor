import { Link, NavLink } from 'react-router-dom'

export default function AuthHeader() {
  return <header className="gov-header auth-header">
    <div className="gov-header-inner">
      <Link className="gov-service-name" to="/">CartePro</Link>
      <Link className="link-btn" to="/connexion">Se connecter</Link>
    </div>
    <nav className="auth-profiles" aria-label="Choisir son profil">
      <NavLink to="/inscription" end className={({ isActive }) => `auth-profile${isActive ? ' active' : ''}`}>
        <strong>Salarié</strong><span>Créer mon compte</span>
      </NavLink>
      <NavLink to="/inscription-partenaire" className={({ isActive }) => `auth-profile${isActive ? ' active' : ''}`}>
        <strong>Partenaire</strong><span>Demander mon inscription</span>
      </NavLink>
      <Link to="/connexion?profil=admin" className="auth-profile">
        <strong>Administrateur</strong><span>Accéder à mon compte</span>
      </Link>
    </nav>
  </header>
}
