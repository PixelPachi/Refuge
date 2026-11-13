// ---------- Le Grand Écho : la finale de chaque saison ----------
// ---------- Le Pourboire d'Or : la taverne rival de Miaouss (saisons 4 à 8) ----------
function rivalOpen(){ const se=S.season||1; return se>=4 && se<=8; }
const MIAOUSS = {id:52,n:"Miaouss"};
function miaoussVisit(next){
  if(!rivalOpen() || S.night%2!==0 || (S.miaoussSeen||{})[`${S.season}-${S.night}`]){ next(); return; }
  S.miaoussSeen=S.miaoussSeen||{}; S.miaoussSeen[`${S.season}-${S.night}`]=true; S.miaouss=S.miaouss||{aff:0,visits:0}; S.miaouss.visits++;
  const v=S.miaouss.visits;
  const intro = v===1
    ? "<i>Avant la première âme, la porte de la rue s'ouvre. Miaouss entre, fait tinter une pièce sur le comptoir, et s'installe comme chez lui.</i> Je venais voir la concurrence. Sers-moi ton verre le plus cher. Et le plus fort. Je paie bien, tu vas voir."
    : v===2 ? "<i>Miaouss repousse la porte du pied et jette une bourse pleine sur le comptoir.</i> Encore moi. Chez moi, c'est plein à craquer. Mais personne ne parle. Bizarre, non ? Sers-moi du fort, voisin."
    : "<i>Miaouss entre plus tard que d'habitude, sans sa pièce. Il s'assoit sans rien dire.</i> …Le plus cher. Comme d'habitude. Ou… non. Je ne sais pas. Sers ce que tu veux.";
  U.miaNext=next;
  playDialog([{who:MIAOUSS,t:intro,img:"pourboire-int"}], ()=>{
    openModal(`<h3>🪙 Miaouss au comptoir</h3><p class="small muted">Il veut le verre le plus fort et le plus cher. Il laissera un énorme pourboire si tu le sers comme il demande.</p>
      <div class="answers">
        <button class="dopt" data-act="miaPick" data-c="fort"><b>Le servir comme il veut</b><br><small>Un verre très fort, très cher : +90 ₽. Il repart en riant.</small></button>
        <button class="dopt" data-act="miaPick" data-c="ecoute"><b>Lui offrir un verre doux, et lui demander comment il va</b><br><small>Pas de pourboire. Il risque de mal le prendre.</small></button>
        <button class="dopt" data-act="miaPick" data-c="refus"><b>Refuser son argent</b><br><small>« Ici, le premier verre est offert. » Il se méfie.</small></button>
      </div>`);
  }, ()=>{ $app.innerHTML=`${hud()}${scene({night:true,doorOpen:false})}<div class="panel">${dialogBubble()}</div>`; });
}
function miaPick(c){
  closeModal(); const M=S.miaouss; const lines=[];
  if(c==="fort"){ S.money+=90; S.stats.earned+=90; M.aff=Math.max(0,M.aff-1);
    lines.push({who:MIAOUSS,t:"<i>Il vide le verre d'un coup, grimace, et rit très fort.</i> Ha ! Tu vois, tu apprends vite ! L'argent, voisin. Il n'y a que ça de vrai. <i>Il laisse une pile de pièces, et sort sans se retourner.</i>"});
    lines.push({who:"narr",t:"+90 ₽. La pile de pièces brille sur le comptoir. Personne n'a rien dit de vrai."});
  } else if(c==="ecoute"){ M.aff=Math.min(5,M.aff+1);
    lines.push({who:MIAOUSS,t:M.aff>=3?"<i>Il fixe le verre doux longtemps.</i> …Pas mal. Quand j'étais petit, dans la rue, une vieille dame me donnait du lait chaud. Je l'avais oublié. Ne le répète à personne.":"<i>Il renifle le verre doux, vexé.</i> C'est quoi, ça ? Du lait pour chaton ? <i>Il le boit quand même. Jusqu'au bout.</i> …Hm. Je reviendrai. Pour surveiller la concurrence, bien sûr."});
    lines.push({who:"narr",t:"Miaouss repart sans laisser de pièce. Mais il s'est retourné une fois, sur le seuil."});
  } else { M.aff=Math.min(5,M.aff+(M.visits>=2?1:0));
    lines.push({who:MIAOUSS,t:"<i>Il plisse les yeux.</i> Offert ? Personne n'offre rien. Qu'est-ce que tu veux en échange ? <i>Il attend. Rien ne vient. Il boit, lentement, en te surveillant.</i> …Tu es bizarre, voisin."});
    if(M.visits>=2) lines.push({who:"narr",t:"En partant, il laisse une seule pièce. Pas sur le comptoir : dans la main du co-gérant, presque gentiment."});
  }
  save(); const next=U.miaNext||nextClient; U.miaNext=null;
  playDialog(lines, next, ()=>{ $app.innerHTML=`${hud()}${scene({night:true,doorOpen:false})}<div class="panel">${dialogBubble()}</div>`; });
}

// À la fin de la 7e nuit, la Faille rejette tout ce qu'elle a absorbé pendant la saison. Une âme apaisée redescend, avec tous les souvenirs de la saison.
const FINALE_MAP = {start:"fa",nodes:{
  fa:{t:"entree",n:"Le seuil où tout se mélange",x:50,y:6,nx:["fb"],art:"machopeur/a",say:"Le vestiaire de Machopeur… et la pluie de Ponchiot, en même temps. Toutes nos histoires coulent ici."},
  fb:{t:"echo",e:"tristesse",dmg:1,n:"Le lac des phares",x:50,y:20,nx:["fc"],art:"magicarpe/b",foe:{id:130,n:"Léviator"},say:"Des phares qui passent au fond d'un lac. Ce ne sont pas mes souvenirs… et pourtant ils me font mal."},
  fc:{t:"carrefour",n:"Trois souvenirs mêlés",x:50,y:35,nx:["fd","fe","ff"],art:"ponchiot/d",say:"Trois routes. Chacune sent quelqu'un que j'ai croisé à la taverne."},
  fd:{t:"sanctuaire",n:"Le comptoir dans la brume",x:16,y:50,nx:["fg"],art:"leveinard/e",say:"On dirait le comptoir… en flou. Quelqu'un a laissé un verre chaud. Pour moi ?"},
  fe:{t:"echo",e:"colere",dmg:2,n:"Le rire de tous les rivaux",x:50,y:50,nx:["fg"],art:"machopeur/b",foe:{id:65,n:"Alakazam"},say:"Tous ceux qui se sont moqués de nous, réunis en un seul rire."},
  ff:{t:"enigme",need:"joie",n:"La photo de la taverne",x:84,y:50,nx:["fg"],art:"rondoudou/e",say:"Une photo de la taverne, pleine de monde. Il manque le moment où on riait tous."},
  fg:{t:"echo",e:"peur",dmg:2,n:"La porte violette grande ouverte",x:50,y:68,nx:["fh"],art:"ponchiot/f",say:"La porte ne se referme plus. Tout ce qui est entré cette saison veut ressortir."},
  fh:{t:"coeur",key:"nostalgie",n:"Le cœur de la Faille",x:50,y:88,nx:[],art:"faille",say:"Une ombre immense, avec un sourire que je connais… Ce n'est pas un regret à nous. C'est le sien.",
    boss:{id:94,n:"Ombre de la Faille",hp:115,moves:[{a:"atk",v:12},{a:"vuln",v:1,dmg:8},{a:"buff",v:3},{a:"atk",v:7,x:2},{a:"weak",v:2,dmg:9},{a:"atk",v:19},{a:"def",v:14}]}}
}};
// Saison 4 : le Grand Regret du chapitre 2 est Suicune, qui ne parvient plus à purifier l'eau
const FINALE_MAP_S4 = (()=>{ const m=JSON.parse(JSON.stringify(FINALE_MAP)); const n=m.nodes;
  n.fg=Object.assign({},n.fg,{n:"Le lac souillé",art:"suicune-lac",say:"Le lac. Il était si clair qu'on voyait le fond. Maintenant, on ne voit plus rien, même pas son reflet."});
  n.fh=Object.assign({},n.fh,{n:"Suicune sur l'eau noire",art:"suicune",say:"Suicune. Le vent du nord, celui qui purifie les eaux. Il ne purifie plus rien. Il a perdu le lac qu'il protégeait, et il ne sait plus à quoi il sert.",
    boss:{id:245,n:"Suicune, l'eau souillée",hp:135,moves:[{a:"atk",v:13},{a:"def",v:14},{a:"weak",v:2,dmg:9},{a:"atk",v:8,x:2},{a:"buff",v:3},{a:"vuln",v:2,dmg:10},{a:"atk",v:21}]}});
  return m; })();
function finaleChamps(){ return CLIENT_ORDER.filter(k=>inSeason(k) && ["apaise","staff"].includes(S.clients[k].state)); }
function seasonClose(){
  const se=S.season||1; S.finale=S.finale||{}; S.night=Math.min(S.night,NIGHTS_PER_SEASON);
  if(S.finale[se] || !finaleChamps().length){ endSeason(); return; }
  music("donjon");
  const lines = se===4 ? [
    {who:"narr",t:"La dernière nuit de la saison, la pluie s'arrête d'un coup. Le silence est si total qu'on entend la Faille respirer."},
    {who:"narr",t:"Puis la porte s'ouvre sur un vent du nord glacé. Sur le seuil, une silhouette immense, bleue comme l'eau des montagnes, avec un ruban de cristal qui flotte derrière elle."},
    {who:"narr",t:"Suicune. Le Pokémon légendaire qui court sur les eaux et les purifie. Ses pattes laissent des traces noires et huileuses sur le plancher."},
    {who:{id:245,n:"Suicune"},t:"<i>Sa voix vient de partout à la fois, comme le bruit d'une rivière.</i> On m'a dit qu'ici, on écoutait ceux qui ont perdu ce qu'ils aimaient. J'avais un lac. Le plus clair du monde. Les hommes l'ont souillé, et je n'ai pas su le laver. Je cours sur l'eau depuis, et tout ce que je touche reste sale."},
    {who:"narr",t:"Suicune se couche devant la trappe de la cave. Elle s'ouvre seule. En dessous, la lumière a la couleur d'une eau trouble."},
    {who:"hector",t:"<i>La voix d'Hector, toute proche.</i> C'est un Grand Regret, petit. Un légendaire qui a perdu sa raison d'être. Envoie quelqu'un qui sait ce que c'est, de perdre. Quelqu'un qui s'en est relevé."}
  ] : [
    {who:"narr",t:"Le soleil devrait se lever. Il ne se lève pas. Toutes les bougies de la taverne se couchent d'un coup, du même côté."},
    {who:"narr",t:"La trappe de la cave s'ouvre dans un souffle. En dessous, la lumière n'est plus violette : elle a toutes les couleurs des âmes de la saison, mêlées."},
    {who:"cog",t:"Patron… la Faille déborde ! Tout ce qu'elle a avalé cette saison, les regrets, les souvenirs… tout remonte en même temps !"},
    {who:"hector",t:"<i>Une voix, très loin, comme à travers un mur.</i> Hé… hé. Ne laisse personne descendre seul, cette fois. Envoie quelqu'un qui a déjà trouvé la paix. Lui, il connaît le chemin."},
    {who:"cog",t:"C'était… Hector ? Il avait l'air moins drôle que d'habitude."}
  ];
  playDialog(lines, renderFinaleChoice, ()=>{ $app.innerHTML=`${hud()}${scene({night:true,doorOpen:false})}<div class="panel">${dialogBubble()}</div>`; });
}
function renderFinaleChoice(){
  const ch=finaleChamps();
  $app.innerHTML=`${hud()}<div class="pad scroll" style="flex:1;display:flex;flex-direction:column;gap:10px">
    <h2 class="px" style="color:#c9a8ff;margin:2px 0">🌀 Le Grand Écho</h2>
    <p class="small">Une âme apaisée peut redescendre pour refermer la Faille. Elle se battra avec <b>ton deck</b>, ses artefacts, et <b>tous les souvenirs de la saison</b>. Si elle tombe, rien n'est perdu : elle remonte, et la saison se termine quand même.</p>
    ${ch.map(k=>`<button class="dopt" data-act="finaleGo" data-k="${k}"><span class="row" style="align-items:center"><span style="width:40px;height:40px;display:inline-block">${sprite(CL[k].id,CL[k].n,CL[k].c,{anim:true})}</span><span class="grow"><b>${CL[k].n}</b><br><small style="color:#5a3a20">${hearts(S.clients[k].aff)} · ${S.clients[k].state==="staff"?"employé de la taverne":"apaisé"}</small></span></span></button>`).join("")}
    <button class="alt" data-act="finaleSkip">Laisser la Faille se refermer seule</button></div>`;
}
function finaleGo(k){
  U.night = U.night || {out:{},recruits:[]};
  U.dawn = {list:[{k,ten:0,euph:false,hang:0,finale:true}], i:0};
  setupDungeon();
}
function finaleEnd(win){
  const se=S.season||1; S.finale=S.finale||{}; S.finale[se]=win?"win":"lose"; U.inDungeon=false;
  const lines=[];
  if(win && se===4){
    S.pages+=3; addXP(300); S.suicune=true;
    lines.push({who:"narr",t:"Au fond de la cave, l'eau trouble s'éclaircit d'un coup, comme si quelqu'un avait ouvert une fenêtre sur une source."});
    lines.push({who:{id:245,n:"Suicune"},t:"<i>Il se relève, et ses pattes ne laissent plus de traces noires.</i> Je croyais que purifier, c'était effacer. Rendre le lac comme avant. Mais on ne revient jamais avant. On aide l'eau à couler, et elle se nettoie toute seule, un peu chaque jour. Je vais retourner au lac. Pas pour le réparer. Pour rester à côté de lui."});
    lines.push({who:"narr",t:"Suicune s'incline devant toi, et le vent du nord traverse la taverne en emportant toute la poussière des étagères. Sur le comptoir, une goutte d'eau parfaitement claire est restée."});
    lines.push({who:"narr",t:"Carte légendaire obtenue : 💧 <b>Aurore Pure</b>. Trois pages s'écrivent au Grand Registre."});
    addCard("aurorepure","le cadeau de Suicune");
    if(!S.equip.faille){ S.equip.faille=true; lines.push({who:"narr",t:"Artefact obtenu : 🔮 <b>Éclat de la Faille</b> (+6 PV dans chaque Labyrinthe)."}); }
    lines.push({who:"hector",t:"<i>Le mur tremble.</i> Un légendaire, petit. Tu as écouté un légendaire. …Le chapitre se ferme. Le prochain sera plus étrange. Hé hé."});
  } else if(win){
    S.pages+=2; addXP(200);
    lines.push({who:"narr",t:"Au fond de la cave, la lumière redevient violette, calme. La trappe se referme doucement, comme on borde quelqu'un."});
    if(!S.equip.faille){ S.equip.faille=true; lines.push({who:"narr",t:"Sur la dernière marche, un éclat de lumière est resté accroché. Il pulse comme un cœur."},{who:"narr",t:"Artefact obtenu : 🔮 <b>Éclat de la Faille</b>. Il accompagnera chaque client dans son Labyrinthe : +6 PV."}); }
    lines.push({who:"narr",t:"Deux pages s'écrivent d'un coup au Grand Registre."});
    lines.push({who:"hector",t:"<i>Le mur tremble, et une main violette fait un petit signe avant de disparaître.</i> Pas mal, Tenancier. Pas mal du tout. …Un jour, il faudra que je te parle de cette ombre-là. Pas aujourd'hui. Hé hé."});
  } else {
    lines.push({who:"narr",t:"La lumière reflue toute seule, à contrecœur. La trappe claque. Le silence revient, mais quelque chose gratte encore, très loin en dessous."});
    lines.push({who:"cog",t:"On a tenu bon, patron. La prochaine fois, on sera plus forts."});
  }
  playDialog(lines, endSeason, ()=>{ $app.innerHTML=`${hud()}${scene({night:false,doorOpen:false})}<div class="panel">${dialogBubble()}</div>`; });
}
// ---------- Fin de saison : la chronique ----------
const LAST_SEASON = 5; // chapitre 1 « Portes ouvertes » (saisons 1 et 2) + début du chapitre 2 « La saison des pluies » (saison 3)
function seasonStats(){ const z=S.stats0||{served:0,perfect:0,earned:0,apaise:0}; return {served:S.stats.served-z.served, perfect:S.stats.perfect-z.perfect, earned:S.stats.earned-z.earned}; }
function endSeason(){
  music("fin");
  S.night=Math.min(S.night,NIGHTS_PER_SEASON);
  const season=S.season||1;
  if(!S.seasonOver){
    S.seasonOver=true;
    // L'échec utile : chaque âme rencontrée mais non apaisée laisse un Fragment amer pour la saison suivante
    S.amerGiven=[];
    CLIENT_ORDER.filter(k=>inSeason(k) && S.clients[k].visits>0 && isAvailable(k)).forEach(k=>{
      S.fragments.push({n:`Regret amer de ${CL[k].n}`,e:"tristesse",from:k,amer:true}); S.clients[k].amerSeason=season; S.amerGiven.push(k);
    });
    S.chronicles=S.chronicles||[];
    S.chronicles.push({season, apaise:S.log.filter(l=>l.type==="apaise").map(l=>l.k), stats:seasonStats(), duet:!!S.duetDone});
    save();
  }
  const ap = S.log.filter(l=>l.type==="apaise").map(l=>l.k);
  const first = S.log.find(l=>l.type==="first");
  const quoteK = ap[ap.length-1];
  const quote = quoteK ? CL[quoteK].stages[CL[quoteK].stages.length-1].t : "La porte s'est ouverte, et nous avons écouté.";
  const st=seasonStats(), last = season>=LAST_SEASON;
  $app.innerHTML = `<div class="pad fade scroll" style="flex:1">
    <div class="parch" id="chron">
      <h2>Chronique de la saison ${season}</h2>
      <div class="center small">${season===2?"Chapitre 1 · Portes ouvertes · ":season===3||season===4?"Chapitre 2 · La saison des pluies · ":season===5||season===6?"Chapitre 3 · Les métamorphoses · ":""}La taverne · Bourg-Brume</div>
      <div class="souls">
        <div class="soul">${sprite(S.ten.id,S.ten.n,S.ten.c,{shiny:S.shiny})}</div>
        <div class="soul">${sprite(cog().id,cog().n,cog().c)}</div>
      </div>
      <div class="center"><b>${S.ten.n}${S.shiny?" chromatique":""}</b>, Tenancier, et <b>${cog().n}</b>, co-gérant.</div>
      <h3 class="px" style="margin:14px 0 4px;color:#6a3a14">Âmes apaisées</h3>
      ${ap.length?`<div class="souls">${ap.map(k=>`<div class="soul">${sprite(CL[k].id,CL[k].n,CL[k].c)}</div>`).join("")}</div>`:`<p class="small">Aucune âme apaisée cette saison. Elles reviendront.</p>`}
      ${S.finale&&S.finale[season]?`<p class="small"><b>Le Grand Écho :</b> ${S.finale[season]==="win"?"la Faille a été apaisée.":S.finale[season]==="lose"?"la Faille a résisté, pour cette fois.":"la Faille s'est refermée seule."}</p>`:""}
      ${S.cmd&&S.cmd.season===season?`<p class="small"><b>Commandes de la Faille :</b> ${S.cmd.ids.filter(i=>S.cmd.done[i]).length}/3 accomplies.</p>`:""}
      ${first?`<p class="small"><b>Moment fort :</b> nuit ${first.night}, ${CL[first.k].n} a trouvé la paix dans le Labyrinthe des Origines.</p>`:""}
      ${S.duetDone && S.chronicles && S.chronicles.filter(c=>c.duet).length===1 && S.chronicles[S.chronicles.length-1].duet ? `<p class="small"><b>Une rencontre :</b> Rondoudou a chanté son quatrième couplet, et Ronflex est resté éveillé jusqu'au bout.</p>`:""}
      <blockquote>« ${quote} »</blockquote>
      ${(S.amerGiven||[]).length?`<p class="small"><b>Ceux qui reviendront :</b> ${S.amerGiven.map(k=>CL[k].n).join(", ")}. Chacun laisse un Fragment amer, qui pourra l'aider à la saison prochaine.</p>`:""}
      <div class="stats">
        <div>Verres servis : <b>${st.served}</b></div><div>Verres parfaits : <b>${st.perfect}</b></div>
        <div>Pokédollars gagnés : <b>${st.earned} ₽</b></div><div>Pages du Registre : <b>${S.pages}</b></div>
        <div>Niveau du Tenancier : <b>${S.level}</b></div><div>Personnel : <b>${S.staff.map(k=>CL[k].n).join(", ")||"aucun"}</b></div>
      </div>
      ${season===2?`<p class="small center" style="margin-top:10px"><b>Fin du chapitre 1 · Portes ouvertes.</b> La taverne a appris à écouter.</p>`:season===4?`<p class="small center" style="margin-top:10px"><b>Fin du chapitre 2 · La saison des pluies.</b> La taverne a appris à rester à côté de ceux qui ont perdu quelqu'un.</p>`:""}
    </div>
    <div class="row" style="margin-top:14px"><button class="grow alt" data-act="copyChron">Copier la chronique</button>${last?`<button class="grow" data-act="newGame">Nouvelle partie</button>`:`<button class="grow" data-act="nextSeason">Commencer la saison ${season+1}</button>`}</div>
    <p class="small muted center">${last?"Fin du prototype : la saison 6, la fin des « Métamorphoses » et Mewtwo, viendra dans une prochaine version.":"Tes niveaux, ton personnel, tes affinités, tes recettes et tes artefacts te suivent. Les bibelots, eux, restent dans la saison qui s'achève."}</p>
  </div>`;
}
function startNextSeason(){
  S.season=(S.season||1)+1; S.night=1; S.seasonOver=false; S.log=[]; S.bibelots=[]; S.amerGiven=[];
  S.stats0={served:S.stats.served,perfect:S.stats.perfect,earned:S.stats.earned,apaise:S.stats.apaise};
  CLIENT_ORDER.forEach(k=>{ if(!S.clients[k]) S.clients[k]={aff:0,state:"new",carryOuv:0,carryTen:0,visits:0,shake:false}; S.clients[k].lastNight=0; });
  U={}; save();
  const lines=[
    ...(S.season===5?[
      {who:"narr",t:"Chapitre 3 · Les métamorphoses. Saison 5."},
      {who:"narr",t:"Au printemps, tout Bourg-Brume change. Les Chenipan du jardin public deviennent des Chrysacier, les Ptitard de la fontaine des Têtartes. Sur la place, on ne parle plus que de ça : qui a évolué, qui pas encore."},
      {who:{id:52,n:"Miaouss"},t:"<i>Il affiche une pancarte devant le Pourboire d'Or : « SUPER BONBONS · ÉVOLUEZ CE SOIR · PAIEMENT À LA SORTIE ».</i> Grandir, voisin, c'est rentable. Personne ne paie pour un Pokémon qui reste petit."},
      {who:"cog",t:"Patron… Il vend de l'évolution en bocal, maintenant. Et Kecleon a reçu de drôles de cailloux, des Pierres Stase. Il paraît que ça empêche de changer."},
      {who:"hector",t:"<i>La voix traverse le mur, songeuse.</i> Hé… Cette saison, ils viendront parce qu'ils n'ont pas changé comme on l'attendait d'eux. Ou parce qu'ils ont trop changé. Ne leur dis pas qui devenir, petit. Aide-les juste à se souvenir de qui ils sont."}
    ]:S.season===4?[
      {who:"narr",t:"Chapitre 2 · La saison des pluies. Saison 4."},
      {who:"narr",t:"Un matin, des ouvriers arrivent en face de la taverne avec des charrettes de dorures. En trois jours, la vieille grange devient un palais qui brille comme une pièce neuve."},
      {who:"narr",t:"<b>Le Pourboire d'Or</b> ouvre ses portes. Une enseigne géante, un tapis rouge, et des verres si forts qu'on oublie tout après le premier.",img:"pourboire"},
      {who:{id:52,n:"Miaouss"},t:"<i>Il traverse la rue, une pièce d'or entre les griffes, qu'il fait tourner sans arrêt.</i> Alors c'est toi, le petit nouveau qui écoute les clients pleurer ? Moi, je leur sers du fort, je leur prends leur argent, et ils oublient. Tout le monde y gagne. Bonne chance, voisin."},
      {who:"cog",t:"Patron… Il va nous voler nos clients. Même la nuit, j'ai l'impression que son enseigne brille à travers la Faille."},
      {who:"hector",t:"<i>La voix passe à travers le mur, très sèche.</i> Hm. Un Miaouss. J'en ai connu un, autrefois, qui comptait ses pièces pour ne pas compter autre chose. Ne te bats pas contre lui, petit. Fais juste ton travail. Mieux que lui."}
    ]:S.season===3?[
      {who:"narr",t:"Chapitre 2 · La saison des pluies. Saison 3."},
      {who:"narr",t:"La pluie ne s'arrête plus sur Bourg-Brume. Elle coule des toits, remplit les tonneaux, efface les chemins. Les villageois disent que c'est la saison où les âmes pleurent ce qu'elles ont perdu."}
    ]:[{who:"narr",t:`Saison ${S.season}. Les premières pluies d'automne tambourinent sur le toit de la taverne.`}]),
    {who:"cog",t:"Une nouvelle saison ! Ceux qu'on a aidés passeront sûrement de jour. Et les autres… ils reviendront, la nuit. On sera prêts."},
    ...((SEASON_NEW[S.season]||[]).length?[{who:"kecleon",t:`Nouvel arrivage à l'étal, patron ! ${(SEASON_NEW[S.season]).map(k=>ING[k].n).join(", ")}. Personne d'autre au village n'en a !`}]:[]),
    S.season===5 ? {who:"cog",t:"Une saison de changements. On sera là, quoi qu'ils deviennent."} : S.season===4 ? {who:"cog",t:"Et cette saison, ceux qui ont perdu quelqu'un continuent d'arriver. On reste à côté d'eux, comme dit Hector."} : S.season===3
      ? {who:"hector",t:"<i>La voix traverse le mur, plus basse que d'habitude.</i> Hé… Cette saison, ils ne viendront pas parce qu'ils ont échoué, ou parce qu'on les a laissés. Ils viendront parce qu'ils ont perdu quelqu'un. Ceux-là, petit, il ne faut pas les réparer. Il faut juste rester à côté."}
      : {who:"hector",t:"<i>Une voix rieuse traverse le mur.</i> Hé hé… Prépare un tabouret de plus, petit. Ce soir, quelqu'un de très fier va pousser la porte. Quelqu'un que personne n'a jamais attendu."}
  ];
  playDialog(lines, startDay, ()=>{ $app.innerHTML=`${hud()}${scene({doorOpen:false})}<div class="panel">${dialogBubble()}</div>`; });
}
function copyChron(){
  const ap = S.log.filter(l=>l.type==="apaise").map(l=>CL[l.k].n);
  const txt = `Chronique de la taverne — saison ${S.season||1}\n${S.ten.n}${S.shiny?" chromatique":""} (Tenancier) et ${cog().n} (co-gérant)\nÂmes apaisées : ${ap.join(", ")||"aucune"}\nVerres servis : ${S.stats.served} · parfaits : ${S.stats.perfect} · ${S.stats.earned} ₽\nTavern Keeper's Ledger`;
  try{ navigator.clipboard.writeText(txt).then(()=>toast("Chronique copiée !"),()=>toast("Copie impossible ici.")); }catch(e){ toast("Copie impossible ici."); }
}
