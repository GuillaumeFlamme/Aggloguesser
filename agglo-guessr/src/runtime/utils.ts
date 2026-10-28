export interface Round {
  objectId: number
  order: number
  name: string
  anecdote: string
  /** Photo allégée (max 1 600 px) affichée en grand */
  photoUrl: string
  /** Miniature (max 480 px) affichée dans le coin */
  thumbUrl: string
  /** Vrai point en WGS84 : x = longitude, y = latitude (le service reprojette depuis le Lambert 93) */
  x: number
  y: number
}

export interface RoundResult {
  /** Distance entre le pari et le vrai point, en mètres */
  distance: number
  score: number
}

export const MAX_ROUND_SCORE = 5000

/** Rejette la promesse si elle ne répond pas dans le délai (évite un « Chargement… » infini). */
export function withTimeout<T> (promise: Promise<T>, ms: number, message: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const id = setTimeout(() => reject(new Error(message)), ms)
    promise.then(
      (v) => { clearTimeout(id); resolve(v) },
      (e) => { clearTimeout(id); reject(e) }
    )
  })
}

// ---------------------------------------------------------------
// Géométrie sans aucun module ArcGIS : fonctionne avec toutes les versions
// de l'API (le module de reprojection a changé de nom d'une version à l'autre).
// ---------------------------------------------------------------
const EARTH_R = 6378137
const RAD = Math.PI / 180

/** Coordonnées de la vue -> longitude/latitude (Web Mercator ou WGS84 uniquement). */
export function viewToLonLat (x: number, y: number, sr: any): { lon: number, lat: number } | null {
  if (sr?.isWebMercator) {
    return {
      lon: (x / EARTH_R) / RAD,
      lat: (2 * Math.atan(Math.exp(y / EARTH_R)) - Math.PI / 2) / RAD
    }
  }
  if (sr?.isWGS84 || sr?.wkid === 4326) return { lon: x, lat: y }
  return null
}

/** Longitude/latitude -> coordonnées de la vue (Web Mercator ou WGS84 uniquement). */
export function lonLatToView (lon: number, lat: number, sr: any): { x: number, y: number } | null {
  if (sr?.isWebMercator) {
    return {
      x: lon * RAD * EARTH_R,
      y: Math.log(Math.tan(Math.PI / 4 + (lat * RAD) / 2)) * EARTH_R
    }
  }
  if (sr?.isWGS84 || sr?.wkid === 4326) return { x: lon, y: lat }
  return null
}

/** Distance en mètres sur l'ellipsoïde WGS84 (précise à quelques cm sur quelques km). */
export function distanceMeters (lon1: number, lat1: number, lon2: number, lat2: number): number {
  const phi = ((lat1 + lat2) / 2) * RAD
  const metersPerDegLat = 111132.92 - 559.82 * Math.cos(2 * phi) + 1.175 * Math.cos(4 * phi)
  const metersPerDegLon = 111412.84 * Math.cos(phi) - 93.5 * Math.cos(3 * phi) + 0.118 * Math.cos(5 * phi)
  return Math.hypot((lon2 - lon1) * metersPerDegLon, (lat2 - lat1) * metersPerDegLat)
}

function loadImage (url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Image illisible'))
    img.src = url
  })
}

function resizeToUrl (img: HTMLImageElement, maxSide: number, quality: number): Promise<string> {
  const scale = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight))
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(img.naturalWidth * scale))
  canvas.height = Math.max(1, Math.round(img.naturalHeight * scale))
  const ctx = canvas.getContext('2d')
  if (!ctx) return Promise.reject(new Error('Canvas indisponible'))
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(URL.createObjectURL(blob))
      else reject(new Error('Réduction impossible'))
    }, 'image/jpeg', quality)
  })
}

/**
 * Télécharge la photo une seule fois et en fabrique deux versions légères
 * (grande et miniature) : une photo de téléphone de 5 Mo ralentit tout le
 * navigateur quand elle est affichée au-dessus d'une carte.
 * En cas d'échec (CORS, etc.), on garde l'URL d'origine.
 */
export async function prepareImages (url: string): Promise<{ photoUrl: string, thumbUrl: string }> {
  try {
    const img = await loadImage(url)
    const photoUrl = await resizeToUrl(img, 1600, 0.85)
    const thumbUrl = await resizeToUrl(img, 480, 0.8)
    return { photoUrl, thumbUrl }
  } catch (e) {
    return { photoUrl: url, thumbUrl: url }
  }
}

/**
 * Barème : score maximum en dessous de `perfect` mètres, 0 au-delà de `max`,
 * décroissance quadratique entre les deux (on récompense la précision).
 */
export function computeScore (distance: number, perfect: number, max: number): number {
  if (distance <= perfect) return MAX_ROUND_SCORE
  if (max <= perfect || distance >= max) return 0
  const t = (distance - perfect) / (max - perfect)
  return Math.round(MAX_ROUND_SCORE * (1 - t) * (1 - t))
}

export function formatDistance (meters: number): string {
  if (meters < 1000) return `${Math.round(meters).toLocaleString('fr-FR')} m`
  return `${(meters / 1000).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} km`
}

export function formatPoints (n: number): string {
  return n.toLocaleString('fr-FR')
}

export function finalMessage (total: number, maxTotal: number): string {
  const ratio = maxTotal > 0 ? total / maxTotal : 0
  if (ratio >= 0.8) return 'Impressionnant, vous connaissez l’agglo comme votre poche !'
  if (ratio >= 0.5) return 'Beau parcours, vous êtes un vrai connaisseur du territoire !'
  if (ratio >= 0.25) return 'Pas mal du tout, l’agglo n’a presque plus de secrets pour vous !'
  return 'Merci d’avoir joué, il y a encore de belles choses à découvrir autour de vous !'
}

function roundedRect (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

/** Fabrique une image « carte de score » (PNG) prête à être partagée. */
export function buildScoreCard (results: RoundResult[], total: number, maxTotal: number): Promise<Blob> {
  const W = 1080
  const H = 1350
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')
  if (!ctx) return Promise.reject(new Error('Canvas indisponible'))

  const font = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'

  // Fond
  const bg = ctx.createLinearGradient(0, 0, W, H)
  bg.addColorStop(0, '#0f4c5c')
  bg.addColorStop(1, '#1b8a6b')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)

  ctx.textAlign = 'center'
  ctx.fillStyle = '#ffffff'

  // Titre
  ctx.font = `800 100px ${font}`
  ctx.fillText('AgglOguessr', W / 2, 170)
  ctx.font = `400 40px ${font}`
  ctx.globalAlpha = 0.85
  ctx.fillText('Agglomération montargoise', W / 2, 230)
  ctx.globalAlpha = 1

  // Panneau du score
  ctx.fillStyle = 'rgba(255,255,255,0.14)'
  roundedRect(ctx, 90, 290, W - 180, 400, 36)
  ctx.fill()
  ctx.fillStyle = '#ffffff'
  ctx.font = `500 48px ${font}`
  ctx.fillText('Mon score', W / 2, 370)
  ctx.fillStyle = '#ffd166'
  ctx.font = `800 190px ${font}`
  ctx.fillText(total.toLocaleString('fr-FR'), W / 2, 550)
  ctx.fillStyle = '#ffffff'
  ctx.font = `400 44px ${font}`
  ctx.fillText(`sur ${maxTotal.toLocaleString('fr-FR')} points`, W / 2, 625)

  // Détail des manches
  const rowH = Math.min(100, 440 / Math.max(results.length, 1))
  let y = 740
  results.forEach((r, i) => {
    ctx.fillStyle = 'rgba(255,255,255,0.12)'
    roundedRect(ctx, 90, y, W - 180, rowH - 14, 22)
    ctx.fill()
    const baseline = y + (rowH - 14) / 2 + 15
    ctx.fillStyle = '#ffffff'
    ctx.font = `600 38px ${font}`
    ctx.textAlign = 'left'
    ctx.fillText(`Manche ${i + 1}`, 130, baseline)
    ctx.textAlign = 'center'
    ctx.font = `400 38px ${font}`
    ctx.fillText(formatDistance(r.distance), W / 2 + 40, baseline)
    ctx.textAlign = 'right'
    ctx.fillStyle = '#ffd166'
    ctx.font = `700 38px ${font}`
    ctx.fillText(`${r.score.toLocaleString('fr-FR')} pts`, W - 130, baseline)
    y += rowH
  })

  // Message de félicitations
  ctx.textAlign = 'center'
  ctx.fillStyle = '#ffffff'
  ctx.font = `700 46px ${font}`
  ctx.fillText('Bravo !', W / 2, 1235)
  ctx.font = `400 34px ${font}`
  ctx.globalAlpha = 0.9
  ctx.fillText(finalMessage(total, maxTotal).slice(0, 62), W / 2, 1285)
  ctx.globalAlpha = 1

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob)
      else reject(new Error('Impossible de créer l’image'))
    }, 'image/png')
  })
}
