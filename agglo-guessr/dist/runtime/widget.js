System.register(["jimu-core","jimu-arcgis"],(function(e,t){var a={},n={};return{setters:[function(e){a.React=e.React,a.ReactDOM=e.ReactDOM,a.css=e.css,a.jsx=e.jsx},function(e){n.JimuMapViewComponent=e.JimuMapViewComponent,n.loadArcGISJSAPIModules=e.loadArcGISJSAPIModules}],execute:function(){e((()=>{var e={826:e=>{"use strict";e.exports=n},891:e=>{"use strict";e.exports=a}},t={};function r(a){var n=t[a];if(void 0!==n)return n.exports;var o=t[a]={exports:{}};return e[a](o,o.exports,r),o.exports}r.d=(e,t)=>{for(var a in t)r.o(t,a)&&!r.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.p="";var o={};return r.p=window.jimuConfig.baseUrl,(()=>{"use strict";r.r(o),r.d(o,{__set_webpack_public_path__:()=>q,default:()=>O});var e=r(891),t=r(826);const a="#346fa5",n="#014380",i="#36525c",s="#5b7680",l="#ffffff",u="#ffd166",d="#b42318",c="#2563eb",p="#16a34a",g="calibri",m=e.css`
  /* Conteneur général : couvre toute la fenêtre mais laisse passer les clics vers la carte */
  .ag-root {
    position: fixed; /* reste fixe par rapport à la fenêtre du navigateur */
    top: 0; /* collé en haut */
    right: 0; /* collé à droite */
    bottom: 0; /* collé en bas */
    left: 0; /* collé à gauche */
    z-index: 2000; /* passe au-dessus de la carte et des autres widgets */
    pointer-events: none; /* les clics traversent le conteneur (important pour pouvoir cliquer sur la carte) */
    font-family: ${g}; /* police de caractères */
    color: ${"#12303a"}; /* couleur du texte par défaut */
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
    background: ${"rgba(8, 28, 36, 0.58)"}; /* couleur du voile (voir theme.ts) */
    display: flex; /* disposition souple pour centrer le contenu */
    align-items: center; /* centre verticalement */
    justify-content: center; /* centre horizontalement */
    padding: 16px; /* marge intérieure pour ne pas coller aux bords */
  }

  /* Fenêtre blanche centrale (accueil et écran final) */
  .ag-card {
    background: ${l}; /* fond blanc */
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
    color: ${n}; /* couleur du titre */
  }
  /* Image de la fenêtre d'accueil (choisie dans les réglages du widget) */
  .ag-card-img {
    display: block; /* l'image se comporte comme un bloc */
    max-width: 100%; /* ne dépasse pas la largeur de la fenêtre */
    max-height: 170px; /* hauteur maximale de l'image */
    width: auto; /* largeur proportionnelle */
    margin: 0 auto 16px; /* centrée, avec de l'espace dessous */
    object-fit: contain; /* l'image entière reste visible, sans être rognée */
    border-radius: 12px; /* arrondi des coins */
  }
  .ag-card p {
    margin: 0 0 18px; /* espace sous le paragraphe */
    font-size: 16px; /* taille du texte */
    line-height: 1.45; /* hauteur de ligne */
    color: ${i}; /* couleur du texte secondaire */
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
    background: ${a}; /* fond du bouton principal */
    color: ${l}; /* texte du bouton principal */
  }
  .ag-btn-secondary {
    background: ${"#e6f1ee"}; /* fond du bouton secondaire */
    color: ${n}; /* texte du bouton secondaire */
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
    background: ${l}; /* fond blanc */
    border-radius: 999px; /* forme en pilule */
    padding: 8px 18px; /* marge intérieure */
    font-size: 15px; /* taille du texte */
    font-weight: 700; /* texte gras */
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25); /* ombre portée */
    white-space: nowrap; /* pas de retour à la ligne */
  }
  .ag-header span + span {
    margin-left: 14px; /* espace entre le numéro de manche et le score */
    color: ${a}; /* couleur du score */
  }

  /* Chronomètre rond sous le bandeau : anneau blanc qui se remplit de bleu, temps restant au centre */
  .ag-timer {
    position: absolute; /* positionné dans le conteneur général */
    top: 60px; /* sous le bandeau du haut */
    left: 50%; /* démarre au milieu de l'écran */
    transform: translateX(-50%); /* recentre sur son milieu */
    width: 112px; /* diamètre du chronomètre */
    height: 112px; /* diamètre du chronomètre */
    border-radius: 50%; /* forme ronde */
    background: ${"rgba(1, 40, 80, 0.88)"}; /* fond bleu nuit */
    box-shadow: 0 6px 22px rgba(0, 0, 0, 0.4); /* ombre portée */
    display: flex; /* centre le temps dans le rond */
    align-items: center; /* centré verticalement */
    justify-content: center; /* centré horizontalement */
    pointer-events: none; /* les clics traversent pour atteindre la carte */
    z-index: 5; /* au-dessus du voile de la photo en grand */
  }
  .ag-timer svg {
    position: absolute; /* superposé au fond */
    top: 0; /* collé en haut */
    left: 0; /* collé à gauche */
    width: 100%; /* toute la largeur du rond */
    height: 100%; /* toute la hauteur du rond */
    transform: rotate(-90deg); /* l'anneau démarre en haut */
  }
  .ag-timer circle {
    fill: none; /* anneau sans remplissage */
    stroke-width: 9; /* épaisseur de l'anneau */
  }
  .ag-timer-track {
    stroke: ${l}; /* anneau blanc */
  }
  .ag-timer-fill {
    stroke: ${"#3b9cff"}; /* partie bleue qui avance */
    stroke-linecap: round; /* extrémité arrondie */
    stroke-dasharray: 100; /* anneau complet = 100 (voir pathLength) */
    stroke-dashoffset: 100; /* au départ : rien de bleu */
    animation-name: ag-timer-fill; /* animation de remplissage */
    animation-timing-function: linear; /* vitesse constante */
    animation-fill-mode: forwards; /* reste rempli à la fin */
  }
  .ag-timer-fill.ag-timer-manual {
    animation: none; /* l'avancement est piloté par le jeu (manche bonus) */
    transition: stroke-dashoffset 0.12s linear; /* mouvement fluide entre deux mises à jour */
  }
  @keyframes ag-timer-fill {
    from { stroke-dashoffset: 100; } /* rien de bleu */
    to { stroke-dashoffset: 0; } /* tout l'anneau est bleu */
  }
  .ag-timer span {
    position: relative; /* au-dessus de l'anneau */
    color: ${l}; /* temps en blanc */
    font-size: 38px; /* taille du temps */
    font-weight: 800; /* texte très gras */
    font-variant-numeric: tabular-nums; /* chiffres de largeur fixe */
  }
  .ag-timer-low .ag-timer-fill {
    stroke: #ff5a4d; /* anneau rouge dans les dix dernières secondes */
  }
  .ag-timer-low span {
    color: #ff8a80; /* temps rouge clair dans les dix dernières secondes */
    animation: ag-pulse 1s ease-in-out infinite; /* léger clignotement */
  }
  @keyframes ag-pulse {
    0%, 100% { opacity: 1; } /* pleinement visible */
    50% { opacity: 0.45; } /* à moitié transparent */
  }


  /* Manche bonus : pastille du bonus encore possible, sous le chronomètre */
  .ag-bonus-pill {
    position: absolute; /* positionnée dans le conteneur général */
    top: 180px; /* sous le chronomètre rond */
    left: 50%; /* démarre au milieu de l'écran */
    transform: translateX(-50%); /* recentre sur son milieu */
    background: ${u}; /* fond doré */
    color: ${n}; /* texte bleu foncé */
    font-size: 14px; /* taille du texte */
    font-weight: 800; /* texte très gras */
    padding: 5px 14px; /* marge intérieure */
    border-radius: 999px; /* forme en pilule */
    white-space: nowrap; /* pas de retour à la ligne */
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3); /* ombre portée */
    pointer-events: none; /* les clics traversent */
    z-index: 5; /* au-dessus du voile de la photo en grand */
  }

  /* Manche bonus : photo floue (le flou est réglé par le jeu) */
  .ag-photo-wrap {
    overflow: hidden; /* coupe les bords de la photo agrandie pour cacher les contours du flou */
    border-radius: 12px; /* arrondi des coins */
  }
  .ag-photo-bonus {
    animation: ag-photo-appear 0.7s ease-out both; /* la photo floue apparaît en douceur */
  }
  @keyframes ag-photo-appear {
    from { opacity: 0; transform: scale(0.9); } /* petite et invisible */
    to { opacity: 1; transform: scale(1); } /* taille normale */
  }

  /* Manche bonus : vignette masquée (la photo disparaît pour ne pas tricher) */
  .ag-thumb-mask {
    height: 150px; /* même hauteur que la vignette normale */
    border-radius: 10px; /* arrondi des coins */
    background: linear-gradient(135deg, ${n}, ${a}); /* fond bleu à la place de la photo */
    color: ${l}; /* point d'interrogation blanc */
    font-size: 64px; /* grand point d'interrogation */
    font-weight: 800; /* très gras */
    display: flex; /* centre le point d'interrogation */
    align-items: center; /* centré verticalement */
    justify-content: center; /* centré horizontalement */
  }

  /* Manche bonus : ligne du bonus gagné dans la carte de résultat */
  .ag-bonus-result {
    display: inline-block; /* pastille de la largeur de son texte */
    background: ${u}; /* fond doré */
    color: ${n}; /* texte bleu foncé */
    font-weight: 800; /* texte très gras */
    font-size: 15px; /* taille du texte */
    padding: 4px 14px; /* marge intérieure */
    border-radius: 999px; /* forme en pilule */
    margin-bottom: 8px; /* espace dessous */
  }

  /* Manche bonus : fenêtre d'annonce animée */
  .ag-bonus-modal {
    position: relative; /* permet de placer les rayons derrière le contenu */
    overflow: hidden; /* coupe les rayons aux bords de la fenêtre */
    width: min(420px, 100%); /* largeur de 420 pixels au maximum */
    padding: 34px 26px 26px; /* marge intérieure */
    border-radius: 26px; /* arrondi des coins */
    background: linear-gradient(160deg, ${"#7a3fd1"}, ${"#014380"}); /* dégradé violet vers bleu foncé */
    color: ${l}; /* texte blanc */
    text-align: center; /* texte centré */
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5); /* ombre portée */
    animation: ag-bonus-pop 0.6s cubic-bezier(0.2, 1.4, 0.4, 1) both; /* la fenêtre jaillit */
  }
  .ag-bonus-modal > * {
    position: relative; /* le contenu passe devant les rayons */
  }
  .ag-bonus-rays {
    position: absolute !important; /* les rayons restent derrière le contenu */
    top: -60%; /* débordent largement de la fenêtre */
    right: -60%;
    bottom: -60%;
    left: -60%;
    background: repeating-conic-gradient(rgba(255, 209, 102, 0.22) 0deg 10deg, transparent 10deg 20deg); /* rayons dorés */
    animation: ag-bonus-spin 16s linear infinite; /* rotation lente */
  }
  .ag-bonus-star {
    font-size: 76px; /* grande étoile */
    line-height: 1; /* hauteur de ligne serrée */
    color: ${u}; /* étoile dorée */
    text-shadow: 0 0 24px rgba(255, 209, 102, 0.85); /* halo doré */
    animation: ag-bonus-beat 1.2s ease-in-out infinite; /* l'étoile bat comme un coeur */
  }
  .ag-bonus-modal h2 {
    margin: 6px 0 12px; /* espaces autour du titre */
    font-size: 36px; /* taille du titre */
    font-weight: 900; /* texte très gras */
    letter-spacing: 2px; /* lettres espacées */
    color: ${u}; /* titre doré */
    animation: ag-bonus-title 0.9s ease-out both; /* le titre se resserre en arrivant */
  }
  .ag-bonus-modal p {
    margin: 0 0 22px; /* espace dessous */
    font-size: 16px; /* taille du texte */
    line-height: 1.45; /* hauteur de ligne */
    animation: ag-bonus-fade 0.8s ease-out 0.5s both; /* le texte apparaît après le titre */
  }
  .ag-btn-gold {
    background: ${u}; /* fond doré */
    color: ${n}; /* texte bleu foncé */
    animation: ag-bonus-fade 0.8s ease-out 0.8s both; /* le bouton apparaît en dernier */
  }
  @keyframes ag-bonus-pop {
    from { opacity: 0; transform: scale(0.6) rotate(-4deg); } /* petite, inclinée et invisible */
    to { opacity: 1; transform: scale(1) rotate(0); } /* taille normale */
  }
  @keyframes ag-bonus-spin {
    to { transform: rotate(360deg); } /* un tour complet */
  }
  @keyframes ag-bonus-beat {
    0%, 100% { transform: scale(1); } /* taille normale */
    50% { transform: scale(1.18); } /* un peu plus grande */
  }
  @keyframes ag-bonus-title {
    from { opacity: 0; letter-spacing: 14px; } /* lettres très espacées et invisibles */
    to { opacity: 1; letter-spacing: 2px; } /* espacement normal */
  }
  @keyframes ag-bonus-fade {
    from { opacity: 0; transform: translateY(10px); } /* invisible, légèrement plus bas */
    to { opacity: 1; transform: translateY(0); } /* à sa place */
  }

  /* Image du coin haut gauche pendant la partie (choisie dans les réglages du widget) */
  .ag-corner {
    position: absolute; /* positionnée dans le conteneur général */
    top: 12px; /* distance du haut */
    left: 12px; /* distance du bord gauche */
    background: ${l}; /* fond blanc, pour rester lisible sur n'importe quelle carte */
    border-radius: 14px; /* arrondi des coins */
    padding: 6px 8px; /* marge intérieure */
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25); /* ombre portée */
    pointer-events: none; /* les clics traversent l'image pour atteindre la carte */
  }
  .ag-corner img {
    display: block; /* l'image se comporte comme un bloc */
    height: 56px; /* hauteur de l'image */
    max-width: 180px; /* largeur maximale de l'image */
    width: auto; /* largeur proportionnelle */
    object-fit: contain; /* l'image entière reste visible */
  }

  /* Photo en grand */
  .ag-photo-card {
    background: ${l}; /* cadre blanc autour de la photo */
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
    color: ${a}; /* couleur du texte */
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
    background: ${l}; /* fond blanc */
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
    color: ${n}; /* couleur du texte */
  }

  /* Barre du bas pendant le pari, et carte de résultat */
  .ag-bar,
  .ag-result {
    position: absolute; /* positionnée dans le conteneur général */
    left: 50%; /* démarre au milieu de l'écran */
    bottom: 18px; /* distance du bas */
    transform: translateX(-50%); /* recentre sur son milieu */
    width: min(540px, calc(100% - 24px)); /* largeur de 540 pixels au maximum */
    background: ${l}; /* fond blanc */
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
    color: ${i}; /* couleur du texte */
    line-height: 1.3; /* hauteur de ligne */
  }
  .ag-bar-notice {
    color: ${d}; /* texte rouge pour un message d'erreur */
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
  .ag-dist-timeout {
    font-size: 26px; /* "Temps écoulé" un peu plus petit qu'une distance */
    color: ${d}; /* en rouge */
  }
  .ag-pts {
    font-size: 20px; /* taille des points gagnés */
    font-weight: 800; /* texte très gras */
    color: ${a}; /* couleur des points gagnés */
  }
  .ag-place {
    font-size: 16px; /* taille du nom du lieu */
    margin-bottom: 4px; /* espace dessous */
  }
  .ag-anec {
    font-size: 14px; /* taille de l'anecdote */
    color: ${i}; /* couleur de l'anecdote */
    line-height: 1.4; /* hauteur de ligne */
    margin-bottom: 6px; /* espace dessous */
  }
  .ag-legend {
    font-size: 12px; /* taille de la légende */
    color: ${s}; /* couleur de la légende */
    margin: 4px 0 10px; /* espace dessus et dessous */
  }
  .ag-legend-guess {
    color: ${c}; /* couleur du mot "Votre pari" (même que le marqueur) */
    font-weight: 700; /* texte gras */
    margin-right: 14px; /* espace avant le mot suivant */
  }
  .ag-legend-truth {
    color: ${p}; /* couleur du mot "Le vrai lieu" (même que le marqueur) */
    font-weight: 700; /* texte gras */
  }

  /* Messages de chargement ou d'erreur */
  .ag-toast {
    position: absolute; /* positionné dans le conteneur général */
    left: 50%; /* démarre au milieu de l'écran */
    bottom: 24px; /* distance du bas */
    transform: translateX(-50%); /* recentre sur son milieu */
    background: ${l}; /* fond blanc */
    border-radius: 14px; /* arrondi des coins */
    padding: 12px 18px; /* marge intérieure */
    font-weight: 600; /* texte semi-gras */
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.3); /* ombre portée */
    max-width: calc(100% - 24px); /* ne dépasse pas la largeur de l'écran */
    text-align: center; /* texte centré */
  }
  .ag-toast-error {
    background: ${"#fee4e2"}; /* fond rose pour une erreur */
    color: ${d}; /* texte rouge pour une erreur */
  }

  /* Écran final */
  .ag-score {
    font-size: 64px; /* taille du score total */
    font-weight: 800; /* texte très gras */
    color: ${a}; /* couleur du score total */
    line-height: 1; /* hauteur de ligne serrée */
    margin: 6px 0 14px; /* espace dessus et dessous */
  }
  .ag-score small {
    font-size: 20px; /* taille du "sur 25 000" */
    font-weight: 600; /* texte semi-gras */
    color: ${s}; /* couleur du "sur 25 000" */
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
    background: ${"#f1f7f5"}; /* fond coloré une ligne sur deux */
  }
  .ag-recap li span:last-of-type {
    font-weight: 700; /* points en gras */
    color: ${a}; /* couleur des points */
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
      font-size: 13px; /* texte du bandeau plus petit */
      padding: 7px 12px; /* marge intérieure réduite */
      max-width: calc(100% - 16px); /* ne dépasse pas la largeur de l'écran */
    }
    .ag-header span + span {
      margin-left: 10px; /* espaces réduits entre les informations du bandeau */
    }
    .ag-timer {
      top: 50px; /* plus près du bandeau */
      width: 88px; /* chronomètre plus petit sur téléphone */
      height: 88px; /* chronomètre plus petit sur téléphone */
    }
    .ag-timer span {
      font-size: 30px; /* temps plus petit */
    }
    .ag-bonus-pill {
      top: 144px; /* sous le chronomètre plus petit */
      font-size: 12px; /* pastille plus petite */
    }
    .ag-thumb-mask {
      height: 84px; /* même hauteur que la vignette normale sur téléphone */
      font-size: 40px; /* point d'interrogation plus petit */
    }
    .ag-bonus-modal h2 {
      font-size: 28px; /* titre plus petit sur téléphone */
    }
    .ag-corner {
      top: 52px; /* image du coin sous le bandeau (pour ne pas le chevaucher sur un petit écran) */
      left: 8px; /* image du coin plus près du bord */
      padding: 4px 6px; /* marge intérieure réduite */
    }
    .ag-corner img {
      height: 36px; /* image du coin plus petite */
      max-width: 100px; /* largeur maximale réduite */
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
`,x={title:"DevineAgglo",loading:"Chargement de DevineAgglo en cours",introText:"{count} lieux de l’agglomération montargoise à retrouver. Observez la photo, placez votre point sur la carte et gagnez des points selon votre précision.",introTimer:"Vous avez {seconds} secondes par manche.",playButton:"Jouer",mapNotConfigured:"Carte non configurée",mapLoading:"Chargement de la carte en cours",logoAlt:"Logo",roundLabel:"Manche {index} sur {count}",scoreLabel:"Score : {points} pts",photoAlt:"Où cette photo a-t-elle été prise ?",photoHint:"Touchez pour afficher la carte",thumbAlt:"Photo à retrouver",thumbLabel:"Agrandir",thumbAria:"Agrandir la photo",hintNoGuess:"Touchez la carte pour placer votre point.",hintGuess:"Vous pouvez déplacer votre point.",guessButton:"Deviner",introBonus:"Une manche bonus avec une photo floue vous attend à la fin.",bonusLabel:"Manche bonus",bonusModalTitle:"MANCHE BONUS",bonusModalText:"La photo est floue et se défloute peu à peu. Plus vous la trouvez tôt, plus vous gagnez de points bonus !",bonusModalButton:"C’est parti !",bonusNextButton:"Manche bonus",bonusPill:"Bonus jusqu’à +{points}",bonusHintNoGuess:"Défloutage en pause. Touchez la carte pour placer votre point.",bonusThumbLabel:"Revoir la photo",bonusThumbAria:"Réafficher la photo et reprendre le défloutage",bonusResult:"Bonus de rapidité : +{points} pts",bonusRecap:"Bonus",placeWas:"C’était :",legendGuess:"Votre point",legendTruth:"Le vrai lieu",pointsSuffix:"pts",timeUp:"Temps écoulé",nextRound:"Manche suivante",seeScore:"Voir mon score",finalTitle:"Bravo !",finalGreat:"Impressionnant",finalGood:"Beau parcours",finalOk:"Pas mal du tout",finalLow:"Merci d’avoir joué",outOf:"sur {max} points",roundRecap:"Manche {index}",shareButton:"Partager mon score",shareBusy:"Création de l’image en cours",replayButton:"Rejouer",shareSaved:"Image enregistrée dans vos téléchargements.",shareFailed:"Impossible de créer l’image de score.",shareText:"J’ai fait {points} points sur devineAgglo !",cardSubtitle:"Agglomération montargoise",myScore:"Mon score",errNeedLayerUrl:"Renseignez l’URL de la couche dans les paramètres du widget.",errModules:"Impossible de charger les modules ArcGIS (version de l’API incompatible ?).",errLayerTimeout:"La couche ne répond pas : vérifiez l’URL et le partage de la couche.",errQueryTimeout:"La couche ne renvoie pas ses points : vérifiez son partage.",errNoRounds:"Aucune manche trouvée : vérifiez que la couche contient des points avec une photo jointe.",errBadProjection:"Système de coordonnées de la carte non pris en charge (utilisez une carte en Web Mercator ou WGS84).",errComputeFailed:"Calcul impossible : ",builderTitle:"DevineAgglo",builderMapLinked:"Carte liée",builderMapNotLinked:"Choisissez une carte dans les paramètres.",builderLoading:"Chargement des données en cours",builderRounds:"Manches chargées : {count}",builderHint:"Le jeu s’affiche en mode Aperçu ou une fois publié."};var h=function(e,t,a,n){return new(a||(a=Promise))((function(r,o){function i(e){try{l(n.next(e))}catch(e){o(e)}}function s(e){try{l(n.throw(e))}catch(e){o(e)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(i,s)}l((n=n.apply(e,t||[])).next())}))};const b=5e3;function f(e){var t;return e.score+(null!==(t=e.bonus)&&void 0!==t?t:0)}function v(e,t,a){return new Promise(((n,r)=>{const o=setTimeout((()=>r(new Error(a))),t);e.then((e=>{clearTimeout(o),n(e)}),(e=>{clearTimeout(o),r(e)}))}))}const y=6378137,w=Math.PI/180;function j(e,t,a){return(null==a?void 0:a.isWebMercator)?{x:e*w*y,y:Math.log(Math.tan(Math.PI/4+t*w/2))*y}:(null==a?void 0:a.isWGS84)||4326===(null==a?void 0:a.wkid)?{x:e,y:t}:null}function M(e){return null===e?"—":e<1e3?`${Math.round(e).toLocaleString("fr-FR")} m`:`${(e/1e3).toLocaleString("fr-FR",{maximumFractionDigits:1})} km`}function k(e){const t=Math.max(0,Math.round(e));return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}function $(e){return e.toLocaleString("fr-FR")}function S(e,t,a){const n=t>0?e/t:0;return a(n>=.8?"finalGreat":n>=.5?"finalGood":n>=.25?"finalOk":"finalLow")}function N(e){return new Promise(((t,a)=>{const n=new Image;n.crossOrigin="anonymous",n.onload=()=>t(n),n.onerror=()=>a(new Error("Image illisible")),n.src=e}))}function z(e,t,a){const n=Math.min(1,t/Math.max(e.naturalWidth,e.naturalHeight)),r=document.createElement("canvas");r.width=Math.max(1,Math.round(e.naturalWidth*n)),r.height=Math.max(1,Math.round(e.naturalHeight*n));const o=r.getContext("2d");return o?(o.drawImage(e,0,0,r.width,r.height),new Promise(((e,t)=>{r.toBlob((a=>{a?e(URL.createObjectURL(a)):t(new Error("Réduction impossible"))}),"image/jpeg",a)}))):Promise.reject(new Error("Canvas indisponible"))}function R(e,t,a,n,r,o){const i=Math.min(o,n/2,r/2);e.beginPath(),e.moveTo(t+i,a),e.arcTo(t+n,a,t+n,a+r,i),e.arcTo(t+n,a+r,t,a+r,i),e.arcTo(t,a+r,t,a,i),e.arcTo(t,a,t+n,a,i),e.closePath()}function L(e,t,a,n,r){let o=n;for(e.font=`${a} ${o}px ${g}`;e.measureText(t).width>r&&o>24;)o-=4,e.font=`${a} ${o}px ${g}`;return o}var T=function(e,t,a,n){return new(a||(a=Promise))((function(r,o){function i(e){try{l(n.next(e))}catch(e){o(e)}}function s(e){try{l(n.throw(e))}catch(e){o(e)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(i,s)}l((n=n.apply(e,t||[])).next())}))};const A={type:"simple-marker",style:"circle",color:c,size:16,outline:{color:l,width:2.5}},C={type:"simple-marker",style:"circle",color:p,size:18,outline:{color:l,width:2.5}},P={type:"simple-line",color:"#1e293b",width:2.5,style:"dash"},{useState:I,useEffect:B,useRef:E,useCallback:U,useMemo:G}=e.React;function F(e,t){return(null!=e?e:"").trim()||String((null==t?void 0:t.url)||(null==t?void 0:t.fileSrc)||"")}const O=r=>{var o,i,s,d,c,p,O,q,D,W,V,H,_,J,X;const{config:Q}=r,Y=G((()=>{return e=Q.texts,(t,a)=>{const n=null==e?void 0:e[t],r="string"==typeof n&&""!==n.trim()?n:x[t];return a?r.replace(/\{(\w+)\}/g,((e,t)=>t in a?String(a[t]):e)):r};var e}),[Q.texts]),Z=E(Y);Z.current=Y;const K=null!==(o=Q.timerEnabled)&&void 0!==o&&o&&(null!==(i=Q.timerSeconds)&&void 0!==i?i:60)>0,ee=Math.max(1,Math.round(null!==(s=Q.timerSeconds)&&void 0!==s?s:60)),te=null===(d=Q.bonusEnabled)||void 0===d||d,ae=Math.max(5,Math.round(null!==(c=Q.bonusSeconds)&&void 0!==c?c:30)),ne=Math.max(0,Math.round(null!==(p=Q.bonusMaxPoints)&&void 0!==p?p:2500)),re=null===(O=Q.lockView)||void 0===O||O,oe=Math.max(0,null!==(q=Q.lockMargin)&&void 0!==q?q:25),ie=Math.max(1,null!==(D=Q.lockMaxZoomOut)&&void 0!==D?D:1.5),se=F(Q.introImageUrl,Q.introImage),le=F(Q.cornerImageUrl,Q.cornerImage)||se,[ue,de]=I(null),[ce,pe]=I(!1),[ge,me]=I("loading"),[xe,he]=I(""),[be,fe]=I(""),[ve,ye]=I([]),[we,je]=I(0),[Me,ke]=I(!0),[$e,Se]=I(!1),[Ne,ze]=I([]),[Re,Le]=I(!1),[Te,Ae]=I(""),[Ce,Pe]=I(0),[Ie,Be]=I(0),Ee=E(null),Ue=E(null),Ge=E(null),Fe=E(null),Oe=E(null),qe=E(null),De=E(0),We=E(0),Ve=E(0),He=E((()=>{})),_e=U((e=>de(e)),[]),Je=!!(null===(W=window.jimuConfig)||void 0===W?void 0:W.isInBuilder),Xe=0===(null!==(H=null===(V=r.useMapWidgetIds)||void 0===V?void 0:V.length)&&void 0!==H?H:0),Qe=!!(null==ue?void 0:ue.view)&&ce;B((()=>{var e;const t=Ee.current,a=null===(e=null==ue?void 0:ue.view)||void 0===e?void 0:e.container;if(!t||!a||Je)return;const n=[],r=t.getBoundingClientRect();let o=t,i=0;for(;o&&o!==document.body&&i<8&&!o.contains(a);){const e=o.getBoundingClientRect();if(!(Math.abs(e.width-r.width)<2&&Math.abs(e.height-r.height)<2&&Math.abs(e.left-r.left)<2&&Math.abs(e.top-r.top)<2))break;o.style.pointerEvents="none",n.push(o),o=o.parentElement,i+=1}return()=>{n.forEach((e=>{e.style.pointerEvents=""}))}}),[ue,Je]),B((()=>{let e=!1;return me("loading"),he(""),Q.layerUrl?(T(void 0,void 0,void 0,(function*(){var a;try{const[a,n,r,o,i,s]=yield v((0,t.loadArcGISJSAPIModules)(["esri/layers/FeatureLayer","esri/Graphic","esri/layers/GraphicsLayer","esri/geometry/Point","esri/geometry/Polyline","esri/geometry/Extent"]),2e4,Z.current("errModules"));if(e)return;Ue.current={FeatureLayer:a,Graphic:n,GraphicsLayer:r,Point:o,Polyline:i,Extent:s},pe(!0);const l=new a({url:Q.layerUrl});yield v(l.load(),25e3,Z.current("errLayerTimeout"));const u=l.createQuery();u.where="1=1",u.outFields=["*"],u.returnGeometry=!0,u.outSpatialReference={wkid:4326};const d=yield v(l.queryFeatures(u),25e3,Z.current("errQueryTimeout")),c=l.objectIdField,p=d.features.filter((e=>!!e.geometry)).sort(((e,t)=>(Number(e.attributes[Q.orderField])||0)-(Number(t.attributes[Q.orderField])||0))).slice(0,(Q.maxRounds||5)+(te?1:0)),g=p.map((e=>e.attributes[c])),m=g.length>0?yield l.queryAttachments({objectIds:g}):{},x=p.map(((e,t)=>{var a,n,r,o,i;const s=null!==(a=m[e.attributes[c]])&&void 0!==a?a:[],l=null!==(n=s.find((e=>{var t;return(null!==(t=e.contentType)&&void 0!==t?t:"").startsWith("image/")})))&&void 0!==n?n:s[0];return{objectId:e.attributes[c],order:Number(e.attributes[Q.orderField])||0,name:String(null!==(r=e.attributes[Q.nameField])&&void 0!==r?r:""),anecdote:String(null!==(o=e.attributes[Q.anecdoteField])&&void 0!==o?o:""),photoUrl:null!==(i=null==l?void 0:l.url)&&void 0!==i?i:"",thumbUrl:"",x:e.geometry.x,y:e.geometry.y,bonus:t>=(Q.maxRounds||5)}})).filter((e=>""!==e.photoUrl));if(e)return;if(0===x.length)throw new Error(Z.current("errNoRounds"));const b=yield Promise.all(x.map((e=>T(void 0,void 0,void 0,(function*(){return Object.assign(Object.assign({},e),yield function(e){return h(this,void 0,void 0,(function*(){try{const t=yield N(e);return{photoUrl:yield z(t,1600,.85),thumbUrl:yield z(t,480,.8)}}catch(t){return{photoUrl:e,thumbUrl:e}}}))}(e.photoUrl))})))));if(e)return;ye(b),ze([]),je(0),me("intro")}catch(t){if(e)return;he(String(null!==(a=null==t?void 0:t.message)&&void 0!==a?a:t)),me("error")}})),()=>{e=!0}):(me("error"),void he(Z.current("errNeedLayerUrl")))}),[Q.layerUrl,Q.orderField,Q.nameField,Q.anecdoteField,Q.maxRounds,te]),B((()=>{const e=null==ue?void 0:ue.view,t=Ue.current;if(!e||!t||!ce)return;const a=new t.GraphicsLayer({listMode:"hide"});return e.map.add(a),Fe.current=a,e.when((()=>{var t,a,n,r;Oe.current=e.viewpoint.clone(),qe.current=null!==(n=null===(a=null===(t=e.extent)||void 0===t?void 0:t.clone)||void 0===a?void 0:a.call(t))&&void 0!==n?n:null,De.current=null!==(r=e.scale)&&void 0!==r?r:0})),()=>{e.map.remove(a),Fe.current=null}}),[ue,ce]),B((()=>{const e=null==ue?void 0:ue.view,t=Ue.current;if(!e||!t||!ce||!re||0===ve.length||Je)return;if(!e.constraints)return;let a=!1;const n=e.constraints,r={geometry:n.geometry,minScale:n.minScale};return e.when((()=>{var r;if(!a)try{const a=e.spatialReference,o=null!==(r=qe.current)&&void 0!==r?r:e.extent,i=De.current||e.scale;if(!o||!i)return;let s=o.xmin,l=o.xmax,u=o.ymin,d=o.ymax;ve.forEach((e=>{const t=j(e.x,e.y,a);t&&(s=Math.min(s,t.x),l=Math.max(l,t.x),u=Math.min(u,t.y),d=Math.max(d,t.y))}));const c=(l-s)*oe/100,p=(d-u)*oe/100;n.geometry=new t.Extent({xmin:s-c,xmax:l+c,ymin:u-p,ymax:d+p,spatialReference:a}),n.minScale=i*ie}catch(e){}})),()=>{var e,t;a=!0;try{n.geometry=null!==(e=r.geometry)&&void 0!==e?e:null,n.minScale=null!==(t=r.minScale)&&void 0!==t?t:0}catch(e){}}}),[ue,ce,ve,re,oe,ie,Je]),B((()=>{var e;if("playing"!==ge||!K||(null===(e=ve[we])||void 0===e?void 0:e.bonus))return;Ve.current=Date.now()+1e3*ee,Pe(ee);const t=window.setInterval((()=>{const e=Math.max(0,Math.ceil((Ve.current-Date.now())/1e3));Pe(e),e<=0&&(window.clearInterval(t),He.current(!0))}),250);return()=>window.clearInterval(t)}),[ge,we,K,ee,ve]),B((()=>{var e;if("playing"!==ge||!(null===(e=ve[we])||void 0===e?void 0:e.bonus)||!Me)return;let t=performance.now();const a=window.setInterval((()=>{const e=performance.now();We.current+=e-t,t=e,Be(Math.min(1,We.current/(1e3*ae)))}),100);return()=>window.clearInterval(a)}),[ge,we,Me,ve,ae]),B((()=>{const e=null==ue?void 0:ue.view,t=Ue.current;if(!e||!t||!ce||"playing"!==ge)return;const a=e.popupEnabled;e.popupEnabled=!1;const n=e.on("immediate-click",(e=>{e.stopPropagation();const a=Fe.current;a&&(Ge.current=e.mapPoint,a.removeAll(),a.add(new t.Graphic({geometry:e.mapPoint,symbol:A})),Se(!0),fe(""))}));return()=>{n.remove(),e.popupEnabled=a}}),[ue,ce,ge]);const Ye=()=>{const e=null==ue?void 0:ue.view;e&&Oe.current&&e.goTo(Oe.current,{animate:!1}).catch((()=>{}))},Ze=e=>{var t;null===(t=Fe.current)||void 0===t||t.removeAll(),Ge.current=null,Se(!1),fe(""),je(e),We.current=0,Be(0),ke(!0),me("playing"),Ye()},Ke=(e=!1)=>{var t;const a=null==ue?void 0:ue.view,n=Ue.current,r=Fe.current,o=Ge.current,i=ve[we];if(a&&n&&r&&i&&(o||e))try{const t=a.spatialReference,s=j(i.x,i.y,t);if(!s)throw new Error(Y("errBadProjection"));const l=new n.Point({x:s.x,y:s.y,spatialReference:t}),u=[{x:l.x,y:l.y}];let d=null,c=0;if(o){const e=function(e,t,a){return(null==a?void 0:a.isWebMercator)?{lon:e/y/w,lat:(2*Math.atan(Math.exp(t/y))-Math.PI/2)/w}:(null==a?void 0:a.isWGS84)||4326===(null==a?void 0:a.wkid)?{lon:e,lat:t}:null}(o.x,o.y,t);if(!e)throw new Error(Y("errBadProjection"));d=function(e,t,a,n){const r=(t+n)/2*w,o=111132.92-559.82*Math.cos(2*r)+1.175*Math.cos(4*r),i=111412.84*Math.cos(r)-93.5*Math.cos(3*r)+.118*Math.cos(5*r);return Math.hypot((a-e)*i,(n-t)*o)}(e.lon,e.lat,i.x,i.y),c=function(e,t,a){if(e<=t)return b;if(a<=t||e>=a)return 0;const n=(e-t)/(a-t);return Math.round(b*(1-n)*(1-n))}(d,Q.perfectDistance,Q.maxDistance),r.add(new n.Graphic({geometry:new n.Polyline({paths:[[[o.x,o.y],[l.x,l.y]]],spatialReference:t}),symbol:P})),u.push({x:o.x,y:o.y})}r.add(new n.Graphic({geometry:l,symbol:C}));const p=u.map((e=>e.x)),g=u.map((e=>e.y)),m=Math.min(...p),x=Math.max(...p),h=Math.min(...g),f=Math.max(...g),v=t.isGeographic?.004:400,M=(m+x)/2,k=(h+f)/2,$=Math.max(1.8*(x-m),v),S=Math.max(1.8*(f-h),v),N=new n.Extent({xmin:M-$/2,xmax:M+$/2,ymin:k-S/2-.35*S,ymax:k+S/2,spatialReference:t});a.goTo(N,{duration:900}).catch((()=>{}));const z=!!i.bonus,R=z?function(e,t,a){const n=Math.max(0,Math.min(1,e)),r=Math.max(0,Math.min(1,t/b));return Math.round(a*(1-n)*r)}(We.current/(1e3*ae),c,ne):0;ze((t=>[...t,{distance:d,score:c,timedOut:e,isBonus:z,bonus:R}])),ke(!1),me("result")}catch(e){fe(Y("errComputeFailed")+String(null!==(t=null==e?void 0:e.message)&&void 0!==t?t:e))}};He.current=e=>Ke(e);const et=Ne.reduce(((e,t)=>e+f(t)),0),tt=ve.filter((e=>!e.bonus)).length,at=ve.some((e=>!!e.bonus)),nt=tt*b+(at?b+ne:0),rt=ve[we],ot=Ne[Ne.length-1],it=!!(null==rt?void 0:rt.bonus),st=it&&"playing"===ge,lt=Math.round(38*(1-Ie)*10)/10,ut=Math.round(ne*(1-Ie)),dt=Me&&("playing"===ge||"result"===ge)&&!!rt,ct=!(Me||"playing"!==ge&&"result"!==ge||!rt),pt=(0,e.jsx)("div",{className:"ag-root",css:m},"loading"===ge&&(0,e.jsx)("div",{className:"ag-toast"},Y("loading")),"error"===ge&&(0,e.jsx)("div",{className:"ag-toast ag-toast-error"},xe),"intro"===ge&&(0,e.jsx)("div",{className:"ag-backdrop"},(0,e.jsx)("div",{className:"ag-card"},se&&(0,e.jsx)("img",{className:"ag-card-img",src:se,alt:Y("logoAlt")}),(0,e.jsx)("h1",null,Y("title")),(0,e.jsx)("p",null,Y("introText",{count:tt})),at&&(0,e.jsx)("p",null,Y("introBonus")),K&&(0,e.jsx)("p",null,Y("introTimer",{seconds:ee})),(0,e.jsx)("button",{className:"ag-btn ag-btn-primary ag-btn-block",disabled:!Qe,onClick:()=>Ze(0)},Y(Xe?"mapNotConfigured":Qe?"playButton":"mapLoading")))),("playing"===ge||"result"===ge)&&(0,e.jsx)("div",{className:"ag-header"},(0,e.jsx)("span",null,it?Y("bonusLabel"):Y("roundLabel",{index:we+1,count:tt})),(0,e.jsx)("span",null,Y("scoreLabel",{points:$(et)}))),K&&"playing"===ge&&!it&&(0,e.jsx)("div",{className:"ag-timer"+(Ce<=10?" ag-timer-low":"")},(0,e.jsx)("svg",{viewBox:"0 0 100 100"},(0,e.jsx)("circle",{className:"ag-timer-track",cx:"50",cy:"50",r:"42"}),(0,e.jsx)("circle",{key:we,className:"ag-timer-fill",cx:"50",cy:"50",r:"42",pathLength:100,style:{animationDuration:`${ee}s`}})),(0,e.jsx)("span",null,k(Ce))),it&&"playing"===ge&&(0,e.jsx)(e.React.Fragment,null,(0,e.jsx)("div",{className:"ag-timer"},(0,e.jsx)("svg",{viewBox:"0 0 100 100"},(0,e.jsx)("circle",{className:"ag-timer-track",cx:"50",cy:"50",r:"42"}),(0,e.jsx)("circle",{className:"ag-timer-fill ag-timer-manual",cx:"50",cy:"50",r:"42",pathLength:100,style:{strokeDashoffset:100*(1-Ie)}})),(0,e.jsx)("span",null,k(Math.ceil(ae*(1-Ie))))),ne>0&&(0,e.jsx)("div",{className:"ag-bonus-pill"},Y("bonusPill",{points:$(ut)}))),le&&("playing"===ge||"result"===ge)&&(0,e.jsx)("div",{className:"ag-corner"},(0,e.jsx)("img",{src:le,alt:Y("logoAlt")})),dt&&(0,e.jsx)("div",{className:"ag-backdrop",onClick:()=>ke(!1)},(0,e.jsx)("div",{className:"ag-photo-card"+(it?" ag-photo-bonus":"")},(0,e.jsx)("div",{className:"ag-photo-wrap"},(0,e.jsx)("img",{src:rt.photoUrl,alt:Y("photoAlt"),decoding:"async",style:st?{filter:`blur(${lt}px)`,transform:"scale(1.06)"}:void 0})),(0,e.jsx)("div",{className:"ag-photo-hint"},Y("photoHint")))),ct&&(0,e.jsx)("button",{className:"ag-thumb",onClick:()=>ke(!0),"aria-label":Y(st?"bonusThumbAria":"thumbAria")},st?(0,e.jsx)("div",{className:"ag-thumb-mask"},"?"):(0,e.jsx)("img",{src:rt.thumbUrl,alt:Y("thumbAlt"),decoding:"async"}),(0,e.jsx)("span",null,Y(st?"bonusThumbLabel":"thumbLabel"))),"playing"===ge&&!Me&&(0,e.jsx)("div",{className:"ag-bar"},(0,e.jsx)("div",{className:"ag-bar-hint"+(be?" ag-bar-notice":"")},be||Y($e?"hintGuess":it?"bonusHintNoGuess":"hintNoGuess")),(0,e.jsx)("button",{className:"ag-btn ag-btn-primary",disabled:!$e,onClick:()=>Ke(!1)},Y("guessButton"))),"result"===ge&&!Me&&ot&&rt&&(0,e.jsx)("div",{className:"ag-result"},(0,e.jsx)("div",{className:"ag-result-main"},null===ot.distance?(0,e.jsx)("span",{className:"ag-dist ag-dist-timeout"},Y("timeUp")):(0,e.jsx)("span",{className:"ag-dist"},M(ot.distance)),(0,e.jsx)("span",{className:"ag-pts"},$(ot.score)," ",Y("pointsSuffix"))),ot.isBonus&&(0,e.jsx)("div",{className:"ag-bonus-result"},Y("bonusResult",{points:$(null!==(_=ot.bonus)&&void 0!==_?_:0)})),rt.name&&(0,e.jsx)("div",{className:"ag-place"},Y("placeWas")," ",(0,e.jsx)("strong",null,rt.name)),rt.anecdote&&(0,e.jsx)("div",{className:"ag-anec"},rt.anecdote),(0,e.jsx)("div",{className:"ag-legend"},null!==ot.distance&&(0,e.jsx)("span",{className:"ag-legend-guess"},Y("legendGuess")),(0,e.jsx)("span",{className:"ag-legend-truth"},Y("legendTruth"))),(0,e.jsx)("button",{className:"ag-btn ag-btn-primary ag-btn-block",onClick:()=>{var e,t,a;we+1>=ve.length?(null===(e=Fe.current)||void 0===e||e.removeAll(),Ae(""),me("final"),Ye()):(null===(t=ve[we+1])||void 0===t?void 0:t.bonus)?(null===(a=Fe.current)||void 0===a||a.removeAll(),ke(!1),me("bonusIntro"),Ye()):Ze(we+1)}},we+1>=ve.length?Y("seeScore"):(null===(J=ve[we+1])||void 0===J?void 0:J.bonus)?Y("bonusNextButton"):Y("nextRound"))),"bonusIntro"===ge&&(0,e.jsx)("div",{className:"ag-backdrop"},(0,e.jsx)("div",{className:"ag-bonus-modal"},(0,e.jsx)("div",{className:"ag-bonus-rays"}),(0,e.jsx)("div",{className:"ag-bonus-star"},"★"),(0,e.jsx)("h2",null,Y("bonusModalTitle")),(0,e.jsx)("p",null,Y("bonusModalText")),(0,e.jsx)("button",{className:"ag-btn ag-btn-gold ag-btn-block",onClick:()=>Ze(we+1)},Y("bonusModalButton")))),"final"===ge&&(0,e.jsx)("div",{className:"ag-backdrop"},(0,e.jsx)("div",{className:"ag-card"},(0,e.jsx)("h1",null,Y("finalTitle")),(0,e.jsx)("p",null,S(et,nt,Y)),(0,e.jsx)("div",{className:"ag-score"},$(et)," ",(0,e.jsx)("small",null,Y("outOf",{max:$(nt)}))),(0,e.jsx)("ul",{className:"ag-recap"},Ne.map(((t,a)=>(0,e.jsx)("li",{key:a},(0,e.jsx)("span",null,t.isBonus?Y("bonusRecap"):Y("roundRecap",{index:a+1})),(0,e.jsx)("span",null,M(t.distance)),(0,e.jsx)("span",null,$(f(t))," ",Y("pointsSuffix")))))),(0,e.jsx)("div",{className:"ag-actions"},(0,e.jsx)("button",{className:"ag-btn ag-btn-primary",disabled:Re,onClick:()=>T(void 0,void 0,void 0,(function*(){var e;Le(!0),Ae("");try{const t=yield function(e,t,r,o,i=""){return h(this,void 0,void 0,(function*(){const s=1080,d=1350,c=document.createElement("canvas");c.width=s,c.height=d;const p=c.getContext("2d");if(!p)throw new Error("Canvas indisponible");const m=i?yield function(e){return h(this,void 0,void 0,(function*(){try{const t=yield fetch(e);if(t.ok){const e=yield t.blob(),a=URL.createObjectURL(e);try{return yield N(a)}catch(e){}}}catch(e){}try{return yield N(e)}catch(e){return null}}))}(i):null,x=p.createLinearGradient(0,0,0,d);if(x.addColorStop(0,n),x.addColorStop(1,a),p.fillStyle=x,p.fillRect(0,0,s,d),m){const e=m.naturalWidth||300,t=m.naturalHeight||100,a=Math.min(300/e,74/t),n=Math.round(e*a),r=Math.round(t*a),o=14,i=Math.round((s-n)/2)-o;p.fillStyle="rgba(255,255,255,0.97)",R(p,i,34,n+2*o,r+2*o,22),p.fill(),p.drawImage(m,i+o,34+o,n,r)}p.textAlign="center",p.fillStyle=l;const b=L(p,o("title"),800,104,900);p.fillText(o("title"),540,226),p.font=`400 40px ${g}`,p.globalAlpha=.9,p.fillText(o("cardSubtitle"),540,226+Math.round(.1*b)+48),p.globalAlpha=1,p.fillStyle="rgba(255,255,255,0.16)",R(p,90,330,900,350,40),p.fill(),p.fillStyle=l,p.font=`500 46px ${g}`,p.fillText(o("myScore"),540,406);const v=t.toLocaleString("fr-FR");L(p,v,800,170,820),p.fillStyle=u,p.fillText(v,540,566),p.fillStyle=l,p.font=`400 40px ${g}`,p.globalAlpha=.9,p.fillText(o("outOf",{max:r.toLocaleString("fr-FR")}),540,640),p.globalAlpha=1;const y=Math.min(88,442/Math.max(e.length,1)),w=y-12,j=Math.round(.19*w),k=w<70?34:38;let $=718;return e.forEach(((e,t)=>{const a=$+w/2;p.fillStyle="rgba(255,255,255,0.16)",R(p,90,$,900,w,26),p.fill(),p.fillStyle=l,p.textAlign="left",p.font=`700 ${k}px ${g}`,p.fillText(e.isBonus?o("bonusRecap"):o("roundRecap",{index:t+1}),124,a+j),p.textAlign="center",p.font=`400 ${k}px ${g}`,p.fillText(M(e.distance),560,a+j),p.textAlign="right",p.fillStyle=u,p.font=`800 ${k}px ${g}`,p.fillText(`${f(e).toLocaleString("fr-FR")} ${o("pointsSuffix")}`,956,a+j),$+=y})),p.textAlign="center",p.fillStyle=l,p.font=`800 56px ${g}`,p.fillText(o("finalTitle"),540,1222),p.font=`400 38px ${g}`,p.globalAlpha=.9,function(e,t,a){const n=t.split(" "),r=[];let o="";return n.forEach((t=>{const a=o?`${o} ${t}`:t;e.measureText(a).width>880&&o?(r.push(o),o=t):o=a})),o&&r.push(o),r}(p,S(t,r,o)).slice(0,2).forEach(((e,t)=>{p.fillText(e,540,1282+46*t)})),p.globalAlpha=1,yield new Promise(((e,t)=>{c.toBlob((a=>{a?e(a):t(new Error("Impossible de créer l’image"))}),"image/png")}))}))}(Ne,et,nt,Y,le),r=new File([t],"agglOguessr-score.png",{type:"image/png"}),o=navigator;if(null===(e=o.canShare)||void 0===e?void 0:e.call(o,{files:[r]}))yield o.share({files:[r],title:Y("title"),text:Y("shareText",{points:$(et)})});else{const e=URL.createObjectURL(t),a=document.createElement("a");a.href=e,a.download="agglOguessr-score.png",document.body.appendChild(a),a.click(),document.body.removeChild(a),setTimeout((()=>URL.revokeObjectURL(e)),2e3),Ae(Y("shareSaved"))}}catch(e){"AbortError"!==(null==e?void 0:e.name)&&Ae(Y("shareFailed"))}finally{Le(!1)}}))},Y(Re?"shareBusy":"shareButton")),(0,e.jsx)("button",{className:"ag-btn ag-btn-secondary",onClick:()=>{var e;null===(e=Fe.current)||void 0===e||e.removeAll(),Ge.current=null,ze([]),je(0),Se(!1),Ae(""),me("intro"),Ye()}},Y("replayButton"))),Te&&(0,e.jsx)("p",{className:"ag-share-msg"},Te))));return(0,e.jsx)("div",{ref:Ee,className:"jimu-widget widget-agglo-guessr",style:{width:"100%",height:"100%",pointerEvents:Je?"auto":"none"}},!Xe&&(0,e.jsx)(t.JimuMapViewComponent,{useMapWidgetId:null===(X=r.useMapWidgetIds)||void 0===X?void 0:X[0],onActiveViewChange:_e}),Je?(0,e.jsx)("div",{style:{padding:12,background:a,color:l,borderRadius:8,fontSize:13,lineHeight:1.5}},(0,e.jsx)("strong",null,Y("builderTitle")),(0,e.jsx)("br",null),Y(Xe?"builderMapNotLinked":"builderMapLinked"),(0,e.jsx)("br",null),"error"===ge?xe:"loading"===ge?Y("builderLoading"):Y("builderRounds",{count:ve.length}),(0,e.jsx)("br",null),(0,e.jsx)("em",null,Y("builderHint"))):e.ReactDOM.createPortal(pt,document.body))};function q(e){r.p=e}})(),o})())}}}));