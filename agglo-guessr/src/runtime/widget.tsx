/** @jsx jsx */
// La ligne ci-dessus est obligatoire : elle permet d'écrire du HTML dans le code avec le style d'Experience Builder.

// FICHIER PRINCIPAL DU JEU : chargement des données, déroulement des manches, interaction avec la carte, affichage.
// Où modifier quoi : couleurs dans theme.ts, textes dans textes.ts, tailles et formes dans style.ts, calculs dans utils.ts.

import { React, ReactDOM, jsx, type AllWidgetProps } from 'jimu-core' // outils de base d'Experience Builder
import { JimuMapViewComponent, type JimuMapView, loadArcGISJSAPIModules } from 'jimu-arcgis' // lien avec la carte et chargement des modules ArcGIS
import { type IMConfig } from '../config' // type des réglages du widget
import { styles } from './style' // feuille de style du jeu
import { COLORS } from './theme' // couleurs (utilisées ici pour les marqueurs de la carte)
import { TEXTS } from './textes' // textes affichés
import {
  type Round, // description d'une manche
  type RoundResult, // résultat d'une manche
  MAX_ROUND_SCORE, // score maximum d'une manche
  computeScore, // calcul des points à partir de la distance
  formatDistance, // mise en forme d'une distance
  formatPoints, // mise en forme d'un nombre de points
  buildScoreCard, // fabrication de l'image de score
  finalMessage, // message de félicitations
  prepareImages, // réduction du poids des photos
  withTimeout, // limite de temps pour les chargements
  viewToLonLat, // conversion des coordonnées de la carte vers longitude et latitude
  lonLatToView, // conversion de longitude et latitude vers les coordonnées de la carte
  distanceMeters // calcul d'une distance en mètres
} from './utils'

// Les différentes étapes possibles du jeu.
type Phase = 'loading' | 'error' | 'intro' | 'playing' | 'result' | 'final'
// loading : chargement, error : erreur, intro : accueil, playing : photo et pari, result : révélation, final : écran de fin

// Apparence du marqueur du pari du joueur sur la carte.
const GUESS_SYMBOL = {
  type: 'simple-marker', // symbole de type point
  style: 'circle', // forme ronde
  color: COLORS.guess, // couleur de remplissage (theme.ts)
  size: 16, // diamètre en pixels
  outline: { color: COLORS.white, width: 2.5 } // contour blanc de 2,5 pixels
}

// Apparence du marqueur du vrai lieu sur la carte.
const TRUTH_SYMBOL = {
  type: 'simple-marker', // symbole de type point
  style: 'circle', // forme ronde
  color: COLORS.truth, // couleur de remplissage (theme.ts)
  size: 18, // diamètre en pixels
  outline: { color: COLORS.white, width: 2.5 } // contour blanc de 2,5 pixels
}

// Apparence de la ligne entre le pari et le vrai lieu.
const LINE_SYMBOL = {
  type: 'simple-line', // symbole de type ligne
  color: COLORS.line, // couleur de la ligne (theme.ts)
  width: 2.5, // épaisseur en pixels
  style: 'dash' // ligne en pointillés
}

const { useState, useEffect, useRef, useCallback } = React // outils React : mémoire, effets, références, fonctions stables

// Composant principal du widget.
const Widget = (props: AllWidgetProps<IMConfig>): React.ReactElement => {
  const { config } = props // réglages du widget (couche, champs, barème)

  // ---------------------------------------------------------------
  // MÉMOIRE DU WIDGET (les valeurs qui changent pendant le jeu)
  // ---------------------------------------------------------------
  const [jmv, setJmv] = useState<JimuMapView | null>(null) // la carte liée au widget
  const [ready, setReady] = useState(false) // true quand les modules ArcGIS sont chargés
  const [phase, setPhase] = useState<Phase>('loading') // étape actuelle du jeu
  const [error, setError] = useState('') // message d'erreur de chargement
  const [notice, setNotice] = useState('') // message d'erreur pendant une manche
  const [rounds, setRounds] = useState<Round[]>([]) // liste des manches (lieux à deviner)
  const [index, setIndex] = useState(0) // numéro de la manche en cours (0 pour la première)
  const [photoOpen, setPhotoOpen] = useState(true) // true : photo en grand, false : photo en vignette
  const [hasGuess, setHasGuess] = useState(false) // true quand le joueur a posé un pari
  const [results, setResults] = useState<RoundResult[]>([]) // résultats des manches déjà jouées
  const [sharing, setSharing] = useState(false) // true pendant la fabrication de l'image de score
  const [shareMsg, setShareMsg] = useState('') // message affiché après le partage

  // ---------------------------------------------------------------
  // RÉFÉRENCES (valeurs gardées en mémoire sans redessiner l'écran)
  // ---------------------------------------------------------------
  const rootRef = useRef<HTMLDivElement>(null) // le conteneur du widget dans la page
  const modulesRef = useRef<any>(null) // les modules ArcGIS chargés
  const guessRef = useRef<any>(null) // le point du pari (dans le système de coordonnées de la carte)
  const glRef = useRef<any>(null) // la couche temporaire où l'on dessine pari, vrai lieu et ligne
  const homeRef = useRef<any>(null) // la vue initiale de la carte, pour y revenir

  // ---------------------------------------------------------------
  // VALEURS CALCULÉES
  // ---------------------------------------------------------------
  const onActiveViewChange = useCallback((view: JimuMapView) => setJmv(view), []) // fonction stable appelée quand la carte est prête
  const inBuilder = !!(window as any).jimuConfig?.isInBuilder // true si on est dans l'éditeur (builder) et non en aperçu ou publié
  const mapMissing = (props.useMapWidgetIds?.length ?? 0) === 0 // true si aucune carte n'est choisie dans les réglages
  const mapReady = !!jmv?.view && ready // true quand la carte et les modules sont prêts

  // ---------------------------------------------------------------
  // CORRECTION DU BLOCAGE DES CLICS
  // Le cadre du widget reste posé sur la carte dans la mise en page et intercepte les clics.
  // On le rend traversable : les clics passent à travers et atteignent la carte.
  // ---------------------------------------------------------------
  useEffect(() => {
    const root = rootRef.current // conteneur du widget
    const mapContainer = jmv?.view?.container as HTMLElement | undefined // élément HTML de la carte
    if (!root || !mapContainer || inBuilder) return // dans le builder, on garde le cadre cliquable pour pouvoir le déplacer
    const changed: HTMLElement[] = [] // éléments que l'on a rendus traversables (pour les remettre à la fin)
    const rootRect = root.getBoundingClientRect() // position et taille du conteneur du widget
    let el: HTMLElement | null = root // on commence par le conteneur du widget
    let depth = 0 // nombre de niveaux remontés
    while (el && el !== document.body && depth < 8) { // on remonte les parents, huit niveaux au maximum
      if (el.contains(mapContainer)) break // si cet élément contient la carte, on s'arrête (sinon la carte ne serait plus cliquable)
      const r = el.getBoundingClientRect() // position et taille de cet élément
      const sameBox = Math.abs(r.width - rootRect.width) < 2 && // même largeur que le widget
        Math.abs(r.height - rootRect.height) < 2 && // même hauteur que le widget
        Math.abs(r.left - rootRect.left) < 2 && // même position horizontale
        Math.abs(r.top - rootRect.top) < 2 // même position verticale
      if (!sameBox) break // un parent plus grand est un conteneur de mise en page : on s'arrête
      el.style.pointerEvents = 'none' // les clics traversent cet élément
      changed.push(el) // on le mémorise pour le remettre à la fin
      el = el.parentElement // on passe au parent
      depth += 1 // un niveau de plus
    }
    return () => { // nettoyage quand le widget disparaît
      changed.forEach((e) => { e.style.pointerEvents = '' }) // remet le comportement normal des clics
    }
  }, [jmv, inBuilder])

  // ---------------------------------------------------------------
  // ÉTAPE 1 : chargement des modules ArcGIS, des points et des photos jointes
  // ---------------------------------------------------------------
  useEffect(() => {
    let cancelled = false // devient true si le widget est fermé ou si les réglages changent pendant le chargement
    setPhase('loading') // affiche le message de chargement
    setError('') // efface l'ancienne erreur

    if (!config.layerUrl) { // si aucune URL de couche n'est renseignée
      setPhase('error') // passe en erreur
      setError(TEXTS.errors.needLayerUrl) // explique ce qu'il faut faire
      return // on arrête là
    }

    ;(async () => { // fonction asynchrone lancée immédiatement
      try {
        // Chargement des modules ArcGIS présents dans toutes les versions de l'API
        const [FeatureLayer, Graphic, GraphicsLayer, Point, Polyline, Extent] = await withTimeout(
          loadArcGISJSAPIModules([
            'esri/layers/FeatureLayer', // lecture de la couche d'entités
            'esri/Graphic', // objets dessinés sur la carte
            'esri/layers/GraphicsLayer', // couche temporaire de dessin
            'esri/geometry/Point', // point géographique
            'esri/geometry/Polyline', // ligne géographique
            'esri/geometry/Extent' // rectangle de zoom
          ]),
          20000, // abandon après 20 secondes
          TEXTS.errors.modules // message en cas d'abandon
        )
        if (cancelled) return // si le widget a été fermé entre-temps, on arrête
        modulesRef.current = { FeatureLayer, Graphic, GraphicsLayer, Point, Polyline, Extent } // garde les modules en mémoire
        setReady(true) // signale que les modules sont prêts

        // La couche est lue directement, sans être ajoutée à la carte : les points restent invisibles pour le joueur.
        const layer = new FeatureLayer({ url: config.layerUrl }) // crée l'accès à la couche
        await withTimeout(layer.load(), 25000, TEXTS.errors.layerTimeout) // charge la description de la couche (25 secondes maximum)

        const query = layer.createQuery() // prépare une requête
        query.where = '1=1' // on demande tous les points
        query.outFields = ['*'] // avec tous les champs
        query.returnGeometry = true // avec leur position
        query.outSpatialReference = { wkid: 4326 } as any // le service convertit les positions en longitude et latitude (WGS84)
        const res = await withTimeout(layer.queryFeatures(query), 25000, TEXTS.errors.queryTimeout) // envoie la requête (25 secondes maximum)

        const oidField: string = layer.objectIdField // nom du champ d'identifiant technique
        const feats = res.features // liste des points reçus
          .filter((f: any) => !!f.geometry) // ignore les points sans position
          .sort((a: any, b: any) => (Number(a.attributes[config.orderField]) || 0) - (Number(b.attributes[config.orderField]) || 0)) // trie selon le champ d'ordre
          .slice(0, config.maxRounds || 5) // garde seulement le nombre de manches voulu

        const ids = feats.map((f: any) => f.attributes[oidField]) // liste des identifiants des points retenus
        const attachments = ids.length > 0 ? await layer.queryAttachments({ objectIds: ids }) : {} // récupère les pièces jointes (photos) de ces points

        const found: Round[] = feats // construit la liste des manches
          .map((f: any): Round => {
            const infos: any[] = attachments[f.attributes[oidField]] ?? [] // pièces jointes de ce point
            const img = infos.find((a) => (a.contentType ?? '').startsWith('image/')) ?? infos[0] // première pièce jointe de type image
            return {
              objectId: f.attributes[oidField], // identifiant technique
              order: Number(f.attributes[config.orderField]) || 0, // numéro d'ordre
              name: String(f.attributes[config.nameField] ?? ''), // nom du lieu
              anecdote: String(f.attributes[config.anecdoteField] ?? ''), // anecdote
              photoUrl: img?.url ?? '', // adresse de la photo
              thumbUrl: '', // miniature, remplie plus bas
              x: f.geometry.x, // longitude du vrai lieu
              y: f.geometry.y // latitude du vrai lieu
            }
          })
          .filter((r: Round) => r.photoUrl !== '') // ignore les points sans photo

        if (cancelled) return // si le widget a été fermé entre-temps, on arrête
        if (found.length === 0) { // si aucune manche n'est exploitable
          throw new Error(TEXTS.errors.noRounds) // signale l'erreur
        }

        // Prépare les deux versions allégées de chaque photo (grande et miniature)
        const loaded: Round[] = await Promise.all(
          found.map(async (r) => ({ ...r, ...(await prepareImages(r.photoUrl)) })) // ajoute photoUrl et thumbUrl allégées
        )
        if (cancelled) return // si le widget a été fermé entre-temps, on arrête

        setRounds(loaded) // enregistre les manches
        setResults([]) // aucun résultat pour l'instant
        setIndex(0) // on commence à la première manche
        setPhase('intro') // affiche l'écran d'accueil
      } catch (e: any) { // en cas de problème
        if (cancelled) return // si le widget a été fermé entre-temps, on ignore
        setError(String(e?.message ?? e)) // enregistre le message d'erreur
        setPhase('error') // affiche l'erreur
      }
    })()

    return () => { cancelled = true } // si les réglages changent ou si le widget se ferme, on annule ce chargement
  }, [config.layerUrl, config.orderField, config.nameField, config.anecdoteField, config.maxRounds]) // relance le chargement si un de ces réglages change

  // ---------------------------------------------------------------
  // ÉTAPE 2 : couche de dessin temporaire et mémorisation de la vue initiale
  // ---------------------------------------------------------------
  useEffect(() => {
    const view = jmv?.view // la vue de la carte
    const m = modulesRef.current // les modules ArcGIS
    if (!view || !m || !ready) return // on attend que tout soit prêt
    const gl = new m.GraphicsLayer({ listMode: 'hide' }) // couche de dessin cachée de la liste des couches
    view.map.add(gl) // ajoute la couche de dessin à la carte
    glRef.current = gl // garde la couche en mémoire
    view.when(() => { homeRef.current = view.viewpoint.clone() }) // mémorise la vue de départ quand la carte est prête
    return () => { // nettoyage
      view.map.remove(gl) // retire la couche de dessin de la carte
      glRef.current = null // oublie la couche
    }
  }, [jmv, ready])

  // ---------------------------------------------------------------
  // ÉTAPE 3 : clic sur la carte pendant la phase de pari
  // ---------------------------------------------------------------
  useEffect(() => {
    const view = jmv?.view // la vue de la carte
    const m = modulesRef.current // les modules ArcGIS
    if (!view || !m || !ready || phase !== 'playing') return // actif seulement pendant la phase de pari

    const previousPopup = view.popupEnabled // mémorise si les fenêtres d'information étaient actives
    view.popupEnabled = false // les désactive pour qu'un clic ne les ouvre pas

    // "immediate-click" réagit tout de suite (le clic normal attend environ 300 millisecondes)
    const handle = view.on('immediate-click', (event: any) => {
      event.stopPropagation() // empêche la carte de traiter ce clic autrement
      const gl = glRef.current // couche de dessin
      if (!gl) return // si elle n'existe pas, on arrête
      guessRef.current = event.mapPoint // mémorise le point cliqué
      gl.removeAll() // efface l'ancien marqueur
      gl.add(new m.Graphic({ geometry: event.mapPoint, symbol: GUESS_SYMBOL })) // dessine le nouveau marqueur de pari
      setHasGuess(true) // active le bouton "Deviner"
      setNotice('') // efface un éventuel message d'erreur
    })

    return () => { // nettoyage à la fin de la phase de pari
      handle.remove() // arrête d'écouter les clics
      view.popupEnabled = previousPopup // remet les fenêtres d'information comme avant
    }
  }, [jmv, ready, phase])

  // ---------------------------------------------------------------
  // ACTIONS DU JEU
  // ---------------------------------------------------------------

  // Revient à la vue initiale de la carte, sans animation (la carte est cachée à ce moment-là).
  const goHome = (): void => {
    const view = jmv?.view // la vue de la carte
    if (view && homeRef.current) { // si on connaît la vue de départ
      view.goTo(homeRef.current, { animate: false }).catch(() => {}) // y retourne sans animation, en ignorant les erreurs
    }
  }

  // Démarre la manche numéro i.
  const startRound = (i: number): void => {
    glRef.current?.removeAll() // efface les dessins de la manche précédente
    guessRef.current = null // oublie l'ancien pari
    setHasGuess(false) // aucun pari posé
    setNotice('') // efface les messages
    setIndex(i) // passe à la manche i
    setPhotoOpen(true) // affiche la photo en grand
    setPhase('playing') // passe à la phase de pari
    goHome() // recentre la carte sur l'agglomération
  }

  // Valide le pari : calcule la distance et le score, puis montre la réponse.
  const validate = (): void => {
    const view = jmv?.view // la vue de la carte
    const m = modulesRef.current // les modules ArcGIS
    const gl = glRef.current // couche de dessin
    const guess = guessRef.current // point du pari
    const round = rounds[index] // manche en cours
    if (!view || !m || !gl || !guess || !round) return // si un élément manque, on arrête

    try {
      const sr = view.spatialReference // système de coordonnées de la carte
      const g = viewToLonLat(guess.x, guess.y, sr) // pari en longitude et latitude
      const t = lonLatToView(round.x, round.y, sr) // vrai lieu en coordonnées de la carte
      if (!g || !t) { // si la carte utilise un système non pris en charge
        throw new Error(TEXTS.errors.badProjection) // signale l'erreur
      }
      const distance = distanceMeters(g.lon, g.lat, round.x, round.y) // distance en mètres entre le pari et le vrai lieu
      const score = computeScore(distance, config.perfectDistance, config.maxDistance) // points gagnés

      const truth = new m.Point({ x: t.x, y: t.y, spatialReference: sr }) // point du vrai lieu pour la carte

      gl.add(new m.Graphic({ // ajoute la ligne entre le pari et le vrai lieu
        geometry: new m.Polyline({ paths: [[[guess.x, guess.y], [truth.x, truth.y]]], spatialReference: sr }), // tracé de la ligne
        symbol: LINE_SYMBOL // apparence de la ligne
      }))
      gl.add(new m.Graphic({ geometry: truth, symbol: TRUTH_SYMBOL })) // ajoute le marqueur du vrai lieu

      // Calcul du rectangle de zoom qui montre le pari et le vrai lieu
      const minX = Math.min(guess.x, truth.x) // limite gauche
      const maxX = Math.max(guess.x, truth.x) // limite droite
      const minY = Math.min(guess.y, truth.y) // limite basse
      const maxY = Math.max(guess.y, truth.y) // limite haute
      const minSpan = sr.isGeographic ? 0.004 : 400 // taille minimale du rectangle (évite un zoom extrême si les points sont très proches)
      const cx = (minX + maxX) / 2 // centre horizontal
      const cy = (minY + maxY) / 2 // centre vertical
      const w = Math.max((maxX - minX) * 1.8, minSpan) // largeur du rectangle avec une marge de 80 pour cent
      const h = Math.max((maxY - minY) * 1.8, minSpan) // hauteur du rectangle avec une marge de 80 pour cent
      const extent = new m.Extent({
        xmin: cx - w / 2, // limite gauche du zoom
        xmax: cx + w / 2, // limite droite du zoom
        ymin: cy - h / 2 - h * 0.35, // limite basse, abaissée pour laisser de la place à la carte de résultat
        ymax: cy + h / 2, // limite haute du zoom
        spatialReference: sr // système de coordonnées
      })
      view.goTo(extent, { duration: 900 }).catch(() => {}) // zoom animé de 0,9 seconde, en ignorant les erreurs

      setResults((prev) => [...prev, { distance, score }]) // ajoute le résultat de cette manche
      setPhotoOpen(false) // la photo passe en vignette
      setPhase('result') // affiche la révélation
    } catch (e: any) { // en cas de problème
      setNotice(TEXTS.errors.computeFailed + String(e?.message ?? e)) // affiche un message d'erreur
    }
  }

  // Passe à la manche suivante, ou à l'écran final après la dernière.
  const next = (): void => {
    if (index + 1 >= rounds.length) { // si c'était la dernière manche
      glRef.current?.removeAll() // efface les dessins
      setShareMsg('') // efface le message de partage
      setPhase('final') // affiche l'écran final
      goHome() // recentre la carte
    } else {
      startRound(index + 1) // sinon démarre la manche suivante
    }
  }

  // Recommence une partie depuis l'écran d'accueil.
  const replay = (): void => {
    glRef.current?.removeAll() // efface les dessins
    guessRef.current = null // oublie le pari
    setResults([]) // efface les résultats
    setIndex(0) // revient à la première manche
    setHasGuess(false) // aucun pari posé
    setShareMsg('') // efface le message de partage
    setPhase('intro') // affiche l'écran d'accueil
    goHome() // recentre la carte
  }

  const total = results.reduce((sum, r) => sum + r.score, 0) // score total cumulé
  const maxTotal = rounds.length * MAX_ROUND_SCORE // score maximum possible

  // Partage le score : image PNG envoyée via le menu de partage (mobile) ou téléchargée (ordinateur).
  const share = async (): Promise<void> => {
    setSharing(true) // affiche l'état "création en cours"
    setShareMsg('') // efface l'ancien message
    try {
      const blob = await buildScoreCard(results, total, maxTotal) // fabrique l'image de score
      const file = new File([blob], 'agglOguessr-score.png', { type: 'image/png' }) // en fait un fichier
      const nav = navigator as any // accès aux fonctions du navigateur
      if (nav.canShare?.({ files: [file] })) { // si le navigateur sait partager des fichiers (mobile en général)
        await nav.share({
          files: [file], // fichier à partager
          title: TEXTS.title, // titre du partage
          text: TEXTS.shareText(formatPoints(total)) // texte joint
        })
      } else { // sinon (ordinateur) : téléchargement
        const url = URL.createObjectURL(blob) // adresse temporaire du fichier
        const a = document.createElement('a') // lien invisible
        a.href = url // le lien pointe vers le fichier
        a.download = 'agglOguessr-score.png' // nom du fichier téléchargé
        document.body.appendChild(a) // ajoute le lien à la page
        a.click() // simule un clic pour lancer le téléchargement
        document.body.removeChild(a) // retire le lien
        setTimeout(() => URL.revokeObjectURL(url), 2000) // libère la mémoire après 2 secondes
        setShareMsg(TEXTS.shareSaved) // confirme l'enregistrement
      }
    } catch (e: any) { // en cas de problème
      if (e?.name !== 'AbortError') setShareMsg(TEXTS.shareFailed) // message d'erreur, sauf si le joueur a simplement fermé le menu de partage
    } finally {
      setSharing(false) // termine l'état "création en cours"
    }
  }

  // ---------------------------------------------------------------
  // INTERFACE (ce qui s'affiche à l'écran)
  // ---------------------------------------------------------------
  const round = rounds[index] // manche en cours
  const last = results[results.length - 1] // dernier résultat obtenu
  const showBigPhoto = photoOpen && (phase === 'playing' || phase === 'result') && !!round // true : afficher la photo en grand
  const showThumb = !photoOpen && (phase === 'playing' || phase === 'result') && !!round // true : afficher la vignette

  const ui = (
    // Conteneur général du jeu (couvre l'écran, laisse passer les clics)
    <div className="ag-root" css={styles}>
      {/* Message pendant le chargement */}
      {phase === 'loading' && <div className="ag-toast">{TEXTS.loading}</div>}

      {/* Message en cas d'erreur de chargement */}
      {phase === 'error' && <div className="ag-toast ag-toast-error">{error}</div>}

      {/* Écran d'accueil */}
      {phase === 'intro' && (
        <div className="ag-backdrop">
          <div className="ag-card">
            <h1>{TEXTS.title}</h1>
            <p>{TEXTS.introText(rounds.length)}</p>
            <button
              className="ag-btn ag-btn-primary ag-btn-block" // bouton principal sur toute la largeur
              disabled={!mapReady} // inactif tant que la carte n'est pas prête
              onClick={() => startRound(0)} // démarre la première manche
            >
              {mapMissing ? TEXTS.mapNotConfigured : mapReady ? TEXTS.playButton : TEXTS.mapLoading}
            </button>
          </div>
        </div>
      )}

      {/* Bandeau du haut : manche et score */}
      {(phase === 'playing' || phase === 'result') && (
        <div className="ag-header">
          <span>{TEXTS.roundLabel(index + 1, rounds.length)}</span>
          <span>{TEXTS.scoreLabel(formatPoints(total))}</span>
        </div>
      )}

      {/* Photo en grand : un clic la réduit en vignette */}
      {showBigPhoto && (
        <div className="ag-backdrop" onClick={() => setPhotoOpen(false)}>
          <div className="ag-photo-card">
            <img src={round.photoUrl} alt={TEXTS.photoAlt} decoding="async" />
            <div className="ag-photo-hint">{TEXTS.photoHint}</div>
          </div>
        </div>
      )}

      {/* Vignette dans le coin : un clic agrandit la photo */}
      {showThumb && (
        <button className="ag-thumb" onClick={() => setPhotoOpen(true)} aria-label={TEXTS.thumbAria}>
          <img src={round.thumbUrl} alt={TEXTS.thumbAlt} decoding="async" />
          <span>{TEXTS.thumbLabel}</span>
        </button>
      )}

      {/* Barre du bas pendant le pari : aide et bouton "Deviner" */}
      {phase === 'playing' && !photoOpen && (
        <div className="ag-bar">
          <div className={'ag-bar-hint' + (notice ? ' ag-bar-notice' : '')}>
            {notice || (hasGuess ? TEXTS.hintGuess : TEXTS.hintNoGuess)}
          </div>
          <button
            className="ag-btn ag-btn-primary" // bouton principal
            disabled={!hasGuess} // grisé tant qu'aucun pari n'est posé
            onClick={validate} // valide le pari
          >
            {TEXTS.guessButton}
          </button>
        </div>
      )}

      {/* Carte de résultat : distance, points, nom du lieu et anecdote */}
      {phase === 'result' && !photoOpen && last && round && (
        <div className="ag-result">
          <div className="ag-result-main">
            <span className="ag-dist">{formatDistance(last.distance)}</span>
            <span className="ag-pts">{formatPoints(last.score)} {TEXTS.pointsSuffix}</span>
          </div>
          {round.name && <div className="ag-place">{TEXTS.placeWas} <strong>{round.name}</strong></div>}
          {round.anecdote && <div className="ag-anec">{round.anecdote}</div>}
          <div className="ag-legend">
            <span className="ag-legend-guess">{TEXTS.legendGuess}</span>
            <span className="ag-legend-truth">{TEXTS.legendTruth}</span>
          </div>
          <button className="ag-btn ag-btn-primary ag-btn-block" onClick={next}>
            {index + 1 >= rounds.length ? TEXTS.seeScore : TEXTS.nextRound}
          </button>
        </div>
      )}

      {/* Écran final : score total, récapitulatif, partage et rejouer */}
      {phase === 'final' && (
        <div className="ag-backdrop">
          <div className="ag-card">
            <h1>{TEXTS.finalTitle}</h1>
            <p>{finalMessage(total, maxTotal)}</p>
            <div className="ag-score">
              {formatPoints(total)} <small>{TEXTS.outOf(formatPoints(maxTotal))}</small>
            </div>
            <ul className="ag-recap">
              {results.map((r, i) => (
                <li key={i}>
                  <span>{TEXTS.roundRecap(i + 1)}</span>
                  <span>{formatDistance(r.distance)}</span>
                  <span>{formatPoints(r.score)} {TEXTS.pointsSuffix}</span>
                </li>
              ))}
            </ul>
            <div className="ag-actions">
              <button className="ag-btn ag-btn-primary" disabled={sharing} onClick={share}>
                {sharing ? TEXTS.shareBusy : TEXTS.shareButton}
              </button>
              <button className="ag-btn ag-btn-secondary" onClick={replay}>
                {TEXTS.replayButton}
              </button>
            </div>
            {shareMsg && <p className="ag-share-msg">{shareMsg}</p>}
          </div>
        </div>
      )}
    </div>
  )

  return (
    // Cadre du widget dans la mise en page d'Experience Builder
    <div
      ref={rootRef} // permet de retrouver ce cadre dans le code
      className="jimu-widget widget-agglo-guessr" // classes standard d'Experience Builder
      style={{ width: '100%', height: '100%', pointerEvents: inBuilder ? 'auto' : 'none' }} // en aperçu ou publié, le cadre laisse passer les clics
    >
      {/* Composant invisible qui fournit la carte choisie dans les réglages */}
      {!mapMissing && (
        <JimuMapViewComponent
          useMapWidgetId={props.useMapWidgetIds?.[0]} // identifiant de la carte choisie
          onActiveViewChange={onActiveViewChange} // appelé quand la carte est prête
        />
      )}

      {/* Dans le builder : petit encart de diagnostic. Sinon : le jeu, affiché au niveau de la page entière */}
      {inBuilder
        ? (
          <div style={{ padding: 12, background: COLORS.main, color: COLORS.white, borderRadius: 8, fontSize: 13, lineHeight: 1.5 }}>
            <strong>{TEXTS.builder.title}</strong><br />
            {mapMissing ? TEXTS.builder.mapNotLinked : TEXTS.builder.mapLinked}<br />
            {phase === 'error'
              ? error
              : phase === 'loading' ? TEXTS.builder.loading : TEXTS.builder.roundsLoaded(rounds.length)}<br />
            <em>{TEXTS.builder.previewHint}</em>
          </div>
          )
        : ReactDOM.createPortal(ui, document.body)}
    </div>
  )
}

export default Widget // exporte le widget pour Experience Builder
