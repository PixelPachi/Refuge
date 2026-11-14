// ============================================================
// 14-ordi.js — Affichage ordinateur
// Sur un grand écran en paysage, le jeu garde sa mise en page de téléphone (une colonne),
// agrandie avec un zoom, et on ajoute deux panneaux sur les côtés + des raccourcis clavier.
// Sur téléphone ou tablette en portrait, rien ne change.
// ============================================================
const DESK_MQ = window.matchMedia("(min-width:1000px) and (min-aspect-ratio:5/4)");
function isDesk(){ return document.body.classList.contains("desk"); }
function deskZoom(){ return isDesk() ? (Number(getComputedStyle(document.body).getPropertyValue("--z"))||1) : 1; }

function deskSetup(){
  const on = DESK_MQ.matches;
  document.body.classList.toggle("desk", on);
  if(!on){ document.body.style.removeProperty("--z"); return; }
  // zoom : la colonne fait au plus 46 % de la largeur, et garde au moins ~700 px « logiques » de hauteur
  const z = Math.max(1, Math.min(innerHeight/700, innerWidth*0.46/480, 1.6));
  document.body.style.setProperty("--z", z.toFixed(3));
  let L=document.getElementById("deskL"), R=document.getElementById("deskR");
  if(!L){ L=document.createElement("aside"); L.id="deskL"; L.className="deskside"; document.body.appendChild(L); }
  if(!R){ R=document.createElement("aside"); R.id="deskR"; R.className="deskside"; document.body.appendChild(R); }
  deskRefresh();
}

function deskRefresh(){
  if(!isDesk()) return;
  const L=document.getElementById("deskL"), R=document.getElementById("deskR"); if(!L||!R) return;
  if(typeof S==="undefined" || !S || !S.ten){
    L.innerHTML=`<div class="dkcard"><div class="dkh">Le Refuge des Âmes Égarées</div><p>Une taverne Pokémon, la nuit, pour ceux qui ont un regret.</p></div>`;
    R.innerHTML=deskKeys(); return;
  }
  const se=S.season||1, chap = ["","Chapitre 1","Chapitre 2","Chapitre 2","Chapitre 3","Chapitre 3","Chapitre 4","Chapitre 4","Chapitre 5","Chapitre 5","Chapitre 6","Chapitre 6"][se-1]||"";
  const staff=(S.staff||[]).map(k=>`<div class="dkrow"><span class="dkspr">${sprite(CL[k].id,CL[k].n,CL[k].c)}</span><span><b>${CL[k].n}</b><small>${CL[k].staff.n}</small></span></div>`).join("") || `<p class="dkmuted">Personne pour l'instant.</p>`;
  const rel=(typeof relicKeys==="function"?CLIENT_ORDER.map(k=>CL[k].gift).filter(g=>g&&S.equip[g.key]):[]).map(g=>`<div class="dkrow"><span class="dkrel">${typeof relicIc==="function"?relicIc(g):g.i}</span><span><b>${g.n}</b><small>${g.d}</small></span></div>`).join("") || `<p class="dkmuted">Aucun artefact porté.</p>`;
  L.innerHTML=`<div class="dkcard"><div class="dkh">Saison ${se}${chap?` · ${chap}`:""}</div>
      <div class="dkstats"><span>🌙 Nuit ${S.night}/${NIGHTS_PER_SEASON}</span><span>💰 ${S.money} ₽</span><span>⭐ Niveau ${S.level||1}</span><span>🃏 ${S.deck?S.deck.length:0} cartes</span></div></div>
    <div class="dkcard"><div class="dkh">Le personnel · ${(S.staff||[]).length}/${STAFF_MAX}</div>${staff}</div>
    <div class="dkcard"><div class="dkh">Artefacts portés · ${typeof wornCount==="function"?wornCount():0}/${RELIC_MAX}</div>${rel}</div>`;
  const souls=CLIENT_ORDER.filter(k=>(CL[k].season||1)===se).map(k=>{ const st=S.clients[k]||{state:"new",aff:0};
    const known = st.state!=="new" || (st.visits||0)>0;
    return `<div class="dkrow ${known?"":"dkunknown"}"><span class="dkspr">${known?sprite(CL[k].id,CL[k].n,CL[k].c):"<span class='dkq'>?</span>"}</span><span><b>${known?CL[k].n:"Âme inconnue"}</b><small>${known?`${stateLabel(st.state)} · ${hearts(st.aff||0)}`:"pas encore venue"}</small></span></div>`; }).join("");
  R.innerHTML=`<div class="dkcard"><div class="dkh">Les âmes de la saison</div>${souls||`<p class="dkmuted">—</p>`}</div>`+deskKeys();
}

function deskKeys(){
  return `<div class="dkcard dkkeys"><div class="dkh">Raccourcis clavier</div>
    <p><kbd>Espace</kbd> ou <kbd>Entrée</kbd> continuer le dialogue</p>
    <p><kbd>1</kbd>…<kbd>9</kbd> jouer une carte · <kbd>F</kbd> fin du tour</p>
    <p><kbd>D</kbd> deck · <kbd>R</kbd> Registre · <kbd>Échap</kbd> fermer</p>
    <p class="dkmuted">Tout se joue aussi à la souris : clic, et glisser les cartes sur l'ombre.</p></div>`;
}

// Raccourcis clavier (utiles partout, mais pensés pour l'ordinateur)
document.addEventListener("keydown",(e)=>{
  if(e.ctrlKey||e.metaKey||e.altKey) return;
  const t=e.target; if(t && (t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable)) return;
  if(U && U.book && U.book.open) return; // le livre a ses propres touches (flèches, Échap)
  const k=e.key;
  if(k==="Escape"){ if(!$modal.classList.contains("hidden")){ closeModal(); e.preventDefault(); } return; }
  if(!$modal.classList.contains("hidden")) return;
  if(U && U.cineNext && (k===" "||k==="Enter")){ U.cineNext(); e.preventDefault(); return; }
  if((k===" "||k==="Enter") && U && U.dlg){ dlgNext(); e.preventDefault(); return; }
  const C=U&&U.dawn&&U.dawn.combat;
  if(C && !C.over && U.inDungeon){
    if(/^[1-9]$/.test(k)){ const i=Number(k)-1; if(i<C.hand.length){ const cd=cardOf(C.hand[i]);
        if(cd.unplayable||cd.c>C.energy){ toast(cd.unplayable?"Cette carte ne peut pas être jouée.":"Pas assez d'énergie."); }
        else if(needsTarget(cd)){ const f=document.querySelector("[data-foe]"); playCard(i, f?Number(f.dataset.foe):0); }
        else playCard(i); }
      e.preventDefault(); return; }
    if(k==="f"||k==="F"){ const b=document.querySelector('[data-act="endTurn"]:not([disabled])'); if(b){ b.click(); e.preventDefault(); } return; }
  }
  if(k==="d"||k==="D"){ const b=document.querySelector('[data-act="showRunDeck"],[data-act="showDeck"]'); if(b){ b.click(); e.preventDefault(); } return; }
  if(k==="r"||k==="R"){ const b=document.querySelector('[data-act="registre"]'); if(b){ b.click(); e.preventDefault(); } return; }
});

// Les panneaux suivent le jeu : on les rafraîchit quand l'écran change (au plus 3 fois par seconde)
let __deskT=0;
new MutationObserver(()=>{ if(!isDesk()||__deskT) return; __deskT=setTimeout(()=>{ __deskT=0; deskRefresh(); },300); })
  .observe(document.getElementById("app"),{childList:true,subtree:true});
window.addEventListener("resize",deskSetup);
if(DESK_MQ.addEventListener) DESK_MQ.addEventListener("change",deskSetup);
deskSetup();
