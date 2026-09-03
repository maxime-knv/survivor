import { Link } from 'react-router-dom';
import PageHeader from '../../components/ui/PageHeader';
const SignIn = () => {
    return (
        <div className="app-shell">
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
                    <div>
                        <Link className="nav-item active" to="/inscription">Inscription</Link>
                        <Link className="nav-item" to="/connexion">Connexion</Link>
                    </div>
                </div>
            </header>
            <main className="main-panel">
                <div className="page-container">
                    <PageHeader title="Connexion"/>
                    <section className="panel form-panel">
                        <span>Email</span>
                        <div className="input-row amount-box">
                            <input id="email" />
                        </div>
                        <span>Mot de passe</span>
                        <div className="input-row amount-box">
                            <input id="password" />
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default SignIn;