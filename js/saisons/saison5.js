// Saison 5 · Chapitre 3 « Les métamorphoses »
// Famille de blessure du chapitre : l'Évolution manquée (identité et changement, sous la pression de grandir).
// Tout ce qui concerne chaque âme de la saison est regroupé ici, client par client.
// Images Gemini à faire : voir GEMINI.md (les salles utilisent le décor générique en attendant).

// Plan de Labyrinthe commun aux âmes de la saison (11 salles) : seuls les noms changent.
function mapS5(n, opts={}){
  const N=(id,o)=>Object.assign({},o,{n:n[id]});
  return {start:"a",nodes:{
    a:N("a",{t:"entree",x:50,y:6,nx:["b","h"]}),
    b:N("b",{t:"echo",e:opts.eb||"tristesse",dmg:1,x:30,y:18,nx:["c"]}),
    h:N("h",{t:"echo",e:opts.eh||"peur",dmg:1,x:72,y:18,nx:["c","i"]}),
    c:N("c",{t:"carrefour",x:45,y:32,nx:["d","j"]}),
    i:N("i",{t:"enigme",need:"joie",x:84,y:34,nx:["j"]}),
    d:N("d",{t:"sanctuaire",x:20,y:46,nx:["k"]}),
    j:N("j",{t:"echo",e:opts.ej||"colere",dmg:1,x:64,y:48,nx:["k","l"]}),
    k:N("k",{t:"enigme",need:"nostalgie",x:30,y:62,nx:["f"]}),
    l:N("l",{t:"sanctuaire",x:78,y:64,nx:["f"]}),
    f:Object.assign(N("f",{t:"echo",e:opts.ef||"peur",dmg:2,x:50,y:80,nx:["g"]}), opts.foe?{foe:opts.foe}:{}),
    g:N("g",{t:"coeur",key:opts.key||"nostalgie",x:50,y:94,nx:[]})
  }};
}

// =====================================================================
// MÉTAMORPH  (metamorph)
// =====================================================================
// fiche (histoire, confidences, Labyrinthe)
CL.metamorph = {
    season:5,from:1,id:132,n:"Métamorph",c:"#b890d8",family:"Évolution manquée",wound:"normal",likesEss:["psy"],comfort:["lait","pierrestase","mago","miel","pecha"],dislike:["poudre","liqueur","superbonbon"],tol:2,
    intro:"La porte s'ouvre, et c'est… toi qui entres. Ton visage, ton tablier, ta façon de pousser la porte. Ton double s'assoit au comptoir, te regarde, puis fond doucement comme de la cire, jusqu'à devenir une petite flaque violette avec deux points pour les yeux.",
    arrive:"<i>La flaque hésite, prend la forme d'un tabouret, puis de rien du tout.</i> Pardon. C'est un réflexe. Je prends la forme de la première personne que je vois. Tu veux bien me servir quelque chose ? Peu importe quoi. Je ne sais plus trop ce que j'aime.",
    hints:["Chaque fois que quelqu'un passe devant la fenêtre, il copie sa silhouette pendant une seconde, sans le vouloir, puis redevient flaque.","Il évite de regarder le miroir derrière le bar. Quand il le croise, il se fige.","Sur le comptoir, il trace du bout d'un pseudopode un visage rond, puis l'efface aussitôt."],
    stages:[
      {req:0,t:"<i>Il prend la forme d'un clown, puis d'un Pikachu, puis d'un Dracaufeu.</i> J'étais la vedette d'un chapiteau. Le public criait un nom, et je devenais ce Pokémon. Mille formes par soir. On m'appelait le Prodige.",kw:"public"},
      {req:2,t:"<i>Il redevient flaque, tout petit.</i> Personne ne demandait jamais Métamorph. Pourquoi faire ? Une flaque violette, ce n'est pas un spectacle. Alors je ne redevenais moi-même que la nuit, seul, dans ma caisse.",kw:"visage"},
      {req:3,t:"<i>Sa voix tremble, et ses yeux se brouillent.</i> Un soir, après le dernier rappel, j'ai voulu reprendre ma vraie forme. Et je n'y suis pas arrivé. J'avais oublié. Je ne savais plus quelle tête j'avais. J'ai passé la nuit devant un miroir à essayer.",kw:"reflet"},
      {req:4,t:"<i>Il se tient devant le miroir du bar, flaque violette, deux petits yeux, un sourire de travers.</i> C'est moi, ça. Pas très impressionnant. Mais c'est moi. Je n'ai pas besoin de devenir quelqu'un d'autre pour avoir le droit d'être regardé."}
    ],
    lie:{after:0,t:"<i>Il prend la forme d'un Mewtwo, majestueux.</i> J'aime être n'importe qui. C'est la liberté absolue. Pourquoi voudrais-je être moi ?"},
    reform:{"public":"« Ils applaudissaient tes formes. Ils n'ont jamais eu la chance de te connaître, toi. »","visage":"« Ton vrai visage vaut un spectacle. Le plus rare de tous. »","reflet":"« On peut réapprendre son reflet. On a toute la nuit. »"},
    essGood:"<i>Il boit, et pendant une seconde il garde exactement sa forme, sans trembler.</i> Oh. C'est… simple. Je crois que j'aime ça. Moi. J'aime ça, moi.",
    essBad:"<i>Il se met à changer de forme à toute vitesse, Rattata, Ronflex, Roucool, Rattata.</i> Trop ! Je ne sais plus qui boit ce verre !",
    frags:[{n:"Le premier soir sur la piste, avant les formes",e:"nostalgie"},{n:"Le reflet retrouvé dans le miroir du bar",e:"joie"}],
    thanks:"<i>Il garde sa forme de flaque, et se redresse fièrement.</i> Je vais retourner au chapiteau. Pas pour copier. Je vais faire un numéro à moi : une flaque violette qui sourit. Peut-être que personne ne viendra. Mais moi, je saurai qui est sur scène.",
    gift:{key:"masque",n:"Masque de Métamorph",i:"🎭",d:"Au 3e tour de chaque combat, le client gagne 1 énergie de plus",fx:{turnStart(C){ if(C.turn===3){ C.energy++; C.emax++; } }}},
    staff:{n:"Sosie d'accueil",d:"Les âmes qui viennent pour la première fois arrivent avec +1 Ouverture",wage:25},
    staffFx:{arrive(c){ if(S.clients[c.k] && S.clients[c.k].visits===1) c.ouv++; }},
    cogHint:"Il ne sait plus ce qu'il aime : ne lui impose rien de fort, et surtout pas de Super Bonbon, il croirait qu'on veut le changer. Une Gelée Blanche, et du simple : Lait Meumeu, Pierre Stase, Baie Mago.",
    map:mapS5({a:"Le chapiteau vide",b:"Les rires du public",h:"Mille formes à la seconde",c:"Les coulisses aux miroirs",i:"Le premier soir sur la piste",d:"La caisse où il dormait",j:"Les noms criés par la foule",k:"Le visage effacé",l:"La flaque au clair de lune",f:"Le miroir qui ne renvoie rien",g:"La nuit où il a oublié son visage"},{eb:"tristesse",eh:"peur",ej:"colere",ef:"peur",key:"joie"})
};
TALK.metamorph = [
    {t:"<i>Il prend ta forme, essuie un verre exactement comme toi, puis redevient flaque en riant.</i> Pardon ! Tu as une jolie façon de tenir le torchon. Je voulais voir ce que ça faisait."},
    {t:"<i>Il plonge un pseudopode dans le lait chaud.</i> Au chapiteau, le clown m'en donnait après le spectacle. Il était le seul à me parler quand j'étais une flaque.",like:"lait"},
    {t:"<i>Il fixe la Pierre Stase sur l'étagère.</i> Une pierre qui empêche de changer… Il y a des Pokémon qui en ont peur. Moi, j'aimerais bien en avoir une dans la poche. Si j'avais une poche.",like:"pierrestase"}
];
WIPE.metamorph = ["<i>Il prend la forme d'un torchon, et s'essuie lui-même. Puis il éclate de rire.</i>","<i>Il te regarde faire, sans copier, pour une fois.</i> C'est reposant, de juste regarder."];
LETTERS.metamorph = "« Premier numéro hier soir : une flaque qui sourit. Douze spectateurs. Un enfant a demandé : \"Il fait quoi, il se transforme ?\" J'ai dit non. Il a applaudi quand même. — M. »";
REGULARS.metamorph = {order:{base:"lait",add:["pierrestase"]},
    line:"<i>Une flaque violette passe sous la porte et se hisse sur un tabouret, sans copier personne.</i> Bonjour ! Un lait avec une Pierre Stase, s'il te plaît. Je reste moi aujourd'hui.",
    ok:"<i>Il boit, et garde sa forme tout du long.</i> Le chapiteau a mis mon nom sur l'affiche. Mon vrai nom. Sans « Prodige ». Juste : Métamorph.",
    ko:"<i>Il tremblote un peu.</i> Ce n'est pas ce que j'ai demandé… ce n'est pas grave. Je sais ce que j'aime, maintenant. C'est déjà beaucoup."};
ROOM_SAY.metamorph = {a:"Le chapiteau. Vide. Je n'y étais jamais venu sans public.",b:"Les rires… Ils riaient de mes formes. Jamais de moi.",h:"Je change, je change, je n'arrive pas à m'arrêter !",c:"Les coulisses. Des miroirs partout. Je ne me vois dans aucun.",i:"Le premier soir sur la piste. J'étais une flaque, et j'avais peur. Mais j'étais moi.",d:"Ma caisse. C'est là que je redevenais moi, la nuit.",j:"Ils crient des noms. « Dracaufeu ! » « Mew ! » Jamais le mien.",k:"Un visage rond, effacé. Le mien ?",l:"La lune se reflète dans une flaque. Une flaque violette.",f:"Le miroir. Il ne renvoie rien. Rien du tout.",g:"La nuit où j'ai oublié mon visage."};
ROOM_KW.metamorph = {b:"public",c:"visage",f:"reflet"};
BOSS.metamorph = {id:132,n:"Ombre aux mille visages",self:true};
LEGEND_CARD.metamorph = "millevisages";
CLIENT_CARD.metamorph = "copie";
CARDS.copie = {n:"Copie",c:1,t:"atk",dmg:7,r:"client",i:"🎭",from:"metamorph"};
CARDS.millevisages = {n:"Mille Visages",c:1,t:"skill",block:8,draw:2,energy:1,retain:true,r:"legende",i:"🎭",from:"metamorph",d:"8 de Bouclier, pioche 2, +1 énergie. Retenue. Mille formes, et une seule qui compte."};

// =====================================================================
// INSÉCATEUR  (insecateur)
// =====================================================================
CL.insecateur = {
    season:5,from:2,id:123,n:"Insécateur",c:"#68b858",family:"Évolution manquée",wound:"combat",likesEss:["vol"],comfort:["the","pierrestase","menthe","sitrus","pommeacide"],dislike:["superbonbon","soda","gateau"],tol:3,
    intro:"Un éclair vert, un sifflement d'air coupé, et Insécateur est déjà assis, les lames repliées contre la poitrine comme un samouraï au repos. Une de ses lames porte une entaille récente. Il la cache sous l'autre.",
    arrive:"<i>Il incline à peine la tête.</i> Un thé. Fort. Et pas de question sur mes lames. Tout le monde pose des questions sur mes lames.",
    hints:["Il aiguise ses lames l'une contre l'autre, très doucement, comme on caresse un animal.","Quand il voit un éclat de métal (une cuillère, une clé), il détourne les yeux, la mâchoire serrée.","Il porte autour du cou une petite plaque d'acier gravée, qu'il n'a jamais accrochée à rien."],
    stages:[
      {req:0,t:"<i>Il fait briller ses lames dans la lumière des bougies.</i> Je viens d'un clan. Le plus ancien de la forêt. Chez nous, on naît avec des lames, et on apprend à couper une feuille en deux avant qu'elle touche le sol.",kw:"lames"},
      {req:2,t:"<i>Sa voix devient sèche.</i> Au printemps de nos vingt ans, le chef nous recouvre d'acier. C'est le rituel. On devient Cizayox. Des pinces d'acier à la place des lames. Plus forts, plus lourds, plus respectés. Tout le clan l'a fait.",kw:"clan"},
      {req:3,t:"<i>Il serre la plaque d'acier.</i> Le jour du rituel, j'ai regardé mes lames. Je les aimais. J'ai retiré l'acier avant qu'il prenne. Le chef a dit que j'étais inachevé. Ils m'ont chassé. Ma propre sœur m'a tourné le dos, ses pinces fermées.",kw:"acier"},
      {req:4,t:"<i>Il pose la plaque d'acier sur le comptoir, et la laisse là.</i> Je ne suis pas inachevé. Je suis Insécateur. Mes lames ne sont pas une étape. Ce sont les miennes. Et si ma sœur revient un jour, elle me trouvera entier."}
    ],
    lie:{after:0,t:"<i>Il hausse les épaules, trop vite.</i> J'ai raté le rituel, voilà tout. L'acier n'a pas pris. Je n'étais pas assez fort. Fin de l'histoire."},
    reform:{"lames":"« Tes lames sont une partie de toi, pas un brouillon. »","clan":"« Un clan qui chasse les siens n'a pas le dernier mot sur qui tu es. »","acier":"« Tu as choisi de rester toi. Ça demande plus de courage que l'acier. »"},
    essGood:"<i>Il boit d'un trait, et ses lames se détendent.</i> Net. Tranchant. Ça, c'est un verre honnête.",
    essBad:"<i>Il repose le verre, la lame levée par réflexe.</i> Trop lourd. On dirait de l'acier fondu.",
    frags:[{n:"La première feuille coupée avant de toucher le sol",e:"joie"},{n:"Les entraînements avec sa sœur, au lever du jour",e:"nostalgie"}],
    thanks:"<i>Il se lève, lames déployées, et elles brillent comme jamais.</i> Je vais ouvrir une école dans la clairière, de l'autre côté de la forêt. Pour ceux qui ne veulent pas de l'acier. On apprendra à couper les feuilles. Rien d'autre. C'est déjà beaucoup.",
    gift:{key:"lames",n:"Lames d'Insécateur",i:"⚔️",d:"Au début de chaque combat, le client gagne 2 d'Élan (ses attaques font +2 dégâts, puis l'Élan baisse)",fx:{combatStart(C){ C.elan=(C.elan||0)+2; }}},
    staff:{n:"Maître d'armes",d:"Les âmes de l'Évolution manquée arrivent avec 1 Tension de moins",wage:25},
    staffFx:{arrive(c,d){ if(d.family==="Évolution manquée") c.ten--; }},
    cogHint:"Il est fier et tient bien l'alcool, mais un Super Bonbon le vexerait : ça sent le rituel. Une seule Gelée Orange, et du net : Thé de Safrania, Menthe, Pomme Acide.",
    map:mapS5({a:"La forêt des lames",b:"Le clan qui tourne le dos",h:"La pluie d'acier",c:"Le cercle du rituel",i:"La feuille coupée en deux",d:"La clairière de l'aube",j:"Les pinces qui claquent",k:"Les entraînements avec sa sœur",l:"Le ruisseau où il aiguisait ses lames",f:"Le rituel de l'acier",g:"Le jour où il a gardé ses lames"},{eb:"tristesse",eh:"peur",ej:"colere",ef:"colere",key:"joie",foe:{id:212,n:"Cizayox"}})
};
TALK.insecateur = [
    {t:"<i>Il coupe une rondelle de citron si fine qu'on voit la bougie au travers.</i> Pour ton prochain verre. Gratuit. Les lames, ça sert aussi à ça."},
    {t:"<i>Il hume le thé, les yeux mi-clos.</i> Ma sœur infusait ses feuilles de thé pendant exactement cent battements d'ailes. Elle disait que c'était la seule patience qu'elle avait.",like:"the"},
    {t:"<i>Il croque une Pomme Acide et grimace avec plaisir.</i> Celles de la forêt sont pires. On se défiait à qui en mangerait trois sans pleurer.",like:"pommeacide"}
];
WIPE.insecateur = ["<i>Il observe ton geste d'un œil critique.</i> Ton poignet est trop raide. Laisse le torchon faire le travail.","<i>Le bruit du torchon couvre le cliquetis de ses lames. Il ferme les yeux.</i>"];
LETTERS.insecateur = "« Mon école a trois élèves. Hier, une Cizayox s'est arrêtée à la lisière. Elle a regardé longtemps. Elle est repartie sans rien dire. Elle reviendra. Je sais reconnaître ma sœur. — I. »";
REGULARS.insecateur = {order:{base:"the",add:["menthe"]},
    line:"<i>Un sifflement, et il est déjà assis.</i> Un thé à la menthe. Fort. Et dis au co-gérant d'arrêter de fixer mes lames, il va finir par se couper rien qu'en les regardant.",
    ok:"<i>Il boit, et sourit presque.</i> Un élève a coupé sa première feuille ce matin. Il a pleuré de joie. Moi aussi, un peu. Ne le répète pas.",
    ko:"<i>Il fronce les sourcils.</i> Imprécis. Mais l'intention y était. Recommence demain."};
ROOM_SAY.insecateur = {a:"La forêt du clan. Chaque arbre porte une entaille de mes ancêtres.",b:"Ils me tournent le dos. Tous. Même elle.",h:"L'acier tombe comme de la pluie. Il colle à la peau.",c:"Le cercle du rituel. C'est ici que tout s'est joué.",i:"Une feuille coupée en deux avant de toucher le sol. Ma première.",d:"La clairière, à l'aube. Personne ne regarde. On peut juste s'entraîner.",j:"Leurs pinces claquent. Un bruit de prison.",k:"Ma sœur et moi, au lever du jour. Elle était meilleure que moi.",l:"Le ruisseau. L'eau aiguise mieux que n'importe quelle pierre.",f:"Le rituel. L'acier qui monte le long de mes bras.",g:"Le jour où j'ai gardé mes lames."};
ROOM_KW.insecateur = {a:"lames",b:"clan",f:"acier"};
BOSS.insecateur = {id:212,n:"Ombre du clan d'acier"};
LEGEND_CARD.insecateur = "lamefidele";
CLIENT_CARD.insecateur = "taillade";
CARDS.taillade = {n:"Taillade",c:1,t:"atk",dmg:4,hits:2,r:"client",i:"⚔️",from:"insecateur"};
CARDS.lamefidele = {n:"Lame Fidèle",c:2,t:"atk",dmg:12,execute:true,r:"legende",i:"⚔️",from:"insecateur",d:"12 dégâts, doublés si l'ombre a moins de la moitié de ses PV. Des lames, pas de l'acier."};

// =====================================================================
// KADABRA  (kadabra)
// =====================================================================
CL.kadabra = {
    season:5,from:3,id:64,n:"Kadabra",c:"#d8b040",family:"Évolution manquée",wound:"psy",likesEss:["eau"],comfort:["the","miel","oran","poudremetal","sitrus"],dislike:["liqueur","soda","poudre"],tol:2,
    quiet:true,
    intro:"Les petites cuillères de la taverne se mettent à trembler dans leur pot, toutes ensemble. Kadabra apparaît au milieu de la salle, sans passer par la porte, une seule cuillère tordue dans la main. Il a l'air de quelqu'un qui attend un train depuis très longtemps.",
    arrive:"<i>Il parle dans ta tête avant de parler tout court.</i> Bonsoir. Pardon pour les cuillères, je ne contrôle pas tout quand je suis fatigué. Un thé au miel, si possible. Je… j'attends quelqu'un. Ça fait longtemps.",
    hints:["Il regarde sans arrêt vers la porte, et sa cuillère se tord un peu plus à chaque fois qu'elle ne s'ouvre pas.","Il tient un vieux billet plié : « Échange prévu samedi. Promis. » L'encre a pâli.","Il sait ce que tu vas servir avant toi. Il ne le dit pas, par politesse."],
    stages:[
      {req:0,t:"<i>Il fait tourner sa cuillère.</i> Ma dresseuse s'appelait Lise. On était inséparables. Elle me disait que j'étais le Pokémon le plus intelligent qu'elle connaissait.",kw:"cuillère"},
      {req:2,t:"<i>Il déplie le billet.</i> Les Kadabra n'évoluent que si on les échange. Alors Lise a organisé un échange avec sa meilleure amie : elle m'envoie, je deviens Alakazam, et son amie me renvoie aussitôt. Un aller-retour. Une formalité.",kw:"échange"},
      {req:3,t:"<i>La cuillère se tord en spirale.</i> Le samedi, l'amie n'est pas venue. Ni le suivant. Elle avait déménagé. Lise a pleuré, puis elle a dit que ce n'était pas grave. Mais elle regardait les Alakazam des autres. Et moi, je suis resté Kadabra. Le Pokémon qu'on n'a pas réussi à faire grandir.",kw:"promesse"},
      {req:4,t:"<i>Il redresse la cuillère, d'un seul regard.</i> Lise ne regardait pas les Alakazam. Elle me regardait, moi, qui regardais les Alakazam. Je viens de comprendre. Je lisais toutes les pensées, sauf la sienne. Elle m'aimait Kadabra."}
    ],
    lie:{after:0,t:"<i>Il lisse sa moustache.</i> Je n'ai aucune envie d'évoluer. Alakazam, c'est vulgaire. Trop de cuillères."},
    reform:{"cuillère":"« Elle te trouvait le plus intelligent. Tel que tu étais. »","échange":"« Un échange raté, ce n'est pas une évolution ratée. C'est une promesse oubliée. »","promesse":"« Ce n'est pas toi qu'on n'a pas su faire grandir. C'est un rendez-vous qui n'a pas eu lieu. »"},
    essGood:"<i>Il boit, et toutes les cuillères de la salle s'immobilisent d'un coup.</i> Silence… Enfin. Merci.",
    essBad:"<i>Les cuillères se mettent à voler dans tous les sens.</i> Trop de bruit dans la tête ! Trop !",
    frags:[{n:"Les devoirs faits ensemble, Lise et lui, la cuillère comme crayon",e:"nostalgie"},{n:"La première fois qu'il a lu dans les pensées de Lise : « tu es mon meilleur ami »",e:"joie"}],
    thanks:"<i>Il range sa cuillère redressée dans sa poche.</i> Je vais rentrer. Lise a grandi, elle aussi. Elle donne des cours, maintenant. Je crois qu'elle aura besoin d'un assistant capable de lire dans la tête des élèves qui n'osent pas lever la main.",
    gift:{key:"cuillere",n:"Cuillère Tordue",i:"🥄",d:"Au 2e tour de chaque combat, le client pioche 2 cartes de plus",fx:{draw(C){ return C.turn===2 ? 2 : 0; }}},
    staff:{n:"Liseur de pensées",d:"Les âmes très tendues (Tension 3 ou plus) arrivent avec +1 Ouverture",wage:30},
    staffFx:{arrive(c){ if(c.ten>=3) c.ouv++; }},
    cogHint:"Il entend tout, même nos pensées : reste calme et ne secoue pas les verres devant lui. Une Gelée Rose pour l'esprit, et du doux : Thé de Safrania, Miel, Poudre Métal.",
    map:mapS5({a:"La chambre de Lise",b:"Le billet d'échange pâli",h:"Les cuillères qui tremblent",c:"Le centre d'échange",i:"La première pensée lue",d:"La bibliothèque silencieuse",j:"Les Alakazam des autres",k:"Les devoirs à deux",l:"Le jardin de l'école",f:"Le samedi où personne n'est venu",g:"La promesse oubliée"},{eb:"tristesse",eh:"peur",ej:"colere",ef:"tristesse",key:"joie",foe:{id:65,n:"Alakazam"}})
};
TALK.kadabra = [
    {t:"<i>Ta cuillère flotte jusqu'à toi, remuée toute seule dans ta tasse.</i> Pardon. Tu pensais très fort que ton café était trop chaud."},
    {t:"<i>Il hume la vapeur du thé.</i> Lise buvait du thé en révisant. Elle en renversait toujours sur ses cahiers, et me demandait de sécher les pages par la pensée.",like:"the"},
    {t:"<i>Il regarde la Poudre Métal briller dans son flacon.</i> Les Métamorph en raffolent, paraît-il. Moi, ça me rappelle la limaille au fond de la boîte à outils de son père.",like:"poudremetal"}
];
WIPE.kadabra = ["<i>Le torchon flotte hors de tes mains et essuie le verre tout seul, en rythme.</i> Laisse-moi. Ça me calme.","<i>Les cuillères arrêtent de trembler pendant que tu essuies.</i>"];
LETTERS.kadabra = "« Lise m'a présenté à sa classe. Un petit garçon n'osait pas dire qu'il ne comprenait pas. Je l'ai entendu. Lise lui a réexpliqué sans qu'il demande. Il croit que c'est de la magie. — K. »";
REGULARS.kadabra = {order:{base:"the",add:["miel"]},
    line:"<i>Il apparaît au comptoir, sans passer par la porte, et sourit.</i> Bonjour. Un thé au miel. Ne cherche pas, je sais que tu allais me le proposer.",
    ok:"<i>Il boit lentement, la cuillère bien droite dans sa poche.</i> Lise m'a demandé si je regrettais Alakazam. J'ai dit non. Elle a souri. Cette fois, je n'ai pas eu besoin de lire ses pensées.",
    ko:"<i>Il penche la tête.</i> Pas tout à fait. Mais tu y pensais très fort, c'est déjà ça."};
ROOM_SAY.kadabra = {a:"La chambre de Lise. Ses cahiers, ses posters… Mon coussin, au pied du lit.",b:"Le billet. « Samedi. Promis. » Combien de samedis depuis ?",h:"Les cuillères tremblent. Moi aussi.",c:"Le centre d'échange. Une machine qui attend deux personnes. Il n'en est venu qu'une.",i:"La première pensée que j'ai lue chez elle. « Tu es mon meilleur ami. »",d:"La bibliothèque. Ici, les pensées des autres se taisent.",j:"Les Alakazam des autres. Si fiers. Si grands.",k:"Les devoirs à deux. Elle écrivait, je tenais la lampe par la pensée.",l:"Le jardin de son école. Elle y donne des cours maintenant.",f:"Le samedi. Personne. Personne n'est venu.",g:"La promesse oubliée."};
ROOM_KW.kadabra = {a:"cuillère",b:"échange",f:"promesse"};
BOSS.kadabra = {id:64,n:"Ombre de l'échange manqué",self:true};
LEGEND_CARD.kadabra = "echangeprecieux";
CLIENT_CARD.kadabra = "chocpsy";
CARDS.chocpsy = {n:"Choc Psy",c:1,t:"atk",dmg:5,draw:1,r:"client",i:"🥄",from:"kadabra"};
CARDS.echangeprecieux = {n:"Échange Précieux",c:0,t:"skill",draw:3,energy:1,retain:true,r:"legende",i:"🥄",from:"kadabra",d:"Pioche 3, +1 énergie. Retenue. Il n'avait pas besoin d'être échangé pour compter."};

// =====================================================================
// CHRYSACIER  (chrysacier) — nouveau client du chapitre 3
// =====================================================================
CL.chrysacier = {
    season:5,from:4,id:11,n:"Chrysacier",c:"#88b848",family:"Évolution manquée",wound:"vol",likesEss:["normal"],comfort:["lait","miel","pecha","jusbaie","pierrestase"],dislike:["superbonbon","liqueur","poudre"],tol:1,
    quiet:true,
    intro:"Quelque chose roule sur le seuil, toc, toc, toc, et s'arrête contre le pied du comptoir. Une coque verte, dure, avec deux yeux à moitié fermés. Chrysacier ne bouge pas. Il ne peut pas vraiment bouger. Il attend qu'on le remarque, très poliment.",
    arrive:"<i>Sa voix vient de l'intérieur de la coque, un peu étouffée.</i> Bonsoir… Pardon de ne pas me lever. Je ne me lève jamais. Si vous avez quelque chose de très doux, je peux le boire par la petite fente, là. Si ça ne vous dérange pas.",
    hints:["Chaque fois qu'un papillon de nuit passe devant la lanterne, ses yeux se ferment très fort.","Sa coque porte une toute petite fissure, sur le côté. Il la cache contre le bois du comptoir.","Il durcit sa coque au moindre bruit, avec un petit « tic ». Puis il s'excuse."],
    stages:[
      {req:0,t:"<i>Ses yeux suivent la lumière.</i> On était sept Chenipan, sur le même arbre. On grignotait des feuilles toute la journée. On s'est tous enfermés en Chrysacier le même été.",kw:"coque"},
      {req:2,t:"<i>Un petit « tic » de coque qui durcit.</i> Au printemps suivant, les six autres sont sortis. Des Papilusion. Ils ont tourné autour de l'arbre en m'appelant. Moi, je suis resté dedans. Je n'arrivais pas à pousser.",kw:"papillons"},
      {req:3,t:"<i>Sa voix tremble.</i> Ça fait trois ans. Ou quatre. Ils sont partis migrer. Et si je sors maintenant, je serai seul, et peut-être tout tordu, avec des ailes ratées. Et le monde dehors aura changé sans moi. Dedans, au moins, rien ne change.",kw:"dehors"},
      {req:4,t:"<i>La petite fissure s'agrandit d'un millimètre, toute seule. Il ne la cache plus.</i> Je ne suis pas en retard. Une coque, ça s'ouvre quand c'est prêt. Pas quand les autres sont partis. Je sortirai. Pas ce soir. Mais je sortirai."}
    ],
    lie:{after:0,t:"<i>Tic, la coque durcit.</i> Je suis très bien comme ça. Les Chrysacier sont les Pokémon les plus solides du monde. Je n'ai besoin de rien."},
    reform:{"coque":"« Ta coque t'a protégé. Elle a fait son travail. »","papillons":"« Ils sont sortis à leur rythme. Tu sortiras au tien. »","dehors":"« Le monde aura changé, oui. Et il aura gardé une place pour toi. »"},
    essGood:"<i>Il boit par la fente, et sa coque se réchauffe, toute dorée.</i> Oh… C'est comme le soleil de printemps sur l'arbre. Juste avant que tout le monde sorte.",
    essBad:"<i>Tic tic tic, sa coque durcit à toute vitesse.</i> Trop fort… je me referme…",
    frags:[{n:"L'été des sept Chenipan sur le même arbre",e:"nostalgie"},{n:"La première fissure dans la coque",e:"joie"}],
    thanks:"<i>La fissure s'est agrandie, et une lumière douce en sort.</i> Je crois que je vais sortir bientôt. Peut-être demain, peut-être dans un mois. Le co-gérant a promis de me laisser au chaud près de la fenêtre, d'ici là. Je veux voir le ciel en premier.",
    gift:{key:"coque",n:"Coque de Chrysacier",i:"🛡️",d:"Au premier tour de chaque combat, le client gagne 12 de Bouclier",fx:{turnStart(C){ if(C.turn===1) C.block+=12; }}},
    staff:{n:"Veilleur patient",d:"Les âmes de l'Évolution manquée restent un échange de plus",wage:10},
    staffFx:{arrive(c,d){ if(d.family==="Évolution manquée") c.turns++; }},
    cogHint:"Il est si fragile qu'un verre un peu fort le fait se refermer. Une Gelée Ciel, légère, et du très doux : Lait Meumeu, Miel, Baie Pêcha. Jamais de Super Bonbon : il croirait qu'on le presse.",
    map:mapS5({a:"L'arbre aux sept chenilles",b:"La coque froide",h:"Les battements d'ailes au loin",c:"La branche d'où ils sont partis",i:"La première fissure",d:"Le cocon de feuilles",j:"Les Papilusion qui appellent",k:"L'été des sept Chenipan",l:"Le rebord de fenêtre au soleil",f:"Le ciel où ils ont migré",g:"Le printemps où il est resté dedans"},{eb:"tristesse",eh:"peur",ej:"tristesse",ef:"peur",key:"joie",foe:{id:12,n:"Papilusion"}})
};
TALK.chrysacier = [
    {t:"<i>Il fixe la flamme de la bougie.</i> Vous savez ce qu'il y a dans une coque ? Moi non plus. C'est ça le problème. Je ne sais pas ce que je suis en train de devenir."},
    {t:"<i>Une goutte de miel glisse jusqu'à la fente.</i> Mmh. Les autres en trouvaient dans les fleurs, au printemps. Ils m'en rapportaient sur leurs pattes. Je goûtais l'été à travers eux.",like:"miel"},
    {t:"<i>Il contemple la Pierre Stase.</i> Une pierre pour ne jamais changer. Avant, j'en aurais voulu une. Maintenant… je ne sais pas. Peut-être juste pour la tenir, en attendant.",like:"pierrestase"}
];
WIPE.chrysacier = ["<i>Le frottement régulier du torchon le berce. Sa coque se ramollit un tout petit peu.</i>","<i>Il te regarde depuis sa fente.</i> Vous faites ça tous les soirs ? C'est rassurant, les choses qui reviennent."];
LETTERS.chrysacier = "« JE SUIS SORTI. Mes ailes sont un peu de travers. Je vole en zigzag. C'est très drôle. Le premier truc que j'ai vu, c'était le ciel, comme prévu. Le deuxième, c'était votre enseigne. — Papilusion (ex-Chrysacier) »";
REGULARS.chrysacier = {order:{base:"lait",add:["miel"]},
    line:"<i>Un Papilusion aux ailes de travers zigzague jusqu'au comptoir et s'y pose en ratant un peu son atterrissage.</i> Bonjour ! C'est moi ! Un lait au miel, s'il vous plaît. Je le bois avec une trompe, maintenant !",
    ok:"<i>Il boit, et ses ailes tremblent de joie.</i> J'ai rattrapé les six autres. Ils m'ont attendu au sud, sur un arbre. Ils disaient tous les jours : il viendra. Je suis venu.",
    ko:"<i>Il bat des ailes, un peu déçu.</i> Ce n'est pas ça… mais ce n'est pas grave ! J'ai des ailes ! Rien n'est grave quand on a des ailes."};
ROOM_SAY.chrysacier = {a:"L'arbre. Nos sept coques pendaient à la même branche.",b:"La coque est froide. Tout le monde est parti.",h:"Des battements d'ailes, au loin. Ils m'appellent encore ?",c:"La branche. C'est d'ici qu'ils se sont envolés.",i:"Une fissure. Toute petite. De la lumière passe.",d:"Un cocon de feuilles. On y est au chaud, sans rien demander.",j:"Ils tournent autour de l'arbre. « Sors ! Sors ! » Je n'y arrive pas.",k:"L'été des sept Chenipan. On mangeait des feuilles en riant.",l:"Un rebord de fenêtre au soleil. On pourrait attendre ici.",f:"Le ciel. Ils ont migré si loin.",g:"Le printemps où je suis resté dedans."};
ROOM_KW.chrysacier = {b:"coque",j:"papillons",f:"dehors"};
BOSS.chrysacier = {id:12,n:"Ombre du papillon qu'il aurait dû être"};
LEGEND_CARD.chrysacier = "premierenvol";
CLIENT_CARD.chrysacier = "armurecoque";
CARDS.armurecoque = {n:"Armure Coque",c:1,t:"skill",block:9,retain:true,r:"client",i:"🛡️",from:"chrysacier"};
CARDS.premierenvol = {n:"Premier Envol",c:2,t:"skill",block:10,draw:2,energy:1,r:"legende",i:"🦋",from:"chrysacier",d:"10 de Bouclier, pioche 2, +1 énergie. Une coque s'ouvre quand elle est prête."};
