import AuthHeader from '../../components/AuthHeader'
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/ui/PageHeader';
import { useState } from 'react';
import { signIn } from '../../services/authService'

// Redirection vers l'espace correspondant au rôle renvoyé par le backend
// (server/src/routes/auth.js) : un salarié, un partenaire et un admin ne
// voient pas la même interface après connexion.
const HOME_BY_ROLE = {
    EMPLOYEE: '/accueil',
    PARTNER: '/partenaire/tableau-de-bord',
    ADMIN: '/admin/tableau-de-bord',
}

const SignIn = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignIn = async (event) => {
        event.preventDefault();
        setErrorMessage('');

        try {
            const user = await signIn({ email, password });
            navigate(HOME_BY_ROLE[user.role] ?? '/accueil');
        } catch (error) {
            setErrorMessage(error.message || 'Impossible de se connecter.');
        }
    };

    return (
        <div className="app-shell">
            <AuthHeader />

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
