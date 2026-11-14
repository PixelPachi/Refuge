// ---------- Équilibrage du coût des cartes ----------
// Les cartes trop fortes pour leur coût coûtent une énergie de plus (surtout des légendaires).
const COST_FIX = {
  // 1 → 2 : les très gros soins et les cartes qui font tout à la fois
  rubanlise:2, pactebrise:2, hectorpardon:2, lettrelivree:2, aurorepure:2, septjours:2, oeufsoin:2, gonflette:2,
  // 0 → 1
  hectorecoute:1, echangeprecieux:1, bolchaud:1,
  // 2 → 3
  arcenciel:3, hectorservice:3, droitdexister:3
};
Object.keys(COST_FIX).forEach(k=>{ if(CARDS[k]) CARDS[k].c=COST_FIX[k]; });
// Elles restent à 1 énergie, mais en un peu moins fort.
const STAT_FIX = {
  chantdularge:{draw:1}, dernierfruit:{heal:6,block:6}, unejournee:{block:6,elan:1}, millevisages:{draw:1}, onyvaensemble:{draw:1},
  vraiecouleur:{str:1}, troislongs:{block:9,heal:4}, unepiece:{dmg:8,block:5}, laitmaison:{heal:10}, calinvrai:{heal:5,block:8}
};
function flavorOf(d){ if(!d) return ""; let rest=d.replace(/^[^.]*\.\s*/,""); while(/^(Retenue|Épuise|Innée|Éphémère)\.\s*/.test(rest)) rest=rest.replace(/^(Retenue|Épuise|Innée|Éphémère)\.\s*/,""); return rest.trim(); }
Object.keys(STAT_FIX).forEach(k=>{ const c=CARDS[k]; if(!c) return; const flavor=flavorOf(c.d);
  Object.assign(c, STAT_FIX[k]); delete c.d; const auto=cardDesc(k); if(flavor) c.d=auto.replace(/\.?$/,".")+" "+flavor; });
