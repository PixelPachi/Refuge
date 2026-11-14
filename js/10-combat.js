// =====================================================================
// LABYRINTHE EN DECK BUILDING (inspiré de Slay the Spire)
// Le client affronte les ombres de son passé avec le deck construit par le Tenancier.
// =====================================================================

const AURA_DECK = {braise:["flammeche","feufollet"], racine:["vampigraine","tranchherbe"], maree:["pistolet","repli"], lueur:["viveattaque","cageeclair"], ombre:["morsure","regardnoir"], brise:["cruaile","ventarriere"]};
const AURA_POOL = {braise:["nitrocharge","lanceflammes","deflagration","feufollet","dansefeu"], racine:["megasangsue","pouvoirantique","vampigraine"], maree:["dansepluie","hydrocanon","pistolet"], lueur:["etincelle","tonnerre","rugissement","cageeclair"], ombre:["grimace","ballombre","regardnoir"], brise:["tornade","hate","ventarriere"]};
// effets de statut : nom, icône, explication
const STATUS = {
  burn:{n:"Brûlure",i:"🔥",d:v=>`perd ${v} PV au début de son tour, puis la Brûlure baisse de 1`},
  seed:{n:"Vampigraine",i:"🌱",d:v=>`au début de son tour, perd ${v} PV et le client en récupère la moitié ; baisse de 1`},
  soak:{n:"Trempé",i:"💧",d:v=>`chaque coup reçu fait +${v} dégâts ; baisse de 1 à chaque tour`},
  para:{n:"Paralysie",i:"⚡",d:v=>`à 3, il est paralysé et passe son tour (${v}/3)`},
  fear:{n:"Peur",i:"😨",d:v=>`ses coups font ${v} dégât${v>1?"s":""} de moins ; baisse de 1 à chaque tour`},
  elan:{n:"Élan",i:"🪶",d:v=>`ses attaques font +${v} dégâts ; baisse de 1 à chaque tour`},
  poison:{n:"Poison",i:"☠️",d:v=>`perd ${v} PV au début de chaque tour, jusqu'à la fin du combat`},
  frost:{n:"Gel",i:"❄️",d:v=>`${v} énergie de moins au prochain tour`},
  confus:{n:"Confusion",i:"💫",d:v=>`pioche ${2*v} carte${v>1?"s":""} de moins au prochain tour`},
  str:{n:"Force",i:"💪",d:v=>`+${v} dégâts par coup`},
  weak:{n:"Faible",i:"☁️",d:v=>`fait 25 % de dégâts en moins (${v} tour${v>1?"s":""})`},
  vuln:{n:"Vulnérable",i:"💔",d:v=>`subit 50 % de dégâts en plus (${v} tour${v>1?"s":""})`}
};

const VILL_LEGEND_LINE = {
  racaillou:"<i>Il fouille dans une poche de pierre et pose un caillou fendu sur le comptoir. Ça grésille un peu.</i> Mon grand-père disait : « Quand tout est perdu, Racaillou, explose. » J'ai jamais osé. Toi, garde-le pour un jour vraiment noir.",
  melofee:"<i>Elle lève un petit doigt, le fait tourner en cercles… et ses yeux s'illuminent.</i> Le doigt a choisi ! C'est un secret de Mont Sélénite : on ne sait jamais ce qui va sortir. C'est ça qui est drôle !",
  chaglam:"<i>Elle fait glisser quelque chose sous sa patte, l'air de rien.</i> Ça, mon chou, je l'ai… trouvé. Prends ce qu'on te refuse, et souris comme si de rien n'était.",
  pijako:"<i>Il bat des ailes, ouvre le bec… et c'est TA voix qui sort, mot pour mot.</i> « Un verre pour Pijako ! » Pijako répète ! Pijako répète tout ! Garde ça, Pijako en a plein !"
};
const VILL_LEGEND = {cadoizo:"lettre",racaillou:"explosion",melofee:"metronome",chaglam:"larcin",pijako:"babil"};

const VILL_CARD = {cadoizo:"lettre_c",racaillou:"boularmure",melofee:"douxbaiser",chaglam:"griffe",pijako:"bavardage"};
const POOL = { commune:["charge","abri","coupdboule","armure","prevoyance","belier","feinte","meteores","feufollet","pouvoirantique","dansepluie","etincelle","grimace","rugissement"], peu:["coupbas","riposte","dansefeu","reflet","griffacier","dansedeslames","ultimapoing","rafale","telekinesie","lanceflammes","megasangsue","hydrocanon","tonnerre","ballombre","tornade"], rare:["repos","mur","gonflette","giga","deflagration","furie","frenesie"] };
const CARD_PRICE = {legende:0, commune:40, peu:70, rare:120, jour:50, client:80, base:30};
const FRAG_CARD = {
  joie:{heal:6,str:1,txt:"Soigne 6 PV, +1 Force"},
  nostalgie:{block:10,draw:1,txt:"10 de Bouclier, pioche 1"},
  tristesse:{dmg:12,selfDmg:2,txt:"12 dégâts, perd 2 PV"},
  colere:{dmg:9,vuln:1,txt:"9 dégâts, Vulnérable 1"},
  peur:{block:6,weak:1,txt:"6 de Bouclier, Faible 1"}
};

function starterDeck(){ const a=(S.ten&&S.ten.aura)||S.aura1||"lueur"; return ["frappe","frappe","frappe","frappe","garde","garde","garde","garde"].concat(AURA_DECK[a]||AURA_DECK.lueur); }
function ensureDeck(){ if(!S.deck || !S.deck.length) S.deck=starterDeck();
  Object.keys(LEGEND_CARD).forEach(k=>{ const st=S.clients&&S.clients[k]; if(st && (st.state==="apaise"||st.state==="staff") && !st.legendGiven){ st.legendGiven=true; S.deck.push(LEGEND_CARD[k]); } }); }
function cardDesc(id, cd){
  const c=cd||CARDS[id]; if(c.d) return c.d;
  const p=[];
  if(c.dmg) p.push(`${c.dmg} dégâts${c.hits?` ×${c.hits}`:""}`);
  if(c.block) p.push(`${c.block} de Bouclier`);
  if(c.heal) p.push(`soigne ${c.heal} PV`);
  if(c.vuln) p.push(`Vulnérable ${c.vuln}`);
  if(c.weak) p.push(`Faible ${c.weak}`);
  if(c.str) p.push(`+${c.str} Force`);
  if(c.burn) p.push(`Brûlure ${c.burn}`);
  if(c.seed) p.push(`Vampigraine ${c.seed}`);
  if(c.soak) p.push(`Trempé ${c.soak}`);
  if(c.para) p.push(`Paralysie ${c.para}`);
  if(c.fear) p.push(`Peur ${c.fear}`);
  if(c.elan) p.push(`Élan ${c.elan}`);
  if(c.draw) p.push(`pioche ${c.draw}`);
  if(c.energy) p.push(`+${c.energy} énergie`);
  if(c.selfDmg) p.push(`perd ${c.selfDmg} PV`);
  let s=p.join(", "); s=s.charAt(0).toUpperCase()+s.slice(1);
  if(c.execute) s+=", doublés si l'ombre a moins de la moitié de ses PV";
  if(c.innate) s+=". Innée";
  if(c.retain) s+=". Retenue";
  if(c.ethereal) s+=". Éphémère";
  if(c.exhaust) s+=". Épuise";
  return s+".";
}
// cartes illustrées : celles qui ont un fichier card-<id>.webp (voir js/assets.js)
const CARD_ART = new Set(ART_FILES.filter(k=>k.startsWith("card-")).map(k=>k.slice(5)));
function cardHTML(id, opts={}){
  const c = opts.cd || CARDS[id];
  const cls = (c.t==="atk"?"atk":c.t==="power"?"pow":c.t==="curse"?"curse":"skl")+(c.r==="legende"?" leg":"")+(c.r==="chroma"?" chroma":c.r==="voyage"?" voyage":"");
  const attrs = `${opts.act?`data-act="${opts.act}" data-i="${opts.i}"`:""} ${opts.drag?`data-hi="${opts.i}" data-tgt="${opts.tgt?1:0}"`:""}`;
  const base = String(id).split(":")[0];
  // Cartes souvenir et mots-clés : un dessin commun par type d'émotion (souvenir-<émotion>), et leur propre cadre
  const svArt = c.r==="frag" ? "souvenir-"+c.emo : c.r==="kw" ? "souvenir-motcle" : null;
  const artKey = svArt ? (ART_SET.has(svArt) ? svArt : null) : (CARD_ART.has(base) ? "card-"+base : null);
  if(artKey){
    const odd = c.unplayable || c.x || !(c.c>=0 && c.c<=4);
    const fr = odd ? 0 : c.c;
    const typ = c.r==="frag" ? `Souvenir · ${EMO[c.emo]?EMO[c.emo].n:""}` : c.r==="kw" ? "Mot-clé" : c.t==="atk"?"Attaque":c.t==="power"?"Pouvoir":c.t==="curse"?"Malédiction":"Technique";
    return `<div class="dcard art ${cls}${svArt?" sv":""} ${opts.dis?"dis":""} ${opts.eff?"eff":""}" ${attrs}>
    <img class="dart" src="assets/art/${artKey}.webp" alt="" draggable="false"><img class="dframe" src="assets/art/${svArt && ART_SET.has("frame-souvenir") ? "frame-souvenir" : `frame-${c.r==="legende"?"leg-":""}${fr}`}.webp" alt="" draggable="false">
    ${odd?`<div class="dcost2">${c.unplayable?"–":c.x?"X":c.c}</div>`:""}${c.r==="legende"?`<div class="dleg">Légendaire</div>`:c.r==="chroma"?`<div class="dleg chroma">✦ Chromatique</div>`:c.r==="voyage"?`<div class="dleg voyage">Voyageur</div>`:""}
    <div class="dtxt ${(()=>{const L=String(cardDesc(id,c)).replace(/<[^>]+>/g,"").length;return L>95?"xxl":L>65?"xl":L>40?"lg":"";})()}"><div class="dn">${c.n}</div><div class="dty">${typ}</div><div class="dd">${cardDesc(id,c)}</div></div>${opts.tag?`<div class="dtag">${opts.tag}</div>`:""}</div>`;
  }
  return `<div class="dcard ${cls} ${opts.dis?"dis":""} ${opts.eff?"eff":""}" ${attrs}>
    <div class="dcost">${c.unplayable?"–":c.x?"X":c.c}</div>${c.r==="legende"?`<div class="dleg">Légendaire</div>`:c.r==="chroma"?`<div class="dleg chroma">✦ Chromatique</div>`:c.r==="voyage"?`<div class="dleg voyage">Voyageur</div>`:""}<div class="dic">${c.i||"✦"}</div>
    <div class="dn">${c.n}</div><div class="dd">${cardDesc(id,c)}</div>${opts.tag?`<div class="dtag">${opts.tag}</div>`:""}</div>`;
}
function addCard(id, why){ ensureDeck(); S.deck.push(id); save(); toast(`Nouvelle carte : ${CARDS[id].n}${why?` (${why})`:""}`); }
// --- choisir 1 carte parmi 3 (jour : permanente) ---
function offerCards(ids, onDone, title, sub){
  U.cardPick={ids, onDone};
  openModal(`<h3>${title||"Une carte pour ton deck"}</h3><p class="small muted">${sub||"Choisis une carte à ajouter à ton deck, ou passe."}</p>
    <div class="dhand pick">${ids.map((id,i)=>cardHTML(id,{act:"pickCard",i})).join("")}</div>
    <button class="alt" style="width:100%;margin-top:10px" data-act="pickCard" data-i="-1">Passer</button>`);
}
function pickCard(i){ const p=U.cardPick; U.cardPick=null; closeModal(); if(i>=0) addCard(p.ids[i]); p.onDone&&p.onDone(); }
function randomCards(n, weights){ const out=[]; const ap=AURA_POOL[(S.ten&&S.ten.aura)||S.aura1]; if(ap && Math.random()<0.6) out.push(ap[rnd(ap.length)]); const w=weights||{commune:6,peu:3,rare:1}; let guard=0;
  while(out.length<n && guard++<50){ let r=Math.random()*Object.values(w).reduce((a,b)=>a+b,0), tier=null; for(const k in w){ r-=w[k]; if(r<=0){tier=k;break;} } tier=tier||"commune"; const id=POOL[tier][rnd(POOL[tier].length)]; if(!out.includes(id)) out.push(id); } return out; }
const DECK_MIN = 8;
const KW_HELP = `<details class="small" style="margin-top:10px"><summary><b>Les mots des cartes</b></summary>
  <div style="margin-top:4px"><b>Innée</b> : toujours dans la main au premier tour.<br><b>Retenue</b> : reste dans la main à la fin du tour.<br><b>Éphémère</b> : si elle est encore en main à la fin du tour, elle est épuisée.<br><b>Épuise</b> : retirée jusqu'à la fin du combat une fois jouée.<br><b>X</b> : utilise toute l'énergie restante ; l'effet se répète X fois.<br><b>Pouvoir</b> : effet qui dure tout le combat.<br><b style="color:#b8860b">Légendaire</b> : offerte par un client apaisé, ou rarement par un villageois de jour. Unique et introuvable ailleurs.</div></details>`;
function showDeck(tab){
  ensureDeck(); S.reserve=S.reserve||[];
  U.deckTab = tab || U.deckTab || "deck";
  const locked = U.inDungeon;
  const list = U.deckTab==="deck" ? S.deck : S.reserve;
  const cnt={}; list.forEach(id=>cnt[id]=(cnt[id]||0)+1);
  const tabs = `<div class="row" style="margin-bottom:8px"><button class="sm ${U.deckTab==="deck"?"":"alt"}" data-act="deckTab" data-t="deck">Deck (${S.deck.length})</button><button class="sm ${U.deckTab==="reserve"?"":"alt"}" data-act="deckTab" data-t="reserve">Réserve (${S.reserve.length})</button><span class="grow"></span><button class="sm ghost" data-act="closeModal">Fermer</button></div>`;
  const help = locked ? `<p class="small" style="color:var(--candle)">Un Labyrinthe est en cours : le deck est déjà entre les mains du client. Tu pourras le modifier après l'aube.</p>`
    : U.deckTab==="deck" ? `<p class="small muted">Dans le Labyrinthe, c'est le client qui joue ces cartes. Touche une carte pour la ranger dans la réserve (minimum ${DECK_MIN} cartes dans le deck). Un deck plus léger pioche plus souvent tes meilleures cartes.</p>`
    : `<p class="small muted">Les cartes rangées ici ne sont pas jouées. Touche une carte pour la remettre dans le deck.</p>`;
  const grid = Object.keys(cnt).length ? `<div class="dgrid">${Object.keys(cnt).map(id=>`<div class="dwrap" ${locked?"":`data-act="moveCard" data-k="${id}"`}>${cardHTML(id)}${cnt[id]>1?`<span class="dcnt">×${cnt[id]}</span>`:""}</div>`).join("")}</div>`
    : `<p class="small muted center" style="margin:20px 0">${U.deckTab==="deck"?"Ton deck est vide.":"La réserve est vide."}</p>`;
  openModal(`<h3>Le deck du Tenancier</h3>${tabs}${help}${grid}${KW_HELP}`);
}
function moveCard(id){
  if(U.inDungeon) return; S.reserve=S.reserve||[];
  if(U.deckTab==="deck"){
    if(S.deck.length<=DECK_MIN){ toast(`Le deck doit garder au moins ${DECK_MIN} cartes.`); return; }
    const i=S.deck.indexOf(id); if(i<0) return; S.deck.splice(i,1); S.reserve.push(id); toast(`${CARDS[id].n} rangée dans la réserve.`);
  } else {
    const i=S.reserve.indexOf(id); if(i<0) return; S.reserve.splice(i,1); S.deck.push(id); toast(`${CARDS[id].n} remise dans le deck.`);
  }
  save(); showDeck();
}

// --- Labyrinthe ---
function runHPBonus(x){ const _b=runHPBonus0(x); _b.push(...relicHP()); if(S.equip.faille) _b.push({hp:6,t:"🔮 Éclat de la Faille"}); if(omen()==="brume") _b.push({hp:8,t:"🌫️ Brume de la Faille : la brume le protège"}); return _b; }
function runHPBonus0(x){
  const st=S.clients[x.k], out=[];
  if(x.duo){ out.push({t:`Le Tenancier et ${finaleMate().n}, ensemble`, hp:20}); return out; }
  if(x.pg && x.k==="__ten"){ out.push({t:"Le Tenancier en personne", hp:10},{t:`Niveau ${S.level}`, hp:Math.min(20,S.level*2)}); return out; }
  const obs=Math.min(2, st.obs||0);
  if(obs) out.push({t:`${obs} observation${obs>1?"s":""} en silence au comptoir`, hp:4*obs});
  if(st.aff>=1) out.push({t:`Affinité ${hearts(st.aff)}`, hp:5*st.aff});
  if(staffOn("machopeur") && x.k!=="machopeur") out.push({t:"Entraîné par Machopeur", hp:6});
  if(hasBib("lanterne")) out.push({t:"Lanterne de poche (bibelot)", hp:8});
  if(x.ten>=3) out.push({t:"Stressé : il commence chaque combat Faible", hp:0, bad:true});
  if(x.hang>=2) out.push({t:"Gueule de bois", hp:-6, bad:true});
  return out;
}
function runCards(x){
  const d=CL[x.k], extra=[];
  migrateFrags();
  S.fragments.filter(f=>ownFrag(f,x.k)).forEach(f=>{ const F=FRAG_CARD[f.e]||FRAG_CARD.joie;
    extra.push(Object.assign({n:f.n.length>22?f.n.slice(0,21)+"…":f.n,full:f.n,c:0,t:F.dmg?"atk":"skill",exhaust:true,r:"frag",i:EMO[f.e].i,emo:f.e,frag:f,d:`Souvenir. ${F.txt}. Doublé contre un Écho que ${EMO[f.e].n} dissout. Usage unique.`},F)); });
  (S.keywords[x.k]||[]).forEach(k=>{ if(!d.reform[k]) return;
    extra.push({n:`« ${k} »`,c:0,t:"skill",energy:1,draw:1,exhaust:true,r:"kw",i:"💬",kw:k,d:`Lui rappeler ce qu'il t'a confié. +1 énergie, pioche 1. Si c'est la salle dont il parle : 10 dégâts. Épuise.`}); });
  return extra;
}
// Deck du Labyrinthe : celui du Tenancier, moins les cartes confiées à l'acolyte pour le Grand Écho
function deckForRun(x){ const d=S.deck.slice().concat(x.hector?HECTOR_CARDS:[]); (x.cogCards||[]).forEach(id=>{ const i=d.indexOf(id); if(i>=0) d.splice(i,1); }); return d; }
function setupDungeon(){
  U.inDungeon=true; ensureDeck(); relicInit();
  const D=U.dawn, x=D.list[D.i], d=CL[x.k];
  D.finale=!!x.finale; D.map = x.pg ? x.map : x.finale ? (FINALE_MAPS[S.season||1] || FINALE_MAP) : null;
  const bon=runHPBonus(x);
  const maxhp = 40 + bon.reduce((a,b)=>a+(b.hp||0),0);
  Object.assign(D,{x, node:null, prev:null, visited:[], phase:"intro", out:null, bonuses:bon, seenTypes:{}, hp:maxhp, maxhp,
    run:deckForRun(x).map(id=>({id})).concat(runCards(x).map(cd=>({id:"_x",cd}))), temp:[], combat:null, tuto:{}, msg:null, ending:false});
  if(x.duo && x.hector){ playDialog([{who:"narr",t:`Le Tenancier et Hector descendent les marches côte à côte. Pour la première fois depuis cent ans, Hector pose le pied sur l'escalier de sa propre cave.`},{who:"hector",t:`J'ai glissé trois de mes cartes dans ton deck, petit. Et donne-moi les tiennes : j'en jouerai une à chaque tour. C'est mon donjon. Je ne te laisserai pas y aller seul.`}], ()=>renderDungeon(), ()=>renderDungeon()); return; }
  if(x.duo){ playDialog([{who:"narr",t:`Le Tenancier et ${cog().n} descendent les marches côte à côte. En bas, la lumière a toutes les couleurs des âmes de la saison.`},{who:"cog",t:`J'ai mes ${x.cogCards.length} cartes, patron. Une par tour : je te couvre !`}], ()=>renderDungeon(), ()=>renderDungeon()); return; }
  if(!S.dungeonDeckTuto){
    const lines=[
      {who:"narr",t:d.n+" descend les marches, une à une, et disparaît dans la lumière violette. À travers les Fragments, tu le vois."},
      {who:"cog",t:"En bas, les ombres de son passé vont l'attaquer. Il ne peut pas les fuir : il va devoir se battre."},
      {who:"cog",t:"Et c'est <b>ton deck</b> qu'il a en main ! Toutes les cartes que tu as gagnées en écoutant les clients, en servant ceux du jour, au marché… elles sont à lui, maintenant."},
      {who:"cog",t:"Ses souvenirs et les mots qu'il t'a confiés deviennent aussi des cartes spéciales, rien que pour son Labyrinthe. S'il tombe à zéro PV, il remonte, et c'est un échec."}
    ];
    S.dungeonDeckTuto=true;
    playDialog(lines, ()=>renderDungeon(), ()=>renderDungeon());
  } else renderDungeon();
}
function miniHP(hp,max,block){ const p=Math.max(0,hp)/max*100; return `<div class="minihp ${block?"sh":""}">${block?`<span class="blk">🛡${block}</span>`:""}<div class="bar"><i style="width:${p}%"></i></div></div><div class="hpt">${Math.max(0,hp)}/${max}</div>`; }
function hpBar(hp,max,block){ const p=Math.max(0,hp)/max*100; return `<div class="hpbar"><i style="width:${p}%"></i><span>${Math.max(0,hp)}/${max}${block?` · 🛡️${block}`:""}</span></div>`; }
function stHTML(o){ const s=[]; ["burn","seed","soak","para","fear","elan","poison","frost","confus"].forEach(k=>{ if(o[k]) s.push(`<span class="st s-${k}">${STATUS[k].i}${o[k]}</span>`); }); if(o.str) s.push(`<span class="st str">💪${o.str}</span>`); if(o.weak) s.push(`<span class="st weak">☁️${o.weak}</span>`); if(o.vuln) s.push(`<span class="st vuln">💔${o.vuln}</span>`); if(o.stun) s.push(`<span class="st">💤</span>`); if(o.regen) s.push(`<span class="st str">✚${o.regen}</span>`); if(o.blockTurn) s.push(`<span class="st">🔷${o.blockTurn}</span>`); return s.join(""); }
function enterNode(id){
  const D=U.dawn, d=CL[D.x.k], n=dmap().nodes[id];
  D.prev=D.node; D.node=id; D.visited.push(id); D.msg=null;
  if(n.t==="entree"||n.t==="echo"||n.t==="coeur"){ startCombat(makeEnemy(n,id)); return; }
  D.phase = n.t; // carrefour | sanctuaire | enigme
  if(n.t==="enigme") D.event = makeEvent(n);
  renderDungeon();
}
// ---------- Difficulté des ombres ----------
// hp/atk : multiplicateurs de base ; hpSe/atkSe : progression par saison (les ombres finales des Grands Échos ont leurs propres valeurs)
// (saison 1 plus douce : c'est la saison où l'on apprend ; réglages vérifiés avec tests/sim.py)
const DIFF = {hp:1.25, atk:1.6, hp1:1.1, atk1:1.15, hpSe:0.12, atkSe:0.05, fin:1.35};
function seN(){ return S.season||1; }
function scaleHP(v){ return Math.round(v*(seN()===1?DIFF.hp1:DIFF.hp)*(1+DIFF.hpSe*(seN()-1))); }
function scaleDmg(v){ return Math.round(v*(seN()===1?DIFF.atk1:DIFF.atk)*(1+DIFF.atkSe*(seN()-1))); }
function scaleMoves(moves){ return moves.map(m=>Object.assign({},m, ["atk","def","drain","shatter","heal"].includes(m.a)&&m.v?{v:scaleDmg(m.v)}:{}, m.dmg?{dmg:scaleDmg(m.dmg)}:{})); }
function makeEnemy(n,id){ if(U.dawn&&U.dawn.pg) return makeEnemyPG(n); const en=makeEnemy0(n,id);
  // ombre finale d'un Grand Écho : ses coups sont déjà réglés à la main pour sa saison, seul le multiplicateur de base s'applique
  if(U.dawn&&U.dawn.finale&&en.boss){ const a=DIFF.fin; en.moves=en.moves.map(m=>Object.assign({},m,(m.a==="atk"||m.a==="def")&&m.v?{v:Math.round(m.v*a)}:{},m.dmg?{dmg:Math.round(m.dmg*a)}:{})); }
  else en.moves=scaleMoves(en.moves);
  return en; }
function makeEnemy0(n,id){
  const D=U.dawn, k=D.x.k, d=CL[k];
  if(n.t==="entree") return {n:"Ombre errante",id:d.id,self:true,hp:scaleHP(20),e:null,moves:[{a:"atk",v:6},{a:"def",v:5},{a:"atk",v:8}]};
  if(n.t==="coeur"){ const b=n.boss||BOSS[k]||{id:d.id,n:"Ombre du regret",self:true};
    return {n:b.n,id:b.self?d.id:b.id,self:!!b.self,boss:true,hp:scaleHP(b.hp||85),e:n.key,vuln:hasBib("carnet")?2:0,
      moves: b.moves || [{a:"atk",v:11},{a:"buff",v:3},{a:"atk",v:6,x:2},{a:"weak",v:2,dmg:8},{a:"atk",v:17},{a:"def",v:14}]}; }
  const strong = (n.dmg||1)>=2;
  const foe = n.foe && !(BOSS[k] && BOSS[k].id===n.foe.id && !BOSS[k].self) ? n.foe : null;
  const base = {colere:[{a:"atk",v:9},{a:"burn",v:3,dmg:5},{a:"buff",v:2},{a:"atk",v:11}], tristesse:[{a:"weak",v:1,dmg:6},{a:"atk",v:10},{a:"def",v:8}], peur:[{a:"atk",v:4,x:2},{a:"vuln",v:1,dmg:6},{a:"atk",v:11}], nostalgie:[{a:"def",v:9},{a:"atk",v:10},{a:"atk",v:8}], joie:[{a:"atk",v:8},{a:"def",v:6}]}[n.e]||[{a:"atk",v:8},{a:"def",v:6}];
  const moves = base.map(m=>Object.assign({},m, m.v&&m.a==="atk"?{v:m.v+(strong?3:0)}:{} ));
  return {n:foe?`Écho de ${foe.n}`:`Écho de ${EMO[n.e].n}`,id:foe?foe.id:d.id,self:!foe,hp:scaleHP(strong?46:34),e:n.e,moves};
}
function startCombat(en){
  const D=U.dawn;
  en.maxhp=en.hp; en.block=0; en.str=0; en.weak=0; en.vuln=en.vuln||0; en.stun=0; en.mi=0; en.burn=0; en.seed=0; en.soak=0; en.para=0; en.fear=0;
  const pile0 = shuffle(D.run.concat(D.temp));
  const pile = pile0.filter(e=>!cardOf(e).innate).concat(pile0.filter(e=>cardOf(e).innate));
  D.combat={en, draw:pile, hand:[], disc:[], exh:[], energy:3, block:0, blockNext:0, str:0, burn:0, elan:0, weak:(D.x.ten>=3&&!D.x.remede)?1:0, vuln:0, regen:0, blockTurn:0, turn:0, log:"", over:false};
  D.phase="combat"; D.relicMsg=null; D.relicInfo=null;
  if(S.equip.ceinture) D.combat.str+=1;
  if(S.equip.micro) en.weak+=1;
  if(S.equip.corne) en.soak+=3;
  relicFx("combatStart", D.combat, en, D);
  if(en.boss) music("donjon");
  startTurn();
}
const HAND_MAX = 8; // main de 8 cartes maximum (3-3-2)
function drawCards(n){ const C=U.dawn.combat; for(let i=0;i<n;i++){ if(!C.draw.length){ if(!C.disc.length) break; C.draw=shuffle(C.disc); C.disc=[]; } if(C.hand.length>=HAND_MAX) break; C.hand.push(C.draw.pop()); } }
function startTurn(){
  const D=U.dawn, C=D.combat; C.turn++;
  C.energy = 3 + (C.turn===1 && S.equip.bonnet ? 1 : 0); C.emax = C.energy; C.playedTurn=0;
  C.cogUsed=false; if(C.turn===1){ C.cogSpent=[]; C.cogMsg=null; }
  C.block = (C.keepBlock?C.block:0) + C.blockNext; C.blockNext=0;
  C.hurtLast = C.hurtTurn||0;
  if(C.turn>1 && C.strTurn) C.str+=C.strTurn;
  if(C.turn===1 && S.equip.bavoir) C.block+=8;
  relicFx("turnStart", C, D);
  if(C.blockTurn) C.block+=C.blockTurn;
  if(C.regen){ D.hp=Math.min(D.maxhp,D.hp+C.regen); }
  if(C.turn>1 && C.elan) C.elan--;
  if(C.burn){ D.hp-=C.burn; C.log=(C.log?C.log+" · ":"")+`🔥 Il brûle : -${C.burn} PV`; C.burn--; if(koCheck()) return; }
  if(C.frost){ C.energy=Math.max(1,C.energy-C.frost); C.log=(C.log?C.log+" · ":"")+`❄️ Gelé : −${C.frost} énergie`; C.frost=0; }
  if(C.poison){ D.hp-=C.poison; C.log=(C.log?C.log+" · ":"")+`☠️ Poison : -${C.poison} PV`; if(koCheck()) return; }
  const confus=C.confus?2*C.confus:0; C.confus=0;
  drawCards(Math.max(1, 5 + (C.turn===1 && S.equip.echarpe ? 2 : 0) + relicFx("draw", C, D) - confus));
  renderDungeon();
}
function cardOf(e){ return e.id==="_x" ? e.cd : CARDS[e.id]; }
function effective(cd){ const C=U.dawn.combat; if(!cd.emo || !C.en.e) return 1; if(COUNTERS[cd.emo] && COUNTERS[cd.emo].includes(C.en.e)) return 2; if(cd.emo===C.en.e) return 0.5; return 1; }
function hitEnemy(base){
  const C=U.dawn.combat, en=C.en;
  let v=base+C.str+(C.elan||0); if(C.weak) v=Math.floor(v*0.75); v+=(en.soak||0); if(en.vuln) v=Math.floor(v*1.5);
  const ab=Math.min(en.block,v); en.block-=ab; en.hp-=(v-ab); return v-ab;
}
function playCard(i, tg){
  const D=U.dawn, C=D.combat; if(!C||C.over) return;
  const e=C.hand[i]; if(!e) return; const cd=cardOf(e); C.target = tg||0; U.aim=null;
  if(cd.frag && !(cd.unplayable || cd.c>C.energy)){ const j=D.run.indexOf(e); if(j>=0) D.run.splice(j,1); S.fragments=S.fragments.filter(f=>f!==cd.frag); }
  if(cd.unplayable || cd.c>C.energy) { toast(cd.unplayable?"Cette carte ne peut pas être jouée.":"Pas assez d'énergie."); return; }
  const X = cd.x ? C.energy : 0;
  C.energy-= cd.x ? C.energy : cd.c; C.hand.splice(i,1);
  if(cd.copyLast && C.lastCard){ applyCard(C.lastCard, C.en, ["reflet : "+C.lastCard.n]); }
  if(!cd.copyLast) C.lastCard=cd;
  C.playedTurn=(C.playedTurn||0)+1;
  const m=effective(cd); const k=x=>Math.round(x*m);
  let log=[`${cd.full||cd.n}`];
  if(m===2) log.push("<b style='color:var(--good)'>efficace !</b>"); if(m===0.5) log.push("<i>l'Écho s'en nourrit…</i>");
  if(cd.dmg){ let base=k(cd.dmg); if(cd.revenge) base+=C.hurtLast||0; if(cd.firstDouble && !(C.playedTurn>1)){ base*=2; log.push("<b>premier coup !</b>"); } if(S.equip.poireau && !C.poireauUsed && cd.t==="atk"){ base+=6; C.poireauUsed=true; log.push("🥬 Poireau"); } if(cd.execute && C.en.hp<C.en.maxhp/2){ base*=2; log.push("<b>coup de grâce !</b>"); } let tot=0; for(let h=0;h<(cd.hits||1);h++) tot+=hitEnemy(base); log.push(`${tot} dégâts`); if(C.burnOnAtk){ C.en.burn+=C.burnOnAtk; } }
  if(cd.xHits){ let tot=0; for(let h=0;h<X;h++) tot+=hitEnemy(cd.xHits); log.push(X?`${tot} dégâts (×${X})`:"rien… plus d'énergie"); if(cd.xPara&&X){ C.en.para+=X; if(C.en.para>=3){ C.en.para=0; C.en.stun=1; log.push("<b>paralysé !</b>"); } } if(C.burnOnAtk&&X) C.en.burn+=C.burnOnAtk; }
  if(cd.kw){ const roomKw=(ROOM_KW[D.x.k]||{})[D.node]; if(roomKw===cd.kw){ const t=hitEnemy(10); log.push(`il reconnaît la salle ! ${t} dégâts`); } }
  if(cd.block){ C.block+=k(cd.block); }
  if(cd.dmgBlock){ const t=hitEnemy(C.block); log.push(`${t} dégâts (Bouclier)`); if(C.burnOnAtk) C.en.burn+=C.burnOnAtk; }
  if(cd.cleanse){ C.weak=0; C.vuln=0; C.burn=0; C.poison=0; C.frost=0; C.confus=0; }
  if(cd.steal){ const b=C.en.block||0; C.block+=b; C.en.block=0; let f=0; if(C.en.str>0){ C.en.str--; C.str++; f=1; } log.push(`vole ${b} de Bouclier${f?" et 1 Force":""}`); }
  if(cd.metronome){ const all=POOL.commune.concat(POOL.peu,POOL.rare); const pick=CARDS[all[rnd(all.length)]]; log.push(`le doigt désigne… <b>${pick.n}</b> !`); applyCard(pick, C.en, log); if(pick.blockTurn) C.blockTurn+=pick.blockTurn; if(pick.regen) C.regen+=pick.regen; }
  if(cd.thorns){ C.thorns=(C.thorns||0)+cd.thorns; }
  if(cd.rage){ C.rage=(C.rage||0)+cd.rage; }
  if(cd.burnOnAtk){ C.burnOnAtk=(C.burnOnAtk||0)+cd.burnOnAtk; }
  if(cd.keepBlock){ C.keepBlock=true; }
  if(cd.strTurn){ C.strTurn=(C.strTurn||0)+cd.strTurn; }
  if(cd.blockNext){ C.blockNext+=cd.blockNext; }
  if(cd.heal){ D.hp=Math.min(D.maxhp,D.hp+k(cd.heal)); }
  if(cd.selfDmg){ D.hp-=cd.selfDmg; }
  if(cd.vuln){ C.en.vuln+=k(cd.vuln); }
  if(cd.weak){ C.en.weak+=k(cd.weak); }
  if(cd.str){ C.str+=k(cd.str); }
  if(cd.stun){ C.en.stun=1; }
  if(cd.burn){ C.en.burn+=k(cd.burn)+(S.equip.ruban?1:0); }
  if(cd.burnX2){ C.en.burn*=2; log.push(`Brûlure ${C.en.burn}`); }
  if(cd.seed){ C.en.seed+=k(cd.seed); }
  if(cd.soak){ C.en.soak+=k(cd.soak); }
  if(cd.para){ C.en.para+=k(cd.para); if(C.en.para>=3){ C.en.para=0; C.en.stun=1; log.push("<b>paralysé !</b>"); } }
  if(cd.fear){ C.en.fear+=k(cd.fear); }
  if(cd.elan){ C.elan+=k(cd.elan); }
  if(cd.energy){ C.energy+=cd.energy; }
  if(cd.regen){ C.regen+=cd.regen; }
  if(cd.blockTurn){ C.blockTurn+=cd.blockTurn; }
  if(cd.draw){ drawCards(cd.draw); }
  if(cd.exhaust||cd.t==="power") C.exh.push(e); else C.disc.push(e);
  C.log=log.join(" · ");
  if(cd.dmg||cd.kw||cd.xHits||cd.dmgBlock) { C.hitFx=true; }
  if(koCheck()) return;
  if(C.en.hp<=0){ winCombat(); return; }
  renderDungeon();
}
function applyCard(cd, en, log){
  const D=U.dawn, C=D.combat;
  if(cd.dmg){ let t=0; for(let h=0;h<(cd.hits||1);h++) t+=hitEnemy(cd.dmg); log.push(`${t} dégâts`); }
  if(cd.block) C.block+=cd.block; if(cd.dmgBlock) hitEnemy(C.block);
  if(cd.heal) D.hp=Math.min(D.maxhp,D.hp+cd.heal);
  ["vuln","weak","burn","seed","soak","fear"].forEach(s=>{ if(cd[s]) en[s]+=cd[s]; });
  if(cd.str) C.str+=cd.str; if(cd.elan) C.elan+=cd.elan; if(cd.draw) drawCards(cd.draw);
  if(cd.para){ en.para+=cd.para; if(en.para>=3){ en.para=0; en.stun=1; } }
  if(cd.stun) en.stun=1; if(cd.energy) C.energy+=cd.energy;
  if(cd.thorns) C.thorns=(C.thorns||0)+cd.thorns; if(cd.rage) C.rage=(C.rage||0)+cd.rage; if(cd.burnOnAtk) C.burnOnAtk=(C.burnOnAtk||0)+cd.burnOnAtk;
  if(cd.burnX2) en.burn*=2; if(cd.xHits){ for(let h=0;h<2;h++) hitEnemy(cd.xHits); }
}
// ---- Jouer une carte à la Slay the Spire : glisser, viser avec une flèche, relâcher sur la cible ----
function needsTarget(cd){ return !!(cd.dmg||cd.xHits||cd.dmgBlock||cd.vuln||cd.weak||cd.burn||cd.burnX2||cd.seed||cd.soak||cd.para||cd.fear||cd.stun||cd.steal||cd.kw); }
function aimSvg(){ let g=document.getElementById("aimsvg"); if(!g){ g=document.createElementNS("http://www.w3.org/2000/svg","svg"); g.id="aimsvg";
  g.innerHTML=`<defs><marker id="aimhead" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="20" markerHeight="20" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="aimhead"/></marker></defs><path id="aimpath" marker-end="url(#aimhead)"/>`; document.body.appendChild(g); } return g; }
function drawAim(x0,y0,x,y,hot){ const g=aimSvg(); g.style.display="block"; g.classList.toggle("hot",!!hot);
  const cx=x0+(x-x0)*0.15, cy=Math.min(y0,y)-Math.abs(x-x0)*0.25-60; g.querySelector("#aimpath").setAttribute("d",`M${x0},${y0} Q${cx},${cy} ${x},${y}`); }
function hideAim(){ const g=document.getElementById("aimsvg"); if(g) g.style.display="none"; document.querySelectorAll("[data-foe].targeted").forEach(e=>e.classList.remove("targeted")); }
function foeAt(x,y){ const el=document.elementFromPoint(x,y); const f=el&&el.closest&&el.closest("[data-foe]"); return f; }
function cardStart(el){ const r=el.getBoundingClientRect(); return {x:r.left+r.width/2, y:r.top+6}; }
(function installDrag(){
  let D=null;
  document.addEventListener("pointerdown",e=>{
    const el=e.target.closest&&e.target.closest(".dhand.fight .dcard[data-hi]"); 
    if(U.aim && !el){ return; }
    if(!el) return;
    const i=Number(el.dataset.hi), C=U.dawn&&U.dawn.combat; if(!C||C.over) return;
    const cd=cardOf(C.hand[i]); 
    D={i, el, tgt:el.dataset.tgt==="1", x0:e.clientX, y0:e.clientY, moved:false, dis:el.classList.contains("dis"), why:cd.unplayable?"Cette carte ne peut pas être jouée.":"Pas assez d'énergie."};
    e.preventDefault();
  },{passive:false});
  document.addEventListener("pointermove",e=>{
    if(U.aim && !D){ const a=U.aim, el=document.querySelector(`.dhand.fight .dcard[data-hi="${a.i}"]`); if(!el){ U.aim=null; hideAim(); return; } const st=cardStart(el), f=foeAt(e.clientX,e.clientY);
      document.querySelectorAll("[data-foe]").forEach(x=>x.classList.toggle("targeted",x===f)); drawAim(st.x,st.y,e.clientX,e.clientY,!!f); return; }
    if(!D) return;
    const dx=e.clientX-D.x0, dy=e.clientY-D.y0;
    if(!D.moved && Math.hypot(dx,dy)<8) return;
    if(D.dis){ return; }
    if(!D.moved){ D.moved=true; D.el.classList.add(D.tgt?"aiming":"dragging"); }
    if(D.tgt){ const st=cardStart(D.el), f=foeAt(e.clientX,e.clientY); document.querySelectorAll("[data-foe]").forEach(x=>x.classList.toggle("targeted",x===f)); drawAim(st.x,st.y,e.clientX,e.clientY,!!f); }
    else { const z=typeof deskZoom==="function"?deskZoom():1; D.el.style.transform=`translate(${dx/z}px,${dy/z}px) scale(1.12)`; const hz=document.querySelector(".handzone"); D.el.classList.toggle("ready", hz && e.clientY < hz.getBoundingClientRect().top-10); }
  });
  document.addEventListener("pointerup",e=>{
    // mode visée après un simple toucher sur une carte à cible
    if(U.aim && !D){ const f=foeAt(e.clientX,e.clientY), a=U.aim; hideAim(); U.aim=null;
      const el=document.querySelector(`.dhand.fight .dcard[data-hi="${a.i}"]`); if(el) el.classList.remove("aiming");
      if(f) playCard(a.i, Number(f.dataset.foe)); return; }
    if(!D) return; const d=D; D=null;
    if(d.dis){ toast(d.why); return; }
    if(!d.moved){ // toucher
      if(d.tgt){ U.aim={i:d.i}; d.el.classList.add("aiming"); document.querySelectorAll("[data-foe]").forEach(x=>x.classList.add("pickable")); const st=cardStart(d.el); const f=document.querySelector("[data-foe]"); if(f){ const r=f.getBoundingClientRect(); drawAim(st.x,st.y,r.left+r.width/2,r.top+r.height/2,false); } }
      else playCard(d.i);
      return; }
    hideAim(); d.el.classList.remove("aiming","dragging","ready"); d.el.style.transform="";
    if(d.tgt){ const f=foeAt(e.clientX,e.clientY); if(f) playCard(d.i, Number(f.dataset.foe)); }
    else { const hz=document.querySelector(".handzone"); if(hz && e.clientY < hz.getBoundingClientRect().top-10) playCard(d.i); }
  });
  document.addEventListener("pointercancel",()=>{ if(D){ D.el.classList.remove("aiming","dragging","ready"); D.el.style.transform=""; } D=null; hideAim(); });
})();
function statusLegend(C){
  const rows=[];
  ["burn","seed","soak","para","fear"].forEach(k=>{ if(C.en[k]) rows.push(`${STATUS[k].i} <b>${STATUS[k].n} ${C.en[k]}</b> (ombre) : ${STATUS[k].d(C.en[k])}`); });
  if(C.burn) rows.push(`🔥 <b>Brûlure ${C.burn}</b> (${CL[U.dawn.x.k].n}) : ${STATUS.burn.d(C.burn)}`);
  if(C.elan) rows.push(`🪶 <b>Élan ${C.elan}</b> : ${STATUS.elan.d(C.elan)}`);
  ["poison","frost","confus"].forEach(k=>{ if(C[k]) rows.push(`${STATUS[k].i} <b>${STATUS[k].n} ${C[k]}</b> (${CL[U.dawn.x.k].n}) : ${STATUS[k].d(C[k])}`); });
  return rows.length?`<div class="legend small">${rows.join("<br>")}</div>`:"";
}
function intentText(m, en){
  const str=en.str||0, w=en.weak?0.75:1;
  const dmg=v=>{ let x=Math.floor(Math.max(0,v+str-(en.fear||0))*w); if(U.dawn.combat.vuln) x=Math.floor(x*1.5); return x; };
  if(m.a==="atk") return `⚔️ ${dmg(m.v)}${m.x?`×${m.x}`:""}`;
  if(m.a==="def") return `🛡️ ${m.v}`;
  if(m.a==="buff") return `💪 +${m.v}`;
  if(m.a==="weak") return `☁️ Faible${m.dmg?` · ⚔️ ${dmg(m.dmg)}`:""}`;
  if(m.a==="vuln") return `💔 Vulnérable${m.dmg?` · ⚔️ ${dmg(m.dmg)}`:""}`;
  if(m.a==="burn") return `🔥 Brûlure${m.dmg?` · ⚔️ ${dmg(m.dmg)}`:""}`;
  if(m.a==="poison") return `☠️ Poison${m.dmg?` · ⚔️ ${dmg(m.dmg)}`:""}`;
  if(m.a==="frost") return `❄️ Gel${m.dmg?` · ⚔️ ${dmg(m.dmg)}`:""}`;
  if(m.a==="confus") return `💫 Confus${m.dmg?` · ⚔️ ${dmg(m.dmg)}`:""}`;
  if(m.a==="hex") return `🌀 Maléfice${m.dmg?` · ⚔️ ${dmg(m.dmg)}`:""}`;
  if(m.a==="drain") return `🩸 Drain ⚔️ ${dmg(m.v)}`;
  if(m.a==="shatter") return `💥 Brise ⚔️ ${dmg(m.v)}`;
  if(m.a==="heal") return `✚ Soin ${m.v}`;
  return "?";
}
function hitClient(v){
  const D=U.dawn, C=D.combat, en=C.en;
  let x=Math.max(0,v+(en.str||0)-(en.fear||0)); if(en.weak) x=Math.floor(x*0.75); if(C.vuln) x=Math.floor(x*1.5);
  if(C.disguise && x>0){ C.disguise=false; x=0; C.log=(C.log?C.log+" · ":"")+"🎭 Le Déguisement encaisse le coup"; }
  const ab=Math.min(C.block,x); C.block-=ab; D.hp-=(x-ab);
  if(x-ab>0){ C.hurtAll=(C.hurtAll||0)+(x-ab); C.hurtTurn=(C.hurtTurn||0)+(x-ab); if(C.rage) C.str+=C.rage; }
  if(C.thorns){ en.hp-=C.thorns; }
  return x-ab;
}
function endTurn(){
  const D=U.dawn, C=D.combat; if(!C||C.over) return;
  if(D.x.duo && !C.cogUsed){ cogAct(); if(C.over || U.dawn.combat!==C || C.en.hp<=0 || U.dawn.phase!=="combat") return; }
  const keep=[]; C.hand.forEach(e=>{ const cd=cardOf(e); if(cd.retain) keep.push(e); else if(cd.ethereal) C.exh.push(e); else C.disc.push(e); }); C.hand=keep;
  C.hurtTurn=0; C.lastCard=null;
  if(C.weak) C.weak--; if(C.vuln) C.vuln--;
  const en=C.en; en.block=0;
  let log="", dot=[];
  if(en.burn){ en.hp-=en.burn; dot.push(`🔥 -${en.burn}`); en.burn--; }
  if(en.seed){ const v=Math.ceil(Math.min(en.seed, Math.max(0,en.hp))/2); en.hp-=en.seed; D.hp=Math.min(D.maxhp,D.hp+v); dot.push(`🌱 -${en.seed} (+${v} PV pour ${CL[D.x.k].n})`); en.seed--; }
  if(en.hp<=0){ C.log=dot.join(" · "); winCombat(); return; }
  if(en.stun){ en.stun=0; log=`${en.n} dort profondément et ne fait rien.`; }
  else {
    const m=en.moves[en.mi%en.moves.length]; let t=0;
    if(m.a==="atk"){ for(let h=0;h<(m.x||1);h++) t+=hitClient(m.v); log=`${en.n} frappe : ${t} dégâts.`; }
    if(m.a==="def"){ en.block+=m.v; log=`${en.n} se renforce (🛡️${m.v}).`; }
    if(m.a==="buff"){ en.str+=m.v; log=`${en.n} grandit : +${m.v} Force.`; }
    if(m.a==="weak"){ C.weak+=m.v; if(m.dmg) t=hitClient(m.dmg); log=`${en.n} le fait douter : Faible${t?`, ${t} dégâts`:""}.`; }
    if(m.a==="vuln"){ C.vuln+=m.v; if(m.dmg) t=hitClient(m.dmg); log=`${en.n} l'effraie : Vulnérable${t?`, ${t} dégâts`:""}.`; }
    if(m.a==="burn"){ C.burn+=m.v; if(m.dmg) t=hitClient(m.dmg); log=`${en.n} le brûle de colère : Brûlure ${m.v}${t?`, ${t} dégâts`:""}.`; }
    if(m.a==="poison"){ C.poison=(C.poison||0)+m.v; if(m.dmg) t=hitClient(m.dmg); log=`${en.n} l'empoisonne : Poison ${C.poison}${t?`, ${t} dégâts`:""}.`; }
    if(m.a==="frost"){ C.frost=(C.frost||0)+m.v; if(m.dmg) t=hitClient(m.dmg); log=`${en.n} le glace : −${m.v} énergie au prochain tour${t?`, ${t} dégâts`:""}.`; }
    if(m.a==="confus"){ C.confus=(C.confus||0)+m.v; if(m.dmg) t=hitClient(m.dmg); log=`${en.n} le désoriente : il piochera moins${t?`, ${t} dégâts`:""}.`; }
    if(m.a==="hex"){ for(let h=0;h<m.v;h++) C.draw.splice(rnd(C.draw.length+1),0,{id:"doute"}); if(m.dmg) t=hitClient(m.dmg); log=`${en.n} murmure une malédiction : un Doute se glisse dans sa pioche${t?`, ${t} dégâts`:""}.`; }
    if(m.a==="drain"){ t=hitClient(m.v); const h=Math.min(t,en.maxhp-en.hp); en.hp+=h; log=`${en.n} draine ses forces : ${t} dégâts${h?`, et récupère ${h} PV`:""}.`; }
    if(m.a==="shatter"){ const b=C.block; C.block=0; t=hitClient(m.v); log=`${en.n} brise sa garde${b?` (−${b} Bouclier)`:""} : ${t} dégâts.`; }
    if(m.a==="heal"){ const h=Math.min(m.v,en.maxhp-en.hp); en.hp+=h; log=`${en.n} se referme sur elle-même : +${h} PV.`; }
    en.mi++;
  }
  if(en.weak) en.weak--; if(en.vuln) en.vuln--; if(en.soak) en.soak--; if(en.fear) en.fear--;
  C.log=(dot.length?dot.join(" · ")+" · ":"")+log; C.hurtFx=true;
  if(koCheck()) return;
  if(en.hp<=0){ winCombat(); return; }
  startTurn();
}
function winCombat(){
  const D=U.dawn, C=D.combat, n=dmap().nodes[D.node]; C.over=true;
  jingle("apaise");
  if(!C.hurtAll && !D.finale) scInc("flawless");
  if(C.en.boss && !D.finale) scInc("boss");
  if(S.equip.coiffe){ const h=Math.min(4,D.maxhp-D.hp); D.hp+=h; if(h) D.relicMsg=(D.relicMsg?D.relicMsg+' · ':'')+`🩺 Coiffe de papier : +${h} PV`; }
  if(S.equip.ecaille && !C.en.boss){ const h=Math.min(5,D.maxhp-D.hp); D.hp+=h; D.relicMsg=h?`✨ Écaille brillante : +${h} PV`:null; }
  if(C.en.boss){ D.out="apaise"; D.phase="bosswin"; renderDungeon(); return; }
  D.reward = randomCards(3,{commune:5,peu:4,rare:1}).concat(Math.random()<0.5?["courage"]:["souffle"]).slice(0,3);
  D.phase="reward"; renderDungeon();
}
function koCheck(){
  const D=U.dawn, C=D.combat; if(D.hp>0) return false;
  if(S.equip.collier && !D.collierUsed){ D.collierUsed=true; D.hp=10; C.log=(C.log?C.log+" · ":"")+"🏷️ Le Collier de Ponchiot brille : il se relève avec 10 PV !"; return false; }
  if(C.wish){ C.wish=false; D.hp=11; C.log=(C.log?C.log+" · ":"")+"⭐ Le Papier à Vœux brille : il se relève avec 11 PV !"; return false; }
  loseRun(); return true;
}
const RELIC_EXTRA=[{key:"faille",n:"Éclat de la Faille",i:"🔮",d:"Le client descend avec +6 PV dans chaque Labyrinthe"}];
function allRelics(){ return giftOwners().map(c=>CL[c].gift).filter(Boolean).concat(RELIC_EXTRA); }
function relicIc(g){ return ARTOK['relic-'+g.key] ? `<img class="relimg" src="${artSrc('relic-'+g.key)}" alt="">` : g.i; }
function relicList(){ const r=allRelics().filter(g=>S.equip[g.key]); return r.length?`<div class="px" style="color:var(--candle);margin-top:8px">Artefacts</div>${r.map(g=>`<div class="small" style="margin-top:3px">${g.i} <b>${g.n}</b> : ${g.d}</div>`).join("")}`:""; }
function relicBar(){ const r=allRelics().filter(g=>S.equip[g.key]); return r.length?`<div class="relics">${r.map(g=>`<span class="relic ${g.key==='collier'&&U.dawn&&U.dawn.collierUsed?'used':''}" title="${g.n} : ${g.d}" data-act="relicInfo" data-k="${g.key}">${relicIc(g)}</span>`).join("")}</div>`:""; }
function loseRun(){
  const D=U.dawn; D.combat.over=true; D.hp=0;
  D.out = D.node && dmap().nodes[D.node].t==="coeur" ? "partiel" : "rechute";
  D.phase="lost"; renderDungeon();
}
function takeReward(i){ const D=U.dawn; if(i>=0){ D.temp.push({id:D.reward[i]}); toast(`${CARDS[D.reward[i]].n} rejoint son deck pour ce Labyrinthe.`); } D.reward=null; advance(); }
function advance(){
  const D=U.dawn, n=dmap().nodes[D.node];
  if(!n.nx.length){ endRun(); return; }
  if(n.nx.length===1){ enterNode(n.nx[0]); return; }
  D.phase="carrefour"; renderDungeon();
}
// --- événements (salles sans combat) : résultats cachés ---
function makeEvent(n){
  const D=U.dawn, k=D.x.k;
  const hasNeed = S.fragments.some(f=>ownFrag(f,k) && f.e===n.need);
  const kws=(S.keywords[k]||[]).length;
  const opts = shuffle([
    {l:"Lui tendre la main", fx: Math.random()<0.6 ? {card:"courage"} : {heal:6}},
    {l:"Le laisser fouiller seul dans ce souvenir", fx: Math.random()<0.5 ? {card:["griffacier","rafale","telekinesie","ultimapoing"][rnd(4)]} : {hurt:7, card:"doute"}},
    {l:`Chercher avec lui le souvenir de ${EMO[n.need].n} qui manque`, fx: hasNeed ? {heal:12, card:"souffle"} : {hurt:5}},
    {l:"Lui redire ce qu'il t'a confié au comptoir", fx: kws>=2 ? {heal:10} : {hurt:4}}
  ]).slice(0,3);
  return {opts, done:null};
}
function eventPick(i){
  const D=U.dawn, ev=D.event, o=ev.opts[i]; const r=[];
  if(o.fx.heal){ const h=Math.min(o.fx.heal, D.maxhp-D.hp); D.hp+=h; r.push(`Il se sent mieux. <span class="delta p">+${h} PV</span>`); }
  if(o.fx.hurt){ D.hp=Math.max(1,D.hp-o.fx.hurt); r.push(`Ce souvenir lui fait mal. <span class="delta n">-${o.fx.hurt} PV</span>`); }
  if(o.fx.card){ D.temp.push({id:o.fx.card}); r.push(`${CARDS[o.fx.card].t==="curse"?"Un doute s'installe":"Il en garde quelque chose"} : <b>${CARDS[o.fx.card].n}</b> rejoint son deck pour ce Labyrinthe.`); }
  ev.done=r.join("<br>"); renderDungeon();
}
function restPick(kind){
  const D=U.dawn;
  if(kind==="heal"){ const h=Math.min(Math.round(D.maxhp*(S.equip.oeuf?0.5:0.35)), D.maxhp-D.hp); D.hp+=h; D.msg=`Il s'assoit un moment. Sa respiration se calme. <span class="delta p">+${h} PV</span>`; }
  else { const i=D.run.findIndex(e=>e.id==="frappe"||e.id==="garde"); if(i>=0){ const c=CARDS[D.run[i].id].n; D.run.splice(i,1); D.msg=`Il repense au chemin parcouru, et laisse derrière lui ce qui ne lui sert plus. <b>${c}</b> retirée de son deck pour ce Labyrinthe.`; } else D.msg="Il n'a rien à laisser derrière lui."; }
  D.restDone=true; renderDungeon();
}
// --- tuto (Labyrinthe de Machopeur) ---
function deckTuto(key){
  const D=U.dawn; if(!tutoRun() || D.tuto[key]) return ""; D.tuto[key]=true;
  const T={
    combat:"Chaque tour, il a <b>3 énergies</b> et pioche 5 cartes. Le chiffre en haut à gauche d'une carte, c'est son coût. Touche une carte pour la jouer, puis « Fin du tour ».",
    intent:"Au-dessus de l'ombre, tu vois ce qu'elle va faire à son tour : ⚔️ elle frappe, 🛡️ elle se protège. Quand elle va frapper fort, joue des cartes de <b>Bouclier</b> : le Bouclier absorbe les dégâts, mais disparaît au tour suivant.",
    frag:"Les cartes en or, ce sont ses souvenirs et les mots qu'il t'a confiés. Un souvenir ne sert <b>qu'une seule fois</b> dans tout le Labyrinthe. Il est <b>doublé</b> contre un Écho que son émotion dissout (la Joie contre la Colère, par exemple). Un mot-clé frappe fort dans la salle dont il parle.",
    reward:"Après chaque victoire, il peut garder une carte de plus… mais seulement le temps de ce Labyrinthe. Pour agrandir ton vrai deck, écoute les clients, sers ceux du jour, et passe voir Kecleon.",
    carrefour:"Un carrefour ! Les salles où il peut aller brillent sur la carte : touche celle que tu choisis. Le nom de chaque salle est ton seul indice.",
    sanctuaire:"Un sanctuaire : il peut se soigner, ou alléger son deck pour ce Labyrinthe.",
    enigme:"Une salle sans combat : un souvenir où il faut faire un choix. Personne ne te dit ce que ça donne… Fie-toi à ce qu'il t'a confié.",
    boss:"Le Cœur du Regret ! L'ombre la plus forte de son passé. Garde tes meilleures cartes pour elle."
  };
  return `<div class="advice"><b class="tutotag">Tuto</b> <b>${cog().n} :</b> ${T[key]}</div>`;
}
function renderDungeon(){
  const D=U.dawn, x=D.x, d=CL[x.k];
  const n = D.node ? dmap().nodes[D.node] : null;
  let body="";
  if(U.dlg){ body = dialogBubble(); }
  else if(D.phase==="intro"){
    const deck=D.run.length;
    body = `<div class="card"><div class="px" style="color:var(--candle)">${D.pg?"Avant de descendre":"Ce que tu as appris au comptoir"}</div>
      ${D.bonuses.map(b=>`<div class="small" style="margin-top:4px">${b.hp>0?`<b style="color:var(--good)">+${b.hp} PV</b>`:b.hp<0?`<b style="color:var(--bad)">${b.hp} PV</b>`:"•"} ${b.t}</div>`).join("")}
      ${relicList()}
      <div class="small" style="margin-top:6px">PV de ${d.n} : <b>${D.maxhp}</b> · Deck : <b>${deck} cartes</b> dont <b>${D.run.filter(e=>e.id==="_x").length}</b> souvenirs et mots-clés</div>
      ${D.pg?`<div class="small" style="margin-top:8px;color:#c9a8ff">✦ <b>Un donjon rêvé par la Faille</b> : des salles venues de tous les Labyrinthes, des ombres au hasard. Méfie-toi de leurs nouveaux tours : ☠️ poison, ❄️ gel, 💫 confusion, 🌀 malédiction, 🩸 drain, 💥 brise-garde.</div>`:""}
      ${D.finale?`<div class="small" style="margin-top:8px;color:#c9a8ff">🌀 <b>Le Grand Écho</b> : toutes les âmes de la saison ont laissé une trace ici. <b>Tous les souvenirs</b> de la saison sont utilisables, quel que soit leur propriétaire.</div>`:""}
      <div class="small" style="margin-top:6px;color:#e9b8ff">💠 Chaque souvenir ne sert qu'<b>une fois</b> : joué, il disparaît. Ceux qui ne sont pas utilisés s'évanouissent à la fin de ce Labyrinthe.</div>
      <div class="small muted" style="margin-top:8px;border-top:1px solid #4a3324;padding-top:6px">${D.pg?"Il affronte les ombres de la Faille avec ton deck.":"Il affronte les ombres de son passé avec ton deck."} S'il tombe à 0 PV, il remonte et le Labyrinthe est un échec.</div></div>
      <div class="row"><button class="alt grow" data-act="showRunDeck">Voir le deck</button><button class="grow" data-act="dStart">Commencer la descente</button></div>`;
  } else if(D.phase==="combat"){
    const C=D.combat, en=C.en, m=en.moves[en.mi%en.moves.length];
    const say = roomSay();
    const hasX = C.hand.some(e=>e.id==="_x");
    const tut = (en.boss && deckTuto("boss")) || deckTuto("combat") || (C.turn>=2 && deckTuto("intent")) || (hasX && deckTuto("frag")) || "";
    body = `${tut}
      <div class="arena">${n?`<div class="arenabg">${roomArtInner(n)}</div>`:""}<div class="arenafade"></div>
        ${say && C.turn===1 && !C.log ? `<div class="asay"><span class="spkname" style="--sc:${d.c};font-size:11px;margin-bottom:3px">${d.n}</span><br>${say}</div>`:""}
        <div class="fighters">
        <div class="me ${C.hurtFx?"hit":""}"><div class="mespr">${sprite(d.id,d.n,d.c,{anim:true})}${x.duo?`<div class="cogspr">${sprite(finaleMate().id,finaleMate().n,finaleMate().c,{anim:true})}</div>`:""}</div>
          ${miniHP(D.hp,D.maxhp,C.block)}<div class="sts">${stHTML(C)}</div></div>
        <div class="foe ${en.boss?"boss":""} ${C.hitFx?"hit":""}" data-foe="0"><div class="intent">${en.stun?"💤":intentText(m,en)}</div>
          <div class="foespr ${en.self?"selfshadow":""}">${sprite(en.id,en.n,"#000",{anim:true})}</div>
          <div class="fn">${en.n}${en.e?` ${EMO[en.e].i}`:""}</div>${miniHP(en.hp,en.maxhp,en.block)}<div class="sts">${stHTML(en)}</div></div>
        </div>
      </div>
      ${statusLegend(C)}
      <div class="handzone"><div class="clog small">${C.log||"&nbsp;"}</div>
      <div class="row" style="align-items:center"><span class="energy" title="Énergie"><span class="eorb"><img src="assets/art/icon-energy.webp" alt="" onerror="this.remove()"><b>${C.energy}</b></span><small>/${C.emax||3}</small></span><span class="small muted grow">Pioche ${C.draw.length} · Défausse ${C.disc.length}</span><button class="sm" data-act="endTurn">Fin du tour</button></div>
      <div class="dhand fight ${C.hand.length>6?"rows3":""}">${C.hand.map((e,i)=>{ const cd=cardOf(e); const ef=effective(cd); return cardHTML(e.id,{cd, drag:true, tgt:needsTarget(cd), i, dis:cd.unplayable||cd.c>C.energy, eff:e.id==="_x", tag: ef===2?"Efficace":ef===0.5?"Le nourrit":cd.kw&&(ROOM_KW[x.k]||{})[D.node]===cd.kw?"Cette salle !":""}); }).join("")}</div>${cogRowHTML()}</div>`;
    C.hitFx=false; C.hurtFx=false;
  } else if(D.phase==="reward"){
    body = roomScene(n,{top:`<div class="rbanner good">L'ombre se dissipe !${D.relicMsg?`<small>${D.relicMsg}</small>`:""}</div>${deckTuto("reward")}`,
      bottom:`<div class="rlabel">Il peut garder une carte <b>pour ce Labyrinthe</b> :</div>
      <div class="dhand pick">${D.reward.map((id,i)=>cardHTML(id,{act:"takeReward",i})).join("")}</div>
      <button class="rbtn ghost" data-act="takeReward" data-i="-1">Ne rien prendre</button>`});
  } else if(D.phase==="carrefour"){
    body = roomScene(n,{compact:true, say:roomSay()||"Plusieurs chemins…", top:deckTuto("carrefour"),
      bottom:`<div class="rlabel">👆 Touche une salle qui brille sur la carte</div>`});
  } else if(D.phase==="sanctuaire"){
    body = roomScene(n,{say:roomSay()||"", top:deckTuto("sanctuaire"),
      bottom: D.restDone?`<div class="rnarr">${D.msg}</div><button class="rbtn go" data-act="leaveRoom">Continuer</button>`:
      `<button class="rbtn" data-act="restPick" data-k="heal"><span>Lui proposer de s'asseoir un moment</span><small>Soigne une partie de ses PV</small></button>
       <button class="rbtn" data-act="restPick" data-k="thin"><span>Laisser derrière lui ce qui l'encombre</span><small>Retire une Frappe ou une Garde, pour ce Labyrinthe</small></button>`});
  } else if(D.phase==="enigme"){
    const ev=D.event;
    body = roomScene(n,{say:roomSay()||"", top:`${deckTuto("enigme")}<div class="rchip">Il manque un souvenir de ${EMO[n.need].i} <b>${EMO[n.need].n}</b> à cette scène</div>`,
      bottom: ev.done?`<div class="rnarr">${ev.done}</div><button class="rbtn go" data-act="leaveRoom">Continuer</button>`:
      ev.opts.map((o,i)=>`<button class="rbtn" data-act="eventPick" data-i="${i}"><span>${o.l}</span></button>`).join("")});
  } else if(D.phase==="bosswin"){
    body = roomScene(n,{bottom:`<div class="rnarr">${D.pg?`Le cauchemar vacille, puis se défait en une pluie d'étincelles. Au centre de la salle, le cœur du rêve s'illumine : un trésor attend ${d.n}.`:`L'ombre vacille, puis se défait en une pluie de lumière. Au centre de la salle, le Cœur du Regret s'illumine. ${d.n} le regarde enfin en face.`}</div><button class="rbtn go" data-act="dRunEnd">Voir le résultat</button>`});
  } else if(D.phase==="lost"){
    body = roomScene(n,{noClient:true, bottom:`<div class="rnarr">${d.n} s'effondre. Les ombres se referment… puis la lumière violette le ramène doucement vers le haut des marches.</div><button class="rbtn go" data-act="dRunEnd">Voir le résultat</button>`});
  } else if(D.phase==="end"){
    const t = D.finale ? (D.out==="apaise"?`<b style="color:var(--good)">La Faille est apaisée</b>`:`<b style="color:var(--bad)">La Faille résiste</b>`) : D.out==="apaise"?`<b style="color:var(--good)">Apaisement</b>`:D.out==="partiel"?`<b style="color:var(--candle)">Retour partiel</b>`:`<b style="color:var(--bad)">Rechute</b>`;
    const endBody = `<div class="rbanner">${t}</div><div class="rnarr">${D.endTxt}</div><button class="rbtn go" data-act="dungeonNext">Continuer</button>`;
    body = n ? roomScene(n,{noClient:D.out!=="apaise", bottom:endBody}) : `<div class="card center">${endBody}</div>`;
  }
  const SCENE = ["reward","carrefour","sanctuaire","enigme","bosswin","lost","end"].includes(D.phase) && n;
  const art = n && D.phase!=="combat" && !SCENE ? roomArt(n) : "";
  $app.innerHTML = `${hud()}<div class="pad scroll dun" style="flex:1;display:flex;flex-direction:column;gap:8px">
    <div class="row"><div style="width:44px;height:44px">${sprite(d.id,d.n,d.c,{anim:true})}</div>
      <div class="grow"><div class="px" style="color:var(--candle);font-size:15px">${D.finale?"Le Grand Écho":D.pg?`Donjon de la Faille · prof. ${S.pg.depth+1}`:`Le Labyrinthe de ${d.n}`}${n?` · ${n.n}`:""}</div>
      ${D.phase!=="combat"?`<div class="small">PV ${hpBar(D.hp,D.maxhp,0)}</div>`:""}</div></div>
    ${relicBar()}${D.relicInfo?`<div class="advice small">${D.relicInfo}</div>`:""}
    ${art}
    ${femCtx()?feminize(body):body}
    ${D.phase==="intro"||D.phase==="carrefour"?miniMap():""}
  </div>`;
  if(D.node && D.phase!=="combat"){
    mapFollow();
  }
}
function roomScene(n, o){
  const D=U.dawn, d=CL[D.x.k], ak="donjon-"+n.t, src=roomSrc(n);
  return `<div class="rscene ${o.compact?"compact":""}"><div class="artblur" style="background-image:url('${src}')${ARTOK[ak]?`,url('${artSrc(ak)}')`:""}"></div>
    <div class="rtop">${o.say?`<div class="asay rsay"><span class="spkname" style="--sc:${d.c};font-size:11px;margin-bottom:3px">${d.n}</span><br>${o.say}</div>`:""}${o.top||""}</div>
    <div class="rimg">${artBg(ak)}<img class="artbg lab" src="${src}" alt="" onerror="this.remove()">
      ${o.noClient?"":`<div class="rclient">${sprite(d.id,d.n,d.c,{anim:true})}</div>`}</div>
    <div class="rbottom">${o.bottom||""}</div></div>`;
}
function roomArtInner(n){ const D=U.dawn, ak="donjon-"+n.t; return `<div class="artblur" style="background-image:url('${roomSrc(n)}')${ARTOK[ak]?`,url('${artSrc(ak)}')`:""}"></div>${artBg(ak)}<img class="artbg lab" src="${roomSrc(n)}" alt="" onerror="this.remove()">`; }
function roomArt(n){
  const D=U.dawn, ak="donjon-"+(n.t==="couloir"?"entree":n.t);
  const bg = n.t==="echo" ? EMO[n.e].c : (ROOM_BG[n.t]||"#3a3352");
  return `<div class="roomstrip" style="--bg:${bg}">${artBg(ak)}<img class="artbg lab" src="${roomSrc(n)}" alt="" onerror="this.remove()"></div>`;
}
function dRunEnd(){ endRun(); }

function dungeonNext(){
  const D=U.dawn, x=D.list[D.i], d=CL[x.k], st=S.clients[x.k];
  if(D.finale){ finaleEnd(D.out==="apaise"); return; }
  if(D.pg){ pgAfterRun(); return; }
  if(D.out==="apaise"){
    const lines=[{who:clientSp2(x.k),t:d.thanks}];
    S.stats.apaise++; addXP(150); scInc("apaise");
    if(!S.log.find(l=>l.type==="first")) S.log.push({type:"first",k:x.k,night:S.night});
    S.log.push({type:"apaise",k:x.k,night:S.night});
    gainAff(x.k, lines);
    if(S.cog==="pichu"){ S.fragments.push({n:"Étincelle de Pichu",e:"joie",from:"pichu"}); lines.push({who:"cog",t:"Pichu ! Une étincelle de joie, pour la suite ! (+1 Fragment de Joie)"}); }
    st.state="apaise"; U.night.recruits.push(x.k);
    if(LEGEND_CARD[x.k] && !st.legendGiven){ st.legendGiven=true; ensureDeck(); S.deck.push(LEGEND_CARD[x.k]); scInc("legend");
      lines.push({who:clientSp2(x.k),t:"Là-dessous, j'ai retrouvé quelque chose qui m'appartenait. Je crois que c'est à toi de le garder, maintenant."},
        {who:"narr",t:`<div class="giftcard"><span class="small">Carte légendaire, rien qu'à ${d.n} :</span>${cardHTML(LEGEND_CARD[x.k])}</div>`}); }
    lines.push({who:clientSp2(x.k),t:"Je vais me reposer un peu, en haut, si vous permettez. On en reparlera ce soir ?"});
    playDialog(lines, nextDungeon, ()=>renderDawnTalk(x.k));
    return;
  }
  nextDungeon();
}
function renderDawnTalk(k){
  const d=CL[k];
  $app.innerHTML=`${hud()}${scene({doorOpen:true,client:sprite(d.id,d.n,d.c,{anim:true,h:"112px"})})}<div class="panel">${dialogBubble()}</div>`;
}
function hire(k){
  const st=S.clients[k]; st.state="staff"; S.staff.push(k); S.pages+=0.5;
  playDialog([{who:clientSp2(k),t:"Travailler ici ? …Oui. J'aimerais bien."},{who:"narr",t:`${CL[k].n} rejoint le personnel (${CL[k].staff.n} : ${CL[k].staff.d}). Une demi-page s'écrit au Grand Registre.`}], nextDungeon, ()=>renderDawnTalk(k));
}
function nextDungeon(){
  if(!U.dawn.bibDone){ U.dawn.bibDone=true; offerBibelot(nextDungeon2); return; }
  nextDungeon2();
}
function nextDungeon2(){
  const D=U.dawn; D.bibDone=false; D.i++;
  if(D.i<D.list.length) setupDungeon(); else endNight();
}
function endNight(){ renderRecap(); }
function renderRecap(){
  U.inDungeon=false;
  const N=U.night||{out:{},recruits:[],earned0:S.stats.earned,served0:S.stats.served,perfect0:S.stats.perfect};
  const earned=S.stats.earned-N.earned0, served=S.stats.served-N.served0, perfect=S.stats.perfect-N.perfect0;
  const slots=STAFF_MAX, pending=N.recruits.filter(k=>!N.decided || !N.decided[k]);
  const st=Object.keys(S.stock).filter(k=>S.stock[k]>0).map(k=>k.startsWith("gel_")?`${ESS[k.slice(4)].n} ×${S.stock[k]}`:`${ING[k].n} ×${S.stock[k]}`).join(", ")||"vide";
  $app.innerHTML=`${hud()}<div class="pad scroll" style="flex:1;display:flex;flex-direction:column;gap:12px">
    <h2 class="px" style="color:var(--candle);margin:2px 0">Récap de la nuit ${S.night}</h2>
    <div class="card"><div class="stats"><div>Verres servis : <b>${served}</b></div><div>Verres parfaits : <b>${perfect}</b></div><div>Pokédollars gagnés : <b>${earned} ₽</b></div><div>Caisse : <b>${S.money} ₽</b></div></div></div>
    <div class="card"><div class="px" style="color:var(--candle)">Les âmes de la nuit</div>
      ${Object.keys(N.out).length?Object.keys(N.out).map(k=>`<div class="row" style="margin-top:6px"><div style="width:40px;height:40px">${sprite(CL[k].id,CL[k].n,CL[k].c,{anim:true})}</div><div class="grow"><b>${CL[k].n}</b><div class="small muted">${N.out[k]}</div></div></div>`).join(""):`<div class="small muted">Personne n'est venu cette nuit.</div>`}
    </div>
    ${N.recruits.length?`<div class="card"><div class="px" style="color:var(--candle)">Recrutement</div><div class="small muted">Leur Labyrinthe est terminé. Ils peuvent repartir, ou rester travailler à la taverne (${S.staff.length}/${slots} postes occupés).</div>
      ${N.recruits.map(k=>{ const dec=N.decided&&N.decided[k]; return `<div class="row" style="margin-top:8px"><div style="width:44px;height:44px">${sprite(CL[k].id,CL[k].n,CL[k].c,{anim:true})}</div><div class="grow"><b>${CL[k].n}</b><div class="small">Poste : ${CL[k].staff.n}, ${CL[k].staff.d}</div><div class="small" style="color:var(--candle)">Salaire : ${wageOf(k)} ₽ par jour</div>
        ${dec?`<div class="small" style="color:var(--good)">${dec==="hire"?"Engagé !":"Parti, entouré d'un halo doré."}</div>`:`<div class="row" style="margin-top:4px"><button class="sm" data-act="rHire" data-k="${k}" ${S.staff.length>=slots?"disabled":""}>Engager</button><button class="sm alt" data-act="rLetGo" data-k="${k}">Laisser partir</button></div>`}</div></div>`; }).join("")}</div>`:""}
    <div class="card"><div class="px" style="color:var(--candle)">Le personnel · ${S.staff.length}/${STAFF_MAX}</div>${S.staff.length?`<div class="small muted">Salaires de demain matin : ${S.staff.reduce((a,k)=>a+wageOf(k),0)} ₽ (caisse : ${S.money} ₽)</div>`:""}${S.staff.length?S.staff.map(k=>`<div class="row" style="margin-top:6px"><div style="width:40px;height:40px">${sprite(CL[k].id,CL[k].n,CL[k].c,{anim:true})}</div><div class="grow"><b>${CL[k].n}</b> · ${CL[k].staff.n} · ${hearts(S.clients[k].aff)}<div class="small muted">${CL[k].staff.d} · ${wageOf(k)} ₽/jour${(S.unpaid||[]).includes(k)?" · <b style='color:var(--bad)'>non payé</b>":""}</div></div><button class="sm alt" data-act="fire" data-k="${k}">Renvoyer</button></div>`).join(""):`<div class="small muted">Personne pour l'instant, à part ${cog().n}.</div>`}</div>
    ${postCardHTML()}
    <div class="card"><div class="px" style="color:var(--candle)">Le stock</div><div class="small">${st}</div><div class="small muted" style="margin-top:4px">Fragments de Mémoire : ${S.fragments.length}</div></div>
    <button data-act="recapDone" ${pending.length?"disabled":""}>${pending.length?"Décide d'abord pour le recrutement":"Aller dormir"}</button>
  </div>`;
}
function postCardHTML(){
  if(!S.postKnown) return "";
  const can=postCan();
  return `<div class="card"><div class="px" style="color:var(--candle)">📮 La Poste de Cadoizo</div>
    <div class="small muted">Pour 20 ₽, une âme apaisée reçoit ton invitation et passe à coup sûr demain, en journée.</div>
    ${S.invite?`<div class="small" style="margin-top:6px;color:var(--good)">✉️ Lettre envoyée à <b>${CL[S.invite].n}</b>. ${CL[S.invite].fem?"Elle":"Il"} passera demain.</div>`:
    `<button class="sm" style="margin-top:8px;width:100%" data-act="postOpen" ${S.money<20||!can.length?"disabled":""}>✉️ Envoyer une lettre <small>20 ₽</small></button>${!can.length?`<div class="small muted" style="margin-top:4px">Aucune âme apaisée à inviter pour l'instant.</div>`:S.money<20?`<div class="small muted" style="margin-top:4px">Pas assez dans la caisse.</div>`:""}`}</div>`;
}
function postCan(){ const c=CLIENT_ORDER.filter(k=>S.clients[k].state==="apaise" && REGULARS[k]); return S.pg ? c.concat(WORLD_ORDER.filter(k=>wst(k).dayVisits>0)) : c; }
function postPicker(){
  const can=postCan();
  openModal(`<h3>✉️ À qui écrire ?</h3><p class="small muted">Cadoizo portera ta lettre cette nuit. L'âme choisie passera demain à la taverne. (20 ₽)</p>
    <div class="answers">${can.map(k=>`<button class="dopt postpick" data-act="invite" data-k="${k}"><span class="row" style="align-items:center;gap:10px"><span style="width:42px;height:42px;display:inline-block">${sprite(CL[k].id,CL[k].n,CL[k].c,{anim:true})}</span><span class="grow"><b>${CL[k].n}</b><br><small>${hearts(S.clients[k].aff)}${S.clients[k].aff>=AFF_MAX?" · affinité au maximum":""}</small></span></span></button>`).join("")}</div>
    <button class="alt" style="width:100%;margin-top:8px" data-act="closeModal">Annuler</button>`);
}
function recapDecide(k, how){
  const N=U.night; N.decided=N.decided||{};
  if(how==="hire"){ if(S.staff.length>=STAFF_MAX) return; S.clients[k].state="staff"; S.staff.push(k); S.pages+=0.5; toast(`${CL[k].n} rejoint le personnel !`); }
  else { S.clients[k].state="apaise"; S.pages+=1; toast("Une page s'écrit au Grand Registre."); }
  N.decided[k]=how; cry(CL[k].id,"",false); renderRecap();
}
function endNightGo(){
  const lines=[];
  if(!S.hectorJoke){ S.hectorJoke=true;
    lines.push({who:"narr",t:"Une tête violette passe à travers le mur, un grand sourire aux lèvres."});
    lines.push({who:"hector",t:"Hé hé hé ! Alors, cette première nuit ? Ah… J'ai peut-être oublié de vous parler des clients de nuit ?"});
    lines.push({who:"cog",t:"HECTOR ! Et la porte violette ?! Et la trappe ?! Et la lettre ?!"});
    lines.push({who:"hector",t:"Disons que la taverne choisit ses patrons. Et il t'a choisi, toi. Tu as bien écouté, cette nuit. C'est tout ce qui compte, ici."});
    lines.push({who:"hector",t:"Le jour, sers le village. La nuit, écoute les âmes. À l'aube, guide-les. Je repasserai… peut-être. Hé hé hé."});
    lines.push({who:"narr",t:"Et il disparaît à travers le plancher, comme seul un Ectoplasma sait le faire."});
  }
  S.tutoDone=true;
  S.night++;
  const remaining = CLIENT_ORDER.filter(isAvailable).length;
  if(S.night>NIGHTS_PER_SEASON || remaining===0){ lines.push({who:"narr",t:"La dernière nuit de la saison s'achève…"}); playDialog(lines, seasonClose, ()=>{ $app.innerHTML=`${hud()}${scene({doorOpen:false})}<div class="panel">${dialogBubble()}</div>`; }); return; }
  lines.push({who:"narr",t:`Le soleil se lève sur Bourg-Brume. Nuit ${S.night} ce soir.`});
  if(lines.length) playDialog(lines, ()=>cine("jour", startDay), ()=>{ $app.innerHTML=`${hud()}${scene({doorOpen:false})}<div class="panel">${dialogBubble()}</div>`; });
}
