import { Link } from 'react-router-dom'
import { ArrowUpRight, QrCode, Activity, Store, TrendingUp, TrendingDown, ArrowRight, Sparkles } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import SimulationBadge from '../components/ui/SimulationBadge'
import LoadingState from '../components/ui/LoadingState'
import { getAccount } from '../services/accountService'
import { getPartners } from '../services/partnersService'
import { getTransactions } from '../services/transactionsService'
import { useAsync } from '../services/useAsync'
import { formatCurrency, formatSignedCurrency, formatTransactionDay } from '../utils/format'

export default function HomePage() {
    const { data: account, loading: accountLoading } = useAsync(getAccount, [])
    const { data: partners, loading: partnersLoading } = useAsync(getPartners, [])
    const { data: transactions, loading: transactionsLoading } = useAsync(getTransactions, [])

    if (accountLoading || partnersLoading || transactionsLoading) {
        return (
            <>
                <PageHeader title="Tableau de bord" />
                <LoadingState label="Chargement de votre tableau de bord..." />
            </>
        )
    }

    const featuredPartner = partners.find((partner) => partner.featured)
    const recentTransactions = transactions.slice(0, 3)

    return (
        <>
            <PageHeader title="Tableau de bord" />

            <SimulationBadge />

            <div className="dashboard-grid">
                <section className="panel balance-panel">
                    <div className="panel-label">Solde disponible</div>
                    <div className="balance-amount">{formatCurrency(account.balance)}</div>
                    <p className="balance-tagline">à dépenser chez vos partenaires préférés !</p>

                    <div className="balance-row">
                        <div className="mini-stat income">
                            <span>Crédits reçus ce mois</span>
                            <strong>
                                {formatSignedCurrency(account.monthlyCredit)} <TrendingUp size={13} strokeWidth={2.8} />
                            </strong>
                        </div>
                        <div className="mini-stat expense">
                            <span>Dépenses ce mois</span>
                            <strong>
                                -{formatCurrency(account.monthlySpend)} <TrendingDown size={13} strokeWidth={2.8} />
                            </strong>
                        </div>
                    </div>
                </section>

                <aside className="panel quick-panel">
                    <h3>Actions rapides</h3>
                    <div className="quick-actions">
                        <Link to="/qr-code" className="action-item">
                            <span className="action-icon"><QrCode size={18} strokeWidth={2.3} /></span>
                            <span>Code QR</span>
                        </Link>
                        <Link to="/partenaires" className="action-item">
                            <span className="action-icon"><Store size={18} strokeWidth={2.3} /></span>
                            <span>Partenaires</span>
                        </Link>
                        <Link to="/historique" className="action-item">
                            <span className="action-icon"><Activity size={18} strokeWidth={2.3} /></span>
                            <span>Historique</span>
                        </Link>
                        <Link to="/aide" className="action-item">
                            <span className="action-icon"><ArrowUpRight size={18} strokeWidth={2.3} /></span>
                            <span>Aide</span>
                        </Link>
                    </div>
                </aside>
            </div>

            <div className="two-col-layout">
                <section className="panel promo-panel">
                    <div className="promo-header">
                        <h3>
                            <Sparkles size={16} strokeWidth={2.4} /> Coup de cœur du Ministre
                        </h3>
                        <Link to="/partenaires" className="link-btn">
                            Voir tous les partenaires <ArrowRight size={14} strokeWidth={2.6} />
                        </Link>
                    </div>

                    {featuredPartner ? (
                        <article className="offer-card offer-card-featured">
                            <div className="offer-mark">{featuredPartner.name.charAt(0)}</div>
                            <div className="offer-copy">
                                <h4>{featuredPartner.name}</h4>
                                <p>{featuredPartner.description}</p>
                            </div>
                        </article>
                    ) : null}
                </section>

                <aside className="panel transactions-panel">
                    <h3>Transactions récentes</h3>
                    <div className="transaction-list">
                        {recentTransactions.map((item) => (
                            <div key={item.id} className="transaction-row">
                                <div className="transaction-meta">
                                    <div>
                                        <div className="transaction-name">{item.label}</div>
                                        <div className="transaction-date">{formatTransactionDay(item.date)}, {item.time}</div>
                                    </div>
                                </div>
                                <div className={`transaction-amount ${item.amount > 0 ? 'green' : 'red'}`}>
                                    {formatSignedCurrency(item.amount)}
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>
        </>
    )
}
