import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/ui/PageHeader'
import { useState } from 'react';
import { createUser } from '../../services/userService';

const SignUp = () => {

    const navigate = useNavigate();
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [entreprise, setEntreprise] = useState('');
    const [role, setRole] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleAccountCreation = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        if (!lastName) {
            setErrorMessage('Veuillez inscrire votre nom.');
            return;
        }
        if (!firstName) {
            setErrorMessage('Veuillez inscrire votre prénom.');
            return;
        }
        if (!email) {
            setErrorMessage('Veuillez inscrire votre email.');
            return;
        }
        if (!role) {
            setErrorMessage('Veuillez sélectionner un profil.');
            return;
        }
        if (password.length < 8) {
            setErrorMessage('Le mot de passe doit contenir au moins 8 caractères.');
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage('Les mots de passe ne correspondent pas.');
            return;
        }
        if (!entreprise) {
            setErrorMessage('Veuillez inscrire votre entreprise.');
            return;
        }
        try {
            await createUser({
                email,
                password,
                firstName,
                lastName,
                company: entreprise,
                role,
            });
            console.log('Compte créé avec succès.');
            navigate('/connexion');
        } catch (error) {
            setErrorMessage(error.message || 'Impossible de créer le compte.');
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
                                CartePro
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
                            <label htmlFor="lastName">Nom</label>
                            <div className="input-row amount-box">
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    required
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>

                            <label htmlFor="firstName">Prénom</label>
                            <div className="input-row amount-box">
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    required
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>

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
                                    name="confiremailmPassword"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <label htmlFor="enterprise">Entreprise</label>
                            <div className="input-row amount-box">
                                <input
                                    type="text"
                                    id="entreprise"
                                    name="entreprise"
                                    required
                                    value={entreprise}
                                    onChange={(e) => setEntreprise(e.target.value)}
                                />
                            </div>
                            <label htmlFor="Role">Role</label>
                            <div className="role-button-div">
                                <button
                                    className={`nav-item role-btn${role === 'EMPLOYEE' ? ' active' : ''}`}
                                    type="button"
                                    aria-pressed={role === 'EMPLOYEE'}
                                    onClick={() => setRole('EMPLOYEE')}
                                >Salarié</button>
                                <button
                                    className={`nav-item role-btn${role === 'PARTNER' ? ' active' : ''}`}
                                    type="button"
                                    aria-pressed={role === 'PARTNER'}
                                    onClick={() => setRole('PARTNER')}
                                >Partenaire</button>
                                <button
                                    className={`nav-item role-btn${role === 'ADMIN' ? ' active' : ''}`}
                                    type="button"
                                    aria-pressed={role === 'ADMIN'}
                                    onClick={() => setRole('ADMIN')}
                                >Administrateur</button>
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