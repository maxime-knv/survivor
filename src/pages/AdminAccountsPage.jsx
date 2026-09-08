import { useEffect, useState } from 'react'
import { CheckCircle2, PauseCircle, PlayCircle } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import SimulationBadge from '../components/ui/SimulationBadge'
import LoadingState from '../components/ui/LoadingState'
import { getAccount } from '../services/accountService'
import { getOtherEmployeeAccounts } from '../services/employeesService'
import { getPartnerAccount, setPartnerStatus } from '../services/partnerAccountService'
import { useAsync } from '../services/useAsync'
import { formatCurrency } from '../utils/format'

export default function AdminAccountsPage() {
    const { data: account, loading: accountLoading } = useAsync(getAccount, [])
    const { data: otherEmployees, loading: employeesLoading } = useAsync(getOtherEmployeeAccounts, [])

    const [partnerAccount, setPartnerAccountState] = useState(null)
    const [partnerLoading, setPartnerLoading] = useState(true)
    const [notice, setNotice] = useState('')

    useEffect(() => {
        let cancelled = false
        getPartnerAccount().then((data) => {
            if (!cancelled) {
                setPartnerAccountState(data)
                setPartnerLoading(false)
            }
        })
        return () => {
            cancelled = true
        }
    }, [])

    async function handleToggleStatus() {
        const nextStatus = partnerAccount.status === 'Actif' ? 'Suspendu' : 'Actif'
        const updated = await setPartnerStatus(nextStatus)
        setPartnerAccountState({ ...updated })
        setNotice(nextStatus === 'Actif' ? 'Partenaire réactivé.' : 'Partenaire suspendu.')
    }

    if (accountLoading || employeesLoading || partnerLoading) {
        return (
            <>
                <PageHeader title="Comptes" />
                <LoadingState label="Chargement des comptes..." />
            </>
        )
    }

    const employees = [
        { id: 'you', name: account.cardHolder, company: 'Entreprise Démo', balance: account.balance },
        ...otherEmployees,
    ]

    return (
        <>
            <PageHeader title="Comptes" />

            <SimulationBadge />

            {notice ? (
                <div className="success-notice" role="status">
                    <CheckCircle2 size={18} /> {notice}
                </div>
            ) : null}

            <section className="panel ledger-panel">
                <div className="ledger-header">
                    <h2>Comptes partenaires</h2>
                </div>
                <div className="activity-row">
                    <div className="activity-left">
                        <div>
                            <div className="activity-name">{partnerAccount.name}</div>
                            <div className="activity-time">SIRET {partnerAccount.siret} · {partnerAccount.category}</div>
                        </div>
                    </div>
                    <div className="admin-review-actions">
                        <span className={partnerAccount.status === 'Actif' ? 'status-pill' : 'status-pill failed'}>
                            {partnerAccount.status}
                        </span>
                        <button className="link-btn" type="button" onClick={handleToggleStatus}>
                            {partnerAccount.status === 'Actif' ? (
                                <><PauseCircle size={14} /> Suspendre</>
                            ) : (
                                <><PlayCircle size={14} /> Réactiver</>
                            )}
                        </button>
                    </div>
                </div>
            </section>

            <section className="panel ledger-panel">
                <div className="ledger-header">
                    <h2>Comptes salariés</h2>
                </div>
                {employees.map((employee) => (
                    <div key={employee.id} className="activity-row">
                        <div className="activity-left">
                            <div>
                                <div className="activity-name">{employee.name}</div>
                                <div className="activity-time">{employee.company}</div>
                            </div>
                        </div>
                        <div className={`activity-amount${employee.balance < 0 ? ' red' : ' green'}`}>
                            {formatCurrency(employee.balance)}
                        </div>
                    </div>
                ))}
            </section>
        </>
    )
}
