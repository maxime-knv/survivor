import { useEffect, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import SimulationBadge from '../components/ui/SimulationBadge'
import LoadingState from '../components/ui/LoadingState'
import { getEmployers, updateEmployerTopUp } from '../services/employersService'
import { formatCurrency } from '../utils/format'

export default function AdminEmployerTopUpsPage() {
    const [employers, setEmployers] = useState([])
    const [loading, setLoading] = useState(true)
    const [drafts, setDrafts] = useState({})
    const [notice, setNotice] = useState('')

    useEffect(() => {
        let cancelled = false
        getEmployers().then((list) => {
            if (!cancelled) {
                setEmployers(list)
                setDrafts(Object.fromEntries(list.map((employer) => [employer.id, String(employer.monthlyTopUp)])))
                setLoading(false)
            }
        })
        return () => {
            cancelled = true
        }
    }, [])

    async function handleSave(id) {
        const amount = Number(drafts[id])
        if (!Number.isFinite(amount) || amount < 0) return
        await updateEmployerTopUp(id, amount)
        setEmployers(await getEmployers())
        setNotice('Abondement mis à jour.')
    }

    if (loading) {
        return (
            <>
                <PageHeader title="Abondements employeurs" />
                <LoadingState label="Chargement..." />
            </>
        )
    }

    return (
        <>
            <PageHeader title="Abondements employeurs" />

            <SimulationBadge />

            {notice ? (
                <div className="success-notice" role="status">
                    <CheckCircle2 size={18} /> {notice}
                </div>
            ) : null}

            <section className="panel ledger-panel">
                <div className="ledger-header">
                    <div>
                        <h2>Employeurs</h2>
                        <p>Montant mensuel abondé par salarié, appliqué automatiquement (« Simuler l’abondement »).</p>
                    </div>
                </div>

                {employers.map((employer) => (
                    <div key={employer.id} className="activity-row">
                        <div className="activity-left">
                            <div>
                                <div className="activity-name">{employer.name}</div>
                                <div className="activity-time">
                                    {employer.employeeCount} salarié{employer.employeeCount > 1 ? 's' : ''} · actuellement {formatCurrency(employer.monthlyTopUp)} / mois
                                </div>
                            </div>
                        </div>
                        <div className="admin-review-actions">
                            <div className="input-row amount-box employer-amount-input">
                                <span className="currency">€</span>
                                <input
                                    type="number"
                                    min="0"
                                    step="10"
                                    value={drafts[employer.id] ?? ''}
                                    onChange={(event) => setDrafts((prev) => ({ ...prev, [employer.id]: event.target.value }))}
                                />
                            </div>
                            <button className="link-btn" type="button" onClick={() => handleSave(employer.id)}>
                                Enregistrer
                            </button>
                        </div>
                    </div>
                ))}
            </section>
        </>
    )
}
