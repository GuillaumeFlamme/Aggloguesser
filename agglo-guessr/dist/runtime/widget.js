System.register(["jimu-core","jimu-arcgis"],(function(e,t){var a={},n={};return{setters:[function(e){a.React=e.React,a.ReactDOM=e.ReactDOM,a.css=e.css,a.jsx=e.jsx},function(e){n.JimuMapViewComponent=e.JimuMapViewComponent,n.loadArcGISJSAPIModules=e.loadArcGISJSAPIModules}],execute:function(){e((()=>{var e={826:e=>{"use strict";e.exports=n},891:e=>{"use strict";e.exports=a}},t={};function r(a){var n=t[a];if(void 0!==n)return n.exports;var o=t[a]={exports:{}};return e[a](o,o.exports,r),o.exports}r.d=(e,t)=>{for(var a in t)r.o(t,a)&&!r.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.p="";var o={};return r.p=window.jimuConfig.baseUrl,(()=>{"use strict";r.r(o),r.d(o,{__set_webpack_public_path__:()=>D,default:()=>H});var e=r(891),t=r(826);const a="#346fa5",n="#014380",i="#36525c",s="#5b7680",l="#ffffff",u="#ffd166",d="#b42318",c="#2563eb",p="#16a34a",g="calibri",m=e.css`
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
    font-size: 0px; /* taille du titre */
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
    width: 100px; /* diamètre du chronomètre */
    height: 100px; /* diamètre du chronomètre */
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
    font-size: 20px; /* taille du temps */
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

  /* Manche bonus : photo pixelisée (la pixelisation est réglée par le jeu) */
  .ag-photo-wrap {
    overflow: hidden; /* arrondit les coins de la photo */
    border-radius: 12px; /* arrondi des coins */
  }
  .ag-photo-bonus {
    animation: ag-photo-appear 0.7s ease-out both; /* la photo pixelisée apparaît en douceur */
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
    background: linear-gradient(160deg, ${"#076fe5"}, ${"#014380"}); /* dégradé violet vers bleu foncé */
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
    background: repeating-conic-gradient(rgba(7, 111, 229, 0.22) 0deg 10deg, transparent 10deg 20deg); /* rayons dorés */
    animation: ag-bonus-spin 16s linear infinite; /* rotation lente */
  }
  .ag-bonus-star {
    font-size: 76px; /* grande étoile */
    line-height: 1; /* hauteur de ligne serrée */
    color: ${u}; /* étoile dorée */
    animation: ag-bonus-beat 1.2s ease-in-out infinite; /* l'étoile bat comme un coeur */
  }
  .ag-bonus-modal h2 {
    margin: 6px 0 12px; /* espaces autour du titre */
    font-size: 36px; /* taille du titre */
    font-weight: 900; /* texte très gras */
    color : white;
    letter-spacing: 2px; /* lettres espacées */
    color: rgb(255, 255, 255 / 1.0); /* titre doré */
    animation: ag-bonus-title 0.9s ease-out both; /* le titre se resserre en arrivant */
  }
  .ag-bonus-modal p {
    margin: 0 0 22px; /* espace dessous */
    font-size: 16px; /* taille du texte */
    line-height: 1.45; /* hauteur de ligne */
    animation: ag-bonus-fade 0.8s ease-out 0.5s both; /* le texte apparaît après le titre */
  }
  .ag-btn-gold {
    background: rgb(255, 255, 255 / 1.0); /* fond doré */
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
  .ag-photo-card img,
  .ag-photo-card canvas {
    display: block; /* l'image se comporte comme un bloc */
    max-width: 100%; /* ne dépasse pas la largeur du cadre */
    max-height: 70vh; /* hauteur maximale : 70 pour cent de l'écran */
    border-radius: 12px; /* arrondi des coins de la photo */
    margin: 0 auto; /* centrée horizontalement */
  }
  .ag-photo-card canvas {
    image-rendering: pixelated; /* garde des carrés nets si le navigateur doit quand même redimensionner */
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
    .ag-photo-card img,
    .ag-photo-card canvas {
      max-height: 62vh; /* photo un peu moins haute */
    }
    .ag-card {
      padding: 22px 18px; /* marge intérieure réduite */
    }
    .ag-score {
      font-size: 54px; /* score un peu plus petit */
    }
  }
`,h={title:"GéoAgglo",loading:"Chargement de GéoAgglo en cours",introText:"{count} lieux de l’agglomération montargoise à retrouver. Observez la photo, placez votre point sur la carte et gagnez des points selon votre précision.",introTimer:"Vous avez {seconds} secondes par manche.",playButton:"Jouer",mapNotConfigured:"Carte non configurée",mapLoading:"Chargement de la carte en cours",logoAlt:"Logo",roundLabel:"Manche {index} sur {count}",scoreLabel:"Score : {points} pts",photoAlt:"Où cette photo a-t-elle été prise ?",photoHint:"Touchez pour afficher la carte",thumbAlt:"Photo à retrouver",thumbLabel:"Agrandir",thumbAria:"Agrandir la photo",hintNoGuess:"Touchez la carte pour placer votre point.",hintGuess:"Vous pouvez déplacer votre point.",guessButton:"Deviner",introBonus:"Une manche bonus avec une photo floue vous attend à la fin.",bonusLabel:"Manche bonus",bonusModalTitle:"MANCHE BONUS",bonusModalText:"La photo est floue et se défloute peu à peu. Plus vous la trouvez tôt, plus vous gagnez de points bonus !",bonusModalButton:"C’est parti !",bonusNextButton:"Manche bonus",bonusPill:"Bonus jusqu’à +{points}",bonusHintNoGuess:"Défloutage en pause. Touchez la carte pour placer votre point.",bonusThumbLabel:"Revoir la photo",bonusThumbAria:"Réafficher la photo et reprendre le défloutage",bonusResult:"Bonus de rapidité : +{points} pts",bonusRecap:"Bonus",placeWas:"C’était :",legendGuess:"Votre point",legendTruth:"Le vrai lieu",pointsSuffix:"pts",timeUp:"Temps écoulé",nextRound:"Manche suivante",seeScore:"Voir mon score",finalTitle:"Bravo !",finalGreat:"Impressionnant",finalGood:"Beau parcours",finalOk:"Pas mal du tout",finalLow:"Merci d’avoir joué",outOf:"sur {max} points",roundRecap:"Manche {index}",shareButton:"Partager mon score",shareBusy:"Création de l’image en cours",replayButton:"Rejouer",shareSaved:"Image enregistrée dans vos téléchargements.",shareFailed:"Impossible de créer l’image de score.",shareText:"J’ai fait {points} points sur devineAgglo !",cardSubtitle:"Agglomération montargoise",myScore:"Mon score",errNeedLayerUrl:"Renseignez l’URL de la couche dans les paramètres du widget.",errModules:"Impossible de charger les modules ArcGIS (version de l’API incompatible ?).",errLayerTimeout:"La couche ne répond pas : vérifiez l’URL et le partage de la couche.",errQueryTimeout:"La couche ne renvoie pas ses points : vérifiez son partage.",errNoRounds:"Aucune manche trouvée : vérifiez que la couche contient des points avec une photo jointe.",errBadProjection:"Système de coordonnées de la carte non pris en charge (utilisez une carte en Web Mercator ou WGS84).",errComputeFailed:"Calcul impossible : ",builderTitle:"DevineAgglo",builderMapLinked:"Carte liée",builderMapNotLinked:"Choisissez une carte dans les paramètres.",builderLoading:"Chargement des données en cours",builderRounds:"Manches chargées : {count}",builderHint:"Le jeu s’affiche en mode Aperçu ou une fois publié."};var x=function(e,t,a,n){return new(a||(a=Promise))((function(r,o){function i(e){try{l(n.next(e))}catch(e){o(e)}}function s(e){try{l(n.throw(e))}catch(e){o(e)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(i,s)}l((n=n.apply(e,t||[])).next())}))};const b=5e3;function f(e){const t=String(null!=e?e:"").split(/[^0-9]+/).map((e=>parseInt(e,10))).filter((e=>Number.isFinite(e)&&e>=1)).map((e=>Math.min(e,4e3))),a=Array.from(new Set(t)).sort(((e,t)=>e-t)).slice(0,64);return a.length>0?a:f("1, 4, 8, 16, 32, 64, 128, 256")}function v(e,t){const a=Math.max(0,Math.min(1,e));return t[Math.min(t.length-1,Math.floor(a*t.length))]}function y(e){var t;return e.score+(null!==(t=e.bonus)&&void 0!==t?t:0)}function w(e,t,a){return new Promise(((n,r)=>{const o=setTimeout((()=>r(new Error(a))),t);e.then((e=>{clearTimeout(o),n(e)}),(e=>{clearTimeout(o),r(e)}))}))}const M=6378137,j=Math.PI/180;function k(e,t,a){return(null==a?void 0:a.isWebMercator)?{x:e*j*M,y:Math.log(Math.tan(Math.PI/4+t*j/2))*M}:(null==a?void 0:a.isWGS84)||4326===(null==a?void 0:a.wkid)?{x:e,y:t}:null}function S(e){return null===e?"—":e<1e3?`${Math.round(e).toLocaleString("fr-FR")} m`:`${(e/1e3).toLocaleString("fr-FR",{maximumFractionDigits:1})} km`}function $(e){const t=Math.max(0,Math.round(e));return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}function N(e){return e.toLocaleString("fr-FR")}function z(e,t,a){const n=t>0?e/t:0;return a(n>=.8?"finalGreat":n>=.5?"finalGood":n>=.25?"finalOk":"finalLow")}function T(e){return new Promise(((t,a)=>{const n=new Image;n.crossOrigin="anonymous",n.onload=()=>t(n),n.onerror=()=>a(new Error("Image illisible")),n.src=e}))}function L(e,t,a){const n=Math.min(1,t/Math.max(e.naturalWidth,e.naturalHeight)),r=document.createElement("canvas");r.width=Math.max(1,Math.round(e.naturalWidth*n)),r.height=Math.max(1,Math.round(e.naturalHeight*n));const o=r.getContext("2d");return o?(o.drawImage(e,0,0,r.width,r.height),new Promise(((e,t)=>{r.toBlob((a=>{a?e(URL.createObjectURL(a)):t(new Error("Réduction impossible"))}),"image/jpeg",a)}))):Promise.reject(new Error("Canvas indisponible"))}function R(e,t,a,n,r,o){const i=Math.min(o,n/2,r/2);e.beginPath(),e.moveTo(t+i,a),e.arcTo(t+n,a,t+n,a+r,i),e.arcTo(t+n,a+r,t,a+r,i),e.arcTo(t,a+r,t,a,i),e.arcTo(t,a,t+n,a,i),e.closePath()}function A(e,t,a,n,r){let o=n;for(e.font=`${a} ${o}px ${g}`;e.measureText(t).width>r&&o>24;)o-=4,e.font=`${a} ${o}px ${g}`;return o}var C=function(e,t,a,n){return new(a||(a=Promise))((function(r,o){function i(e){try{l(n.next(e))}catch(e){o(e)}}function s(e){try{l(n.throw(e))}catch(e){o(e)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(i,s)}l((n=n.apply(e,t||[])).next())}))};const I={type:"simple-marker",style:"circle",color:c,size:16,outline:{color:l,width:2.5}},P={type:"simple-marker",style:"circle",color:p,size:18,outline:{color:l,width:2.5}},E={type:"simple-line",color:"#1e293b",width:2.5,style:"dash"},{useState:B,useEffect:U,useRef:G,useCallback:F,useMemo:O}=e.React;function W(e,t){return(null!=e?e:"").trim()||String((null==t?void 0:t.url)||(null==t?void 0:t.fileSrc)||"")}const q=t=>{const a=G(null),n=G(null),r=G(""),[o,i]=B("loading"),[s,l]=B((()=>window.innerWidth+"x"+window.innerHeight)),u=O((()=>f(t.stepsText)),[t.stepsText]);return U((()=>{const e=()=>l(window.innerWidth+"x"+window.innerHeight);return window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)}),[]),U((()=>{let e=!1;i("loading"),r.current="";const a=new Image;return a.onload=()=>{e||(n.current=a,i("ready"))},a.onerror=()=>{e||i("error")},a.src=t.src,()=>{e=!0}}),[t.src]),U((()=>{const e=n.current,l=a.current;if("ready"!==o||!e||!l)return;const d=(t.progress>=1?1e5:v(t.progress,u))+"|"+s+"|"+u.join(",");if(d!==r.current){r.current=d;try{const a=Math.min(980,.96*window.innerWidth)-20,n=window.innerHeight*(window.innerWidth<=640?.62:.7),r=Math.min(1,a/e.naturalWidth,n/e.naturalHeight),o=Math.max(1,Math.round(e.naturalWidth*r)),i=Math.max(1,Math.round(e.naturalHeight*r)),s=Math.min(2,window.devicePixelRatio||1),d=Math.round(o*s),c=Math.round(i*s);l.width===d&&l.height===c||(l.width=d,l.height=c),l.style.width=o+"px",l.style.height=i+"px",function(e,t,a,n){const r=t.getContext("2d");if(!r)return;const o=t.width,i=t.height;if(a>=1)return r.imageSmoothingEnabled=!0,r.imageSmoothingQuality="high",void r.drawImage(e,0,0,o,i);const s=v(a,n),l=Math.max(o,i),u=Math.max(1,Math.round(o*s/l)),d=Math.max(1,Math.round(i*s/l));let c=e,p=e.naturalWidth,g=e.naturalHeight;for(;p/2>u&&g/2>d;){const e=document.createElement("canvas");e.width=Math.round(p/2),e.height=Math.round(g/2);const t=e.getContext("2d");t&&(t.imageSmoothingEnabled=!0,t.imageSmoothingQuality="high",t.drawImage(c,0,0,e.width,e.height)),c=e,p=e.width,g=e.height}const m=document.createElement("canvas");m.width=u,m.height=d;const h=m.getContext("2d");h&&(h.imageSmoothingEnabled=!0,h.imageSmoothingQuality="high",h.drawImage(c,0,0,u,d)),r.imageSmoothingEnabled=!1,r.drawImage(m,0,0,u,d,0,0,o,i)}(e,l,t.progress,u)}catch(e){console.error("Pixelisation impossible",e),i("error")}}}),[o,t.progress,u,s]),"error"===o?(0,e.jsx)("img",{src:t.src,alt:t.alt,decoding:"async",style:{filter:`blur(${Math.round(38*(1-t.progress))}px)`,transform:"scale(1.06)"}}):(0,e.jsx)("canvas",{ref:a,className:"ag-photo-canvas",role:"img","aria-label":t.alt})},H=r=>{var o,i,s,d,c,p,f,v,H,D,V,_,J,Q,X;const{config:Y}=r,Z=O((()=>{return e=Y.texts,(t,a)=>{const n=null==e?void 0:e[t],r="string"==typeof n?(""!==n.trim()?n:(n.length>0?"":h[t])):h[t];return a?r.replace(/\{(\w+)\}/g,((e,t)=>t in a?String(a[t]):e)):r};var e}),[Y.texts]),K=G(Z);K.current=Z;const ee=null!==(o=Y.timerEnabled)&&void 0!==o&&o&&(null!==(i=Y.timerSeconds)&&void 0!==i?i:60)>0,te=Math.max(1,Math.round(null!==(s=Y.timerSeconds)&&void 0!==s?s:60)),ae=null===(d=Y.bonusEnabled)||void 0===d||d,ne=Math.max(5,Math.round(null!==(c=Y.bonusSeconds)&&void 0!==c?c:30)),re=Math.max(0,Math.round(null!==(p=Y.bonusMaxPoints)&&void 0!==p?p:2500)),oe=null===(f=Y.lockView)||void 0===f||f,ie=Math.max(0,null!==(v=Y.lockMargin)&&void 0!==v?v:25),se=Math.max(1,null!==(H=Y.lockMaxZoomOut)&&void 0!==H?H:1.5),le=W(Y.introImageUrl,Y.introImage),ue=W(Y.cornerImageUrl,Y.cornerImage)||le,[de,ce]=B(null),[pe,ge]=B(!1),[me,he]=B("loading"),[xe,be]=B(""),[fe,ve]=B(""),[ye,we]=B([]),[Me,je]=B(0),[ke,Se]=B(!0),[$e,Ne]=B(!1),[ze,Te]=B([]),[Le,Re]=B(!1),[Ae,Ce]=B(""),[Ie,Pe]=B(0),[Ee,Be]=B(0),Ue=G(null),Ge=G(null),Fe=G(null),Oe=G(null),We=G(null),qe=G(null),He=G(0),De=G(0),Ve=G(0),_e=G((()=>{})),Je=F((e=>ce(e)),[]),Qe=!!(null===(D=window.jimuConfig)||void 0===D?void 0:D.isInBuilder),Xe=0===(null!==(_=null===(V=r.useMapWidgetIds)||void 0===V?void 0:V.length)&&void 0!==_?_:0),Ye=!!(null==de?void 0:de.view)&&pe;U((()=>{var e;const t=Ue.current,a=null===(e=null==de?void 0:de.view)||void 0===e?void 0:e.container;if(!t||!a||Qe)return;const n=[],r=t.getBoundingClientRect();let o=t,i=0;for(;o&&o!==document.body&&i<8&&!o.contains(a);){const e=o.getBoundingClientRect();if(!(Math.abs(e.width-r.width)<2&&Math.abs(e.height-r.height)<2&&Math.abs(e.left-r.left)<2&&Math.abs(e.top-r.top)<2))break;o.style.pointerEvents="none",n.push(o),o=o.parentElement,i+=1}return()=>{n.forEach((e=>{e.style.pointerEvents=""}))}}),[de,Qe]),U((()=>{let e=!1;return he("loading"),be(""),Y.layerUrl?(C(void 0,void 0,void 0,(function*(){var a;try{const[a,n,r,o,i,s]=yield w((0,t.loadArcGISJSAPIModules)(["esri/layers/FeatureLayer","esri/Graphic","esri/layers/GraphicsLayer","esri/geometry/Point","esri/geometry/Polyline","esri/geometry/Extent"]),2e4,K.current("errModules"));if(e)return;Ge.current={FeatureLayer:a,Graphic:n,GraphicsLayer:r,Point:o,Polyline:i,Extent:s},ge(!0);const l=new a({url:Y.layerUrl});yield w(l.load(),25e3,K.current("errLayerTimeout"));const u=l.createQuery();u.where="1=1",u.outFields=["*"],u.returnGeometry=!0,u.outSpatialReference={wkid:4326};const d=yield w(l.queryFeatures(u),25e3,K.current("errQueryTimeout")),c=l.objectIdField,p=d.features.filter((e=>!!e.geometry)).sort(((e,t)=>(Number(e.attributes[Y.orderField])||0)-(Number(t.attributes[Y.orderField])||0))).slice(0,(Y.maxRounds||5)+(ae?1:0)),g=p.map((e=>e.attributes[c])),m=g.length>0?yield l.queryAttachments({objectIds:g}):{},h=p.map(((e,t)=>{var a,n,r,o,i;const s=null!==(a=m[e.attributes[c]])&&void 0!==a?a:[],l=null!==(n=s.find((e=>{var t;return(null!==(t=e.contentType)&&void 0!==t?t:"").startsWith("image/")})))&&void 0!==n?n:s[0];return{objectId:e.attributes[c],order:Number(e.attributes[Y.orderField])||0,name:String(null!==(r=e.attributes[Y.nameField])&&void 0!==r?r:""),anecdote:String(null!==(o=e.attributes[Y.anecdoteField])&&void 0!==o?o:""),photoUrl:null!==(i=null==l?void 0:l.url)&&void 0!==i?i:"",thumbUrl:"",x:e.geometry.x,y:e.geometry.y,bonus:t>=(Y.maxRounds||5)}})).filter((e=>""!==e.photoUrl));if(e)return;if(0===h.length)throw new Error(K.current("errNoRounds"));const b=yield Promise.all(h.map((e=>C(void 0,void 0,void 0,(function*(){return Object.assign(Object.assign({},e),yield function(e){return x(this,void 0,void 0,(function*(){try{const t=yield T(e);return{photoUrl:yield L(t,1600,.85),thumbUrl:yield L(t,480,.8)}}catch(t){return{photoUrl:e,thumbUrl:e}}}))}(e.photoUrl))})))));if(e)return;we(b),Te([]),je(0),he("intro")}catch(t){if(e)return;be(String(null!==(a=null==t?void 0:t.message)&&void 0!==a?a:t)),he("error")}})),()=>{e=!0}):(he("error"),void be(K.current("errNeedLayerUrl")))}),[Y.layerUrl,Y.orderField,Y.nameField,Y.anecdoteField,Y.maxRounds,ae]),U((()=>{const e=null==de?void 0:de.view,t=Ge.current;if(!e||!t||!pe)return;const a=new t.GraphicsLayer({listMode:"hide"});return e.map.add(a),Oe.current=a,e.when((()=>{var t,a,n,r;We.current=e.viewpoint.clone(),qe.current=null!==(n=null===(a=null===(t=e.extent)||void 0===t?void 0:t.clone)||void 0===a?void 0:a.call(t))&&void 0!==n?n:null,He.current=null!==(r=e.scale)&&void 0!==r?r:0})),()=>{e.map.remove(a),Oe.current=null}}),[de,pe]),U((()=>{const e=null==de?void 0:de.view,t=Ge.current;if(!e||!t||!pe||!oe||0===ye.length||Qe)return;if(!e.constraints)return;let a=!1;const n=e.constraints,r={geometry:n.geometry,minScale:n.minScale};return e.when((()=>{var r;if(!a)try{const a=e.spatialReference,o=null!==(r=qe.current)&&void 0!==r?r:e.extent,i=He.current||e.scale;if(!o||!i)return;let s=o.xmin,l=o.xmax,u=o.ymin,d=o.ymax;ye.forEach((e=>{const t=k(e.x,e.y,a);t&&(s=Math.min(s,t.x),l=Math.max(l,t.x),u=Math.min(u,t.y),d=Math.max(d,t.y))}));const c=(l-s)*ie/100,p=(d-u)*ie/100;n.geometry=new t.Extent({xmin:s-c,xmax:l+c,ymin:u-p,ymax:d+p,spatialReference:a}),n.minScale=i*se}catch(e){}})),()=>{var e,t;a=!0;try{n.geometry=null!==(e=r.geometry)&&void 0!==e?e:null,n.minScale=null!==(t=r.minScale)&&void 0!==t?t:0}catch(e){}}}),[de,pe,ye,oe,ie,se,Qe]),U((()=>{var e;if("playing"!==me||!ee||(null===(e=ye[Me])||void 0===e?void 0:e.bonus))return;Ve.current=Date.now()+1e3*te,Pe(te);const t=window.setInterval((()=>{const e=Math.max(0,Math.ceil((Ve.current-Date.now())/1e3));Pe(e),e<=0&&(window.clearInterval(t),_e.current(!0))}),250);return()=>window.clearInterval(t)}),[me,Me,ee,te,ye]),U((()=>{var e;if("playing"!==me||!(null===(e=ye[Me])||void 0===e?void 0:e.bonus)||!ke)return;let t=performance.now();const a=window.setInterval((()=>{const e=performance.now();De.current+=e-t,t=e,Be(Math.min(1,De.current/(1e3*ne)))}),100);return()=>window.clearInterval(a)}),[me,Me,ke,ye,ne]),U((()=>{const e=null==de?void 0:de.view,t=Ge.current;if(!e||!t||!pe||"playing"!==me)return;const a=e.popupEnabled;e.popupEnabled=!1;const n=e.on("immediate-click",(e=>{e.stopPropagation();const a=Oe.current;a&&(Fe.current=e.mapPoint,a.removeAll(),a.add(new t.Graphic({geometry:e.mapPoint,symbol:I})),Ne(!0),ve(""))}));return()=>{n.remove(),e.popupEnabled=a}}),[de,pe,me]);const Ze=()=>{const e=null==de?void 0:de.view;e&&We.current&&e.goTo(We.current,{animate:!1}).catch((()=>{}))},Ke=e=>{var t;null===(t=Oe.current)||void 0===t||t.removeAll(),Fe.current=null,Ne(!1),ve(""),je(e),De.current=0,Be(0),Se(!0),he("playing"),Ze()},et=(e=!1)=>{var t;const a=null==de?void 0:de.view,n=Ge.current,r=Oe.current,o=Fe.current,i=ye[Me];if(a&&n&&r&&i&&(o||e))try{const t=a.spatialReference,s=k(i.x,i.y,t);if(!s)throw new Error(Z("errBadProjection"));const l=new n.Point({x:s.x,y:s.y,spatialReference:t}),u=[{x:l.x,y:l.y}];let d=null,c=0;if(o){const e=function(e,t,a){return(null==a?void 0:a.isWebMercator)?{lon:e/M/j,lat:(2*Math.atan(Math.exp(t/M))-Math.PI/2)/j}:(null==a?void 0:a.isWGS84)||4326===(null==a?void 0:a.wkid)?{lon:e,lat:t}:null}(o.x,o.y,t);if(!e)throw new Error(Z("errBadProjection"));d=function(e,t,a,n){const r=(t+n)/2*j,o=111132.92-559.82*Math.cos(2*r)+1.175*Math.cos(4*r),i=111412.84*Math.cos(r)-93.5*Math.cos(3*r)+.118*Math.cos(5*r);return Math.hypot((a-e)*i,(n-t)*o)}(e.lon,e.lat,i.x,i.y),c=function(e,t,a){if(e<=t)return b;if(a<=t||e>=a)return 0;const n=(e-t)/(a-t);return Math.round(b*(1-n)*(1-n))}(d,Y.perfectDistance,Y.maxDistance),r.add(new n.Graphic({geometry:new n.Polyline({paths:[[[o.x,o.y],[l.x,l.y]]],spatialReference:t}),symbol:E})),u.push({x:o.x,y:o.y})}r.add(new n.Graphic({geometry:l,symbol:P}));const p=u.map((e=>e.x)),g=u.map((e=>e.y)),m=Math.min(...p),h=Math.max(...p),x=Math.min(...g),f=Math.max(...g),v=t.isGeographic?.004:400,y=(m+h)/2,w=(x+f)/2,S=Math.max(1.8*(h-m),v),$=Math.max(1.8*(f-x),v),N=new n.Extent({xmin:y-S/2,xmax:y+S/2,ymin:w-$/2-.35*$,ymax:w+$/2,spatialReference:t});a.goTo(N,{duration:900}).catch((()=>{}));const z=!!i.bonus,T=z?function(e,t,a){const n=Math.max(0,Math.min(1,e)),r=Math.max(0,Math.min(1,t/b));return Math.round(a*(1-n)*r)}(De.current/(1e3*ne),c,re):0;Te((t=>[...t,{distance:d,score:c,timedOut:e,isBonus:z,bonus:T}])),Se(!1),he("result")}catch(e){ve(Z("errComputeFailed")+String(null!==(t=null==e?void 0:e.message)&&void 0!==t?t:e))}};_e.current=e=>et(e);const tt=ze.reduce(((e,t)=>e+y(t)),0),at=ye.filter((e=>!e.bonus)).length,nt=ye.some((e=>!!e.bonus)),rt=at*b+(nt?b+re:0),ot=ye[Me],it=ze[ze.length-1],st=!!(null==ot?void 0:ot.bonus),lt=st&&"playing"===me,ut=Math.round(re*(1-Ee)),dt=ke&&("playing"===me||"result"===me)&&!!ot,ct=!(ke||"playing"!==me&&"result"!==me||!ot),pt=(0,e.jsx)("div",{className:"ag-root",css:m},"loading"===me&&(0,e.jsx)("div",{className:"ag-toast"},Z("loading")),"error"===me&&(0,e.jsx)("div",{className:"ag-toast ag-toast-error"},xe),"intro"===me&&(0,e.jsx)("div",{className:"ag-backdrop"},(0,e.jsx)("div",{className:"ag-card"},le&&(0,e.jsx)("img",{className:"ag-card-img",src:le,alt:Z("logoAlt")}),Z("title")&&(0,e.jsx)("h1",null,Z("title")),Z("introText",{count:at})&&(0,e.jsx)("p",null,Z("introText",{count:at})),nt&&Z("introBonus")&&(0,e.jsx)("p",null,Z("introBonus")),ee&&Z("introTimer",{seconds:te})&&(0,e.jsx)("p",null,Z("introTimer",{seconds:te})),(0,e.jsx)("button",{className:"ag-btn ag-btn-primary ag-btn-block",disabled:!Ye,onClick:()=>Ke(0)},Z(Xe?"mapNotConfigured":Ye?"playButton":"mapLoading")))),("playing"===me||"result"===me)&&(0,e.jsx)("div",{className:"ag-header"},(0,e.jsx)("span",null,st?Z("bonusLabel"):Z("roundLabel",{index:Me+1,count:at})),(0,e.jsx)("span",null,Z("scoreLabel",{points:N(tt)}))),ee&&"playing"===me&&!st&&(0,e.jsx)("div",{className:"ag-timer"+(Ie<=10?" ag-timer-low":"")},(0,e.jsx)("svg",{viewBox:"0 0 100 100"},(0,e.jsx)("circle",{className:"ag-timer-track",cx:"50",cy:"50",r:"42"}),(0,e.jsx)("circle",{key:Me,className:"ag-timer-fill",cx:"50",cy:"50",r:"42",pathLength:100,style:{animationDuration:`${te}s`}})),(0,e.jsx)("span",null,$(Ie))),st&&"playing"===me&&(0,e.jsx)(e.React.Fragment,null,(0,e.jsx)("div",{className:"ag-timer"},(0,e.jsx)("svg",{viewBox:"0 0 100 100"},(0,e.jsx)("circle",{className:"ag-timer-track",cx:"50",cy:"50",r:"42"}),(0,e.jsx)("circle",{className:"ag-timer-fill ag-timer-manual",cx:"50",cy:"50",r:"42",pathLength:100,style:{strokeDashoffset:100*(1-Ee)}})),(0,e.jsx)("span",null,$(Math.ceil(ne*(1-Ee))))),re>0&&(0,e.jsx)("div",{className:"ag-bonus-pill"},Z("bonusPill",{points:N(ut)}))),ue&&("playing"===me||"result"===me)&&(0,e.jsx)("div",{className:"ag-corner"},(0,e.jsx)("img",{src:ue,alt:Z("logoAlt")})),dt&&(0,e.jsx)("div",{className:"ag-backdrop",onClick:()=>Se(!1)},(0,e.jsx)("div",{className:"ag-photo-card"+(st?" ag-photo-bonus":"")},(0,e.jsx)("div",{className:"ag-photo-wrap"},lt?(0,e.jsx)(q,{src:ot.photoUrl,alt:Z("photoAlt"),progress:Ee,stepsText:Y.bonusPixelSteps}):(0,e.jsx)("img",{src:ot.photoUrl,alt:Z("photoAlt"),decoding:"async"})),(0,e.jsx)("div",{className:"ag-photo-hint"},Z("photoHint")))),ct&&(0,e.jsx)("button",{className:"ag-thumb",onClick:()=>Se(!0),"aria-label":Z(lt?"bonusThumbAria":"thumbAria")},lt?(0,e.jsx)("div",{className:"ag-thumb-mask"},"?"):(0,e.jsx)("img",{src:ot.thumbUrl,alt:Z("thumbAlt"),decoding:"async"}),(0,e.jsx)("span",null,Z(lt?"bonusThumbLabel":"thumbLabel"))),"playing"===me&&!ke&&(0,e.jsx)("div",{className:"ag-bar"},(0,e.jsx)("div",{className:"ag-bar-hint"+(fe?" ag-bar-notice":"")},fe||Z($e?"hintGuess":st?"bonusHintNoGuess":"hintNoGuess")),(0,e.jsx)("button",{className:"ag-btn ag-btn-primary",disabled:!$e,onClick:()=>et(!1)},Z("guessButton"))),"result"===me&&!ke&&it&&ot&&(0,e.jsx)("div",{className:"ag-result"},(0,e.jsx)("div",{className:"ag-result-main"},null===it.distance?(0,e.jsx)("span",{className:"ag-dist ag-dist-timeout"},Z("timeUp")):(0,e.jsx)("span",{className:"ag-dist"},S(it.distance)),(0,e.jsx)("span",{className:"ag-pts"},N(it.score)," ",Z("pointsSuffix"))),it.isBonus&&(0,e.jsx)("div",{className:"ag-bonus-result"},Z("bonusResult",{points:N(null!==(J=it.bonus)&&void 0!==J?J:0)})),ot.name&&(0,e.jsx)("div",{className:"ag-place"},Z("placeWas")," ",(0,e.jsx)("strong",null,ot.name)),ot.anecdote&&(0,e.jsx)("div",{className:"ag-anec"},ot.anecdote),(0,e.jsx)("div",{className:"ag-legend"},null!==it.distance&&(0,e.jsx)("span",{className:"ag-legend-guess"},Z("legendGuess")),(0,e.jsx)("span",{className:"ag-legend-truth"},Z("legendTruth"))),(0,e.jsx)("button",{className:"ag-btn ag-btn-primary ag-btn-block",onClick:()=>{var e,t,a;Me+1>=ye.length?(null===(e=Oe.current)||void 0===e||e.removeAll(),Ce(""),he("final"),Ze()):(null===(t=ye[Me+1])||void 0===t?void 0:t.bonus)?(null===(a=Oe.current)||void 0===a||a.removeAll(),Se(!1),he("bonusIntro"),Ze()):Ke(Me+1)}},Me+1>=ye.length?Z("seeScore"):(null===(Q=ye[Me+1])||void 0===Q?void 0:Q.bonus)?Z("bonusNextButton"):Z("nextRound"))),"bonusIntro"===me&&(0,e.jsx)("div",{className:"ag-backdrop"},(0,e.jsx)("div",{className:"ag-bonus-modal"},(0,e.jsx)("div",{className:"ag-bonus-rays"}),(0,e.jsx)("div",{className:"ag-bonus-star"},""),(0,e.jsx)("h2",null,Z("bonusModalTitle")),(0,e.jsx)("p",null,Z("bonusModalText")),(0,e.jsx)("button",{className:"ag-btn ag-btn-gold ag-btn-block",onClick:()=>Ke(Me+1)},Z("bonusModalButton")))),"final"===me&&(0,e.jsx)("div",{className:"ag-backdrop"},(0,e.jsx)("div",{className:"ag-card"},Z("finalTitle")&&(0,e.jsx)("h1",null,Z("finalTitle")),(0,e.jsx)("p",null,z(tt,rt,Z)),(0,e.jsx)("div",{className:"ag-score"},N(tt)," ",(0,e.jsx)("small",null,Z("outOf",{max:N(rt)}))),(0,e.jsx)("ul",{className:"ag-recap"},ze.map(((t,a)=>(0,e.jsx)("li",{key:a},(0,e.jsx)("span",null,t.isBonus?Z("bonusRecap"):Z("roundRecap",{index:a+1})),(0,e.jsx)("span",null,S(t.distance)),(0,e.jsx)("span",null,N(y(t))," ",Z("pointsSuffix")))))),(0,e.jsx)("div",{className:"ag-actions"},(0,e.jsx)("button",{className:"ag-btn ag-btn-primary",disabled:Le,onClick:()=>C(void 0,void 0,void 0,(function*(){var e;Re(!0),Ce("");try{const t=yield function(e,t,r,o,i=""){return x(this,void 0,void 0,(function*(){const s=1080,d=1350,c=document.createElement("canvas");c.width=s,c.height=d;const p=c.getContext("2d");if(!p)throw new Error("Canvas indisponible");const m=i?yield function(e){return x(this,void 0,void 0,(function*(){try{const t=yield fetch(e);if(t.ok){const e=yield t.blob(),a=URL.createObjectURL(e);try{return yield T(a)}catch(e){}}}catch(e){}try{return yield T(e)}catch(e){return null}}))}(i):null,h=p.createLinearGradient(0,0,0,d);if(h.addColorStop(0,n),h.addColorStop(1,a),p.fillStyle=h,p.fillRect(0,0,s,d),m){const e=m.naturalWidth||300,t=m.naturalHeight||100,a=Math.min(300/e,74/t),n=Math.round(e*a),r=Math.round(t*a),o=14,i=Math.round((s-n)/2)-o;p.fillStyle="rgba(255,255,255,0.97)",R(p,i,34,n+2*o,r+2*o,22),p.fill(),p.drawImage(m,i+o,34+o,n,r)}p.textAlign="center",p.fillStyle=l;const b=A(p,o("title"),800,104,900);p.fillText(o("title"),540,226),p.font=`400 40px ${g}`,p.globalAlpha=.9,p.fillText(o("cardSubtitle"),540,226+Math.round(.1*b)+48),p.globalAlpha=1,p.fillStyle="rgba(255,255,255,0.16)",R(p,90,330,900,350,40),p.fill(),p.fillStyle=l,p.font=`500 46px ${g}`,p.fillText(o("myScore"),540,406);const f=t.toLocaleString("fr-FR");A(p,f,800,170,820),p.fillStyle=u,p.fillText(f,540,566),p.fillStyle=l,p.font=`400 40px ${g}`,p.globalAlpha=.9,p.fillText(o("outOf",{max:r.toLocaleString("fr-FR")}),540,640),p.globalAlpha=1;const v=Math.min(88,442/Math.max(e.length,1)),w=v-12,M=Math.round(.19*w),j=w<70?34:38;let k=718;return e.forEach(((e,t)=>{const a=k+w/2;p.fillStyle="rgba(255,255,255,0.16)",R(p,90,k,900,w,26),p.fill(),p.fillStyle=l,p.textAlign="left",p.font=`700 ${j}px ${g}`,p.fillText(e.isBonus?o("bonusRecap"):o("roundRecap",{index:t+1}),124,a+M),p.textAlign="center",p.font=`400 ${j}px ${g}`,p.fillText(S(e.distance),560,a+M),p.textAlign="right",p.fillStyle=u,p.font=`800 ${j}px ${g}`,p.fillText(`${y(e).toLocaleString("fr-FR")} ${o("pointsSuffix")}`,956,a+M),k+=v})),p.textAlign="center",p.fillStyle=l,p.font=`800 56px ${g}`,p.fillText(o("finalTitle"),540,1222),p.font=`400 38px ${g}`,p.globalAlpha=.9,function(e,t,a){const n=t.split(" "),r=[];let o="";return n.forEach((t=>{const a=o?`${o} ${t}`:t;e.measureText(a).width>880&&o?(r.push(o),o=t):o=a})),o&&r.push(o),r}(p,z(t,r,o)).slice(0,2).forEach(((e,t)=>{p.fillText(e,540,1282+46*t)})),p.globalAlpha=1,yield new Promise(((e,t)=>{c.toBlob((a=>{a?e(a):t(new Error("Impossible de créer l’image"))}),"image/png")}))}))}(ze,tt,rt,Z,ue),r=new File([t],"GéoAgglo-score.png",{type:"image/png"}),o=navigator;if(null===(e=o.canShare)||void 0===e?void 0:e.call(o,{files:[r]}))yield o.share({files:[r],title:Z("title"),text:Z("shareText",{points:N(tt)})});else{const e=URL.createObjectURL(t),a=document.createElement("a");a.href=e,a.download="agglOguessr-score.png",document.body.appendChild(a),a.click(),document.body.removeChild(a),setTimeout((()=>URL.revokeObjectURL(e)),2e3),Ce(Z("shareSaved"))}}catch(e){"AbortError"!==(null==e?void 0:e.name)&&Ce(Z("shareFailed"))}finally{Re(!1)}}))},Z(Le?"shareBusy":"shareButton")),(0,e.jsx)("button",{className:"ag-btn ag-btn-secondary",onClick:()=>{var e;null===(e=Oe.current)||void 0===e||e.removeAll(),Fe.current=null,Te([]),je(0),Ne(!1),Ce(""),he("intro"),Ze()}},Z("replayButton"))),Ae&&(0,e.jsx)("p",{className:"ag-share-msg"},Ae))));return(0,e.jsx)("div",{ref:Ue,className:"jimu-widget widget-agglo-guessr",style:{width:"100%",height:"100%",pointerEvents:Qe?"auto":"none"}},!Xe&&(0,e.jsx)(t.JimuMapViewComponent,{useMapWidgetId:null===(X=r.useMapWidgetIds)||void 0===X?void 0:X[0],onActiveViewChange:Je}),Qe?(0,e.jsx)("div",{style:{padding:12,background:a,color:l,borderRadius:8,fontSize:13,lineHeight:1.5}},(0,e.jsx)("strong",null,Z("builderTitle")),(0,e.jsx)("br",null),Z(Xe?"builderMapNotLinked":"builderMapLinked"),(0,e.jsx)("br",null),"error"===me?xe:"loading"===me?Z("builderLoading"):Z("builderRounds",{count:ye.length}),(0,e.jsx)("br",null),(0,e.jsx)("em",null,Z("builderHint"))):e.ReactDOM.createPortal(pt,document.body))};function D(e){r.p=e}})(),o})())}}}));