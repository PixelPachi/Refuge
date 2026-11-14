// ---------- Après la fin (post-game) ----------
// Après la saison 12 : plus de service de nuit. Le jour, n'importe quel habitant peut passer (âmes apaisées, villageois,
// voyageurs venus des quatre coins du monde). La nuit, la Faille ouvre un donjon inconnu, tiré au hasard,
// où l'on envoie l'âme apaisée de son choix, ou le Tenancier lui-même. Les clients peuvent arriver chromatiques (1 chance sur 25).
const PG_GUESTS = 5;
const SHINY_RATE = 1/25;
function wst(k){ if(!S.clients[k]) S.clients[k]={aff:0,state:"world",carryOuv:0,carryTen:0,visits:0,shake:false}; return S.clients[k]; }
function giftOwners(){ return typeof WORLD_ORDER!=="undefined" ? CLIENT_ORDER.concat(WORLD_ORDER) : CLIENT_ORDER; }
function pgSouls(){ return CLIENT_ORDER.filter(k=>S.clients[k] && ["apaise","staff"].includes(S.clients[k].state)); }
function shinyRoll(){ return Math.random() < SHINY_RATE; }

function startPostgame(){
  S.pg = {depth:0, best:0, runs:0, wins:0, tired:{}};
  S.shinies = S.shinies||{};
  S.seasonOver=false; S.night=1; S.log=[]; S.bibelots=[]; S.paidDay=null; S.invite=null;
  WORLD_ORDER.forEach(wst);
  U={}; save();
  const lines=[
    {who:"narr",t:"Quelques semaines ont passé. Le Grand Registre est plein. Plus aucune âme égarée ne frappe à la porte, la nuit."},
    {who:"hector",t:"<i>Hector rentre de sa promenade du matin, les joues presque roses pour un fantôme.</i> Petit ! Tu as vu la place ? Il y a des voyageurs partout. Une Momartik qui fait neiger sur la fontaine, un Galeking qui a réparé toutes les cloches du village…"},
    {who:"cog",t:"C'est la taverne, patron ! On parle de nous jusqu'au bout du monde. Une taverne où l'on vous écoute vraiment… Les gens traversent les mers pour venir boire un verre ici !"},
    {who:"hector",t:"Et tous les habitants que tu as aidés passent te voir, le jour. Plus de service de nuit : les nuits sont à vous, maintenant. Enfin… presque."},
    {who:"hector",t:"<i>Il baisse la voix.</i> La Faille ne s'est pas refermée tout à fait. Sans Darkrai, elle rêve toute seule : chaque nuit, elle mélange des morceaux de tous les Labyrinthes et ouvre un donjon que personne n'a jamais vu. Des ombres errantes, des monstres sans nom…"},
    {who:"cog",t:"Des donjons tout neufs, chaque nuit ? Et on pourra y envoyer qui on veut ? Machopeur va être ravi. Il s'ennuie, depuis qu'il n'a plus de regret."},
    {who:"hector",t:"N'importe quelle âme apaisée qui le souhaite. Ou toi, petit. Cette fois, tu as le droit de descendre. Hé hé hé. Plus on va loin, plus c'est profond… et plus c'est dur."},
    {who:"narr",t:"✦ <b>Après la fin</b> : chaque jour, les habitants et des voyageurs du monde entier passent à la taverne. Chaque nuit, un donjon inconnu s'ouvre sous la trappe. Ouvre l'œil : certains clients arrivent parfois dans des couleurs rares…"}
  ];
  playDialog(lines, ()=>cine("jour", startDay), ()=>{ $app.innerHTML=`${hud()}${scene({doorOpen:false})}<div class="panel">${dialogBubble()}</div>`; });
}

// ---- la journée ----
function pgGuest(k){
  const g=regularGuest(k), st=wst(k), w=CL[k].world ? WORLD[k] : null;
  if(w && st.dayVisits){ g.line = w.tales[(st.dayVisits-1)%w.tales.length]; }
  if(w) g.world=true;
  if(shinyRoll()){ g.shiny=true; }
  return g;
}
function pgPickGuests(){
  const guests=[], used=new Set();
  const souls=shuffle(pgSouls().filter(k=>S.clients[k].state==="apaise" || Math.random()<0.5));
  const inv = S.invite && S.clients[S.invite] ? S.invite : null;
  if(inv){ const g=pgGuest(inv); g.invited=true; guests.push(g); used.add(inv); S.invite=null; }
  // un ou deux voyageurs (ceux qu'on n'a pas encore rencontrés en priorité)
  const world=shuffle(WORLD_ORDER.filter(k=>!used.has(k))).sort((a,b)=>(wst(a).dayVisits?1:0)-(wst(b).dayVisits?1:0));
  const nw = 1 + (Math.random()<0.5?1:0);
  world.slice(0,nw).forEach(k=>{ guests.push(pgGuest(k)); used.add(k); });
  // des âmes apaisées, n'importe lesquelles
  souls.filter(k=>!used.has(k)).slice(0, 1+rnd(2)).forEach(k=>{ if(guests.length<PG_GUESTS){ guests.push(pgGuest(k)); used.add(k); } });
  const pool = shuffle(VILLAGERS.slice());
  while(guests.length<PG_GUESTS && pool.length) guests.push(villGuest(pool.shift()));
  U.day = {guests: shuffle(guests), i:0};
  U.dayNight=S.night;
  setGuest();
}
function shinyArriveLines(v){
  S.shinies=S.shinies||{}; const first=!S.shinies[v.regular];
  if(first) S.shinies[v.regular]={day:S.night};
  S.shinyCount=(S.shinyCount||0)+1;
  const f=CL[v.regular].fem;
  const out=[{who:"narr",t:`<i>La cloche tinte, et quelque chose scintille dans l'encadrement de la porte. ${v.n} entre… mais ses couleurs ne sont pas celles que tu connais.</i> ✦`},
    {who:{id:v.id,n:v.n},t:`<i>${f?"Elle":"Il"} remarque ton regard et rit, un peu gêné${f?"e":""}.</i> Ah, tu as vu ? Ce matin, je me suis réveillé${f?"e":""} comme ça. Ma grand-mère disait que ça arrive une fois dans une vie. Aujourd'hui, je brille !`}];
  if(first) out.push({who:"narr",t:`✦ <b>${v.n} chromatique</b> : une nouvelle page s'ouvre au Grand Registre, dans le chapitre des couleurs rares.`});
  return out;
}
function pgShinyAfter(v, cardOk, next){
  if(!cardOk){ next(); return; }
  S.shinies=S.shinies||{}; if(!S.shinies[v.regular]) S.shinies[v.regular]={day:S.night};
  const st=S.shinies[v.regular]; const first=!st.gift; st.gift=true; save();
  if(!first && Math.random()>0.6){ next(); return; }
  const own=shinyCardFor(v.regular);
  const other=shuffle(SHINY_CARDS.filter(x=>x!==own))[0];
  const ids=[own, other, CLIENT_CARD[v.regular]].filter(Boolean).filter((x,i,a)=>a.indexOf(x)===i).slice(0,3);
  offerCards(ids, next, `${v.n} chromatique te montre quelque chose`, `Un éclat de ses couleurs rares est resté sur le comptoir. Choisis une carte : elle rejoindra ton deck pour de bon.`);
}

// ---- la nuit : le donjon de la Faille ----
function pgCanGo(k){ return !(S.pg.tired||{})[k] || S.pg.tired[k] < S.night; }
function pgHPFor(k){
  if(k==="__ten") return 40+10+Math.min(20,S.level*2);
  return 40 + 5*(S.clients[k].aff||0) + (staffOn("machopeur") && k!=="machopeur" ? 6 : 0);
}
function pgNight(){
  save();
  cine("nuit", renderPgNight);
}
function renderPgNight(){
  music("nuit"); U.inDungeon=false;
  const P=S.pg, souls=pgSouls();
  const opt=(k,id,n,c,sh,hp,tired,sub)=>`<button class="dopt postpick" data-act="pgGo" data-k="${k}" ${tired?"disabled":""}><span class="row" style="align-items:center;gap:10px"><span style="width:44px;height:44px;display:inline-block">${sprite(id,n,c,{anim:true,shiny:sh})}</span><span class="grow"><b>${n}</b><br><small>${tired?"Se repose cette nuit":`${hp} PV · ${sub}`}</small></span></span></button>`;
  $app.innerHTML=`${hud()}<div class="pad scroll" style="flex:1;display:flex;flex-direction:column;gap:12px">
    <h2 class="px" style="color:var(--candle);margin:2px 0">Nuit ${S.night} · la trappe s'ouvre</h2>
    <div class="card"><div class="small">Sous la taverne, la Faille a rêvé un donjon que personne n'a jamais vu. <b>Profondeur ${P.depth+1}</b>${P.best?` · record : ${P.best}`:""}.</div>
      <div class="small muted" style="margin-top:6px">Des salles prises dans tous les Labyrinthes, des ombres errantes et des monstres sans nom. Plus tu vas profond, plus elles frappent fort, et plus elles connaissent de mauvais tours : poison, gel, malédictions…</div>
      <div class="small muted" style="margin-top:6px">Qui descend reste fatigué la nuit suivante.</div></div>
    <div class="card"><div class="px" style="color:var(--candle)">Qui descend cette nuit ?</div>
      <div class="answers" style="margin-top:6px">${opt("__ten",S.ten.id,S.ten.n+" (toi)",S.ten.c,S.shiny,pgHPFor("__ten"),!pgCanGo("__ten"),"le Tenancier en personne")}
      ${souls.map(k=>opt(k,CL[k].id,CL[k].n,CL[k].c,false,pgHPFor(k),!pgCanGo(k),`${hearts(S.clients[k].aff)}${S.clients[k].state==="staff"?" · personnel":""}`)).join("")}</div></div>
    ${postCardHTML()}
    <button class="alt" data-act="pgSleep">Fermer la trappe et aller dormir</button>
  </div>`;
}
function pgTenCL(){ CL.__ten = {id:S.ten.id, n:S.ten.n, c:S.ten.c, shiny:!!S.shiny, fem:false, reform:{}, frags:[], stages:[], map:null, thanks:""}; }
function pgGo(k){
  if(!pgCanGo(k)) return;
  if(k==="__ten") pgTenCL();
  S.pg.tired=S.pg.tired||{}; S.pg.tired[k]=S.night+1; S.pg.runs++;
  U.dawn={list:[{k, pg:true, ten:0, euph:0, hang:0, map:pgMakeMap(S.pg.depth)}], i:0, pg:true};
  music("donjon");
  const d=CL[k];
  const lines = k==="__ten" ? [{who:"narr",t:"Tu poses le pied sur la première marche. Puis la deuxième. Pour la première fois, c'est toi qui descends."},{who:"cog",t:"Je garde le comptoir, patron ! Et je te suis à travers les Fragments. Reviens entier, hein ?"}]
    : [{who:clientSp2(k),t:["On y va ? J'ai hâte de voir ce que la Faille a rêvé cette nuit.","Plus de regret à affronter, cette fois. Juste l'aventure. Ça change !","Garde-moi un verre au chaud. Je remonte avant l'aube."][rnd(3)]}];
  playDialog(lines, setupDungeon, ()=>{ $app.innerHTML=`${hud()}${scene({doorOpen:false,client:sprite(d.id,d.n,d.c,{anim:true,h:"110px",shiny:!!d.shiny})})}<div class="panel">${dialogBubble()}</div>`; });
}
function pgSleep(){ pgNextDay([{who:"narr",t:"La trappe se referme doucement. Cette nuit, tout le monde dort à la taverne."}]); }
function pgNextDay(lines){
  U.dawn=null; U.inDungeon=false; S.night++; save();
  lines=lines||[];
  lines.push({who:"narr",t:`Le soleil se lève sur Bourg-Brume. Jour ${S.night}.`});
  playDialog(lines, ()=>cine("jour", startDay), ()=>{ $app.innerHTML=`${hud()}${scene({doorOpen:false})}<div class="panel">${dialogBubble()}</div>`; });
}
// Fin d'un donjon de la Faille
function pgEndRun(){
  const D=U.dawn, d=CL[D.x.k];
  if(D.out==="apaise"){ D.out="apaise"; D.endTxt=`${d.n} atteint le fond du donjon. Le Cœur s'illumine, et un passage s'ouvre vers des profondeurs encore plus grandes.`; }
  else D.endTxt=`${d.n} remonte, épuisé${d.fem?"e":""}, mais entier${d.fem?"e":""}. Le donjon de cette nuit s'efface derrière ${d.fem?"elle":"lui"}.`;
  D.phase="end"; jingle(D.out==="apaise"?"apaise":"triste"); renderDungeon();
}
function pgAfterRun(){
  const D=U.dawn, P=S.pg, k=D.x.k, d=CL[k], lines=[];
  if(D.out==="apaise"){
    P.wins++; P.depth++; P.best=Math.max(P.best,P.depth);
    const gain=50+15*P.depth; S.money+=gain; S.stats.earned+=gain; addXP(120);
    lines.push({who:k==="__ten"?"ten":clientSp2(k),t:k==="__ten"?"Je l'ai fait. Je suis descendu, et je suis remonté.":"<i>Essoufflé, ravi.</i> Tu aurais vu ça ! Des salles de partout, des ombres que je n'avais jamais vues… On recommence quand ?"});
    lines.push({who:"narr",t:`💰 Le donjon laisse un trésor : <b>+${gain} ₽</b>. Profondeur atteinte : <b>${P.depth}</b>${P.depth===P.best?" (record)":""}. La prochaine nuit, la Faille creusera plus profond.`});
    if(k!=="__ten" && S.clients[k] && S.clients[k].aff<AFF_MAX && Math.random()<0.5) gainAff(k, lines);
    const shine = Math.random()<SHINY_RATE*2;
    const ids = (shine?[SHINY_CARDS[rnd(SHINY_CARDS.length)]]:[]).concat(randomCards(3,{commune:2,peu:4,rare:4})).filter((x,i,a)=>a.indexOf(x)===i).slice(0,3);
    playDialog(lines, ()=>offerCards(ids, ()=>pgNextDay(), shine?"✦ Un éclat chromatique au fond du Cœur":"Le trésor du Cœur", "Une carte pour ton deck, pour de bon."), ()=>{ $app.innerHTML=`${hud()}${scene({doorOpen:false})}<div class="panel">${dialogBubble()}</div>`; });
    return;
  }
  lines.push({who:"cog",t:cogSay("pgDefaite")});
  pgNextDay(lines);
}

// ---- génération procédurale ----
function pgArtPool(){
  if(U.pgArt) return U.pgArt;
  const out=[];
  CLIENT_ORDER.forEach(k=>{ const m=CL[k].map; if(!m) return; Object.keys(m.nodes).forEach(id=>{ const n=m.nodes[id], a=n.art||id;
    const art = a.includes("/") ? a : `${k}/${a}`;
    if(ART_SET.has("dj-"+art.replace("/","-"))) out.push({art, n:n.n}); }); });
  return U.pgArt=out;
}
function pgFoePool(){
  if(U.pgFoes) return U.pgFoes;
  const m={};
  CLIENT_ORDER.forEach(k=>{ const c=CL[k]; m[c.id]=c.n; if(c.map) Object.values(c.map.nodes).forEach(n=>{ if(n.foe) m[n.foe.id]=n.foe.n; }); });
  Object.assign(m,{92:"Fantominus",93:"Spectrum",200:"Feuforêve",302:"Ténéfix",355:"Skelénox",425:"Baudrive",429:"Magirêve",477:"Noctunoir",198:"Cornèbre",262:"Grahyèna",215:"Farfuret",123:"Insécateur"});
  return U.pgFoes=Object.keys(m).map(id=>({id:Number(id), n:m[id]}));
}
function pgBossPool(){
  const out=[];
  Object.values(BOSS).forEach(b=>{ if(!b.self && b.id) out.push({id:b.id, n:b.n.replace(/^Ombre (de |d'|du )/,"")}); });
  Object.values(FINALE_MAPS).forEach(mp=>{ const b=Object.values(mp.nodes).find(n=>n.boss); if(b) out.push({id:b.boss.id, n:b.boss.n.split(",")[0]}); });
  return out;
}
const PG_EMO=["colere","tristesse","peur","nostalgie","joie"];
function pgMakeMap(depth){
  const L = 7 + Math.min(3, Math.floor(depth/3));
  const pool = shuffle(pgArtPool().slice()); let pi=0;
  const room = ()=> pool.length ? pool[(pi++)%pool.length] : {art:null, n:"Salle oubliée"};
  const nodes={}, layers=[]; let id=0;
  const foes=pgFoePool();
  const mk=(t,l,extra)=>{ const r=room(), key="p"+(id++); nodes[key]=Object.assign({t, n:r.n, nx:[], y:Math.round(6+l*82/(L-1))}, r.art?{art:r.art}:{}, extra||{}); return key; };
  for(let l=0;l<L;l++){
    let ids=[];
    if(l===0) ids=[mk("entree",l,{n:"Le seuil du rêve"})];
    else if(l===L-1){ const b=pgBossPool(); ids=[mk("coeur",l,{key:PG_EMO[rnd(PG_EMO.length)], pgBoss:b[rnd(b.length)], n:"Le cœur du rêve"})]; }
    else if(l===L-2) ids=[mk("sanctuaire",l)];
    else {
      const cnt = 1 + rnd(3);
      for(let c=0;c<cnt;c++){
        const r=Math.random(), prevSan = layers[l-1] && layers[l-1].some(x=>nodes[x].t==="sanctuaire");
        const t = r<0.62 ? "echo" : r<0.82 ? "enigme" : (prevSan ? "echo" : "sanctuaire");
        const f=foes[rnd(foes.length)];
        ids.push(mk(t,l, t==="echo" ? {e:PG_EMO[rnd(PG_EMO.length)], dmg: Math.random()<0.3+Math.min(0.4,depth*0.04)?2:1, pgFoe:f, shadow:Math.random()<0.5} : t==="enigme" ? {need:PG_EMO[rnd(PG_EMO.length)]} : {}));
      }
    }
    const xs = ids.length===1?[50]:ids.length===2?[30,70]:[16,50,84];
    ids.forEach((k,i)=>nodes[k].x=xs[i]);
    layers.push(ids);
  }
  for(let l=0;l<L-1;l++){
    const A=layers[l], B=layers[l+1];
    A.forEach((k,i)=>{ const j = A.length===1 ? (B.length===1?0:rnd(B.length)) : Math.round(i*(B.length-1)/(A.length-1));
      nodes[k].nx.push(B[j]);
      const j2=j+(Math.random()<0.5?1:-1); if(B[j2] && Math.random()<0.5) nodes[k].nx.push(B[j2]); });
    if(A.length===1) B.forEach(b=>{ if(!nodes[A[0]].nx.includes(b)) nodes[A[0]].nx.push(b); });
    B.forEach((b,j)=>{ if(!A.some(a=>nodes[a].nx.includes(b))){ const i=Math.round(j*(A.length-1)/Math.max(1,B.length-1)); nodes[A[Math.min(i,A.length-1)]].nx.push(b); } });
  }
  return {start:layers[0][0], nodes, pg:true};
}
function pgMult(){ const d=S.pg?S.pg.depth:0; return {hp:1+0.06*d, atk:1+0.04*d}; }
// Le répertoire des ombres de la Faille : les coups de base, plus de nouveaux tours (poison, drain, gel, malédiction, brise-garde, soin, confusion)
const PG_MOVES = {
  base:[{a:"atk",v:9},{a:"atk",v:5,x:2},{a:"def",v:8},{a:"buff",v:2},{a:"weak",v:1,dmg:6},{a:"vuln",v:1,dmg:6},{a:"burn",v:3,dmg:5}],
  neuf:[{a:"poison",v:2,dmg:4},{a:"drain",v:8},{a:"frost",v:1,dmg:6},{a:"hex",v:1,dmg:5},{a:"shatter",v:9},{a:"heal",v:6},{a:"confus",v:1,dmg:5}]
};
function pgMoves(n, strong, depth){
  const nNew = Math.min(3, 1 + Math.floor(depth/4) + (Math.random()<0.4?1:0));
  const mv = [{a:"atk",v:9}].concat(shuffle(PG_MOVES.base.slice()).slice(0, n-1-Math.min(nNew,n-2)), shuffle(PG_MOVES.neuf.slice()).slice(0, Math.min(nNew,n-2)));
  return shuffle(mv).map(m=>Object.assign({},m, strong&&m.a==="atk"?{v:m.v+3}:{}));
}
function makeEnemyPG(n){
  const M=pgMult(), depth=S.pg.depth;
  const fin = en=>{ en.hp=Math.round(scaleHP(en.hp)*M.hp); en.moves=scaleMoves(en.moves).map(m=>Object.assign({},m, m.v&&["atk","def","drain","shatter","heal"].includes(m.a)?{v:Math.round(m.v*M.atk)}:{}, m.dmg?{dmg:Math.round(m.dmg*M.atk)}:{})); return en; };
  if(n.t==="entree"){ const f=pgFoePool()[rnd(pgFoePool().length)]; return fin({n:`Ombre errante`, id:f.id, self:true, hp:22, e:null, moves:[{a:"atk",v:6},{a:"def",v:5},PG_MOVES.neuf[rnd(PG_MOVES.neuf.length)]]}); }
  if(n.t==="coeur"){ const b=n.pgBoss||{id:491,n:"Darkrai"};
    return fin({n:`Cauchemar de ${b.n}`, id:b.id, self:Math.random()<0.5, boss:true, hp:95+6*depth, e:n.key, vuln:hasBib("carnet")?2:0, moves:pgMoves(7,true,depth+4)}); }
  const strong=(n.dmg||1)>=2, f=n.pgFoe||pgFoePool()[0];
  return fin({n: n.shadow?`Ombre de ${f.n}`:`Écho de ${f.n}`, id:f.id, self:!!n.shadow, hp:strong?46:34, e:n.e, moves:pgMoves(4,strong,depth)});
}

// ---- Registre : voyageurs et couleurs rares ----
function pgRegPages(add){
  if(!S.pg && !Object.keys(S.shinies||{}).length) return;
  add("voyageurs","voyageurs","Les voyageurs",`<p class="bnote">Venus des quatre coins du monde, attirés par la réputation de la taverne.</p>${WORLD_ORDER.map(k=>{ const w=WORLD[k], st=wst(k), met=st.dayVisits>0;
    const card=CARDS[w.card];
    return `<div class="brow" style="margin-bottom:10px"><div class="bspr sm">${met?sprite(w.id,w.n,w.c,{anim:false}):"?"}</div><div><b>${met?w.n:"???"}</b>${met?` · ${hearts(st.aff)}`:""}<br><small>${met?`${w.role}, venu${w.fem?"e":""} de ${w.from}. Commande : ${orderShort(w.order)}`:"Pas encore venu à Bourg-Brume."}</small>
      ${met?`<br><small>${st.aff>=2||st.affCardGiven?`Carte offerte : ${card.i} <b>${card.n}</b>`:"Une carte à 2 cœurs"} · ${S.owned&&S.owned[w.gift.key]?`Artefact : ${w.gift.i} <b>${w.gift.n}</b>`:"Un artefact à 5 cœurs"}</small>`:""}</div></div>`; }).join("")}`);
  const sh=Object.keys(S.shinies||{}).filter(k=>CL[k]);
  add("chromatiques","chromatiques","Les couleurs rares",`<p class="bnote">${sh.length} client${sh.length>1?"s":""} chromatique${sh.length>1?"s":""} rencontré${sh.length>1?"s":""}. Une chance sur vingt-cinq qu'un client passe la porte dans ses couleurs rares.</p>
    <div class="bgrid">${sh.map(k=>`<a class="bslot" data-act="bookGo" data-p="sh-${k}"><div class="bslot-s">${sprite(CL[k].id,CL[k].n,CL[k].c,{anim:false,shiny:true})}</div><small>✦ ${CL[k].n}</small></a>`).join("")}</div>`);
  sh.forEach(k=>{ const d=CL[k], r=REGULARS[k], c=CARDS[shinyCardFor(k)];
    add("sh-"+k,"chromatiques",`✦ ${d.n} chromatique`,`<div class="brow"><div class="bspr">${sprite(d.id,d.n,d.c,{anim:true,shiny:true})}</div><div><div class="bname">${d.n} ✦</div><div class="bsub">Rencontré${d.fem?"e":""} le jour ${S.shinies[k].day||1}</div></div></div>
      <p>Mêmes goûts, même histoire que ${d.n} : ${d.fem?"elle":"il"} commande toujours <b>${orderShort(r.order)}</b>${d.world?"":`, et ${d.fem?"elle":"il"} est toujours ${d.fem?"une âme apaisée":"une âme apaisée"} de la taverne`}.</p>
      <div class="bh">Sa carte chromatique</div><p>${c.i} <b>${c.n}</b> : ${cardDesc(shinyCardFor(k))}</p>
      <p class="bnote">Chaque fois qu'${d.fem?"elle":"il"} revient dans ses couleurs rares et que sa commande est respectée, ${d.fem?"elle":"il"} peut t'offrir une carte chromatique.</p>`); });
}
