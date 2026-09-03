import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

export default function QrPreview({ id, alt, onClick, size }) {
  const [src, setSrc] = useState('')

  useEffect(() => {
    QRCode.toDataURL(id)
      .then(setSrc)
      .catch(console.error)
  }, [id])

  if (!src) return null

  if (!onClick) {
    return (
      <div className="qr-preview-thumb">
        <img src={src} alt={alt} width={size} height={size} />
      </div>
    )
  }

  return (
    <button
      type="button"
      className="qr-preview-thumb qr-preview-thumb-clickable"
      onClick={onClick}
      aria-label={`Agrandir le code QR : ${alt}`}
    >
      <img src={src} alt="" width={size} height={size} />
    </button>
  )
}