import { Component } from 'react'
import { Link, useLocation } from 'react-router-dom'

class ErrorBoundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) { return { error } }
  render() {
    if (!this.state.error) return this.props.children
    return <main className="page-container panel" role="alert">
      <h1>Impossible de charger cette page</h1>
      <p>{this.state.error.message}</p>
      <div className="auth-actions">
        <button className="primary-btn" onClick={() => window.location.reload()}>Réessayer</button>
        <Link className="link-btn" to="/">Accueil</Link>
        <Link className="link-btn" to="/connexion">Se connecter</Link>
      </div>
    </main>
  }
}

export default function PageBoundary({ children }) {
  const location = useLocation()
  return <ErrorBoundary key={location.pathname}>{children}</ErrorBoundary>
}
