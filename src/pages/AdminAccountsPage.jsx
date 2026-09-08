import { useState } from 'react'
import PageHeader from '../components/ui/PageHeader'
import { getEmployees, getAdminPartners } from '../services/adminService'
import { setPartnerStatus } from '../services/partnerAccountService'
import { useAsync } from '../services/useAsync'
import { formatCurrency } from '../utils/format'
export default function AdminAccountsPage() {
  const { data: employees, loading } = useAsync(getEmployees, [])
  const { data: partners, loading: partnerLoading } = useAsync(getAdminPartners, [])
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  async function toggle(partner) {
    setBusy(true); setError('')
    try { await setPartnerStatus(partner.status === 'Actif' ? 'Suspendu' : 'Actif', partner.id); setNotice('Statut mis à jour. La liste se rafraîchit automatiquement.') }
    catch (err) { setError(err.message) }
    finally { setBusy(false) }
  }
  if (loading || partnerLoading) return <p>Chargement des comptes…</p>
  return <>
    <PageHeader title="Comptes" />
    {notice && <p role="status">{notice}</p>}
    {error && <p role="alert">{error}</p>}
    <section className="panel"><h2>Partenaires</h2>
      {partners.map(partner => <div className="activity-row" key={partner.id}>
        <span>{partner.name} — {partner.status}</span>
        {partner.ownerId && <button disabled={busy} onClick={() => toggle(partner)}>{partner.status === 'Actif' ? 'Suspendre' : 'Réactiver'}</button>}
      </div>)}
    </section>
    <section className="panel"><h2>Salariés</h2>
      {employees.map(employee => <div className="activity-row" key={employee.id}><span>{employee.name} — {employee.company}</span><strong>{formatCurrency(employee.balance)}</strong></div>)}
    </section>
  </>
}
