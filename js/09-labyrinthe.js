// ---------- Aube : le Donjon Inversé, salle par salle ----------


const ROOM_TUTO = {
  entree:"Tu ne descends pas avec lui : tu le guides depuis le comptoir. À chaque salle, il hésite, et tu choisis comment l'aider. Ici, seuls SES souvenirs comptent : les Fragments des autres clients restent au comptoir. Les étincelles du co-gérant, elles, aident tout le monde.",
  echo:"Un Écho, c'est un regret qui prend forme. Regarde son émotion : un souvenir de l'émotion qui la dissout le fait disparaître, un mot-clé du comptoir qui parle de cette salle aussi. Un mauvais choix lui fait peur, et on peut réessayer. Traverser marche toujours, mais sa Terreur monte.",
  carrefour:"Un carrefour : on ne voit pas ce qui attend au bout. Le nom de chaque chemin, et ce qu'il t'a raconté, sont tes seuls indices.",
  enigme:"Une énigme psychologique : une scène du passé à laquelle il manque un souvenir. L'émotion qui manque est affichée : trouve le souvenir qui correspond, ou le mot-clé qui parle de cette scène.",
  sanctuaire:"Un sanctuaire : un endroit sûr. Se poser fait baisser sa Terreur, repenser au chemin lui donne de la Clarté.",
  coeur:"Le Cœur du Regret ! Il se résout avec le bon souvenir, avec tout ce qu'il t'a confié, ou avec assez de Clarté gagnée en chemin. Ici, les erreurs font très peur."
};
const ROOM_BG = {entree:"#3a3352",carrefour:"#34405a",sanctuaire:"#2f5a4a",enigme:"#4a3a64",coeur:"#5a2a4a"};

function startDawn(){
  music("donjon");
  U.dawn = {list:U.night.confident.slice(), i:0};
  if(!U.dawn.list.length){ endNight(); return; }
  if(!S.dungeonKnown){
    S.dungeonKnown=true;
    const first=CL[U.dawn.list[0].k];
    const lines=[
      {who:"narr",t:"À l'aube, un grondement sourd monte du plancher. Les verres tintent sur les étagères."},
      {who:"narr",t:"Derrière le comptoir, la trappe de la cave s'est ouverte toute seule. En dessous, des marches descendent bien plus bas que la cave. Beaucoup plus bas. Une lumière violette pulse tout au fond."},
      {who:"cog",t:"Il y a une enveloppe clouée sous la trappe… C'est l'écriture d'Hector !"},
      {who:"narr",t:"« Si tu lis ça, c'est que la porte s'est ouverte. Les âmes qui entrent dans cette taverne ont perdu quelque chose en chemin. »"},
      {who:"narr",t:"« Sous la taverne s'étend le Labyrinthe des Origines : il est fait de leurs regrets. Quand une âme te fait confiance, elle peut y descendre pour affronter le sien. »"},
      {who:"narr",t:"« Elle doit y aller seule. Toi, reste au comptoir : ses souvenirs te montreront le chemin. Et ne descends jamais toi-même. — H. »"},
      {who:"ten",t:"« Ses souvenirs te montreront le chemin »… Les Fragments ?"},
      {who:{id:first.id,n:first.n},t:"Je l'entends… Quelque chose m'appelle, là-dessous. Je crois que je dois y aller."},
      {who:"cog",t:"Patron, regarde les Fragments ! Quand on les approche de la trappe, on voit des images de ce qu'il y a en bas. On pourra le suivre d'ici… et l'aider !"}
    ];
    playDialog(lines, setupDungeon, ()=>{ $app.innerHTML=`${hud()}${scene({doorOpen:false})}<div class="panel">${dialogBubble()}</div>`; });
    return;
  }
  setupDungeon();
}
const TER_MAX = 10;
function dmap(){ const D=U.dawn; return (D&&D.map) || CL[D.x.k].map; }
function roomSay(){ const D=U.dawn, n=D.node?dmap().nodes[D.node]:null; return (n&&n.say) || (ROOM_SAY[D.x.k]||{})[D.node]; }
// Image d'une salle : dj-<client>-<salle>, ou un décor partagé (art:"client/salle", "faille", "suicune…").
// Si l'image n'existe pas encore (à faire avec Gemini, voir GEMINI.md), on prend le décor générique du type de salle.
function roomKey(n){ const D=U.dawn, a=n.art||D.node; return a.includes("/") ? "dj-"+a.replace("/","-") : (D.finale||a==="faille"||a.startsWith("suicune")||a.startsWith("mewtwo")) ? "dj-"+a : `dj-${D.x.k}-${a}`; }
function roomSrc(n){ const k=roomKey(n); return artSrc(ART_SET.has(k) ? k : "donjon-"+n.t); }
function fogged(id){
  const D=U.dawn; if(D.x.hang<2 && !(omen()==="brume" && !D.finale)) return false;
  if(D.visited.includes(id)) return false;
  const cur=D.node?dmap().nodes[D.node]:null;
  if(cur && cur.nx.includes(id)) return false;
  return true;
}
function nodeIcon(n){ return n.t==="entree"?"⌂":n.t==="echo"?EMO[n.e].i:n.t==="enigme"?"?":n.t==="carrefour"?"⑂":n.t==="sanctuaire"?"✚":"♥"; }
// Carte du Labyrinthe : une frise horizontale, de l'entrée (à gauche) au Cœur du Regret (à droite)
function hlayout(nodes){
  const ys=[...new Set(Object.values(nodes).map(n=>n.y))].sort((a,b)=>a-b);
  const COL=112, PAD=58, H=300, W=PAD*2+(ys.length-1)*COL;
  const P={}; Object.keys(nodes).forEach(id=>{ const n=nodes[id]; P[id]={l:PAD+ys.indexOf(n.y)*COL, t:40+(Math.min(90,Math.max(10,n.x))-10)/80*(H-116)}; });
  return {P,W,H};
}
function nodeColor(n){ return n.t==="echo"?EMO[n.e].c:{entree:"#9a8fb8",carrefour:"#6a9ad8",sanctuaire:"#5cc08a",enigme:"#b48cff",coeur:"#ff7eb6"}[n.t]||"#9a8fb8"; }
function miniMap(){
  const D=U.dawn, d=CL[D.x.k], M=dmap(), nodes=M.nodes, L=hlayout(nodes), P=L.P;
  const next = D.node ? nodes[D.node].nx : [M.start];
  let paths="";
  Object.keys(nodes).forEach(id=>{ nodes[id].nx.forEach(t=>{ const a=P[id], b=P[t], mx=(a.l+b.l)/2;
    const walked=D.visited.includes(id)&&D.visited.includes(t), open=id===D.node&&next.includes(t);
    paths+=`<path d="M${a.l},${a.t} C${mx},${a.t} ${mx},${b.t} ${b.l},${b.t}" class="hp ${walked?"walked":open?"open":""}"/>`; }); });
  const from = P[D.prev||D.node||M.start];
  const legend=[["entree","Entrée"],["echo","Écho"],["carrefour","Carrefour"],["sanctuaire","Sanctuaire"],["enigme","Sans combat"],["coeur","Cœur"]];
  return `<div class="hmap-wrap"><div class="hmap-head"><span>Carte du Labyrinthe</span><span class="hmap-leg">${legend.map(([t,l])=>`<i style="--c:${nodeColor({t,e:"colere"})}"></i>${l}`).join("")}</span></div>
    <div class="hmap" id="map"><div class="hmap-in" style="width:${L.W}px;height:${L.H}px">
    <svg width="${L.W}" height="${L.H}">${paths}</svg>
    ${Object.keys(nodes).map(id=>{ const n=nodes[id], fog=fogged(id), c=nodeColor(n);
      const cls=[ "hn", n.t, D.visited.includes(id)&&id!==D.node?"done":"", id===D.node?"cur":"", next.includes(id)&&id!==D.node?"next":"", fog?"hfog":"" ].join(" ");
      const pick = (D.phase==="carrefour" && D.node && next.includes(id)) || (D.phase==="intro" && id===M.start);
      return `<div class="${cls}${pick?" pick":""}" ${pick?(D.phase==="intro"?`data-act="dStart"`:`data-act="goPath" data-t="${id}"`):""} style="left:${P[id].l}px;top:${P[id].t}px;--c:${fog?"#5a5270":c}"><div class="hic">${fog?"?":nodeIcon(n)}</div><div class="hnm">${fog?"???":n.n}</div></div>`; }).join("")}
    ${D.node?`<div class="explorer" id="explorer" style="left:${from.l}px;top:${from.t}px">${sprite(d.id,d.n,d.c,{anim:true})}</div>`:""}
    </div></div></div>`;
}
function mapFollow(){
  const D=U.dawn, M=dmap(), P=hlayout(M.nodes).P, id=D.node||M.start, to=P[id], el=document.getElementById("explorer"), box=document.getElementById("map");
  if(box) box.scrollLeft = Math.max(0, P[D.prev||id].l - box.clientWidth/2);
  requestAnimationFrame(()=>requestAnimationFrame(()=>{ if(el){ el.style.left=to.l+"px"; el.style.top=to.t+"px"; } if(box) box.scrollTo({left:Math.max(0,to.l-box.clientWidth/2+60),behavior:"smooth"}); }));
}
// Les souvenirs appartiennent à leur client : seuls les siens (et les étincelles du co-gérant) l'aident dans son labyrinthe.
function migrateFrags(){
  (S.fragments||[]).forEach(f=>{
    if(f.from && (CL[f.from] || COGS.some(c=>c.key===f.from))) return;
    const owner = Object.keys(CL).find(k=>(CL[k].frags||[]).some(x=>x.n===f.n));
    f.from = owner || S.cog || "cog";
  });
}
function ownFrag(f,k){ if(U.dawn && U.dawn.finale) return true; return f.from===k || !CL[f.from]; }
// Les conséquences des choix ne sont pas annoncées : on devine à partir de ce qu'on a appris
// (émotion de l'Écho, souvenir qui manque, mots-clés du comptoir). Un mauvais choix fait monter la Terreur.
function tutoRun(){ const D=U.dawn; return D && !D.pg && (D.x.k==="machopeur" || !S.dungeonTuto); }
function endRun(){
  const D=U.dawn, x=D.x, d=CL[x.k], st=S.clients[x.k];
  // les souvenirs restants de ce Labyrinthe s'évanouissent avec lui
  const left=(D.run||[]).filter(e=>e.id==="_x"&&e.cd&&e.cd.frag).map(e=>e.cd.frag);
  if(left.length){ S.fragments=S.fragments.filter(f=>!left.includes(f)); D.run=D.run.filter(e=>!(e.id==="_x"&&e.cd&&e.cd.frag)); }
  if(D.finale){ D.out = D.out==="apaise"?"apaise":"echec";
    D.endTxt = D.out==="apaise" ? `L'Ombre de la Faille se dissout. ${d.n} remonte les marches en souriant : toute la saison est remontée avec lui.` : `${d.n} remonte, épuisé. L'Ombre de la Faille s'est refermée sur elle-même… pour cette fois.`;
    D.phase="end"; jingle(D.out==="apaise"?"apaise":"triste"); renderDungeon(); return; }
  if(D.pg){ pgEndRun(); return; }
  S.dungeonTuto=true;
  if(U.night) U.night.out[x.k] = D.out==="apaise"?"Apaisé":D.out==="partiel"?"Retour partiel (reviendra)":"Rechute (reviendra)";
  if(D.out==="apaise") D.endTxt=`${d.n} a fait la paix avec son regret.`;
  else if(D.out==="partiel"){ st.state="partial"; st.carryOuv=2; st.carryTen=0; D.endTxt=`${d.n} remonte apaisé en partie. Il reviendra une prochaine nuit, plus ouvert.`; }
  else { st.state="rechute"; st.carryOuv=0; st.carryTen=2; D.endTxt=`${d.n} revient à la taverne plus fermé. Rien n'est perdu : il reviendra.`; }
  D.phase="end";
  jingle(D.out==="apaise"?"apaise":"triste");
  renderDungeon();
  cry(d.id, D.out==="apaise"?"":"sad", true);
}
