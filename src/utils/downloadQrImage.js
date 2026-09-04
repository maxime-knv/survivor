import QRCode from 'qrcode'

export async function downloadQrImage(entry) {
  try {
    const dataUrl = await QRCode.toDataURL(entry.id)

    const link = document.createElement('a')
    link.href = dataUrl
    link.download = `qr-tickettout-${entry.id}.png`

    document.body.appendChild(link)
    link.click()
    link.remove()
  } catch (error) {
    console.error('Erreur lors du téléchargement du QR code :', error)
  }
}