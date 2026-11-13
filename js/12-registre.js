// ---------- Ledger & menu ----------
// ---------- Le Grand Registre : un livre dont on tourne les pages ----------
function bookPages(){
  ensureDeck(); const P=[];
  const add=(id,sec,title,html)=>P.push({id,sec,title,html});
  const known=CLIENT_ORDER.filter(k=>reg(k).met).length;
  // couverture
  add("cover","cover","",`<div class="bcover"><div class="bcov-t">Grand Registre</div><div class="bcov-s">de la taverne de Bourg-Brume</div>
    <div class="bcov-spr">${sprite(S.ten.id,S.ten.n,S.ten.c,{anim:true})}</div>
    <div class="bcov-p">${S.pages} page${S.pages>1?"s":""} écrite${S.pages>1?"s":""} · Saison ${S.season||1}</div>
    <div class="bcov-hint">Glisse ou touche ▶ pour ouvrir</div></div>`);
  const sections=[["tenancier","Le Tenancier"],["habitues","Les âmes"],["villageois","Les villageois"],["souvenirs","Souvenirs"],["artefacts","Artefacts et recettes"],["deck","Le deck"],["saison","La saison"],["emotions","Les émotions"]];
  add("toc","toc","Sommaire",`<div class="btoc">${sections.map(([id,t])=>`<a data-act="bookGo" data-p="${id}"><span>${t}</span><i></i></a>`).join("")}</div>
    <p class="bnote">Chaque âme a sa page. Celles qu'on n'a pas encore rencontrées restent blanches.</p>`);
  // tenancier
  const st = Object.keys(S.stock).filter(k=>S.stock[k]>0).map(k=>k.startsWith("gel_")?`${ESS[k.slice(4)].n} ×${S.stock[k]}`:`${ING[k].n} ×${S.stock[k]}`).join(", ")||"vide";
  add("tenancier","tenancier","Le Tenancier",`<div class="brow"><div class="bspr">${sprite(S.ten.id,S.ten.n,S.ten.c,{anim:true})}</div><div><div class="bname">${S.ten.n}${S.shiny?" ✦":""}</div>
      <div class="bsub">${TALENTS[S.ten.t]?TALENTS[S.ten.t].n:""} · niveau ${S.level} (${S.xp}/${S.level*100} XP)</div></div></div>
    <div class="bh">Co-gérant</div><p>${cog().n} : ${cog().p}${S.duo?" · Duo":""}</p>
    <div class="bh">Caisse et stock</div><p>${S.money} ₽ · ${st}</p>
    <div class="bh">Le personnel</div><p>${S.staff.length?S.staff.map(k=>`<b>${CL[k].n}</b> (${CL[k].staff.n} : ${CL[k].staff.d}) · ${wageOf(k)} ₽/jour`).join("<br>"):"Personne, à part le co-gérant."}</p>
    <div class="bh">Les comptes</div><p>Verres servis : ${S.stats.served} · parfaits : ${S.stats.perfect} · gagnés : ${S.stats.earned} ₽<br>Âmes apaisées : ${CLIENT_ORDER.filter(k=>["apaise","staff"].includes(S.clients[k].state)).length}/${CLIENT_ORDER.length}</p>`);
  // âmes : une page chacune
  add("habitues","habitues","Les âmes",`<p class="bnote">${known} / ${CLIENT_ORDER.length} âmes rencontrées</p><div class="bgrid">${CLIENT_ORDER.map((k,i)=>{ const r=reg(k), d=CL[k];
      return `<a class="bslot ${r.met?"":"unk"}" data-act="bookGo" data-p="c-${k}"><div class="bslot-s">${r.met?sprite(d.id,d.n,d.c,{anim:false}):"?"}</div><small>N°${String(i+1).padStart(3,"0")} ${r.met?d.n:"???"}</small></a>`; }).join("")}</div>`);
  CLIENT_ORDER.forEach((k,i)=>{ const r=reg(k), d=CL[k];
    if(!r.met){ add("c-"+k,"habitues",`N°${String(i+1).padStart(3,"0")} · ???`,`<div class="bblank"><div class="bblank-q">?</div><p>Cette page attend encore son âme.</p></div>`); return; }
    add("c-"+k,"habitues",`N°${String(i+1).padStart(3,"0")} · ${d.n}`,regEntry(k)); });
  // villageois
  S.villLeg=S.villLeg||{};
  add("villageois","villageois","Les villageois",VILLAGERS.map(v=>`<div class="brow" style="margin-bottom:8px"><div class="bspr sm">${sprite(v.id,v.n,v.c,{anim:false})}</div><div><b>${v.n}</b>${S.villLeg[v.key]?` <span class="bleg">★ légendaire offerte</span>`:""}<br><small>Boisson fétiche : ${favKnown(v.key)?`${drinkIcon(FAV[v.key],"sm")}${FAV[v.key].n} (${orderShort(FAV[v.key])})`:"pas encore découverte"}</small></div></div>`).join("")+`<p class="bnote">Bien servis, les villageois offrent une carte. Très rarement, leur carte légendaire.</p>`);
  // souvenirs
  const byOwner={}; S.fragments.forEach(f=>{ const o=CL[f.from]?CL[f.from].n:"Étincelles du co-gérant"; (byOwner[o]=byOwner[o]||[]).push(f); });
  add("souvenirs","souvenirs","Fragments de Mémoire",Object.keys(byOwner).length?Object.keys(byOwner).map(o=>`<div class="bh">${o}</div><div>${byOwner[o].map(f=>`<span class="frag" style="background:${EMO[f.e].c}">${EMO[f.e].i} ${esc(f.n)}</span>`).join("")}</div>`).join(""):`<p class="bnote">Aucun souvenir pour l'instant. Les âmes les confient quand elles ont confiance.</p>`);
  // artefacts, recettes, bibelots
  relicInit();
  const rel = CLIENT_ORDER.map(c=>CL[c].gift).filter(g=>g && S.owned[g.key]);
  const rec = S.recipes.map(r=>{ const d=CLIENT_ORDER.map(c=>CL[c].recipe).find(x=>x&&x.key===r); return d?`<p>${r==="shake"?drinkIcon({base:"lait",add:["sitrus"]},"sm"):"• "}<b>${d.n}</b> : ${d.d}</p>`:""; }).join("");
  add("artefacts","artefacts","Artefacts et recettes",`<div class="bh">Artefacts du Labyrinthe · ${wornCount()}/${RELIC_MAX} portés</div>${rel.length?`<p class="bnote">Tu peux en posséder autant que tu veux, mais tu n'en portes que ${RELIC_MAX} à la fois. Choisis ceux qui accompagnent les clients dans leur Labyrinthe.</p>`+rel.map(g=>`<p class="relrow ${S.equip[g.key]?"on":""}"><span class="brel">${relicIc(g)}</span> <b>${g.n}</b> : ${g.d}<br><button class="sm ${S.equip[g.key]?"alt":""}" data-act="relicWear" data-k="${g.key}" ${!S.equip[g.key]&&wornCount()>=RELIC_MAX?"disabled":""}>${S.equip[g.key]?"Ranger":"Porter"}</button></p>`).join(""):`<p class="bnote">Aucun. Une âme offre le sien quand son affinité atteint 3 cœurs.</p>`}${S.equip.faille?`<p><span class="brel">🔮</span> <b>Éclat de la Faille</b> : +6 PV dans chaque Labyrinthe (toujours actif)</p>`:""}
    <div class="bh">Recettes offertes</div>${rec||`<p class="bnote">Aucune recette pour l'instant.</p>`}
    <div class="bh">Bibelots de la saison</div>${(S.bibelots||[]).length?S.bibelots.map(k=>`<p>${BIBELOTS[k].i} <b>${BIBELOTS[k].n}</b> : ${BIBELOTS[k].d}</p>`).join(""):`<p class="bnote">Aucun. Ils remontent du Labyrinthe.</p>`}`);
  // deck
  const cnt={}; S.deck.forEach(id=>cnt[id]=(cnt[id]||0)+1);
  const legs=S.deck.filter(id=>CARDS[id]&&CARDS[id].r==="legende");
  add("deck","deck","Le deck",`<p>${S.deck.length} cartes dans le deck · ${(S.reserve||[]).length} en réserve</p>
    ${legs.length?`<div class="bh">Cartes légendaires</div><p>${[...new Set(legs)].map(id=>`<span class="bleg">★ ${CARDS[id].n}</span>${CARDS[id].from?` <small>(${(CL[CARDS[id].from]||VILLAGERS.find(v=>v.key===CARDS[id].from)||{n:""}).n})</small>`:""}`).join("<br>")}</p>`:""}
    <div class="bh">Toutes les cartes</div><p class="bcards">${Object.keys(cnt).map(id=>`${CARDS[id].i||"✦"} ${CARDS[id].n}${cnt[id]>1?` ×${cnt[id]}`:""}`).join(" · ")}</p>
    <button class="sm" data-act="bookDeck" style="margin-top:6px">Ouvrir le deck</button>`);
  // saison
  const se=S.season||1; let om="";
  for(let n=Math.max(2,S.night);n<=NIGHTS_PER_SEASON;n++){ const o=omenFor(n); if(o) om+=`<p>Nuit ${n} : ${OMENS[o].i} <b>${OMENS[o].n}</b></p>`; }
  add("saison","saison",`La saison ${se}`,`<p>Nuit ${Math.min(S.night,NIGHTS_PER_SEASON)} sur ${NIGHTS_PER_SEASON} · ${S.pages} page${S.pages>1?"s":""} au Grand Registre</p>
    <div class="bh">Présages à venir</div>${om||`<p class="bnote">Plus aucun présage cette saison.</p>`}
    ${commandsHTML().replace('class="px" style="color:var(--candle);margin-top:12px"','class="bh"')}
    ${(S.chronicles||[]).length?`<div class="bh">Saisons passées</div>${S.chronicles.map(c=>`<p>Saison ${c.season} : ${c.apaise.length} âme${c.apaise.length>1?"s":""} apaisée${c.apaise.length>1?"s":""}${S.finale&&S.finale[c.season]==="win"?" · Faille apaisée":""}</p>`).join("")}`:""}`);
  add("emotions","emotions","Les émotions",`<p>Dans le Labyrinthe, un souvenir est <b>doublé</b> contre un Écho que son émotion dissout, et <b>divisé par deux</b> contre un Écho de la même émotion.</p>
    ${Object.keys(EMO).map(e=>`<p><span class="frag" style="background:${EMO[e].c}">${EMO[e].i} ${EMO[e].n}</span> ${COUNTERS[e]&&COUNTERS[e].length?`dissout ${COUNTERS[e].map(x=>EMO[x].n).join(" et ")}`:""}</p>`).join("")}`);
  return P;
}
function showRegistre(focus, tab){
  const P=bookPages();
  let i = 0;
  if(focus) i = Math.max(0, P.findIndex(p=>p.id==="c-"+focus));
  else if(tab==="comptoir") i = P.findIndex(p=>p.id==="tenancier");
  else if(U.book && U.book.open) i = Math.min(U.book.i, P.length-1);
  U.book={P, i, open:true};
  $modal.innerHTML=`<div class="bookwrap fade"><div class="book" id="book"></div></div>`; $modal.classList.remove("hidden");
  renderBookPage(null);
  const bk=document.getElementById("book"); let x0=null;
  bk.addEventListener("touchstart",e=>{ x0=e.touches[0].clientX; },{passive:true});
  bk.addEventListener("touchend",e=>{ if(x0==null) return; const dx=e.changedTouches[0].clientX-x0; x0=null; if(Math.abs(dx)>45) turnBook(dx<0?1:-1); });
}
function pageHTML(p, idx, total){
  const secs=[["toc","📖"],["tenancier","🎩"],["habitues","👥"],["villageois","🏘️"],["souvenirs","💠"],["artefacts","🔮"],["deck","🃏"],["saison","🌙"]];
  if(p.sec==="cover") return `<div class="bpage cover">${p.html}</div>`;
  return `<div class="bpage"><div class="bribbons">${secs.map(([s,ic])=>`<a class="brib ${p.sec===s?"on":""}" data-act="bookGo" data-p="${s}" title="${s}">${ic}</a>`).join("")}</div>
    <div class="btitle">${p.title}</div><div class="bbody">${p.html}</div><div class="bfoot">— ${idx} —</div></div>`;
}
function renderBookPage(dir){
  const B=U.book, bk=document.getElementById("book"); if(!bk) return;
  const cur = pageHTML(B.P[B.i], B.i, B.P.length);
  const nav = `<div class="bnav"><button class="bbtn" data-act="bookPrev" ${B.i===0?"disabled":""}>◀</button><span>${B.i===0?"Couverture":`Page ${B.i} / ${B.P.length-1}`}</span><button class="bbtn" data-act="bookNext" ${B.i>=B.P.length-1?"disabled":""}>▶</button><button class="bbtn close" data-act="closeModal">✕</button></div>`;
  if(!dir){ bk.innerHTML = `<div class="bstage">${cur}</div>${nav}`; return; }
  const stage = bk.querySelector(".bstage"), old = stage.innerHTML;
  if(dir>0){ stage.innerHTML = `${cur}<div class="bflip next">${old}</div>`; }
  else { stage.innerHTML = `${old}<div class="bflip prev">${cur}</div>`; }
  bk.querySelector(".bnav").outerHTML = nav;
  sfxPage();
  const f = stage.querySelector(".bflip");
  f.addEventListener("animationend",()=>{ stage.innerHTML = cur; },{once:true});
}
function turnBook(d){ const B=U.book; if(!B) return; const j=B.i+d; if(j<0||j>=B.P.length) return; B.i=j; renderBookPage(d); }
function goBook(id){ const B=U.book; if(!B) return; const j=B.P.findIndex(p=>p.id===id); if(j<0||j===B.i) return; const d=j>B.i?1:-1; B.i=j; renderBookPage(d); }
function sfxPage(){ try{ if(!S.settings.sound) return; ensureAC(); const ac=AC, n=ac.sampleRate*0.18, buf=ac.createBuffer(1,n,ac.sampleRate), ch=buf.getChannelData(0); for(let i=0;i<n;i++){ const t=i/n; ch[i]=(Math.random()*2-1)*Math.pow(1-t,2)*0.35*(t<0.1?t*10:1); }
  const src=ac.createBufferSource(); src.buffer=buf; const f=ac.createBiquadFilter(); f.type="bandpass"; f.frequency.value=2200; f.Q.value=0.7; src.connect(f); f.connect(ac.destination); src.start(); }catch(e){} }
function regGoals(k){
  const r=reg(k), d=CL[k], st=S.clients[k];
  const cur = U.cur && U.cur.k===k && !U.cur.done ? U.cur : null;
  const conf = Math.min(CONF_NEEDED, cur ? cur.stage : (st.stage||0));
  const ouv = cur ? cur.ouv : 0;
  const done = st.state==="apaise"||st.state==="staff";
  const li = (ok, t) => `<div class="goal ${ok?"ok":""}">${ok?"✓":"•"} ${t}</div>`;
  let h = `<div class="sect">Objectifs pour ouvrir son Labyrinthe</div><div class="card goals">`;
  if(done){ h += li(true,"Son Labyrinthe est terminé : il a fait la paix avec son regret."); return h+`</div>`; }
  h += li(conf>=CONF_NEEDED, `Obtenir ${CONF_NEEDED} confidences en le relançant quand il est assez ouvert, une seule par nuit (${conf}/${CONF_NEEDED})`);
  h += li(ouv>=5, `Faire monter son Ouverture à 5${cur?` (cette nuit : ${ouv}/5)`:""}`);
  h += li(!!r.wound, r.wound ? `Le verre qui l'aide : une seule ${ESS[r.wound].n}` : "Trouver la gelée qui l'aide face à sa blessure (observe-le, écoute le co-gérant)");
  h += li(r.likes.length>0, r.likes.length ? `Ajouter ce qu'il aime : ${r.likes.map(x=>ING[x].n).join(", ")}` : "Découvrir ce qu'il aime (discuter, le servir)");
  if(r.dislikes.length) h += li(true, `Éviter : ${r.dislikes.map(x=>ING[x].n).join(", ")}`);
  // Labyrinthe : révélé au fil de l'histoire
  const kw=(S.keywords[k]||[]).length, totalKw=d.stages.filter(x=>x.kw).length;
  h += li(kw>=totalKw, `Apprendre les mots-clés de son histoire (${kw}/${totalKw}) : ils ouvrent des choix dans son Labyrinthe`);
  if(r.frags.length || (st.stage||0)>=CONF_NEEDED){
    const key=Object.values(CL[k].map.nodes).find(n=>n.t==="coeur").key;
    h += li(S.fragments.some(f=>f.e===key&&ownFrag(f,k)), `Son Cœur du Regret s'apaise avec un souvenir de ${EMO[key].n}`);
  } else h += li(false, "Ce qui apaisera son Cœur du Regret : à découvrir en gagnant sa confiance");
  return h+`</div>`;
}
function regEntry(k){
  const r=reg(k), d=CL[k], st=S.clients[k];
  const ingList = a => a.length ? a.map(x=>`<span class="kw">${itemIcon(x)} ${ING[x].n}</span>`).join("") : `<span class="small muted">Pas encore découvert.</span>`;
  const kw=(S.keywords[k]||[]);
  const total=d.comfort.length;
  return `<div class="row" style="margin:4px 0 8px"><div style="width:84px;height:84px">${sprite(d.id,d.n,d.c,{anim:true})}</div>
      <div class="grow"><div class="px" style="font-size:18px">${d.n}</div><div class="small muted">${d.family} · ${hearts(st.aff)} · ${stateLabel(st.state)}</div></div></div>
    ${regGoals(k)}
    <div class="sect">Ingrédients appréciés (${r.likes.length}/${total})</div><div>${ingList(r.likes)}</div>
    <div class="sect" style="margin-top:8px">À éviter</div><div>${ingList(r.dislikes)}</div>
    <div class="sect" style="margin-top:8px">La gelée qui l'aide</div><div class="small">${r.wound?`<span class="gel" style="--g:${ESS[r.wound].c};vertical-align:middle"></span> ${ESS[r.wound].n}, une seule : en face de sa blessure, juste ce qu'il faut.`:`<span class="muted">Pas encore découverte.</span>`}</div>
    <div class="sect" style="margin-top:8px">Mots-clés de son histoire (${kw.length}/${d.stages.filter(x=>x.kw).length})</div><div>${kw.length?kw.map(w=>`<span class="kw">${esc(w)}</span>`).join(""):`<span class="small muted">Aucun pour l'instant.</span>`}</div>
    <div class="sect" style="margin-top:8px">Ce qu'il t'a confié</div><div class="small">${r.lines.length?r.lines.map(l=>`« ${l.replace(/<i>.*?<\/i>\s*/g,"")} »`).join("<br>"):`<span class="muted">Rien encore.</span>`}</div>
    <div class="sect" style="margin-top:8px">Ce que tu as remarqué</div><div class="small">${r.hints.length?r.hints.join("<br>"):`<span class="muted">Rien encore. Essaie de te taire et de l'observer.</span>`}</div>
    ${r.frags.length?`<div class="sect" style="margin-top:8px">Ses souvenirs</div><div class="small">${r.frags.join(", ")}</div>`:""}`;
}
function stateLabel(s){ return {new:"nouveau client",partial:"reviendra",rechute:"reviendra, fermé",apaise:"apaisé",staff:"personnel"}[s]||s; }
function showMenu(){
  openModal(`<h3>Menu</h3>
    <div class="answers">
      <button data-act="toggleMusic">Musique : ${musicOn()?"activée":"coupée"}</button>
      <button data-act="toggleSound">Cris et bruitages : ${S.settings.sound?"activés":"coupés"}</button>
      <button data-act="toggleAssist2">Mode assisté : ${S.settings.assist?"activé":"désactivé"}</button>
      <button class="alt" data-act="saveCodeOpen">Copier ma sauvegarde</button>
      <button class="alt" data-act="toTitle">Retour au titre</button>
      <button class="ghost" data-act="closeModal">Fermer</button>
    </div>
    <p class="small muted">La partie est sauvegardée au début de chaque journée, sur cet appareil. Pour la garder ailleurs ou la continuer sur un autre appareil, copie ta sauvegarde.</p>`);
}
function saveCodeModal(){
  const code=saveToCode();
  openModal(`<h3>💾 Ma sauvegarde</h3><p class="small muted">Garde ce code (dans tes notes, par message…). Sur un autre appareil : écran titre → « Charger une sauvegarde », puis colle-le.</p>
    <textarea class="savecode" readonly onclick="this.select()">${code}</textarea>
    <div class="answers"><button data-act="saveCodeCopy">Copier le code</button><button class="alt" data-act="closeModal">Fermer</button></div>`);
}
function saveCodeCopy(){
  const t=document.querySelector(".savecode"); if(!t) return;
  t.select(); try{ navigator.clipboard.writeText(t.value).then(()=>toast("Code copié !"),()=>{ document.execCommand("copy"); toast("Code copié !"); }); }catch(e){ try{ document.execCommand("copy"); toast("Code copié !"); }catch(e2){ toast("Sélectionne le code et copie-le à la main."); } }
}
function loadCodeModal(err){
  openModal(`<h3>📥 Charger une sauvegarde</h3><p class="small muted">Colle ici le code copié depuis le menu du jeu. Il remplacera la partie de cet appareil.</p>
    <textarea class="savecode" id="loadcode" placeholder="REFUGE1:…"></textarea>${err?`<p class="small" style="color:var(--bad)">${err}</p>`:""}
    <div class="answers"><button data-act="loadCodeGo">Charger</button><button class="alt" data-act="closeModal">Annuler</button></div>`);
}
function loadCodeGo(){
  const el=document.getElementById("loadcode"), o=codeToSave(el&&el.value);
  if(!o){ loadCodeModal("Ce code ne ressemble pas à une sauvegarde du Refuge. Vérifie qu'il est complet."); return; }
  S=o; save(); closeModal(); toast("Sauvegarde chargée !"); screenTitle();
}
function newGameAsk(){
  openModal(`<h3>Nouvelle partie ?</h3><p class="small">Une partie est déjà en cours sur cet appareil. En commencer une nouvelle l'<b>effacera</b>.</p><p class="small muted">Astuce : copie d'abord ta sauvegarde depuis le menu du jeu si tu veux la garder.</p>
    <div class="answers"><button data-act="newGame">Effacer et recommencer</button><button class="alt" data-act="closeModal">Annuler</button></div>`);
}
