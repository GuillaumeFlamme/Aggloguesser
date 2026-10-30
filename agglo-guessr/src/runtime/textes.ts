// FICHIER DES TEXTES
// Tous les textes visibles par le joueur sont ici : modifiez-les librement.
// Les textes entre accents graves (`...`) contiennent des valeurs variables écrites ${nom}, ne les supprimez pas.

// Objet qui regroupe tous les textes du jeu.
export const TEXTS = {
  title: 'DevineAgglo', // titre du jeu (écran d'accueil)
  loading: 'Chargement de DevineAgglo en cours', // message affiché pendant le chargement des photos et des points
  introText: (count: number): string => // texte de l'écran d'accueil, count est le nombre de manches
    `${count} lieux de l’agglomération montargoise à retrouver. Observez la photo, placez votre point sur la carte et gagnez des points selon votre précision.`,
  playButton: 'Jouer', // bouton de l'écran d'accueil
  mapNotConfigured: 'Carte non configurée', // bouton d'accueil quand aucune carte n'est choisie dans les réglages
  mapLoading: 'Chargement de la carte en cours', // bouton d'accueil tant que la carte n'est pas prête
  roundLabel: (index: number, count: number): string => `Manche ${index} sur ${count}`, // en-tête : numéro de la manche
  scoreLabel: (points: string): string => `Score : ${points} pts`, // en-tête : score cumulé
  photoAlt: 'Où cette photo a-t-elle été prise ?', // texte alternatif de la photo en grand (lecteurs d'écran)
  photoHint: 'Touchez pour afficher la carte', // invitation sous la photo en grand
  thumbAlt: 'Photo à retrouver', // texte alternatif de la vignette
  thumbLabel: 'Agrandir', // libellé sous la vignette
  thumbAria: 'Agrandir la photo', // description du bouton vignette (lecteurs d'écran)
  hintNoGuess: 'Touchez la carte pour placer votre point.', // aide quand aucun pari n'est posé
  hintGuess: 'Vous pouvez déplacer votre point.', // aide quand un pari est posé
  guessButton: 'Deviner', // bouton de validation du pari
  placeWas: 'C’était :', // texte devant le nom du lieu à la révélation
  legendGuess: 'Votre point', // légende du marqueur du joueur
  legendTruth: 'Le vrai lieu', // légende du marqueur du vrai lieu
  pointsSuffix: 'pts', // abréviation de "points"
  nextRound: 'Manche suivante', // bouton pour passer à la manche suivante
  seeScore: 'Voir mon score', // bouton après la dernière manche
  finalTitle: 'Bravo !', // titre de l'écran final
  shareButton: 'Partager mon score', // bouton de partage
  shareBusy: 'Création de l’image en cours', // texte du bouton de partage pendant la création de l'image
  replayButton: 'Rejouer', // bouton pour recommencer une partie
  shareSaved: 'Image enregistrée dans vos téléchargements.', // message après un téléchargement sur ordinateur
  shareFailed: 'Impossible de créer l’image de score.', // message si la création de l'image échoue
  shareText: (points: string): string => `J’ai fait ${points} points sur devineAgglo !`, // texte joint au partage sur mobile
  roundRecap: (index: number): string => `Manche ${index}`, // libellé d'une ligne du récapitulatif
  outOf: (max: string): string => `sur ${max} points`, // "sur 25 000 points" dans l'image de score
  myScore: 'Mon score', // titre du score dans l'image de score
  cardSubtitle: 'Agglomération montargoise', // sous-titre de l'image de score
  finalMessages: {
    great: 'Impressionnant', // score de 80 pour cent ou plus
    good: 'Beau parcours', // score de 50 à 79 pour cent
    ok: 'Pas mal du tout', // score de 25 à 49 pour cent
    low: 'Merci d’avoir joué' // score de moins de 25 pour cent
  },
  errors: {
    needLayerUrl: 'Renseignez l’URL de la couche dans les paramètres du widget.', // aucune URL de couche dans les réglages
    modules: 'Impossible de charger les modules ArcGIS (version de l’API incompatible ?).', // échec du chargement des modules
    layerTimeout: 'La couche ne répond pas : vérifiez l’URL et le partage de la couche.', // la couche ne se charge pas
    queryTimeout: 'La couche ne renvoie pas ses points : vérifiez son partage.', // la requête des points ne répond pas
    noRounds: 'Aucune manche trouvée : vérifiez que la couche contient des points avec une photo jointe.', // aucun point exploitable
    badProjection: 'Système de coordonnées de la carte non pris en charge (utilisez une carte en Web Mercator ou WGS84).', // carte dans un autre système
    computeFailed: 'Calcul impossible : ' // début du message si le calcul de distance échoue
  },
  builder: {
    title: 'DevineAgglo', // titre de l'encart de diagnostic dans le builder
    mapLinked: 'Carte liée', // la carte est choisie
    mapNotLinked: 'Choisissez une carte dans les paramètres.', // aucune carte choisie
    loading: 'Chargement des données en cours', // les points se chargent
    roundsLoaded: (count: number): string => `Manches chargées : ${count}`, // nombre de manches chargées
    previewHint: 'Le jeu s’affiche en mode Aperçu ou une fois publié.' // rappel pour tester le jeu
  }
}
