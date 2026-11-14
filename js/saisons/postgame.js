// ---------- Après la fin : les voyageurs des quatre coins du monde ----------
// La renommée de la taverne a franchi les mers. Ces clients ne viennent qu'après la saison 12, en journée.
// Ils ne portent pas de regret : ils viennent boire, raconter, et s'attacher. Leur affinité donne une carte (2 cœurs) et un artefact (5 cœurs).
const WORLD = {
  momartik:{id:478,n:"Momartik",fem:true,c:"#e8f0f8",from:"le Grand Nord",role:"Gardienne des cols enneigés",
    order:{base:"lait",add:["miel"]},
    intro:"<i>La porte s'ouvre sur un courant d'air glacé. Elle flotte jusqu'au comptoir, et quelques flocons fondent sur le bois.</i> Bonjour. Là-haut, dans les cols du Nord, je guide les voyageurs perdus dans le blizzard. Tous ceux que j'ai ramenés parlaient d'une taverne à Bourg-Brume où l'on retrouve son chemin. Je voulais la voir de mes yeux.",
    tales:["Là-haut, la nuit dure six mois. On apprend à chanter pour ne pas oublier sa propre voix.","Les gens ont peur de moi, dans la tempête. Ils croient que je viens les emporter. Je viens seulement leur montrer le refuge.","Une petite Stalgamin m'a demandé de te dire bonjour. Elle a entendu parler de toi jusqu'au bout de la banquise."],
    ok:"<i>Elle tient le verre chaud entre ses mains froides, longtemps, avant de boire.</i> C'est la première fois depuis des années que j'ai chaud aux doigts. Merci.",
    ko:"<i>Elle sourit poliment.</i> Ce n'est pas ce que j'avais demandé. Mais tu as les mains gelées, toi aussi. On fait tous de notre mieux.",
    card:"chantglaces", gift:{key:"conque",n:"Clochette des Neiges",i:"🔔",d:"Commence chaque combat avec 6 de Bouclier",fx:{combatStart:(C)=>{ C.blockNext=(C.blockNext||0)+6; }}}},
  mammochon:{id:473,n:"Mammochon",c:"#8a6a4a",from:"les steppes du Nord",role:"Vieux marcheur",
    order:{base:"the",add:["gateau"]},
    intro:"<i>Le plancher grince sous son poids. Il s'assoit lentement, avec un soupir de vieux voyageur.</i> J'ai marché quarante jours. Les jeunes de mon troupeau disaient que j'étais trop vieux pour la route. Je voulais leur prouver le contraire. Et goûter ton thé.",
    tales:["Mon arrière-grand-père a vu la glace couvrir le monde. Moi, j'ai vu la glace fondre. Le monde change, petit. Les tavernes restent.","Sur la route, j'ai croisé un Grolem qui pleurait parce qu'il avait perdu son chemin. Je lui ai dit : tout droit jusqu'à Bourg-Brume. Il viendra peut-être.","Mes défenses sont lourdes, mais elles m'ont toujours protégé. Je crois qu'il faut savoir porter ce qui nous rend fort."],
    ok:"<i>Il hoche la tête, très lentement.</i> Voilà un thé qui a de la patience. Comme moi.",
    ko:"<i>Il repose la tasse.</i> Hm. Ce n'est pas le thé de mes steppes. Je reviendrai. J'ai tout le temps.",
    card:"pietinement", gift:{key:"defensegivre",n:"Défense de Givre",i:"🦣",d:"+10 PV dans chaque donjon",fx:{hp:10}}},
  ludicolo:{id:272,n:"Ludicolo",c:"#e0c040",from:"les îles du Sud",role:"Danseur de la pluie",
    order:{base:"limonade",add:["framby"]},
    intro:"<i>Il entre en dansant, un sombrero de feuilles sur la tête, et fait trois tours sur lui-même avant de s'asseoir.</i> Olé ! Les îles du Sud parlent de toi, amigo ! Une taverne où on écoute les tristes… Moi, je ne suis pas triste ! Mais j'ai soif !",
    tales:["Chez moi, quand il pleut, on danse. Quand il fait soleil, on danse. Quand on est triste… on danse encore plus fort !","Ma grand-mère disait : un cœur qui danse ne peut pas rouiller. Je crois qu'elle avait raison.","J'ai appris un pas de danse aux villageois, ce matin. Le vieux Racaillou s'est presque cassé en deux, mais il riait !"],
    ok:"<i>Il se met à taper du pied en rythme.</i> ¡Delicioso ! Ce verre a du rythme, amigo !",
    ko:"<i>Il s'arrête de danser une seconde.</i> Pas mon verre… mais pas grave ! On danse quand même !",
    card:"sambapluie", gift:{key:"maracas",n:"Maracas Feuillues",i:"🪇",d:"Soigne 2 PV au début de chaque tour",fx:{turnStart:(C,D)=>{ D.hp=Math.min(D.maxhp,D.hp+2); }}}},
  brutalibre:{id:701,n:"Brutalibré",c:"#4a9a5a",from:"Alola, tout au sud",role:"Lutteur masqué",
    order:{base:"soda",add:["oran"]},
    intro:"<i>Il entre en sautant par-dessus le seuil, atterrit en posant un genou à terre, et lève les bras comme sous des projecteurs.</i> ¡HOLA! Le grand Brutalibré, champion des rings d'Alola, est venu goûter la boisson légendaire de Bourg-Brume !",
    tales:["Sur le ring, je porte un masque. Tout le monde croit que c'est pour faire peur. En vrai, c'est parce que je suis timide.","Mon premier combat, je l'ai perdu en dix secondes. Le public a ri. J'ai appris à tomber avec style. Depuis, on rit avec moi.","Si un jour tu veux apprendre une prise, patron, tu sais où me trouver. Enfin… sur le toit de la taverne, sûrement."],
    ok:"<i>Il lève le verre bien haut, comme un trophée.</i> ¡VICTORIA! Un verre digne d'un champion !",
    ko:"<i>Il fait semblant de tomber dans les cordes.</i> Aïe, aïe ! Un coup bas ! …Je plaisante. Merci quand même.",
    card:"plongeoncatch", gift:{key:"masquelutte",n:"Masque de Lutteur",i:"🎭",d:"+1 Force au début de chaque combat",fx:{combatStart:(C)=>{ C.str+=1; }}}},
  charmina:{id:308,n:"Charmina",fem:true,c:"#d85a6a",from:"les montagnes de l'Est",role:"Moniale de la méditation",
    order:{base:"the",add:["menthe"]},
    intro:"<i>Elle s'arrête sur le seuil, ferme les yeux et respire très lentement, comme si elle écoutait quelque chose que personne n'entend.</i> Cette maison est calme. Tant de chagrins sont passés ici, et pourtant tout est calme. Je suis descendue de mon monastère pour comprendre comment.",
    tales:["Au monastère, on médite assise sur un seul doigt pendant des heures. Ici, je médite assise sur un tabouret. C'est presque plus difficile.","Mon maître disait : la force qui protège vaut mieux que la force qui frappe. Ce matin, j'ai pensé à toi.","Je médite chaque aube sur le toit de la taverne. Il y a un Brutalibré qui m'imite. Il ne tient jamais plus de deux minutes."],
    ok:"<i>Elle boit en silence, les yeux mi-clos.</i> Clair. Frais. Comme l'air au sommet du monde.",
    ko:"<i>Elle incline la tête.</i> Ce n'est pas le thé que j'attendais. Mais l'intention est juste.",
    card:"paume", gift:{key:"medaillon",n:"Chapelet de Méditation",i:"📿",d:"Pioche 1 carte de plus au premier tour de chaque combat",fx:{draw:(C)=>C.turn===1?1:0}}},
  zoroark:{id:571,n:"Zoroark",c:"#6a3a4a",from:"les forêts de l'Est",role:"Conteur d'illusions",
    order:{base:"jusbaie",add:["figuy"]},
    intro:"<i>Un vieux Ramoloss entre, commande, puis éclate de rire… et sa forme se défait en une longue crinière rouge et noire.</i> Pardon, pardon. Une vieille habitude. Je suis conteur. On raconte que dans ta taverne, les histoires changent ceux qui les écoutent. Je voulais vérifier.",
    tales:["Une illusion, c'est un mensonge qui fait du bien quelques secondes. Une histoire, c'est un mensonge qui fait du bien toute une vie.","J'ai pris l'apparence de ton co-gérant, hier soir. Personne n'a rien remarqué. Sauf toi. Tu m'as regardé longtemps, puis tu as souri.","Dans ma forêt, les petits Zorua me demandent l'histoire du Tenancier qui écoutait les fantômes. Je l'enrichis un peu chaque fois."],
    ok:"<i>Il lève le verre et, l'espace d'un instant, le liquide prend toutes les couleurs.</i> Parfait. Même moi, je n'aurais pas su faire une si belle illusion.",
    ko:"<i>Il plisse les yeux.</i> Hm. On dirait ce que j'ai commandé… mais ce n'est pas ce que j'ai commandé. Tu apprends vite, toi.",
    card:"illusion", gift:{key:"voileillusion",n:"Voile d'Illusion",i:"🦊",d:"L'ombre commence chaque combat Faible 2",fx:{combatStart:(C,en)=>{ en.weak=(en.weak||0)+2; }}}},
  gardevoir:{id:282,n:"Gardevoir",fem:true,c:"#5ab878",from:"Kalos, à l'ouest",role:"Cantatrice",
    order:{base:"lait",add:["pommesucree"]},
    intro:"<i>Elle entre comme on entre en scène, la robe effleurant le plancher. Puis elle aperçoit ton co-gérant et lui fait une petite révérence.</i> Bonsoir. Pardon : bonjour. À l'Opéra de Kalos, on ne parle que de vous. Une taverne qui rend leur voix aux âmes perdues. Je devais l'entendre.",
    tales:["Avant chaque représentation, j'ai peur. Toujours. Depuis vingt ans. Je crois que la peur, c'est ce qui rend la voix vraie.","J'ai écrit une aria sur ta taverne, pendant le voyage. Elle s'appelle « La porte violette ». Je la chanterai un jour, si tu me le permets.","Une jeune Rondoudou m'a demandé des conseils, ce matin. Elle a une voix magnifique. Elle n'a besoin de personne, en vérité."],
    ok:"<i>Elle porte une main à son cœur.</i> Doux, rond, juste. Une note parfaite.",
    ko:"<i>Elle sourit avec élégance.</i> Une fausse note, peut-être. Cela arrive aux plus grands. Recommençons demain.",
    card:"aria", gift:{key:"rubanopera",n:"Ruban d'Opéra",i:"🎀",d:"+2 Bouclier au début de chaque tour",fx:{turnStart:(C)=>{ C.block+=2; }}}},
  galeking:{id:306,n:"Galeking",c:"#8a8a9a",from:"les mines de l'Ouest",role:"Forgeron des profondeurs",
    order:{base:"liqueur",add:["grochampi"]},
    intro:"<i>Il pose sur le comptoir une petite enclume d'acier, puis s'assoit en faisant trembler les verres.</i> Je forge des cloches, là-bas, dans les mines de l'Ouest. On m'a dit qu'ici, une cloche sonne chaque fois qu'une âme trouve la paix. Je voulais l'entendre. Et boire un coup.",
    tales:["Une bonne cloche, c'est une blessure bien refroidie. Le métal se souvient des coups. C'est ça qui le fait chanter.","Mes enfants voulaient tous devenir forgerons. Le plus petit veut devenir pâtissier. Je lui ai forgé un moule à gâteau. Il pleurait de joie.","La cloche de ta porte sonne un peu faux. Ne t'en fais pas. Je l'ai déjà réparée cette nuit."],
    ok:"<i>Il frappe le comptoir du poing, joyeusement.</i> Ça, c'est du solide ! Ça tient au corps, comme une bonne armure.",
    ko:"<i>Il grogne, sans méchanceté.</i> Trop léger. Il faut que ça tienne au corps, un verre. Je t'apprendrai.",
    card:"forgeacier", gift:{key:"enclume",n:"Petite Enclume",i:"⚒️",d:"L'ombre perd 2 PV chaque fois qu'elle frappe",fx:{combatStart:(C)=>{ C.thorns=(C.thorns||0)+2; }}}}
};
const WORLD_ORDER = Object.keys(WORLD);
WORLD_ORDER.forEach(k=>{ const w=WORLD[k];
  CL[k] = {season:"post", world:true, id:w.id, n:w.n, fem:!!w.fem, c:w.c, family:"Voyageur", from:w.from, role:w.role, gift:w.gift, affCard:w.card,
    reform:{}, frags:[], stages:[], comfort:[], hints:[], thanks:"", map:null};
  REGULARS[k] = {order:w.order, line:w.intro, ok:w.ok, ko:w.ko};
  CLIENT_CARD[k] = w.card;
});
Object.assign(CARDS, {
  chantglaces:{n:"Chant des Neiges",c:1,t:"skill",block:6,weak:1,r:"voyage",i:"❄️",from:"momartik"},
  pietinement:{n:"Piétinement",c:2,t:"atk",dmg:14,vuln:1,r:"voyage",i:"🦣",from:"mammochon"},
  sambapluie:{n:"Samba sous la Pluie",c:1,t:"skill",elan:2,draw:1,r:"voyage",i:"🪇",from:"ludicolo"},
  plongeoncatch:{n:"Plongeon du Catcheur",c:2,t:"atk",dmg:9,hits:2,selfDmg:2,r:"voyage",i:"🤼",from:"brutalibre"},
  paume:{n:"Paume Éveillée",c:1,t:"atk",dmg:8,draw:1,r:"voyage",i:"🖐️",from:"charmina"},
  illusion:{n:"Illusion",c:1,t:"skill",fear:2,weak:1,r:"voyage",i:"🦊",from:"zoroark"},
  aria:{n:"Aria",c:1,t:"skill",heal:5,block:4,r:"voyage",i:"🎼",from:"gardevoir"},
  forgeacier:{n:"Forge d'Acier",c:2,t:"power",keepBlock:true,r:"voyage",i:"⚒️",from:"galeking",d:"Le Bouclier ne disparaît plus à la fin du tour."},
  // cartes chromatiques : offertes par les clients venus dans leurs couleurs rares
  eclatchroma:{n:"Éclat Chromatique",c:1,t:"atk",dmg:7,draw:1,r:"chroma",i:"✨"},
  refletirise:{n:"Reflet Irisé",c:1,t:"skill",block:8,retain:true,r:"chroma",i:"🪞"},
  unechance:{n:"Une Chance sur Vingt-Cinq",c:0,t:"skill",energy:1,draw:2,exhaust:true,r:"chroma",i:"🍀"},
  paillettes:{n:"Pluie de Paillettes",c:1,t:"skill",weak:2,vuln:2,r:"chroma",i:"🎆"},
  prisme:{n:"Prisme Éclatant",c:2,t:"atk",dmg:6,hits:3,r:"chroma",i:"🔷"},
  halodore:{n:"Halo Doré",c:1,t:"skill",heal:7,cleanse:true,exhaust:true,r:"chroma",i:"😇",d:"Soigne 7 PV et retire Faible, Vulnérable, Brûlure, Poison, Gel et Confusion. Épuise."},
  aurascint:{n:"Aura Scintillante",c:2,t:"power",strTurn:1,r:"chroma",i:"🌟",d:"Au début de chaque tour, gagne 1 de Force."},
  inverse:{n:"Couleurs Inversées",c:1,t:"atk",dmg:6,fear:2,r:"chroma",i:"🎨"}
});
const SHINY_CARDS = ["eclatchroma","refletirise","unechance","paillettes","prisme","halodore","aurascint","inverse"];
function shinyCardFor(k){ let h=0; for(const ch of k) h=(h*31+ch.charCodeAt(0))>>>0; return SHINY_CARDS[h%SHINY_CARDS.length]; }
