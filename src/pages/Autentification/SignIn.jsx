import { Link } from 'react-router-dom';

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
        </div>
    );
};

export default SignIn;