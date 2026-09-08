import { Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import LoadingState from '../components/ui/LoadingState'
import { getPartners, getPartnerCategories } from '../services/partnersService'
import { useAsync } from '../services/useAsync'

export default function PublicHomePage() {
    const { data: partners, loading: partnersLoading, error: partnersError } = useAsync(getPartners, [], { throwOnError: false })
    const { data: categories, loading: categoriesLoading, error: categoriesError } = useAsync(getPartnerCategories, [], { throwOnError: false })

    const categoryLabel = (categoryId) =>
        (categories ?? []).find((category) => category.id === categoryId)?.label ?? 'Partenaire'

    return (
        <div className="app-shell">
            <header className="gov-header">
                <div className="gov-header-inner">
                    <div className="gov-brand">
                        <div className="gov-brand-text">
                            <span className="gov-service-name">CartePro</span>
                        </div>
                    </div>

                    <Link to="/connexion" className="link-btn">Se connecter</Link>
                </div>
            </header>

            <main className="main-panel" id="main-content">
                <div className="page-container">
                    <PageHeader title="CartePro" />
                    <p className="partners-intro">
                        Le catalogue des partenaires référencés par le dispositif CartePro, consultable sans connexion.
                    </p>
                    <div className="auth-actions">
                        <Link className="primary-btn" to="/inscription">Créer un compte salarié</Link>
                        <Link className="link-btn" to="/inscription-partenaire">Devenir partenaire</Link>
                    </div>

                    {partnersLoading || categoriesLoading ? (
                        <LoadingState label="Chargement..." />
                    ) : partnersError || categoriesError ? (
                        <section className="panel" role="alert">
                            <h2>Catalogue momentanément indisponible</h2>
                            <p>{(partnersError || categoriesError).message}</p>
                            <button className="primary-btn" onClick={() => window.location.reload()}>Réessayer</button>
                        </section>
                    ) : !partners?.length ? <p>Aucun partenaire référencé pour le moment.</p> : (
                        <div className="qr-library-grid">
                            {partners.map((partner) => (
                                <article key={partner.id} className="panel qr-library-card">
                                    <span className="partner-category-tag">{categoryLabel(partner.categoryId)}</span>
                                    <div className="qr-library-label">{partner.name}</div>
                                    <div className="qr-library-expiry">{partner.city}</div>
                                </article>
                            ))}
                        </div>
                    )}
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
