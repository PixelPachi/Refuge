// ---------- Audio : cri officiel par bulle, sinon « voix » synthétique ----------
let AC=null, cryBlocked=false;
function blip(id, mood){
  try{
    AC = AC || new (window.AudioContext||window.webkitAudioContext)();
    const t=AC.currentTime, base=170+((id*53)%380);
    const r = mood==="tense"?1.35:mood==="sad"?0.72:1;
    const o=AC.createOscillator(), g=AC.createGain();
    o.type = id%2 ? "square" : "triangle";
    o.frequency.setValueAtTime(base*r,t);
    o.frequency.exponentialRampToValueAtTime(base*r*1.45,t+0.05);
    o.frequency.exponentialRampToValueAtTime(base*r*0.85,t+0.16/r);
    g.gain.setValueAtTime(0.0001,t);
    g.gain.exponentialRampToValueAtTime(0.08,t+0.02);
    g.gain.exponentialRampToValueAtTime(0.0001,t+0.2/r);
    o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t+0.26);
  }catch(e){}
}
let CRY_AUDIO=null;
// Cri officiel du Pokémon, joué tel quel (sans changer la vitesse ni la hauteur) à chaque bulle de dialogue
function cry(id){
  if(!S || !S.settings.sound || !id) return;
  if(CRY_AUDIO){ try{ CRY_AUDIO.pause(); }catch(e){} CRY_AUDIO=null; }
  if(cryBlocked){ blip(id,""); return; }
  try{
    const a=new Audio(cryUrl(id));
    a.volume=0.5;
    CRY_AUDIO=a;
    a.addEventListener("error",()=>{ if(CRY_AUDIO===a) blip(id,""); },{once:true});
    const p=a.play();
    if(p && p.catch) p.catch(()=>{}); // une coupure (bulle suivante) ou une lecture refusée ne doit pas bloquer les cris suivants
  }catch(e){ blip(id,""); }
}

// ---------- Musique originale (générée par le jeu, aucune piste externe) ----------
const TRACKS = {
  // ===== Thèmes de la taverne par saison (jour = village, nuit = comptoir) =====
  // Saison 2 · Les premières pluies : la min douce, crachin et gouttes
  village_pluie1:{bpm:70,beats:2,div:3,pad:true,padType:"strings",padLp:1100,bassPat:[1,0,0,2,0,0],mi:"flute",harp:[0,2,1,3,2,4],amb:"drizzle",drip:true,
    chords:[[57,60,64],[53,57,60],[55,60,64],[55,59,62],[57,60,64],[53,57,60],[52,55,59],[52,56,59]],
    mel:[76,0,0,74,0,72, 72,0,0,69,0,0, 72,0,74,76,0,79, 79,0,0,74,0,0, 76,0,0,74,0,72, 77,0,76,74,0,72, 71,0,72,74,0,76, 76,0,0,0,0,0]},
  nuit_pluie1:{bpm:64,beats:4,div:2,pad:true,padType:"strings",padLp:900,bassPat:[1,0,0,0,2,0,0,0],mi:"ocarina",harp:[0,1,2,3,4,3,2,1],amb:"rain",drip:true,
    chords:[[50,53,57,60],[46,50,53,57],[43,46,50,53],[45,49,52,55]],
    mel:[0,0,69,0,72,0,74,0, 72,0,0,0,69,0,0,0, 0,0,67,0,70,0,72,0, 73,0,0,0,0,0,0,0]},
  // Saisons 3-4 · La saison des pluies : mi dorien, averse ; la nuit, l'orage gronde
  village_pluie:{bpm:66,beats:4,div:2,pad:true,padType:"strings",padLp:1000,bassPat:[1,0,0,1,0,0,2,0],harp:[0,1,2,3,4,3,2,1],mi:"flute",amb:"rain",drip:true,
    chords:[[52,55,59,62],[45,52,55,61],[48,52,55,59],[47,50,54,57]],
    mel:[76,0,0,74,0,71,0,0, 69,0,71,0,73,0,0,0, 71,0,0,67,0,64,0,0, 66,0,0,0,0,0,0,0]},
  nuit_pluie:{bpm:58,beats:4,div:2,pad:true,padType:"strings",padLp:800,bassPat:[1,0,0,0,0,0,0,0],mi:"ocarina",harp:[0,-1,2,-1,4,-1,2,-1],amb:"storm",drip:true,
    chords:[[48,51,55],[44,48,51],[51,55,58],[46,50,53]],
    mel:[0,0,67,0,0,0,70,0, 68,0,0,0,63,0,0,0, 0,0,63,0,65,0,67,0, 65,0,0,0,62,0,0,0]},
  // Saisons 5-6 · Les métamorphoses : lydien scintillant, vent qui tourne
  village_meta:{bpm:72,beats:4,div:4,pad:true,padType:"strings",padLp:1300,harp:[0,1,2,3,4,5,4,3,2,3,4,5,6,5,4,3],mi:"flute",amb:"wind",
    chords:[[53,57,60,64],[55,59,62,66],[53,57,60,64],[52,55,59,62]],
    mel:[72,0,0,0,74,0,0,0,76,0,0,0,0,0,0,0, 78,0,0,0,76,0,74,0,72,0,0,0,0,0,0,0, 71,0,0,0,72,0,0,0,74,0,0,0,76,0,0,0, 79,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
  nuit_meta:{bpm:60,beats:4,div:2,pad:true,padType:"strings",padLp:1100,bassPat:[1,0,0,0,0,0,0,0],mi:"glock",harp:[0,2,4,2,1,3,5,3],amb:"wind",
    chords:[[48,52,56,60],[50,54,58,62],[48,52,56,60],[46,50,54,58]],
    mel:[72,0,0,0,76,0,0,0, 74,0,0,0,70,0,0,0, 72,0,0,0,68,0,0,0, 70,0,0,0,0,0,0,0]},
  // Saisons 7-8 · La fête de Bourg-Brume : ré majeur entraînant, la foule ; la nuit, une valse et les grillons
  village_fete:{bpm:112,beats:2,div:4,pad:false,bassPat:[1,0,2,0,1,0,2,0],stabPat:[0,0,1,0,0,0,1,0],shakerPat:[1,0,1,0,1,0,1,1],kickPat:[1,0,0,0,1,0,0,0],harp:[0,2,1,3,2,4,3,5],mi:"ocarina",amb:"crowd",
    chords:[[50,54,57],[55,59,62],[57,61,64],[50,54,57],[55,59,62],[50,54,57],[57,61,64],[50,54,57]],
    mel:[74,0,76,0,78,0,74,0, 79,0,78,0,76,0,74,0, 76,0,78,0,79,0,81,0, 78,0,0,0,74,0,0,0, 79,0,81,0,83,0,79,0, 78,0,76,0,74,0,0,0, 76,0,78,0,76,0,73,0, 74,0,0,0,0,0,0,0]},
  nuit_fete:{bpm:84,beats:3,div:2,pad:true,padType:"strings",padLp:1200,bassPat:[1,0,2,0,2,0],mi:"flute",harp:[0,2,4,3,2,1],amb:"crickets",
    chords:[[50,54,57],[47,50,54],[43,47,50],[45,49,52]],
    mel:[74,0,78,0,81,0, 79,0,78,0,76,0, 74,0,76,0,78,0, 76,0,0,0,0,0]},
  // Saisons 9-10 · Le Pourboire d'Or : jazz feutré, basse qui marche
  village_or:{bpm:92,beats:4,div:2,pad:true,padType:"strings",padLp:1000,bassPat:[1,0,2,0,1,0,2,0],shakerPat:[0,1,0,1,0,1,0,1],harp:[0,-1,2,-1,1,-1,3,-1],mi:"flute",
    chords:[[50,53,57,60],[43,47,50,53],[48,52,55,59],[45,49,52,55]],
    mel:[74,0,72,0,69,0,72,0, 71,0,0,0,67,0,0,0, 72,0,74,0,76,0,79,0, 76,0,73,0,0,0,0,0]},
  nuit_or:{bpm:66,beats:4,div:2,pad:true,padType:"strings",padLp:1000,bassPat:[1,0,0,0,2,0,0,0],mi:"ocarina",harp:[0,1,2,3,2,1,2,3],
    chords:[[50,53,57,60],[43,47,50,53],[48,52,55,59],[45,49,52,55]],
    mel:[0,0,74,0,77,0,76,0, 74,0,0,0,71,0,0,0, 0,0,72,0,76,0,79,0, 77,0,0,0,73,0,0,0]},
  // Saisons 11-12 · La Faille s'élargit : mi phrygien, ancien, vent des époques oubliées
  village_faille:{bpm:70,beats:4,div:2,pad:true,padType:"strings",padLp:800,bassPat:[1,0,0,0,1,0,0,0],mi:"ocarina",harp:[0,1,2,1,3,2,1,2],amb:"wind",
    chords:[[52,55,59],[53,57,60],[52,55,59],[50,53,57]],
    mel:[76,0,77,0,76,0,0,0, 74,0,72,0,71,0,0,0, 76,0,0,0,79,0,77,0, 76,0,0,0,0,0,0,0]},
  nuit_faille:{bpm:56,beats:4,div:2,pad:true,padType:"strings",padLp:700,bassPat:[1,0,0,0,0,0,0,0],mi:"flute",harp:[0,-1,1,-1,2,-1,1,-1],harpOct:12,amb:"wind",
    chords:[[40,47,52],[41,48,53],[40,47,52],[38,45,50]],
    mel:[64,0,0,0,65,0,0,0, 64,0,0,0,0,0,0,0, 62,0,0,0,60,0,59,0, 64,0,0,0,0,0,0,0]},
  // Saisons 13-14 · Les promesses : berceuse en sol, les grillons
  village_prom:{bpm:68,beats:3,div:2,pad:true,padType:"strings",padLp:1200,bassPat:[1,0,0,0,2,0],mi:"flute",harp:[0,2,4,3,2,1],amb:"crickets",
    chords:[[55,59,62],[52,55,59],[48,52,55],[50,54,57]],
    mel:[74,0,0,71,0,74, 76,0,74,0,71,0, 72,0,0,74,0,76, 74,0,0,0,0,0]},
  nuit_prom:{bpm:58,beats:3,div:2,pad:true,padType:"strings",padLp:1000,bassPat:[1,0,0,0,0,0],mi:"glock",harp:[0,2,4,3,2,1],amb:"crickets",
    chords:[[55,59,62],[52,55,59],[48,52,55],[50,54,57]],
    mel:[71,0,0,0,74,0, 72,0,0,0,69,0, 67,0,0,0,71,0, 69,0,0,0,0,0]},
  // Thème du Refuge : petite valse en fa majeur, boîte à musique
  title:{bpm:96,beats:3,div:2,pad:true,bassPat:[1,0,2,0,2,0],mi:"bell",
    chords:[[53,57,60],[52,57,60],[53,58,62],[52,55,60],[53,57,60],[53,57,62],[50,55,58],[52,55,58,60]],
    mel:[72,0,69,0,72,74, 76,0,0,0,74,72, 74,0,70,0,74,77, 76,0,0,0,0,0, 77,0,76,0,74,72, 74,0,69,0,0,72, 70,0,72,0,74,70, 72,0,0,0,0,0]},
  // La voix du questionnaire : nappes aériennes
  voix:{bpm:58,beats:4,div:2,pad:true,padLp:1400,mi:"bell",
    chords:[[50,57,61,66],[47,54,57,62],[43,50,54,59],[45,52,57,61]],
    mel:[74,0,78,0,81,0,0,0, 78,0,74,0,73,0,0,0, 71,0,74,0,78,0,0,0, 76,0,73,0,0,0,0,0]},
  // Le bus de nuit : nocturne en la mineur
  route:{bpm:84,beats:4,div:4,pad:true,arp:true,bassPat:[1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],hatPat:[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],mi:"lead",
    chords:[[57,60,64],[53,57,60],[52,55,60],[55,59,62]],
    mel:[76,0,0,0,0,0,0,0,74,0,0,0,72,0,0,0, 72,0,0,0,0,0,0,0,69,0,0,0,0,0,0,0, 67,0,0,0,0,0,0,0,72,0,0,0,74,0,0,0, 71,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
  // Le village, le marché, le service de jour : 6/8 sautillant en do majeur
  village:{bpm:92,beats:4,div:4,pad:true,padType:"strings",padLp:1400,mi:"flute",
    bassPat:[1,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0],kickPat:[1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],shakerPat:[0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,1],
    harp:[0,-1,1,-1,2,-1,3,-1,4,-1,3,-1,2,-1,1,-1],
    chords:[[53,57,60],[52,55,60],[50,53,57],[52,57,60],[50,53,58],[53,57,60],[50,53,55,58],[52,55,58,60]],
    mel:[72,0,0,0,74,0,76,0,77,0,0,0,76,0,74,0, 72,0,0,0,0,0,69,0,72,0,0,0,0,0,0,0, 74,0,0,0,72,0,74,0,77,0,0,0,76,0,74,0, 72,0,0,0,0,0,0,0,69,0,0,0,0,0,0,0,
      70,0,0,0,72,0,74,0,77,0,0,0,79,0,77,0, 76,0,0,0,72,0,0,0,69,0,0,0,72,0,0,0, 74,0,0,0,72,0,70,0,69,0,0,0,70,0,72,0, 72,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    counter:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,84,0,81,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,84,0,88,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,81,0,84,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,84,0,0,0,88,0,0,0,89,0,0,0]},
  // La nuit au comptoir : chaleureux et un peu mystérieux
  nuit:{bpm:72,beats:4,div:2,pad:true,padType:"strings",padLp:1100,mi:"flute",bassPat:[1,0,0,0,2,0,0,0],shakerPat:[0,0,0,1,0,0,0,1],
    harp:[0,1,2,3,4,3,2,1],
    chords:[[55,59,62],[57,61,64],[54,57,61],[54,59,62],[55,59,62],[57,61,64],[50,54,57,61],[50,54,57]],
    mel:[71,0,74,0,76,0,74,0, 73,0,0,0,69,0,0,0, 73,0,76,0,78,0,76,0, 74,0,0,0,71,0,0,0, 71,0,74,0,79,0,78,0, 76,0,0,0,73,0,76,0, 74,0,0,0,73,0,69,0, 74,0,0,0,0,0,0,0],
    counter:[0,0,0,0,0,0,0,0, 0,0,0,0,0,0,85,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,86,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 86,0,0,0,90,0,0,0]},
  // Le Labyrinthe des Origines : ré mineur, pulsation sourde
  donjon:{bpm:104,beats:4,div:4,pad:true,padType:"strings",padLp:900,mi:"flute",bassPat:[1,0,0,1,0,0,1,0,1,0,0,1,0,0,2,0],bassSoft:false,
    kickPat:[1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],shakerPat:[0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0],
    harp:[0,1,2,1,3,1,2,1,0,1,2,1,3,4,3,2],
    chords:[[57,60,64],[53,57,60],[55,59,62],[52,55,59],[57,60,64],[53,57,60],[55,59,62],[52,56,59]],
    mel:[69,0,0,0,72,0,0,0,76,0,0,0,74,0,72,0, 72,0,0,0,0,0,0,0,69,0,0,0,0,0,0,0, 71,0,0,0,74,0,0,0,79,0,0,0,77,0,76,0, 76,0,0,0,0,0,0,0,71,0,0,0,0,0,0,0,
      69,0,72,0,76,0,0,0,81,0,0,0,79,0,77,0, 77,0,0,0,76,0,74,0,72,0,0,0,0,0,0,0, 74,0,0,0,76,0,0,0,77,0,0,0,79,0,0,0, 80,0,0,0,0,0,0,0,76,0,0,0,0,0,0,0]},
  // Le Cœur du Regret : lent et émouvant
  coeur:{bpm:66,beats:4,div:2,pad:true,padType:"strings",padLp:1300,mi:"flute",bassPat:[1,0,0,0,2,0,0,0],harp:[0,2,1,3,2,4,3,5],
    chords:[[51,55,58],[53,57,60],[50,53,57],[50,55,58],[51,55,60],[53,57,60],[50,53,58],[50,53,58]],
    mel:[70,0,0,0,72,0,74,0, 77,0,0,0,74,0,72,0, 74,0,0,0,0,0,69,0, 70,0,0,0,0,0,0,0, 72,0,0,0,74,0,75,0, 77,0,0,0,79,0,77,0, 74,0,0,0,72,0,70,0, 70,0,0,0,0,0,0,0],
    counter:[0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,86,0,82,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 82,0,0,0,86,0,89,0]},
  // Fin de saison : le thème du Refuge, plus lent, avec nappes
  fin:{bpm:80,beats:3,div:2,pad:true,padType:"strings",padLp:1300,bassPat:[1,0,0,0,2,0],mi:"flute",harp:[0,1,2,3,2,1],
    chords:[[53,57,60],[52,57,60],[53,58,62],[52,55,60],[53,57,60],[53,57,62],[50,55,58],[52,55,58,60]],
    mel:[72,0,69,0,72,74, 76,0,0,0,74,72, 74,0,70,0,74,77, 76,0,0,0,0,0, 77,0,76,0,74,72, 74,0,69,0,0,72, 70,0,72,0,74,70, 72,0,0,0,0,0]}
};
const MUS = {cur:null, want:null, bus:null, step:0, next:0, timer:null, noise:null, duck:null};
// Chaque saison a son thème de taverne (jour et nuit). Saison 1 : « Portes ouvertes », le thème d'origine.
const SEASON_THEME = {1:"",2:"_pluie1",3:"_pluie",4:"_pluie",5:"_meta",6:"_meta",7:"_fete",8:"_fete",9:"_or",10:"_or",11:"_faille",12:"_faille",13:"_prom",14:"_prom"};
function seasonTrack(name){ if(name!=="village" && name!=="nuit") return name; const suf=SEASON_THEME[(S&&S.season)||1]||""; return TRACKS[name+suf] ? name+suf : name; }
function loopNoise(){ const len=AC.sampleRate*2, b=AC.createBuffer(1,len,AC.sampleRate), d=b.getChannelData(0); let last=0; for(let i=0;i<len;i++){ const w=Math.random()*2-1; last=(last+0.02*w)/1.02; d[i]=w*0.7+last*3; } const src=AC.createBufferSource(); src.buffer=b; src.loop=true; return src; }
function startAmb(kind, bus){
  const nodes=[]; if(!kind) return nodes;
  const src=loopNoise(), g=AC.createGain(); let head=src;
  const filt=(type,f,q)=>{ const x=AC.createBiquadFilter(); x.type=type; x.frequency.value=f; if(q) x.Q.value=q; head.connect(x); head=x; return x; };
  if(kind==="rain"||kind==="drizzle"||kind==="storm"){ filt("highpass",kind==="drizzle"?900:500); filt("lowpass",kind==="storm"?2200:3200); g.gain.value = kind==="drizzle"?0.018 : kind==="storm"?0.075 : 0.05; }
  else if(kind==="wind"){ const bp=filt("bandpass",500,0.9); const lfo=AC.createOscillator(), lg=AC.createGain(); lfo.frequency.value=0.07; lg.gain.value=320; lfo.connect(lg); lg.connect(bp.frequency); lfo.start(); nodes.push(lfo); g.gain.value=0.05; }
  else if(kind==="crowd"){ filt("lowpass",520); filt("highpass",180); g.gain.value=0.035; }
  else if(kind==="crickets"){ filt("highpass",3000); g.gain.value=0.004; }
  head.connect(g); g.connect(bus); src.start(); nodes.push(src);
  return nodes;
}
function thunder(){ if(!AC||!MUS.bus) return; const t=AC.currentTime, src=loopNoise(), f=AC.createBiquadFilter(), g=AC.createGain(); f.type="lowpass"; f.frequency.value=160; g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(0.32,t+0.08); g.gain.exponentialRampToValueAtTime(0.06,t+0.6); g.gain.exponentialRampToValueAtTime(0.0001,t+3.2); src.connect(f); f.connect(g); g.connect(MUS.bus); src.start(t); src.stop(t+3.4); }
function musicOn(){ return !S || S.settings.music!==false; }
function mtof(m){ return 440*Math.pow(2,(m-69)/12); }
function ensureAC(){
  try{ AC = AC || new (window.AudioContext||window.webkitAudioContext)(); if(AC.state==="suspended") AC.resume(); }catch(e){}
  return AC;
}
function noiseBuf(){
  if(MUS.noise) return MUS.noise;
  const b=AC.createBuffer(1, AC.sampleRate*0.1, AC.sampleRate), d=b.getChannelData(0);
  for(let i=0;i<d.length;i++) d[i]=Math.random()*2-1;
  return MUS.noise=b;
}
function tone(dest, type, m, t, dur, o){
  const osc=AC.createOscillator(); osc.type=type;
  osc.frequency.setValueAtTime(mtof(m)*(o.mult||1), t);
  if(o.detune) osc.detune.setValueAtTime(o.detune, t);
  const g=AC.createGain(), a=o.a||0.01, dec=o.d||0.2, peak=o.v||0.1, sus=Math.max(0.0002,peak*(o.s==null?0.4:o.s)), rel=o.r||0.2;
  const hold=Math.max(dur, a+dec+0.01);
  g.gain.setValueAtTime(0.0001,t);
  g.gain.exponentialRampToValueAtTime(peak,t+a);
  g.gain.exponentialRampToValueAtTime(sus,t+a+dec);
  g.gain.setTargetAtTime(0.0001,t+hold,rel/3);
  let n=osc;
  if(o.lp){ const f=AC.createBiquadFilter(); f.type="lowpass"; f.frequency.setValueAtTime(o.lp,t); osc.connect(f); n=f; }
  n.connect(g); g.connect(dest);
  osc.start(t); osc.stop(t+hold+rel+0.2);
}
function breath(dest,t,v){ try{ const src=AC.createBufferSource(); src.buffer=noiseBuf(); const f=AC.createBiquadFilter(); f.type="bandpass"; f.frequency.value=2400; f.Q.value=1.2; const g=AC.createGain(); g.gain.setValueAtTime(v,t); g.gain.exponentialRampToValueAtTime(0.0001,t+0.09); src.connect(f); f.connect(g); g.connect(dest); src.start(t); src.stop(t+0.1); }catch(e){} }
function vibTone(dest, type, m, t, dur, o){
  const osc=AC.createOscillator(); osc.type=type; osc.frequency.setValueAtTime(mtof(m)*(o.mult||1), t);
  const lfo=AC.createOscillator(), lg=AC.createGain(); lfo.frequency.value=o.vr||5.4; lg.gain.setValueAtTime(0,t); lg.gain.linearRampToValueAtTime(mtof(m)*(o.vd||0.006), t+Math.min(0.35,dur*0.6)); lfo.connect(lg); lg.connect(osc.frequency);
  const g=AC.createGain(), a=o.a||0.06, peak=o.v||0.09, hold=Math.max(dur,a+0.05), rel=o.r||0.25;
  g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(peak,t+a); g.gain.setTargetAtTime(peak*(o.s||0.75),t+a,0.15); g.gain.setTargetAtTime(0.0001,t+hold,rel/3);
  let n=osc; if(o.lp){ const f=AC.createBiquadFilter(); f.type="lowpass"; f.frequency.value=o.lp; osc.connect(f); n=f; }
  n.connect(g); g.connect(dest); osc.start(t); lfo.start(t); osc.stop(t+hold+rel+0.2); lfo.stop(t+hold+rel+0.2);
}
const INST = {
  // ---- palette « Donjon Mystère » : flûte douce, harpe, cordes chaudes, boîte à musique, percussions légères
  flute:(dest,m,t,dur)=>{ vibTone(dest,"sine",m,t,dur,{a:0.07,v:0.10,s:0.72,r:0.3,vd:0.0055}); vibTone(dest,"triangle",m,t,dur,{a:0.07,v:0.028,s:0.7,r:0.3,lp:3200,vd:0.0055}); breath(dest,t,0.012); },
  ocarina:(dest,m,t,dur)=>{ vibTone(dest,"sine",m,t,dur,{a:0.04,v:0.11,s:0.8,r:0.2,vd:0.004,vr:5}); vibTone(dest,"sine",m,t,dur,{mult:2,a:0.04,v:0.012,s:0.6,r:0.2}); breath(dest,t,0.008); },
  harp:(dest,m,t,dur)=>{ tone(dest,"triangle",m,t,0.4,{a:0.002,d:0.55,s:0.04,v:0.05,r:0.5,lp:3400}); tone(dest,"sine",m,t,0.3,{mult:2,a:0.002,d:0.25,s:0.02,v:0.012,r:0.3}); },
  glock:(dest,m,t,dur)=>{ tone(dest,"sine",m,t,0.2,{a:0.002,d:0.9,s:0.02,v:0.06,r:0.7}); tone(dest,"sine",m,t,0.2,{mult:3.01,a:0.002,d:0.2,s:0.01,v:0.012,r:0.2}); },
  strings:(dest,m,t,dur,lp)=>{ tone(dest,"triangle",m,t,dur,{a:0.7,d:0.5,s:0.85,v:0.026,r:1.1,lp:lp||1300,detune:-6}); tone(dest,"triangle",m,t,dur,{a:0.7,d:0.5,s:0.85,v:0.026,r:1.1,lp:lp||1300,detune:6}); tone(dest,"sawtooth",m,t,dur,{a:0.9,d:0.5,s:0.8,v:0.008,r:1.1,lp:(lp||1300)*0.8}); },
  kick:(dest,t)=>{ const o=AC.createOscillator(), g=AC.createGain(); o.type="sine"; o.frequency.setValueAtTime(110,t); o.frequency.exponentialRampToValueAtTime(48,t+0.12); g.gain.setValueAtTime(0.13,t); g.gain.exponentialRampToValueAtTime(0.0001,t+0.22); o.connect(g); g.connect(dest); o.start(t); o.stop(t+0.25); },
  shaker:(dest,t)=>{ const s=AC.createBufferSource(); s.buffer=noiseBuf(); const f=AC.createBiquadFilter(); f.type="highpass"; f.frequency.value=7500; const g=AC.createGain(); g.gain.setValueAtTime(0.012,t); g.gain.exponentialRampToValueAtTime(0.0001,t+0.06); s.connect(f); f.connect(g); g.connect(dest); s.start(t); s.stop(t+0.07); },
  bell:(dest,m,t,dur)=>{ tone(dest,"sine",m,t,dur,{a:0.004,d:0.7,s:0.04,v:0.13,r:0.5}); tone(dest,"sine",m,t,dur,{mult:2,a:0.004,d:0.3,s:0.02,v:0.035,r:0.3}); },
  lead:(dest,m,t,dur)=>tone(dest,"triangle",m,t,dur,{a:0.02,d:0.25,s:0.55,v:0.11,r:0.3,lp:2600}),
  pluck:(dest,m,t,dur)=>tone(dest,"square",m,t,Math.min(dur,0.12),{a:0.003,d:0.12,s:0.08,v:0.035,r:0.08,lp:1500}),
  bass:(dest,m,t,dur,soft)=>tone(dest,"triangle",m,t,dur,{a:0.01,d:0.18,s:0.45,v:soft?0.07:0.13,r:0.12,lp:500}),
  pad:(dest,m,t,dur,lp)=>{ tone(dest,"sawtooth",m,t,dur,{a:0.6,d:0.6,s:0.75,v:0.022,r:1.0,lp:lp||850,detune:-7}); tone(dest,"sawtooth",m,t,dur,{a:0.6,d:0.6,s:0.75,v:0.022,r:1.0,lp:lp||850,detune:7}); },
  hat:(dest,t)=>{ const s=AC.createBufferSource(); s.buffer=noiseBuf(); const f=AC.createBiquadFilter(); f.type="highpass"; f.frequency.value=6500; const g=AC.createGain(); g.gain.setValueAtTime(0.025,t); g.gain.exponentialRampToValueAtTime(0.0001,t+0.05); s.connect(f); f.connect(g); g.connect(dest); s.start(t); s.stop(t+0.06); }
};
function scheduleStep(tr, idx, t, stepDur){
  const spb=tr.beats*tr.div, bars=tr.chords.length, bar=Math.floor(idx/spb)%bars, s=idx%spb, ch=tr.chords[bar], dest=MUS.bus;
  if(s===0 && tr.pad) ch.forEach(m=>(tr.padType==="strings"?INST.strings:INST.pad)(dest,m,t,stepDur*spb*0.95,tr.padLp));
  if(tr.harp){ const hp=tr.harp[s%tr.harp.length]; if(hp!=null && hp>=0){ const ext=ch.concat(ch.map(x=>x+12), ch.map(x=>x+24)); INST.harp(dest, ext[hp%ext.length]+(tr.harpOct||0), t, stepDur*2); } }
  if(tr.kickPat && tr.kickPat[s]) INST.kick(dest,t);
  if(tr.shakerPat && tr.shakerPat[s]) INST.shaker(dest,t);
  if(tr.counter){ const ci=bar*spb+s, cm=tr.counter[ci%tr.counter.length]; if(cm) INST.glock(dest,cm,t,stepDur*2); }
  if(tr.bassPat){ const b=tr.bassPat[s]; if(b) INST.bass(dest, b===1?ch[0]-12:ch[0]-5, t, stepDur*1.4, tr.bassSoft); }
  if(tr.stabPat && tr.stabPat[s]) ch.forEach(m=>INST.pluck(dest,m+12,t,stepDur));
  if(tr.arp) INST.pluck(dest, ch[s%ch.length]+12+(Math.floor(s/ch.length)%2?12:0), t, stepDur);
  if(tr.hatPat && tr.hatPat[s]) INST.hat(dest,t);
  if(tr.drip && Math.random()<0.16){ const dm=[84,86,88,91,93,96][Math.floor(Math.random()*6)]; tone(dest,"sine",dm,t+Math.random()*stepDur,0.05,{a:0.002,d:0.14,s:0.01,v:0.028,r:0.1}); }
  if(tr.amb==="crickets" && Math.random()<0.14){ for(let c=0;c<3;c++) tone(dest,"sine",107,t+c*0.045,0.02,{a:0.002,d:0.03,s:0.01,v:0.012,r:0.02}); }
  const mi=bar*spb+s, m=tr.mel[mi];
  if(m){ let k=1; while(k<6 && !tr.mel[(mi+k)%tr.mel.length]) k++; INST[tr.mi](dest,m,t,stepDur*k*0.9); }
}
function musicTick(){
  if(!AC || !MUS.cur) return;
  const tr=TRACKS[MUS.cur], stepDur=60/tr.bpm/tr.div;
  while(MUS.next < AC.currentTime+0.25){ scheduleStep(tr, MUS.step, MUS.next, stepDur); MUS.next+=stepDur; MUS.step++; }
  if(tr.amb==="storm" && Math.random()<0.004) thunder();
}
function music(name){
  name=seasonTrack(name);
  MUS.want=name;
  if(!musicOn() || !AC) return;
  if(MUS.cur===name) return;
  const old=MUS.bus;
  if(old){ try{ old.gain.cancelScheduledValues(AC.currentTime); old.gain.setTargetAtTime(0.0001,AC.currentTime,0.3); const amb=old._amb||[]; setTimeout(()=>{ amb.forEach(n=>{ try{n.stop();}catch(e){} }); try{old.disconnect();}catch(e){} },2500); }catch(e){} }
  MUS.bus=AC.createGain(); MUS.bus.gain.setValueAtTime(0.0001,AC.currentTime); MUS.bus.gain.setTargetAtTime(0.9,AC.currentTime+0.1,0.5); MUS.bus.connect(AC.destination);
  try{ MUS.bus._amb = startAmb(TRACKS[name] && TRACKS[name].amb, MUS.bus); }catch(e){ MUS.bus._amb=[]; }
  MUS.cur=name; MUS.step=0; MUS.next=AC.currentTime+0.15;
  if(!MUS.timer) MUS.timer=setInterval(musicTick,60);
}
function musicStop(){
  if(MUS.bus && AC){ try{ MUS.bus.gain.setTargetAtTime(0.0001,AC.currentTime,0.2); const b=MUS.bus; setTimeout(()=>{ (b._amb||[]).forEach(n=>{ try{n.stop();}catch(e){} }); try{b.disconnect();}catch(e){} },1500); }catch(e){} }
  MUS.bus=null; MUS.cur=null;
  if(MUS.timer){ clearInterval(MUS.timer); MUS.timer=null; }
}
function jingle(kind){
  if(!musicOn() || !AC) return;
  const t=AC.currentTime+0.05, out=AC.createGain(); out.gain.value=1; out.connect(AC.destination);
  if(MUS.bus){ MUS.bus.gain.setTargetAtTime(0.25,AC.currentTime,0.1); MUS.bus.gain.setTargetAtTime(0.9,AC.currentTime+2.6,0.6); }
  const seq = kind==="apaise" ? [[72,0],[76,0.14],[79,0.28],[84,0.42]] : [[69,0],[65,0.22],[62,0.44]];
  seq.forEach(([m,dt])=>INST.bell(out,m,t+dt,0.4));
  if(kind==="apaise") [60,64,67,72].forEach(m=>INST.pad(out,m,t+0.56,1.6,1600));
  else [50,53,57].forEach(m=>INST.pad(out,m,t+0.6,1.4,700));
  setTimeout(()=>{ try{out.disconnect();}catch(e){} },4000);
}
document.addEventListener("pointerdown",()=>{
  if(!musicOn()) return;
  ensureAC();
  if(AC && MUS.want && MUS.cur!==MUS.want) music(MUS.want);
},true);
