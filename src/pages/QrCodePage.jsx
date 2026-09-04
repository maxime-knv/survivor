import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, QrCode as QrCodeIcon } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import SimulationBadge from '../components/ui/SimulationBadge'
import EmptyState from '../components/ui/EmptyState'
import LoadingState from '../components/ui/LoadingState'
import QrPreview from '../components/ui/QrPreview'
import QrLightbox from '../components/ui/QrLightbox'
import { getAccount } from '../services/accountService'
import { useAsync } from '../services/useAsync'
import { createQrCode } from '../services/qrCodesService'
import { formatCurrency } from '../utils/format'
import { downloadQrImage } from '../utils/downloadQrImage'
import { QR_VALIDITY_MINUTES, getExpiryDate, isQrValid, formatTime } from '../utils/qrValidity'

export default function QrCodePage() {
  const { data: account, loading: accountLoading } = useAsync(getAccount, [])
  const [amount, setAmount] = useState('25.00')
  const [label, setLabel] = useState('')
  const [lastGenerated, setLastGenerated] = useState(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  if (accountLoading || !account) {
    return (
      <>
        <PageHeader title="Créer un code QR" />
        <LoadingState label="Chargement de votre compte..." />
      </>
    )
  }

  const numericAmount = Number(amount)
  const isAmountValid = Number.isFinite(numericAmount) && numericAmount > 0
  const exceedsBalance = isAmountValid && numericAmount > account.balance
  const canGenerate = isAmountValid && !exceedsBalance && !isGenerating

  const errorMessage = !isAmountValid
    ? 'Indiquez un montant supérieur à 0 €.'
    : exceedsBalance
      ? `Le montant dépasse votre solde disponible (${formatCurrency(account.balance)}).`
      : null

  async function handleGenerate(event) {
    event.preventDefault()
    if (!canGenerate) return
    setIsGenerating(true)
    try {
      const qrCode = await createQrCode({
        amount: numericAmount,
        label,
      })
      setLastGenerated(qrCode)
    } catch (error) {
      console.error('Erreur lors de la génération du QR code :', error)
    } finally {
      setIsGenerating(false)
    }
  }

  function handleAmountChange(event) {
    setAmount(event.target.value)
    setLastGenerated(null)
    setIsExpanded(false)
  }

  const expiresAt = lastGenerated ? getExpiryDate(lastGenerated.createdAt) : null

  return (
    <>
      <PageHeader title="Créer un code QR" />

      <SimulationBadge />

      <div className="create-layout">
        <form className="panel form-panel" onSubmit={handleGenerate}>
          <h2>Détails du code QR</h2>

          <label className="form-group" htmlFor="qr-amount">
            <span>Montant</span>
            <div className="input-row amount-box">
              <span className="currency">€</span>
              <input
                id="qr-amount"
                type="number"
                min="0.01"
                step="0.01"
                inputMode="decimal"
                value={amount}
                onChange={handleAmountChange}
                aria-invalid={errorMessage ? 'true' : 'false'}
                aria-describedby={errorMessage ? 'qr-amount-error' : undefined}
              />
            </div>
            {errorMessage ? (
              <p className="field-error" id="qr-amount-error" role="alert">{errorMessage}</p>
            ) : null}
          </label>

          <div className="form-group">
            <span>Compte source</span>
            <div className="input-row static-row">
              <span>Compte Ticket Tout, solde {formatCurrency(account.balance)}</span>
            </div>
          </div>

          <label className="form-group" htmlFor="qr-label">
            <span>Libellé / nom de référence</span>
            <div className="input-row note-row">
              <input
                id="qr-label"
                type="text"
                placeholder="Ex. Déjeuner équipe"
                value={label}
                onChange={(event) => setLabel(event.target.value)}
              />
            </div>
          </label>

          <button className="primary-btn large-btn" type="submit" disabled={!canGenerate}>
            {isGenerating ? 'Génération...' : 'Générer le code QR'}
            {!isGenerating ? <ArrowRight size={18} strokeWidth={2.5} /> : null}
          </button>
        </form>

        <aside className="panel preview-panel">
          <h3>Aperçu du code</h3>

          {lastGenerated ? (
            <>
              <div className="qr-preview-large">
                <QrPreview
                  id={lastGenerated.id}
                  alt={`Code QR de paiement pour ${formatCurrency(lastGenerated.amount)}`}
                  size={240}
                  onClick={() => setIsExpanded(true)}
                />
              </div>
              <div className="preview-amount">{formatCurrency(lastGenerated.amount)}</div>
              {lastGenerated.label ? <div className="preview-caption">{lastGenerated.label}</div> : null}
              <div className="preview-caption">
                Valide jusqu’à {formatTime(expiresAt)} ({QR_VALIDITY_MINUTES} minutes), usage unique
              </div>
              <div className="preview-caption">
                <Link to="/mes-qr-codes" className="link-btn">Voir tous mes codes QR</Link>
              </div>
            </>
          ) : (
            <EmptyState
              icon={QrCodeIcon}
              title="Aucun code généré"
              description="Renseignez un montant valide puis cliquez sur « Générer le code QR »."
            />
          )}
        </aside>
      </div>

      {isExpanded && lastGenerated ? (
        <QrLightbox
          id={lastGenerated.id}
          title={lastGenerated.label || 'Code QR Ticket Tout'}
          caption={`${formatCurrency(lastGenerated.amount)}, ${
            isQrValid(lastGenerated.createdAt)
              ? `valide jusqu’à ${formatTime(expiresAt)}`
              : 'expiré'
          }`}
          onClose={() => setIsExpanded(false)}
          onDownload={() => downloadQrImage(lastGenerated)}
        />
      ) : null}
    </>
  )
}
