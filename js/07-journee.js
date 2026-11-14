// ---------- Journée : marché + villageois ----------
function staffOn(k){ return S.staff.includes(k) && !(S.unpaid||[]).includes(k); }
function wageOf(k){ return (CL[k].staff&&CL[k].staff.wage)||25; }
// Salaires : versés chaque matin. Un employé non payé ferme son poste pour la journée et la nuit.
// Chaque 3e jour payé, il gagne un cœur d'affinité (c'est ainsi qu'un employé peut atteindre son artefact).
function payroll(){
  const lines=[]; S.unpaid=[]; S.staffDays=S.staffDays||{}; if(!S.staff.length) return lines;
  const paid=[], tot=[];
  S.staff.forEach(k=>{ const w=wageOf(k);
    if(S.money>=w){ S.money-=w; paid.push(`${CL[k].n} ${w} ₽`); tot.push(w); S.staffDays[k]=(S.staffDays[k]||0)+1;
      if(S.staffDays[k]%3===0 && S.clients[k].aff<AFF_MAX){ lines.push({who:clientSp2(k),t:"Merci pour la paie, patron. Ça fait du bien de se sentir utile, ici."}); gainAff(k, lines); } }
    else { S.unpaid.push(k); lines.push({who:"narr",t:`Pas assez dans la caisse pour payer ${CL[k].n} (${w} ₽). Son poste (${CL[k].staff.n}) reste fermé aujourd'hui et cette nuit.`}); } });
  if(paid.length) lines.unshift({who:"narr",t:`💰 Salaires du jour : ${paid.join(", ")} (−${tot.reduce((a,b)=>a+b,0)} ₽). Caisse : ${S.money} ₽.`});
  return lines;
}
function startDay(){
  relicInit();
  music("village");
  const dayKey=`${S.season||1}-${S.night}`;
  if(S.paidDay!==dayKey){ S.paidDay=dayKey; const pl=payroll(); if(pl.length){ save(); playDialog(pl, startDay, ()=>{ $app.innerHTML=`${hud()}${scene({doorOpen:false})}<div class="panel">${dialogBubble()}</div>`; }); return; } }
  S.pc = pcMax();
  U.night = null; U.cur = null; U.dawn = null;
  save();
  if(!S.marketTuto){
    S.marketTuto=true;
    playDialog([
      {who:"narr",t:"Le marché de Bourg-Brume. Entre deux étals, un Kecleon change de couleur en vous voyant arriver."},
      {who:"kecleon",t:"Un nouveau patron à la taverne ? Bienvenue, bienvenue ! Ici, chaque ingrédient a son caractère."},
      {who:"kecleon",t:"Les baies calment, réveillent ou réconfortent. Les gelées ont le goût d'un type de Pokémon : pas chères, mais il en faut ! Lis bien ce qui est écrit sous chaque article."},
      {who:"cog",t:"Ce qu'on achète ici, on le met dans les verres. Prends au moins du Lait Meumeu : les gens du village en raffolent. Et quelques baies, on ne sait jamais."}
    ], renderMarket, ()=>{ $app.innerHTML=`${hud()}<div class="pad" style="flex:1;display:flex;flex-direction:column;gap:12px;justify-content:center"><div style="width:110px;height:110px;margin:0 auto">${sprite(KECLEON.id,"Kecleon",KECLEON.c,{anim:true})}</div>${dialogBubble()}</div>`; });
    return;
  }
  renderMarket();
}
function marketRow(k){
  const g=k.startsWith("gel_"), it = g ? null : ING[k], e = g ? ESS[k.slice(4)] : null;
  const name = g ? e.n : it.n, price = g ? gelPrice() : ingPrice(k), desc = g ? `${e.ap} : ${e.d}` : it.d;
  const icon = g ? gelIcon(k.slice(4)) : itemIcon(k);
  return `<div class="card row">${icon}<div class="grow"><b>${name}</b> <span class="small muted">· ×${S.stock[k]||0}</span><div class="small muted">${desc}</div></div>
    <button class="sm" data-act="buy" data-k="${k}" ${S.money<price?"disabled":""}>${price} ₽</button></div>`;
}
const MARKET_TABS = [
  {k:"base",n:"Bases",say:"Les bases, c'est le cœur du verre. Le lait pour réconforter, la liqueur pour réchauffer… avec modération !"},
  {k:"gel",n:"Gelées",say:"Des gelées, comme dans les grands donjons ! Chacune apaise quelque chose : le chagrin, la peur, la honte… Pas chères, mais il en faut."},
  {k:"baie",n:"Baies",say:"Mes baies sont cueillies du matin. Enfin, d'un matin."},
  {k:"fruit",n:"Fruits",say:"Les pommes de Galar, très recherchées. Sucrées ou acidulées, à vous de voir."},
  {k:"garn",n:"Garnitures",say:"Le petit plus qui change tout. Le Vieux Gâteau, c'est pour les grandes occasions."},
  {k:"cartes",n:"Cartes",say:"Des gestes, des techniques, des souvenirs de combats… Je les trouve un peu partout. Ne me demande pas où."}
];
function marketOffers(){
  if(!S.cardShop || S.cardShop.key!==`${S.season||1}-${S.night}`){ S.cardShop={key:`${S.season||1}-${S.night}`, ids:randomCards(3,{commune:5,peu:4,rare:1}), bought:[]}; }
  return S.cardShop;
}
function marketCardsHTML(){
  const sh=marketOffers(); ensureDeck();
  return `<div class="small muted">Elles rejoignent ton deck pour de bon. Ton deck : <b>${S.deck.length} cartes</b> · <a href="#" data-act="showDeck" style="color:var(--candle)">voir</a></div>
    <div class="dhand pick">${sh.ids.map((id,i)=>{ const pr=CARD_PRICE[CARDS[id].r]||60, sold=sh.bought.includes(i); return `<div class="dshop">${cardHTML(id,{dis:sold})}<button class="sm" data-act="buyCard" data-k="${i}" ${sold||S.money<pr?"disabled":""}>${sold?"Vendu":pr+" ₽"}</button></div>`; }).join("")}</div>
    <button class="alt sm" style="width:100%" data-act="removeCardShop" ${S.money<50?"disabled":""}>Oublier une carte de mon deck (50 ₽)</button>`;
}
function buyCard(i){ const sh=marketOffers(); i=Number(i); const id=sh.ids[i], pr=CARD_PRICE[CARDS[id].r]||60; if(sh.bought.includes(i)||S.money<pr) return; S.money-=pr; sh.bought.push(i); scInc("shop"); addCard(id); cry(KECLEON.id); renderMarket(); }
function removeCardShop(){ ensureDeck(); if(S.deck.length<=DECK_MIN){ toast("Ton deck est déjà très léger."); return; }
  openModal(`<h3>Oublier une carte</h3><p class="small muted">Kecleon la reprend pour 50 ₽. Un deck plus léger, c'est de meilleures cartes plus souvent.</p><div class="dgrid">${S.deck.map((id,i)=>`<div class="dwrap" data-act="rmCard" data-i="${i}">${cardHTML(id)}</div>`).join("")}</div><button class="alt" style="width:100%;margin-top:10px" data-act="closeModal">Annuler</button>`); }
function rmCard(i){ if(S.money<50) return; const id=S.deck[i]; S.deck.splice(i,1); S.money-=50; save(); closeModal(); toast(`${CARDS[id].n} oubliée.`); renderMarket(); }
function renderMarket(){
  pickVillager();
  U.mTab = U.mTab || "base";
  const tab = MARKET_TABS.find(t=>t.k===U.mTab);
  const keys = U.mTab==="cartes" ? [] : U.mTab==="gel" ? Object.keys(ESS).map(t=>"gel_"+t) : Object.keys(ING).filter(k=>ING[k].cat===U.mTab&&!ING[k].free&&ingOk(k));
  $app.innerHTML = `${hud()}<div class="pad scroll" style="flex:1;display:flex;flex-direction:column;gap:10px">
    <div class="stall${ARTOK["marche-etal"]?" hasart":""}">${artBg("marche-etal")}
      <div class="awning"></div>
      <div class="stallsign">Le Marché de la Faille</div>
      <div class="keeper">${sprite(KECLEON.id,"Kecleon",KECLEON.c,{anim:true})}</div>
      <div class="stallboard"><span class="crate"></span><span class="crate b"></span><span class="crate c"></span></div>
    </div>
    <div class="small muted" style="font-style:italic;margin-top:-4px">Kecleon : « ${tab.say} »</div>
    <div class="order">Aujourd'hui à la taverne :${U.day.guests.map(g=>`<div style="margin-top:4px">• <b>${g.n}</b>${g.regular?` <span class="small" style="color:var(--good)">(habitué${CL[g.regular].fem?"e":""} · ${hearts(S.clients[g.regular].aff)})</span>`:""} : ${g.order?`${drinkIcon(g.order,"sm")}<b>${orderShort(g.order)}</b>`:"n'importe quoi"}${favKnown(g.key)?` · fétiche : <b>${orderShort(FAV[g.key])}</b>`:""}</div>`).join("")}</div>
    <div class="mtabs">${MARKET_TABS.map(t=>`<button class="mtab ${t.k===U.mTab?"on":""}" data-act="mTab" data-t="${t.k}">${t.n}</button>`).join("")}</div>
    ${U.mTab==="cartes" ? marketCardsHTML() : `<div class="cards">${keys.map(marketRow).join("")}</div>`}
    ${U.mTab==="base"?`<p class="small muted" style="margin:0">L'Eau Fraîche est gratuite.</p>`:""}
    <button style="width:100%;position:sticky;bottom:8px;margin-top:auto" data-act="leaveMarket">Retourner à la taverne</button>
  </div>`;
}
function buy(k){
  const price = k.startsWith("gel_") ? gelPrice() : ingPrice(k);
  if(S.money<price) return;
  const y=document.querySelector(".pad.scroll") ? document.querySelector(".pad.scroll").scrollTop : 0;
  S.money-=price; S.stock[k]=(S.stock[k]||0)+1; renderMarket();
  const el=document.querySelector(".pad.scroll"); if(el) el.scrollTop=y;
}
function regularGuest(k){ const d=CL[k], r=REGULARS[k]; return {key:k, regular:k, id:d.id, n:d.n, c:d.c, line:r.line, ok:r.ok, ko:r.ko, order:r.order}; }
function villGuest(v){ const list=ORDERS[v.key]; return Object.assign({}, v, {order: list ? list[rnd(list.length)] : null}); }
function pickVillager(){
  if(U.day && U.dayNight===S.night){ return; }
  const guests=[];
  if(!S.tutoDone){
    guests.push(Object.assign({}, VILLAGERS[0], {order:{base:"lait",add:[]}}));
  } else {
    // les âmes apaisées (pas celles qui travaillent ici) reviennent de jour ; on privilégie celles qu'on connaît le moins
    const regs = shuffle(CLIENT_ORDER.filter(k=>S.clients[k] && S.clients[k].state==="apaise" && REGULARS[k])).sort((a,b)=>S.clients[a].aff-S.clients[b].aff);
    const inv = S.invite && S.clients[S.invite] && S.clients[S.invite].state==="apaise" ? S.invite : null;
    if(inv){ const g=regularGuest(inv); g.invited=true; guests.push(g); S.invite=null; regs.splice(regs.indexOf(inv),1); }
    else if(regs.length) guests.push(regularGuest(regs[0]));
    if(!inv && regs.length>1 && Math.random()<0.4) guests.push(regularGuest(regs[1]));
  }
  // Arc croisé : Rondoudou chante, Ronflex reste éveillé jusqu'au bout (une seule fois)
  const okDuet = k => S.clients[k] && S.clients[k].state==="apaise";
  if(S.tutoDone && !S.duetDone && okDuet("rondoudou") && okDuet("ronflex")){
    guests.length=0; guests.push(regularGuest("rondoudou"), Object.assign(regularGuest("ronflex"),{duet:true}));
    U.day={guests, i:0}; U.dayNight=S.night; setGuest(); return;
  }
  const pool = shuffle(VILLAGERS.slice(1).filter(v=>(v.season||1)<=(S.season||1)));
  while(guests.length<DAY_GUESTS && pool.length) guests.push(villGuest(pool.shift()));
  U.day = {guests: S.tutoDone ? shuffle(guests) : guests, i:0};
  U.dayNight=S.night;
  setGuest();
}
function setGuest(){ const g=U.day.guests[U.day.i]; U.vill=g; U.order=g.order; }
function leaveMarket(){
  pickVillager();
  guestArrives();
}
function guestArrives(){
  const v=U.vill;
  const lines=[];
  if(v.duet && !S.duetDone){
    S.duetDone=true; S.pages=(S.pages||0)+1; S.money+=100;
    lines.push({who:"narr",t:"La porte s'ouvre en grand. Ronflex entre, se glisse jusqu'au fond de la salle et s'assoit par terre. Rondoudou, encore au comptoir, se fige, son micro contre elle."},
      {who:{id:39,n:"Rondoudou"},t:"<i>Elle le regarde, puis regarde son micro, puis le regarde encore.</i> Toi… Tu étais au premier rang. Au parc. Tu ronflais si fort qu'on t'entendait depuis la scène."},
      {who:{id:143,n:"Ronflex"},t:"<i>Il ouvre les deux yeux, cette fois, en grand.</i> …C'était toi ? Je venais tous les soirs. C'était le seul endroit où j'arrivais à dormir, après le Centre."},
      {who:{id:39,n:"Rondoudou"},t:"<i>Ses joues se gonflent. Elle hésite.</i> Je… je peux te chanter le quatrième couplet ? Tu n'as jamais entendu la fin."},
      {who:"narr",t:"Elle chante. Toute la taverne retient son souffle. Ronflex reste assis, immobile, les yeux grands ouverts. Il entend le premier couplet, le deuxième, le troisième… et le quatrième. Jusqu'à la dernière note."},
      {who:{id:143,n:"Ronflex"},t:"<i>Un très long silence. Puis il applaudit, lentement, de ses énormes pattes. Le plancher en tremble.</i> C'était beau. Je n'ai pas dormi. Pas une seconde."},
      {who:"narr",t:"Rondoudou pleure et rit en même temps. Personne n'a jamais applaudi aussi fort dans la taverne."});
    gainAff("rondoudou", lines); gainAff("ronflex", lines);
    lines.push({who:"narr",t:"Une page entière s'écrit d'elle-même au Grand Registre. Ils laissent 100 ₽ sur le comptoir, et repartent ensemble, côte à côte. <b>+1 page du Grand Registre</b>"});
    playDialog(lines, ()=>{ U.day.i=U.day.guests.length; cine("nuit", startNight); }, ()=>renderDayScene(v));
    return;
  }
  if(U.day.i>0) lines.push({who:"narr",t:"La cloche de la porte tinte de nouveau."});
  if(v.invited) lines.push({who:{id:v.id,n:v.n},t:"<i>Il brandit une enveloppe un peu froissée.</i> J'ai reçu ton invitation ! Cadoizo l'a glissée sous ma porte au lever du jour. Me voilà !".replace("Il brandit", CL[v.regular].fem?"Elle brandit":"Il brandit")});
  if(v.regular && S.clients[v.regular].dayVisits===undefined){ S.clients[v.regular].dayVisits=0; lines.push({who:"cog",t:`${v.n}, en plein jour ! Les âmes qu'on a aidées reviennent parfois en habituées. Si on lui sert ce qu'il lui faut, on se rapprochera encore.`}); }
  if(!S.tutoDone && U.day.i===0){
    lines.push({who:"narr",t:"De retour à la taverne, vous ouvrez les volets. La cloche de la porte tinte presque aussitôt."});
    lines.push({who:"cog",t:"Notre tout premier client ! Un habitant du village. Le jour, c'est simple : on écoute sa commande, on prépare, on encaisse."});
  }
  lines.push({who:{id:v.id,n:v.n},t:v.line});
  lines.push({who:{id:v.id,n:v.n},t: U.order ? `Je voudrais <b>${orderText(U.order)}</b>, s'il vous plaît.` : "N'importe quoi ! N'importe quoi !"});
  if(!S.tutoDone && U.day.i===0){
    lines.push({who:"cog",t:"Les villageois commandent quelque chose de précis. Si on respecte la commande, ils paient un supplément. Sinon, ils paient moins."});
    lines.push({who:"cog",t:"Pour préparer un verre : une base, une ou deux gelées si on veut (les gelées de Pokémon, chacune a le goût d'un type), et jusqu'à deux ingrédients."});
    lines.push({who:"cog",t:"Ensuite, c'est le geste qui compte : bien verser, bien écraser les baies, bien faire glisser le verre. Plus c'est précis, plus le pourboire est gros !"});
  }
  playDialog(lines, ()=>renderVillager(), ()=>renderDayScene(v));
}
function renderDayScene(v){
  $app.innerHTML = `${hud()}${scene({doorOpen:true,client:sprite(v.id,v.n,v.c,{anim:true,h:"110px"})})}<div class="panel">${U.dlg?dialogBubble():""}</div>`;
}
function renderVillager(){
  const v=U.vill;
  $app.innerHTML = `${hud()}${scene({doorOpen:true,client:sprite(v.id,v.n,v.c,{anim:true,h:"110px"})})}
  <div class="panel"><div class="bubble" style="cursor:default">${spkHTML(v.n,v.c)}${orderAsk(v)}</div>
  <div class="order">Commande : ${drinkIcon(U.order,"sm")}<b>${orderShort(U.order)}</b>${U.order?` · bonus si elle est respectée`:""}${favKnown(v.key)?`<br>Boisson fétiche, ${FAV[v.key].n} : ${drinkIcon(FAV[v.key],"sm")}<b>${orderShort(FAV[v.key])}</b> · gros pourboire, même à la place de la commande`:""}</div>
  <div class="actions"><button class="full" data-act="openBuilder" data-ctx="vill">Préparer sa commande</button></div>
  ${!S.tutoDone?`<div class="small muted center">Choisis une base, des gelées et jusqu'à 2 ingrédients. Puis trois gestes : maintenir, tapoter, glisser.</div>`:""}</div>`;
}
function villagerServed(res){
  const v=U.vill, o=U.order, fav=v.regular?null:FAV[v.key], isFav=!!fav && orderMatch(fav, res.drink), ok=orderMatch(o, res.drink);
  let price = ING[res.drink.base].sell;
  let bonus = ok && o ? Math.round(price*0.5) + 10*o.add.length : 0;
  let tip = res.q==="P" ? price : res.q==="J" ? Math.round(price*0.5) : 0;
  if(res.q==="P" && staffOn("tiplouf")) tip+=15;
  if(isFav){ tip = Math.max(tip, Math.round(price*0.5)) * 2 + 40; scInc("fav"); }
  else if(!ok){ tip=0; price=Math.round(price*0.6); }
  tip = Math.round(tip*(1+tipBonus()));
  const gain = price+bonus+tip;
  S.money+=gain; S.stats.earned+=gain; S.stats.served++; if(res.q==="P"){ S.stats.perfect++; scInc("perfect"); }
  addXP(res.q==="P"?25:10);
  const lines=[{who:{id:v.id,n:v.n},t: isFav ? "<i>Ses yeux s'illuminent dès la première gorgée.</i> C'est… c'est exactement ma boisson préférée ! Comment vous saviez ?" : (ok?v.ok:v.ko)||"Merci !"},{who:"narr",t: drinkIcon(res.drink,"big") + `<b>${drinkName(res.drink)}</b> · ` + (isFav ? `Sa boisson fétiche, ${fav.n} ! +${gain} ₽ (${price} ₽${bonus?` + ${bonus} ₽ de supplément`:""} + ${tip} ₽ de pourboire)` : ok ? `Commande respectée ! +${gain} ₽ (${price} ₽${bonus?` + ${bonus} ₽ de supplément`:""} + ${tip} ₽ de pourboire)` : `Ce n'était pas la commande : seulement ${gain} ₽.`)}];
  if(!S.tutoDone) lines.push({who:"cog",t: res.q==="P" ? "Un verre parfait ! Ça rapporte le double. On fait une sacrée équipe." : res.q==="J" ? "Pas mal du tout ! Avec des gestes parfaits, le pourboire aurait doublé." : "Aïe, un verre raté : pas de pourboire. On fera mieux la prochaine fois !"});
  if(v.regular){
    const st=S.clients[v.regular]; st.dayVisits=(st.dayVisits||0)+1;
    if(ok && res.q!=="R"){ const before=st.aff; gainAff(v.regular, lines); if(st.aff===before) lines.push({who:"narr",t:`${v.n} est déjà l'un${CL[v.regular].fem?"e":""} de tes plus fidèles habitué${CL[v.regular].fem?"e":""}s. (Affinité ${hearts(st.aff)})`}); }
    else lines.push({who:"narr",t: ok ? "Le verre est raté : l'affinité ne bouge pas cette fois." : "Ce n'était pas sa commande : l'affinité ne bouge pas cette fois."});
  }
  if(fav && !favKnown(v.key)){ S.villFav=S.villFav||{}; S.villFav[v.key]=true; lines.push({who:{id:v.id,n:v.n},t:fav.say}); lines.push({who:"narr",t:`Boisson fétiche de ${v.n} notée : ${fav.n} (${orderShort(fav)}).`}); }
  if((ok||isFav) && v.rumor){
    const k = CLIENT_ORDER.find(k=>isAvailable(k));
    if(k) lines.push({who:{id:v.id,n:v.n},t:`Il paraît qu'un certain ${CL[k].n} traîne à la taverne la nuit. Mon petit doigt me dit : ${CL[k].hints[CL[k].hints.length-1].toLowerCase()} Je dis ça, je dis rien.`});
  }
  if(v.key==="cadoizo" && !S.postKnown){ S.postKnown=true;
    lines.push({who:{id:v.id,n:v.n},t:"<i>Il tapote fièrement sa sacoche.</i> Au fait, patron ! La Poste de Bourg-Brume est à ton service. Tu veux revoir un de tes anciens clients ? Écris-lui un mot le soir, je le porte dans la nuit."},
      {who:{id:v.id,n:v.n},t:"Pour 20 ₽, ton invitation arrive au petit matin, et je te garantis qu'il passera dans la journée ! Parole de facteur : rien ne se perd, tout s'envole."},
      {who:"narr",t:"📮 <b>Nouveau :</b> chaque soir, au récap de la nuit, tu peux envoyer une invitation (20 ₽) à une âme apaisée. Elle viendra à coup sûr le lendemain."}); }
  if(v.letter && (ok||isFav)){
    const froms = CLIENT_ORDER.filter(k=>["apaise","staff"].includes(S.clients[k].state) && LETTERS[k]);
    if(froms.length){ const k=froms[rnd(froms.length)]; lines.push({who:"narr",t:`✉️ Une lettre de <b>${CL[k].n}</b> :<br><i>${LETTERS[k]}</i>`});
      if(S.clients[k].aff<AFF_MAX-1){ const b=S.clients[k].aff; gainAff(k, lines); } else lines.push({who:"narr",t:"Tu ranges la lettre dans le Grand Registre."}); }
    else lines.push({who:{id:v.id,n:v.n},t:"Rien pour toi aujourd'hui ! Mais un jour, tu verras, ta boîte débordera."});
  }
  if(v.keyword){
    const k = CLIENT_ORDER.find(k=>isAvailable(k) && !(S.keywords[k]||[]).includes(CL[k].stages[0].kw));
    if(k){ addKeyword(k, CL[k].stages[0].kw); lines.push({who:{id:v.id,n:v.n},t:`« ${CL[k].stages[0].kw.toUpperCase()} ! ${CL[k].stages[0].kw.toUpperCase()} ! » (Mot-clé noté dans le Ledger pour ${CL[k].n}.)`}); }
  }
  const cardOk = ok || isFav;
  const after = ()=>{ if(!cardOk){ nextGuest(); return; }
    const leg = !v.regular && VILL_LEGEND[v.key];
    S.villLeg=S.villLeg||{};
    if(leg && !S.villLeg[v.key]){
      const tries=(S.villLegTries=S.villLegTries||{})[v.key]||0;
      const chance=(isFav?0.2:0.08)+tries*0.03;
      if(Math.random()<chance){ S.villLeg[v.key]=true; ensureDeck(); S.deck.push(leg); scInc("legend"); save(); jingle("apaise");
        playDialog([{who:{id:v.id,n:v.n},t:VILL_LEGEND_LINE[v.key]},{who:"narr",t:`<div class="giftcard"><span class="small">Carte légendaire, rien qu'à ${v.n} :</span>${cardHTML(leg)}</div>`}], nextGuest, ()=>renderDayScene(v)); return; }
      S.villLegTries[v.key]=tries+1;
    }
    // Le tout premier jour, chaque client bien servi offre une carte ; ensuite, c'est rare (25 %, 45 % avec la boisson fétiche)
    const firstDay = (S.season||1)===1 && S.night===1;
    if(!firstDay && Math.random() > (isFav?0.45:0.25)){ nextGuest(); return; }
    const own = v.regular ? CLIENT_CARD[v.regular] : VILL_CARD[v.key];
    const ids = [own].filter(Boolean).concat(randomCards(3,{commune:6,peu:3,rare:1})).filter((x,i,a)=>a.indexOf(x)===i).slice(0,3);
    offerCards(ids, nextGuest, `${v.n} te montre quelque chose`, `Pour te remercier du verre, ${v.n} te propose une carte. Elle rejoindra ton deck pour de bon.`); };
  playDialog(lines, after, ()=>renderDayScene(v));
}
function nextGuest(){
  U.day.i++;
  if(U.day.i>=U.day.guests.length){ cine("nuit", startNight); return; }
  setGuest(); save(); guestArrives();
}
