import { Link } from 'react-router-dom'
import { useState } from 'react'
import PageHeader from '../../components/ui/PageHeader'
import { partnerCategories } from '../../data/partners'
import { submitPartnerApplication } from '../../services/partnerApplicationService'
import { isValidSiret } from '../../utils/siret'

const PartnerSignUp = () => {
    const [companyName, setCompanyName] = useState('')
    const [siret, setSiret] = useState('')
    const [objetSocial, setObjetSocial] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [city, setCity] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setErrorMessage('')

        if (!isValidSiret(siret)) {
            setErrorMessage('Le SIRET doit comporter 14 chiffres.')
            return
        }

        if (!objetSocial.trim()) {
            setErrorMessage('L’objet social est requis.')
            return
        }

        setIsSubmitting(true)
        try {
            await submitPartnerApplication({ companyName, siret, objetSocial, categoryId, city, email, phone })
            setSubmitted(true)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (submitted) {
        return (
            <div className="standalone-page">
                <div className="standalone-header">
                    <h1 className="standalone-title">CartePro</h1>
                </div>
                <div className="standalone-card">
                    <p>Votre demande d’inscription a bien été transmise.</p>
                    <p>Elle sera examinée avant activation de votre compte partenaire.</p>
                    <Link className="primary-btn large-btn" to="/connexion">Retour à la connexion</Link>
                </div>
                <p className="standalone-disclaimer">Démonstrateur technique, ne constitue pas un service public en exploitation.</p>
            </div>
        )
    }

    return (
        <div className="app-shell">
            <header className="gov-header">
                <div className="gov-header-inner">
                    <div className="gov-brand">
                        <div className="gov-brand-text">
                            <span className="gov-service-name">CartePro</span>
                        </div>
                    </div>
                    <div>
                        <Link className="nav-item" to="/inscription">Salarié</Link>
                        <Link className="nav-item active" to="/inscription-partenaire">Partenaire</Link>
                        <Link className="nav-item" to="/connexion">Connexion</Link>
                    </div>
                </div>
            </header>

            <main className="auth-main">
                <div className="page-container">
                    <PageHeader title="Inscription partenaire" />
                    <p className="form-intro">Votre compte sera activé après validation manuelle.</p>

                    <form onSubmit={handleSubmit}>
                        <section className="panel form-panel">
                            <label htmlFor="companyName">Raison sociale</label>
                            <div className="input-row amount-box">
                                <input
                                    id="companyName"
                                    required
                                    value={companyName}
                                    onChange={(event) => setCompanyName(event.target.value)}
                                />
                            </div>

                            <label htmlFor="siret">Numéro SIRET</label>
                            <div className="input-row amount-box">
                                <input
                                    id="siret"
                                    required
                                    inputMode="numeric"
                                    placeholder="14 chiffres"
                                    value={siret}
                                    onChange={(event) => setSiret(event.target.value)}
                                />
                            </div>

                            <label htmlFor="objetSocial">Objet social</label>
                            <div className="input-row note-row">
                                <input
                                    id="objetSocial"
                                    required
                                    placeholder="Ex. Restauration rapide et vente à emporter"
                                    value={objetSocial}
                                    onChange={(event) => setObjetSocial(event.target.value)}
                                />
                            </div>

                            <label htmlFor="category">Catégorie</label>
                            <div className="input-row static-row">
                                <select id="category" required value={categoryId} onChange={(event) => setCategoryId(event.target.value)}>
                                    <option value="">Choisir une catégorie</option>
                                    {partnerCategories.map((category) => (
                                        <option key={category.id} value={category.id}>{category.label}</option>
                                    ))}
                                </select>
                            </div>

                            <label htmlFor="city">Ville</label>
                            <div className="input-row amount-box">
                                <input id="city" required value={city} onChange={(event) => setCity(event.target.value)} />
                            </div>

                            <label htmlFor="email">Email de contact</label>
                            <div className="input-row amount-box">
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </div>

                            <label htmlFor="phone">Téléphone</label>
                            <div className="input-row amount-box">
                                <input id="phone" required value={phone} onChange={(event) => setPhone(event.target.value)} />
                            </div>
                        </section>
                        {errorMessage && <p role="alert" className="field-error">{errorMessage}</p>}
                        <button className="primary-btn large-btn" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Envoi...' : 'Envoyer ma demande'}
                        </button>
                    </form>
                </div>
            </main>

            <footer className="gov-footer">
                <div className="gov-footer-inner">
                    <span>Démonstrateur technique, ne constitue pas un service public en exploitation.</span>
                </div>
            </footer>
        </div>
    )
}

export default PartnerSignUp
