System.register(["jimu-core","jimu-arcgis"],(function(e,t){var a={},r={};return{setters:[function(e){a.React=e.React,a.ReactDOM=e.ReactDOM,a.css=e.css,a.jsx=e.jsx},function(e){r.JimuMapViewComponent=e.JimuMapViewComponent,r.loadArcGISJSAPIModules=e.loadArcGISJSAPIModules}],execute:function(){e((()=>{var e={826:e=>{"use strict";e.exports=r},891:e=>{"use strict";e.exports=a}},t={};function o(a){var r=t[a];if(void 0!==r)return r.exports;var n=t[a]={exports:{}};return e[a](n,n.exports,o),n.exports}o.d=(e,t)=>{for(var a in t)o.o(t,a)&&!o.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.p="";var n={};return o.p=window.jimuConfig.baseUrl,(()=>{"use strict";o.r(n),o.d(n,{__set_webpack_public_path__:()=>y,default:()=>v});var e=o(891),t=o(826);const a=e.css`
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
`;const r=5e3;function i(e,t,a){const r=Math.min(1,t/Math.max(e.naturalWidth,e.naturalHeight)),o=document.createElement("canvas");o.width=Math.max(1,Math.round(e.naturalWidth*r)),o.height=Math.max(1,Math.round(e.naturalHeight*r));const n=o.getContext("2d");return n?(n.drawImage(e,0,0,o.width,o.height),new Promise(((e,t)=>{o.toBlob((a=>{a?e(URL.createObjectURL(a)):t(new Error("Réduction impossible"))}),"image/jpeg",a)}))):Promise.reject(new Error("Canvas indisponible"))}function l(e){return t=this,a=void 0,o=function*(){try{const t=yield function(e){return new Promise(((t,a)=>{const r=new Image;r.crossOrigin="anonymous",r.onload=()=>t(r),r.onerror=()=>a(new Error("Image illisible")),r.src=e}))}(e);return{photoUrl:yield i(t,1600,.85),thumbUrl:yield i(t,480,.8)}}catch(t){return{photoUrl:e,thumbUrl:e}}},new((r=void 0)||(r=Promise))((function(e,n){function i(e){try{s(o.next(e))}catch(e){n(e)}}function l(e){try{s(o.throw(e))}catch(e){n(e)}}function s(t){var a;t.done?e(t.value):(a=t.value,a instanceof r?a:new r((function(e){e(a)}))).then(i,l)}s((o=o.apply(t,a||[])).next())}));var t,a,r,o}function s(e){return e<1e3?`${Math.round(e).toLocaleString("fr-FR")} m`:`${(e/1e3).toLocaleString("fr-FR",{maximumFractionDigits:1})} km`}function c(e){return e.toLocaleString("fr-FR")}function d(e,t){const a=t>0?e/t:0;return a>=.8?"Impressionnant, vous connaissez l’agglo comme votre poche !":a>=.5?"Beau parcours, vous êtes un vrai connaisseur du territoire !":a>=.25?"Pas mal du tout, l’agglo n’a presque plus de secrets pour vous !":"Merci d’avoir joué, il y a encore de belles choses à découvrir autour de vous !"}function p(e,t,a,r,o,n){e.beginPath(),e.moveTo(t+n,a),e.arcTo(t+r,a,t+r,a+o,n),e.arcTo(t+r,a+o,t,a+o,n),e.arcTo(t,a+o,t,a,n),e.arcTo(t,a,t+r,a,n),e.closePath()}var g=function(e,t,a,r){return new(a||(a=Promise))((function(o,n){function i(e){try{s(r.next(e))}catch(e){n(e)}}function l(e){try{s(r.throw(e))}catch(e){n(e)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(i,l)}s((r=r.apply(e,t||[])).next())}))};const u={type:"simple-marker",style:"circle",color:[37,99,235,1],size:16,outline:{color:[255,255,255,1],width:2.5}},x={type:"simple-marker",style:"circle",color:[22,163,74,1],size:18,outline:{color:[255,255,255,1],width:2.5}},f={type:"simple-line",color:[30,41,59,.9],width:2.5,style:"dash"},{useState:m,useEffect:h,useRef:b}=e.React,v=o=>{var n,i,v,y;const{config:w}=o,[j,k]=m(null),[S,R]=m(!1),[M,N]=m("loading"),[z,A]=m(""),[C,P]=m(""),[O,T]=m([]),[U,I]=m(0),[F,L]=m(!0),[E,$]=m(!1),[G,_]=m([]),[J,D]=m(!1),[V,B]=m(""),W=b(null),q=b(null),H=b(null),X=b(null),Q=e.React.useCallback((e=>k(e)),[]),K=!!(null===(n=window.jimuConfig)||void 0===n?void 0:n.isInBuilder),Y=0===(null!==(v=null===(i=o.useMapWidgetIds)||void 0===i?void 0:i.length)&&void 0!==v?v:0),Z=!!(null==j?void 0:j.view)&&S;h((()=>{let e=!1;return N("loading"),A(""),w.layerUrl?(g(void 0,void 0,void 0,(function*(){var a;try{const[a,r,o,n,i,s,c,d]=yield(0,t.loadArcGISJSAPIModules)(["esri/layers/FeatureLayer","esri/geometry/SpatialReference","esri/geometry/operators/projectOperator","esri/Graphic","esri/layers/GraphicsLayer","esri/geometry/Point","esri/geometry/Polyline","esri/geometry/Extent"]);if(yield o.load(),e)return;W.current={FeatureLayer:a,SpatialReference:r,projectOperator:o,Graphic:n,GraphicsLayer:i,Point:s,Polyline:c,Extent:d},R(!0);const p=new a({url:w.layerUrl});yield p.load();const u=p.createQuery();u.where="1=1",u.outFields=["*"],u.returnGeometry=!0,u.outSpatialReference=new r({wkid:2154});const x=yield p.queryFeatures(u),f=p.objectIdField,m=x.features.filter((e=>!!e.geometry)).sort(((e,t)=>(Number(e.attributes[w.orderField])||0)-(Number(t.attributes[w.orderField])||0))).slice(0,w.maxRounds||5),h=m.map((e=>e.attributes[f])),b=h.length>0?yield p.queryAttachments({objectIds:h}):{},v=m.map((e=>{var t,a,r,o,n;const i=null!==(t=b[e.attributes[f]])&&void 0!==t?t:[],l=null!==(a=i.find((e=>{var t;return(null!==(t=e.contentType)&&void 0!==t?t:"").startsWith("image/")})))&&void 0!==a?a:i[0];return{objectId:e.attributes[f],order:Number(e.attributes[w.orderField])||0,name:String(null!==(r=e.attributes[w.nameField])&&void 0!==r?r:""),anecdote:String(null!==(o=e.attributes[w.anecdoteField])&&void 0!==o?o:""),photoUrl:null!==(n=null==l?void 0:l.url)&&void 0!==n?n:"",thumbUrl:"",x:e.geometry.x,y:e.geometry.y}})).filter((e=>""!==e.photoUrl));if(e)return;if(0===v.length)throw new Error("Aucune manche trouvée : vérifiez que la couche contient des points avec une photo jointe.");const y=yield Promise.all(v.map((e=>g(void 0,void 0,void 0,(function*(){return Object.assign(Object.assign({},e),yield l(e.photoUrl))})))));if(e)return;T(y),_([]),I(0),N("intro")}catch(t){if(e)return;A(String(null!==(a=null==t?void 0:t.message)&&void 0!==a?a:t)),N("error")}})),()=>{e=!0}):(N("error"),void A("Renseignez l’URL de la couche dans les paramètres du widget."))}),[w.layerUrl,w.orderField,w.nameField,w.anecdoteField,w.maxRounds]),h((()=>{const e=null==j?void 0:j.view,t=W.current;if(!e||!t||!S)return;const a=new t.GraphicsLayer({listMode:"hide"});return e.map.add(a),H.current=a,e.when((()=>{X.current=e.viewpoint.clone()})),()=>{e.map.remove(a),H.current=null}}),[j,S]),h((()=>{const e=null==j?void 0:j.view,t=W.current;if(!e||!t||!S||"playing"!==M)return;const a=e.popupEnabled;e.popupEnabled=!1;const r=e.on("immediate-click",(e=>{e.stopPropagation();const a=H.current;a&&(q.current=e.mapPoint,a.removeAll(),a.add(new t.Graphic({geometry:e.mapPoint,symbol:u})),$(!0),P(""))}));return()=>{r.remove(),e.popupEnabled=a}}),[j,S,M]);const ee=()=>{const e=null==j?void 0:j.view;e&&X.current&&e.goTo(X.current,{animate:!1}).catch((()=>{}))},te=e=>{var t;null===(t=H.current)||void 0===t||t.removeAll(),q.current=null,$(!1),P(""),I(e),L(!0),N("playing"),ee()},ae=G.reduce(((e,t)=>e+t.score),0),re=O.length*r,oe=O[U],ne=G[G.length-1],ie=F&&("playing"===M||"result"===M)&&!!oe,le=!(F||"playing"!==M&&"result"!==M||!oe),se=(0,e.jsx)("div",{className:"ag-root",css:a},"loading"===M&&(0,e.jsx)("div",{className:"ag-toast"},"Chargement d’AgglOguessr…"),"error"===M&&(0,e.jsx)("div",{className:"ag-toast ag-toast-error"},z),"intro"===M&&(0,e.jsx)("div",{className:"ag-backdrop"},(0,e.jsx)("div",{className:"ag-card"},(0,e.jsx)("div",{className:"ag-logo"},"📍"),(0,e.jsx)("h1",null,"AgglOguessr"),(0,e.jsx)("p",null,O.length," lieux de l’agglomération montargoise à retrouver. Observez la photo, placez votre pari sur la carte et gagnez des points selon votre précision."),(0,e.jsx)("button",{className:"ag-btn ag-btn-primary ag-btn-block",disabled:!Z,onClick:()=>te(0)},Y?"Carte non configurée":Z?"Jouer":"Chargement de la carte…"))),("playing"===M||"result"===M)&&(0,e.jsx)("div",{className:"ag-header"},"Manche ",U+1,"/",O.length," · ",c(ae)," pts"),ie&&(0,e.jsx)("div",{className:"ag-backdrop",onClick:()=>L(!1)},(0,e.jsx)("div",{className:"ag-photo-card"},(0,e.jsx)("img",{src:oe.photoUrl,alt:"Où cette photo a-t-elle été prise ?",decoding:"async"}),(0,e.jsx)("div",{className:"ag-photo-hint"},"Touchez pour afficher la carte"))),le&&(0,e.jsx)("button",{className:"ag-thumb",onClick:()=>L(!0),"aria-label":"Agrandir la photo"},(0,e.jsx)("img",{src:oe.thumbUrl,alt:"Photo à retrouver",decoding:"async"}),(0,e.jsx)("span",null,"🔍 Agrandir")),"playing"===M&&!F&&(0,e.jsx)("div",{className:"ag-bar"},(0,e.jsx)("div",{className:"ag-bar-hint"+(C?" ag-bar-notice":"")},C||(E?"Vous pouvez déplacer votre pari.":"Touchez la carte pour placer votre pari.")),(0,e.jsx)("button",{className:"ag-btn ag-btn-primary",disabled:!E,onClick:()=>{var e;const t=null==j?void 0:j.view,a=W.current,o=H.current,n=q.current,i=O[U];if(t&&a&&o&&n&&i)try{const e=new a.SpatialReference({wkid:2154}),l=a.projectOperator.execute(n,e),s=Math.hypot(l.x-i.x,l.y-i.y),c=function(e,t,a){if(e<=t)return r;if(a<=t||e>=a)return 0;const o=(e-t)/(a-t);return Math.round(r*(1-o)*(1-o))}(s,w.perfectDistance,w.maxDistance),d=new a.Point({x:i.x,y:i.y,spatialReference:e}),p=a.projectOperator.execute(d,t.spatialReference);o.add(new a.Graphic({geometry:new a.Polyline({paths:[[[n.x,n.y],[p.x,p.y]]],spatialReference:t.spatialReference}),symbol:f})),o.add(new a.Graphic({geometry:p,symbol:x}));const g=Math.min(n.x,p.x),u=Math.max(n.x,p.x),m=Math.min(n.y,p.y),h=Math.max(n.y,p.y),b=t.spatialReference.isGeographic?.004:400,v=(g+u)/2,y=(m+h)/2,j=Math.max(1.8*(u-g),b),k=Math.max(1.8*(h-m),b),S=new a.Extent({xmin:v-j/2,xmax:v+j/2,ymin:y-k/2-.35*k,ymax:y+k/2,spatialReference:t.spatialReference});t.goTo(S,{duration:900}).catch((()=>{})),_((e=>[...e,{distance:s,score:c}])),L(!1),N("result")}catch(t){P("Calcul impossible : "+String(null!==(e=null==t?void 0:t.message)&&void 0!==e?e:t))}}},"Deviner")),"result"===M&&!F&&ne&&oe&&(0,e.jsx)("div",{className:"ag-result"},(0,e.jsx)("div",{className:"ag-result-main"},(0,e.jsx)("span",{className:"ag-dist"},s(ne.distance)),(0,e.jsx)("span",{className:"ag-pts"},"+",c(ne.score)," pts")),oe.name&&(0,e.jsx)("div",{className:"ag-place"},"C’était : ",(0,e.jsx)("strong",null,oe.name)),oe.anecdote&&(0,e.jsx)("div",{className:"ag-anec"},oe.anecdote),(0,e.jsx)("div",{className:"ag-legend"},(0,e.jsx)("span",{className:"ag-dot ag-dot-guess"}),"Votre pari",(0,e.jsx)("span",{className:"ag-dot ag-dot-truth"}),"Le vrai lieu"),(0,e.jsx)("button",{className:"ag-btn ag-btn-primary ag-btn-block",onClick:()=>{var e;U+1>=O.length?(null===(e=H.current)||void 0===e||e.removeAll(),B(""),N("final"),ee()):te(U+1)}},U+1>=O.length?"Voir mon score":"Manche suivante")),"final"===M&&(0,e.jsx)("div",{className:"ag-backdrop"},(0,e.jsx)("div",{className:"ag-card"},(0,e.jsx)("div",{className:"ag-logo"},"🎉"),(0,e.jsx)("h1",null,"Bravo !"),(0,e.jsx)("p",null,d(ae,re)),(0,e.jsx)("div",{className:"ag-score"},c(ae)," ",(0,e.jsx)("small",null,"/ ",c(re))),(0,e.jsx)("ul",{className:"ag-recap"},G.map(((t,a)=>(0,e.jsx)("li",{key:a},(0,e.jsx)("span",null,"Manche ",a+1),(0,e.jsx)("span",null,s(t.distance)),(0,e.jsx)("span",null,c(t.score)," pts"))))),(0,e.jsx)("div",{className:"ag-actions"},(0,e.jsx)("button",{className:"ag-btn ag-btn-primary",disabled:J,onClick:()=>g(void 0,void 0,void 0,(function*(){var e;D(!0),B("");try{const t=yield function(e,t,a){const r=1080,o=1350,n=document.createElement("canvas");n.width=r,n.height=o;const i=n.getContext("2d");if(!i)return Promise.reject(new Error("Canvas indisponible"));const l='system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',c=i.createLinearGradient(0,0,r,o);c.addColorStop(0,"#0f4c5c"),c.addColorStop(1,"#1b8a6b"),i.fillStyle=c,i.fillRect(0,0,r,o),i.textAlign="center",i.fillStyle="#ffffff",i.font=`800 100px ${l}`,i.fillText("AgglOguessr",540,170),i.font=`400 40px ${l}`,i.globalAlpha=.85,i.fillText("Agglomération montargoise",540,230),i.globalAlpha=1,i.fillStyle="rgba(255,255,255,0.14)",p(i,90,290,900,400,36),i.fill(),i.fillStyle="#ffffff",i.font=`500 48px ${l}`,i.fillText("Mon score",540,370),i.fillStyle="#ffd166",i.font=`800 190px ${l}`,i.fillText(t.toLocaleString("fr-FR"),540,550),i.fillStyle="#ffffff",i.font=`400 44px ${l}`,i.fillText(`sur ${a.toLocaleString("fr-FR")} points`,540,625);const g=Math.min(100,440/Math.max(e.length,1));let u=740;return e.forEach(((e,t)=>{i.fillStyle="rgba(255,255,255,0.12)",p(i,90,u,900,g-14,22),i.fill();const a=u+(g-14)/2+15;i.fillStyle="#ffffff",i.font=`600 38px ${l}`,i.textAlign="left",i.fillText(`Manche ${t+1}`,130,a),i.textAlign="center",i.font=`400 38px ${l}`,i.fillText(s(e.distance),580,a),i.textAlign="right",i.fillStyle="#ffd166",i.font=`700 38px ${l}`,i.fillText(`${e.score.toLocaleString("fr-FR")} pts`,950,a),u+=g})),i.textAlign="center",i.fillStyle="#ffffff",i.font=`700 46px ${l}`,i.fillText("Bravo !",540,1235),i.font=`400 34px ${l}`,i.globalAlpha=.9,i.fillText(d(t,a).slice(0,62),540,1285),i.globalAlpha=1,new Promise(((e,t)=>{n.toBlob((a=>{a?e(a):t(new Error("Impossible de créer l’image"))}),"image/png")}))}(G,ae,re),a=new File([t],"agglOguessr-score.png",{type:"image/png"}),r=navigator;if(null===(e=r.canShare)||void 0===e?void 0:e.call(r,{files:[a]}))yield r.share({files:[a],title:"AgglOguessr",text:`J’ai fait ${c(ae)} points sur AgglOguessr !`});else{const e=URL.createObjectURL(t),a=document.createElement("a");a.href=e,a.download="agglOguessr-score.png",document.body.appendChild(a),a.click(),document.body.removeChild(a),setTimeout((()=>URL.revokeObjectURL(e)),2e3),B("Image enregistrée dans vos téléchargements.")}}catch(e){"AbortError"!==(null==e?void 0:e.name)&&B("Impossible de créer l’image de score.")}finally{D(!1)}}))},J?"Création de l’image…":"Partager mon score"),(0,e.jsx)("button",{className:"ag-btn ag-btn-secondary",onClick:()=>{var e;null===(e=H.current)||void 0===e||e.removeAll(),q.current=null,_([]),I(0),$(!1),B(""),N("intro"),ee()}},"Rejouer")),V&&(0,e.jsx)("p",{className:"ag-share-msg"},V))));return(0,e.jsx)("div",{className:"jimu-widget widget-agglo-guessr",style:{width:"100%",height:"100%"}},!Y&&(0,e.jsx)(t.JimuMapViewComponent,{useMapWidgetId:null===(y=o.useMapWidgetIds)||void 0===y?void 0:y[0],onActiveViewChange:Q}),K?(0,e.jsx)("div",{style:{padding:12,background:"#0f6b5c",color:"#fff",borderRadius:8,fontSize:13,lineHeight:1.5}},(0,e.jsx)("strong",null,"AgglOguessr"),(0,e.jsx)("br",null),Y?"⚠ Choisissez une carte dans les paramètres.":"✓ Carte liée",(0,e.jsx)("br",null),"error"===M?"⚠ "+z:"loading"===M?"Chargement des données…":`✓ ${O.length} manche(s) chargée(s)`,(0,e.jsx)("br",null),(0,e.jsx)("em",null,"Le jeu s’affiche en mode Aperçu ou une fois publié.")):e.ReactDOM.createPortal(se,document.body))};function y(e){o.p=e}})(),n})())}}}));