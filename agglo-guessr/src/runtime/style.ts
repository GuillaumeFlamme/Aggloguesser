// FICHIER DE STYLE : tailles, positions, formes et espacements.
// Les COULEURS ne se changent pas ici mais dans theme.ts. Les textes sont dans textes.ts.
// Chaque règle commence par un sélecteur (.ag-quelquechose) qui correspond à un élément du jeu.

import { css } from 'jimu-core' // outil d'Experience Builder pour écrire du CSS dans le code
import { COLORS, FONT_FAMILY } from './theme' // couleurs et police

export const styles = css`
  /* Conteneur général : couvre toute la fenêtre mais laisse passer les clics vers la carte */
  .ag-root {
    position: fixed; /* reste fixe par rapport à la fenêtre du navigateur */
    top: 0; /* collé en haut */
    right: 0; /* collé à droite */
    bottom: 0; /* collé en bas */
    left: 0; /* collé à gauche */
    z-index: 2000; /* passe au-dessus de la carte et des autres widgets */
    pointer-events: none; /* les clics traversent le conteneur (important pour pouvoir cliquer sur la carte) */
    font-family: ${FONT_FAMILY}; /* police de caractères */
    color: ${COLORS.ink}; /* couleur du texte par défaut */
  }
  .ag-root * {
    box-sizing: border-box; /* la largeur d'un élément inclut ses marges intérieures et sa bordure */
  }

  /* Éléments réellement cliquables : on réactive les clics uniquement sur eux */
  .ag-backdrop,
  .ag-header,
  .ag-thumb,
  .ag-bar,
  .ag-result,
  .ag-toast {
    pointer-events: auto; /* ces éléments reçoivent les clics */
  }

  /* Voile sombre plein écran (photo en grand, accueil, écran final) */
  .ag-backdrop {
    position: absolute; /* positionné dans le conteneur général */
    top: 0; /* collé en haut */
    right: 0; /* collé à droite */
    bottom: 0; /* collé en bas */
    left: 0; /* collé à gauche */
    background: ${COLORS.overlay}; /* couleur du voile (voir theme.ts) */
    display: flex; /* disposition souple pour centrer le contenu */
    align-items: center; /* centre verticalement */
    justify-content: center; /* centre horizontalement */
    padding: 16px; /* marge intérieure pour ne pas coller aux bords */
  }

  /* Fenêtre blanche centrale (accueil et écran final) */
  .ag-card {
    background: ${COLORS.white}; /* fond blanc */
    border-radius: 22px; /* arrondi des coins */
    padding: 28px 26px; /* marge intérieure : 28 en haut et en bas, 26 sur les côtés */
    width: min(460px, 100%); /* largeur de 460 pixels au maximum */
    max-height: 100%; /* ne dépasse jamais la hauteur de l'écran */
    overflow-y: auto; /* défilement vertical si le contenu est trop long */
    text-align: center; /* texte centré */
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.35); /* ombre portée */
  }
  .ag-card h1 {
    margin: 0 0 12px; /* espace sous le titre */
    font-size: 30px; /* taille du titre */
    line-height: 1.1; /* hauteur de ligne du titre */
    color: ${COLORS.dark}; /* couleur du titre */
  }
  .ag-card p {
    margin: 0 0 18px; /* espace sous le paragraphe */
    font-size: 16px; /* taille du texte */
    line-height: 1.45; /* hauteur de ligne */
    color: ${COLORS.muted}; /* couleur du texte secondaire */
  }

  /* Boutons */
  .ag-btn {
    appearance: none; /* supprime l'apparence par défaut du navigateur */
    border: 0; /* pas de bordure */
    border-radius: 14px; /* arrondi des coins */
    min-height: 50px; /* hauteur minimale (assez grand pour un doigt) */
    padding: 0 22px; /* marge intérieure sur les côtés */
    font-size: 17px; /* taille du texte */
    font-weight: 700; /* texte gras */
    cursor: pointer; /* curseur en forme de main */
    transition: transform 0.08s ease, opacity 0.15s ease; /* petites animations */
  }
  .ag-btn:active:not(:disabled) {
    transform: scale(0.97); /* léger rétrécissement au clic */
  }
  .ag-btn:disabled {
    opacity: 0.45; /* bouton grisé quand il est inactif */
    cursor: not-allowed; /* curseur d'interdiction */
  }
  .ag-btn-primary {
    background: ${COLORS.main}; /* fond du bouton principal */
    color: ${COLORS.white}; /* texte du bouton principal */
  }
  .ag-btn-secondary {
    background: ${COLORS.soft}; /* fond du bouton secondaire */
    color: ${COLORS.dark}; /* texte du bouton secondaire */
  }
  .ag-btn-block {
    width: 100%; /* bouton sur toute la largeur */
  }

  /* Bandeau du haut : numéro de manche et score */
  .ag-header {
    position: absolute; /* positionné dans le conteneur général */
    top: 12px; /* distance du haut */
    left: 50%; /* démarre au milieu de l'écran */
    transform: translateX(-50%); /* recentre le bandeau sur son milieu */
    background: ${COLORS.white}; /* fond blanc */
    border-radius: 999px; /* forme en pilule */
    padding: 8px 18px; /* marge intérieure */
    font-size: 15px; /* taille du texte */
    font-weight: 700; /* texte gras */
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25); /* ombre portée */
    white-space: nowrap; /* pas de retour à la ligne */
  }
  .ag-header span + span {
    margin-left: 14px; /* espace entre le numéro de manche et le score */
    color: ${COLORS.main}; /* couleur du score */
  }

  /* Photo en grand */
  .ag-photo-card {
    background: ${COLORS.white}; /* cadre blanc autour de la photo */
    border-radius: 20px; /* arrondi des coins du cadre */
    padding: 10px; /* épaisseur du cadre blanc */
    max-width: min(980px, 96vw); /* largeur maximale du cadre */
    cursor: pointer; /* curseur en forme de main */
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.45); /* ombre portée */
  }
  .ag-photo-card img {
    display: block; /* l'image se comporte comme un bloc */
    max-width: 100%; /* ne dépasse pas la largeur du cadre */
    max-height: 70vh; /* hauteur maximale : 70 pour cent de l'écran */
    border-radius: 12px; /* arrondi des coins de la photo */
    margin: 0 auto; /* centrée horizontalement */
  }
  .ag-photo-hint {
    text-align: center; /* texte centré */
    padding: 10px 6px 4px; /* marge intérieure */
    font-weight: 700; /* texte gras */
    font-size: 15px; /* taille du texte */
    color: ${COLORS.main}; /* couleur du texte */
  }

  /* Vignette dans le coin */
  .ag-thumb {
    position: absolute; /* positionnée dans le conteneur général */
    top: 64px; /* distance du haut (sous le bandeau) */
    right: 12px; /* distance du bord droit */
    width: 220px; /* largeur de la vignette */
    padding: 4px; /* épaisseur du cadre blanc */
    border: 0; /* pas de bordure */
    border-radius: 14px; /* arrondi des coins */
    background: ${COLORS.white}; /* fond blanc */
    cursor: pointer; /* curseur en forme de main */
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35); /* ombre portée */
  }
  .ag-thumb img {
    display: block; /* l'image se comporte comme un bloc */
    width: 100%; /* sur toute la largeur de la vignette */
    height: 150px; /* hauteur de l'image */
    object-fit: cover; /* l'image remplit l'espace en étant rognée si besoin */
    border-radius: 10px; /* arrondi des coins */
  }
  .ag-thumb span {
    display: block; /* libellé sur sa propre ligne */
    padding: 4px 0 2px; /* marge intérieure */
    font-size: 12px; /* taille du texte */
    font-weight: 700; /* texte gras */
    color: ${COLORS.dark}; /* couleur du texte */
  }

  /* Barre du bas pendant le pari, et carte de résultat */
  .ag-bar,
  .ag-result {
    position: absolute; /* positionnée dans le conteneur général */
    left: 50%; /* démarre au milieu de l'écran */
    bottom: 18px; /* distance du bas */
    transform: translateX(-50%); /* recentre sur son milieu */
    width: min(540px, calc(100% - 24px)); /* largeur de 540 pixels au maximum */
    background: ${COLORS.white}; /* fond blanc */
    border-radius: 18px; /* arrondi des coins */
    padding: 14px 16px; /* marge intérieure */
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35); /* ombre portée */
  }
  .ag-bar {
    display: flex; /* texte d'aide et bouton côte à côte */
    align-items: center; /* alignés verticalement au centre */
    gap: 14px; /* espace entre le texte et le bouton */
  }
  .ag-bar-hint {
    flex: 1; /* le texte prend toute la place restante */
    font-size: 14px; /* taille du texte */
    color: ${COLORS.muted}; /* couleur du texte */
    line-height: 1.3; /* hauteur de ligne */
  }
  .ag-bar-notice {
    color: ${COLORS.danger}; /* texte rouge pour un message d'erreur */
    font-weight: 600; /* texte semi-gras */
  }

  /* Contenu de la carte de résultat */
  .ag-result {
    text-align: center; /* texte centré */
  }
  .ag-result-main {
    display: flex; /* distance et points côte à côte */
    align-items: baseline; /* alignés sur la ligne de texte */
    justify-content: center; /* centrés horizontalement */
    gap: 14px; /* espace entre distance et points */
    margin-bottom: 6px; /* espace dessous */
  }
  .ag-dist {
    font-size: 34px; /* taille de la distance */
    font-weight: 800; /* texte très gras */
  }
  .ag-pts {
    font-size: 20px; /* taille des points gagnés */
    font-weight: 800; /* texte très gras */
    color: ${COLORS.main}; /* couleur des points gagnés */
  }
  .ag-place {
    font-size: 16px; /* taille du nom du lieu */
    margin-bottom: 4px; /* espace dessous */
  }
  .ag-anec {
    font-size: 14px; /* taille de l'anecdote */
    color: ${COLORS.muted}; /* couleur de l'anecdote */
    line-height: 1.4; /* hauteur de ligne */
    margin-bottom: 6px; /* espace dessous */
  }
  .ag-legend {
    font-size: 12px; /* taille de la légende */
    color: ${COLORS.mutedLight}; /* couleur de la légende */
    margin: 4px 0 10px; /* espace dessus et dessous */
  }
  .ag-legend-guess {
    color: ${COLORS.guess}; /* couleur du mot "Votre pari" (même que le marqueur) */
    font-weight: 700; /* texte gras */
    margin-right: 14px; /* espace avant le mot suivant */
  }
  .ag-legend-truth {
    color: ${COLORS.truth}; /* couleur du mot "Le vrai lieu" (même que le marqueur) */
    font-weight: 700; /* texte gras */
  }

  /* Messages de chargement ou d'erreur */
  .ag-toast {
    position: absolute; /* positionné dans le conteneur général */
    left: 50%; /* démarre au milieu de l'écran */
    bottom: 24px; /* distance du bas */
    transform: translateX(-50%); /* recentre sur son milieu */
    background: ${COLORS.white}; /* fond blanc */
    border-radius: 14px; /* arrondi des coins */
    padding: 12px 18px; /* marge intérieure */
    font-weight: 600; /* texte semi-gras */
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.3); /* ombre portée */
    max-width: calc(100% - 24px); /* ne dépasse pas la largeur de l'écran */
    text-align: center; /* texte centré */
  }
  .ag-toast-error {
    background: ${COLORS.dangerBg}; /* fond rose pour une erreur */
    color: ${COLORS.danger}; /* texte rouge pour une erreur */
  }

  /* Écran final */
  .ag-score {
    font-size: 64px; /* taille du score total */
    font-weight: 800; /* texte très gras */
    color: ${COLORS.main}; /* couleur du score total */
    line-height: 1; /* hauteur de ligne serrée */
    margin: 6px 0 14px; /* espace dessus et dessous */
  }
  .ag-score small {
    font-size: 20px; /* taille du "sur 25 000" */
    font-weight: 600; /* texte semi-gras */
    color: ${COLORS.mutedLight}; /* couleur du "sur 25 000" */
  }
  .ag-recap {
    list-style: none; /* pas de puces */
    margin: 0 0 18px; /* espace dessous */
    padding: 0; /* pas de marge intérieure */
    text-align: left; /* texte aligné à gauche */
  }
  .ag-recap li {
    display: flex; /* manche, distance et points sur une ligne */
    justify-content: space-between; /* répartis sur la largeur */
    gap: 10px; /* espace entre les trois informations */
    padding: 8px 12px; /* marge intérieure de la ligne */
    border-radius: 10px; /* arrondi des coins */
    font-size: 15px; /* taille du texte */
  }
  .ag-recap li:nth-of-type(odd) {
    background: ${COLORS.softRow}; /* fond coloré une ligne sur deux */
  }
  .ag-recap li span:last-of-type {
    font-weight: 700; /* points en gras */
    color: ${COLORS.main}; /* couleur des points */
  }
  .ag-actions {
    display: flex; /* boutons les uns sous les autres */
    flex-direction: column; /* disposition en colonne */
    gap: 10px; /* espace entre les boutons */
  }
  .ag-share-msg {
    margin: 12px 0 0 !important; /* espace au-dessus du message de partage */
    font-size: 13px !important; /* taille du message de partage */
  }

  /* Adaptation aux écrans étroits (téléphone) : largeur de 640 pixels au maximum */
  @media (max-width: 640px) {
    .ag-header {
      top: 8px; /* bandeau plus près du haut */
      font-size: 14px; /* texte du bandeau plus petit */
      padding: 7px 14px; /* marge intérieure réduite */
    }
    .ag-thumb {
      top: 54px; /* vignette plus près du haut */
      right: 8px; /* vignette plus près du bord */
      width: 116px; /* vignette plus petite */
    }
    .ag-thumb img {
      height: 84px; /* image de la vignette plus petite */
    }
    .ag-thumb span {
      font-size: 11px; /* libellé de la vignette plus petit */
    }
    .ag-bar,
    .ag-result {
      bottom: 0; /* panneau collé au bas de l'écran */
      width: 100%; /* sur toute la largeur */
      border-radius: 20px 20px 0 0; /* seuls les coins du haut sont arrondis */
      padding: 14px 16px calc(14px + env(safe-area-inset-bottom)); /* marge du bas tenant compte de la barre du téléphone */
    }
    .ag-bar .ag-btn {
      min-width: 128px; /* le bouton Deviner reste assez large */
    }
    .ag-dist {
      font-size: 30px; /* distance un peu plus petite */
    }
    .ag-photo-card img {
      max-height: 62vh; /* photo un peu moins haute */
    }
    .ag-card {
      padding: 22px 18px; /* marge intérieure réduite */
    }
    .ag-score {
      font-size: 54px; /* score un peu plus petit */
    }
  }
`
