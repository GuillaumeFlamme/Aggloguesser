// FICHIER DES COULEURS ET DE LA POLICE
// Pour changer l'apparence du jeu, modifiez uniquement les valeurs de ce fichier.
// Format des couleurs : #rrggbb (exemple #0f6b5c) ou rgba(rouge, vert, bleu, opacité de 0 à 1).

// Palette de couleurs utilisée partout : interface, marqueurs de la carte et image de score partagée.
export const COLORS = {
  main: '#346fa5', // couleur principale : boutons "Jouer" et "Deviner", score, points gagnés, encart du builder
  dark: '#0f4c5c', // bleu-vert foncé : titres, textes de la vignette, début du dégradé de l'image de score
  ink: '#12303a', // couleur du texte principal
  muted: '#36525c', // couleur du texte secondaire (descriptions, aides)
  mutedLight: '#5b7680', // couleur du texte discret (petits libellés)
  soft: '#e6f1ee', // fond clair du bouton secondaire "Rejouer"
  softRow: '#f1f7f5', // fond d'une ligne sur deux du récapitulatif des manches
  white: '#ffffff', // blanc : fond des fenêtres et texte sur fond coloré
  gold: '#ffd166', // doré : score et points sur l'image de score partagée
  gradientEnd: '#1b8a6b', // fin du dégradé de fond de l'image de score partagée
  danger: '#b42318', // texte rouge des messages d'erreur
  dangerBg: '#fee4e2', // fond rose des messages d'erreur
  overlay: 'rgba(8, 28, 36, 0.58)', // voile sombre derrière la photo en grand et les écrans d'accueil et de fin
  guess: '#2563eb', // couleur du marqueur du pari du joueur (bleu) et du mot "Votre pari"
  truth: '#16a34a', // couleur du marqueur du vrai lieu (vert) et du mot "Le vrai lieu"
  line: '#1e293b' // couleur de la ligne en pointillés entre le pari et le vrai lieu
}

// Police de caractères de tout le widget (liste de polices, la première disponible est utilisée).
export const FONT_FAMILY = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'
