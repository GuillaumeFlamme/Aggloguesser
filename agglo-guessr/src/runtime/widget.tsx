/** @jsx jsx */
import { React, ReactDOM, jsx, type AllWidgetProps } from 'jimu-core'
import { JimuMapViewComponent, type JimuMapView, loadArcGISJSAPIModules } from 'jimu-arcgis'
import { type IMConfig } from '../config'
import { styles } from './style'
import {
  type Round,
  type RoundResult,
  MAX_ROUND_SCORE,
  computeScore,
  formatDistance,
  formatPoints,
  buildScoreCard,
  finalMessage,
  prepareImages,
  withTimeout,
  viewToLonLat,
  lonLatToView,
  distanceMeters
} from './utils'

type Phase = 'loading' | 'error' | 'intro' | 'playing' | 'result' | 'final'

const GUESS_SYMBOL = {
  type: 'simple-marker',
  style: 'circle',
  color: [37, 99, 235, 1],
  size: 16,
  outline: { color: [255, 255, 255, 1], width: 2.5 }
}
const TRUTH_SYMBOL = {
  type: 'simple-marker',
  style: 'circle',
  color: [22, 163, 74, 1],
  size: 18,
  outline: { color: [255, 255, 255, 1], width: 2.5 }
}
const LINE_SYMBOL = {
  type: 'simple-line',
  color: [30, 41, 59, 0.9],
  width: 2.5,
  style: 'dash'
}

const { useState, useEffect, useRef } = React

const Widget = (props: AllWidgetProps<IMConfig>): React.ReactElement => {
  const { config } = props

  const [jmv, setJmv] = useState<JimuMapView | null>(null)
  const [ready, setReady] = useState(false) // modules ArcGIS chargés
  const [phase, setPhase] = useState<Phase>('loading')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [rounds, setRounds] = useState<Round[]>([])
  const [index, setIndex] = useState(0)
  const [photoOpen, setPhotoOpen] = useState(true)
  const [hasGuess, setHasGuess] = useState(false)
  const [results, setResults] = useState<RoundResult[]>([])
  const [sharing, setSharing] = useState(false)
  const [shareMsg, setShareMsg] = useState('')

  const modulesRef = useRef<any>(null)
  const guessRef = useRef<any>(null) // Point du pari, dans le SR de la vue
  const glRef = useRef<any>(null) // GraphicsLayer temporaire
  const homeRef = useRef<any>(null) // Viewpoint initial de la carte

  // Callback stable : évite de relancer le composant carte à chaque rendu
  const onActiveViewChange = React.useCallback((view: JimuMapView) => setJmv(view), [])

  const inBuilder = !!(window as any).jimuConfig?.isInBuilder
  const mapMissing = (props.useMapWidgetIds?.length ?? 0) === 0
  const mapReady = !!jmv?.view && ready

  // ---------------------------------------------------------------
  // 1. Chargement des modules ArcGIS, des 5 points et des photos jointes
  // ---------------------------------------------------------------
  useEffect(() => {
    let cancelled = false
    setPhase('loading')
    setError('')

    if (!config.layerUrl) {
      setPhase('error')
      setError('Renseignez l’URL de la couche dans les paramètres du widget.')
      return
    }

    ;(async () => {
      try {
        // Modules présents dans toutes les versions de l'API ArcGIS (4.x et 5.x)
        const [FeatureLayer, Graphic, GraphicsLayer, Point, Polyline, Extent] =
          await withTimeout(
            loadArcGISJSAPIModules([
              'esri/layers/FeatureLayer',
              'esri/Graphic',
              'esri/layers/GraphicsLayer',
              'esri/geometry/Point',
              'esri/geometry/Polyline',
              'esri/geometry/Extent'
            ]),
            20000,
            'Impossible de charger les modules ArcGIS (version de l’API incompatible ?).'
          )
        if (cancelled) return
        modulesRef.current = { FeatureLayer, Graphic, GraphicsLayer, Point, Polyline, Extent }
        setReady(true)

        // La couche est lue directement, sans être ajoutée à la carte :
        // les points restent invisibles pour le joueur.
        const layer = new FeatureLayer({ url: config.layerUrl })
        await withTimeout(
          layer.load(),
          25000,
          'La couche ne répond pas : vérifiez l’URL et le partage de la couche.'
        )

        const query = layer.createQuery()
        query.where = '1=1'
        query.outFields = ['*']
        query.returnGeometry = true
        // Le service reprojette lui-même (Lambert 93 -> WGS84)
        query.outSpatialReference = { wkid: 4326 } as any
        const res = await withTimeout(
          layer.queryFeatures(query),
          25000,
          'La couche ne renvoie pas ses points : vérifiez son partage.'
        )

        const oidField: string = layer.objectIdField
        const feats = res.features
          .filter((f: any) => !!f.geometry)
          .sort((a: any, b: any) => (Number(a.attributes[config.orderField]) || 0) - (Number(b.attributes[config.orderField]) || 0))
          .slice(0, config.maxRounds || 5)

        const ids = feats.map((f: any) => f.attributes[oidField])
        const attachments = ids.length > 0 ? await layer.queryAttachments({ objectIds: ids }) : {}

        const found: Round[] = feats
          .map((f: any): Round => {
            const infos: any[] = attachments[f.attributes[oidField]] ?? []
            const img = infos.find((a) => (a.contentType ?? '').startsWith('image/')) ?? infos[0]
            return {
              objectId: f.attributes[oidField],
              order: Number(f.attributes[config.orderField]) || 0,
              name: String(f.attributes[config.nameField] ?? ''),
              anecdote: String(f.attributes[config.anecdoteField] ?? ''),
              photoUrl: img?.url ?? '',
              thumbUrl: '',
              x: f.geometry.x,
              y: f.geometry.y
            }
          })
          .filter((r: Round) => r.photoUrl !== '')

        if (cancelled) return
        if (found.length === 0) {
          throw new Error('Aucune manche trouvée : vérifiez que la couche contient des points avec une photo jointe.')
        }

        // Photos allégées (grande + miniature), préparées une fois pour toutes
        const loaded: Round[] = await Promise.all(
          found.map(async (r) => ({ ...r, ...(await prepareImages(r.photoUrl)) }))
        )
        if (cancelled) return

        setRounds(loaded)
        setResults([])
        setIndex(0)
        setPhase('intro')
      } catch (e: any) {
        if (cancelled) return
        setError(String(e?.message ?? e))
        setPhase('error')
      }
    })()

    return () => { cancelled = true }
  }, [config.layerUrl, config.orderField, config.nameField, config.anecdoteField, config.maxRounds])

  // ---------------------------------------------------------------
  // 2. Couche graphique temporaire + vue initiale de la carte
  // ---------------------------------------------------------------
  useEffect(() => {
    const view = jmv?.view
    const m = modulesRef.current
    if (!view || !m || !ready) return
    const gl = new m.GraphicsLayer({ listMode: 'hide' })
    view.map.add(gl)
    glRef.current = gl
    view.when(() => { homeRef.current = view.viewpoint.clone() })
    return () => {
      view.map.remove(gl)
      glRef.current = null
    }
  }, [jmv, ready])

  // ---------------------------------------------------------------
  // 3. Clic sur la carte pendant la phase « pari »
  // ---------------------------------------------------------------
  useEffect(() => {
    const view = jmv?.view
    const m = modulesRef.current
    if (!view || !m || !ready || phase !== 'playing') return

    const previousPopup = view.popupEnabled
    view.popupEnabled = false

    // « immediate-click » : réagit tout de suite (« click » attend ~300 ms
    // pour savoir s'il s'agit d'un double-clic)
    const handle = view.on('immediate-click', (event: any) => {
      event.stopPropagation()
      const gl = glRef.current
      if (!gl) return
      guessRef.current = event.mapPoint
      gl.removeAll()
      gl.add(new m.Graphic({ geometry: event.mapPoint, symbol: GUESS_SYMBOL }))
      setHasGuess(true)
      setNotice('')
    })

    return () => {
      handle.remove()
      view.popupEnabled = previousPopup
    }
  }, [jmv, ready, phase])

  // ---------------------------------------------------------------
  // Actions du jeu
  // ---------------------------------------------------------------
  // Retour à la vue initiale sans animation : la carte est cachée derrière
  // la photo ou l'écran final, inutile de la faire voyager.
  const goHome = (): void => {
    const view = jmv?.view
    if (view && homeRef.current) {
      view.goTo(homeRef.current, { animate: false }).catch(() => {})
    }
  }

  const startRound = (i: number): void => {
    glRef.current?.removeAll()
    guessRef.current = null
    setHasGuess(false)
    setNotice('')
    setIndex(i)
    setPhotoOpen(true)
    setPhase('playing')
    goHome()
  }

  const validate = (): void => {
    const view = jmv?.view
    const m = modulesRef.current
    const gl = glRef.current
    const guess = guessRef.current
    const round = rounds[index]
    if (!view || !m || !gl || !guess || !round) return

    try {
      const sr = view.spatialReference
      const g = viewToLonLat(guess.x, guess.y, sr)
      const t = lonLatToView(round.x, round.y, sr)
      if (!g || !t) {
        throw new Error('système de coordonnées de la carte non pris en charge (utilisez une carte en Web Mercator ou WGS84).')
      }
      const distance = distanceMeters(g.lon, g.lat, round.x, round.y)
      const score = computeScore(distance, config.perfectDistance, config.maxDistance)

      const truth = new m.Point({ x: t.x, y: t.y, spatialReference: sr })

      gl.add(new m.Graphic({
        geometry: new m.Polyline({ paths: [[[guess.x, guess.y], [truth.x, truth.y]]], spatialReference: view.spatialReference }),
        symbol: LINE_SYMBOL
      }))
      gl.add(new m.Graphic({ geometry: truth, symbol: TRUTH_SYMBOL }))

      // Zoom sur le pari et le vrai point (avec de la marge en bas pour la carte résultat)
      const minX = Math.min(guess.x, truth.x)
      const maxX = Math.max(guess.x, truth.x)
      const minY = Math.min(guess.y, truth.y)
      const maxY = Math.max(guess.y, truth.y)
      const minSpan = view.spatialReference.isGeographic ? 0.004 : 400
      const cx = (minX + maxX) / 2
      const cy = (minY + maxY) / 2
      const w = Math.max((maxX - minX) * 1.8, minSpan)
      const h = Math.max((maxY - minY) * 1.8, minSpan)
      const extent = new m.Extent({
        xmin: cx - w / 2,
        xmax: cx + w / 2,
        ymin: cy - h / 2 - h * 0.35,
        ymax: cy + h / 2,
        spatialReference: view.spatialReference
      })
      view.goTo(extent, { duration: 900 }).catch(() => {})

      setResults((prev) => [...prev, { distance, score }])
      setPhotoOpen(false)
      setPhase('result')
    } catch (e: any) {
      setNotice('Calcul impossible : ' + String(e?.message ?? e))
    }
  }

  const next = (): void => {
    if (index + 1 >= rounds.length) {
      glRef.current?.removeAll()
      setShareMsg('')
      setPhase('final')
      goHome()
    } else {
      startRound(index + 1)
    }
  }

  const replay = (): void => {
    glRef.current?.removeAll()
    guessRef.current = null
    setResults([])
    setIndex(0)
    setHasGuess(false)
    setShareMsg('')
    setPhase('intro')
    goHome()
  }

  const total = results.reduce((sum, r) => sum + r.score, 0)
  const maxTotal = rounds.length * MAX_ROUND_SCORE

  const share = async (): Promise<void> => {
    setSharing(true)
    setShareMsg('')
    try {
      const blob = await buildScoreCard(results, total, maxTotal)
      const file = new File([blob], 'agglOguessr-score.png', { type: 'image/png' })
      const nav = navigator as any
      if (nav.canShare?.({ files: [file] })) {
        await nav.share({
          files: [file],
          title: 'AgglOguessr',
          text: `J’ai fait ${formatPoints(total)} points sur AgglOguessr !`
        })
      } else {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'agglOguessr-score.png'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        setTimeout(() => URL.revokeObjectURL(url), 2000)
        setShareMsg('Image enregistrée dans vos téléchargements.')
      }
    } catch (e: any) {
      if (e?.name !== 'AbortError') setShareMsg('Impossible de créer l’image de score.')
    } finally {
      setSharing(false)
    }
  }

  // ---------------------------------------------------------------
  // Interface
  // ---------------------------------------------------------------
  const round = rounds[index]
  const last = results[results.length - 1]
  const showBigPhoto = photoOpen && (phase === 'playing' || phase === 'result') && !!round
  const showThumb = !photoOpen && (phase === 'playing' || phase === 'result') && !!round

  const ui = (
    <div className="ag-root" css={styles}>
      {phase === 'loading' && <div className="ag-toast">Chargement d’AgglOguessr…</div>}

      {phase === 'error' && <div className="ag-toast ag-toast-error">{error}</div>}

      {phase === 'intro' && (
        <div className="ag-backdrop">
          <div className="ag-card">
            <div className="ag-logo">📍</div>
            <h1>AgglOguessr</h1>
            <p>
              {rounds.length} lieux de l’agglomération montargoise à retrouver. Observez la photo, placez votre pari
              sur la carte et gagnez des points selon votre précision.
            </p>
            <button className="ag-btn ag-btn-primary ag-btn-block" disabled={!mapReady} onClick={() => startRound(0)}>
              {mapMissing ? 'Carte non configurée' : mapReady ? 'Jouer' : 'Chargement de la carte…'}
            </button>
          </div>
        </div>
      )}

      {(phase === 'playing' || phase === 'result') && (
        <div className="ag-header">
          Manche {index + 1}/{rounds.length} · {formatPoints(total)} pts
        </div>
      )}

      {showBigPhoto && (
        <div className="ag-backdrop" onClick={() => setPhotoOpen(false)}>
          <div className="ag-photo-card">
            <img src={round.photoUrl} alt="Où cette photo a-t-elle été prise ?" decoding="async" />
            <div className="ag-photo-hint">Touchez pour afficher la carte</div>
          </div>
        </div>
      )}

      {showThumb && (
        <button className="ag-thumb" onClick={() => setPhotoOpen(true)} aria-label="Agrandir la photo">
          <img src={round.thumbUrl} alt="Photo à retrouver" decoding="async" />
          <span>🔍 Agrandir</span>
        </button>
      )}

      {phase === 'playing' && !photoOpen && (
        <div className="ag-bar">
          <div className={'ag-bar-hint' + (notice ? ' ag-bar-notice' : '')}>
            {notice || (hasGuess ? 'Vous pouvez déplacer votre pari.' : 'Touchez la carte pour placer votre pari.')}
          </div>
          <button className="ag-btn ag-btn-primary" disabled={!hasGuess} onClick={validate}>
            Deviner
          </button>
        </div>
      )}

      {phase === 'result' && !photoOpen && last && round && (
        <div className="ag-result">
          <div className="ag-result-main">
            <span className="ag-dist">{formatDistance(last.distance)}</span>
            <span className="ag-pts">+{formatPoints(last.score)} pts</span>
          </div>
          {round.name && <div className="ag-place">C’était : <strong>{round.name}</strong></div>}
          {round.anecdote && <div className="ag-anec">{round.anecdote}</div>}
          <div className="ag-legend">
            <span className="ag-dot ag-dot-guess" />Votre pari
            <span className="ag-dot ag-dot-truth" />Le vrai lieu
          </div>
          <button className="ag-btn ag-btn-primary ag-btn-block" onClick={next}>
            {index + 1 >= rounds.length ? 'Voir mon score' : 'Manche suivante'}
          </button>
        </div>
      )}

      {phase === 'final' && (
        <div className="ag-backdrop">
          <div className="ag-card">
            <div className="ag-logo">🎉</div>
            <h1>Bravo !</h1>
            <p>{finalMessage(total, maxTotal)}</p>
            <div className="ag-score">
              {formatPoints(total)} <small>/ {formatPoints(maxTotal)}</small>
            </div>
            <ul className="ag-recap">
              {results.map((r, i) => (
                <li key={i}>
                  <span>Manche {i + 1}</span>
                  <span>{formatDistance(r.distance)}</span>
                  <span>{formatPoints(r.score)} pts</span>
                </li>
              ))}
            </ul>
            <div className="ag-actions">
              <button className="ag-btn ag-btn-primary" disabled={sharing} onClick={share}>
                {sharing ? 'Création de l’image…' : 'Partager mon score'}
              </button>
              <button className="ag-btn ag-btn-secondary" onClick={replay}>
                Rejouer
              </button>
            </div>
            {shareMsg && <p className="ag-share-msg">{shareMsg}</p>}
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="jimu-widget widget-agglo-guessr" style={{ width: '100%', height: '100%' }}>
      {!mapMissing && (
        <JimuMapViewComponent
          useMapWidgetId={props.useMapWidgetIds?.[0]}
          onActiveViewChange={onActiveViewChange}
        />
      )}

      {inBuilder
        ? (
          <div style={{ padding: 12, background: '#0f6b5c', color: '#fff', borderRadius: 8, fontSize: 13, lineHeight: 1.5 }}>
            <strong>AgglOguessr</strong><br />
            {mapMissing ? '⚠ Choisissez une carte dans les paramètres.' : '✓ Carte liée'}<br />
            {phase === 'error'
              ? '⚠ ' + error
              : phase === 'loading' ? 'Chargement des données…' : `✓ ${rounds.length} manche(s) chargée(s)`}<br />
            <em>Le jeu s’affiche en mode Aperçu ou une fois publié.</em>
          </div>
          )
        : ReactDOM.createPortal(ui, document.body)}
    </div>
  )
}

export default Widget
