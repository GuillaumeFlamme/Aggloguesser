System.register(["jimu-core","jimu-arcgis"],(function(e,t){var a={},r={};return{setters:[function(e){a.React=e.React,a.ReactDOM=e.ReactDOM,a.css=e.css,a.jsx=e.jsx},function(e){r.JimuMapViewComponent=e.JimuMapViewComponent,r.loadArcGISJSAPIModules=e.loadArcGISJSAPIModules}],execute:function(){e((()=>{var e={826:e=>{"use strict";e.exports=r},891:e=>{"use strict";e.exports=a}},t={};function n(a){var r=t[a];if(void 0!==r)return r.exports;var o=t[a]={exports:{}};return e[a](o,o.exports,n),o.exports}n.d=(e,t)=>{for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.p="";var o={};return n.p=window.jimuConfig.baseUrl,(()=>{"use strict";n.r(o),n.d(o,{__set_webpack_public_path__:()=>he,default:()=>xe});var e=n(891),t=n(826);const a="#346fa5",r="#0f4c5c",i="#36525c",s="#5b7680",l="#ffffff",u="#ffd166",c="#b42318",d="#2563eb",p="#16a34a",g='system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',m=e.css`
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
    color: ${r}; /* couleur du titre */
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
    color: ${r}; /* texte du bouton secondaire */
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
    color: ${r}; /* couleur du texte */
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
    color: ${c}; /* texte rouge pour un message d'erreur */
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
    color: ${d}; /* couleur du mot "Votre pari" (même que le marqueur) */
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
    color: ${c}; /* texte rouge pour une erreur */
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
`,x="DevineAgglo",h="Chargement de DevineAgglo en cours",b=e=>`${e} lieux de l’agglomération montargoise à retrouver. Observez la photo, placez votre point sur la carte et gagnez des points selon votre précision.`,f="Jouer",v="Carte non configurée",y="Chargement de la carte en cours",w=(e,t)=>`Manche ${e} sur ${t}`,j=e=>`Score : ${e} pts`,M="Où cette photo a-t-elle été prise ?",$="Touchez pour afficher la carte",k="Photo à retrouver",S="Agrandir",z="Agrandir la photo",N="Touchez la carte pour placer votre point.",P="Vous pouvez déplacer votre point.",R="Deviner",C="C’était :",A="Votre point",L="Le vrai lieu",T="pts",E="Manche suivante",I="Voir mon score",U="Bravo !",F="Partager mon score",G="Création de l’image en cours",O="Rejouer",q="Image enregistrée dans vos téléchargements.",W="Impossible de créer l’image de score.",D=e=>`J’ai fait ${e} points sur devineAgglo !`,B=e=>`Manche ${e}`,V=e=>`sur ${e} points`,_="Mon score",J="Agglomération montargoise",H={great:"Impressionnant",good:"Beau parcours",ok:"Pas mal du tout",low:"Merci d’avoir joué"},X={needLayerUrl:"Renseignez l’URL de la couche dans les paramètres du widget.",modules:"Impossible de charger les modules ArcGIS (version de l’API incompatible ?).",layerTimeout:"La couche ne répond pas : vérifiez l’URL et le partage de la couche.",queryTimeout:"La couche ne renvoie pas ses points : vérifiez son partage.",noRounds:"Aucune manche trouvée : vérifiez que la couche contient des points avec une photo jointe.",badProjection:"Système de coordonnées de la carte non pris en charge (utilisez une carte en Web Mercator ou WGS84).",computeFailed:"Calcul impossible : "},Q={title:"DevineAgglo",mapLinked:"Carte liée",mapNotLinked:"Choisissez une carte dans les paramètres.",loading:"Chargement des données en cours",roundsLoaded:e=>`Manches chargées : ${e}`,previewHint:"Le jeu s’affiche en mode Aperçu ou une fois publié."};const K=5e3;function Y(e,t,a){return new Promise(((r,n)=>{const o=setTimeout((()=>n(new Error(a))),t);e.then((e=>{clearTimeout(o),r(e)}),(e=>{clearTimeout(o),n(e)}))}))}const Z=6378137,ee=Math.PI/180;function te(e){return e<1e3?`${Math.round(e).toLocaleString("fr-FR")} m`:`${(e/1e3).toLocaleString("fr-FR",{maximumFractionDigits:1})} km`}function ae(e){return e.toLocaleString("fr-FR")}function re(e,t){const a=t>0?e/t:0;return a>=.8?H.great:a>=.5?H.good:a>=.25?H.ok:H.low}function ne(e,t,a){const r=Math.min(1,t/Math.max(e.naturalWidth,e.naturalHeight)),n=document.createElement("canvas");n.width=Math.max(1,Math.round(e.naturalWidth*r)),n.height=Math.max(1,Math.round(e.naturalHeight*r));const o=n.getContext("2d");return o?(o.drawImage(e,0,0,n.width,n.height),new Promise(((e,t)=>{n.toBlob((a=>{a?e(URL.createObjectURL(a)):t(new Error("Réduction impossible"))}),"image/jpeg",a)}))):Promise.reject(new Error("Canvas indisponible"))}function oe(e){return t=this,a=void 0,n=function*(){try{const t=yield function(e){return new Promise(((t,a)=>{const r=new Image;r.crossOrigin="anonymous",r.onload=()=>t(r),r.onerror=()=>a(new Error("Image illisible")),r.src=e}))}(e);return{photoUrl:yield ne(t,1600,.85),thumbUrl:yield ne(t,480,.8)}}catch(t){return{photoUrl:e,thumbUrl:e}}},new((r=void 0)||(r=Promise))((function(e,o){function i(e){try{l(n.next(e))}catch(e){o(e)}}function s(e){try{l(n.throw(e))}catch(e){o(e)}}function l(t){var a;t.done?e(t.value):(a=t.value,a instanceof r?a:new r((function(e){e(a)}))).then(i,s)}l((n=n.apply(t,a||[])).next())}));var t,a,r,n}function ie(e,t,a,r,n,o){e.beginPath(),e.moveTo(t+o,a),e.arcTo(t+r,a,t+r,a+n,o),e.arcTo(t+r,a+n,t,a+n,o),e.arcTo(t,a+n,t,a,o),e.arcTo(t,a,t+r,a,o),e.closePath()}var se=function(e,t,a,r){return new(a||(a=Promise))((function(n,o){function i(e){try{l(r.next(e))}catch(e){o(e)}}function s(e){try{l(r.throw(e))}catch(e){o(e)}}function l(e){var t;e.done?n(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(i,s)}l((r=r.apply(e,t||[])).next())}))};const le={type:"simple-marker",style:"circle",color:d,size:16,outline:{color:l,width:2.5}},ue={type:"simple-marker",style:"circle",color:p,size:18,outline:{color:l,width:2.5}},ce={type:"simple-line",color:"#1e293b",width:2.5,style:"dash"},{useState:de,useEffect:pe,useRef:ge,useCallback:me}=e.React,xe=n=>{var o,i,s,c;const{config:d}=n,[p,H]=de(null),[ne,xe]=de(!1),[he,be]=de("loading"),[fe,ve]=de(""),[ye,we]=de(""),[je,Me]=de([]),[$e,ke]=de(0),[Se,ze]=de(!0),[Ne,Pe]=de(!1),[Re,Ce]=de([]),[Ae,Le]=de(!1),[Te,Ee]=de(""),Ie=ge(null),Ue=ge(null),Fe=ge(null),Ge=ge(null),Oe=ge(null),qe=me((e=>H(e)),[]),We=!!(null===(o=window.jimuConfig)||void 0===o?void 0:o.isInBuilder),De=0===(null!==(s=null===(i=n.useMapWidgetIds)||void 0===i?void 0:i.length)&&void 0!==s?s:0),Be=!!(null==p?void 0:p.view)&&ne;pe((()=>{var e;const t=Ie.current,a=null===(e=null==p?void 0:p.view)||void 0===e?void 0:e.container;if(!t||!a||We)return;const r=[],n=t.getBoundingClientRect();let o=t,i=0;for(;o&&o!==document.body&&i<8&&!o.contains(a);){const e=o.getBoundingClientRect();if(!(Math.abs(e.width-n.width)<2&&Math.abs(e.height-n.height)<2&&Math.abs(e.left-n.left)<2&&Math.abs(e.top-n.top)<2))break;o.style.pointerEvents="none",r.push(o),o=o.parentElement,i+=1}return()=>{r.forEach((e=>{e.style.pointerEvents=""}))}}),[p,We]),pe((()=>{let e=!1;return be("loading"),ve(""),d.layerUrl?(se(void 0,void 0,void 0,(function*(){var a;try{const[a,r,n,o,i,s]=yield Y((0,t.loadArcGISJSAPIModules)(["esri/layers/FeatureLayer","esri/Graphic","esri/layers/GraphicsLayer","esri/geometry/Point","esri/geometry/Polyline","esri/geometry/Extent"]),2e4,X.modules);if(e)return;Ue.current={FeatureLayer:a,Graphic:r,GraphicsLayer:n,Point:o,Polyline:i,Extent:s},xe(!0);const l=new a({url:d.layerUrl});yield Y(l.load(),25e3,X.layerTimeout);const u=l.createQuery();u.where="1=1",u.outFields=["*"],u.returnGeometry=!0,u.outSpatialReference={wkid:4326};const c=yield Y(l.queryFeatures(u),25e3,X.queryTimeout),p=l.objectIdField,g=c.features.filter((e=>!!e.geometry)).sort(((e,t)=>(Number(e.attributes[d.orderField])||0)-(Number(t.attributes[d.orderField])||0))).slice(0,d.maxRounds||5),m=g.map((e=>e.attributes[p])),x=m.length>0?yield l.queryAttachments({objectIds:m}):{},h=g.map((e=>{var t,a,r,n,o;const i=null!==(t=x[e.attributes[p]])&&void 0!==t?t:[],s=null!==(a=i.find((e=>{var t;return(null!==(t=e.contentType)&&void 0!==t?t:"").startsWith("image/")})))&&void 0!==a?a:i[0];return{objectId:e.attributes[p],order:Number(e.attributes[d.orderField])||0,name:String(null!==(r=e.attributes[d.nameField])&&void 0!==r?r:""),anecdote:String(null!==(n=e.attributes[d.anecdoteField])&&void 0!==n?n:""),photoUrl:null!==(o=null==s?void 0:s.url)&&void 0!==o?o:"",thumbUrl:"",x:e.geometry.x,y:e.geometry.y}})).filter((e=>""!==e.photoUrl));if(e)return;if(0===h.length)throw new Error(X.noRounds);const b=yield Promise.all(h.map((e=>se(void 0,void 0,void 0,(function*(){return Object.assign(Object.assign({},e),yield oe(e.photoUrl))})))));if(e)return;Me(b),Ce([]),ke(0),be("intro")}catch(t){if(e)return;ve(String(null!==(a=null==t?void 0:t.message)&&void 0!==a?a:t)),be("error")}})),()=>{e=!0}):(be("error"),void ve(X.needLayerUrl))}),[d.layerUrl,d.orderField,d.nameField,d.anecdoteField,d.maxRounds]),pe((()=>{const e=null==p?void 0:p.view,t=Ue.current;if(!e||!t||!ne)return;const a=new t.GraphicsLayer({listMode:"hide"});return e.map.add(a),Ge.current=a,e.when((()=>{Oe.current=e.viewpoint.clone()})),()=>{e.map.remove(a),Ge.current=null}}),[p,ne]),pe((()=>{const e=null==p?void 0:p.view,t=Ue.current;if(!e||!t||!ne||"playing"!==he)return;const a=e.popupEnabled;e.popupEnabled=!1;const r=e.on("immediate-click",(e=>{e.stopPropagation();const a=Ge.current;a&&(Fe.current=e.mapPoint,a.removeAll(),a.add(new t.Graphic({geometry:e.mapPoint,symbol:le})),Pe(!0),we(""))}));return()=>{r.remove(),e.popupEnabled=a}}),[p,ne,he]);const Ve=()=>{const e=null==p?void 0:p.view;e&&Oe.current&&e.goTo(Oe.current,{animate:!1}).catch((()=>{}))},_e=e=>{var t;null===(t=Ge.current)||void 0===t||t.removeAll(),Fe.current=null,Pe(!1),we(""),ke(e),ze(!0),be("playing"),Ve()},Je=Re.reduce(((e,t)=>e+t.score),0),He=je.length*K,Xe=je[$e],Qe=Re[Re.length-1],Ke=Se&&("playing"===he||"result"===he)&&!!Xe,Ye=!(Se||"playing"!==he&&"result"!==he||!Xe),Ze=(0,e.jsx)("div",{className:"ag-root",css:m},"loading"===he&&(0,e.jsx)("div",{className:"ag-toast"},h),"error"===he&&(0,e.jsx)("div",{className:"ag-toast ag-toast-error"},fe),"intro"===he&&(0,e.jsx)("div",{className:"ag-backdrop"},(0,e.jsx)("div",{className:"ag-card"},(0,e.jsx)("h1",null,x),(0,e.jsx)("p",null,b(je.length)),(0,e.jsx)("button",{className:"ag-btn ag-btn-primary ag-btn-block",disabled:!Be,onClick:()=>_e(0)},De?v:Be?f:y))),("playing"===he||"result"===he)&&(0,e.jsx)("div",{className:"ag-header"},(0,e.jsx)("span",null,w($e+1,je.length)),(0,e.jsx)("span",null,j(ae(Je)))),Ke&&(0,e.jsx)("div",{className:"ag-backdrop",onClick:()=>ze(!1)},(0,e.jsx)("div",{className:"ag-photo-card"},(0,e.jsx)("img",{src:Xe.photoUrl,alt:M,decoding:"async"}),(0,e.jsx)("div",{className:"ag-photo-hint"},$))),Ye&&(0,e.jsx)("button",{className:"ag-thumb",onClick:()=>ze(!0),"aria-label":z},(0,e.jsx)("img",{src:Xe.thumbUrl,alt:k,decoding:"async"}),(0,e.jsx)("span",null,S)),"playing"===he&&!Se&&(0,e.jsx)("div",{className:"ag-bar"},(0,e.jsx)("div",{className:"ag-bar-hint"+(ye?" ag-bar-notice":"")},ye||(Ne?P:N)),(0,e.jsx)("button",{className:"ag-btn ag-btn-primary",disabled:!Ne,onClick:()=>{var e;const t=null==p?void 0:p.view,a=Ue.current,r=Ge.current,n=Fe.current,o=je[$e];if(t&&a&&r&&n&&o)try{const e=t.spatialReference,i=function(e,t,a){return(null==a?void 0:a.isWebMercator)?{lon:e/Z/ee,lat:(2*Math.atan(Math.exp(t/Z))-Math.PI/2)/ee}:(null==a?void 0:a.isWGS84)||4326===(null==a?void 0:a.wkid)?{lon:e,lat:t}:null}(n.x,n.y,e),s=function(e,t,a){return(null==a?void 0:a.isWebMercator)?{x:e*ee*Z,y:Math.log(Math.tan(Math.PI/4+t*ee/2))*Z}:(null==a?void 0:a.isWGS84)||4326===(null==a?void 0:a.wkid)?{x:e,y:t}:null}(o.x,o.y,e);if(!i||!s)throw new Error(X.badProjection);const l=function(e,t,a,r){const n=(t+r)/2*ee,o=111132.92-559.82*Math.cos(2*n)+1.175*Math.cos(4*n),i=111412.84*Math.cos(n)-93.5*Math.cos(3*n)+.118*Math.cos(5*n);return Math.hypot((a-e)*i,(r-t)*o)}(i.lon,i.lat,o.x,o.y),u=function(e,t,a){if(e<=t)return K;if(a<=t||e>=a)return 0;const r=(e-t)/(a-t);return Math.round(K*(1-r)*(1-r))}(l,d.perfectDistance,d.maxDistance),c=new a.Point({x:s.x,y:s.y,spatialReference:e});r.add(new a.Graphic({geometry:new a.Polyline({paths:[[[n.x,n.y],[c.x,c.y]]],spatialReference:e}),symbol:ce})),r.add(new a.Graphic({geometry:c,symbol:ue}));const p=Math.min(n.x,c.x),g=Math.max(n.x,c.x),m=Math.min(n.y,c.y),x=Math.max(n.y,c.y),h=e.isGeographic?.004:400,b=(p+g)/2,f=(m+x)/2,v=Math.max(1.8*(g-p),h),y=Math.max(1.8*(x-m),h),w=new a.Extent({xmin:b-v/2,xmax:b+v/2,ymin:f-y/2-.35*y,ymax:f+y/2,spatialReference:e});t.goTo(w,{duration:900}).catch((()=>{})),Ce((e=>[...e,{distance:l,score:u}])),ze(!1),be("result")}catch(t){we(X.computeFailed+String(null!==(e=null==t?void 0:t.message)&&void 0!==e?e:t))}}},R)),"result"===he&&!Se&&Qe&&Xe&&(0,e.jsx)("div",{className:"ag-result"},(0,e.jsx)("div",{className:"ag-result-main"},(0,e.jsx)("span",{className:"ag-dist"},te(Qe.distance)),(0,e.jsx)("span",{className:"ag-pts"},ae(Qe.score)," ",T)),Xe.name&&(0,e.jsx)("div",{className:"ag-place"},C," ",(0,e.jsx)("strong",null,Xe.name)),Xe.anecdote&&(0,e.jsx)("div",{className:"ag-anec"},Xe.anecdote),(0,e.jsx)("div",{className:"ag-legend"},(0,e.jsx)("span",{className:"ag-legend-guess"},A),(0,e.jsx)("span",{className:"ag-legend-truth"},L)),(0,e.jsx)("button",{className:"ag-btn ag-btn-primary ag-btn-block",onClick:()=>{var e;$e+1>=je.length?(null===(e=Ge.current)||void 0===e||e.removeAll(),Ee(""),be("final"),Ve()):_e($e+1)}},$e+1>=je.length?I:E)),"final"===he&&(0,e.jsx)("div",{className:"ag-backdrop"},(0,e.jsx)("div",{className:"ag-card"},(0,e.jsx)("h1",null,U),(0,e.jsx)("p",null,re(Je,He)),(0,e.jsx)("div",{className:"ag-score"},ae(Je)," ",(0,e.jsx)("small",null,V(ae(He)))),(0,e.jsx)("ul",{className:"ag-recap"},Re.map(((t,a)=>(0,e.jsx)("li",{key:a},(0,e.jsx)("span",null,B(a+1)),(0,e.jsx)("span",null,te(t.distance)),(0,e.jsx)("span",null,ae(t.score)," ",T))))),(0,e.jsx)("div",{className:"ag-actions"},(0,e.jsx)("button",{className:"ag-btn ag-btn-primary",disabled:Ae,onClick:()=>se(void 0,void 0,void 0,(function*(){var e;Le(!0),Ee("");try{const t=yield function(e,t,a){const n=1080,o=1400,i=document.createElement("canvas");i.width=n,i.height=o;const s=i.getContext("2d");if(!s)return Promise.reject(new Error("Canvas indisponible"));const c=s.createLinearGradient(0,0,n,o);c.addColorStop(0,r),c.addColorStop(1,"#1b8a6b"),s.fillStyle=c,s.fillRect(0,0,n,o),s.textAlign="center",s.fillStyle=l,s.font=`800 100px ${g}`,s.fillText(x,540,170),s.font=`400 40px ${g}`,s.globalAlpha=.85,s.fillText(J,540,230),s.globalAlpha=1,s.fillStyle="rgba(255,255,255,0.14)",ie(s,90,290,900,400,36),s.fill(),s.fillStyle=l,s.font=`500 48px ${g}`,s.fillText(_,540,370),s.fillStyle=u,s.font=`800 190px ${g}`,s.fillText(t.toLocaleString("fr-FR"),540,550),s.fillStyle=l,s.font=`400 44px ${g}`,s.fillText(V(a.toLocaleString("fr-FR")),540,625);const d=Math.min(100,440/Math.max(e.length,1));let p=740;return e.forEach(((e,t)=>{s.fillStyle="rgba(255,255,255,0.12)",ie(s,90,p,900,d-14,22),s.fill();const a=p+(d-14)/2+15;s.fillStyle=l,s.font=`600 38px ${g}`,s.textAlign="left",s.fillText(B(t+1),130,a),s.textAlign="center",s.font=`400 38px ${g}`,s.fillText(te(e.distance),580,a),s.textAlign="right",s.fillStyle=u,s.font=`700 38px ${g}`,s.fillText(`${e.score.toLocaleString("fr-FR")} ${T}`,950,a),p+=d})),s.textAlign="center",s.fillStyle=l,s.font=`700 46px ${g}`,s.fillText(U,540,1250),s.font=`400 34px ${g}`,s.globalAlpha=.9,function(e,t,a){const r=t.split(" "),n=[];let o="";return r.forEach((t=>{const a=o?`${o} ${t}`:t;e.measureText(a).width>880&&o?(n.push(o),o=t):o=a})),o&&n.push(o),n}(s,re(t,a)).slice(0,2).forEach(((e,t)=>{s.fillText(e,540,1300+44*t)})),s.globalAlpha=1,new Promise(((e,t)=>{i.toBlob((a=>{a?e(a):t(new Error("Impossible de créer l’image"))}),"image/png")}))}(Re,Je,He),a=new File([t],"agglOguessr-score.png",{type:"image/png"}),n=navigator;if(null===(e=n.canShare)||void 0===e?void 0:e.call(n,{files:[a]}))yield n.share({files:[a],title:x,text:D(ae(Je))});else{const e=URL.createObjectURL(t),a=document.createElement("a");a.href=e,a.download="agglOguessr-score.png",document.body.appendChild(a),a.click(),document.body.removeChild(a),setTimeout((()=>URL.revokeObjectURL(e)),2e3),Ee(q)}}catch(e){"AbortError"!==(null==e?void 0:e.name)&&Ee(W)}finally{Le(!1)}}))},Ae?G:F),(0,e.jsx)("button",{className:"ag-btn ag-btn-secondary",onClick:()=>{var e;null===(e=Ge.current)||void 0===e||e.removeAll(),Fe.current=null,Ce([]),ke(0),Pe(!1),Ee(""),be("intro"),Ve()}},O)),Te&&(0,e.jsx)("p",{className:"ag-share-msg"},Te))));return(0,e.jsx)("div",{ref:Ie,className:"jimu-widget widget-agglo-guessr",style:{width:"100%",height:"100%",pointerEvents:We?"auto":"none"}},!De&&(0,e.jsx)(t.JimuMapViewComponent,{useMapWidgetId:null===(c=n.useMapWidgetIds)||void 0===c?void 0:c[0],onActiveViewChange:qe}),We?(0,e.jsx)("div",{style:{padding:12,background:a,color:l,borderRadius:8,fontSize:13,lineHeight:1.5}},(0,e.jsx)("strong",null,Q.title),(0,e.jsx)("br",null),De?Q.mapNotLinked:Q.mapLinked,(0,e.jsx)("br",null),"error"===he?fe:"loading"===he?Q.loading:Q.roundsLoaded(je.length),(0,e.jsx)("br",null),(0,e.jsx)("em",null,Q.previewHint)):e.ReactDOM.createPortal(Ze,document.body))};function he(e){n.p=e}})(),o})())}}}));