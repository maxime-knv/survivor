import { Link } from 'react-router-dom'

export default function NotFoundPage() {
    return (
        <div className="standalone-page">
            <div className="standalone-header">
                <h1 className="standalone-title">Page introuvable</h1>
            </div>

            <div className="standalone-card">
                <p>Cette page n'existe pas ou plus.</p>
                <Link className="primary-btn" to="/">Retour à l'accueil</Link>
            </div>

            <p className="standalone-disclaimer">Démonstrateur technique, ne constitue pas un service public en exploitation.</p>
        </div>
    )
}
