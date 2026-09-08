import { Navigate, Outlet } from 'react-router-dom'
import { request } from '../services/http'
import { useAsync } from '../services/useAsync'
import LoadingState from './ui/LoadingState'

const getSession = () => request('/auth/session')
const homeByRole = { EMPLOYEE: '/accueil', PARTNER: '/partenaire/tableau-de-bord', ADMIN: '/admin/tableau-de-bord' }

// Cette garde améliore la navigation. Le serveur reste l'autorité de sécurité
// et vérifie lui aussi la session et le rôle pour chaque appel API sensible.
export default function RequireRole({ roles }) {
  const { data: user, loading, error } = useAsync(getSession, [], { throwOnError: false })

  if (loading) return <LoadingState label="Vérification de votre session…" />
  if (error?.status === 401 || error?.status === 403) return <Navigate to="/connexion" replace />
  if (error) throw error
  if (!user || !homeByRole[user.role]) return <Navigate to="/connexion" replace />
  if (!roles.includes(user.role)) return <Navigate to={homeByRole[user.role]} replace />
  return <Outlet />
}
