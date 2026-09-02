import { getQrCanvasBlob } from '../../src/utils/qrPattern'

export function downloadQrImage(entry) {
  getQrCanvasBlob(entry.id, (blob) => {
    if (!blob) return
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `qr-cartepro-${entry.id}.png`
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  })
}
