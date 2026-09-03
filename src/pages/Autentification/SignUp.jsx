import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/ui/PageHeader'
import { useState } from 'react';
import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleAccountCreation = async (event) => {
        event.preventDefault();
        setErrorMessage('');

        if (password !== confirmPassword) {
            setErrorMessage('Les mots de passe ne correspondent pas.');
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('Compte créé avec succès.');
            navigate('/connexion');
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
                        <Link className="nav-item active" to="/inscription">Inscription</Link>
                        <Link className="nav-item" to="/connexion">Connexion</Link>
                    </div>
                </div>
            </header>

            <main className="auth-main">
                <div className="page-container">
                    <PageHeader title="Inscription"/>
                    <form onSubmit={handleAccountCreation}>
                        <section className="panel form-panel">
                            <label htmlFor="email">Email</label>
                            <div className="input-row amount-box">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <label htmlFor="confirmPassword">Confirmer mot de passe</label>
                            <div className="input-row amount-box">
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </section>
                        {errorMessage && <p role="alert">{errorMessage}</p>}
                        <button className="primary-btn large-btn" type="submit">Inscription</button>
                    </form>
                </div>
            </main>

        </div>
    );
};

export default SignUp;