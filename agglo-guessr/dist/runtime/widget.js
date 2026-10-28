System.register(["jimu-core","jimu-arcgis"],(function(e,t){var a={},o={};return{setters:[function(e){a.React=e.React,a.ReactDOM=e.ReactDOM,a.css=e.css,a.jsx=e.jsx},function(e){o.JimuMapViewComponent=e.JimuMapViewComponent,o.loadArcGISJSAPIModules=e.loadArcGISJSAPIModules}],execute:function(){e((()=>{var e={826:e=>{"use strict";e.exports=o},891:e=>{"use strict";e.exports=a}},t={};function r(a){var o=t[a];if(void 0!==o)return o.exports;var n=t[a]={exports:{}};return e[a](n,n.exports,r),n.exports}r.d=(e,t)=>{for(var a in t)r.o(t,a)&&!r.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.p="";var n={};return r.p=window.jimuConfig.baseUrl,(()=>{"use strict";r.r(n),r.d(n,{__set_webpack_public_path__:()=>M,default:()=>j});var e=r(891),t=r(826);const a=e.css`
  .ag-root {
    position: fixed;
    inset: 0;
    z-index: 2000;
    pointer-events: none;
    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
    color: #12303a;
  }
  .ag-root * { box-sizing: border-box; }

  .ag-backdrop,
  .ag-header,
  .ag-thumb,
  .ag-bar,
  .ag-result,
  .ag-toast { pointer-events: auto; }

  .ag-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(8, 28, 36, 0.58);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }

  .ag-card {
    background: #fff;
    border-radius: 22px;
    padding: 28px 26px;
    width: min(460px, 100%);
    max-height: 100%;
    overflow-y: auto;
    text-align: center;
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.35);
  }
  .ag-card h1 { margin: 6px 0 10px; font-size: 30px; line-height: 1.1; }
  .ag-card p { margin: 0 0 18px; font-size: 16px; line-height: 1.45; color: #36525c; }
  .ag-logo { font-size: 44px; }

  .ag-btn {
    appearance: none;
    border: 0;
    border-radius: 14px;
    min-height: 50px;
    padding: 0 22px;
    font-size: 17px;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.08s ease, opacity 0.15s ease;
  }
  .ag-btn:active:not(:disabled) { transform: scale(0.97); }
  .ag-btn:disabled { opacity: 0.45; cursor: not-allowed; }
  .ag-btn-primary { background: #0f6b5c; color: #fff; }
  .ag-btn-secondary { background: #e6f1ee; color: #0f4c5c; }
  .ag-btn-block { width: 100%; }

  .ag-header {
    position: absolute;
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.96);
    border-radius: 999px;
    padding: 8px 18px;
    font-size: 15px;
    font-weight: 700;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
    white-space: nowrap;
  }

  .ag-photo-card {
    background: #fff;
    border-radius: 20px;
    padding: 10px;
    max-width: min(980px, 96vw);
    cursor: pointer;
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.45);
  }
  .ag-photo-card img {
    display: block;
    max-width: 100%;
    max-height: 70vh;
    border-radius: 12px;
    margin: 0 auto;
  }
  .ag-photo-hint {
    text-align: center;
    padding: 10px 6px 4px;
    font-weight: 700;
    font-size: 15px;
    color: #0f6b5c;
  }

  .ag-thumb {
    position: absolute;
    top: 64px;
    right: 12px;
    width: 220px;
    padding: 4px;
    border: 0;
    border-radius: 14px;
    background: #fff;
    cursor: pointer;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
  }
  .ag-thumb img {
    display: block;
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 10px;
  }
  .ag-thumb span {
    display: block;
    padding: 4px 0 2px;
    font-size: 12px;
    font-weight: 700;
    color: #0f4c5c;
  }

  .ag-bar,
  .ag-result {
    position: absolute;
    left: 50%;
    bottom: 18px;
    transform: translateX(-50%);
    width: min(540px, calc(100% - 24px));
    background: #fff;
    border-radius: 18px;
    padding: 14px 16px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);
  }
  .ag-bar { display: flex; align-items: center; gap: 14px; }
  .ag-bar-hint { flex: 1; font-size: 14px; color: #36525c; line-height: 1.3; }
  .ag-bar-notice { color: #b42318; font-weight: 600; }

  .ag-result { text-align: center; }
  .ag-result-main { display: flex; align-items: baseline; justify-content: center; gap: 14px; margin-bottom: 6px; }
  .ag-dist { font-size: 34px; font-weight: 800; }
  .ag-pts { font-size: 20px; font-weight: 800; color: #0f6b5c; }
  .ag-place { font-size: 16px; margin-bottom: 4px; }
  .ag-anec { font-size: 14px; color: #36525c; line-height: 1.4; margin-bottom: 6px; }
  .ag-legend { font-size: 12px; color: #5b7680; margin: 4px 0 10px; }
  .ag-dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin: 0 4px 0 10px; vertical-align: middle; }
  .ag-dot-guess { background: #2563eb; }
  .ag-dot-truth { background: #16a34a; }

  .ag-toast {
    position: absolute;
    left: 50%;
    bottom: 24px;
    transform: translateX(-50%);
    background: #fff;
    border-radius: 14px;
    padding: 12px 18px;
    font-weight: 600;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.3);
    max-width: calc(100% - 24px);
    text-align: center;
  }
  .ag-toast-error { background: #fee4e2; color: #b42318; }

  .ag-score { font-size: 64px; font-weight: 800; color: #0f6b5c; line-height: 1; margin: 6px 0 14px; }
  .ag-score small { font-size: 20px; font-weight: 600; color: #5b7680; }
  .ag-recap { list-style: none; margin: 0 0 18px; padding: 0; text-align: left; }
  .ag-recap li {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 8px 12px;
    border-radius: 10px;
    font-size: 15px;
  }
  .ag-recap li:nth-of-type(odd) { background: #f1f7f5; }
  .ag-recap li span:last-of-type { font-weight: 700; color: #0f6b5c; }
  .ag-actions { display: flex; flex-direction: column; gap: 10px; }
  .ag-share-msg { margin: 12px 0 0 !important; font-size: 13px !important; }

  @media (max-width: 640px) {
    .ag-header { top: 8px; font-size: 14px; padding: 7px 14px; }
    .ag-thumb { top: 54px; right: 8px; width: 116px; }
    .ag-thumb img { height: 84px; }
    .ag-thumb span { font-size: 11px; }
    .ag-bar, .ag-result {
      bottom: 0;
      width: 100%;
      border-radius: 20px 20px 0 0;
      padding: 14px 16px calc(14px + env(safe-area-inset-bottom));
    }
    .ag-bar .ag-btn { min-width: 128px; }
    .ag-dist { font-size: 30px; }
    .ag-photo-card img { max-height: 62vh; }
    .ag-card { padding: 22px 18px; }
    .ag-score { font-size: 54px; }
  }
`;const o=5e3;function i(e,t,a){return new Promise(((o,r)=>{const n=setTimeout((()=>r(new Error(a))),t);e.then((e=>{clearTimeout(n),o(e)}),(e=>{clearTimeout(n),r(e)}))}))}const l=6378137,s=Math.PI/180;function c(e,t,a){const o=Math.min(1,t/Math.max(e.naturalWidth,e.naturalHeight)),r=document.createElement("canvas");r.width=Math.max(1,Math.round(e.naturalWidth*o)),r.height=Math.max(1,Math.round(e.naturalHeight*o));const n=r.getContext("2d");return n?(n.drawImage(e,0,0,r.width,r.height),new Promise(((e,t)=>{r.toBlob((a=>{a?e(URL.createObjectURL(a)):t(new Error("Réduction impossible"))}),"image/jpeg",a)}))):Promise.reject(new Error("Canvas indisponible"))}function d(e){return t=this,a=void 0,r=function*(){try{const t=yield function(e){return new Promise(((t,a)=>{const o=new Image;o.crossOrigin="anonymous",o.onload=()=>t(o),o.onerror=()=>a(new Error("Image illisible")),o.src=e}))}(e);return{photoUrl:yield c(t,1600,.85),thumbUrl:yield c(t,480,.8)}}catch(t){return{photoUrl:e,thumbUrl:e}}},new((o=void 0)||(o=Promise))((function(e,n){function i(e){try{s(r.next(e))}catch(e){n(e)}}function l(e){try{s(r.throw(e))}catch(e){n(e)}}function s(t){var a;t.done?e(t.value):(a=t.value,a instanceof o?a:new o((function(e){e(a)}))).then(i,l)}s((r=r.apply(t,a||[])).next())}));var t,a,o,r}function g(e){return e<1e3?`${Math.round(e).toLocaleString("fr-FR")} m`:`${(e/1e3).toLocaleString("fr-FR",{maximumFractionDigits:1})} km`}function u(e){return e.toLocaleString("fr-FR")}function p(e,t){const a=t>0?e/t:0;return a>=.8?"Impressionnant, vous connaissez l’agglo comme votre poche !":a>=.5?"Beau parcours, vous êtes un vrai connaisseur du territoire !":a>=.25?"Pas mal du tout, l’agglo n’a presque plus de secrets pour vous !":"Merci d’avoir joué, il y a encore de belles choses à découvrir autour de vous !"}function x(e,t,a,o,r,n){e.beginPath(),e.moveTo(t+n,a),e.arcTo(t+o,a,t+o,a+r,n),e.arcTo(t+o,a+r,t,a+r,n),e.arcTo(t,a+r,t,a,n),e.arcTo(t,a,t+o,a,n),e.closePath()}var f=function(e,t,a,o){return new(a||(a=Promise))((function(r,n){function i(e){try{s(o.next(e))}catch(e){n(e)}}function l(e){try{s(o.throw(e))}catch(e){n(e)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(i,l)}s((o=o.apply(e,t||[])).next())}))};const m={type:"simple-marker",style:"circle",color:[37,99,235,1],size:16,outline:{color:[255,255,255,1],width:2.5}},h={type:"simple-marker",style:"circle",color:[22,163,74,1],size:18,outline:{color:[255,255,255,1],width:2.5}},b={type:"simple-line",color:[30,41,59,.9],width:2.5,style:"dash"},{useState:v,useEffect:y,useRef:w}=e.React,j=r=>{var n,c,j,M;const{config:k}=r,[S,z]=v(null),[R,N]=v(!1),[A,P]=v("loading"),[C,I]=v(""),[T,L]=v(""),[O,U]=v([]),[F,E]=v(0),[G,$]=v(!0),[W,_]=v(!1),[J,D]=v([]),[V,B]=v(!1),[q,H]=v(""),X=w(null),Q=w(null),K=w(null),Y=w(null),Z=e.React.useCallback((e=>z(e)),[]),ee=!!(null===(n=window.jimuConfig)||void 0===n?void 0:n.isInBuilder),te=0===(null!==(j=null===(c=r.useMapWidgetIds)||void 0===c?void 0:c.length)&&void 0!==j?j:0),ae=!!(null==S?void 0:S.view)&&R;y((()=>{let e=!1;return P("loading"),I(""),k.layerUrl?(f(void 0,void 0,void 0,(function*(){var a;try{const[a,o,r,n,l,s]=yield i((0,t.loadArcGISJSAPIModules)(["esri/layers/FeatureLayer","esri/Graphic","esri/layers/GraphicsLayer","esri/geometry/Point","esri/geometry/Polyline","esri/geometry/Extent"]),2e4,"Impossible de charger les modules ArcGIS (version de l’API incompatible ?).");if(e)return;X.current={FeatureLayer:a,Graphic:o,GraphicsLayer:r,Point:n,Polyline:l,Extent:s},N(!0);const c=new a({url:k.layerUrl});yield i(c.load(),25e3,"La couche ne répond pas : vérifiez l’URL et le partage de la couche.");const g=c.createQuery();g.where="1=1",g.outFields=["*"],g.returnGeometry=!0,g.outSpatialReference={wkid:4326};const u=yield i(c.queryFeatures(g),25e3,"La couche ne renvoie pas ses points : vérifiez son partage."),p=c.objectIdField,x=u.features.filter((e=>!!e.geometry)).sort(((e,t)=>(Number(e.attributes[k.orderField])||0)-(Number(t.attributes[k.orderField])||0))).slice(0,k.maxRounds||5),m=x.map((e=>e.attributes[p])),h=m.length>0?yield c.queryAttachments({objectIds:m}):{},b=x.map((e=>{var t,a,o,r,n;const i=null!==(t=h[e.attributes[p]])&&void 0!==t?t:[],l=null!==(a=i.find((e=>{var t;return(null!==(t=e.contentType)&&void 0!==t?t:"").startsWith("image/")})))&&void 0!==a?a:i[0];return{objectId:e.attributes[p],order:Number(e.attributes[k.orderField])||0,name:String(null!==(o=e.attributes[k.nameField])&&void 0!==o?o:""),anecdote:String(null!==(r=e.attributes[k.anecdoteField])&&void 0!==r?r:""),photoUrl:null!==(n=null==l?void 0:l.url)&&void 0!==n?n:"",thumbUrl:"",x:e.geometry.x,y:e.geometry.y}})).filter((e=>""!==e.photoUrl));if(e)return;if(0===b.length)throw new Error("Aucune manche trouvée : vérifiez que la couche contient des points avec une photo jointe.");const v=yield Promise.all(b.map((e=>f(void 0,void 0,void 0,(function*(){return Object.assign(Object.assign({},e),yield d(e.photoUrl))})))));if(e)return;U(v),D([]),E(0),P("intro")}catch(t){if(e)return;I(String(null!==(a=null==t?void 0:t.message)&&void 0!==a?a:t)),P("error")}})),()=>{e=!0}):(P("error"),void I("Renseignez l’URL de la couche dans les paramètres du widget."))}),[k.layerUrl,k.orderField,k.nameField,k.anecdoteField,k.maxRounds]),y((()=>{const e=null==S?void 0:S.view,t=X.current;if(!e||!t||!R)return;const a=new t.GraphicsLayer({listMode:"hide"});return e.map.add(a),K.current=a,e.when((()=>{Y.current=e.viewpoint.clone()})),()=>{e.map.remove(a),K.current=null}}),[S,R]),y((()=>{const e=null==S?void 0:S.view,t=X.current;if(!e||!t||!R||"playing"!==A)return;const a=e.popupEnabled;e.popupEnabled=!1;const o=e.on("immediate-click",(e=>{e.stopPropagation();const a=K.current;a&&(Q.current=e.mapPoint,a.removeAll(),a.add(new t.Graphic({geometry:e.mapPoint,symbol:m})),_(!0),L(""))}));return()=>{o.remove(),e.popupEnabled=a}}),[S,R,A]);const oe=()=>{const e=null==S?void 0:S.view;e&&Y.current&&e.goTo(Y.current,{animate:!1}).catch((()=>{}))},re=e=>{var t;null===(t=K.current)||void 0===t||t.removeAll(),Q.current=null,_(!1),L(""),E(e),$(!0),P("playing"),oe()},ne=J.reduce(((e,t)=>e+t.score),0),ie=O.length*o,le=O[F],se=J[J.length-1],ce=G&&("playing"===A||"result"===A)&&!!le,de=!(G||"playing"!==A&&"result"!==A||!le),ge=(0,e.jsx)("div",{className:"ag-root",css:a},"loading"===A&&(0,e.jsx)("div",{className:"ag-toast"},"Chargement d’AgglOguessr…"),"error"===A&&(0,e.jsx)("div",{className:"ag-toast ag-toast-error"},C),"intro"===A&&(0,e.jsx)("div",{className:"ag-backdrop"},(0,e.jsx)("div",{className:"ag-card"},(0,e.jsx)("div",{className:"ag-logo"},"📍"),(0,e.jsx)("h1",null,"AgglOguessr"),(0,e.jsx)("p",null,O.length," lieux de l’agglomération montargoise à retrouver. Observez la photo, placez votre pari sur la carte et gagnez des points selon votre précision."),(0,e.jsx)("button",{className:"ag-btn ag-btn-primary ag-btn-block",disabled:!ae,onClick:()=>re(0)},te?"Carte non configurée":ae?"Jouer":"Chargement de la carte…"))),("playing"===A||"result"===A)&&(0,e.jsx)("div",{className:"ag-header"},"Manche ",F+1,"/",O.length," · ",u(ne)," pts"),ce&&(0,e.jsx)("div",{className:"ag-backdrop",onClick:()=>$(!1)},(0,e.jsx)("div",{className:"ag-photo-card"},(0,e.jsx)("img",{src:le.photoUrl,alt:"Où cette photo a-t-elle été prise ?",decoding:"async"}),(0,e.jsx)("div",{className:"ag-photo-hint"},"Touchez pour afficher la carte"))),de&&(0,e.jsx)("button",{className:"ag-thumb",onClick:()=>$(!0),"aria-label":"Agrandir la photo"},(0,e.jsx)("img",{src:le.thumbUrl,alt:"Photo à retrouver",decoding:"async"}),(0,e.jsx)("span",null,"🔍 Agrandir")),"playing"===A&&!G&&(0,e.jsx)("div",{className:"ag-bar"},(0,e.jsx)("div",{className:"ag-bar-hint"+(T?" ag-bar-notice":"")},T||(W?"Vous pouvez déplacer votre pari.":"Touchez la carte pour placer votre pari.")),(0,e.jsx)("button",{className:"ag-btn ag-btn-primary",disabled:!W,onClick:()=>{var e;const t=null==S?void 0:S.view,a=X.current,r=K.current,n=Q.current,i=O[F];if(t&&a&&r&&n&&i)try{const e=t.spatialReference,c=function(e,t,a){return(null==a?void 0:a.isWebMercator)?{lon:e/l/s,lat:(2*Math.atan(Math.exp(t/l))-Math.PI/2)/s}:(null==a?void 0:a.isWGS84)||4326===(null==a?void 0:a.wkid)?{lon:e,lat:t}:null}(n.x,n.y,e),d=function(e,t,a){return(null==a?void 0:a.isWebMercator)?{x:e*s*l,y:Math.log(Math.tan(Math.PI/4+t*s/2))*l}:(null==a?void 0:a.isWGS84)||4326===(null==a?void 0:a.wkid)?{x:e,y:t}:null}(i.x,i.y,e);if(!c||!d)throw new Error("système de coordonnées de la carte non pris en charge (utilisez une carte en Web Mercator ou WGS84).");const g=function(e,t,a,o){const r=(t+o)/2*s,n=111132.92-559.82*Math.cos(2*r)+1.175*Math.cos(4*r),i=111412.84*Math.cos(r)-93.5*Math.cos(3*r)+.118*Math.cos(5*r);return Math.hypot((a-e)*i,(o-t)*n)}(c.lon,c.lat,i.x,i.y),u=function(e,t,a){if(e<=t)return o;if(a<=t||e>=a)return 0;const r=(e-t)/(a-t);return Math.round(o*(1-r)*(1-r))}(g,k.perfectDistance,k.maxDistance),p=new a.Point({x:d.x,y:d.y,spatialReference:e});r.add(new a.Graphic({geometry:new a.Polyline({paths:[[[n.x,n.y],[p.x,p.y]]],spatialReference:t.spatialReference}),symbol:b})),r.add(new a.Graphic({geometry:p,symbol:h}));const x=Math.min(n.x,p.x),f=Math.max(n.x,p.x),m=Math.min(n.y,p.y),v=Math.max(n.y,p.y),y=t.spatialReference.isGeographic?.004:400,w=(x+f)/2,j=(m+v)/2,M=Math.max(1.8*(f-x),y),S=Math.max(1.8*(v-m),y),z=new a.Extent({xmin:w-M/2,xmax:w+M/2,ymin:j-S/2-.35*S,ymax:j+S/2,spatialReference:t.spatialReference});t.goTo(z,{duration:900}).catch((()=>{})),D((e=>[...e,{distance:g,score:u}])),$(!1),P("result")}catch(t){L("Calcul impossible : "+String(null!==(e=null==t?void 0:t.message)&&void 0!==e?e:t))}}},"Deviner")),"result"===A&&!G&&se&&le&&(0,e.jsx)("div",{className:"ag-result"},(0,e.jsx)("div",{className:"ag-result-main"},(0,e.jsx)("span",{className:"ag-dist"},g(se.distance)),(0,e.jsx)("span",{className:"ag-pts"},"+",u(se.score)," pts")),le.name&&(0,e.jsx)("div",{className:"ag-place"},"C’était : ",(0,e.jsx)("strong",null,le.name)),le.anecdote&&(0,e.jsx)("div",{className:"ag-anec"},le.anecdote),(0,e.jsx)("div",{className:"ag-legend"},(0,e.jsx)("span",{className:"ag-dot ag-dot-guess"}),"Votre pari",(0,e.jsx)("span",{className:"ag-dot ag-dot-truth"}),"Le vrai lieu"),(0,e.jsx)("button",{className:"ag-btn ag-btn-primary ag-btn-block",onClick:()=>{var e;F+1>=O.length?(null===(e=K.current)||void 0===e||e.removeAll(),H(""),P("final"),oe()):re(F+1)}},F+1>=O.length?"Voir mon score":"Manche suivante")),"final"===A&&(0,e.jsx)("div",{className:"ag-backdrop"},(0,e.jsx)("div",{className:"ag-card"},(0,e.jsx)("div",{className:"ag-logo"},"🎉"),(0,e.jsx)("h1",null,"Bravo !"),(0,e.jsx)("p",null,p(ne,ie)),(0,e.jsx)("div",{className:"ag-score"},u(ne)," ",(0,e.jsx)("small",null,"/ ",u(ie))),(0,e.jsx)("ul",{className:"ag-recap"},J.map(((t,a)=>(0,e.jsx)("li",{key:a},(0,e.jsx)("span",null,"Manche ",a+1),(0,e.jsx)("span",null,g(t.distance)),(0,e.jsx)("span",null,u(t.score)," pts"))))),(0,e.jsx)("div",{className:"ag-actions"},(0,e.jsx)("button",{className:"ag-btn ag-btn-primary",disabled:V,onClick:()=>f(void 0,void 0,void 0,(function*(){var e;B(!0),H("");try{const t=yield function(e,t,a){const o=1080,r=1350,n=document.createElement("canvas");n.width=o,n.height=r;const i=n.getContext("2d");if(!i)return Promise.reject(new Error("Canvas indisponible"));const l='system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',s=i.createLinearGradient(0,0,o,r);s.addColorStop(0,"#0f4c5c"),s.addColorStop(1,"#1b8a6b"),i.fillStyle=s,i.fillRect(0,0,o,r),i.textAlign="center",i.fillStyle="#ffffff",i.font=`800 100px ${l}`,i.fillText("AgglOguessr",540,170),i.font=`400 40px ${l}`,i.globalAlpha=.85,i.fillText("Agglomération montargoise",540,230),i.globalAlpha=1,i.fillStyle="rgba(255,255,255,0.14)",x(i,90,290,900,400,36),i.fill(),i.fillStyle="#ffffff",i.font=`500 48px ${l}`,i.fillText("Mon score",540,370),i.fillStyle="#ffd166",i.font=`800 190px ${l}`,i.fillText(t.toLocaleString("fr-FR"),540,550),i.fillStyle="#ffffff",i.font=`400 44px ${l}`,i.fillText(`sur ${a.toLocaleString("fr-FR")} points`,540,625);const c=Math.min(100,440/Math.max(e.length,1));let d=740;return e.forEach(((e,t)=>{i.fillStyle="rgba(255,255,255,0.12)",x(i,90,d,900,c-14,22),i.fill();const a=d+(c-14)/2+15;i.fillStyle="#ffffff",i.font=`600 38px ${l}`,i.textAlign="left",i.fillText(`Manche ${t+1}`,130,a),i.textAlign="center",i.font=`400 38px ${l}`,i.fillText(g(e.distance),580,a),i.textAlign="right",i.fillStyle="#ffd166",i.font=`700 38px ${l}`,i.fillText(`${e.score.toLocaleString("fr-FR")} pts`,950,a),d+=c})),i.textAlign="center",i.fillStyle="#ffffff",i.font=`700 46px ${l}`,i.fillText("Bravo !",540,1235),i.font=`400 34px ${l}`,i.globalAlpha=.9,i.fillText(p(t,a).slice(0,62),540,1285),i.globalAlpha=1,new Promise(((e,t)=>{n.toBlob((a=>{a?e(a):t(new Error("Impossible de créer l’image"))}),"image/png")}))}(J,ne,ie),a=new File([t],"agglOguessr-score.png",{type:"image/png"}),o=navigator;if(null===(e=o.canShare)||void 0===e?void 0:e.call(o,{files:[a]}))yield o.share({files:[a],title:"AgglOguessr",text:`J’ai fait ${u(ne)} points sur AgglOguessr !`});else{const e=URL.createObjectURL(t),a=document.createElement("a");a.href=e,a.download="agglOguessr-score.png",document.body.appendChild(a),a.click(),document.body.removeChild(a),setTimeout((()=>URL.revokeObjectURL(e)),2e3),H("Image enregistrée dans vos téléchargements.")}}catch(e){"AbortError"!==(null==e?void 0:e.name)&&H("Impossible de créer l’image de score.")}finally{B(!1)}}))},V?"Création de l’image…":"Partager mon score"),(0,e.jsx)("button",{className:"ag-btn ag-btn-secondary",onClick:()=>{var e;null===(e=K.current)||void 0===e||e.removeAll(),Q.current=null,D([]),E(0),_(!1),H(""),P("intro"),oe()}},"Rejouer")),q&&(0,e.jsx)("p",{className:"ag-share-msg"},q))));return(0,e.jsx)("div",{className:"jimu-widget widget-agglo-guessr",style:{width:"100%",height:"100%"}},!te&&(0,e.jsx)(t.JimuMapViewComponent,{useMapWidgetId:null===(M=r.useMapWidgetIds)||void 0===M?void 0:M[0],onActiveViewChange:Z}),ee?(0,e.jsx)("div",{style:{padding:12,background:"#0f6b5c",color:"#fff",borderRadius:8,fontSize:13,lineHeight:1.5}},(0,e.jsx)("strong",null,"AgglOguessr"),(0,e.jsx)("br",null),te?"⚠ Choisissez une carte dans les paramètres.":"✓ Carte liée",(0,e.jsx)("br",null),"error"===A?"⚠ "+C:"loading"===A?"Chargement des données…":`✓ ${O.length} manche(s) chargée(s)`,(0,e.jsx)("br",null),(0,e.jsx)("em",null,"Le jeu s’affiche en mode Aperçu ou une fois publié.")):e.ReactDOM.createPortal(ge,document.body))};function M(e){r.p=e}})(),n})())}}}));