// ---------- Combats plus vivants : sons, chiffres flottants, effets de coups, pioche animée ----------
// Tout passe par des enveloppes autour des fonctions du combat : le moteur ne change pas.

// --- sons d'effets (WebAudio, aucun fichier) ---
function sfx(kind, opt){
  try{
    if(!S || !S.settings || !S.settings.sound) return;
    AC = AC || new (window.AudioContext||window.webkitAudioContext)(); if(AC.state==="suspended") AC.resume();
    const t=AC.currentTime+(opt&&opt.delay||0), out=AC.createGain(); out.gain.value=(opt&&opt.vol)||0.5; out.connect(AC.destination);
    const noise=(dur,f0,f1,q,v,type)=>{ const n=Math.floor(AC.sampleRate*dur), b=AC.createBuffer(1,n,AC.sampleRate), d=b.getChannelData(0); for(let i=0;i<n;i++) d[i]=Math.random()*2-1;
      const s=AC.createBufferSource(); s.buffer=b; const f=AC.createBiquadFilter(); f.type=type||"bandpass"; f.Q.value=q||1; f.frequency.setValueAtTime(f0,t); f.frequency.exponentialRampToValueAtTime(f1,t+dur);
      const g=AC.createGain(); g.gain.setValueAtTime(v,t); g.gain.exponentialRampToValueAtTime(0.001,t+dur); s.connect(f); f.connect(g); g.connect(out); s.start(t); s.stop(t+dur+0.05); };
    const osc=(type,f0,f1,dur,v,dt)=>{ const o=AC.createOscillator(), g=AC.createGain(), s=t+(dt||0); o.type=type; o.frequency.setValueAtTime(f0,s); o.frequency.exponentialRampToValueAtTime(Math.max(20,f1),s+dur);
      g.gain.setValueAtTime(0.0001,s); g.gain.exponentialRampToValueAtTime(v,s+0.008); g.gain.exponentialRampToValueAtTime(0.0001,s+dur); o.connect(g); g.connect(out); o.start(s); o.stop(s+dur+0.05); };
    const p=(opt&&opt.pitch)||1;
    if(kind==="draw"){ noise(0.09,2600*p,5200*p,2.5,0.35,"bandpass"); osc("triangle",900*p,1300*p,0.05,0.04); }
    else if(kind==="play"){ noise(0.16,700,3200,1.2,0.3,"bandpass"); }
    else if(kind==="hit"){ osc("sine",180*p,48,0.18,0.55); noise(0.12,1800*p,400,0.8,0.5,"lowpass"); osc("square",95*p,40,0.08,0.12); }
    else if(kind==="crit"){ osc("sine",140,40,0.3,0.7); noise(0.2,3000,300,0.7,0.6,"lowpass"); osc("sawtooth",220,60,0.15,0.12); }
    else if(kind==="hurt"){ osc("sine",120*p,40,0.22,0.6); noise(0.18,900,200,0.9,0.45,"lowpass"); }
    else if(kind==="block"){ osc("triangle",1250,1180,0.25,0.14); osc("sine",1880,1860,0.3,0.08); noise(0.07,5200,2600,3,0.25,"bandpass"); }
    else if(kind==="clang"){ osc("square",820,600,0.12,0.08); osc("triangle",1560,1500,0.2,0.1); noise(0.08,4200,1800,2,0.35,"bandpass"); }
    else if(kind==="heal"){ [72,76,79,84].forEach((m,i)=>osc("sine",mtof(m),mtof(m),0.25,0.08,i*0.06)); }
    else if(kind==="buff"){ osc("triangle",330,660,0.22,0.12); osc("sine",495,990,0.22,0.06,0.05); }
    else if(kind==="debuff"){ osc("triangle",520,190,0.3,0.12); noise(0.2,900,300,1.5,0.12,"bandpass"); }
    else if(kind==="burn"){ noise(0.35,600,2400,0.7,0.35,"bandpass"); }
    else if(kind==="energy"){ osc("sine",660,1320,0.16,0.1); osc("sine",990,1980,0.16,0.06,0.04); }
    setTimeout(()=>{ try{out.disconnect();}catch(e){} }, 1500);
  }catch(e){}
}

// --- enveloppes du combat ---
const _hitEnemy=hitEnemy; hitEnemy=function(base){ const r=_hitEnemy(base); const C=U.dawn&&U.dawn.combat; if(C){ (C.fxHits=C.fxHits||[]).push(r); } return r; };
const _hitClient=hitClient; hitClient=function(v){ const C=U.dawn&&U.dawn.combat; const b0=C?C.block:0; const r=_hitClient(v); if(C){ (C.fxHurt=C.fxHurt||[]).push({dmg:r, blocked:Math.max(0,b0-C.block)}); } return r; };
const _drawCards=drawCards; drawCards=function(n){ const C=U.dawn&&U.dawn.combat; const h0=C?C.hand.length:0; _drawCards(n); if(C) C.drawnNew=(C.drawnNew||0)+Math.max(0,C.hand.length-h0); };
const _playCard=playCard; playCard=function(i,tg){ const C=U.dawn&&U.dawn.combat; const e=C&&C.hand[i]; const cd=e&&cardOf(e); if(cd && !cd.unplayable && cd.c<=C.energy) sfx("play"); return _playCard(i,tg); };
const _renderDungeon=renderDungeon; renderDungeon=function(){ _renderDungeon.apply(this,arguments); try{ combatFx(); }catch(e){ console.warn(e); } };

// --- effets visuels ---
const FX_ST = {weak:["😵","Faible"],vuln:["💢","Vulnérable"],burn:["🔥","Brûlure"],seed:["🌱","Vampigraine"],soak:["💧","Trempé"],fear:["😨","Peur"],para:["⚡","Paralysie"]};
const FX_ME = {weak:["😵","Faible"],vuln:["💢","Vulnérable"],burn:["🔥","Brûlure"],poison:["☠️","Poison"],frost:["❄️","Gel"],confus:["💫","Confusion"]};
function fxPop(host, html, cls, delay){
  if(!host) return; setTimeout(()=>{ const el=document.createElement("div"); el.className="fxpop "+(cls||""); el.innerHTML=html;
    el.style.left=(38+Math.random()*24)+"%"; host.appendChild(el); setTimeout(()=>el.remove(), 1300); }, delay||0);
}
function fxClass(el, cls, delay, dur){ if(!el) return; setTimeout(()=>{ el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); setTimeout(()=>el.classList.remove(cls), dur||450); }, delay||0); }
function fxSlash(host, delay, big){ if(!host) return; setTimeout(()=>{ const el=document.createElement("div"); el.className="fxslash"+(big?" big":""); el.style.transform=`rotate(${-30+Math.random()*60}deg)`; host.appendChild(el); setTimeout(()=>el.remove(), 420); }, delay||0); }
function fxIcon(host, icon, cls, delay){ if(!host) return; setTimeout(()=>{ const el=document.createElement("div"); el.className="fxicon "+(cls||""); el.textContent=icon; host.appendChild(el); setTimeout(()=>el.remove(), 900); }, delay||0); }

function combatFx(){
  const D=U.dawn, C=D&&D.combat;
  if(!C || D.phase!=="combat"){ U.fxPrev=null; return; }
  const foe=document.querySelector(".foe"), me=document.querySelector(".me");
  const P=U.fxPrev && U.fxPrev.en===C.en ? U.fxPrev : null;
  let t=0;
  if(P){
    // coups portés à l'ombre
    (C.fxHits||[]).forEach((v,i)=>{ const d=i*170; const big=v>=15;
      if(v>0){ fxSlash(foe,d,big); fxClass(foe&&foe.querySelector(".foespr"),"fxhit",d,420); fxPop(foe,`-${v}`,"dmg"+(big?" big":""),d); sfx(big?"crit":"hit",{delay:d/1000,pitch:0.9+Math.random()*0.25}); }
      else { fxIcon(foe,"🛡️","foeblock",d); fxPop(foe,"Bloqué","blk",d); sfx("clang",{delay:d/1000}); } t=Math.max(t,d); });
    // dégâts sur la durée (brûlure, vampigraine, épines) sans coup direct
    const lost=P.enHp-C.en.hp-(C.fxHits||[]).reduce((a,b)=>a+b,0);
    if(lost>0){ fxPop(foe,`-${lost}`,"dot",t+120); fxClass(foe&&foe.querySelector(".foespr"),"fxhit",t+120,420); }
    // bouclier de l'ombre
    if(C.en.block>P.enBlock){ fxIcon(foe,"🛡️","foeblock",80); fxPop(foe,`+${C.en.block-P.enBlock}`,"blk",80); sfx("block",{delay:0.08,vol:0.35}); }
    if(C.en.hp>P.enHp){ fxPop(foe,`+${C.en.hp-P.enHp}`,"heal",120); }
    // altérations posées sur l'ombre
    let dn=0; Object.keys(FX_ST).forEach(k=>{ if((C.en[k]||0)>(P.st[k]||0)){ fxPop(foe,`${FX_ST[k][0]} ${FX_ST[k][1]}`,"st",140+dn*140); dn++; } });
    if(dn) sfx(C.en.burn>(P.st.burn||0)?"burn":"debuff",{delay:0.12});
    // le client : coups reçus
    const hurt=C.fxHurt||[];
    hurt.forEach((h,i)=>{ const d=i*200;
      if(h.blocked>0){ fxIcon(me,"🛡️","meblock hitb",d); sfx("clang",{delay:d/1000}); }
      if(h.dmg>0){ fxPop(me,`-${h.dmg}`,"dmg",d); fxClass(me,"fxhurt",d,450); fxClass(document.querySelector(".combat, .fight, #app"),"fxshake",d,300); sfx("hurt",{delay:(d+40)/1000}); }
      else if(!h.blocked) fxPop(me,"0","blk",d); });
    // le client : bouclier gagné
    if(C.block>P.block && !hurt.length){ fxIcon(me,"🛡️","meblock",60); fxPop(me,`+${C.block-P.block}`,"blk",60); sfx("block",{delay:0.06}); }
    // soins / pertes hors coups
    const hurtSum=hurt.reduce((a,h)=>a+h.dmg,0);
    if(D.hp>P.hp){ fxPop(me,`+${D.hp-P.hp}`,"heal",100); fxIcon(me,"✨","sparkle",100); sfx("heal",{delay:0.1}); }
    else if(P.hp-D.hp>hurtSum){ fxPop(me,`-${P.hp-D.hp-hurtSum}`,"dot",120); fxClass(me,"fxhurt",120,450); }
    if(C.str>P.str){ fxPop(me,`💪 +${C.str-P.str} Force`,"buff",160); sfx("buff",{delay:0.16}); }
    let mn=0; Object.keys(FX_ME).forEach(k=>{ if((C[k]||0)>(P.my[k]||0)){ fxPop(me,`${FX_ME[k][0]} ${FX_ME[k][1]}`,"st",220+mn*140); mn++; } });
    if(mn) sfx("debuff",{delay:0.2});
    if(C.energy>P.energy && C.turn===P.turn) { const o=document.querySelector(".eorb"); fxClass(o,"fxpulse",0,500); sfx("energy"); }
  }
  // pioche : les cartes arrivent depuis la pioche, une par une
  const n=C.drawnNew||0;
  if(n>0){ const cards=[...document.querySelectorAll(".dhand.fight .dcard")]; const start=Math.max(0,cards.length-n);
    cards.slice(start).forEach((el,i)=>{ el.classList.add("fxdraw"); el.style.animationDelay=(i*85)+"ms"; sfx("draw",{delay:i*0.085,pitch:0.9+i*0.05,vol:0.4}); setTimeout(()=>{ el.classList.remove("fxdraw"); el.style.animationDelay=""; }, 700+i*85); }); }
  C.fxHits=[]; C.fxHurt=[]; C.drawnNew=0;
  const st={}; Object.keys(FX_ST).forEach(k=>st[k]=C.en[k]||0); const my={}; Object.keys(FX_ME).forEach(k=>my[k]=C[k]||0);
  U.fxPrev={en:C.en, enHp:C.en.hp, enBlock:C.en.block||0, hp:D.hp, block:C.block, str:C.str, energy:C.energy, turn:C.turn, st, my};
}

// --- textes des cartes : la description rétrécit pour toujours tenir dans le cadre ---
function fitCardText(root){
  (root||document).querySelectorAll(".dcard.art .dtxt").forEach(el=>{
    if(el.dataset.fit && el.dataset.fit===String(el.clientWidth)) return;
    el.style.fontSize=""; let fs=parseFloat(getComputedStyle(el).fontSize)||9, guard=0;
    while(el.scrollHeight>el.clientHeight+1 && fs>4.5 && guard++<20){ fs-=0.5; el.style.fontSize=fs+"px"; }
    el.dataset.fit=String(el.clientWidth);
  });
}
let _fitRaf=0;
new MutationObserver(()=>{ if(_fitRaf) return; _fitRaf=requestAnimationFrame(()=>{ _fitRaf=0; fitCardText(); }); }).observe(document.body,{childList:true,subtree:true});
addEventListener("resize",()=>{ document.querySelectorAll(".dcard.art .dtxt").forEach(el=>delete el.dataset.fit); fitCardText(); });

// --- appui long sur une carte : elle s'affiche en grand pour lire tranquillement ---
(function(){
  let timer=null, x0=0, y0=0, peek=null;
  const hide=()=>{ clearTimeout(timer); timer=null; if(peek){ peek.remove(); peek=null; } };
  document.addEventListener("pointerdown",e=>{ const c=e.target.closest(".dcard"); if(!c) return; x0=e.clientX; y0=e.clientY; clearTimeout(timer);
    timer=setTimeout(()=>{ peek=document.createElement("div"); peek.className="cardpeek"; const cl=c.cloneNode(true); cl.classList.remove("dragging","aiming","ready","fxdraw"); cl.removeAttribute("style"); cl.removeAttribute("data-act"); cl.removeAttribute("data-hi");
      peek.appendChild(cl); document.body.appendChild(peek); fitCardText(peek); }, 420); }, true);
  document.addEventListener("pointermove",e=>{ if((timer||peek) && Math.hypot(e.clientX-x0,e.clientY-y0)>10) hide(); }, true);
  document.addEventListener("pointerup",hide,true); document.addEventListener("pointercancel",hide,true);
  document.addEventListener("contextmenu",e=>{ if(e.target.closest(".dcard")) e.preventDefault(); });
})();
