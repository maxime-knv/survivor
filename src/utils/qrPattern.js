// Motif visuel déterministe (dérivé de l'identifiant du QR) partagé entre
// l'aperçu à l'écran et le téléchargement, pour que les deux soient identiques.
// Pas de librairie de génération de QR scannable : conforme au brief
// ("QR de paiement, même statique, c'est ok" pour cette étape).
const SIZE = 240
const CELLS = 18
const dataUrlCache = new Map()

function hashString(value) {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0
  }
  return Math.abs(hash) || 1
}

// Hash entier 32 bits (style splitmix/murmur finalizer) : évite les pièges de
// `seed * grandNombre` en flottant (précision perdue au-delà de 2^53, qui
// biaisait quasiment toutes les cellules vers "remplie") et mélange bien les
// bits bas, contrairement au générateur congruentiel linéaire précédent.
function mixBit(seed) {
  let h = seed | 0
  h = Math.imul(h ^ (h >>> 16), 0x45d9f3b)
  h = Math.imul(h ^ (h >>> 16), 0x45d9f3b)
  h = (h ^ (h >>> 16)) >>> 0
  return h & 1
}

export function drawQrPattern(ctx, id, size = SIZE) {
  const cellSize = size / CELLS
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, size, size)

  const seed = hashString(id)
  ctx.fillStyle = '#050b12'
  for (let row = 0; row < CELLS; row += 1) {
    for (let col = 0; col < CELLS; col += 1) {
      const cellInput = seed ^ Math.imul(row, 0x9e3779b1) ^ Math.imul(col, 0x85ebca6b)
      if (mixBit(cellInput) === 0) {
        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize)
      }
    }
  }
}

export function getQrDataUrl(id) {
  if (dataUrlCache.has(id)) return dataUrlCache.get(id)

  const canvas = document.createElement('canvas')
  canvas.width = SIZE
  canvas.height = SIZE
  const ctx = canvas.getContext('2d')
  drawQrPattern(ctx, id, SIZE)

  const dataUrl = canvas.toDataURL('image/png')
  dataUrlCache.set(id, dataUrl)
  return dataUrl
}

export function getQrCanvasBlob(id, callback) {
  const canvas = document.createElement('canvas')
  canvas.width = SIZE
  canvas.height = SIZE
  const ctx = canvas.getContext('2d')
  drawQrPattern(ctx, id, SIZE)
  canvas.toBlob(callback)
}
