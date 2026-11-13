// ---------- État ----------
let S = null;          // état sauvegardé
let U = {};            // état d'interface (non sauvegardé)
const SAVE_KEY = "tkl_refuge_save_v1";

function newState(){
  return {
    v:1, aura:{braise:0,racine:0,maree:0,lueur:0,ombre:0,brise:0}, aura1:null, aura2:null,
    ten:null, shiny:false, cog:null, duo:false, duoAff:0,
    money:400, stock:{lait:2,oran:2,mago:1,gel_normal:1,gel_psy:1,gel_vol:1}, level:1, xp:0, night:1, pc:0,
    clients:{}, fragments:[], pages:0, equip:{}, staff:[], recipes:[], keywords:{},
    log:[], stats:{served:0,perfect:0,earned:0,apaise:0}, settings:{sound:true,music:true,assist:false},
    hectorJoke:false, tutoDone:false
  };
}
function initClients(){
  CLIENT_ORDER.forEach(k=>{ S.clients[k] = {aff:0,state:"new",carryOuv:0,carryTen:0,visits:0,shake:false}; });
}
function save(){ try{ localStorage.setItem(SAVE_KEY, JSON.stringify(S)); }catch(e){} }
function loadSave(){ try{ const r=localStorage.getItem(SAVE_KEY); return r?JSON.parse(r):null; }catch(e){ return null; } }
function clearSave(){ try{ localStorage.removeItem(SAVE_KEY); }catch(e){} }
// Code de sauvegarde : la partie en texte, pour la garder ou la passer d'un appareil à l'autre (aucun serveur)
const SAVE_CODE_PREFIX = "REFUGE1:";
function saveToCode(){ save(); const json=localStorage.getItem(SAVE_KEY)||JSON.stringify(S); return SAVE_CODE_PREFIX+btoa(unescape(encodeURIComponent(json))); }
function codeToSave(code){
  code=(code||"").trim().replace(/\s+/g,""); if(!code.startsWith(SAVE_CODE_PREFIX)) return null;
  try{ const o=JSON.parse(decodeURIComponent(escape(atob(code.slice(SAVE_CODE_PREFIX.length))))); return (o && o.ten && o.clients) ? o : null; }catch(e){ return null; }
}

// ---------- Outils ----------
const $app = document.getElementById("app");
const $modal = document.getElementById("modal");
function clamp(v,a,b){ return Math.max(a,Math.min(b,v)); }
function rnd(n){ return Math.floor(Math.random()*n); }
function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){const j=rnd(i+1);[a[i],a[j]]=[a[j],a[i]];} return a; }
function esc(s){ return String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])); }
function toast(msg){
  const t=document.createElement("div"); t.className="toast"; t.innerHTML=msg;
  document.getElementById("toast").appendChild(t); setTimeout(()=>t.remove(),2600);
}
function openModal(html){ const fresh=$modal.classList.contains("hidden"); $modal.innerHTML=`<div class="sheet${fresh?" fade":""}">${html}</div>`; $modal.classList.remove("hidden"); }
function closeModal(){ $modal.classList.add("hidden"); $modal.innerHTML=""; if(U&&U.book) U.book.open=false; }
function pcMax(){ return 12 + (hasBib('bougie')?1:0) + (S.level-1) + (S.duo?3:0) + (staffOn("leveinard")?2:0) + (staffOn("goupix")?1:0) + staffFx("pc"); }
function talent(){ return S.ten ? S.ten.t : null; }
function cog(){ return COGS.find(c=>c.key===S.cog); }
function seesLies(){ return talent()==="masque" || S.cog==="sorbebe"; }
function addXP(n){
  S.xp += n;
  while(S.xp >= S.level*100){ S.xp -= S.level*100; S.level++; toast(`Niveau ${S.level} ! +1 PC max`); }
}
function tipBonus(){ let b=hasBib("bocal")?0.2:0; if(omen()==="fete") b+=1; if(staffOn("magicarpe")) b+=0.1; return b; }

// ---------- Rendu commun ----------
function hud(){
  return `<div class="hud">
    <button class="chip chipbtn" data-act="seasonMap" title="Carte de la saison">🌙 <b>${S.night}/${NIGHTS_PER_SEASON}</b></button>
    <span class="chip"><b>${S.money}</b> ₽</span>
    ${U.inDungeon?"":`<span class="chip">PC <b>${S.pc}/${pcMax()}</b></span>`}
    <span class="chip" title="Niveau du Tenancier">Nv <b>${S.level}</b></span>
    <span class="grow"></span>
    <button class="iconbtn" data-act="showDeck">Deck</button>
    <button class="iconbtn" data-act="registre">Registre</button>
    <button class="iconbtn" data-act="menu">☰</button>
  </div>`;
}
function scene(o){
  o=o||{};
  const night = o.night ? " night" : "";
  const bottles = (side)=>`<div class="bottles ${side}">${["#c0303a","#3a7bd5","#f2d43a","#58b868","#e88ac0"].map(c=>`<div class="bottle" style="background:${c}"></div>`).join("")}</div>`;
  const ak = (o.night?"bar-nuit":"bar-jour")+(o.doorOpen?"-ouvert":"-ferme");
  return `<div class="scene${night}${ARTOK[ak]?" hasart":""}">${artBg(ak)}
    <div class="planks"></div>
    ${bottles("l")}<div class="shelf l"></div>${bottles("r")}<div class="shelf r"></div>
    <div class="door ${o.doorOpen?"open":""}" id="door"><div class="beyond"></div><div class="silhouette ${o.sil&&!o.sils?"on":""}"></div><div class="leaf"></div></div>
    <div class="candle l"></div><div class="candle r"></div>
    ${o.sils&&o.sils.length?`<div class="sils">${o.sils.map((k,i)=>`<div class="silq ${U.silsSeen&&U.silsSeen.includes(k)?"still":""}" style="--i:${i}">${sprite(CL[k].id,CL[k].n,"#000",{anim:true})}</div>`).join("")}</div>`:""}
    ${o.baro||""}
    <div class="stool"></div>
    <div class="client-slot ${o.clientAway?"away":""}" id="cslot">${o.client||""}</div>
    <div class="counter"></div>
    ${S.cog?`<div class="cog-slot">${sprite(cog().id,cog().n,cog().c,{anim:true,h:"80px"})}<span class="tag">${cog().n}</span></div>`:""}
    ${S.ten?`<div class="ten-slot">${sprite(S.ten.id,S.ten.n,S.ten.c,{shiny:S.shiny,anim:true,h:"80px"})}<span class="tag">Toi</span></div>`:""}
  </div>`;
}
function pips(n, cls){ let h=""; for(let i=0;i<5;i++) h+=`<div class="pip ${i<n?cls:""}"></div>`; return `<div class="pips">${h}</div>`; }

// ---------- Moteur de dialogue ----------
// lignes : {who:"hector"|"cog"|"client"|"narr"|"ten"|{id,n,c}, t, mood, lie}
// couleur du nom de chaque personnage, pour bien voir qui parle
function speakerColor(sp, w){
  if(w==="hector") return HECTOR.c; if(w==="cog") return cog().c; if(w==="ten") return (S.ten&&S.ten.c)||"#f08030"; if(w==="kecleon") return KECLEON.c;
  if(!sp) return null;
  const k=Object.keys(CL).find(k=>CL[k].id===sp.id); if(k) return CL[k].c;
  const v=VILLAGERS.find(v=>v.id===sp.id); if(v) return v.c;
  const c=COGS.find(c=>c.id===sp.id); if(c) return c.c;
  return sp.c||null;
}
function lumOf(hex){ const m=/^#?([0-9a-f]{6})$/i.exec(hex||""); if(!m) return .5; const n=parseInt(m[1],16), r=(n>>16)&255, g=(n>>8)&255, b=n&255; return (0.299*r+0.587*g+0.114*b)/255; }
function spkHTML(name, col){ col=col||"#a06030"; const dark=lumOf(col)<0.5; return `<div class="spk" style="--sc:${col}"><span class="spkname" style="${dark?"color:#fff;text-shadow:0 1px 1px rgba(0,0,0,.5)":""}">${esc(name)}</span></div>`; }
function isClientWho(w){ return w && typeof w==="object" && Object.values(CL).some(c=>c.id===w.id); }
function femSys(t){ if(!t || !femCtx()) return t; return t.replace(/<span class="small">([\s\S]*?)<\/span>/g,(m,inner)=>`<span class="small">${feminize(inner)}</span>`); }
function speakerInfo(w){
  if(w==="hector") return {id:HECTOR.id,n:HECTOR.n};
  if(w==="cog") return {id:cog().id,n:cog().n};
  if(w==="ten") return {id:S.ten.id,n:"Toi"};
  if(w==="kecleon") return {id:KECLEON.id,n:KECLEON.n};
  if(w==="narr") return null;
  if(w && typeof w==="object") return w;
  return null;
}
function playDialog(lines, onDone, render){
  U.dlg = {lines, i:0, onDone, render};
  render();
  sayCurrent();
}
let TW=null;
function typewrite(el){
  if(TW && TW.t) clearInterval(TW.t);
  TW=null; if(!el) return;
  const nodes=[]; const walk=n=>{ n.childNodes.forEach(c=>{ if(c.nodeType===3){ if(c.textContent.length){ nodes.push([c,c.textContent]); c.textContent=""; } } else walk(c); }); };
  walk(el);
  let i=0, j=0;
  const tw={done:false};
  tw.finish=()=>{ clearInterval(tw.t); nodes.forEach(([c,t])=>c.textContent=t); tw.done=true; };
  tw.t=setInterval(()=>{ if(i>=nodes.length){ tw.done=true; clearInterval(tw.t); return; } const [c,t]=nodes[i]; j+=2; c.textContent=t.slice(0,j); if(j>=t.length){ i++; j=0; } },22);
  TW=tw;
}
function sayCurrent(){
  typewrite(document.querySelector(".bubble[data-act=dlgNext] .twt"));
  const d=U.dlg; if(!d) return;
  const l=d.lines[d.i]; if(!l) return;
  const sp=speakerInfo(l.who);
  if(sp && sp.id) cry(sp.id);
}
// Accord au féminin pour les clientes (narration, co-gérant, labyrinthe)
function femCtx(){ if(U.inDungeon && U.dawn && U.dawn.x) return !!CL[U.dawn.x.k].fem; return !!(U.cur && CL[U.cur.k] && CL[U.cur.k].fem); }
const FEM_WORDS = ["apaisé","tendu","revenu","fermé","ouvert","prêt","seul","terrifié","entraîné","stressé","Stressé","rassuré","soulagé","décidé","guidé","perdu de vue"];
function feminize(t){
  if(!t) return t;
  const parts = t.split(/(<[^>]+>)/);
  return parts.map(p=>{
    if(p.startsWith("<")) return p;
    p = p.replace(/\bIl\b(?! y a)(?! faut)(?! était une fois)/g,"Elle").replace(/\bil\b(?! y a)(?! faut)/g,"elle")
         .replace(/\bLe laisser\b/g,"La laisser").replace(/\ble laisser\b/g,"la laisser")
         .replace(/\bl'ami\b/g,"l'amie").replace(/relance-le\b/g,"relance-la").replace(/\bl'observer\b/g,"l'observer");
    FEM_WORDS.forEach(w=>{ p = p.replace(new RegExp("\\b"+w+"(?![a-zàâéèêëîïôûùç])","g"), w+"e"); });
    return p;
  }).join("");
}
function dialogBubble(){
  const d=U.dlg; if(!d) return "";
  const l=d.lines[d.i];
  const sp=speakerInfo(l.who);
  const narr = !sp;
  const voice = l.who==="voix";
  return `<div class="bubble ${voice?"voice":narr?"narr":""} fade" data-act="dlgNext">
    ${l.img?`<img class="dlgimg" src="${artSrc(l.img)}" alt="">`:""}${sp?spkHTML(sp.n, speakerColor(sp, l.who)):""}
    <div class="twt">${(femCtx() && !voice && !isClientWho(l.who)) ? feminize(l.t) : (femCtx()&&isClientWho(l.who) ? femSys(l.t) : l.t)}${l.lie?`<span class="lie">✦ La bougie vacille : ce n'est pas vrai.</span>`:""}</div>
    <span class="next">▼</span>
  </div>`;
}
function dlgNext(){
  if(TW && !TW.done){ TW.finish(); return; }
  const d=U.dlg; if(!d) return;
  d.i++;
  if(d.i>=d.lines.length){ U.dlg=null; d.onDone && d.onDone(); return; }
  d.render(); sayCurrent();
}

// ---------- Crochets : les effets d'un client déclarés dans SA fiche (js/saisons/saisonN.js) ----------
// Depuis la saison 3, chaque client porte ses propres effets, au lieu de lignes dispersées dans le moteur :
//   CL.k.staffFx = { arrive(c,d){…}, pc:n }      effet du poste quand k est employé (c = client servi, d = sa fiche)
//   CL.k.gift.fx = { hp:n, combatStart(C,en,D){…}, turnStart(C,D){…}, draw(C,D){ return n } }   effet de l'artefact de k
//   ING.x.fx(ctx) → {ouv, ten, hang, turns, note}  effet d'un ingrédient (ctx = {def, k, cur, isBase})
// (Les saisons 1 et 2 gardent leurs effets historiques, codés directement dans le moteur.)
// prix d'un ingrédient chez Kecleon (réduction éventuelle d'un poste : staffFx "discount")
function ingPrice(k){ return Math.round(ING[k].price*(1-Math.min(0.5,staffFx("discount")))); }
function staffFx(name, ...args){ let r=0; S.staff.forEach(k=>{ const f=CL[k] && CL[k].staffFx; if(!f || !staffOn(k) || f[name]==null) return; r += typeof f[name]==="function" ? (f[name](...args)||0) : f[name]; }); return r; }
function relicFx(name, ...args){ let r=0; CLIENT_ORDER.forEach(k=>{ const g=CL[k].gift; if(!g || !g.fx || !S.equip[g.key] || g.fx[name]==null) return; r += typeof g.fx[name]==="function" ? (g.fx[name](...args)||0) : g.fx[name]; }); return r; }
function relicHP(){ return CLIENT_ORDER.map(k=>CL[k].gift).filter(g=>g && g.fx && g.fx.hp && S.equip[g.key]).map(g=>({hp:g.fx.hp, t:`${g.i} ${g.n}`})); }
function ingFx(key, ctx){ const f=ING[key] && ING[key].fx; return f ? (f(ctx)||{}) : {}; }
