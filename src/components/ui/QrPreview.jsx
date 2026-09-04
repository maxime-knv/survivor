import { useMemo } from 'react'
import { getQrDataUrl } from '../../utils/qrPattern'

export default function QrPreview({ id, alt, onClick, size }) {
  const src = useMemo(() => getQrDataUrl(id), [id])
  const style = size ? { width: size, height: size } : undefined

  if (!onClick) {
    return (
      <div className="qr-preview-thumb" style={style}>
        <img src={src} alt={alt} width={size} height={size} />
      </div>
    )
  }

  return (
    <button
      type="button"
      className="qr-preview-thumb qr-preview-thumb-clickable"
      style={style}
      onClick={onClick}
      aria-label={`Agrandir le code QR : ${alt}`}
    >
      <img src={src} alt="" width={size} height={size} />
    </button>
  )
}
