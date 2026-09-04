import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/ui/PageHeader';
import { useState } from 'react';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignIn = async (event) => {
        event.preventDefault();
        setErrorMessage('');

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Connexion réussie.');
            navigate('/');
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

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
                        <Link className="nav-item" to="/inscription">Inscription</Link>
                        <Link className="nav-item active" to="/connexion">Connexion</Link>
                    </div>
                </div>
            </header>

            <main className="auth-main">
                <div className="page-container">
                    <PageHeader title="Connexion"/>
                    <form onSubmit={handleSignIn}>
                        <section className="panel form-panel">
                            <label htmlFor="email">Email</label>
                            <div className="input-row amount-box">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </div>

                            <label htmlFor="password">Mot de passe</label>
                            <div className="input-row amount-box">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    required
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </div>
                        </section>
                        {errorMessage && <p role="alert">{errorMessage}</p>}
                        <button className="primary-btn large-btn" type="submit">Connexion</button>
                    </form>
                </div>
            </main>
            
        </div>
    );
};

export default SignIn;