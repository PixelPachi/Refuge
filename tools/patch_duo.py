"""Grand Écho en duo : le Tenancier et son acolyte descendent ensemble (patch appliqué une fois)."""
import re
R='/home/claude/refuge/'
def edit(p,a,b):
    s=open(R+p).read(); assert a in s,(p,a[:70]); s=s.replace(a,b,1); open(R+p,'w').write(s)

P='js/11-saison.js'; s=open(R+P).read()
s=s.replace("""Le Grand Regret du chapitre, petit. Envoie quelqu'un qui a appris à s'aimer tel qu'il est. Lui seul saura lui répondre."}""",
            """Le Grand Regret du chapitre, petit. Cette fois, personne ne descendra à ta place : vas-y toi-même, avec ton acolyte. Tu as appris à aimer chacun tel qu'il est. C'est ça qu'il a besoin d'entendre."}""")
s=s.replace("""C'est un Grand Regret, petit. Un légendaire qui a perdu sa raison d'être. Envoie quelqu'un qui sait ce que c'est, de perdre. Quelqu'un qui s'en est relevé."}""",
            """C'est un Grand Regret, petit. Un légendaire qui a perdu sa raison d'être. Descends toi-même, avec ton acolyte. Toi, tu sais rester à côté de ceux qui ont perdu."}""")
s=s.replace("""Hé… hé. Ne laisse personne descendre seul, cette fois. Envoie quelqu'un qui a déjà trouvé la paix. Lui, il connaît le chemin."}""",
            """Hé… hé. Cette fois, c'est à toi de descendre, Tenancier. Pas seul : prends ton acolyte. Et confie-lui quelques-unes de tes cartes, il en aura besoin."}""")
s=s.replace("""{who:"cog",t:"C'était… Hector ? Il avait l'air moins drôle que d'habitude."}""",
            """{who:"cog",t:"C'était… Hector ? Il avait l'air moins drôle que d'habitude. …Bon. On y va ensemble, patron. Je te couvre."}""")
assert s.count("ton acolyte")>=3, s.count("ton acolyte")
s=s.replace("if(S.finale[se] || !finaleChamps().length){ endSeason(); return; }","if(S.finale[se]){ endSeason(); return; }")
a=s.index('function renderFinaleChoice(){'); b=s.index('function finaleEnd(win){')
NEW=r'''// ---------- Le Grand Écho en duo : le Tenancier et son acolyte descendent ensemble ----------
// Avant la descente, le Tenancier confie COG_CARDS cartes de son deck à l'acolyte (elles quittent son deck pour l'Écho).
// En combat, l'acolyte joue une de ses cartes par tour, sans énergie ; il récupère toutes ses cartes à chaque nouveau combat.
const COG_CARDS = 5;
function cogPickable(id){ const c=CARDS[id]; return !!c && !c.unplayable && !c.x; }
function cogNeed(){ ensureDeck(); return Math.max(0, Math.min(COG_CARDS, S.deck.filter(cogPickable).length, S.deck.length - DECK_MIN)); }
function renderFinaleChoice(){
  ensureDeck(); U.cogPick = U.cogPick || [];
  const need=cogNeed(), K=cog(), n=U.cogPick.length;
  $app.innerHTML=`${hud()}<div class="pad scroll" style="flex:1;display:flex;flex-direction:column;gap:10px">
    <h2 class="px" style="color:#c9a8ff;margin:2px 0">🌀 Le Grand Écho</h2>
    <div class="row" style="align-items:center;gap:8px"><span style="width:52px;height:52px;display:inline-block;flex:none">${sprite(S.ten.id,S.ten.n,S.ten.c,{anim:true})}</span><span style="width:44px;height:44px;display:inline-block;flex:none">${sprite(K.id,K.n,K.c,{anim:true})}</span>
      <p class="small grow" style="margin:0">Cette fois, <b>tu descends toi-même</b>, avec <b>${K.n}</b>. Tu te bats avec ton deck et <b>tous les souvenirs de la saison</b>. Si vous tombez, rien n'est perdu : vous remontez, et la saison se termine quand même.</p></div>
    <div class="card"><div class="px" style="color:var(--candle)">Confier ${need} carte${need>1?"s":""} à ${K.n} (${n}/${need})</div>
      <div class="small muted">Elles quittent ton deck pour l'Écho. À chaque tour, ${K.n} peut en jouer <b>une</b>, sans énergie, et récupère toutes ses cartes au début de chaque combat.</div>
      <div class="dgrid cogpick">${S.deck.map((id,i)=>cogPickable(id)?`<div class="cogsel ${U.cogPick.includes(i)?"on":""}">${cardHTML(id,{act:"cogPick",i})}</div>`:"").join("")}</div></div>
    <button data-act="finaleGo" ${n<need?"disabled":""}>${n<need?`Choisis encore ${need-n} carte${need-n>1?"s":""}`:`Descendre avec ${K.n}`}</button>
    <button class="alt" data-act="finaleSkip">Laisser la Faille se refermer seule</button></div>`;
}
function cogPickToggle(i){
  U.cogPick=U.cogPick||[]; const j=U.cogPick.indexOf(i);
  if(j>=0) U.cogPick.splice(j,1); else if(U.cogPick.length<cogNeed()) U.cogPick.push(i); else { toast(`${cog().n} a déjà ses ${cogNeed()} cartes.`); return; }
  const p0=document.querySelector(".pad.scroll"), y=p0?p0.scrollTop:0; renderFinaleChoice(); const p=document.querySelector(".pad.scroll"); if(p) p.scrollTop=y;
}
function finaleGo(){
  ensureDeck(); const ids=(U.cogPick||[]).map(i=>S.deck[i]).filter(Boolean); U.cogPick=null;
  // le duo est un « client » temporaire, le temps de l'Écho (retiré par finaleEnd)
  CL._duo = {id:S.ten.id, n:S.ten.n, c:S.ten.c||"#f0c060", family:"", reform:{}, frags:[], comfort:[], dislike:[], map:null};
  S.clients._duo = {aff:0,state:"new",carryOuv:0,carryTen:0,visits:0,shake:false};
  U.night = U.night || {out:{},recruits:[]};
  U.dawn = {list:[{k:"_duo",ten:0,euph:false,hang:0,finale:true,duo:true,cogCards:ids}], i:0};
  setupDungeon();
}
// Jouer une carte de l'acolyte : une par tour, sans énergie
function cogPlay(j){
  const D=U.dawn, C=D&&D.combat; if(!C||C.over||!D.x.duo) return;
  if(C.cogUsed){ toast(`${cog().n} a déjà joué ce tour-ci.`); return; }
  if((C.cogSpent||[]).includes(j)){ toast("Carte déjà utilisée dans ce combat."); return; }
  const id=D.x.cogCards[j]; if(!id) return; const cd=CARDS[id];
  C.cogUsed=true; C.cogSpent=(C.cogSpent||[]).concat([j]);
  const e={id}; C.hand.push(e); C.energy+=cd.c||0;
  playCard(C.hand.length-1, 0);
  // la carte reste à l'acolyte : on la retire de la défausse du Tenancier
  [C.disc, C.exh].forEach(p=>{ const k=p.indexOf(e); if(k>=0) p.splice(k,1); });
  if(C.log && !C.log.startsWith("🐾")) C.log=`🐾 ${cog().n} : `+C.log;
  if(U.dawn && U.dawn.phase==="combat" && U.dawn.combat===C && !C.over) renderDungeon();
}
function cogRowHTML(){
  const D=U.dawn, C=D.combat; if(!D.x.duo || !(D.x.cogCards||[]).length) return "";
  const K=cog(), spent=C.cogSpent||[];
  return `<div class="cogrow"><div class="small cogtitle"><span class="cogav">${sprite(K.id,K.n,K.c,{anim:true})}</span><b>${K.n}</b>&nbsp;· ${C.cogUsed?"a joué ce tour-ci":"peut jouer 1 carte ce tour-ci, sans énergie"}</div>
    <div class="dhand cog">${D.x.cogCards.map((id,j)=>cardHTML(id,{act:"cogPlay",i:j,dis:C.cogUsed||spent.includes(j)})).join("")}</div></div>`;
}
'''
s=s[:a]+NEW+s[b:]
s=s.replace('function finaleEnd(win){\n  const se=S.season||1; S.finale=S.finale||{}; S.finale[se]=win?"win":"lose"; U.inDungeon=false;',
            'function finaleEnd(win){\n  const se=S.season||1; S.finale=S.finale||{}; S.finale[se]=win?"win":"lose"; U.inDungeon=false;\n  delete CL._duo; if(S.clients) delete S.clients._duo;',1)
assert 'delete CL._duo' in s
open(R+P,'w').write(s)

edit('js/13-actions.js','finaleGo:(ds)=>finaleGo(ds.k),','finaleGo:()=>finaleGo(), cogPick:(ds)=>cogPickToggle(Number(ds.i)), cogPlay:(ds)=>cogPlay(Number(ds.i)),')
edit('js/10-combat.js','  const st=S.clients[x.k], out=[];','  const st=S.clients[x.k], out=[];\n  if(x.duo){ out.push({t:`Le Tenancier et ${cog().n}, ensemble`, hp:20}); return out; }')
edit('js/10-combat.js','    run:S.deck.map(id=>({id})).concat(runCards(x).map(cd=>({id:"_x",cd}))),','    run:deckForRun(x).map(id=>({id})).concat(runCards(x).map(cd=>({id:"_x",cd}))),')
edit('js/10-combat.js','function setupDungeon(){','''// Deck du Labyrinthe : celui du Tenancier, moins les cartes confiées à l'acolyte pour le Grand Écho
function deckForRun(x){ const d=S.deck.slice(); (x.cogCards||[]).forEach(id=>{ const i=d.indexOf(id); if(i>=0) d.splice(i,1); }); return d; }
function setupDungeon(){''')
edit('js/10-combat.js','  if(!S.dungeonDeckTuto){','''  if(x.duo){ playDialog([{who:"narr",t:`Le Tenancier et ${cog().n} descendent les marches côte à côte. En bas, la lumière a toutes les couleurs des âmes de la saison.`},{who:"cog",t:`J'ai mes ${x.cogCards.length} cartes, patron. Une par tour : je te couvre !`}], ()=>renderDungeon(), ()=>renderDungeon()); return; }
  if(!S.dungeonDeckTuto){''')
edit('js/10-combat.js','  C.energy = 3 + (C.turn===1 && S.equip.bonnet ? 1 : 0); C.emax = C.energy; C.playedTurn=0;','  C.energy = 3 + (C.turn===1 && S.equip.bonnet ? 1 : 0); C.emax = C.energy; C.playedTurn=0;\n  C.cogUsed=false; if(C.turn===1) C.cogSpent=[];')
edit('js/10-combat.js','<div class="mespr">${sprite(d.id,d.n,d.c,{anim:true})}</div>','<div class="mespr">${sprite(d.id,d.n,d.c,{anim:true})}${x.duo?`<div class="cogspr">${sprite(cog().id,cog().n,cog().c,{anim:true})}</div>`:""}</div>')
s=open(R+'js/10-combat.js').read()
i=s.index('<div class="dhand fight ${C.hand.length>6?"rows3":""}">'); j=s.index('\n',i)
s=s[:j]+'\n      ${cogRowHTML()}'+s[j:]
open(R+'js/10-combat.js','w').write(s)
c=open(R+'css/style.css').read()
c+='''
/* Grand Écho en duo : l'acolyte et ses cartes */
.mespr{position:relative}
.cogspr{position:absolute;left:-46%;bottom:-6%;width:62%;height:62%;filter:drop-shadow(0 2px 2px #0008)}
.cogrow{margin-top:8px;padding:6px 6px 4px;border-radius:10px;background:rgba(201,168,255,.08);border:1px dashed rgba(201,168,255,.45)}
.cogtitle{display:flex;align-items:center;gap:4px;color:#e2d0ff;margin-bottom:4px}
.cogav{width:24px;height:24px;display:inline-block;flex:none}
.dhand.cog{display:flex;gap:4px;justify-content:center}
.dhand.cog .dcard{width:calc((100% - 16px)/5);aspect-ratio:2/3;min-height:0!important;overflow:hidden}
.dhand.cog .dcard.art .dtxt{font-size:6px}.dhand.cog .dcard:not(.art) .dn{font-size:7px}.dhand.cog .dcard:not(.art) .dd{font-size:6px}
.dgrid.cogpick{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:8px}
.cogsel{border-radius:8px;outline:3px solid transparent;transition:outline-color .15s, transform .15s}
.cogsel.on{outline-color:#c9a8ff;transform:scale(.96)}
.cogsel .dcard{width:100%!important;aspect-ratio:2/3}
'''
open(R+'css/style.css','w').write(c)
print("ok")
