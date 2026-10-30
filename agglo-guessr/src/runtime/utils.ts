// FICHIER DES OUTILS : calculs (distance, score), préparation des photos et fabrication de l'image de score.
// Rien ici ne dépend de l'affichage du jeu.

import { COLORS, FONT_FAMILY } from './theme' // couleurs et police partagées
import { TEXTS } from './textes' // textes affichés

// Description d'une manche (un lieu à deviner).
export interface Round {
  objectId: number // identifiant technique du point dans la couche
  order: number // numéro d'ordre de la manche (champ "ordre")
  name: string // nom du lieu (champ "nom")
  anecdote: string // anecdote affichée à la révélation (champ "anecdote")
  /** Photo allégée (max 1 600 px) affichée en grand */
  photoUrl: string // adresse de la grande photo
  /** Miniature (max 480 px) affichée dans le coin */
  thumbUrl: string // adresse de la miniature
  /** Vrai point en WGS84 : x = longitude, y = latitude (le service reprojette depuis le Lambert 93) */
  x: number // longitude du vrai lieu
  y: number // latitude du vrai lieu
}

// Résultat d'une manche jouée.
export interface RoundResult {
  /** Distance entre le pari et le vrai point, en mètres */
  distance: number // distance en mètres
  score: number // points gagnés sur la manche
}

// Score maximum d'une manche (5 manches donnent donc 25 000 points au maximum).
export const MAX_ROUND_SCORE = 5000

/** Rejette la promesse si elle ne répond pas dans le délai (évite un chargement infini). */
export function withTimeout<T> (promise: Promise<T>, ms: number, message: string): Promise<T> {
  return new Promise<T>((resolve, reject) => { // on crée une nouvelle promesse qui surveille l'ancienne
    const id = setTimeout(() => reject(new Error(message)), ms) // au bout du délai, on déclenche l'erreur
    promise.then(
      (v) => { clearTimeout(id); resolve(v) }, // réponse reçue à temps : on annule l'alarme et on transmet le résultat
      (e) => { clearTimeout(id); reject(e) } // erreur reçue à temps : on annule l'alarme et on transmet l'erreur
    )
  })
}

// ---------------------------------------------------------------
// GÉOMÉTRIE sans module ArcGIS : fonctionne avec toutes les versions de l'API.
// ---------------------------------------------------------------
const EARTH_R = 6378137 // rayon de la Terre en mètres (valeur utilisée par le Web Mercator)
const RAD = Math.PI / 180 // facteur de conversion des degrés en radians

/** Coordonnées de la carte vers longitude et latitude (Web Mercator ou WGS84 uniquement). */
export function viewToLonLat (x: number, y: number, sr: any): { lon: number, lat: number } | null {
  if (sr?.isWebMercator) { // si la carte est en Web Mercator
    return {
      lon: (x / EARTH_R) / RAD, // conversion de x en longitude (degrés)
      lat: (2 * Math.atan(Math.exp(y / EARTH_R)) - Math.PI / 2) / RAD // conversion de y en latitude (degrés)
    }
  }
  if (sr?.isWGS84 || sr?.wkid === 4326) return { lon: x, lat: y } // si la carte est déjà en WGS84, rien à convertir
  return null // autre système de coordonnées : non pris en charge
}

/** Longitude et latitude vers coordonnées de la carte (Web Mercator ou WGS84 uniquement). */
export function lonLatToView (lon: number, lat: number, sr: any): { x: number, y: number } | null {
  if (sr?.isWebMercator) { // si la carte est en Web Mercator
    return {
      x: lon * RAD * EARTH_R, // conversion de la longitude en x
      y: Math.log(Math.tan(Math.PI / 4 + (lat * RAD) / 2)) * EARTH_R // conversion de la latitude en y
    }
  }
  if (sr?.isWGS84 || sr?.wkid === 4326) return { x: lon, y: lat } // si la carte est en WGS84, rien à convertir
  return null // autre système de coordonnées : non pris en charge
}

/** Distance en mètres entre deux points en longitude et latitude (précise à quelques centimètres sur quelques kilomètres). */
export function distanceMeters (lon1: number, lat1: number, lon2: number, lat2: number): number {
  const phi = ((lat1 + lat2) / 2) * RAD // latitude moyenne des deux points, en radians
  const metersPerDegLat = 111132.92 - 559.82 * Math.cos(2 * phi) + 1.175 * Math.cos(4 * phi) // longueur d'un degré de latitude en mètres
  const metersPerDegLon = 111412.84 * Math.cos(phi) - 93.5 * Math.cos(3 * phi) + 0.118 * Math.cos(5 * phi) // longueur d'un degré de longitude en mètres
  return Math.hypot((lon2 - lon1) * metersPerDegLon, (lat2 - lat1) * metersPerDegLat) // distance en ligne droite (théorème de Pythagore)
}

// ---------------------------------------------------------------
// SCORE ET FORMATS D'AFFICHAGE
// ---------------------------------------------------------------

/**
 * Barème : score maximum en dessous de "perfect" mètres, 0 au-delà de "max",
 * décroissance quadratique entre les deux (on récompense la précision).
 */
export function computeScore (distance: number, perfect: number, max: number): number {
  if (distance <= perfect) return MAX_ROUND_SCORE // assez proche : score maximum
  if (max <= perfect || distance >= max) return 0 // trop loin (ou réglages incohérents) : zéro point
  const t = (distance - perfect) / (max - perfect) // position entre distance parfaite (0) et distance maximale (1)
  return Math.round(MAX_ROUND_SCORE * (1 - t) * (1 - t)) // le score baisse de plus en plus vite (carré)
}

// Met une distance en mètres sous forme lisible : "850 m" ou "1,3 km".
export function formatDistance (meters: number): string {
  if (meters < 1000) return `${Math.round(meters).toLocaleString('fr-FR')} m` // moins d'un kilomètre : en mètres
  return `${(meters / 1000).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} km` // sinon en kilomètres avec une décimale
}

// Met un nombre sous forme française avec séparateur de milliers : "12 500".
export function formatPoints (n: number): string {
  return n.toLocaleString('fr-FR') // formatage selon les habitudes françaises
}

// Choisit le message de félicitations selon le pourcentage du score maximum.
export function finalMessage (total: number, maxTotal: number): string {
  const ratio = maxTotal > 0 ? total / maxTotal : 0 // part du score maximum obtenue (de 0 à 1)
  if (ratio >= 0.8) return TEXTS.finalMessages.great // 80 pour cent ou plus
  if (ratio >= 0.5) return TEXTS.finalMessages.good // de 50 à 79 pour cent
  if (ratio >= 0.25) return TEXTS.finalMessages.ok // de 25 à 49 pour cent
  return TEXTS.finalMessages.low // moins de 25 pour cent
}

// ---------------------------------------------------------------
// PHOTOS : réduction du poids pour garder le jeu fluide
// ---------------------------------------------------------------

// Télécharge une image et attend qu'elle soit prête.
function loadImage (url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => { // promesse : résolue quand l'image est chargée
    const img = new Image() // crée un élément image en mémoire
    img.crossOrigin = 'anonymous' // autorise la lecture des pixels (nécessaire pour la réduire)
    img.onload = () => resolve(img) // image chargée : on la transmet
    img.onerror = () => reject(new Error('Image illisible')) // échec du chargement : on signale l'erreur
    img.src = url // lance le téléchargement
  })
}

// Réduit une image pour que son plus grand côté fasse au plus maxSide pixels, et renvoie une adresse temporaire.
function resizeToUrl (img: HTMLImageElement, maxSide: number, quality: number): Promise<string> {
  const scale = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight)) // facteur de réduction (jamais d'agrandissement)
  const canvas = document.createElement('canvas') // zone de dessin invisible
  canvas.width = Math.max(1, Math.round(img.naturalWidth * scale)) // largeur après réduction
  canvas.height = Math.max(1, Math.round(img.naturalHeight * scale)) // hauteur après réduction
  const ctx = canvas.getContext('2d') // outil de dessin
  if (!ctx) return Promise.reject(new Error('Canvas indisponible')) // navigateur sans dessin : on abandonne
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height) // dessine l'image à la taille réduite
  return new Promise((resolve, reject) => { // convertit le dessin en fichier JPEG
    canvas.toBlob((blob) => {
      if (blob) resolve(URL.createObjectURL(blob)) // fichier créé : on renvoie son adresse temporaire
      else reject(new Error('Réduction impossible')) // échec de la conversion
    }, 'image/jpeg', quality) // format JPEG avec le niveau de qualité demandé (0 à 1)
  })
}

/**
 * Télécharge la photo une seule fois et en fabrique deux versions légères (grande et miniature).
 * En cas d'échec (CORS, etc.), on garde l'adresse d'origine.
 */
export async function prepareImages (url: string): Promise<{ photoUrl: string, thumbUrl: string }> {
  try {
    const img = await loadImage(url) // télécharge la photo d'origine
    const photoUrl = await resizeToUrl(img, 1600, 0.85) // grande version : 1 600 pixels maximum, qualité 85 pour cent
    const thumbUrl = await resizeToUrl(img, 480, 0.8) // miniature : 480 pixels maximum, qualité 80 pour cent
    return { photoUrl, thumbUrl } // renvoie les deux versions
  } catch (e) {
    return { photoUrl: url, thumbUrl: url } // en cas de problème, on utilise la photo d'origine pour les deux
  }
}

// ---------------------------------------------------------------
// IMAGE DE SCORE À PARTAGER (format 1080 x 1400 pixels)
// ---------------------------------------------------------------

// Trace un rectangle aux coins arrondis (r est le rayon des coins).
function roundedRect (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  ctx.beginPath() // commence un nouveau tracé
  ctx.moveTo(x + r, y) // départ en haut à gauche, après le coin
  ctx.arcTo(x + w, y, x + w, y + h, r) // côté haut puis coin haut droit
  ctx.arcTo(x + w, y + h, x, y + h, r) // côté droit puis coin bas droit
  ctx.arcTo(x, y + h, x, y, r) // côté bas puis coin bas gauche
  ctx.arcTo(x, y, x + w, y, r) // côté gauche puis coin haut gauche
  ctx.closePath() // ferme le tracé
}

// Découpe un texte en lignes qui tiennent dans une largeur donnée.
function wrapText (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(' ') // sépare le texte en mots
  const lines: string[] = [] // lignes terminées
  let current = '' // ligne en cours de construction
  words.forEach((word) => { // pour chaque mot
    const test = current ? `${current} ${word}` : word // essaie d'ajouter le mot à la ligne en cours
    if (ctx.measureText(test).width > maxWidth && current) { // si la ligne devient trop large
      lines.push(current) // on termine la ligne précédente
      current = word // le mot commence une nouvelle ligne
    } else {
      current = test // sinon le mot reste sur la même ligne
    }
  })
  if (current) lines.push(current) // ajoute la dernière ligne
  return lines // renvoie toutes les lignes
}

/** Fabrique une image "carte de score" (PNG) prête à être partagée. */
export function buildScoreCard (results: RoundResult[], total: number, maxTotal: number): Promise<Blob> {
  const W = 1080 // largeur de l'image en pixels
  const H = 1400 // hauteur de l'image en pixels
  const canvas = document.createElement('canvas') // zone de dessin invisible
  canvas.width = W // applique la largeur
  canvas.height = H // applique la hauteur
  const ctx = canvas.getContext('2d') // outil de dessin
  if (!ctx) return Promise.reject(new Error('Canvas indisponible')) // navigateur sans dessin : on abandonne

  // Fond en dégradé diagonal
  const bg = ctx.createLinearGradient(0, 0, W, H) // dégradé du coin haut gauche au coin bas droit
  bg.addColorStop(0, COLORS.dark) // couleur de départ
  bg.addColorStop(1, COLORS.gradientEnd) // couleur d'arrivée
  ctx.fillStyle = bg // utilise le dégradé comme remplissage
  ctx.fillRect(0, 0, W, H) // remplit toute l'image

  ctx.textAlign = 'center' // texte centré par défaut
  ctx.fillStyle = COLORS.white // texte blanc par défaut

  // Titre et sous-titre
  ctx.font = `800 100px ${FONT_FAMILY}` // police du titre : très grasse, 100 pixels
  ctx.fillText(TEXTS.title, W / 2, 170) // titre au centre, à 170 pixels du haut
  ctx.font = `400 40px ${FONT_FAMILY}` // police du sous-titre : normale, 40 pixels
  ctx.globalAlpha = 0.85 // légère transparence du sous-titre
  ctx.fillText(TEXTS.cardSubtitle, W / 2, 230) // sous-titre sous le titre
  ctx.globalAlpha = 1 // retour à l'opacité normale

  // Panneau du score total
  ctx.fillStyle = 'rgba(255,255,255,0.14)' // blanc très transparent pour le panneau
  roundedRect(ctx, 90, 290, W - 180, 400, 36) // panneau de 400 pixels de haut aux coins arrondis
  ctx.fill() // remplit le panneau
  ctx.fillStyle = COLORS.white // texte blanc
  ctx.font = `500 48px ${FONT_FAMILY}` // police du libellé "Mon score"
  ctx.fillText(TEXTS.myScore, W / 2, 370) // libellé en haut du panneau
  ctx.fillStyle = COLORS.gold // score en doré
  ctx.font = `800 190px ${FONT_FAMILY}` // police du score : très grande
  ctx.fillText(total.toLocaleString('fr-FR'), W / 2, 550) // score total au centre du panneau
  ctx.fillStyle = COLORS.white // texte blanc
  ctx.font = `400 44px ${FONT_FAMILY}` // police du maximum possible
  ctx.fillText(TEXTS.outOf(maxTotal.toLocaleString('fr-FR')), W / 2, 625) // "sur 25 000 points"

  // Détail des manches : une ligne par manche
  const rowH = Math.min(100, 440 / Math.max(results.length, 1)) // hauteur d'une ligne (réduite s'il y a beaucoup de manches)
  let y = 740 // position verticale de la première ligne
  results.forEach((r, i) => { // pour chaque manche jouée
    ctx.fillStyle = 'rgba(255,255,255,0.12)' // fond de ligne légèrement transparent
    roundedRect(ctx, 90, y, W - 180, rowH - 14, 22) // rectangle arrondi de la ligne
    ctx.fill() // remplit le fond de ligne
    const baseline = y + (rowH - 14) / 2 + 15 // hauteur du texte : au milieu de la ligne
    ctx.fillStyle = COLORS.white // texte blanc
    ctx.font = `600 38px ${FONT_FAMILY}` // police du numéro de manche
    ctx.textAlign = 'left' // numéro aligné à gauche
    ctx.fillText(TEXTS.roundRecap(i + 1), 130, baseline) // "Manche 1"
    ctx.textAlign = 'center' // distance centrée
    ctx.font = `400 38px ${FONT_FAMILY}` // police de la distance
    ctx.fillText(formatDistance(r.distance), W / 2 + 40, baseline) // distance de la manche
    ctx.textAlign = 'right' // points alignés à droite
    ctx.fillStyle = COLORS.gold // points en doré
    ctx.font = `700 38px ${FONT_FAMILY}` // police des points
    ctx.fillText(`${r.score.toLocaleString('fr-FR')} ${TEXTS.pointsSuffix}`, W - 130, baseline) // points de la manche
    y += rowH // descend à la ligne suivante
  })

  // Message de félicitations en bas
  ctx.textAlign = 'center' // texte centré
  ctx.fillStyle = COLORS.white // texte blanc
  ctx.font = `700 46px ${FONT_FAMILY}` // police du titre "Bravo"
  ctx.fillText(TEXTS.finalTitle, W / 2, 1250) // "Bravo !"
  ctx.font = `400 34px ${FONT_FAMILY}` // police du message
  ctx.globalAlpha = 0.9 // légère transparence du message
  wrapText(ctx, finalMessage(total, maxTotal), W - 200).slice(0, 2).forEach((line, i) => { // au plus deux lignes
    ctx.fillText(line, W / 2, 1300 + i * 44) // chaque ligne 44 pixels sous la précédente
  })
  ctx.globalAlpha = 1 // retour à l'opacité normale

  return new Promise<Blob>((resolve, reject) => { // convertit le dessin en fichier PNG
    canvas.toBlob((blob) => {
      if (blob) resolve(blob) // fichier créé : on le renvoie
      else reject(new Error('Impossible de créer l’image')) // échec de la conversion
    }, 'image/png') // format PNG
  })
}
