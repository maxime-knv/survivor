import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signOut } from '../services/authService'
export default function SignOutButton() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  return <div><button className="link-btn" onClick={async () => {
    try { await signOut(); navigate('/connexion', { replace: true }) }
    catch (err) { setError(err.message) }
  }}>Se déconnecter</button>{error && <p role="alert">{error}</p>}</div>
}
