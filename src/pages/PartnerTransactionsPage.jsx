import { useEffect, useState } from 'react'
import { ArrowRight, ClipboardCheck, CheckCircle2, QrCode } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import SimulationBadge from '../components/ui/SimulationBadge'
import EmptyState from '../components/ui/EmptyState'
import LoadingState from '../components/ui/LoadingState'
import { getReceivedTransactions, submitTransaction, validateTransaction } from '../services/partnerAccountService'
import { formatCurrency } from '../utils/format'

const formatTransactionDate = (value) => new Date(`${value}T12:00:00`).toLocaleDateString('fr-FR')

export default function PartnerTransactionsPage() {
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)
    const [notice, setNotice] = useState('')
    const [reference, setReference] = useState('')
    const [amount, setAmount] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isScanning, setIsScanning] = useState(false)

    useEffect(() => {
        let cancelled = false
        getReceivedTransactions().then((list) => {
            if (!cancelled) {
                setTransactions(list)
                setLoading(false)
            }
        })
        return () => {
            cancelled = true
        }
    }, [])

    const numericAmount = Number(amount)
    const isAmountValid = Number.isFinite(numericAmount) && numericAmount > 0
    const canSubmit = isAmountValid && !isSubmitting

    async function handleSubmit(event) {
        event.preventDefault()
        if (!canSubmit) return
        setIsSubmitting(true)
        try {
            const entry = await submitTransaction({ reference, amount: numericAmount })
            setTransactions((prev) => [entry, ...prev])
            setNotice('Transaction saisie. Validez-la pour la rendre définitive.')
            setReference('')
            setAmount('')
        } finally {
            setIsSubmitting(false)
        }
    }

    // Lecture caméra non branchée pour l'instant : bouton de démonstration
    // qui simule un scan et pré-remplit la référence, sans accès matériel.
    function handleScan() {
        if (isScanning) return
        setIsScanning(true)
        setTimeout(() => {
            const now = new Date()
            const stamp = now.toISOString().slice(0, 10).replace(/-/g, '')
            const suffix = String(Math.floor(Math.random() * 9000) + 1000)
            setReference(`CP-${stamp}-${suffix}`)
            setIsScanning(false)
        }, 900)
    }

    async function handleValidate(id) {
        await validateTransaction(id)
        setTransactions((prev) => prev.map((transaction) => (transaction.id === id ? { ...transaction, status: 'Validée' } : transaction)))
        setNotice('Transaction validée : elle est désormais irréversible.')
    }

    if (loading) {
        return (
            <>
                <PageHeader title="Transactions reçues" />
                <LoadingState label="Chargement de vos transactions..." />
            </>
        )
    }

    return (
        <>
            <PageHeader title="Transactions reçues" />

            <SimulationBadge />

            {notice ? (
                <div className="success-notice" role="status">
                    <CheckCircle2 size={18} /> {notice}
                </div>
            ) : null}

            <div className="create-layout">
                <form className="panel form-panel" onSubmit={handleSubmit}>
                    <h2>Saisir une transaction</h2>
                    <p className="form-intro">Renseignez le montant présenté par le salarié pour l’enregistrer, puis validez-la.</p>

                    <label className="form-group" htmlFor="transaction-amount">
                        <span>Montant</span>
                        <div className="input-row amount-box">
                            <span className="currency">€</span>
                            <input
                                id="transaction-amount"
                                type="number"
                                min="0.01"
                                step="0.01"
                                inputMode="decimal"
                                value={amount}
                                onChange={(event) => setAmount(event.target.value)}
                                placeholder="0,00"
                            />
                        </div>
                    </label>

                    <label className="form-group" htmlFor="transaction-reference">
                        <span>Référence du QR code (optionnel)</span>
                        <div className="input-row note-row">
                            <input
                                id="transaction-reference"
                                type="text"
                                placeholder="Ex. CP-2026-0906-1200"
                                value={reference}
                                onChange={(event) => setReference(event.target.value)}
                            />
                        </div>
                    </label>

                    <button className="link-btn" type="button" onClick={handleScan} disabled={isScanning}>
                        <QrCode size={16} /> {isScanning ? 'Scan en cours…' : 'Scanner un QR code'}
                    </button>
                    <p className="form-hint">Lecture caméra à venir — ce bouton simule un scan pour la démonstration.</p>

                    <button className="primary-btn large-btn" type="submit" disabled={!canSubmit}>
                        {isSubmitting ? 'Enregistrement...' : 'Enregistrer la transaction'}
                        {!isSubmitting ? <ArrowRight size={18} strokeWidth={2.5} /> : null}
                    </button>
                </form>

                <section className="panel ledger-panel">
                    <div className="ledger-header">
                        <div>
                            <h2>Transactions reçues</h2>
                            <p>Les transactions validées sont irréversibles.</p>
                        </div>
                    </div>

                    {transactions.length === 0 ? (
                        <EmptyState
                            icon={ClipboardCheck}
                            title="Aucune transaction pour le moment"
                            description="Saisissez une transaction pour la voir apparaître ici."
                        />
                    ) : (
                        transactions.map((transaction) => {
                            const isValidated = transaction.status === 'Validée'
                            return (
                                <div key={transaction.id} className="activity-row">
                                    <div className="activity-left">
                                        <div>
                                            <div className="activity-name">{transaction.employee}</div>
                                            <div className="activity-time">{formatTransactionDate(transaction.date)} à {transaction.time} · {transaction.reference}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="activity-amount green">+{formatCurrency(transaction.amount)}</div>
                                        {isValidated ? (
                                            <div className="transaction-status">{transaction.status}</div>
                                        ) : (
                                            <button className="link-btn" type="button" onClick={() => handleValidate(transaction.id)}>
                                                <ClipboardCheck size={14} /> Valider
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )
                        })
                    )}
                </section>
            </div>
        </>
    )
}
