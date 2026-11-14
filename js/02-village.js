// Petites conversations et moments au torchon (sous-texte + didascalies)



// Commandes possibles des villageois : base + ingrédients demandés
const ORDERS = {
  cadoizo:[{base:"the",add:[]},{base:"the",add:["biscuit"]},{base:"the",add:["miel"]}],
  racaillou:[{base:"lait",add:[]},{base:"lait",add:["petitchampi"]},{base:"soda",add:["figuy"]}],
  melofee:[{base:"lait",add:["miel"]},{base:"limonade",add:["mago"]},{base:"eau",add:["framby","miel"]}],
  chaglam:[{base:"eau",add:["menthe"]},{base:"limonade",add:["menthe"]},{base:"soda",add:["wiki"]}],
  wattouat:[{base:"lait",add:[]},{base:"lait",add:["miel"]},{base:"the",add:["poudremetal"]}],
  mysdibule:[{base:"soda",add:[]},{base:"soda",add:["poudre"]},{base:"limonade",add:["superbonbon"]}],
  chetiflor:[{base:"the",add:[]},{base:"eau",add:["racine"]},{base:"the",add:["petitchampi"]}],
  ponyta:[{base:"eau",add:[]},{base:"eau",add:["pommesucree"]},{base:"soda",add:["plume"]}],
  sorbebe:[{base:"limonade",add:[]},{base:"limonade",add:["glace"]},{base:"eau",add:["fraive"]}],
  marill:[{base:"soda",add:[]},{base:"soda",add:["oran"]},{base:"eau",add:["pecha"]}],
  chuchmur:[{base:"the",add:[]},{base:"the",add:["miel"]},{base:"the",add:["ceriz"]}],
  nounourson:[{base:"jusbaie",add:[]},{base:"jusbaie",add:["miel"]},{base:"lait",add:["miel"]}]
};
const ART = {the:"un Thé de Safrania",eau:"une Eau Fraîche",lait:"un Lait Meumeu",soda:"un Soda Cool",limonade:"une Limonade",liqueur:"une Liqueur de Baie Ceriz"};
function orderAsk(v){ const o=orderText(U.order);
  if(v.key==="pijako") return `Pijako veut <b>${o}</b> ! Pijako veut <b>${o}</b> !`;
  if(v.key==="melofee") return `Je voudrais <b>${o}</b>, s'il vous plaît !`;
  if(v.key==="racaillou") return `Mets-moi <b>${o}</b>, et que ça tienne au corps !`;
  if(v.key==="chaglam") return `Ce sera <b>${o}</b>, mon chou.`;
  if(v.key==="wattouat") return `Bêêê… <b>${o}</b>, s'il te plaît, quelque chose de chaud !`;
  if(v.key==="mysdibule") return `Pour moi, <b>${o}</b> ! Et ne lésine pas sur le sucre.`;
  if(v.key==="chetiflor") return `<b>${o[0].toUpperCase()+o.slice(1)}</b>… doucement, s'il te plaît.`;
  if(v.key==="cadoizo") return `Vite, <b>${o}</b> ! J'ai encore toute la tournée !`;
  if(v.regular){ const d=CL[v.regular]; return ["ponchiot","magicarpe","rondoudou","goupix","hypotrempe","leveinard"].includes(v.regular) ? `Je voudrais bien <b>${o}</b>, s'il te plaît.` : `<b>${o[0].toUpperCase()+o.slice(1)}</b>, s'il te plaît.`; }
  return `Je voudrais <b>${o}</b>, s'il te plaît.`; }
function orderText(o){ return o ? ART[o.base] + (o.add.length ? ", avec " + o.add.map(k=>"un peu de "+ING[k].n).join(" et ") : "") : "n'importe quoi"; }
const FAV = {
  cadoizo:{n:"le Thé du Facteur",base:"the",add:["biscuit","miel"],say:"<i>Il lisse ses plumes en douce.</i> Mon péché mignon, c'est le Thé du Facteur : un Thé de Safrania avec un Biscuit Lava et du Miel. De quoi tenir toute la tournée !"},
  racaillou:{n:"le Lait du Carrier",base:"lait",add:["grochampi"],say:"<i>Il se gratte la tête, et un peu de gravier tombe.</i> Si un jour tu me fais un Lait Meumeu avec un Gros Champi… le Lait du Carrier, comme on dit à la carrière… je te laisse un sacré pourboire."},
  melofee:{n:"la Douceur de Lune",base:"lait",add:["miel","mago"],say:"<i>Elle joint les mains, rêveuse.</i> Ma boisson préférée, c'est la Douceur de Lune : un Lait Meumeu avec du Miel et de la Baie Mago. Si vous me la servez un jour, je serai la plus heureuse !"},
  chaglam:{n:"le Murmure",base:"soda",add:["menthe"],say:"<i>Elle baisse la voix, l'air complice.</i> Entre nous, mon vrai péché mignon, c'est le Murmure : un Soda Cool à la Feuille Menthe. Ça, ça vaut un gros pourboire."},
  wattouat:{n:"le Bol du Berger",base:"lait",add:["poudremetal","miel"],say:"<i>Sa laine crépite doucement, pleine d'électricité statique.</i> Chez nous, à la bergerie, on boit le Bol du Berger : un Lait Meumeu avec des Flocons d'Avoine et du Miel. Ça réchauffe jusqu'au bout de la laine !"},
  mysdibule:{n:"la Bombe Pétillante",base:"soda",add:["poudre","superbonbon"],say:"<i>Sa grande mâchoire arrière claque, gourmande.</i> Mon secret de pâtissière ? La Bombe Pétillante : un Soda Cool avec du Sucre Pétillant et un Super Bonbon. Ça pique la langue et ça fait rire !"},
  chetiflor:{n:"l'Infusion du Sous-Bois",base:"the",add:["racine","petitchampi"],say:"<i>Il se balance doucement, comme une fleur dans le vent.</i> Mon infusion préférée… l'Infusion du Sous-Bois. Un Thé de Safrania avec une Racine Énergie et un Petit Champi. Ça sent la forêt après la pluie."},
  ponyta:{n:"le Galop Doré",base:"eau",add:["plume","pommesucree"],say:"<i>Sa crinière de flammes se met à danser.</i> Avant chaque tournée de diligence, je bois le Galop Doré : de l'Eau Fraîche avec du Gingembre Confit et de la Pomme Sucrée. Ça donne des ailes aux sabots !"},
  sorbebe:{n:"le Sorbet Givré",base:"limonade",add:["glace","fraive"],say:"<i>Un petit flocon tombe de sa tête dans ton verre.</i> Oups ! Mon péché mignon, c'est le Sorbet Givré : une Limonade avec de la Glace Volute et de la Baie Fraive. Comme ma charrette à glaces, mais à boire !"},
  marill:{n:"la Bulle du Lac",base:"soda",add:["pecha","oran"],say:"<i>Elle fait rebondir sa queue en forme de bulle.</i> Moi, j'adore la Bulle du Lac ! Un Soda Cool avec de la Baie Pêcha et de la Baie Oran. Ça fait des bulles partout, comme quand je plonge !"},
  chuchmur:{n:"le Thé du Crieur",base:"the",add:["ceriz","plume"],say:"<i>Il prend une grande inspiration… puis se retient de crier.</i> (tout bas) Pour ma voix, je bois le Thé du Crieur : un Thé avec de la Baie Ceriz et du Gingembre Confit. Après, je peux annoncer les nouvelles jusqu'au bout du village !"},
  nounourson:{n:"le Pot de Miel",base:"jusbaie",add:["miel","muffin"],say:"<i>Il lèche sa patte pleine de miel, gêné.</i> Le Pot de Miel… c'est un Jus de Baies avec beaucoup de Miel et un Muffin dedans. Le boulanger dit que c'est trop sucré. Moi je dis que c'est parfait."},
  pijako:{n:"le Cocktail Perroquet",base:"limonade",add:["framby"],say:"<i>Il gonfle ses plumes.</i> Pijako adore Limonade et Baie Framby ! Limonade et Baie Framby !"}
};
// Boissons uniques de huit âmes : elles la confient à 3 cœurs d'affinité ; la leur servir rapporte un gros pourboire.
const SOUL_FAV = {
  ronflex:{n:"la Sieste Éternelle",base:"lait",add:["gateau","pommesucree"],say:"<i>Il bâille si fort que les verres tintent.</i> Tu veux savoir ? Le secret d'une bonne sieste… c'est la Sieste Éternelle. Un Lait Meumeu avec du Vieux Gâteau et de la Pomme Sucrée. Après ça… zzz… on dort comme un bébé."},
  rondoudou:{n:"la Berceuse Rose",base:"limonade",add:["kika","miel"],say:"<i>Elle fredonne tout bas.</i> Quand je chante, après, j'ai la gorge toute sèche. Alors je bois la Berceuse Rose : une Limonade avec de la Baie Kika et du Miel. C'est doux comme une chanson."},
  magicarpe:{n:"le Grand Saut",base:"soda",add:["oran","fraive"],say:"<i>Il fait un petit bond sur son tabouret.</i> Le Grand Saut ! Un Soda Cool avec de la Baie Oran et de la Baie Fraive. Ça pétille tellement qu'on a l'impression de pouvoir sauter jusqu'à la lune !"},
  goupix:{n:"la Flamme aux Six Queues",base:"liqueur",add:["mepo","ceriz"],say:"<i>Ses six queues frémissent.</i> Chez nous, au terrier, on se réchauffait avec la Flamme aux Six Queues : une Liqueur avec de la Baie Mepo et de la Baie Ceriz. Ça brûle un peu, et après on n'a plus jamais froid."},
  lokhlass:{n:"le Chant des Vagues",base:"eau",add:["glace","fraive"],say:"<i>Elle ferme les yeux, comme si elle entendait la mer.</i> Le Chant des Vagues. De l'Eau Fraîche, de la Glace Volute et de la Baie Fraive. Ça a le goût du large, le jour où j'ai retrouvé ma route."},
  ramoloss:{n:"la Grande Flemme",base:"the",add:["eaumystique","pommesucree"],say:"<i>Il met un très, très long moment à répondre.</i> … La Grande Flemme. Un Thé avec de l'Eau Mystique… et de la Pomme Sucrée. On la boit… lentement. Très lentement. C'est tout l'intérêt."},
  evoli:{n:"l'Arc des Évolutions",base:"limonade",add:["sitrus","pomroz","baieprine"],say:"<i>Ses oreilles se dressent, toutes contentes.</i> Mon préféré, c'est l'Arc des Évolutions ! Une Limonade avec de la Baie Sitrus, de la Baie Pomroz et de la Baie Prine. Trois couleurs, comme tous les chemins que je pourrai prendre un jour."},
  jirachi:{n:"le Vœu des Mille Ans",base:"jusbaie",add:["sable","coeursucre"],say:"<i>Ses petites bandelettes flottent doucement.</i> Une fois tous les mille ans, je bois le Vœu des Mille Ans : un Jus de Baies avec du Sablé et du Cœur Sucré. Mais pour toi… je veux bien en boire un peu plus souvent."}
};
function soulFavKnown(k){ return S.soulFav && S.soulFav[k]; }
// toutes les boissons fétiches, villageois et âmes
function anyFav(k){ return FAV[k] || SOUL_FAV[k]; }
function favKnown(k){ return S.villFav && S.villFav[k]; }
function orderShort(o){ return o ? [ING[o.base].n].concat(o.add.map(k=>ING[k].n)).join(" + ") : "n'importe quoi"; }
function orderMatch(o, d){ return !o || (d.base===o.base && o.add.every(k=>d.add.includes(k))); }
const VILLAGERS = [
  {key:"racaillou",id:74,n:"Racaillou",c:"#a89878",line:"<i>Il pose ses gros poings couverts de poussière de pierre sur le comptoir.</i> Salut, le nouveau ! Un truc qui tient au corps, la carrière m'a lessivé !",want:d=>d.base==="lait",ok:"<i>Il vide le verre d'un trait et tape du poing, ravi.</i> Ça, c'est du solide !",ko:"<i>Il fait la moue, ce qui chez un Racaillou fait tomber un peu de gravier.</i> Mouais. Ça tient pas trop au corps, ton truc."},
  {key:"melofee",id:35,n:"Mélofée",c:"#f8b8c8",line:"<i>Elle sautille sur place, une couronne de fleurs à la main.</i> Bonjour ! Quelque chose de doux, s'il vous plaît, c'est pour la fête de ce soir !",want:d=>d.add.includes("miel")||d.add.includes("mago"),ok:"<i>Elle tourne sur elle-même, les joues roses.</i> Délicieux ! Je reviendrai avec les autres !",ko:"<i>Elle trempe le bout de la langue et grimace poliment.</i> Hum… c'est pas très doux, ça."},
  {key:"chaglam",id:431,n:"Chaglam",c:"#9888b8",line:"<i>Elle s'installe en enroulant sa queue en spirale, l'œil brillant.</i> Une eau à la menthe, mon chou. Et je te raconte une rumeur.",want:d=>d.base==="eau"&&d.add.includes("menthe"),ok:"<i>Elle se penche vers toi, toutes moustaches dehors.</i> Parfait. Alors écoute bien…",ko:"<i>Elle repousse le verre du bout de la griffe.</i> C'est pas une eau à la menthe, ça. Tant pis pour la rumeur.",rumor:true},
  {key:"pijako",id:441,n:"Pijako",c:"#58a8d8",line:"<i>Il se pose sur le comptoir en battant des ailes, et renverse une serviette.</i> Pijako veut un verre ! Pijako veut un verre !",want:d=>true,ok:"<i>Il hoche la tête en rythme.</i> Pijako content ! Pijako a entendu un mot hier soir !",ko:"<i>Il ébouriffe ses plumes, vexé.</i> Pas la bonne boisson ! Pas la bonne boisson ! Pijako boude !",keyword:true},
  {key:"cadoizo",id:225,season:2,n:"Cadoizo",c:"#d84a3a",line:"<i>Il atterrit devant la porte dans un nuage de plumes rouges, sa sacoche pleine à craquer.</i> Courrier ! Courrier pour la taverne ! Et un thé, vite, j'ai encore toute la tournée !",want:d=>d.base==="the",ok:"<i>Il boit d'un trait et fouille sa sacoche.</i> Ah ! Il y a une lettre pour toi, justement.",ko:"<i>Il repose le verre, pressé.</i> Pas le temps de discuter, j'ai du courrier ! La lettre attendra demain.",letter:true}
,
  {key:"wattouat",id:179,season:5,n:"Wattouat",c:"#f0e8b0",line:"<i>Elle entre en trottinant, et sa laine fait se dresser les cheveux de tout le monde près de la porte.</i> Bêêê ! Bonjour ! Je descends de la bergerie sur la colline. Il fait froid, là-haut… Tu as quelque chose de chaud ?",want:d=>d.base==="lait"||d.base==="the",ok:"<i>Elle boit à petites gorgées, et sa laine se met à briller doucement.</i> Oh, ça réchauffe… Je vais faire des étincelles toute la journée !",ko:"<i>Elle frissonne.</i> Bêê… c'est un peu froid, ça. Tant pis, je garderai ma laine bien serrée."},
  {key:"mysdibule",id:303,season:5,n:"Mysdibule",c:"#a8a0a8",line:"<i>Elle pose sur le comptoir une boîte de petits gâteaux, et sa grande mâchoire arrière sourit toute seule.</i> Bonjour ! J'ai ouvert la pâtisserie près de la fontaine. J'ai goûté à tout le village, il me manquait ta taverne !",want:d=>d.base==="soda"||d.add.some(k=>["poudre","superbonbon","biscuit","gateau"].includes(k)),ok:"<i>Sa mâchoire arrière claque de plaisir.</i> Délicieux ! Je vais en faire un gâteau, de ce verre. Si si, je trouverai comment.",ko:"<i>Elle fait la moue, polie.</i> Pas assez sucré pour moi… mais je suis difficile, c'est le métier qui veut ça."},
  {key:"chetiflor",id:69,season:11,n:"Chétiflor",c:"#88c060",line:"<i>Il entre en se balançant comme une tige dans le vent, de la terre encore sur les racines.</i> Bonjour… Je m'occupe du jardin communal. Les fleurs vont bien. Moi, j'ai soif.",want:d=>d.base==="the"||d.base==="eau",ok:"<i>Ses feuilles se déplient d'un coup, toutes vertes.</i> Ahhh… comme une bonne pluie de printemps. Merci.",ko:"<i>Ses feuilles retombent un peu.</i> C'est… gentil. Mais les racines n'aiment pas trop ça."}
,
  // Après la fin : la renommée de la taverne attire de nouveaux habitants à Bourg-Brume
  {key:"ponyta",id:77,season:13,n:"Ponyta",c:"#f0a040",line:"<i>On entend un galop dans la rue, puis la porte s'ouvre sur une crinière de flammes.</i> Bonjour ! Je conduis la nouvelle diligence entre Bourg-Brume et la côte. Avec tous ces voyageurs, je n'arrête plus de galoper !",want:d=>d.base==="eau"||d.base==="soda",ok:"<i>Sa crinière flambe de plaisir.</i> Parfait ! Je repars à fond de train !",ko:"<i>Elle piaffe, un peu déçue.</i> Bon… ça ira pour une étape."},
  {key:"sorbebe",id:582,season:13,n:"Sorbébé",c:"#c8e8f8",line:"<i>Une petite charrette à glaces s'arrête devant la porte, et un minuscule cornet de glace entre en souriant.</i> Bonjour ! Je vends des glaces sur la place, maintenant qu'il y a du monde. Mais moi aussi, j'ai le droit d'avoir soif !",want:d=>d.base==="limonade"||d.add.includes("glace"),ok:"<i>De petits flocons tombent autour d'elle.</i> Rafraîchissant ! Je vais en faire un parfum de glace.",ko:"<i>Elle fond un tout petit peu.</i> C'est un peu chaud, pour moi…"},
  {key:"marill",id:183,season:13,n:"Marill",c:"#5890e0",line:"<i>Elle entre en rebondissant sur sa queue ronde comme une balle.</i> Coucou ! Je fais traverser le lac aux voyageurs, sur mon radeau. Ils me parlent tous de ta taverne, alors je suis venue voir !",want:d=>d.base==="soda"||d.base==="eau",ok:"<i>Elle rebondit de joie.</i> Ça pétille comme le lac au soleil !",ko:"<i>Ses oreilles se baissent.</i> Hmm… pas tout à fait ce que j'imaginais."},
  {key:"chuchmur",id:293,season:13,n:"Chuchmur",c:"#d8a8d0",line:"<i>Il entre sur la pointe des pieds… puis ne peut pas s'empêcher.</i> OYEZ, OYEZ ! … Pardon. Je suis le nouveau crieur public. Avec tous ces visiteurs, il faut bien quelqu'un pour annoncer les nouvelles.",want:d=>d.base==="the",ok:"<i>Il prend une grande inspiration.</i> EXCELLENT ! … pardon. Excellent.",ko:"<i>Il chuchote, vexé.</i> Bof. Ça ne fera pas une grande nouvelle."},
  {key:"nounourson",id:216,season:13,n:"Nounourson",c:"#b07040",line:"<i>Il entre en serrant contre lui un pot vide, la truffe pleine de farine.</i> B-bonjour… Je suis l'apprenti du nouveau boulanger. J'ai fini ma fournée. Est-ce que vous avez quelque chose… de sucré ?",want:d=>d.add.includes("miel")||d.base==="jusbaie",ok:"<i>Il serre son pot, les yeux brillants.</i> C'est sucré ! C'est trop bien !",ko:"<i>Il regarde le fond de son verre.</i> Il manque… du miel. Mais merci quand même."}
];
// Cadoizo, le facteur (saison 2) : il apporte les lettres des âmes apaisées


// Les âmes apaisées reviennent de jour, en habituées : les servir fait monter leur affinité.

const DAY_GUESTS = 2;
// Bibelots de saison : 1 au choix parmi 3 après chaque expédition, perdus à la fin de la saison
const BIBELOTS = {
  tasse:{n:"Tasse ébréchée d'Hector",i:"☕",d:"Le premier verre de chaque nuit ne coûte pas de PC"},
  clochette:{n:"Clochette de la Faille",i:"🔔",d:"Chaque client de nuit arrive avec +1 Ouverture"},
  tablier:{n:"Torchon brodé",i:"🧺",d:"Essuyer un verre fait baisser la Tension de 2 au lieu de 1"},
  lanterne:{n:"Lanterne de poche",i:"🏮",d:"+8 PV pour le client dans son Labyrinthe"},
  bocal:{n:"Bocal à pourboires",i:"🫙",d:"+20 % de pourboires"},
  carnet:{n:"Carnet de notes",i:"📓",d:"L'ombre du Cœur du Regret commence Vulnérable"},
  sablier:{n:"Sablier de sable fin",i:"⏳",d:"Chaque client de nuit reste un échange de plus"},
  bougie:{n:"Bougie parfumée",i:"🕯️",d:"+1 PC max"}
};
function bibIc(k){ return ARTOK['bib-'+k] ? `<img class="relimg" src="${artSrc('bib-'+k)}" alt="">` : BIBELOTS[k].i; }
function hasBib(k){ return (S.bibelots||[]).includes(k); }
function offerBibelot(next){
  const pool = shuffle(Object.keys(BIBELOTS).filter(k=>!hasBib(k))).slice(0,3);
  if(!pool.length){ next(); return; }
  U.bibNext = next;
  $app.innerHTML = `${hud()}<div class="pad scroll" style="flex:1;display:flex;flex-direction:column;gap:10px">
    <div class="px" style="color:var(--candle);font-size:18px">Un bibelot remonte du Labyrinthe</div>
    <p class="small muted" style="margin:0">En remontant, il a rapporté de petits objets oubliés. Garde-en un : il t'aidera jusqu'à la fin de la saison, puis disparaîtra.</p>
    ${pool.map(k=>`<button class="bibbtn" data-act="pickBib" data-k="${k}"><span class="bibi">${bibIc(k)}</span><span><b>${BIBELOTS[k].n}</b><br><small>${BIBELOTS[k].d}</small></span></button>`).join("")}
    ${(S.bibelots||[]).length?`<div class="small muted">Déjà sur l'étagère : ${S.bibelots.map(k=>bibIc(k)+" "+BIBELOTS[k].n).join(", ")}</div>`:""}
  </div>`;
}
function pickBib(k){ S.bibelots=S.bibelots||[]; if(!hasBib(k)) S.bibelots.push(k); save(); toast(`${BIBELOTS[k].n} rejoint l'étagère.`); const n=U.bibNext; U.bibNext=null; n&&n(); }

const QUESTIONS = [
  {q:"Un ami a triché pour gagner un concours. Que fais-tu ?",a:[["Je lui dis en face que ce n'est pas juste.","braise","ombre"],["Je lui demande pourquoi il en avait besoin.","maree","lueur"],["J'attends qu'il m'en parle de lui-même.","racine","maree"]]},
  {q:"Une tempête bloque la route du retour. Tu…",a:[["…fonces quand même, prudemment.","braise","brise"],["…trouves un abri et attends que ça passe.","racine","ombre"],["…en profites pour explorer un chemin inconnu.","lueur","brise"]]},
  {q:"Quelqu'un pleure seul sur un banc.",a:[["Je m'assois à côté, sans rien dire.","maree","racine"],["Je lui propose de marcher un peu.","brise","maree"],["Je me demande ce qui a pu lui arriver.","lueur","ombre"]]},
  {q:"On te confie un secret lourd à porter.",a:[["Je le garde, quoi qu'il arrive.","racine","ombre"],["J'aide la personne à trouver une solution.","braise","maree"],["Je me demande pourquoi elle me l'a confié, à moi.","lueur","ombre"]]},
  {q:"Ton plat préféré n'est plus servi nulle part.",a:[["Je cherche la recette pour le refaire moi-même.","lueur","braise"],["Je goûte autre chose, il y a tant à découvrir.","brise","lueur"],["Je garde le souvenir, c'est déjà beaucoup.","racine","maree"]]},
  {q:"Un inconnu te demande de l'argent pour prendre le train.",a:[["Je lui donne, on ne sait jamais.","maree","brise"],["Je lui achète le billet moi-même.","ombre","racine"],["Je lui demande où il va, par curiosité.","lueur","maree"]]},
  {q:"Tu perds un combat important.",a:[["Je m'entraîne deux fois plus.","braise","racine"],["Je cherche à comprendre ce qui n'a pas marché.","ombre","lueur"],["Je passe à autre chose, la vie continue.","brise","maree"]]},
  {q:"Une porte inconnue s'ouvre devant toi, la nuit.",a:[["J'entre.","braise","lueur"],["J'écoute d'abord ce qu'il y a derrière.","ombre","racine"],["Je la laisse ouverte, au cas où quelqu'un aurait besoin de sortir.","maree","brise"]]},
  {q:"Ton meilleur ami déménage loin.",a:[["Je l'aide à porter les cartons.","racine","maree"],["Je lui promets de venir le voir très vite.","braise","maree"],["Je me dis que je partirai aussi, un jour.","brise","lueur"]]},
  {q:"Quelqu'un se moque de toi en public.",a:[["Je réponds du tac au tac.","braise","brise"],["Je fais comme si je n'avais rien entendu.","racine","ombre"],["Je me demande ce qui le rend si méchant.","maree","ombre"]]},
  {q:"On t'offre un voyage, mais il faut partir ce soir.",a:[["Je fais mon sac tout de suite !","brise","braise"],["Je refuse, j'ai des choses à finir ici.","racine","ombre"],["Je demande où, et ensuite je décide.","lueur","ombre"]]},
  {q:"Un Pokémon sauvage blessé grogne quand tu approches.",a:[["Je recule et je le laisse respirer.","ombre","racine"],["Je lui parle doucement en m'approchant.","maree","braise"],["Je cours chercher quelqu'un qui saura le soigner.","lueur","racine"]]},
  {q:"Le soir, avant de dormir, tu penses surtout…",a:[["…à ce que je ferai demain.","braise","lueur"],["…aux gens que j'aime.","maree","racine"],["…aux endroits où j'aimerais être.","brise","lueur"]]},
  {q:"Tu trouves une lettre qui ne t'est pas adressée.",a:[["Je la remets à son destinataire.","racine","maree"],["Je la lis… juste un peu.","lueur","ombre"],["Je la laisse où elle est.","brise","ombre"]]},
  {q:"Il faut choisir entre la vérité et la paix.",a:[["La vérité, même si elle fait mal.","ombre","braise"],["La paix, si personne n'en souffre.","maree","racine"],["Ni l'une ni l'autre : je cherche une troisième voie.","lueur","brise"]]},
  {q:"Ta plus grande peur ?",a:[["Ne rien avoir accompli.","braise","lueur"],["Être seul.","maree","racine"],["Être enfermé.","brise","ombre"]]}
];

const FIN_Q = [
  {q:"Dis, patron… Pourquoi tu es venu à Bourg-Brume, au juste ?",a:["« Pour recommencer à zéro. »","« Je te raconterai un jour. Merci d'être là. »"],r:["Recommencer… Je connais ça. Moi aussi, j'ai laissé des choses derrière moi.","D'accord. Je serai là quand tu voudras en parler."]},
  {q:"Tu crois qu'Hector savait, pour la porte ?",a:["« Évidemment. Ce vieux farceur. »","« Peut-être qu'il avait ses raisons. »"],r:["Ha ! Il a dû bien rire. Un jour, on lui servira un verre très, très fort.","Ses raisons… Il avait l'air triste, en partant. Tu as remarqué ?"]},
  {q:"Tu as déjà eu un regret, toi ? Un vrai ?",a:["« Oui. Un seul, mais il pèse lourd. »","« Je préfère écouter les tiens, ce soir. »"],r:["…Merci de me le dire. On le portera à deux, si tu veux.","Les miens ? Un autre soir, peut-être. Mais merci de demander."]}
];
const HECTOR = {id:94,n:"Hector",c:"#705898"};
const KECLEON = {id:352,n:"Kecleon",c:"#88c060"};
const LIQ = {
  eau:"linear-gradient(#e4f6fd,#9fd3ea)",
  lait:"linear-gradient(#fffdf6,#efe2c8)",
  liqueur:"linear-gradient(#e8606a,#9a1f2a)",
  soda:"linear-gradient(#e2f8ff,#86d4ec)",
  limonade:"linear-gradient(#fff8b8,#f0d040)"
};
const NIGHTS_PER_SEASON = 7;
const MAX_GUESTS = 4; // âmes maximum par nuit
const MAX_TURNS = 6;
// Présages de la nuit : chaque nuit (sauf la première) tire un modificateur, visible à l'avance sur la carte de saison
const OMENS = {
  orage:{i:"🌩️",n:"Nuit d'orage",d:"Les âmes de l'Eau (Magicarpe, Psykokwak, Tiplouf) arrivent avec +1 Ouverture, mais la tempête coûte 2 PC."},
  lune:{i:"🌕",n:"Pleine lune",d:"Une âme peut se confier deux fois cette nuit, mais toutes arrivent avec +1 Tension."},
  fete:{i:"🎉",n:"Soir de fête",d:"Pourboires doublés, mais chaque âme reste un échange de moins (le village fait du bruit)."},
  calme:{i:"🕯️",n:"Nuit calme",d:"+3 PC, mais une âme de moins passe la porte."},
  brume:{i:"🌫️",n:"Brume de la Faille",d:"À l'aube, chaque âme descend avec +8 PV, mais la carte du Labyrinthe reste cachée par la brume."}
};
const WATER_SOULS = ["magicarpe","psykokwak","tiplouf"];
function omenFor(n){ S.omens=S.omens||{}; const key=`${S.season||1}-${n}`; if(n<=1) return null;
  if(!(key in S.omens)){ const ks=Object.keys(OMENS); const prev=S.omens[`${S.season||1}-${n-1}`]; let o; do{ o=ks[rnd(ks.length)]; }while(o===prev); S.omens[key]=o; }
  return S.omens[key]; }
function omen(){ return S.pg ? null : omenFor(S.night); }
const COMMANDS = {
  apaise:{n:"Apaiser 3 âmes",goal:3},
  perfect:{n:"Servir 3 verres parfaits",goal:3},
  fav:{n:"Servir 3 boissons fétiches aux villageois",goal:3},
  flawless:{n:"Gagner 3 combats sans perdre de PV",goal:3},
  legend:{n:"Obtenir 2 cartes légendaires",goal:2},
  money:{n:"Gagner 1 500 ₽",goal:1500},
  shop:{n:"Acheter 2 cartes chez Kecleon",goal:2},
  boss:{n:"Vaincre 2 Cœurs du Regret sans rechute",goal:2}
};
function ensureCommands(){ const se=S.season||1;
  if(!S.cmd || S.cmd.season!==se){ const ks=shuffle(Object.keys(COMMANDS)).slice(0,3); S.cmd={season:se, ids:ks, done:{}}; S.sc={apaise:0,perfect:0,fav:0,flawless:0,legend:0,shop:0,boss:0}; }
  return S.cmd; }
function cmdProgress(id){ if(id==="money") return seasonStats().earned; return (S.sc&&S.sc[id])||0; }
function scInc(key,n){ ensureCommands(); S.sc[key]=(S.sc[key]||0)+(n||1); checkCommands(); }
function checkCommands(){ const c=ensureCommands();
  c.ids.forEach(id=>{ if(!c.done[id] && cmdProgress(id)>=COMMANDS[id].goal){ c.done[id]=true; S.pages+=1; S.money+=60; toast(`Commande de la Faille accomplie : ${COMMANDS[id].n} ! +1 Page, +60 ₽`); jingle("apaise"); } }); }
function commandsHTML(){ const c=ensureCommands();
  return `<div class="px" style="color:var(--candle);margin-top:12px">Commandes de la Faille</div><p class="small muted" style="margin:2px 0 6px">Facultatives. Chacune rapporte 1 Page du Grand Registre et 60 ₽.</p>
    ${c.ids.map(id=>{ const C=COMMANDS[id], v=Math.min(cmdProgress(id),C.goal), dn=c.done[id]; return `<div class="small" style="margin-top:5px">${dn?"✅":"◻️"} <b>${C.n}</b> <span class="muted">(${id==="money"?`${v} / ${C.goal} ₽`:`${v}/${C.goal}`})</span><div class="cmdbar"><i style="width:${v/C.goal*100}%"></i></div></div>`; }).join("")}`; }
function confLimit(){ return omen()==="lune" ? 2 : CONF_PER_NIGHT; }
const CONF_NEEDED = 3; // confidences nécessaires (avec 5 d'Ouverture) pour gagner sa confiance
const CONF_PER_NIGHT = 1; // un client ne se confie qu'une fois par nuit : son histoire se raconte sur plusieurs visites
