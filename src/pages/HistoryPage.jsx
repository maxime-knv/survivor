import { useMemo, useState } from 'react'
import { Activity } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import SimulationBadge from '../components/ui/SimulationBadge'
import EmptyState from '../components/ui/EmptyState'
import LoadingState from '../components/ui/LoadingState'
import { weeklyActivity } from '../data/transactions'
import { getTransactions } from '../services/transactionsService'
import { useAsync } from '../services/useAsync'
import { formatSignedCurrency, formatTransactionDay } from '../utils/format'

const filters = [
  { id: 'all', label: 'Tout' },
  { id: 'depense', label: 'Dépenses' },
  { id: 'credit', label: 'Revenus' },
]

export default function HistoryPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const { data: transactions, loading } = useAsync(getTransactions, [])

  const filteredTransactions = useMemo(
    () => (transactions || []).filter((item) => activeFilter === 'all' || item.type === activeFilter),
    [transactions, activeFilter],
  )

  const groupedByDay = useMemo(() => {
    const groups = new Map()
    for (const item of filteredTransactions) {
      const dayLabel = formatTransactionDay(item.date)
      if (!groups.has(dayLabel)) groups.set(dayLabel, [])
      groups.get(dayLabel).push(item)
    }
    return groups
  }, [filteredTransactions])

  if (loading) {
    return (
      <>
        <PageHeader title="Historique des transactions" />
        <LoadingState label="Chargement de votre historique..." />
      </>
    )
  }

  return (
    <>
      <PageHeader title="Historique des transactions" />

      <SimulationBadge />

      <section className="panel analytics-panel">
        <div className="analytics-header">
          <div>
            <h2>Vue d’ensemble de l’activité</h2>
            <p>Résumé de vos dépenses et crédits sur la semaine</p>
          </div>
        </div>

        <div className="bar-chart">
          {weeklyActivity.map((bar) => (
            <div key={bar.day} className="bar-group">
              <div className={`bar ${bar.day === 'Jeu' ? 'highlight' : ''}`} style={{ height: `${bar.value}%` }} />
              <span>{bar.day}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="panel ledger-panel activity-ledger">
        <div className="ledger-header">
          <h2>Grand livre des transactions</h2>
          <div className="chart-tabs">
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                className={`tab${activeFilter === filter.id ? ' active' : ''}`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {filteredTransactions.length === 0 ? (
          <EmptyState
            icon={Activity}
            title="Aucune transaction pour ce filtre"
            description="Changez de filtre pour afficher d’autres mouvements simulés."
          />
        ) : (
          Array.from(groupedByDay.entries()).map(([dayLabel, items]) => (
            <div key={dayLabel} className="ledger-section">
              <h3>{dayLabel}</h3>
              {items.map((item) => (
                <div key={item.id} className="activity-row">
                  <div className="activity-left">
                    <div>
                      <div className="activity-name">{item.label}</div>
                      <div className="activity-time">{item.time}</div>
                    </div>
                  </div>
                  <div className={`activity-amount ${item.amount > 0 ? 'green' : 'red'}`}>
                    {formatSignedCurrency(item.amount)}
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </section>
    </>
  )
}
