import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, CircleDollarSign, ClipboardCheck, Clock3, Store, TrendingUp } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import SimulationBadge from '../components/ui/SimulationBadge'
import LoadingState from '../components/ui/LoadingState'
import { getReceivedTransactions } from '../services/partnerAccountService'
import { formatCurrency } from '../utils/format'

const formatTransactionDate = (value) => new Date(`${value}T12:00:00`).toLocaleDateString('fr-FR')

export default function PartnerDashboardPage() {
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let cancelled = false
        getReceivedTransactions().then((list) => {
            if (!cancelled) {
                setTransactions(list)
                setLoading(false)
            }
        }).catch((err) => { if (!cancelled) { setError(err); setLoading(false) } })
        return () => {
            cancelled = true
        }
    }, [])

    const validatedTotal = useMemo(
        () => transactions.filter((transaction) => transaction.status === 'Validée').reduce((sum, transaction) => sum + transaction.amount, 0),
        [transactions],
    )
    const validatedCount = transactions.filter((transaction) => transaction.status === 'Validée').length
    const pendingCount = transactions.length - validatedCount
    if (error) throw error

    if (loading) {
        return (
            <>
                <PageHeader title="Tableau de bord partenaire" />
                <LoadingState label="Chargement de votre tableau de bord..." />
            </>
        )
    }

    return (
        <>
            <PageHeader title="Tableau de bord partenaire" />

            <SimulationBadge />

            <div className="dashboard-grid">
                <section className="panel balance-panel">
                    <div className="panel-label">Montant total reçu</div>
                    <div className="balance-amount">{formatCurrency(validatedTotal)}</div>
                    <p className="balance-tagline">Vos encaissements CartePro validés</p>

                    <div className="balance-row">
                        <div className="mini-stat income">
                            <span>Transactions validées</span>
                            <strong>{validatedCount}</strong>
                        </div>
                        <div className="mini-stat">
                            <span>En attente de validation</span>
                            <strong>{pendingCount}</strong>
                        </div>
                    </div>
                </section>

                <aside className="panel quick-panel">
                    <h3>Actions rapides</h3>
                    <div className="quick-actions">
                        <Link to="/partenaire/transactions" className="action-item">
                            <span className="action-icon"><ClipboardCheck size={18} strokeWidth={2.3} /></span>
                            <span>Saisir une transaction</span>
                        </Link>
                        <Link to="/partenaire/catalogue" className="action-item">
                            <span className="action-icon"><Store size={18} strokeWidth={2.3} /></span>
                            <span>Catalogue partenaires</span>
                        </Link>
                        <Link to="/aide" className="action-item">
                            <span className="action-icon"><ArrowUpRight size={18} strokeWidth={2.3} /></span>
                            <span>Aide</span>
                        </Link>
                    </div>
                </aside>
            </div>

            <div className="two-col-layout">
                <section className="panel analytics-panel">
                    <div className="analytics-header">
                        <div>
                            <h2>Activité financière</h2>
                            <p>Suivi de vos encaissements CartePro</p>
                        </div>
                        <TrendingUp color="var(--success)" />
                    </div>
                    <div className="partner-stat-cards">
                        <div><CircleDollarSign size={18} /><strong>{formatCurrency(validatedTotal)}</strong><span>Total reçu</span></div>
                        <div><Clock3 size={18} /><strong>{validatedCount}</strong><span>Transactions validées</span></div>
                    </div>
                </section>

                <aside className="panel ledger-panel">
                    <div className="ledger-header">
                        <h2>Dernières transactions</h2>
                        <Link to="/partenaire/transactions" className="link-btn"><ArrowRight size={16} /></Link>
                    </div>
                    {transactions.slice(0, 3).map((transaction) => (
                        <div key={transaction.id} className="activity-row">
                            <div className="activity-left">
                                <div>
                                    <div className="activity-name">{transaction.employee}</div>
                                    <div className="activity-time">{formatTransactionDate(transaction.date)} à {transaction.time} · {transaction.reference}</div>
                                </div>
                            </div>
                            <div>
                                <div className="activity-amount green">+{formatCurrency(transaction.amount)}</div>
                                <div className="transaction-status">{transaction.status}</div>
                            </div>
                        </div>
                    ))}
                </aside>
            </div>
        </>
    )
}
