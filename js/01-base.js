"use strict";
/* =========================================================
   Tavern Keeper's Ledger — prototype jouable v0.1
   Projet de fan non commercial. Sprites et cris : PokeAPI.
   ========================================================= */

// ---------- Données ----------
const AURAS = {
  braise:{n:"Braise",v:"Courage",c:"#f08030"},
  racine:{n:"Racine",v:"Patience",c:"#78c850"},
  maree:{n:"Marée",v:"Empathie",c:"#6890f0"},
  lueur:{n:"Lueur",v:"Curiosité",c:"#f8d030"},
  ombre:{n:"Ombre",v:"Lucidité",c:"#705898"},
  brise:{n:"Brise",v:"Liberté",c:"#a8d8c8"}
};
const AURA_ORDER = ["braise","racine","maree","lueur","ombre","brise"];
const OPPOSITE = {braise:"maree",maree:"braise",racine:"brise",brise:"racine",lueur:"ombre",ombre:"lueur"};

const TALENTS = {
  flambee:{n:"Flambée",d:"Une fois par nuit, un verre flambé double l'effet de ses gelées."},
  infusion:{n:"Infusion lente",d:"Laisser reposer un verre (+1 PC) donne +1 Ouverture."},
  oreille:{n:"Oreille attentive",d:"« Se taire » révèle deux indices au lieu d'un."},
  question:{n:"Question juste",d:"Ta première relance de chaque client ne fait jamais monter la Tension."},
  masque:{n:"Masque",d:"Tu repères quand un client ment."},
  bavardage:{n:"Bavardage",d:"Les clients s'installent avec +1 Ouverture."}
};
const TENANCIERS = {
  braise:[{id:4,n:"Salamèche",t:"flambee",c:"#f08030"},{id:155,n:"Héricendre",t:"flambee",c:"#f08030"},{id:255,n:"Poussifeu",t:"flambee",c:"#f08030"},{id:390,n:"Ouisticram",t:"flambee",c:"#f08030"}],
  racine:[{id:152,n:"Germignon",t:"infusion",c:"#78c850"},{id:387,n:"Tortipouss",t:"infusion",c:"#78c850"},{id:1,n:"Bulbizarre",t:"infusion",c:"#78c850"},{id:252,n:"Arcko",t:"infusion",c:"#78c850"}],
  maree:[{id:158,n:"Kaiminus",t:"oreille",c:"#6890f0"},{id:258,n:"Gobou",t:"oreille",c:"#6890f0"},{id:7,n:"Carapuce",t:"oreille",c:"#6890f0"},{id:501,n:"Moustillon",t:"oreille",c:"#6890f0"}],
  lueur:[{id:25,n:"Pikachu",t:"question",c:"#f8d030"},{id:133,n:"Évoli",t:"question",c:"#c8a070"},{id:447,n:"Riolu",t:"question",c:"#6890c0"},{id:37,n:"Goupix",t:"question",c:"#e07038"}],
  ombre:[{id:570,n:"Zorua",t:"masque",c:"#705898"},{id:92,n:"Fantominus",t:"masque",c:"#705898"},{id:228,n:"Malosse",t:"masque",c:"#504848"},{id:607,n:"Funécire",t:"masque",c:"#e8e8f0"}],
  brise:[{id:276,n:"Nirondelle",t:"bavardage",c:"#a8b8d8"},{id:572,n:"Chinchidou",t:"bavardage",c:"#c8c0b0"},{id:396,n:"Étourmi",t:"bavardage",c:"#a08870"},{id:333,n:"Tylton",t:"bavardage",c:"#88c8f0"}]
};
const COGS = [
  {key:"tarsal",id:280,n:"Tarsal",aura:"braise",c:"#e8a0c8",p:"Fourneau vif",pd:"Préparer un verre coûte 1 PC de moins.",line:"Je… je ressens les émotions des gens. C'est utile dans une taverne, non ?"},
  {key:"marcacrin",id:220,n:"Marcacrin",aura:"racine",c:"#a8784a",p:"Flair",pd:"Révèle un ingrédient apprécié de chaque client dès son arrivée.",line:"Je trouve toujours ce que les gens aiment manger. Toujours."},
  {key:"otaria",id:86,n:"Otaria",aura:"maree",c:"#c8e0f0",p:"Épaule mouillée",pd:"La première hausse de Tension due à un verre, chaque nuit, est ignorée.",line:"Un verre raté ? Ça arrive ! On rit et on recommence."},
  {key:"pichu",id:172,n:"Pichu",aura:"lueur",c:"#f8e060",p:"Étincelle",pd:"+1 Fragment de Mémoire chaque fois qu'une âme est apaisée.",line:"Je peux rester debout toute la nuit ! Enfin… presque."},
  {key:"sorbebe",id:582,n:"Sorbébé",aura:"ombre",c:"#c8e8f8",p:"Lire entre les lignes",pd:"Affiche les mensonges dans les confidences.",line:"Je ne parle pas beaucoup. Mais j'entends quand on ment."},
  {key:"pifeuil",id:273,n:"Pifeuil",aura:"brise",c:"#a87848",p:"Courant d'air",pd:"Une fois par nuit, renvoie un client sans pénalité : il reviendra tel quel.",line:"Si un client est de trop, je sais faire un courant d'air. Poliment."}
];
const COG_MIDNIGHT = {
  tarsal:"Je… je sens quelque chose derrière la porte. Beaucoup de tristesse. Beaucoup trop.",
  marcacrin:"Ça sent… la pluie, le vieux bois et… les souvenirs ? Ça se mange, les souvenirs ?",
  otaria:"Ha ha ! La porte est violette ! C'est normal, ça ? C'est normal, hein ?",
  pichu:"Pi… Pichu ! La porte brille ! On se cache sous le comptoir ? Non ? D'accord…",
  sorbebe:"…Hector ne nous a pas tout dit.",
  pifeuil:"Un courant d'air froid. Il vient d'ailleurs. De très loin."
};

const GEL_BASE = 15;
function gelPrice(){ return Math.round(GEL_BASE*((typeof S!=="undefined"&&S&&S.staff&&staffOn("psykokwak"))?0.8:1)); }
const ESS = {
  normal:{n:"Gelée Blanche",c:"#f2efe6",ty:"Normal"}, feu:{n:"Gelée Rouge",c:"#e8463a",ty:"Feu"}, eau:{n:"Gelée Bleue",c:"#4a86e8",ty:"Eau"},
  combat:{n:"Gelée Orange",c:"#f08a2a",ty:"Combat"}, psy:{n:"Gelée Rose",c:"#f478b8",ty:"Psy"}, vol:{n:"Gelée Ciel",c:"#8fd0f8",ty:"Vol"}
};
const ING = {
  eau:{n:"Eau Fraîche",cat:"base",force:0,price:0,sell:40,c:"#bfe3f2",free:true,item:"fresh-water",d:"Neutre et gratuite"},
  lait:{n:"Lait Meumeu",cat:"base",force:1,price:50,sell:60,c:"#fff6e4",item:"moomoo-milk",d:"Doux et réconfortant"},
  soda:{n:"Soda Cool",cat:"base",force:1,price:45,sell:55,c:"#9fe0f0",item:"soda-pop",d:"Pétillant : délie la langue, mais énerve un peu"},
  limonade:{n:"Limonade",cat:"base",force:1,price:55,sell:65,c:"#f6f0a0",item:"lemonade",d:"Acidulée : réveille un client abattu"},
  liqueur:{n:"Liqueur de Baie Ceriz",cat:"base",force:3,price:90,sell:90,c:"#c0303a",d:"Forte : réchauffe… parfois trop"},
  oran:{n:"Baie Oran",cat:"baie",price:30,c:"#3a7bd5",item:"oran-berry",d:"Apaise"},
  sitrus:{n:"Baie Sitrus",cat:"baie",price:80,c:"#f2d43a",item:"sitrus-berry",d:"Apaise beaucoup"},
  ceriz:{n:"Baie Ceriz",cat:"baie",price:30,c:"#d8343a",item:"cheri-berry",d:"Donne du cran"},
  mago:{n:"Baie Mago",cat:"baie",price:40,c:"#e88ac0",item:"mago-berry",d:"Goût d'enfance"},
  kika:{n:"Baie Kika",cat:"baie",price:40,c:"#e8c040",item:"persim-berry",d:"Délie une confidence"},
  fraive:{n:"Baie Fraive",cat:"baie",price:40,c:"#68c8d8",item:"rawst-berry",d:"Évite la gueule de bois"},
  framby:{n:"Baie Framby",cat:"baie",price:30,c:"#e04870",item:"razz-berry",d:"Adoucit un verre fort"},
  figuy:{n:"Baie Figuy",cat:"baie",price:40,c:"#a050c0",item:"figy-berry",d:"Épicée : plaît aux combattants"},
  wiki:{n:"Baie Wiki",cat:"baie",price:40,c:"#6a58c8",item:"wiki-berry",d:"Calme les nerfs"},
  pommesucree:{n:"Pomme Sucrée",cat:"fruit",price:70,c:"#e8c048",item:"sweet-apple",d:"Nostalgie douce : touche ceux qui ont perdu quelqu'un"},
  pommeacide:{n:"Pomme Acidulée",cat:"fruit",price:70,c:"#9ac838",item:"tart-apple",d:"Pique l'orgueil : relève ceux qui ont perdu"},
  menthe:{n:"Feuille Menthe",cat:"garn",price:25,c:"#58b868",d:"Rafraîchit et apaise"},
  plume:{n:"Plume Envol",cat:"garn",price:35,c:"#e8e8f8",item:"pretty-wing",d:"Délie la langue"},
  miel:{n:"Miel",cat:"garn",price:60,c:"#f0a830",item:"honey",d:"Adoucit un verre fort"},
  petitchampi:{n:"Petit Champi",cat:"garn",price:35,c:"#c89868",item:"tiny-mushroom",d:"Rassasie : le client reste un peu plus"},
  grochampi:{n:"Gros Champi",cat:"garn",price:90,c:"#a86838",item:"big-mushroom",d:"Très nourrissant : le client reste plus longtemps"},
  poudre:{n:"Poudre Éclat",cat:"garn",price:100,c:"#f8e8a0",item:"stardust",d:"Euphorie : risqué"},
  gateau:{n:"Vieux Gâteau",cat:"garn",price:250,c:"#c8905a",item:"old-gateau",d:"Fait tout oublier… même la colère"},
  // --- nouveautés de la saison 2 (chaque nouvelle saison, Kecleon reçoit 2 à 4 ingrédients de plus)
  the:{n:"Thé de Safrania",cat:"base",force:0,price:35,sell:55,c:"#c89a5a",season:2,d:"Infusion chaude : fait baisser la Tension, sans délier la langue"},
  pecha:{n:"Baie Pêcha",cat:"baie",price:35,c:"#f0a0b8",item:"pecha-berry",season:2,d:"Douceur : un verre raté ne fâche pas le client"},
  mepo:{n:"Baie Mepo",cat:"baie",price:45,c:"#e05830",item:"leppa-berry",season:2,d:"Regain : le Tenancier récupère 2 PC en la servant"},
  biscuit:{n:"Biscuit Lava",cat:"garn",price:55,c:"#d87838",item:"lava-cookie",season:2,d:"Croustillant : le client reste un échange de plus"},
  // --- nouveautés de la saison 3 (La saison des pluies)
  jusbaie:{n:"Jus de Baie",cat:"base",force:0,price:40,sell:60,c:"#c85a8a",item:"berry-juice",season:3,d:"Doux et fruité : les âmes de la Perte s'y retrouvent (+1 Ouverture)",
    fx:x=>x.def.family==="Perte"?{ouv:1,note:"Le Jus de Baie a un goût de souvenir heureux."}:{}},
  pomroz:{n:"Baie Pomroz",cat:"baie",price:45,c:"#e04850",item:"pomeg-berry",season:3,d:"Chagrin partagé : +1 Ouverture si le client est tendu (Tension 2 ou plus)",
    fx:x=>x.cur&&x.cur.ten>=2?{ouv:1,note:"Baie Pomroz : un chagrin partagé délie la langue."}:{}},
  glace:{n:"Glace Volute",cat:"garn",price:50,c:"#f0e8d0",item:"casteliacone",season:3,d:"Fraîcheur : efface la gueule de bois, et le client reste un échange de plus",
    fx:()=>({hang:-2,turns:1,note:"Glace Volute : un peu de fraîcheur, et la visite dure un peu plus."})},
  // --- nouveautés de la saison 4
  grena:{n:"Baie Grena",cat:"baie",price:40,c:"#f0a0b8",item:"grepa-berry",season:4,d:"Douceur : -1 Tension pour les âmes de la Perte",
    fx:x=>x.def.family==="Perte"?{ten:-1,note:"Baie Grena : une douceur qui apaise le chagrin."}:{}},
  coeursucre:{n:"Cœur Sucré",cat:"garn",price:65,c:"#f06090",item:"sweet-heart",season:4,d:"Attention touchante : +1 Ouverture si le client a déjà 2 cœurs d'affinité ou plus",
    fx:x=>S.clients[x.k]&&S.clients[x.k].aff>=2?{ouv:1,note:"Cœur Sucré : une attention qui touche."}:{}},
  // --- nouveautés de la saison 5 (Les métamorphoses)
  pierrestase:{n:"Pierre Stase",cat:"garn",price:60,c:"#9a9a8a",item:"everstone",season:5,d:"Rester soi-même est permis : -2 Tension pour les âmes de l'Évolution manquée",
    fx:x=>x.def.family==="Évolution manquée"?{ten:-2,note:"Pierre Stase : rester soi-même, c'est permis."}:{}},
  superbonbon:{n:"Super Bonbon",cat:"garn",price:50,c:"#5a8ad8",item:"rare-candy",season:5,d:"Pousse à grandir : +1 Ouverture, mais +1 Tension (+2 pour l'Évolution manquée)",
    fx:x=>({ouv:1,ten:x.def.family==="Évolution manquée"?2:1,note:"Super Bonbon : ça pousse à grandir… peut-être trop vite."})},
  poudremetal:{n:"Poudre Métal",cat:"garn",price:45,c:"#b8b8c8",item:"metal-powder",season:5,d:"Garde la forme : +1 Ouverture si le client s'est déjà confié au moins une fois",
    fx:x=>x.cur&&x.cur.stage>=1?{ouv:1,note:"Poudre Métal : il se sent assez solide pour continuer."}:{}},
  // --- nouveautés de la saison 6
  baieprine:{n:"Baie Prine",cat:"baie",price:55,c:"#90d870",item:"lum-berry",season:6,d:"Guérit un peu de tout : efface la gueule de bois, et -1 Tension si le client est très tendu (3 ou plus)",
    fx:x=>({hang:-2,ten:x.cur&&x.cur.ten>=3?-1:0,note:"Baie Prine : un peu de tout qui va mieux."})},
  eaumystique:{n:"Eau Mystique",cat:"garn",price:50,c:"#5ab0e8",item:"mystic-water",season:6,d:"Une goutte du large : +1 Ouverture pour une âme qui revient (2e visite ou plus)",
    fx:x=>S.clients[x.k]&&S.clients[x.k].visits>=2?{ouv:1,note:"Eau Mystique : comme une vague familière."}:{}},
  // --- nouveautés de la saison 7 (La fête de Bourg-Brume)
  bonbonfete:{n:"Bonbon Fête",cat:"garn",price:45,c:"#e85878",item:"rage-candy-bar",season:7,d:"Un goût de fête foraine : +1 Ouverture pour les âmes de la Solitude",
    fx:x=>x.def.family==="Solitude"?{ouv:1,note:"Bonbon Fête : le goût d'un jour où l'on n'était pas seul."}:{}},
  galette:{n:"Galette de Fête",cat:"garn",price:60,c:"#e0b060",item:"lumiose-galette",season:7,d:"À partager : le client reste un échange de plus, et -1 Tension pour les âmes de la Solitude",
    fx:x=>({turns:1,ten:x.def.family==="Solitude"?-1:0,note:"Galette de Fête : une part pour toi, une part pour moi."})},
  // --- nouveautés de la saison 8 (la fête)
  malasada:{n:"Grosse Malasada",cat:"garn",price:55,c:"#e0a050",item:"big-malasada",season:8,d:"Beignet de fête : +1 Ouverture pour une âme qui ne s'est encore jamais confiée",
    fx:x=>x.cur&&x.cur.stage===0?{ouv:1,note:"Grosse Malasada : un beignet chaud, ça délie la langue."}:{}},
  craquiroc:{n:"Craquiroc",cat:"garn",price:40,c:"#a89070",item:"pewter-crunchies",season:8,d:"Croquant et rassurant : -1 Tension pour tout le monde",
    fx:()=>({ten:-1,note:"Craquiroc : ça croque, ça rassure."})},
  // --- nouveautés de la saison 9 (Le secret d'Hector)
  runesort:{n:"Rune Sort",cat:"garn",price:55,c:"#8a68b8",item:"spell-tag",season:9,d:"Parle aux fantômes : +1 Ouverture pour les âmes de l'Inachevé",
    fx:x=>x.def.family==="Inachevé"?{ouv:1,note:"Rune Sort : quelque chose d'ancien se réveille en lui."}:{}},
  runepurif:{n:"Rune Purif",cat:"garn",price:50,c:"#e8e0c0",item:"cleanse-tag",season:9,d:"Chasse les ombres : -1 Tension, et -1 de plus si le client est très tendu (3 ou plus)",
    fx:x=>({ten:x.cur&&x.cur.ten>=3?-2:-1,note:"Rune Purif : l'air devient plus léger."})}
};
function ingOk(k){ return (ING[k].season||1) <= ((typeof S!=="undefined"&&S&&S.season)||1); }
const SEASON_NEW = {2:["the","pecha","mepo","biscuit"],3:["jusbaie","pomroz","glace"],4:["grena","coeursucre"],5:["pierrestase","superbonbon","poudremetal"],6:["baieprine","eaumystique"],7:["bonbonfete","galette"],8:["malasada","craquiroc"],9:["runesort","runepurif"]};
const BASES = ["eau","lait","soda","limonade","liqueur","the"];
const CRUSH = k => ING[k] && (ING[k].cat==="baie" || ING[k].cat==="fruit");
const EMO = {
  joie:{n:"Joie",c:"#ffd84a",i:"☀"}, colere:{n:"Colère",c:"#f06048",i:"✹"}, peur:{n:"Peur",c:"#9a7bff",i:"☾"},
  tristesse:{n:"Tristesse",c:"#6aa8f0",i:"☂"}, nostalgie:{n:"Nostalgie",c:"#f0a8c8",i:"❀"}
};
const COUNTERS = {joie:["colere","tristesse"],nostalgie:["peur","tristesse"],colere:["peur"],tristesse:["colere"],peur:[]};




// Ordre d'arrivée des âmes (toutes saisons)
const CLIENT_ORDER = ["machopeur", "ponchiot", "magicarpe", "psykokwak", "rondoudou", "leveinard", "ronflex", "tiplouf", "canarticho", "goupix", "hypotrempe", "osselait", "lokhlass", "kangourex", "lucario", "absol", "granivol", "apireine", "metamorph", "insecateur", "kadabra", "chrysacier", "ramoloss", "embrylex", "parasect", "ecremeuh", "tropius", "arcanin", "branette", "kecleon", "mimiqui", "miaouss", "dracolosse", "spiritomb", "muciole", "demolosse"];
