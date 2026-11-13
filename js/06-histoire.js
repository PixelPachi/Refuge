// ---------- Écran titre ----------
function screenTitle(){
  music("title");
  const sv = loadSave();
  $app.innerHTML = `<div class="title fade${ARTOK.titre?" hasart":""}" ${ARTOK.titre?`style="background:linear-gradient(rgba(20,12,8,.25),rgba(20,12,8,.75)),url(${artSrc("titre")}) center/cover"`:""}>
    <div style="width:110px;height:110px">${sprite(HECTOR.id,"Hector",HECTOR.c,{anim:true})}</div>
    <h1>Tavern Keeper's Ledger</h1>
    <h2>Le Refuge des Âmes Égarées</h2>
    <p class="muted small" style="max-width:320px">Version 1.0 · ${LAST_SEASON} saisons de ${NIGHTS_PER_SEASON} nuits, ${CLIENT_ORDER.length} âmes à écouter, 5 chapitres.</p>
    <button data-act="${sv&&sv.ten?"newGameAsk":"newGame"}" style="width:240px">Nouvelle partie</button>
    ${sv&&sv.ten&&!sv.seasonOver?`<button class="alt" data-act="continue" style="width:240px">Continuer (nuit ${sv.night})</button>`:""}
    <button class="ghost sm" data-act="loadCodeOpen">Charger une sauvegarde</button>
    <button class="ghost sm" data-act="toggleSound">Son : ${(S?S.settings.sound:true)?"activé":"coupé"}</button>
    <div class="small muted">Touche l'écran pour lancer la musique.</div>
    <p class="muted" style="font-size:11px;max-width:330px">Projet de fan non commercial. Pokémon appartient à Nintendo, Game Freak et The Pokémon Company. Sprites et cris : PokeAPI.</p>
  </div>`;
}

// ---------- Prologue ----------
function startNew(){
  const snd = S ? S.settings.sound : true;
  S = newState(); S.settings.sound = snd; initClients(); U={};
  const lines = [
    {who:"voix",t:"…"},
    {who:"voix",t:"Bienvenue."},
    {who:"voix",t:"Tu es sur le point de commencer un long voyage. Un voyage vers un endroit où l'on vient poser ce qui pèse trop lourd."},
    {who:"voix",t:"Avant de partir, réponds sincèrement à quelques questions. Il n'y a pas de bonne ou de mauvaise réponse."},
    {who:"voix",t:"Sois simplement toi-même. Prêt ?"}
  ];
  music("voix");
  playDialog(lines, startTest, renderVoice);
}
function renderVoice(){
  $app.innerHTML = `<div class="stars"><div class="voicewrap">${U.dlg?dialogBubble():""}</div></div>`;
}
function renderPrologue(){
  $app.innerHTML = `${scene({doorOpen:false})}<div class="panel">${dialogBubble()}</div>`;
}
function startTest(){
  U.test = {qs: shuffle(QUESTIONS).slice(0,8), i:0};
  renderTest();
}
function renderTest(){
  const T=U.test, q=T.qs[T.i];
  $app.innerHTML = `<div class="stars"><div class="pad" style="flex:1;display:flex;flex-direction:column;gap:14px;justify-content:center;position:relative;z-index:1">
    <div class="progress"><i style="width:${(T.i/T.qs.length)*100}%"></i></div>
    <div class="small muted center">${T.i+1} / ${T.qs.length}</div>
    <div class="q center" style="font-size:20px">${q.q}</div>
    <div class="answers">${q.a.map((a,i)=>`<button data-act="answer" data-i="${i}">${a[0]}</button>`).join("")}</div>
  </div></div>`;
}
function answer(i){
  const T=U.test, a=T.qs[T.i].a[i];
  S.aura[a[1]]+=2; S.aura[a[2]]+=1;
  T.i++;
  if(T.i<T.qs.length) renderTest(); else revealTenancier();
}
function revealTenancier(){
  const sorted = AURA_ORDER.slice().sort((x,y)=>S.aura[y]-S.aura[x] || AURA_ORDER.indexOf(x)-AURA_ORDER.indexOf(y));
  S.aura1=sorted[0]; S.aura2=sorted[1];
  U.pick = AURA_ORDER.filter(a=>a!==S.aura1).indexOf(S.aura2) % TENANCIERS[S.aura1].length;
  U.pickAura = S.aura1;
  U.refused=false;
  renderReveal();
}
function renderReveal(){
  const a1=AURAS[S.aura1], a2=AURAS[S.aura2];
  const sp=TENANCIERS[S.aura1][U.pick];
  setTimeout(()=>cry(sp.id),300);
  $app.innerHTML = `<div class="stars"><div class="pad fade" style="flex:1;display:flex;flex-direction:column;gap:12px;align-items:center;text-align:center;position:relative;z-index:1">
    <div class="bubble voice" style="width:100%;cursor:default">
      Tu as une Aura de <b style="color:${a1.c}">${a1.n}</b> : ${a1.v.toLowerCase()}. Et derrière elle brille une Aura de <b style="color:${a2.c}">${a2.n}</b> : ${a2.v.toLowerCase()}.<br><br>Quelqu'un comme toi… doit être un <b>${sp.n}</b> !</div>
    <div style="width:150px;height:150px">${sprite(sp.id,sp.n,sp.c,{anim:true})}</div>
    <div class="card" style="width:100%;text-align:left"><div class="px" style="color:var(--candle)">Talent de comptoir : ${TALENTS[sp.t].n}</div><div class="small">${TALENTS[sp.t].d}</div></div>
    <div class="row" style="width:100%"><button class="grow" data-act="acceptTen">C'est moi !</button>
    <button class="alt grow" data-act="refuseTen">Pas tout à fait…</button></div>
    <div class="small muted">« Pas tout à fait » te laisse choisir librement parmi les 24 Pokémon.</div>
  </div></div>`;
}
function acceptTen(){
  const aura=U.pickAura||S.aura1, sp=TENANCIERS[aura][U.pick];
  S.ten={id:sp.id,n:sp.n,t:sp.t,c:sp.c,aura}; S.deck=null; ensureDeck();
  renderShinyQ();
}
function renderTenPicker(){
  $app.innerHTML = `<div class="stars"><div class="pad scroll" style="flex:1;position:relative;z-index:1">
    <div class="bubble voice" style="cursor:default">Alors, qui es-tu vraiment ? Choisis le Pokémon qui te ressemble.</div>
    ${AURA_ORDER.map(a=>`<div class="sect" style="margin-top:12px;color:${AURAS[a].c}">${AURAS[a].n} · ${AURAS[a].v} · talent ${TALENTS[TENANCIERS[a][0].t].n}${a===S.aura1?" · ton Aura":""}</div>
      <div class="regGrid four">${TENANCIERS[a].map((sp,i)=>`<div class="card regCard ${U.pickAura===a&&U.pick===i?"sel":""}" data-act="pickTen" data-a="${a}" data-i="${i}"><div style="height:56px">${sprite(sp.id,sp.n,sp.c,{anim:true})}</div><div class="small"><b>${sp.n}</b></div></div>`).join("")}</div>`).join("")}
    <div class="card small" style="margin-top:12px"><b>${TALENTS[TENANCIERS[U.pickAura][U.pick].t].n}</b> : ${TALENTS[TENANCIERS[U.pickAura][U.pick].t].d}</div>
    <button style="width:100%;margin-top:10px;position:sticky;bottom:8px" data-act="acceptTen">Je suis ${TENANCIERS[U.pickAura][U.pick].n} !</button>
  </div></div>`;
}
function renderShinyQ(){
  $app.innerHTML = `<div class="stars"><div class="pad fade" style="flex:1;display:flex;flex-direction:column;gap:14px;justify-content:center;position:relative;z-index:1">
    <div style="width:110px;height:110px;margin:0 auto">${sprite(S.ten.id,S.ten.n,S.ten.c,{anim:true})}</div>
    <div class="bubble voice" style="cursor:default">Une dernière question. <b>Est-ce que tu penses être brillant ?</b></div>
    <div class="answers"><button data-act="shiny" data-v="1">Oui</button><button data-act="shiny" data-v="0">Non</button></div>
  </div></div>`;
}
function chooseShiny(v){
  S.shiny = v==="1";
  const lines = S.shiny
    ? [{who:"voix",t:"Alors brille. Mais n'oublie pas : la lumière attire aussi ceux qui se sont perdus."},{who:"voix",t:`Tu seras un ${S.ten.n} chromatique. Ceux qui sont différents, eux aussi, se sentiront compris.`}]
    : [{who:"voix",t:"La modestie est une belle qualité. Les cœurs timides s'en souviendront."}];
  lines.push({who:"voix",t:"Ton voyage commence maintenant. Bonne chance… Tenancier."});
  playDialog(lines, startCinematic, renderVoice);
}

// ---------- Cinématique : le bus, Bourg-Brume, Hector ----------
function cineScene(kind){
  const me = sprite(S.ten.id,S.ten.n,S.ten.c,{shiny:S.shiny,anim:true});
  const ak = kind==="bus"?"cine-bus":kind==="town"?"cine-bourg":"cine-facade";
  if(ARTOK[ak]){
    const extra = kind==="bus" ? `<div class="walker stay seat-art">${me}</div>`
      : kind==="town" ? `<div class="walker">${me}</div><div class="npc">${sprite(74,"Racaillou","#a89878",{anim:true})}</div>`
      : `<div class="artsign">Taverne</div><div class="walker stay">${me}</div>${kind==="hector"?`<div class="hghost">${sprite(HECTOR.id,"Hector",HECTOR.c,{anim:true})}</div>`:""}`;
    return `<div class="cine hasart ${kind}-sc">${artBg(ak)}${extra}</div>`;
  }
  if(kind==="bus") return `<div class="cine bus-sc"><div class="sky dusk"></div><div class="moon"></div><div class="hills h1"></div><div class="hills h2"></div><div class="road"></div>
    <div class="bus"><div class="win"></div><div class="win me-win"><div class="seat">${me}</div></div><div class="win"></div><div class="wheel w1"></div><div class="wheel w2"></div></div></div>`;
  if(kind==="town") return `<div class="cine town-sc"><div class="sky dawn"></div>
    <div class="house h-a"><i></i></div><div class="tower"><i></i></div><div class="house h-b"><i></i></div><div class="house h-c"><i></i></div>
    <div class="sign">Bourg-Brume</div><div class="street"></div><div class="fog"></div>
    <div class="walker">${me}</div>
    <div class="npc">${sprite(74,"Racaillou","#a89878",{anim:true})}</div></div>`;
  return `<div class="cine front-sc"><div class="sky day"></div><div class="facade"><div class="board">Taverne</div><div class="fdoor"></div><div class="fwin l"></div><div class="fwin r"></div></div><div class="street"></div>
    <div class="walker stay">${me}</div>
    ${kind==="hector"?`<div class="hghost">${sprite(HECTOR.id,"Hector",HECTOR.c,{anim:true})}</div>`:""}</div>`;
}
function renderCine(){
  const d=U.dlg; if(!d) return;
  let sc="bus"; for(let i=0;i<=d.i;i++){ if(d.lines[i].scene) sc=d.lines[i].scene; }
  music(sc==="bus"?"route":"village");
  const still = U.cineLast===sc || (U.cineLast==="hector"&&sc==="front") ? " still" : "";
  U.cineLast=sc;
  $app.innerHTML = `${cineScene(sc).replace('class="cine ','class="cine'+still+' ')}<div class="panel">${dialogBubble()}</div>`;
}
function startCinematic(){
  const R={id:74,n:"Racaillou"};
  const lines=[
    {scene:"bus",who:"narr",t:"Quelques jours plus tard."},
    {who:"narr",t:"Le bus de nuit traverse la campagne. Tu es le seul passager. Dans ta poche, une petite annonce découpée dans un journal :"},
    {who:"narr",t:"« À vendre : taverne de caractère, à Bourg-Brume. Prix très raisonnable. Propriétaire pressé. »"},
    {who:"ten",t:"Un nouveau départ… C'est tout ce que je demande."},
    {who:"narr",t:"Ce que tu as laissé derrière toi, tu préfères ne pas y penser. Pas ce soir."},
    {scene:"town",who:"narr",t:"À l'aube, le bus s'arrête au bout de la route. Bourg-Brume : quelques maisons, un clocher, et une brume légère qui ne se lève jamais tout à fait."},
    {who:"narr",t:"Le bus repart dans un nuage de poussière. Te voilà seul, ta valise à la main, au début de la rue principale."},
    {who:R,t:"Salut, l'étranger ! Tu cherches la taverne ? Tout au bout de la rue. Tu peux pas le rater, c'est le seul bâtiment qui grince."},
    {scene:"front",who:"narr",t:"Au bout de la rue, une vieille taverne en bois. Son enseigne grince doucement au vent : « Taverne »."},
    {scene:"hector",who:"narr",t:"La porte s'ouvre avant même que tu frappes. Une silhouette violette flotte dans l'encadrement, un grand sourire aux lèvres."},
    {who:"hector",t:"Hé hé hé… Tu dois être l'acheteur ! Pile à l'heure. Moi, c'est Hector."},
    {who:"hector",t:"Bienvenue dans ma taverne ! Cent ans que je le tiens. Le comptoir, les tabourets, les bougies… tout est d'origine. Enfin, presque."},
    {who:"hector",t:"Bourg-Brume, c'est une ville tranquille. Kecleon tient le marché, Cadoizo distribue le courrier, et Chaglam sait tout sur tout le monde. Tu verras, on s'y attache."},
    {who:"hector",t:"Le jour, les villageois passent boire un verre. Rien de compliqué : un bon verre, un sourire, et ils reviennent."},
    {who:"ten",t:"Et le soir ?"},
    {who:"hector",t:"Le soir ? Oh… Le soir, c'est calme. Très calme. Hé hé hé."},
    {who:"hector",t:"Signe ici… et là. Parfait ! Voilà les clés. Il y a 400 ₽ dans la caisse et quelques gelées dans le placard."},
    {who:"hector",t:"Un dernier conseil, patron : écoute toujours tes clients. Même ceux qui ne disent rien. Surtout ceux-là."},
    {who:"hector",t:"Ah, et j'ai punaisé une petite annonce sur la porte : tu auras besoin d'un co-gérant. Je repasserai… peut-être !"},
    {scene:"front",who:"narr",t:"Et Hector s'évapore à travers le mur, dans un dernier éclat de rire."},
    {who:"narr",t:"Le lendemain matin, six candidats attendent devant la porte, l'annonce à la main : « Cherche co-gérant. Nourri, logé, histoires garanties. »"}
  ];
  playDialog(lines, renderCogPick, renderCine);
}
function renderCogPick(){
  music("village");
  $app.innerHTML = `<div class="pad fade scroll" style="flex:1">
    <h2 class="px" style="color:var(--candle);margin:4px 0 4px">Choisis ton co-gérant</h2>
    <p class="small muted" style="margin:0 0 10px">Un co-gérant de ton Aura secondaire (<b style="color:${AURAS[S.aura2].c}">${AURAS[S.aura2].n}</b>) forme un <b>Duo</b> : +3 PC max.</p>
    <div class="cards">${COGS.map(c=>{
      const duo=c.aura===S.aura2, fric=c.aura===OPPOSITE[S.ten.aura];
      return `<div class="card cand" data-act="pickCog" data-k="${c.key}">
        <div class="pic">${sprite(c.id,c.n,c.c,{anim:true})}</div>
        <div class="grow"><div><b>${c.n}</b> <span class="small muted"><span class="aura-dot" style="background:${AURAS[c.aura].c}"></span>${AURAS[c.aura].n}</span>${duo?`<span class="badge duo">Duo</span>`:""}${fric?`<span class="badge fric">Frictions</span>`:""}</div>
        <div class="small"><b style="color:var(--candle)">${c.p}</b> : ${c.pd}</div>
        <div class="small muted" style="font-style:italic">« ${c.line} »</div></div></div>`;}).join("")}</div>
  </div>`;
}
function pickCog(k){
  S.cog=k; const c=cog(); S.duo = c.aura===S.aura2;
  S.pc = pcMax() + (omen()=="orage"?-2:0) + (omen()==="calme"?3:0);
  const lines = [
    {who:"cog",t:c.line},
    {who:"ten",t:"Tu es engagé ! Bienvenue à la taverne."},
    {who:"cog",t:"Merci, patron ! Je connais un peu l'endroit : je venais boire un verre ici, l'après-midi. Hector racontait toujours de drôles d'histoires…"},
    {who:"cog",t:"Le matin, on fait les courses. L'après-midi, on sert les gens du village. Et le soir, on ferme : à Bourg-Brume, tout le monde dort à dix heures !"},
    {who:"cog",t:"Hector nous a laissé 400 ₽. Allons voir Kecleon au marché pour les ingrédients."}
  ];
  if(S.duo) lines.push({who:"narr",t:"Vos Auras s'accordent : Duo ! +3 PC max."});
  if(c.aura===OPPOSITE[S.ten.aura]) lines.push({who:"narr",t:"Vos Auras s'opposent… Ça risque de frotter un peu. Et de donner de belles discussions."});
  playDialog(lines, startDay, renderPrologue);
}
