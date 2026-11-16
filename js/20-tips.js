// ---------- Infobulles des effets ----------
// Survoler (ou toucher) une icône d'état ou un mot d'effet dans une carte affiche ce qu'il fait exactement.
// L'infobulle disparaît dès qu'on quitte l'élément, qu'on joue la carte ou que l'écran se redessine.
const TIP_GEN = {
  burn:"Brûlure : perd autant de PV que la Brûlure au début de son tour, puis la Brûlure baisse de 1.",
  seed:"Vampigraine : au début de son tour, perd des PV et le client en récupère la moitié ; baisse de 1.",
  soak:"Trempé : chaque coup reçu fait autant de dégâts en plus que la valeur de Trempé ; baisse de 1 à chaque tour.",
  para:"Paralysie : à 3, la cible est paralysée et passe son tour.",
  fear:"Peur : ses coups font moins de dégâts (autant que la valeur de Peur) ; baisse de 1 à chaque tour.",
  elan:"Élan : ses attaques font plus de dégâts (autant que la valeur d'Élan) ; baisse de 1 à chaque tour.",
  poison:"Poison : perd des PV au début de chaque tour, jusqu'à la fin du combat.",
  frost:"Gel : moins d'énergie au prochain tour.",
  confus:"Confusion : pioche moins de cartes au prochain tour.",
  str:"Force : chaque coup fait autant de dégâts en plus que la Force.",
  weak:"Faible : fait 25 % de dégâts en moins, pendant autant de tours que sa valeur.",
  vuln:"Vulnérable : subit 50 % de dégâts en plus, pendant autant de tours que sa valeur.",
  block:"Bouclier : absorbe les dégâts avant les PV. Disparaît au début du tour suivant.",
  retain:"Retenue : reste dans la main à la fin du tour.",
  ethereal:"Éphémère : si elle est encore en main à la fin du tour, elle est épuisée.",
  exhaust:"Épuise : retirée jusqu'à la fin du combat une fois jouée.",
  innate:"Innée : toujours dans la main au premier tour.",
  stun:"Endormi : passe son prochain tour.",
  regen:"Régénération : récupère des PV au début de chaque tour.",
  blockTurn:"Bouclier à venir : du Bouclier gagné au début du prochain tour."
};
function tipFor(k,v){ const S2=STATUS[k]; return (S2 && v!=null) ? `${S2.n} ${v} : ${S2.d(v)}.` : (TIP_GEN[k]||""); }
// icônes d'état : on ajoute data-tip à chaque pastille
const _stHTML = stHTML; stHTML = function(o){
  const s=[];
  ["burn","seed","soak","para","fear","elan","poison","frost","confus","str","weak","vuln"].forEach(k=>{ if(o[k]){ const ic=STATUS[k].i; s.push(`<span class="st ${k==="str"?"str":k==="weak"?"weak":k==="vuln"?"vuln":"s-"+k}" data-tip="${esc(tipFor(k,o[k]))}">${ic}${o[k]}</span>`); } });
  if(o.stun) s.push(`<span class="st" data-tip="${esc(TIP_GEN.stun)}">💤</span>`);
  if(o.regen) s.push(`<span class="st str" data-tip="${esc(`Régénération ${o.regen} : récupère ${o.regen} PV au début de chaque tour.`)}">✚${o.regen}</span>`);
  if(o.blockTurn) s.push(`<span class="st" data-tip="${esc(`Bouclier à venir : +${o.blockTurn} de Bouclier au début du prochain tour.`)}">🔷${o.blockTurn}</span>`);
  return s.join("");
};
// mots d'effet dans le texte des cartes
const TIP_WORDS = [["Vulnérable","vuln"],["Vampigraine","seed"],["Paralysie","para"],["Confusion","confus"],["Brûlure","burn"],["Trempé","soak"],["Poison","poison"],["Faible","weak"],["Force","str"],["Peur","fear"],["Élan","elan"],["Gel","frost"],["Bouclier","block"],["Retenue","retain"],["Éphémère","ethereal"],["Épuise","exhaust"],["Innée","innate"]];
const TIP_RE = new RegExp(`(^|[^\\wÀ-ÿ])(${TIP_WORDS.map(w=>w[0]).join("|")})(?![\\wÀ-ÿ])`,"g");
function tipWords(html){
  // ne touche pas l'intérieur des balises
  return String(html).split(/(<[^>]+>)/).map(part=>part.startsWith("<")?part:part.replace(TIP_RE,(m,pre,w)=>{ const k=TIP_WORDS.find(x=>x[0]===w)[1]; return `${pre}<span class="kwt" data-tip="${esc(TIP_GEN[k])}">${w}</span>`; })).join("");
}
const _cardHTML = cardHTML; cardHTML = function(id,opts){
  const h=_cardHTML(id,opts);
  return h.replace(/(<div class="dd">)([\s\S]*?)(<\/div>)/, (m,a,b,c)=>a+tipWords(b)+c);
};
// la bulle
(function(){
  if(typeof document==="undefined") return;
  let tip=null, cur=null;
  function hide(){ if(tip) tip.style.display="none"; cur=null; }
  function show(el){
    if(!tip){ tip=document.createElement("div"); tip.className="tipbub"; document.body.appendChild(tip); }
    cur=el; tip.textContent=el.getAttribute("data-tip"); tip.style.display="block";
    const r=el.getBoundingClientRect(), W=window.innerWidth;
    const tw=Math.min(260, W-16); tip.style.maxWidth=tw+"px";
    const bw=tip.offsetWidth, bh=tip.offsetHeight;
    let x=r.left+r.width/2-bw/2; x=Math.max(8,Math.min(W-bw-8,x));
    let y=r.top-bh-8; if(y<8) y=r.bottom+8;
    tip.style.left=x+"px"; tip.style.top=y+"px";
  }
  // les mots des cartes ne reçoivent pas la souris (la carte entière se fait glisser) : on cherche le mot sous le pointeur
  function under(e){
    const t=e.target; if(!t.closest) return null;
    const direct=t.closest("[data-tip]"); if(direct) return direct;
    const card=t.closest(".dcard"); if(!card) return null;
    for(const k of card.querySelectorAll(".kwt")){ const r=k.getBoundingClientRect(); if(e.clientX>=r.left-2&&e.clientX<=r.right+2&&e.clientY>=r.top-2&&e.clientY<=r.bottom+2) return k; }
    return null;
  }
  document.addEventListener("mousemove",e=>{ const el=under(e); if(el){ if(el!==cur) show(el); } else if(cur) hide(); },true);
  document.addEventListener("mouseleave",hide);
  // toucher une icône d'état sur mobile : afficher ; toucher ailleurs : cacher
  document.addEventListener("touchstart",e=>{ const el=e.target.closest&&e.target.closest(".st[data-tip]"); if(el){ show(el); } else hide(); },{passive:true,capture:true});
  document.addEventListener("pointerdown",e=>{ if(cur && !(e.target.closest&&e.target.closest(".st[data-tip]"))) hide(); },true);
  // carte jouée, écran redessiné : si l'élément a disparu, la bulle aussi
  new MutationObserver(()=>{ if(cur && !document.body.contains(cur)) hide(); }).observe(document.body,{childList:true,subtree:true});
  window.addEventListener("scroll",hide,true);
})();
