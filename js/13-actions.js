// ---------- Actions ----------
const ACT = {
  newGame:()=>{ closeModal(); clearSave(); startNew(); }, newGameAsk:()=>newGameAsk(),
  saveCodeOpen:()=>saveCodeModal(), saveCodeCopy:()=>saveCodeCopy(), loadCodeOpen:()=>loadCodeModal(), loadCodeGo:()=>loadCodeGo(),
  continue:()=>{ const sv=loadSave(); if(!sv) return; S=sv; CLIENT_ORDER.forEach(k=>{ if(!S.clients[k]) S.clients[k]={aff:0,state:"new",carryOuv:0,carryTen:0,visits:0,shake:false}; }); U={}; if(S.seasonOver) endSeason(); else startDay(); },
  toggleSound:()=>{ if(!S){ S=newState(); } S.settings.sound=!S.settings.sound; if(S.ten){ showMenu(); } else screenTitle(); },
  toggleMusic:()=>{ S.settings.music = !musicOn(); if(musicOn()){ ensureAC(); MUS.cur=null; music(MUS.want||"village"); } else musicStop(); showMenu(); },
  toggleAssist2:()=>{ S.settings.assist=!S.settings.assist; showMenu(); },
  toTitle:()=>{ closeModal(); U={}; screenTitle(); },
  dlgNext:()=>dlgNext(),
  answer:(ds)=>answer(Number(ds.i)),
  acceptTen:()=>acceptTen(),
  refuseTen:()=>renderTenPicker(),
  pickTen:(ds)=>{ U.pickAura=ds.a; U.pick=Number(ds.i); const y=document.querySelector(".pad.scroll").scrollTop; renderTenPicker(); document.querySelector(".pad.scroll").scrollTop=y; cry(TENANCIERS[ds.a][Number(ds.i)].id); },
  shiny:(ds)=>chooseShiny(ds.v),
  pickCog:(ds)=>pickCog(ds.k),
  buy:(ds)=>buy(ds.k),
  leaveMarket:()=>leaveMarket(),
  pickBib:(ds)=>pickBib(ds.k), nextSeason:()=>startNextSeason(),
  seasonMap:()=>openModal(seasonMapHTML()),
  omenInfo:(ds)=>{ const O=OMENS[omenFor(Number(ds.n))]; const el=document.getElementById('omeninfo'); if(el&&O) el.innerHTML=`Nuit ${ds.n} : ${O.i} <b>${O.n}</b>. ${O.d}`; },
  mTab:(ds)=>{ U.mTab=ds.t; renderMarket(); cry(KECLEON.id); },
  openBuilder:(ds)=>openBuilder(ds.ctx),
  bBase:(ds)=>bBase(ds.k), bEss:(ds)=>bEss(ds.k), bAdd:(ds)=>bAdd(ds.k), bGo:()=>bGo(),
  relancer:()=>relancer(), taire:()=>taire(), reformuler:()=>reformuler(), reform:(ds)=>doReform(Number(ds.i)),
  callLie:()=>callLie(), pifeuil:()=>pifeuilAct(),
  finChoice:(ds)=>finChoice(ds.v),
  dStart:()=>enterNode(dmap().start), 
  dungeonNext:()=>dungeonNext(),
  endTurn:()=>endTurn(), takeReward:(ds)=>takeReward(Number(ds.i)),
  cineSkip:()=>{ if(U.cineNext) U.cineNext(); },
  fire:(ds)=>{ const k=ds.k; S.staff=S.staff.filter(x=>x!==k); S.clients[k].state="apaise"; toast(`${CL[k].n} quitte son poste. Il passera de temps en temps, en habitué.`); renderRecap(); },
  postOpen:()=>postPicker(),
  invite:(ds)=>{ if(S.money<20||S.invite) return; S.money-=20; S.invite=ds.k; save(); closeModal(); toast(`Lettre confiée à Cadoizo pour ${CL[ds.k].n}.`); renderRecap(); },
  relicInfo:(ds)=>{ const D=U.dawn, g=allRelics().find(g=>g.key===ds.k); D.relicInfo = D.relicKey===ds.k&&D.relicInfo ? null : `${relicIc(g)} <b>${g.n}</b> : ${g.d}${ds.k==='collier'&&D.collierUsed?' <i>(déjà utilisé)</i>':''}`; D.relicKey=ds.k; renderDungeon(); },
  finaleGo:()=>finaleGo(), cogPick:(ds)=>cogPickToggle(Number(ds.i)), miaPick:(ds)=>miaPick(ds.c), finaleSkip:()=>{ S.finale=S.finale||{}; S.finale[S.season||1]="skip"; endSeason(); },
  goPath:(ds)=>enterNode(ds.t), restPick:(ds)=>restPick(ds.k), eventPick:(ds)=>eventPick(Number(ds.i)),
  leaveRoom:()=>{ U.dawn.restDone=false; advance(); }, dRunEnd:()=>dRunEnd(),
  showRunDeck:()=>openModal(`<h3>Le deck de ${CL[U.dawn.x.k].n}</h3>${(()=>{ const D=U.dawn; const cnt={}; const items=[]; D.run.forEach(e=>{ if(e.id==="_x") items.push(cardHTML("_x",{cd:e.cd,eff:true})); else cnt[e.id]=(cnt[e.id]||0)+1; }); return `<div class="dgrid">${Object.keys(cnt).map(id=>`<div class="dwrap">${cardHTML(id)}${cnt[id]>1?`<span class="dcnt">×${cnt[id]}</span>`:""}</div>`).join("")}${items.map(h=>`<div class="dwrap">${h}</div>`).join("")}</div>`; })()}<button style="width:100%;margin-top:10px" data-act="closeModal">Fermer</button>`),
  pickCard:(ds)=>pickCard(Number(ds.i)), showDeck:()=>showDeck(), deckTab:(ds)=>showDeck(ds.t), moveCard:(ds)=>moveCard(ds.k), buyCard:(ds)=>buyCard(ds.k), removeCardShop:()=>removeCardShop(), rmCard:(ds)=>rmCard(Number(ds.i)),
  hire:(ds)=>hire(ds.k),
  menu:()=>showMenu(), closeModal:()=>closeModal(),
  registre:(ds)=>{ U.book=null; showRegistre(ds.k||null); },
  
  bookNext:()=>turnBook(1), bookPrev:()=>turnBook(-1), bookGo:(ds)=>goBook(ds.p), bookDeck:()=>{ U.book.open=false; showDeck('deck'); },
  discuter:()=>discuter(), essuyer:()=>essuyer(),
  rHire:(ds)=>recapDecide(ds.k,"hire"), rLetGo:(ds)=>recapDecide(ds.k,"letgo"), recapDone:()=>endNightGo(),
  copyChron:()=>copyChron()
};
document.addEventListener("click",(e)=>{
  const el=e.target.closest("[data-act]");
  if(!el) return;
  const a=el.dataset.act;
  if(el.tagName==="INPUT") return; // géré par change
  if(ACT[a]){ e.preventDefault(); ACT[a](el.dataset, el); }
});
document.addEventListener("keydown",(e)=>{ if(U&&U.book&&U.book.open&&!$modal.classList.contains("hidden")){ if(e.key==="ArrowRight") turnBook(1); if(e.key==="ArrowLeft") turnBook(-1); if(e.key==="Escape") closeModal(); } });
document.addEventListener("change",(e)=>{
  const el=e.target.closest("[data-act]"); if(!el) return;
  const a=el.dataset.act;
  if(a==="bFlambe"){ U.b.flambe=el.checked; renderBuilder(); }
  if(a==="bRest"){ U.b.rest=el.checked; renderBuilder(); }
  if(a==="toggleAssist"){ S.settings.assist=el.checked; }
});
$modal.addEventListener("click",(e)=>{ if(e.target===$modal && !U.g) closeModal(); });
document.addEventListener("load",(e)=>{ const t=e.target; if(t && t.tagName==="IMG"){ const p=t.closest(".spr"); if(p){ p.classList.remove("noimg"); p.classList.add("ok"); SPR_OK.add(t.getAttribute("src")); } } },true);
document.addEventListener("error",(e)=>{ const t=e.target; if(!t || t.tagName!=="IMG") return;
  if(t.dataset.remote && !t.dataset.tried){ t.dataset.tried="1"; t.src=t.dataset.remote; return; }
  if(t.closest(".spr")) imgFail(t);
  else if(t.classList.contains("itm")){ const d=document.createElement("span"); d.className="dot"; d.style.background=t.dataset.c||"#888"; t.replaceWith(d); }
},true);

preloadArt(screenTitle);

// ajuste le texte des cartes illustrées pour qu'il tienne dans la zone
function fitCardText(root){ (root||document).querySelectorAll(".dcard.art .dtxt").forEach(t=>{ if(t.dataset.fit) return; const dd=t.querySelector(".dd"); if(!dd||!t.clientHeight) return; t.dataset.fit=1; let f=1, g=0; const dn=t.querySelector(".dn"), dn0=dn?parseFloat(getComputedStyle(dn).fontSize):0; let top=parseFloat(getComputedStyle(t).top)/t.parentNode.clientHeight*100; while(t.scrollHeight>t.clientHeight+1 && g++<16){ if(top>40){ top-=2; t.style.setProperty("top",top+"%","important"); } else if(f>0.6){ f-=0.06; dd.style.fontSize=f+"em"; if(dn) dn.style.fontSize=(dn0*Math.max(.8,f+.15))+"px"; } else break; } }); }
new MutationObserver(()=>{ cancelAnimationFrame(fitCardText._r); fitCardText._r=requestAnimationFrame(()=>fitCardText()); }).observe(document.documentElement,{childList:true,subtree:true});
