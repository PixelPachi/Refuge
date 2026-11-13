// ---------- URLs PokeAPI ----------
const SPR_BASE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/";
// Les sprites et cris sont intégrés au jeu (dossier assets/). Si un fichier manque, le jeu essaie PokeAPI en ligne, puis une silhouette.
function sprUrl(id, shiny, animated){
  if(animated && id<=649) return SPR_BASE+"pokemon/versions/generation-v/black-white/animated/"+(shiny?"shiny/":"")+id+".gif";
  return SPR_BASE+"pokemon/"+(shiny?"shiny/":"")+id+".png";
}
function localSpr(id, shiny, animated){
  if(shiny) return sprUrl(id, true, animated); // les sprites chromatiques (rares) viennent de PokeAPI en ligne
  return "assets/"+(id<=649?"anim":"static")+(shiny?"-shiny":"")+"/"+id+(id<=649?".gif":".png"); // les sprites fixes ont été retirés : le gif animé sert partout
}
function itemUrl(name){ return SPR_BASE+"items/"+name+".png"; }
function cryUrl(id){ return "assets/cries/"+id+".mp3"; }

const SPR_OK = new Set(); // sprites déjà chargés : affichés tout de suite, sans clignoter
function sprite(id, name, color, opts){
  opts = opts||{};
  const sh = opts.shiny ? " shiny" : "";
  const src=localSpr(id,opts.shiny,opts.anim), ok=SPR_OK.has(src)?" ok":"";
  return `<div class="spr${sh}${ok}" style="width:${opts.w||"100%"};height:${opts.h||"100%"}"><img src="${src}" data-remote="${sprUrl(id,opts.shiny,opts.anim)}" alt="${name}"><div class="ph" style="--c:${color||"#a89878"}"><span>${name}</span></div></div>`;
}
function imgFail(img){ const p=img.parentNode; if(p){ p.classList.add("noimg"); p.classList.remove("ok"); } img.remove(); }
const SVG_BOTTLE = c => `<svg viewBox="0 0 24 24"><rect x="10" y="1" width="4" height="2.5" rx="0.6" fill="#7a4a2a"/><path d="M10 3.5h4v3.5l2.6 3.2v11a1.8 1.8 0 0 1-1.8 1.8H9.2a1.8 1.8 0 0 1-1.8-1.8v-11L10 7z" fill="${c}" stroke="#2a1010" stroke-width="1"/><path d="M9.2 11.5h2v8h-2z" fill="#fff" opacity=".35"/></svg>`;
const SVG_LEAF = `<svg viewBox="0 0 24 24"><path d="M4 20C4 10 10 4 20 4c0 10-6 16-16 16z" fill="#58b868" stroke="#235c2e" stroke-width="1.2"/><path d="M5 19L16 8" stroke="#235c2e" stroke-width="1.2" fill="none"/></svg>`;
// ---------- Illustrations (Gemini) : chargées si présentes dans assets/art, sinon décor CSS ----------
// Illustrations préchargées au démarrage : toutes sauf les cartes et les cadres (chargés à la demande)
const ART_SET = new Set(ART_FILES);
const ART_KEYS = ART_FILES.filter(k=>!/^(card|frame)-/.test(k));
const ARTOK = {};
function artSrc(k){ return "assets/art/"+k+".webp"; }
function preloadArt(done){
  let left=ART_KEYS.length, fin=false; const end=()=>{ if(!fin){ fin=true; done&&done(); } };
  ART_KEYS.forEach(k=>{ const im=new Image(); im.onload=()=>{ ARTOK[k]=true; if(--left<=0) end(); }; im.onerror=()=>{ if(--left<=0) end(); }; im.src=artSrc(k); });
  setTimeout(end, 1500);
}
function artBg(k){ return ARTOK[k] ? `<img class="artbg" src="${artSrc(k)}" alt="">` : ""; }
// Icône d'une boisson préparée : recette offerte ou boisson fétiche reconnue, sinon le verre de sa base.
const FLAVOR = {ceriz:"rouge",figuy:"rouge",framby:"rouge",oran:"bleu",fraive:"bleu",sitrus:"jaune",mago:"rose",kika:"rose",wiki:"rose",menthe:"vert",pommeacide:"vert",miel:"miel",pommesucree:"miel",gateau:"miel"};
const DRINK_NAMES = {
  eau:{rouge:"Eau de Ceriz",bleu:"Eau Océane",jaune:"Eau Sitrus",rose:"Eau Rosée",vert:"Eau Fraîcheur Menthe",miel:"Eau Miellée"},
  lait:{rouge:"Lait Framboisé",bleu:"Lait Myrtille-Oran",jaune:"Lait Soleil",rose:"Lait Fraise-Mago",vert:"Lait à la Menthe",miel:"Lait Doux au Miel"},
  soda:{rouge:"Soda Cerise",bleu:"Soda des Abysses",jaune:"Soda Pétillant Sitrus",rose:"Soda Bonbon",vert:"Soda Givré",miel:"Soda Ambré"},
  limonade:{rouge:"Limonade Rubis",bleu:"Limonade Lagon",jaune:"Limonade Éclat",rose:"Limonade Rose",vert:"Limonade Mojito",miel:"Limonade Dorée"},
  liqueur:{rouge:"Liqueur Double Ceriz",bleu:"Liqueur Nuit Bleue",jaune:"Liqueur Sitrus Flambée",rose:"Liqueur de Mago",vert:"Liqueur Verte des Bois",miel:"Liqueur au Miel"}
};
function drinkFlavor(d){ const a=(d.add||[]).find(k=>FLAVOR[k]); return a?FLAVOR[a]:null; }
function drinkKey(d){
  if(!d) return null;
  if(S && S.recipes && S.recipes.includes("shake") && d.base==="lait" && d.add.includes("sitrus")) return "drink-shake";
  if(S && S.recipes && S.recipes.includes("remede") && d.base==="limonade" && d.add.includes("menthe") && d.add.includes("wiki") && ARTOK["drink-remede"]) return "drink-remede";
  const fk = Object.keys(FAV).find(k=>orderMatch(FAV[k], d));
  if(fk) return "drink-fav-"+fk;
  const f=drinkFlavor(d);
  if(f && ARTOK[`drink-${d.base}-${f}`]) return `drink-${d.base}-${f}`;
  return "drink-"+d.base;
}
function drinkName(d){
  const k=drinkKey(d)||"";
  if(k==="drink-shake") return "Protéine Shake de Machopeur";
  if(S && S.recipes && S.recipes.includes("remede") && d.base==="limonade" && d.add.includes("menthe") && d.add.includes("wiki")) return "Remède de Psykokwak";
  if(k.startsWith("drink-fav-")){ const n=FAV[k.slice(10)].n.replace(/^(le |la |l')/,""); return n.charAt(0).toUpperCase()+n.slice(1); }
  const f=drinkFlavor(d);
  return f && DRINK_NAMES[d.base] ? DRINK_NAMES[d.base][f] : ING[d.base].n;
}
function drinkIcon(d, cls){ const k=drinkKey(d); return k && ARTOK[k] ? `<img class="drinkic ${cls||""}" src="${artSrc(k)}" alt="">` : ""; }
function gelIcon(t){ return ARTOK["gel-"+t] ? `<img class="itm gelimg" src="${artSrc("gel-"+t)}" alt="">` : `<span class="gel" style="--g:${ESS[t].c}"></span>`; }
function itemIcon(key){
  const it = ING[key]||{};
  if(key==="liqueur" && ARTOK["item-liqueur-ceriz"]) return `<img class="itm" src="${artSrc("item-liqueur-ceriz")}" alt="">`;
  if(key==="menthe" && ARTOK["item-feuille-menthe"]) return `<img class="itm" src="${artSrc("item-feuille-menthe")}" alt="">`;
  if(key==="liqueur") return `<span class="combo">${SVG_BOTTLE("#c0303a")}<img class="itm sub" src="${itemSrc("cheri-berry")}" data-remote="${itemUrl("cheri-berry")}" data-c="#d8343a" alt=""></span>`;
  if(key==="menthe") return `<span class="combo">${SVG_LEAF}</span>`;
  if(key==="the" && ARTOK["item-the"]) return `<img class="itm" src="${artSrc("item-the")}" alt="">`;
  if(ARTOK["ing-"+key]) return `<img class="itm" src="${artSrc("ing-"+key)}" alt="">`;
  if(it.item) return `<img class="itm" src="${itemSrc(it.item)}" data-remote="${itemUrl(it.item)}" data-c="${it.c}" alt="">`;
  return `<span class="dot" style="background:${it.c||"#888"}"></span>`;
}
