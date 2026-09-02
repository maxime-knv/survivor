import { useEffect, useRef } from 'react'
import { X, Download } from 'lucide-react'
import QrPreview from './QrPreview'

export default function QrLightbox({ id, title, caption, onClose, onDownload }) {
  const closeRef = useRef(null)

  useEffect(() => {
    closeRef.current?.focus()
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div className="qr-lightbox-backdrop" onClick={onClose}>
      <div
        className="qr-lightbox"
        role="dialog"
        aria-modal="true"
        aria-label={`Code QR agrandi : ${title}`}
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="qr-lightbox-close" ref={closeRef} onClick={onClose} aria-label="Fermer l’aperçu">
          <X size={18} strokeWidth={2.4} />
        </button>

        <QrPreview id={id} alt={title} size={260} />

        <div className="qr-lightbox-title">{title}</div>
        {caption ? <div className="qr-lightbox-caption">{caption}</div> : null}

        {onDownload ? (
          <button type="button" className="download-btn" onClick={onDownload}>
            <Download size={14} strokeWidth={2.4} /> Télécharger PNG
          </button>
        ) : null}
      </div>
    </div>
  )
}
