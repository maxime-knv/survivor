import { useState } from 'react'
import { Download, FolderOpen } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import SimulationBadge from '../components/ui/SimulationBadge'
import EmptyState from '../components/ui/EmptyState'
import LoadingState from '../components/ui/LoadingState'
import QrPreview from '../components/ui/QrPreview'
import QrLightbox from '../components/ui/QrLightbox'
import { useQrCodes } from '../context/QrCodesContext'
import { getExpiryDate, isQrValid, formatTime } from '../utils/qrValidity'
import { formatCurrency } from '../utils/format'
import { downloadQrImage } from '../utils/downloadQrImage'

function formatGeneratedDate(iso) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export default function QrLibraryPage() {
  const { qrCodes, loading } = useQrCodes()
  const [expandedId, setExpandedId] = useState(null)

  const expandedEntry = qrCodes.find((entry) => entry.id === expandedId) || null

  return (
    <>
      <PageHeader title="Mes codes QR" />

      <SimulationBadge />

      {loading ? (
        <LoadingState label="Chargement de vos codes QR..." />
      ) : qrCodes.length === 0 ? (
        <section className="panel">
          <EmptyState
            icon={FolderOpen}
            title="Aucun code QR généré pour l’instant"
            description="Les codes que vous créez depuis « Code QR » apparaissent ici, avec leur statut de validité."
          />
        </section>
      ) : (
        <section className="qr-library-grid">
          {qrCodes.map((entry) => {
            const valid = isQrValid(entry.generatedAt)
            const expiresAt = getExpiryDate(entry.generatedAt)
            const title = entry.label || formatCurrency(entry.amount)

            return (
              <article key={entry.id} className="panel qr-library-card">
                <div className="qr-library-top">
                  <span className={`status-pill ${valid ? 'success' : 'failed'}`}>
                    {valid ? 'Valide' : 'Expiré'}
                  </span>
                  <span className="qr-library-date">{formatGeneratedDate(entry.generatedAt)}</span>
                </div>

                <QrPreview
                  id={entry.id}
                  alt={`${title}, ${formatCurrency(entry.amount)}`}
                  size={120}
                  onClick={() => setExpandedId(entry.id)}
                />

                <div className="qr-library-amount">{formatCurrency(entry.amount)}</div>
                <div className="qr-library-label">{entry.label || 'Sans libellé'}</div>
                <div className="qr-library-expiry">
                  {valid ? `Valide jusqu’à ${formatTime(expiresAt)}` : `Expiré à ${formatTime(expiresAt)}`}
                </div>

                <button type="button" className="download-btn" onClick={() => downloadQrImage(entry)}>
                  <Download size={14} strokeWidth={2.4} /> Télécharger PNG
                </button>
              </article>
            )
          })}
        </section>
      )}

      {expandedEntry ? (
        <QrLightbox
          id={expandedEntry.id}
          title={expandedEntry.label || 'Code QR Ticket Tout'}
          caption={`${formatCurrency(expandedEntry.amount)}, ${
            isQrValid(expandedEntry.generatedAt)
              ? `valide jusqu’à ${formatTime(getExpiryDate(expandedEntry.generatedAt))}`
              : 'expiré'
          }`}
          onClose={() => setExpandedId(null)}
          onDownload={() => downloadQrImage(expandedEntry)}
        />
      ) : null}
    </>
  )
}
