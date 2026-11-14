// ---------- Nuit ----------
// ---------- Carte de saison ----------
function seasonMapHTML(){
  const cell=(k,n)=>{ const d=CL[k], st=S.clients[k], from=fromNight(k);
    if(n<from) return "";
    const met=st.visits>0, done=st.state==="apaise"||st.state==="staff";
    const cls = done ? "done" : met ? "met" : "unk";
    return `<div class="smc ${cls}" title="${met?d.n:"???"}">${sprite(d.id,met?d.n:"???",met?d.c:"#000",{anim:false})}${done?`<span class="smok">✓</span>`:""}</div>`; };
  let rows="";
  for(let n=1;n<=NIGHTS_PER_SEASON;n++){
    const arr=CLIENT_ORDER.filter(k=>inSeason(k) && fromNight(k)===n && (n>1 || seasonOf(k)===(S.season||1) || !["apaise","staff"].includes(S.clients[k].state)));
    const state = n<S.night?"past":n===S.night?"now":"next";
    const om=omenFor(n), O=om&&OMENS[om];
    rows+=`<div class="smrow ${state}"><div class="smn">Nuit ${n}${n===S.night?"<br><small>ce soir</small>":""}${O?`<div class="omen" title="${O.n} : ${O.d}" data-act="omenInfo" data-n="${n}">${O.i}</div>`:""}${n===NIGHTS_PER_SEASON?`<div class="omen" title="Le Grand Écho">🌀</div>`:""}</div><div class="smcs">${arr.map(k=>cell(k,n)).join("")||`<span class="small muted">${n<S.night?"":"Les habitués reviennent"}</span>`}</div></div>`;
  }
  const done=CLIENT_ORDER.filter(k=>["apaise","staff"].includes(S.clients[k].state)).length;
  return `<div class="px" style="color:var(--candle);font-size:18px">Carte de la saison ${S.season||1}</div>
    <p class="small muted" style="margin:4px 0 10px">Chaque nuit, de nouvelles âmes trouvent la Faille. Celles qui ne sont pas encore apaisées reviennent les nuits suivantes.</p>
    <div class="smap">${rows}</div>
    <div id="omeninfo" class="small" style="margin-top:6px;min-height:16px">${omen()?`Ce soir : ${OMENS[omen()].i} <b>${OMENS[omen()].n}</b>. ${OMENS[omen()].d}`:`<span class="muted">Touche un présage pour le lire. 🌀 : à la fin de la 7e nuit, le Grand Écho.</span>`}</div>
    <div class="small" style="margin-top:10px">Âmes apaisées : <b>${done}/${CLIENT_ORDER.length}</b> · Pages du Grand Registre : <b>${S.pages}</b></div>
    ${commandsHTML()}
    <button style="width:100%;margin-top:12px" data-act="closeModal">Fermer</button>`;
}
function seasonOf(k){ return CL[k].season||1; }
function fromNight(k){ return seasonOf(k)===(S.season||1) ? (CL[k].from||1) : 1; }
function inSeason(k){ return seasonOf(k)<=(S.season||1); }
function isAvailable(k){ const st=S.clients[k].state; return st!=="apaise" && st!=="staff"; }
function reg(k){ S.reg=S.reg||{}; S.reg[k]=S.reg[k]||{met:false,likes:[],dislikes:[],hints:[],lines:[],wound:null,frags:[]}; return S.reg[k]; }
function regAdd(k, field, v){ const r=reg(k); if(v!=null && !r[field].includes(v)) r[field].push(v); }
function addKeyword(k, kw){ S.keywords[k]=S.keywords[k]||[]; if(!S.keywords[k].includes(kw)) S.keywords[k].push(kw); }

// ---------- Petite cinématique entre le jour et la nuit ----------
const CINE_TOWN = `<svg class="ctown" viewBox="0 0 400 150" preserveAspectRatio="xMidYMax meet"><path class="chill" d="M0,95 C60,70 120,82 180,72 C250,60 320,78 400,66 L400,150 L0,150Z"/>
  <path class="cbld" d="M0,150 L0,112 L22,96 L44,112 L44,150 M50,150 L50,104 L78,84 L106,104 L106,150 M150,150 L150,98 L162,98 L162,84 L172,84 L172,98 L176,98 L210,70 L244,98 L244,150 M262,150 L262,108 L286,90 L310,108 L310,150 M318,150 L318,100 L346,80 L374,100 L374,150 M380,150 L380,114 L400,104 L400,150Z"/>
  <rect class="cwin" x="61" y="112" width="8" height="9"/><rect class="cwin" x="87" y="112" width="8" height="9"/><rect class="cwin big" x="193" y="104" width="12" height="13"/><rect class="cwin big" x="215" y="104" width="12" height="13"/><rect class="cwin" x="203" y="84" width="8" height="8"/><rect class="cwin" x="281" y="116" width="8" height="9"/><rect class="cwin" x="335" y="110" width="8" height="9"/><rect class="cwin" x="16" y="120" width="7" height="8"/>
  <path class="csign" d="M226,126 l18,0 l0,10 l-18,0z"/></svg>`;
function cine(kind, next){
  const night = kind==="nuit", O = night && omen() ? OMENS[omen()] : null;
  const title = night ? `Nuit ${S.night}` : `Jour ${S.night}`;
  const sub = night ? (S.pg?"La Faille rêve sous la taverne":S.night===NIGHTS_PER_SEASON?"La dernière nuit de la saison":"Minuit approche à Bourg-Brume") : "Le soleil se lève sur Bourg-Brume";
  const el=document.createElement("div"); el.id="cine"; el.className="dncine "+(night?"to-night":"to-day"); el.dataset.act="cineSkip";
  el.innerHTML=`<div class="csky"></div><div class="cstars"></div><div class="csun"></div><div class="cmoon"></div>
    ${ARTOK["cine-"+kind]?`<img class="cimg" src="${artSrc("cine-"+kind)}" alt="">`:CINE_TOWN}
    <div class="ctitle"><small>${sub}</small><b>${title}</b>${O?`<span>${O.i} ${O.n}</span>`:""}</div><div class="cskip">${typeof isDesk==="function"&&isDesk()?"Clic ou Espace pour passer":"Toucher pour passer"}</div>`;
  document.body.appendChild(el); music(night?"nuit":"village");
  let done=false; const fin=()=>{ if(done) return; done=true; el.classList.add("out"); setTimeout(()=>el.remove(),450); U.cineNext=null; next(); };
  U.cineNext=fin; setTimeout(fin, 3600);
}
function startNight(){
  music("nuit");
  S.pc = pcMax();
  // au plus MAX_GUESTS âmes par nuit : les nouvelles d'abord, puis celles qu'on a le moins vues ; les autres attendent la nuit suivante
  const avail = CLIENT_ORDER.filter(k=>inSeason(k) && isAvailable(k) && fromNight(k)<=S.night);
  const lastSeen = k => S.clients[k].lastNight||0;
  const pick = avail.slice().sort((a,b)=> (S.clients[a].visits===0?0:1)-(S.clients[b].visits===0?0:1) || lastSeen(a)-lastSeen(b) || CLIENT_ORDER.indexOf(a)-CLIENT_ORDER.indexOf(b)).slice(0, MAX_GUESTS - (omen()==="calme"?1:0));
  const queue = CLIENT_ORDER.filter(k=>pick.includes(k));
  queue.forEach(k=>S.clients[k].lastNight=S.night);
  U.waiting = avail.filter(k=>!pick.includes(k));
  U.rivalTook = null;
  if(rivalOpen() && U.waiting.length){ const k=U.waiting[0]; S.clients[k].rival=true; U.rivalTook=k; }
  U.night = {queue, idx:0, confident:[], flambeeUsed:false, otariaUsed:false, pifeuilUsed:false, served:[], out:{}, recruits:[], earned0:S.stats.earned, served0:S.stats.served, perfect0:S.stats.perfect};
  if(U.night.queue.length===0){ seasonClose(); return; }
  let lines;
  if(!S.tutoDone){
    lines=[
      {who:"narr",t:"Le soir tombe sur Bourg-Brume. Vous rangez les derniers verres, prêts à fermer pour la nuit."},
      {who:"cog",t:"Première journée terminée, patron ! Ici, tout le monde dort à dix heures. On sera tranquilles."},
      {who:"narr",t:"Minuit sonne au clocher. Soudain, les bougies vacillent… et la porte d'entrée se met à briller d'une lumière violette."},
      {who:"cog",t:COG_MIDNIGHT[S.cog]},
      {who:"ten",t:"Hector n'a jamais parlé de ça… Qu'est-ce qui se passe ?"},
      {who:"narr",t:"La porte s'ouvre toute seule. Derrière, ce n'est plus la rue de Bourg-Brume : c'est un ciel violet, immense, plein de reflets qui bougent comme de l'eau."},
      {who:"narr",t:"Une silhouette hésite sur le seuil. Elle a l'air perdue. Et terriblement fatiguée."},
      {who:"cog",t:"On… on la laisse entrer ? Elle a l'air d'avoir besoin d'un endroit au chaud."},
      {who:"ten",t:"Entrez. La taverne est ouverte."}
    ];
  } else {
    lines=[{who:"narr",t:"Minuit. Les bougies vacillent, et la porte s'illumine de violet : la Faille est de nouveau ouverte."},{who:"cog",t:cogSay("ouvrir")}];
  }
  if(omen()){ const O=OMENS[omen()]; lines.push({who:"narr",t:`Présage de la nuit : ${O.i} <b>${O.n}</b>. ${O.d}`}); }
  const q=U.night.queue, newOnes=q.filter(k=>S.clients[k].visits===0).length, back=q.length-newOnes;
  lines.push({who:"narr",t:`Dans la lumière de la Faille, ${q.length===1?"une silhouette attend":`${q.length} silhouettes attendent`} sur le seuil${back?` (${back===q.length?"des visages connus":`dont ${back} visage${back>1?"s":""} connu${back>1?"s":""}`})`:""}.`});
  if(U.rivalTook) lines.push({who:"narr",t:`De l'autre côté de la rue, l'enseigne du Pourboire d'Or s'allume. Une silhouette hésite, puis traverse vers la lumière dorée : <b>${CL[U.rivalTook].n}</b> passera la nuit chez Miaouss.`});
  if(U.waiting && U.waiting.length) lines.push({who:"narr",t:`Plus loin dans la brume, ${U.waiting.length===1?"une autre silhouette patiente":`${U.waiting.length} autres silhouettes patientent`}. La taverne est trop petite pour tout le monde ce soir : ${U.waiting.length===1?"elle reviendra":"elles reviendront"} demain.`});
  U.silsSeen=[];
  playDialog(lines, ()=>miaoussVisit(nextClient), ()=>{ $app.innerHTML = `${hud()}${scene({night:true,doorOpen:true,sil:true,sils:U.night.queue.slice(U.night.idx)})}<div class="panel">${dialogBubble()}</div>`; U.silsSeen=U.night.queue.slice(); });
}
function nextClient(){
  const N=U.night;
  if(N.idx>=N.queue.length){ finService(); return; }
  const k=N.queue[N.idx], d=CL[k], st=S.clients[k];
  st.visits++; reg(k).met=true;
  const shiny = Math.random()<0.01;
  const c = U.cur = {k, ouv:0, ten:0, stage:0, turns:MAX_TURNS, hintI:0, hang:0, euph:false, shiny, lieShown:false, lieCalled:false, qUsed:false, reformed:{}, done:false, revealed:[]};
  c.ouv = st.carryOuv; c.ten = st.carryTen; c.stage = st.stage||0; c.confTonight = 0;
  if(talent()==="bavardage") c.ouv++;
  if(!S.shiny && (k==="ponchiot"||k==="magicarpe")) c.ouv++;
  if(S.shiny && shiny) c.ouv++;
  if(staffOn("rondoudou")) c.ten--;
  if(staffOn("canarticho") && d.family==="Défaite") c.ouv++;
  if(staffOn("hypotrempe") && d.family==="Abandon") c.ouv++;
  if(staffOn("goupix") && d.family==="Abandon") c.ten--;
  staffFx("arrive", c, d);
  if(d.onArrive) d.onArrive(c);
  if(staffOn("ronflex")) c.turns++;
  if(hasBib("sablier")) c.turns++;
  if(hasBib("clochette")) c.ouv++;
  if(omen()==="orage" && WATER_SOULS.includes(k)) c.ouv++;
  if(omen()==="lune") c.ten++;
  if(omen()==="fete") c.turns--;
  const fromRival = st.rival && st.visits>1; if(st.rival){ st.rival=false; if(fromRival){ c.ten++; c.hang=(c.hang||0)+1; } }
  c.ouv=clamp(c.ouv,0,4); c.ten=clamp(c.ten,0,4);
  const lines=[];
  if(fromRival){ lines.push({who:"narr",t:`${d.n} revient du Pourboire d'Or, les yeux rouges et la démarche incertaine. Une gueule de bois dorée, et un peu plus de Tension. Mais quelque chose s'est déposé au fond : un souvenir amer, qu'il te confie sans le vouloir.`}); S.fragments.push({n:`Nuit dorée et amère de ${d.n}`,e:"tristesse",from:k,amer:true}); }
  if(shiny) lines.push({who:"narr",t:"La silhouette scintille dans l'encadrement de la porte… Un client chromatique ! Ses couleurs ne ressemblent à aucune autre."});
  lines.push({who:"narr",t: st.visits===1 ? d.intro : `La porte s'ouvre sur la Faille. ${d.n} est de retour.`});
  if(st.amerSeason && st.amerSeason<(S.season||1) && !st.amerSaid){ st.amerSaid=true; lines.push({who:clientSp(),t:"<i>Il s'arrête sur le seuil et te regarde longtemps.</i> Toute une saison… Tu es encore là. Moi aussi, apparemment. J'ai gardé quelque chose d'amer, de la dernière fois. Peut-être que ça pourra servir, en bas."}); }
  lines.push({who:clientSp(), t:d.arrive, mood:moodOf(c)});
  if(st.visits>1) lines.splice(1,0,{who:"narr",t: st.aff>0?`${d.n} te reconnaît. (Affinité ${hearts(st.aff)})`:`${d.n} est revenu.`});
  if(k==="leveinard" && st.visits===1 && S.clients.ponchiot && ["staff","apaise"].includes(S.clients.ponchiot.state)) lines.push({who:"narr",t:S.clients.ponchiot.state==="staff"?"Derrière le comptoir, Ponchiot dresse les oreilles. Sa queue se met à battre, très fort. Il la reconnaît.":"Tu repenses à Ponchiot, et à la Leveinard de la station-service dont il t'a parlé."});
  if(st.visits===1 && S.night<=2) lines.push({who:"cog",t:`<i>Il se penche vers toi et chuchote.</i> ${d.cogHint}`});
  if(S.cog==="marcacrin" || staffOn("ponchiot")){
    const ing = d.comfort[rnd(d.comfort.length)]; regAdd(k,"likes",ing);
    lines.push({who:"cog",t:cogSay("flair",{n:d.n,i:ING[ing]?ING[ing].n:ing})});
  }
  U.away = true;
  if(!S.counterTuto){
    S.counterTuto=true;
    lines.push({who:"narr",t:"En le regardant, tu ressens quelque chose d'étrange. Comme si tu pouvais lire en lui."});
    lines.push({who:"narr",t:"Son <b>Ouverture</b> : à quel point il est prêt à se confier. Sa <b>Tension</b> : à quel point il est près de partir. Tu les vois au-dessus de lui."});
    lines.push({who:"cog",t:"Patron… je le sens aussi. Il ne restera pas toute la nuit : six échanges, peut-être. À chaque fois, on ne peut faire qu'une chose."});
    lines.push({who:"cog",t:"<b>Lui servir un verre</b> adapté à ce qu'il ressent. Ou <b>le relancer</b> pour qu'il se confie… mais pas trop vite, sinon il se braque."});
    lines.push({who:"cog",t:"On peut aussi <b>discuter</b> de tout et de rien, ou <b>essuyer un verre</b> en le laissant souffler : ça ne fatigue pas, et ça le met en confiance, un peu."});
    lines.push({who:"cog",t:"Et puis <b>se taire</b> pour l'observer, ou <b>reformuler</b> : lui redire un mot qu'il nous a confié, pour qu'il sache qu'on l'écoute."});
    lines.push({who:"cog",t:"Une âme ne se livre pas en une soirée : <b>une confidence par nuit</b>, pas plus. Au bout de <b>trois</b>, si son Ouverture monte au maximum, il nous fera vraiment confiance. Ce qu'il nous a dit, il s'en souviendra d'une visite à l'autre. Si sa Tension déborde, il partira. On essaie ?"});
  }
  playDialog(lines, renderClient, ()=>renderClientScene(U.away));
  setTimeout(()=>{ U.away=false; const s=document.getElementById("cslot"); if(s) s.classList.remove("away"); },60);
}
function clientSp(){ const d=CL[U.cur.k]; return {id:d.id,n:d.n}; }
function moodOf(c){ return c.ten>=3?"tense":(c.ouv<=1?"sad":""); }
const AFF_MAX = 5; // l'artefact arrive au 5e cœur
function hearts(n){ return `<span class="hearts">${"♥".repeat(n)}${"♡".repeat(Math.max(0,AFF_MAX-n))}</span>`; }
function baroHTML(){
  const c=U.cur, d=CL[c.k];
  return `<div class="baro"><div class="who">${d.n}${c.shiny?" ✦":""} <span class="small muted">· ${d.family}</span></div>
    <div class="lbl"><span>Ouverture</span><span>${c.ouv}/5</span></div>${pips(c.ouv,"o")}
    <div class="lbl"><span>Tension</span><span>${c.ten}/5</span></div>${pips(c.ten,"t")}
    <div class="lbl" style="margin-top:1px"><span>Confidences</span><span>${Math.min(c.stage,CONF_NEEDED)}/${CONF_NEEDED}</span></div></div>`;
}
function renderClientScene(away){
  const c=U.cur, d=CL[c.k];
  $app.innerHTML = `${hud()}${scene({night:true,doorOpen:true,baro:baroHTML(),client:sprite(d.id,d.n,d.c,{anim:true,shiny:c.shiny,h:"112px"}),clientAway:!!away})}<div class="panel">${U.dlg?dialogBubble():""}</div>`;
}
function renderClient(msg){
  const c=U.cur, d=CL[c.k];
  const pcCost = prepCost();
  const kws = allKeywords();
  const canLie = c.lieShown && !c.lieCalled && seesLies();
  $app.innerHTML = `${hud()}${scene({night:true,doorOpen:true,baro:baroHTML(),client:sprite(d.id,d.n,d.c,{anim:true,shiny:c.shiny,h:"112px"})})}
  <div class="panel">
    <div class="bubble ${msg&&msg.narr?"narr":""}" style="cursor:default">${msg&&!msg.narr?spkHTML(msg.who||d.n, d.c):""}${msg?(msg.narr&&femCtx()?feminize(msg.t):femSys(msg.t)):`${spkHTML(d.n,d.c)}${d.arrive}`}${msg&&msg.lie&&seesLies()?`<span class="lie">✦ La bougie vacille : ce n'est pas vrai.</span>`:""}</div>
    <div class="turns">Encore ${c.turns} échange${c.turns>1?"s":""} avant qu'${d.fem?"elle":"il"} ne reparte</div>
    <div class="actions">
      <button class="full" data-act="openBuilder" data-ctx="client">Servir un verre <small>${pcCost} PC</small></button>
      <button data-act="relancer" ${S.pc<1?"disabled":""}>Relancer <small>1 PC</small></button>
      <button data-act="reformuler" ${S.pc<1||kws.length===0?"disabled":""}>Reformuler <small>1 PC</small></button>
      <button data-act="discuter">Discuter <small>gratuit</small></button>
      <button data-act="essuyer">Essuyer <small>gratuit</small></button>
      <button data-act="taire">Se taire <small>gratuit</small></button>
      ${canLie?`<button data-act="callLie">Mensonge <small>le relever</small></button>`:`<button class="alt" data-act="registre" data-k="${c.k}">Registre <small>notes</small></button>`}
      ${S.cog==="pifeuil"&&!U.night.pifeuilUsed?`<button class="ghost full sm" data-act="pifeuil">Courant d'air : renvoyer sans pénalité</button>`:""}
    </div>
  </div>`;
}
function allKeywords(){ const out=[]; Object.keys(S.keywords).forEach(k=>S.keywords[k].forEach(w=>out.push({k,w}))); return out; }
function useTurn(){ U.cur.turns--; }
function afterAction(msg){
  const c=U.cur;
  c.ouv=clamp(c.ouv,0,5); c.ten=clamp(c.ten,0,5);
  if(c.ouv>=5 && c.stage>=CONF_NEEDED){ reachConfidence(msg); return; }
  if(c.ouv>=5 && msg && !msg.narr && c.confTonight<confLimit()){ msg.t += `<br><span class="small"><i>Il est prêt à s'ouvrir : relance-le pour qu'il te confie la suite.</i></span>`; }
  if(c.ten>=5){ clientLeaves("tense", msg); return; }
  if(c.turns<=0){ clientLeaves("time", msg); return; }
  renderClient(msg);
  cry(CL[c.k].id, moodOf(c), false);
}
function relancer(){
  const c=U.cur, d=CL[c.k];
  if(c.confTonight>=confLimit() && c.stage<CONF_NEEDED){
    useTurn();
    afterAction({t:`<i>${["Il fait tourner son verre entre ses doigts.","Il baisse les yeux vers le comptoir.","Il esquisse un petit sourire las."][c.stage%3]}</i> J'en ai déjà dit beaucoup, ce soir… La suite, une autre fois. D'accord ?<br><span class="small">(Il ne se confie qu'une fois par nuit. Profite du reste de la soirée pour le mettre à l'aise : son Ouverture le suivra jusqu'à sa prochaine visite.)</span>`});
    return;
  }
  if(d.patient && c.lastAct==="relancer"){
    S.pc--; useTurn(); c.ten+=2; c.lastAct="relancer";
    afterAction({t:`<i>Il ouvre un œil, lentement, et le referme.</i> …Pas si vite. Tu me presses, là. Comme lui.<br><span class="delta n">Tension +2</span> <span class="small">(Ne le relance jamais deux fois de suite : laisse-le respirer entre deux questions.)</span>`});
    return;
  }
  c.lastAct="relancer";
  S.pc--; useTurn();
  if(c.stage>=d.stages.length){ afterAction({t:"<i>Il esquisse un sourire fatigué.</i> Je crois que je t'ai tout dit, ce soir."}); return; }
  const st=d.stages[c.stage];
  if(c.ouv>=st.req){
    c.stage++; c.ouv++; c.confTonight++; S.clients[c.k].stage=Math.max(S.clients[c.k].stage||0,c.stage);
    if(st.kw) addKeyword(c.k, st.kw);
    regAdd(c.k,"lines",st.t);
    let t=st.t, lie=false;
    if(d.lie && d.lie.after===c.stage-1){ t+=" "+d.lie.t; lie=true; c.lieShown=true; }
    let tip="";
    if(st.kw && !S.kwTuto){ S.kwTuto=true; tip=`<br><span class="small"><i>Ce mot compte pour lui : il est noté dans le Registre des habitués. Tu pourras le « reformuler » plus tard pour lui montrer que tu l'as écouté.</i></span>`; }
    let gift="";
    const cc=CLIENT_CARD[c.k];
    if(cc && !S.clients[c.k].cardGiven){ S.clients[c.k].cardGiven=true; ensureDeck(); deckAdd(cc); gift=`<div class="giftcard"><span class="small"><i>En parlant, il t'a montré un geste qu'il connaît par cœur. Nouvelle carte pour ton deck :</i></span>${cardHTML(cc)}</div>`; }
    afterAction({t:t+(st.kw?` <span class="kw">mot-clé : ${st.kw}</span>`:"")+tip+gift, lie});
  } else {
    if(talent()==="question" && !c.qUsed){ c.qUsed=true; afterAction({narr:true,t:"Ta question tombe juste, sans le brusquer. Il ouvre la bouche… puis la referme. Pas encore. (Question juste)"}); return; }
    c.ten++;
    afterAction({t:`<i>Il se raidit et détourne les yeux.</i> Pourquoi tu veux savoir ça ?<br><span class="small">(Trop tôt : sers-lui d'abord un verre qui lui convient, ou laisse-le souffler.)</span>`});
  }
}
function taire(){
  if(U.cur) U.cur.lastAct=null;
  const c=U.cur, d=CL[c.k];
  useTurn();
  const n = talent()==="oreille" ? 2 : 1;
  const got=[];
  for(let i=0;i<n;i++){ if(c.hintI<d.hints.length){ got.push(d.hints[c.hintI]); c.revealed.push(d.hints[c.hintI]); regAdd(c.k,"hints",d.hints[c.hintI]); c.hintI++; } }
  let calm="";
  if(c.ten>=3){ c.ten--; calm=" Le silence l'apaise un peu (-1 Tension)."; }
  S.clients[c.k].obs = Math.max(S.clients[c.k].obs||0, c.hintI);
  if(got.length) calm += ` <span class="small">(Observation notée : elle l'aidera dans le Labyrinthe.)</span>`;
  if(!got.length) got.push("Il boit en silence. Tu as déjà tout remarqué.");
  afterAction({narr:true,t:got.join("<br>")+calm});
}
function discuter(){
  if(U.cur) U.cur.lastAct=null;
  const c=U.cur, d=CL[c.k];
  useTurn(); c.talkI=c.talkI||0;
  const tl=TALK[c.k]||[];
  if(c.ten>=3){ afterAction({t:`<i>Il répond par monosyllabes, les yeux ailleurs.</i> Mmh. Oui. Sûrement.<br><span class="small">(Trop tendu pour bavarder : apaise-le d'abord.)</span>`}); return; }
  if(c.talkI>=tl.length){ afterAction({t:"<i>Il hoche la tête.</i> La conversation s'essouffle doucement, sans gêne."}); return; }
  if(d.duelist && !c.servedOnce && !c.duelWarned){ c.duelWarned=true; c.ten++; afterAction({t:`<i>Il lève une aile, offensé.</i> On ne bavarde pas avec un duelliste avant de l'avoir servi, tavernier. <span class="delta n">+1 Tension</span>`}); return; }
  const l=tl[c.talkI++]; let extra="";
  if(c.ouv<3){ c.ouv++; extra+=` <span class="delta p">+1 Ouverture</span>`; }
  if(l.like){ regAdd(c.k,"likes",l.like); extra+=`<br><span class="small"><i>Noté dans le Registre : il aime ${ING[l.like].n}.</i></span>`; }
  afterAction({t:l.t+extra});
}
function essuyer(){
  if(U.cur) U.cur.lastAct=null;
  const c=U.cur;
  useTurn(); c.wipeI=c.wipeI||0;
  const wl=WIPE[c.k]||["<i>Le silence s'installe, confortable.</i>"];
  const line=wl[Math.min(c.wipeI,wl.length-1)]; c.wipeI++;
  let extra="";
  if(CL[c.k].quiet){ c.ten=Math.min(5,c.ten+1); afterAction({narr:true,t:`Tu prends un verre et un torchon. ${line} <span class="delta n">+1 Tension</span>`}); return; }
  if(c.ten>=1){ const r=hasBib("tablier")?Math.min(2,c.ten):1; c.ten-=r; extra=` <span class="delta p">-${r} Tension</span>`; }
  else if(c.ouv<3){ c.ouv++; extra=` <span class="delta p">+1 Ouverture</span>`; }
  afterAction({narr:true,t:`Tu prends un verre et un torchon, sans rien dire. ${line}${extra}`});
}
function reformuler(){
  const kws=allKeywords();
  openModal(`<h3>Reformuler</h3><p class="small muted">Reprends un mot-clé qu'il t'a confié. Le plus récent touche juste.</p>
    <div class="ings">${kws.map((x,i)=>`<button class="ing" data-act="reform" data-i="${i}">${esc(x.w)} <span class="q2">${CL[x.k].n}</span></button>`).join("")}</div>
    <button class="ghost" data-act="closeModal">Annuler</button>`);
}
function doReform(i){
  if(U.cur) U.cur.lastAct=null;
  closeModal();
  const c=U.cur, d=CL[c.k], x=allKeywords()[i];
  S.pc--; useTurn();
  if(x.k!==c.k){ c.ten++; afterAction({t:`<i>Il fronce les sourcils.</i> De quoi tu parles ? Ça n'a rien à voir avec moi. <span class="delta n">+1 Tension</span>`}); return; }
  const last = d.stages[c.stage-1] && d.stages[c.stage-1].kw;
  if(c.reformed[x.w]){ afterAction({t:"<i>Il hoche lentement la tête.</i> Oui… On en a déjà parlé."}); return; }
  c.reformed[x.w]=true;
  if(x.w===last){ c.ouv+=2; afterAction({t:`Tu reformules : ${d.reform[x.w]||"« "+x.w+" »"}<br><i>Il lève les yeux vers toi, surpris.</i> …Oui. C'est exactement ça. <span class="delta p">+2 Ouverture</span>`}); }
  else { c.ouv+=1; afterAction({t:`Tu reformules : ${d.reform[x.w]||"« "+x.w+" »"}<br><i>Il acquiesce, un peu ailleurs.</i> Oui, c'est vrai. <span class="delta p">+1 Ouverture</span>`}); }
}
function callLie(){
  const c=U.cur; c.lieCalled=true; c.ouv++; useTurn();
  afterAction({t:`Tu demandes doucement : « Vraiment ? »<br><i>Un long silence. Le bois du tabouret craque.</i> …Non. Pas vraiment. <span class="delta p">+1 Ouverture</span>`});
}
function pifeuilAct(){
  const c=U.cur, st=S.clients[c.k];
  U.night.pifeuilUsed=true;
  st.carryOuv=Math.min(c.ouv,3); st.carryTen=Math.max(0,c.ten-1);
  st.state="partial"; U.night.out[c.k]="Renvoyé poliment (reviendra)";
  playDialog([{who:"cog",t:cogSay("courantAir")},{who:"narr",t:`${CL[c.k].n} repart sans rancune. Il reviendra.`}], ()=>{U.night.idx++; nextClient();}, ()=>renderClientScene());
}
function reachConfidence(msg){
  const c=U.cur, d=CL[c.k], st=S.clients[c.k];
  c.done=true;
  const lines=[];
  if(msg) lines.push({who:msg.narr?"narr":clientSp(), t:msg.t});
  const last=d.stages[d.stages.length-1];
  if(c.stage<d.stages.length){ lines.push({who:clientSp(),t:last.t}); }
  lines.push({who:"narr",t:`${d.n} se tait. Ses épaules se relâchent. Pour la première fois de la soirée, il te regarde vraiment : il te fait confiance.`});
  if(!S.fragTuto){
    S.fragTuto=true;
    lines.push({who:"narr",t:`Quelque chose de lumineux se détache de lui et roule sur le comptoir : ${d.frags.length===3?"trois":"deux"} petites sphères tièdes. Dans chacune, une image bouge.`});
    lines.push({who:clientSp(),t:"<i>Il les regarde rouler, sans les retenir.</i> Je ne sais pas ce que c'est… Des choses que je n'arrivais plus à porter tout seul, je crois."});
    lines.push({who:"cog",t:"Des Fragments de Mémoire… Hector en parlait dans ses vieilles histoires, au comptoir. Je croyais que c'était des contes !"});
    lines.push({who:"cog",t:"Ce sont ses souvenirs à lui. Ils ne serviront qu'à lui, où qu'il aille."});
  } else {
    lines.push({who:"narr",t:`${d.frags.length===3?"Trois":"Deux"} souvenirs lumineux roulent sur le comptoir : ses Fragments de Mémoire.`});
  }
  regAdd(c.k,"lines",d.stages[d.stages.length-1].t);
  d.frags.forEach(f=>{ S.fragments.push({n:f.n,e:f.e,from:c.k}); regAdd(c.k,"frags",f.n); lines.push({who:"narr",t:`Fragment obtenu : <b style="color:${EMO[f.e].c}">${EMO[f.e].i} ${f.n}</b>, un souvenir de ${EMO[f.e].n}.`}); });
  if(S.dungeonKnown) lines.push({who:clientSp(),t:"<i>Il jette un coup d'œil vers la trappe, derrière le comptoir.</i> À l'aube… je crois que je suis prêt à descendre."});
  else lines.push({who:clientSp(),t:"<i>Il regarde la porte violette, sans bouger.</i> Je peux rester encore un peu ? Je ne suis pas prêt à repartir là-dedans."});
  addXP(80);
  gainAff(c.k, lines);
  st.carryOuv=0; st.carryTen=0;
  U.night.confident.push({k:c.k, ten:c.remede?0:c.ten, hang:c.hang, euph:c.euph});
  cry(d.id,"",true);
  playDialog(lines, ()=>{ U.night.idx++; nextClient(); }, ()=>renderClientScene());
}
function soulFavCheck(k, lines){ const st=S.clients[k], d=CL[k]; if(!(st && st.aff>=3 && SOUL_FAV[k] && !soulFavKnown(k))) return; S.soulFav=S.soulFav||{}; S.soulFav[k]=true; lines.push({who:clientSp2(k),t:SOUL_FAV[k].say},{who:"narr",t:`${drinkIcon(SOUL_FAV[k],"big")}Boisson unique de ${d.n} notée au Registre : <b>${SOUL_FAV[k].n}</b> (${orderShort(SOUL_FAV[k])}).`}); }
function gainAff(k, lines){
  const st=S.clients[k], d=CL[k];
  if(st.aff>=AFF_MAX) return;
  st.aff++;
  lines.push({who:"narr",t:`Affinité avec ${d.n} : ${hearts(st.aff)}`});
  soulFavCheck(k, lines);
  if(st.aff===2 && d.affCard && !st.affCardGiven){ st.affCardGiven=true; ensureDeck(); deckAdd(d.affCard); lines.push({who:clientSp2(k),t:`Tiens. Chez moi, on offre ça aux gens qu'on aime bien. Garde-la.`},{who:"narr",t:`<div class="giftcard"><span class="small">Carte de voyageur, rien qu'à ${d.n} :</span>${cardHTML(d.affCard)}</div>`}); }
  if(st.aff===2 && d.recipe && !S.recipes.includes(d.recipe.key)){ S.recipes.push(d.recipe.key); lines.push({who:clientSp2(k),t:`Tiens, je te donne ma recette. <b>${d.recipe.n}</b> : ${d.recipe.d}.`}); }
  relicInit();
  if(st.aff===AFF_MAX && d.gift && !S.owned[d.gift.key]){ const worn=gainRelic(d.gift.key); lines.push({who:clientSp2(k),t:`Je veux que tu gardes ça. Ça m'a porté chance, là-dessous.`},{who:"narr",t:`Artefact obtenu : ${d.gift.i} <b>${d.gift.n}</b> (${d.gift.d}). `+(worn?`Tu le portes : il accompagnera chaque client dans son Labyrinthe.`:`Tu portes déjà ${RELIC_MAX} artefacts : il est rangé dans le Registre, où tu peux choisir lesquels porter.`)}); }
}
function clientSp2(k){ return {id:CL[k].id,n:CL[k].n}; }
function clientLeaves(why, msg){
  const c=U.cur, d=CL[c.k], st=S.clients[c.k];
  const lines=[];
  if(msg) lines.push({who:msg.narr?"narr":clientSp(), t:msg.t});
  if(why==="tense"){
    lines.push({who:clientSp(),t:"<i>Il se lève d'un coup ; le tabouret racle le plancher.</i> J'aurais pas dû venir.",mood:"tense"},{who:"narr",t:`${d.n} quitte la taverne, trop tendu. Il reviendra peut-être… plus fermé.`});
    st.carryOuv=0; st.carryTen=2; st.state="rechute"; U.night.out[c.k]="Reparti trop tendu";
  } else {
    lines.push({who:clientSp(),t: c.confTonight ? "<i>Il se lève, plus léger qu'en arrivant.</i> Merci de m'avoir écouté. Je… je reviendrai te raconter la suite." : "<i>Il jette un regard vers la porte, puis vers toi.</i> Il faut que j'y aille. Merci pour le verre.",mood:c.confTonight?"":"sad"},{who:"narr",t:`${d.n} repart dans la Faille. ${c.confTonight?`Il t'a confié un morceau de son histoire (${Math.min(c.stage,CONF_NEEDED)}/${CONF_NEEDED}).`:"Il se souviendra de cette soirée."}`});
    st.carryOuv=Math.min(2,Math.floor(c.ouv/2)+1); st.carryTen=0; st.state="partial"; U.night.out[c.k]= c.confTonight ? `S'est confié (${Math.min(c.stage,CONF_NEEDED)}/${CONF_NEEDED}), reviendra` : "Reparti avant de se confier";
  }
  playDialog(lines, ()=>{ U.night.idx++; nextClient(); }, ()=>renderClientScene());
}

// ---------- Préparation d'un verre ----------
function prepCost(){ return Math.max(0, 2 - (S.cog==="tarsal"?1:0)); }
function openBuilder(ctx){
  U.b = {ctx, base:"eau", ess:{}, add:[], rest:false, flambe:false};
  renderBuilder();
}
function essDoses(){ return Object.values(U.b.ess).reduce((a,b)=>a+b,0); }
function renderBuilder(){
  const b=U.b, cost=prepCost()+(b.rest?1:0);
  const noPC = U.b.ctx==="client" && S.pc<prepCost();
  const adds = Object.keys(ING).filter(k=>ING[k].cat!=="base" && ((S.stock[k]||0)>0 || b.add.includes(k)));
  const shake = S.recipes.includes("shake") && b.base==="lait" && b.add.includes("sitrus");
  openModal(`<h3>Préparer un verre</h3>${b.ctx==="vill"?`<div class="order" style="margin-bottom:8px">Commande de ${U.vill.n} : <b>${orderShort(U.order)}</b> ${orderMatch(U.order,b)?'<span style="color:var(--good)">✓</span>':''}${favKnown(U.vill.key)?`<br>Ou sa boisson fétiche : <b>${orderShort(FAV[U.vill.key])}</b> ${orderMatch(FAV[U.vill.key],b)?'<span style="color:var(--good)">✓</span>':''}`:""}</div>`:""}
    ${noPC?`<p class="small" style="color:var(--bad)">Plus assez de PC : tu ne peux servir qu'une Eau Fraîche, sans rien d'autre.</p>`:""}
    <div class="sect">1 · La base</div>
    <div class="ings">${BASES.filter(ingOk).map(k=>{const it=ING[k];const st=it.free?"":"×"+(S.stock[k]||0);const dis=(!it.free&&!S.stock[k])||(noPC&&k!=="eau");return `<button class="ing ${b.base===k?"on":""}" data-act="bBase" data-k="${k}" ${dis?"disabled":""}>${itemIcon(k)}${it.n}<span class="q2">${st}</span></button>`;}).join("")}</div>
    <div class="sect">2 · Les gelées (2 max : une = léger, deux = fort)</div>
    <div class="ings">${Object.keys(ESS).map(k=>{const n=b.ess[k]||0;const st=S.stock["gel_"+k]||0;return `<button class="ing ${n?"on":""}" data-act="bEss" data-k="${k}" ${noPC||(!st&&!n)?"disabled":""}>${gelIcon(k)}${ESS[k].n.replace("Gelée ","")}<span class="gw">${ESS[k].ap}</span><span class="q2">${n?n+"/":""}×${st}</span></button>`;}).join("")}</div>
    <div class="sect">3 · Ingrédients (2 max)</div>
    <div class="ings">${adds.map(k=>{const it=ING[k];const st=S.stock[k]||0;const on=b.add.includes(k);return `<button class="ing ${on?"on":""}" data-act="bAdd" data-k="${k}" ${(!st&&!on)||noPC?"disabled":""}>${itemIcon(k)}${it.n}<span class="q2">×${st}</span></button>`;}).join("")}</div>
    ${talent()==="flambee"&&b.ctx==="client"&&!U.night.flambeeUsed?`<label class="row small" style="margin-bottom:8px"><input type="checkbox" data-act="bFlambe" ${b.flambe?"checked":""}> Flambée (1×/nuit) : double l'effet des essences</label>`:""}
    ${talent()==="infusion"&&b.ctx==="client"?`<label class="row small" style="margin-bottom:8px"><input type="checkbox" data-act="bRest" ${b.rest?"checked":""}> Infusion lente : laisser reposer (+1 PC, +1 Ouverture)</label>`:""}
    ${shake?`<p class="small" style="color:var(--good)">Recette reconnue : Protéine Shake de Machopeur (+3 PC) !</p>`:""}
    <div class="row"><button class="ghost" data-act="closeModal">Annuler</button><button class="grow" data-act="bGo">Préparer ${b.ctx==="client"?`(${noPC?0:cost} PC)`:""}</button></div>
    <label class="row small muted" style="margin-top:10px"><input type="checkbox" data-act="toggleAssist" ${S.settings.assist?"checked":""}> Mode assisté (gestes automatiques, note « Bien »)</label>`);
}
function bBase(k){ U.b.base=k; renderBuilder(); }
function bEss(k){ const b=U.b; const n=b.ess[k]||0; const st=S.stock["gel_"+k]||0;
  if(n>=2 || n>=st){ delete b.ess[k]; } else if(essDoses()<2){ b.ess[k]=n+1; } else if(n>0){ delete b.ess[k]; } renderBuilder(); }
function bAdd(k){ const b=U.b; const i=b.add.indexOf(k); if(i>=0) b.add.splice(i,1); else if(b.add.length<2) b.add.push(k); renderBuilder(); }
function bGo(){
  const b=U.b;
  if(b.ctx==="client"){
    const noPC = S.pc<prepCost();
    if(noPC){ b.base="eau"; b.ess={}; b.add=[]; b.rest=false; b.flambe=false; }
    else { if(b.rest && S.pc<prepCost()+1) b.rest=false; const freeCup = hasBib("tasse") && U.night && !U.night.tasseUsed; if(freeCup) U.night.tasseUsed=true; S.pc -= (freeCup?0:prepCost())+(b.rest?1:0); }
    if(b.flambe) U.night.flambeeUsed=true;
  }
  if(!ING[b.base].free) S.stock[b.base]--;
  b.add.forEach(k=>S.stock[k]--);
  Object.keys(b.ess).forEach(t=>{ S.stock["gel_"+t]=Math.max(0,(S.stock["gel_"+t]||0)-b.ess[t]); });
  startGestures();
}

// ---------- Gestes tactiles ----------
function startGestures(){
  U.g = {grades:[], step:0, steps:["pour"].concat(U.b.add.some(CRUSH)?["tap"]:[]).concat(["swipe"])};
  if(S.settings.assist){ U.g.grades=U.g.steps.map(()=> "B"); finishGestures(); return; }
  nextGesture();
}
function nextGesture(){
  const g=U.g;
  if(g.step>=g.steps.length){ finishGestures(); return; }
  const s=g.steps[g.step];
  if(s==="pour") gPour(); else if(s==="tap") gTap(); else gSwipe();
}
function glassHTML(d){
  const crush = d.add.filter(CRUSH);
  const garn = d.add.filter(k=>!CRUSH(k));
  let h = `<div class="gliq" style="background:${LIQ[d.base]}"></div>`;
  if(d.base==="soda"||d.base==="limonade") h += `<div class="gbub"></div>`;
  // couches de fruits écrasés au fond
  crush.forEach((k,i)=>{ h += `<div class="glayer" style="bottom:${i*14}%;background:${ING[k].c}"></div>`; });
  // morceaux de gelée en suspension
  let n=0; Object.keys(d.ess).forEach(t=>{ for(let j=0;j<d.ess[t];j++){ h += `<span class="gcube" style="--g:${ESS[t].c};left:${18+n*30}%;bottom:${30+((n*17)%25)}%"></span>`; n++; } });
  // garnitures
  garn.forEach((k,i)=>{
    if(k==="miel") h += `<div class="gmiel"></div>`;
    else if(k==="poudre") h += `<div class="gspark">✦ ✧ ✦</div>`;
    else if(k==="menthe") h += `<span class="grim" style="left:${10+i*42}%">${SVG_LEAF}</span>`;
    else h += `<span class="grim" style="left:${10+i*42}%">${itemIcon(k)}</span>`;
  });
  return h;
}
function bigIcon(k){
  const it=ING[k]||{};
  if(typeof ARTOK!=="undefined" && ARTOK["ing-"+k]) return `<img class="itm big" src="${artSrc("ing-"+k)}" alt="${it.n}">`;
  if(it.item) return `<img class="itm big" src="${itemSrc(it.item)}" data-remote="${itemUrl(it.item)}" data-c="${it.c}" alt="${it.n}">`;
  return `<span class="dot big" style="background:${it.c||"#888"}"></span>`;
}
function gradeHTML(gr){ return gr==="P"?`<span class="grade P">Parfait !</span>`:gr==="B"?`<span class="grade B">Bien</span>`:`<span class="grade R">Raté…</span>`; }
function gPour(){
  const base=ING[U.b.base];
  const width = base.force>=3?8:base.force>=1?12:16;
  const center = 60+rnd(16);
  const lo=center-width/2, hi=center+width/2;
  openModal(`<h3>Maintenir : verser la base</h3>
    <div class="gest"><div class="hint">Garde le doigt appuyé pour verser ${base.n}. Relâche dans la zone verte.</div>
    <div class="glass" id="glass"><div class="zone" style="bottom:${lo}%;height:${hi-lo}%"></div><div class="liq" id="liq" style="background:${LIQ[U.b.base]}"></div></div>
    <div class="pour" id="pourBtn">Appuyer pour verser</div><div id="gres" style="min-height:30px"></div></div>`);
  const btn=document.getElementById("pourBtn"), liq=document.getElementById("liq");
  let lvl=0, timer=null, done=false, last=0;
  const speed = base.force>=3?70:55; // % par seconde
  const tick=(t)=>{ if(!last) last=t; const dt=(t-last)/1000; last=t; lvl+=speed*dt; liq.style.height=Math.min(lvl,100)+"%"; if(lvl>=100){ end(); return; } timer=requestAnimationFrame(tick); };
  const startP=(e)=>{ e.preventDefault(); if(done) return; try{btn.setPointerCapture(e.pointerId);}catch(_){} btn.classList.add("on"); last=0; timer=requestAnimationFrame(tick); };
  const end=()=>{ if(done||!timer&&lvl===0) return; done=true; cancelAnimationFrame(timer); btn.classList.remove("on");
    const dist=Math.abs(lvl-center); const gr = lvl>=100?"R": dist<=2.5?"P": (lvl>=lo&&lvl<=hi)?"B":"R";
    U.g.grades.push(gr); document.getElementById("gres").innerHTML=gradeHTML(gr)+(lvl>=100?" Ça déborde !":"");
    setTimeout(()=>{ U.g.step++; nextGesture(); },750); };
  btn.addEventListener("pointerdown",startP);
  btn.addEventListener("pointerup",end); btn.addEventListener("pointerleave",()=>{ if(timer&&!done) end(); }); btn.addEventListener("pointercancel",end);
}
function gTap(){
  const nb = U.b.add.filter(CRUSH).length;
  const target = 4*nb;
  const max = target+4;
  openModal(`<h3>Tapoter : écraser les fruits</h3>
    <div class="gest"><div class="hint">Tapote pour écraser. Vise le trait vert : trop peu = fade, trop = amer.</div>
    <div class="meter"><i id="tapbar" style="left:0;width:0"></i><b style="left:${(target/max)*100}%"></b></div>
    <div class="tapzone" id="tapz"><div class="tapicons" id="tapicons">${U.b.add.filter(CRUSH).map(k=>bigIcon(k)).join("")}</div><div class="tapcount" id="tapcount">0</div></div>
    <button id="tapok">C'est écrasé !</button><div id="gres" style="min-height:30px"></div></div>`);
  let n=0, done=false;
  const z=document.getElementById("tapz");
  z.addEventListener("pointerdown",(e)=>{ e.preventDefault(); if(done) return; n=Math.min(max,n+1); document.getElementById("tapcount").textContent=n;
    const ic=document.getElementById("tapicons"); ic.style.transform=`scale(${1+0.06*Math.min(n,4)},${Math.max(0.35,1-n/max*0.65)})`; ic.classList.remove("jolt"); void ic.offsetWidth; ic.classList.add("jolt"); z.classList.add("hit"); setTimeout(()=>z.classList.remove("hit"),80); document.getElementById("tapbar").style.width=(n/max*100)+"%"; });
  document.getElementById("tapok").addEventListener("click",()=>{ if(done) return; done=true;
    const diff=Math.abs(n-target); const gr=diff===0?"P":diff===1?"B":"R";
    U.g.grades.push(gr); document.getElementById("gres").innerHTML=gradeHTML(gr)+(n<target?" Un peu fade.":n>target?" Un peu amer.":"");
    setTimeout(()=>{ U.g.step++; nextGesture(); },750); });
}
function gSwipe(){
  openModal(`<h3>Glisser : servir le verre</h3>
    <div class="gest"><div class="hint">Fais glisser le verre vers le client, d'un geste fluide. Ni trop vite, ni trop lentement.</div>
    <div class="drinkname">${drinkName(U.b)}${U.b.flambe?" flambé":""}</div>
    <div class="swipe" id="swz"><div class="target">↑ vers le client ↑</div>${ARTOK[drinkKey(U.b)]?`<div class="gl glart" id="swg"><img src="${artSrc(drinkKey(U.b))}" alt="" draggable="false"></div>`:`<div class="gl" id="swg">${glassHTML(U.b)}</div>`}</div>
    <div id="gres" style="min-height:30px"></div></div>`);
  const z=document.getElementById("swz"), gl=document.getElementById("swg");
  let sx=0, sy=0, t0=0, active=false, done=false;
  z.addEventListener("pointerdown",(e)=>{ if(done) return; active=true; sx=e.clientX; sy=e.clientY; t0=performance.now(); try{z.setPointerCapture(e.pointerId);}catch(_){}});
  z.addEventListener("pointermove",(e)=>{ if(!active||done) return; const dy=Math.min(0,e.clientY-sy), dx=e.clientX-sx; gl.style.transform=`translate(${dx}px,${dy}px)`; });
  const up=(e)=>{ if(!active||done) return; active=false;
    const dy=e.clientY-sy, dx=Math.abs(e.clientX-sx), dt=performance.now()-t0;
    if(dy>-80){ gl.style.transform=""; return; }
    done=true;
    let gr; if(dt<170) gr="R"; else if(dt<=950 && dx<70) gr="P"; else gr="B";
    gl.style.transition="transform .3s"; gl.style.transform=`translate(0,-160px)`;
    U.g.grades.push(gr); document.getElementById("gres").innerHTML=gradeHTML(gr)+(gr==="R"?" Trop vite, ça éclabousse !":"");
    setTimeout(()=>{ U.g.step++; nextGesture(); },750); };
  z.addEventListener("pointerup",up); z.addEventListener("pointercancel",up);
}
function finishGestures(){
  const gr=U.g.grades;
  const rate=gr.filter(x=>x==="R").length;
  const q = gr.every(x=>x==="P") ? "P" : rate>=2 ? "R" : "J";
  const drink={base:U.b.base, ess:Object.assign({},U.b.ess), add:U.b.add.slice(), rest:U.b.rest, flambe:U.b.flambe};
  closeModal(); U.g=null;
  S.drinkBook=S.drinkBook||{}; const dk=drinkKey(drink); if(dk) S.drinkBook[dk]=true;
  if(U.b.ctx==="vill") villagerServed({drink,q});
  else serveClient({drink,q});
}

// ---------- Effets d'un verre ----------
function evalDrink(k, d){
  const def=CL[k]; let ouv=0, ten=0, hang=0; const notes=[];
  const mult = d.flambe?2:1;
  Object.keys(d.ess).forEach(t=>{ const dose=d.ess[t]; if(!dose) return;
    if(t===def.wound){ reg(k).wound=t; if(dose===1){ ouv+=2*mult; notes.push(def.essGood); } else { ten+=2*mult; notes.push(def.essBad); } }
    else if(def.likesEss.includes(t)){ ouv+=1*mult; notes.push(`${ESS[t].n} : il aime.`); }
  });
  let force=ING[d.base].force; if(d.add.includes("miel")||d.add.includes("framby")) force=Math.max(0,force-1);
  if(d.base==="soda"){ ouv+=1; ten+=1; notes.push("Les bulles lui délient la langue… et l'agacent un peu."); }
  if(d.base==="limonade" && U.cur && U.cur.ouv<=1){ ouv+=1; notes.push("L'acidité le réveille un peu."); }
  if(d.base==="the"){ ten-=1; notes.push("La chaleur du thé le détend."); }
  { const r=ingFx(d.base,{def,k,cur:U.cur,isBase:true}); ouv+=r.ouv||0; ten+=r.ten||0; hang+=r.hang||0; if(r.turns&&U.cur) U.cur.turns+=r.turns; if(r.note) notes.push(r.note); }
  if(def.comfort.includes(d.base)){ ouv+=1; regAdd(k,"likes",d.base); notes.push(`${ING[d.base].n} : il apprécie.`); }
  if(def.dislike.includes(d.base)){ ten+=1; regAdd(k,"dislikes",d.base); notes.push(`${ING[d.base].n} : il fait la grimace.`); }
  if(def.cold && (d.base==="eau"||d.base==="soda")){ ten+=1; notes.push("<i>Elle frissonne de la tête aux six queues.</i> C'est… c'est glacé."); }
  if(def.noPity && d.base==="eau"){ ten+=1; notes.push("<i>Il fixe le verre d'eau, vexé.</i> L'aumône ? Pour moi ?"); }
  if(force>def.tol){ ten+=force-def.tol; notes.push("C'est trop fort pour lui."); }
  if(d.base==="liqueur") hang+=1;
  d.add.forEach(a=>{
    if(def.comfort.includes(a)){ ouv+=1; regAdd(k,"likes",a); notes.push(`${ING[a].n} : ça le réconforte.`); }
    if(def.dislike.includes(a)){ ten+=1; regAdd(k,"dislikes",a); notes.push(`${ING[a].n} : il fait la grimace.`); }
    if(a==="oran") ten-=1; if(a==="sitrus") ten-=2; if(a==="menthe") ten-=1;
    if(a==="plume" && !def.dislike.includes("plume")) ouv+=1;
    if(a==="poudre"){ ouv+=2; }
    if(a==="fraive") hang-=1;
    if(a==="wiki") ten-=1;
    { const r=ingFx(a,{def,k,cur:U.cur}); ouv+=r.ouv||0; ten+=r.ten||0; hang+=r.hang||0; if(r.turns&&U.cur) U.cur.turns+=r.turns; if(r.note) notes.push(r.note); }
    if(a==="figuy" && !def.comfort.includes("figuy") && !def.dislike.includes("figuy")) ten+=1;
    if(a==="pommesucree" && (def.family==="Abandon"||def.family==="Perte") && !def.comfort.includes(a)) ouv+=1;
    if(a==="pommeacide" && def.family==="Défaite" && !def.comfort.includes(a)) ouv+=1;
    if(a==="gateau"){ ten-=10; notes.push("Le Vieux Gâteau lui fait tout oublier, un instant."); }
    if(a==="petitchampi" && U.cur){ U.cur.turns+=1; notes.push("Rassasié, il restera un peu plus."); }
    if(a==="grochampi" && U.cur){ U.cur.turns+=2; notes.push("Bien nourri, il restera plus longtemps."); }
  });
  if(d.rest) ouv+=1;
  return {ouv,ten,hang,notes};
}
function serveClient(res){
  if(U.cur) U.cur.lastAct=null;
  const c=U.cur, d=CL[c.k];
  c.servedOnce=true;
  const e=evalDrink(c.k,res.drink);
  if(res.q==="P" && e.ouv>0) e.ouv+=1;
  if(res.q==="R"){ e.ouv=Math.floor(e.ouv/2); if(res.drink.add.includes("pecha")) e.notes.push("La douceur de la Baie Pêcha fait passer la maladresse."); else e.ten+=1; }
  if(res.drink.add.includes("mepo")){ S.pc=Math.min(pcMax()+5,S.pc+2); e.notes.push("Baie Mepo : tu reprends ton souffle (+2 PC)."); }
  if(res.drink.add.includes("biscuit") && U.cur){ U.cur.turns++; e.notes.push("Biscuit Lava : il reste grignoter un peu plus."); }
  if(res.q==="R" && d.noLaugh){ e.ten+=2; e.notes.push("<i>Il fixe le verre renversé, puis toi.</i> Tu te moques de moi, toi aussi ?"); }
  if(S.recipes.includes("remede") && res.drink.base==="limonade" && res.drink.add.includes("menthe") && res.drink.add.includes("wiki")){ c.remede=true; e.notes.push("<b>Remède de Psykokwak !</b> Il n'arrivera pas stressé dans son Labyrinthe."); }
  if(S.cog==="otaria" && e.ten>0 && !U.night.otariaUsed){ U.night.otariaUsed=true; e.ten=0; e.notes.push("Otaria fait rire le client : la grimace passe. (Épaule mouillée)"); }
  if(res.drink.add.includes("poudre")) c.euph=true;
  c.ouv+=e.ouv; c.ten+=e.ten; c.hang=Math.max(0,c.hang+e.hang);
  // Baie Kika : délie une confidence
  let kikaLine="";
  if(res.drink.add.includes("kika") && c.stage<d.stages.length-1 && c.confTonight<confLimit()){ const st=d.stages[c.stage]; c.stage++; c.confTonight++; S.clients[c.k].stage=Math.max(S.clients[c.k].stage||0,c.stage); if(st.kw) addKeyword(c.k,st.kw); regAdd(c.k,"lines",st.t); kikaLine=`<br><i>La Baie Kika lui délie la langue :</i> « ${st.t} »${st.kw?` <span class="kw">mot-clé : ${st.kw}</span>`:""}`; }
  // Recette de Machopeur
  let shake="";
  if(S.recipes.includes("shake") && res.drink.base==="lait" && res.drink.add.includes("sitrus")){ S.pc=Math.min(pcMax()+3,S.pc+3); shake="<br><b>Protéine Shake !</b> +3 PC."; }
  // Prix
  const price=ING[res.drink.base].sell;
  let tip = res.q==="P"?price:res.q==="J"?Math.round(price*0.5):0;
  if(res.q==="P" && staffOn("tiplouf")) tip+=15;
  if(c.shiny) tip*=3;
  tip=Math.round(tip*(1+tipBonus()));
  if(c.ten+0>=5) tip=0;
  S.money+=price+tip; S.stats.earned+=price+tip; S.stats.served++; if(res.q==="P"){ S.stats.perfect++; scInc("perfect"); }
  toast(`+${price+tip} ₽`);
  addXP(res.q==="P"?25:10);
  if(res.q==="P" && !U.night.served.includes(c.k) && S.clients[c.k].aff<1){ /* l'affinité vient surtout de la Confiance */ }
  U.night.served.push(c.k);
  useTurn();
  const qtxt = res.q==="P"?`<span class="grade P" style="font-size:16px">Verre parfait</span>`:res.q==="J"?`<span class="grade B" style="font-size:16px">Verre juste</span>`:`<span class="grade R" style="font-size:16px">Verre raté</span>`;
  const dl = `<span class="delta ${e.ouv>=0?"p":"n"}">Ouverture ${e.ouv>=0?"+":""}${e.ouv}</span> · <span class="delta ${e.ten<=0?"p":"n"}">Tension ${e.ten>=0?"+":""}${e.ten}</span> · +${price+tip} ₽`;
  const react = e.ouv>=3?"<i>Il ferme les yeux un instant.</i> …C'est exactement ce qu'il me fallait.":e.ten>=2?"<i>Il repose le verre un peu trop fort.</i> Tu te moques de moi ?":e.ouv>=1?"<i>Il fait tourner le verre entre ses doigts.</i> Pas mal.":"<i>Il boit en silence, le regard ailleurs.</i>";
  let tuto="";
  if(!S.drinkTuto){ S.drinkTuto=true; tuto=`<br><span class="small"><i>${cog().n} chuchote : « Tu as vu ? Ce qu'on met dans le verre change ce qu'il ressent. Le bon verre ouvre son cœur, le mauvais le crispe. »</i></span>`; }
  afterAction({who:d.n,t:`<span class="drinkres">${drinkIcon(res.drink,"big")}<span><b>${drinkName(res.drink)}</b><br>${qtxt}</span></span><br>${e.notes.join(" ")} ${react}${kikaLine}${shake}<br><span class="small">${dl}</span>${tuto}`});
}

// ---------- Fin de service ----------
function finService(){
  const N=U.night, c=cog();
  const lines=[{who:"narr",t:"La porte a cessé de briller. Vous rangez les verres, seuls derrière le comptoir."}];
  const names=N.confident.map(x=>CL[x.k].n).join(" et ");
  if(!S.dungeonKnown){
    if(N.confident.length){
      lines.push({who:"narr",t:`${names} ${N.confident.length>1?"se sont assoupis":"s'est assoupi"} dans un coin de la salle. Sur le comptoir, les Fragments brillent de plus en plus fort.`});
      lines.push({who:"cog",t:"Patron… Ces souvenirs, qu'est-ce qu'on en fait ? On ne peut pas juste les ranger avec les verres."});
    } else lines.push({who:"cog",t:cogSay("finVide")});
  } else {
    if(N.confident.length){ const pl=N.confident.length>1; lines.push({who:"cog",t:cogSay("finConfiance",{n:names,v:pl?"attendent":"attend",s:pl?"se sont":"s'est",o:pl?"sont":"est",e:pl?"s":""}).replace(/prêts?s/g,pl?"prêts":"prêt").replace(/Ses souvenirs/g,pl?"Leurs souvenirs":"Ses souvenirs").replace(/ les guidera avec leurs/,pl?" les guidera avec leurs":" le guidera avec ses").replace(/On les accompagne/,pl?"On les accompagne":"On l'accompagne")}); }
    else lines.push({who:"cog",t:cogSay("finPersonne")});
  }
  const noted=CLIENT_ORDER.filter(k=>isAvailable(k) && !N.confident.find(x=>x.k===k) && S.clients[k].visits>0 && CL[k].cogHint && !(S.cogNotes||{})[k]);
  if(noted.length){ S.cogNotes=S.cogNotes||{}; noted.forEach(k=>S.cogNotes[k]=true);
    lines.push({who:"cog",t:`J'ai découvert des choses sur ${noted.length>1?"nos habitués":CL[noted[0]].n} ce soir. Je les ai écrites dans le Registre, à ${noted.length>1?"leurs pages":"sa page"} : ${noted.map(k=>CL[k].n).join(", ")}.`}); }
  U.fsDone=false;
  playDialog(lines, renderFinChoice, ()=>{ $app.innerHTML=`${hud()}${scene({night:true})}<div class="panel">${dialogBubble()}</div>`; });
}
function renderFinChoice(){
  const c=cog();
  $app.innerHTML=`${hud()}${scene({night:true})}<div class="panel">
    <div class="bubble" style="cursor:default">${spkHTML(c.n,c.c)}${FIN_Q[(S.night-1)%FIN_Q.length].q}</div>
    <div class="answers"><button data-act="finChoice" data-v="0">${FIN_Q[(S.night-1)%FIN_Q.length].a[0]}</button><button data-act="finChoice" data-v="1">${FIN_Q[(S.night-1)%FIN_Q.length].a[1]}</button></div></div>`;
}
function finChoice(v){
  S.duoAff++;
  const c=cog();
  const rep = FIN_Q[(S.night-1)%FIN_Q.length].r[Number(v)];
  playDialog([{who:"cog",t:rep},{who:"narr",t:`Votre lien de duo grandit. (${S.duoAff})`}], startDawn, ()=>{ $app.innerHTML=`${hud()}${scene({night:true})}<div class="panel">${dialogBubble()}</div>`; });
}
