// Saison 2 · Chapitre 1 « Portes ouvertes »
// Tout ce qui concerne chaque âme de la saison est regroupé ici, client par client.
// (L'ordre d'arrivée est dans CLIENT_ORDER, js/01-base.js ; les images à faire sont dans GEMINI.md.)

// =====================================================================
// TIPLOUF  (tiplouf)
// =====================================================================
// fiche (histoire, confidences, Labyrinthe)
CL.tiplouf = {
    season:2,from:1,chapter:true,id:393,n:"Tiplouf",c:"#5878c8",family:"Abandon",wound:"vol",likesEss:["eau"],comfort:["oran","fraive","sitrus","menthe","lait","the"],dislike:["eau","miel","gateau"],tol:2,
    noPity:true,
    intro:"La porte s'ouvre d'un coup, comme poussée par un vent de mer. Un Tiplouf entre, le bec levé très haut, et traverse la salle en se dandinant avec une dignité parfaite. Il grimpe sur le tabouret du milieu, glisse, se rattrape, et fait comme si de rien n'était.",
    arrive:"<i>Il bombe le torse et lisse une plume qui n'en avait pas besoin.</i> Bonsoir, tavernier. Je ne suis pas perdu, je visite. Sers-moi ce que tu as de meilleur. Et ne me fais pas l'aumône d'un verre d'eau.",
    hints:["Quand le co-gérant le regarde avec un air attendri, Tiplouf se raidit et détourne le bec, vexé.", "Il frotte machinalement le dessus de sa tête, toujours au même endroit, comme on fait briller quelque chose. Comme on polit une Poké Ball.", "Chaque fois que la porte s'ouvre, il se redresse d'un coup… puis fait semblant d'avoir juste remis ses plumes en place."],
    stages:[
      {req:0,t:"<i>Il croise ses ailerons, très droit.</i> J'ai grandi dans un laboratoire. Le plus réputé de la région. Trois Poké Balls sur une table, au soleil. La mienne était celle du milieu.",kw:"laboratoire"},
      {req:2,t:"<i>Son bec s'abaisse d'un tout petit cran.</i> Chaque printemps, un enfant entrait. Il hésitait, il souriait… et il prenait une des deux autres. Le Tortipouss, ou l'Ouisticram. Toujours.",kw:"choisi"},
      {req:3,t:"<i>Il frotte le sommet de sa tête, longtemps.</i> Le Professeur polissait ma Poké Ball tous les matins, pour qu'elle brille plus que les autres. Ça n'a jamais suffi. Un jour, il a remplacé la table. Pas la Poké Ball.",kw:"Poké Ball"},
      {req:4,t:"<i>Pour la première fois, il laisse ses ailerons retomber le long du corps.</i> Personne ne m'a choisi. Alors… peut-être que c'est à moi de choisir. Où aller. Avec qui."}
    ],
    lie:{after:0,t:"<i>Il lève le bec encore plus haut.</i> Remarque, c'est moi qui ne voulais pas d'eux. Des enfants. Très peu pour moi."},
    reform:{"laboratoire":"« Tu n'étais pas oublié sur cette table. Tu étais prêt, tous les jours. »","choisi":"« Ne pas être choisi, ça ne dit rien de ce que tu vaux. »","Poké Ball":"« Tu brillais déjà. Il manquait juste quelqu'un pour le voir. »"},
    essGood:"<i>Il boit, et ses ailerons s'écartent tout seuls, comme pour prendre le vent.</i> Oh… Pendant une seconde, j'ai cru que je volais. Ne le répète à personne.",
    essBad:"<i>Il recrache presque, les plumes hérissées.</i> Trop ! Tu te moques de moi ? Tout le monde sait que les Tiplouf ne volent pas !",
    frags:[{n:"Le jour où le Professeur l'a appelé par son nom",e:"nostalgie"},{n:"Le premier plongeon dans la mer, tout seul",e:"joie"}],
    thanks:"<i>Il descend du tabouret, se plante devant la porte et se retourne.</i> J'ai décidé. Je reste à Bourg-Brume. Pas parce qu'on m'a choisi. Parce que, moi, je choisis cet endroit.",
    gift:{key:"echarpe",n:"Écharpe de Tiplouf",i:"🧣",d:"Pioche 2 cartes de plus au premier tour de chaque combat"},
    staff:{n:"Plongeur",d:"Chaque verre parfait rapporte 15 ₽ de plus",wage:25},
    cogHint:"Surtout, ne le prends pas en pitié : un verre d'eau, pour lui, c'est l'aumône. Il rêve de voler… une seule Gelée Ciel, et des baies de mer, comme l'Oran.",
    map:{start:"a",nodes:{
      a:{t:"entree",n:"Le laboratoire du Professeur, la nuit",x:50,y:6,nx:["b"]},
      b:{t:"echo",e:"tristesse",dmg:1,n:"Les enfants qui passent devant lui",x:50,y:18,nx:["c"],foe:{id:387,n:"Tortipouss"}},
      c:{t:"carrefour",n:"Trois portes du laboratoire",x:50,y:30,nx:["d","h","e"]},
      d:{t:"sanctuaire",n:"Le grand aquarium du labo",x:15,y:42,nx:["i"]},
      h:{t:"echo",e:"colere",dmg:1,n:"La vitrine des Poké Balls choisies",x:50,y:42,nx:["i","j"],art:"a"},
      e:{t:"enigme",need:"joie",n:"Le carnet du Professeur",x:85,y:42,nx:["j"]},
      i:{t:"echo",e:"peur",dmg:2,n:"La réserve fermée à clé",x:30,y:56,nx:["k"],art:"c"},
      j:{t:"echo",e:"tristesse",dmg:1,n:"Le port, et les bateaux qui partent",x:70,y:56,nx:["k","l"],art:"d"},
      k:{t:"sanctuaire",n:"La plage derrière le labo",x:25,y:70,nx:["f"],art:"d"},
      l:{t:"enigme",need:"nostalgie",n:"La première photo de lui, poussin",x:75,y:70,nx:["f"],art:"e"},
      f:{t:"echo",e:"peur",dmg:2,n:"La Poké Ball qui ne s'ouvre jamais",x:50,y:82,nx:["g"],foe:{id:390,n:"Ouisticram"}},
      g:{t:"coeur",key:"nostalgie",n:"La table aux trois Poké Balls",x:50,y:94,nx:[]}
    }}
  };
// petites conversations
TALK.tiplouf = [
    {t:"<i>Il inspecte le comptoir du bout de l'aileron, puis hoche la tête, satisfait.</i> Propre. Bien. Au laboratoire, tout brillait. Je ne supporte pas la poussière."},
    {t:"<i>Il regarde le bocal de baies Oran, et son bec se radoucit.</i> Le Professeur en gardait toujours une dans sa poche. Pour moi. Il disait que les Pokémon de mer adorent ça.",like:"oran"},
    {t:"<i>Il lisse ses plumes, l'air de rien.</i> Une fois, un Marill du labo m'a fait goûter une baie Fraive. Fraîche comme la mer en hiver. J'ai fait semblant de ne pas aimer.",like:"fraive"}
  ];
// moments au torchon
WIPE.tiplouf = ["<i>Il surveille ton torchon d'un œil critique, puis hoche la tête.</i> Tu frottes dans le bon sens. Bien.","<i>Il regarde le verre propre briller sous les bougies, et se tait un long moment.</i> On frotte, on frotte, et ça brille. Et puis on le range sur l'étagère."];
// lettre (Cadoizo)
LETTERS.tiplouf = "« J'ai choisi une plage. Elle est à moi. Tu peux venir, si tu veux. Je t'ai choisi aussi. — T. »";
// visite de jour en habitué
REGULARS.tiplouf = {order:{base:"eau",add:["oran"]},
    line:"<i>Il entre en se dandinant, sans lever le bec trop haut, cette fois.</i> Bonjour, tavernier. Une Eau Fraîche avec une baie Oran, s'il te plaît. Oui, de l'eau. Je l'accepte, maintenant.",
    ok:"<i>Il boit, puis fait tourner la baie Oran du bout de l'aileron.</i> Je donne des cours de plongeon aux petits Pokémon de la plage. Ils me choisissent tous les matins. Enfin… c'est moi qui les choisis.",
    ko:"<i>Il lève un sourcil, puis le rabaisse.</i> Ce n'est pas ce que j'ai demandé. Mais je reviendrai. Je reviens toujours, maintenant."};
// phrases dans les salles
ROOM_SAY.tiplouf = {a:"Le laboratoire. Ça sent encore le produit à polir. Et la mer, par la fenêtre.",b:"Ils passent… Ils me regardent, ils sourient, et ils passent.",c:"Trois portes. L'accueil, la vitrine, et la réserve. On m'a rangé dans la réserve, un jour.",d:"L'aquarium. Je venais m'y coller le bec, la nuit. Les poissons, eux, ne choisissaient personne.",e:"Le carnet du Professeur. Il notait tout. Il manque une page… celle qui parle de moi ?",f:"Ma Poké Ball. Elle reste fermée. Elle reste toujours fermée !",g:"La table. Les trois Poké Balls. Plus qu'une.",h:"La vitrine. Les Poké Balls des autres, bien alignées. La mienne n'y est jamais allée.",i:"La réserve. Il fait noir, et ça sent la poussière. On m'y a oublié une semaine entière.",j:"Les bateaux partent pour d'autres régions. Avec des dresseurs dessus. Pas avec moi.",k:"La plage. Le sable froid sous les pattes. Ici, je suis juste un Pokémon de la mer.",l:"Une photo de moi, tout petit. Quelqu'un l'a gardée ?"};
// mots-clés des salles
ROOM_KW.tiplouf = {b:"choisi",e:"laboratoire",f:"Poké Ball"};
// ombre finale
BOSS.tiplouf = {id:390,n:"Ombre d'Ouisticram"};
// carte légendaire offerte
LEGEND_CARD.tiplouf = "becvrille";
// carte offerte
CLIENT_CARD.tiplouf = "bullesdo";
// carte « Bulles d'O »
CARDS.bullesdo = {n:"Bulles d'O",c:1,t:"atk",dmg:5,soak:2,draw:1,r:"client",i:"🫧",from:"tiplouf"};
// carte « Bec Vrille »
CARDS.becvrille = {n:"Bec Vrille",c:1,t:"atk",dmg:9,execute:true,draw:1,r:"legende",i:"🐧",from:"tiplouf",d:"9 dégâts, doublés si l'ombre a moins de la moitié de ses PV. Pioche 1."};

// =====================================================================
// CANARTICHO  (canarticho)
// =====================================================================
// fiche (histoire, confidences, Labyrinthe)
CL.canarticho = {
    season:2,from:2,id:83,n:"Canarticho",c:"#b89060",family:"Défaite",wound:"combat",likesEss:["vol"],comfort:["menthe","pommeacide","the","ceriz","lait"],dislike:["soda","poudre","gateau"],tol:2,
    duelist:true,
    intro:"La porte s'ouvre lentement. Un Canarticho entre en boitant légèrement, une tige verte serrée sous l'aile comme une épée au fourreau. Il salue la salle d'une courbette impeccable, s'installe au comptoir et pose la tige devant lui. Elle est cassée en deux.",
    arrive:"<i>Il redresse le cou, très digne, sans quitter la tige des yeux.</i> Tavernier. Un verre, je te prie. Un vrai. On ne bavarde pas avec un duelliste avant de l'avoir servi.",
    hints:["Chaque fois que quelqu'un fait un geste brusque, son aile se crispe sur la tige cassée, comme pour dégainer.","La tige est ligaturée avec un vieux ruban. Il refait le nœud quand il croit que personne ne regarde.","Il compte à voix basse en tapotant le comptoir : un, deux, trois… puis il s'arrête toujours au même chiffre."],
    stages:[
      {req:0,t:"<i>Il caresse la tige du bout de l'aile.</i> À Jadielle, j'étais le meilleur duelliste au poireau. Trente-six victoires. On venait de trois villes pour me voir croiser le fer.",kw:"poireau"},
      {req:2,t:"<i>Sa voix baisse d'un ton.</i> Le dernier duel, c'était contre le jeune champion. Un coup, un seul, et j'ai entendu le craquement avant de comprendre. La foule s'est tue.",kw:"duel"},
      {req:3,t:"<i>Il pose la tige à plat, et la regarde longtemps.</i> Un Canarticho sans poireau, ce n'est plus rien. Juste un canard. Alors je garde les morceaux. Au cas où ils se recolleraient.",kw:"cassé"},
      {req:4,t:"<i>Il lève enfin les yeux de la tige.</i> Mon père disait qu'un duelliste se juge à sa façon de saluer, pas de gagner. Je l'avais oublié. Je crois que je sais encore saluer."}
    ],
    lie:{after:0,t:"<i>Il bombe le jabot.</i> Ce poireau ? Une simple égratignure. Je pourrais encore battre n'importe qui."},
    reform:{"poireau":"« Ce poireau, c'était ton arme. Ce n'était pas toi. »","duel":"« Perdre un duel, ce n'est pas perdre l'honneur. »","cassé":"« Ce qui est cassé peut rester précieux. »"},
    essGood:"<i>Il boit d'un trait, comme on accepte un défi, et son aile se desserre enfin sur la tige.</i> Ça… ça pique comme la veille d'un tournoi. Merci.",
    essBad:"<i>Il recule, l'aile sur la tige, prêt à dégainer.</i> Trop ! Tu veux me provoquer en duel, tavernier ?",
    frags:[{n:"Le premier poireau cueilli avec son père",e:"nostalgie"},{n:"La foule de Jadielle qui scandait son nom",e:"joie"}],
    thanks:"<i>Il se lève, glisse la tige cassée dans sa ceinture, et te fait la plus belle courbette de la soirée.</i> Un duelliste se juge à sa façon de saluer. Je te salue, tavernier.",
    gift:{key:"poireau",n:"Poireau de Canarticho",i:"🥬",d:"La première attaque de chaque combat inflige 6 dégâts de plus"},
    staff:{n:"Maître d'armes",d:"Les âmes de la Défaite arrivent avec +1 Ouverture",wage:25},
    cogHint:"C'est un duelliste : sers-le avant de lui faire la conversation, sinon il se vexe. Une seule Gelée Orange, pour lui rendre son cran, et quelque chose de vert, de la Menthe ou une Pomme Acidulée.",
    map:{start:"a",nodes:{
      a:{t:"entree",n:"Les champs de poireaux de Jadielle",x:50,y:6,nx:["b"]},
      b:{t:"echo",e:"colere",dmg:1,n:"Le jeune champion qui s'incline à peine",x:50,y:18,nx:["c"],foe:{id:83,n:"Champion"}},
      c:{t:"carrefour",n:"Deux allées du marché",x:50,y:30,nx:["d","h"]},
      d:{t:"sanctuaire",n:"La forge du ferronnier",x:22,y:42,nx:["i","e"]},
      h:{t:"echo",e:"peur",dmg:2,n:"Le craquement qui résonne",x:78,y:42,nx:["e","j"],art:"b"},
      i:{t:"echo",e:"tristesse",dmg:1,n:"Les trophées qu'on décroche",x:14,y:56,nx:["k"],art:"d"},
      e:{t:"enigme",need:"nostalgie",n:"Le premier poireau, dans la main de son père",x:50,y:56,nx:["k","l"]},
      j:{t:"echo",e:"colere",dmg:2,n:"Les rires sur les gradins",x:86,y:56,nx:["l"],art:"b"},
      k:{t:"sanctuaire",n:"Le banc sous le saule",x:28,y:70,nx:["f"],art:"d"},
      l:{t:"enigme",need:"joie",n:"La foule qui scande son nom",x:72,y:70,nx:["f"],art:"e"},
      f:{t:"echo",e:"peur",dmg:2,n:"La tige brisée dans la poussière",x:50,y:82,nx:["g"],foe:{id:83,n:"Champion"}},
      g:{t:"coeur",key:"joie",n:"L'arène de duel, sous la pluie",x:50,y:94,nx:[]}
    }}
  };
// petites conversations
TALK.canarticho = [
    {t:"<i>Il essuie la tige cassée avec un coin de serviette.</i> Un bon duelliste entretient son arme tous les soirs. Même quand il n'y a plus de duel."},
    {t:"<i>Il hume une feuille de menthe posée sur le comptoir.</i> Ça sent le vert. Le vrai vert, celui des champs de Jadielle au printemps.",like:"menthe"},
    {t:"<i>Il croque dans un quartier de pomme, très dignement.</i> L'acidité réveille les réflexes. Mon maître d'armes ne jurait que par les pommes acidulées.",like:"pommeacide"}
  ];
// moments au torchon
WIPE.canarticho = ["<i>Il observe ton geste avec un œil d'expert.</i> Pas mal. Le poignet souple, comme pour une parade.","<i>Il hoche la tête, approbateur.</i> Un verre propre, une lame propre. Tout commence par là."];
// lettre (Cadoizo)
LETTERS.canarticho = "« J'ai salué le jeune champion, hier. Il m'a rendu le salut, très bas. On a ri tous les deux. — C. »";
// visite de jour en habitué
REGULARS.canarticho = {order:{base:"the",add:["menthe"]},
    line:"<i>Il entre en saluant toute la salle d'une courbette, la tige cassée glissée dans sa ceinture comme une décoration.</i> Tavernier ! Un thé à la menthe, je te prie. Le thé des vainqueurs… et des vaincus.",
    ok:"<i>Il boit, le petit doigt levé.</i> J'enseigne le salut aux jeunes duellistes de Bourg-Brume. Pas le combat : le salut. Ils trouvent ça bizarre. Ils y viennent tous les jours.",
    ko:"<i>Il repose la tasse avec un soupir élégant.</i> Ce n'était pas ma commande. Mais un duelliste sait encaisser."};
// phrases dans les salles
ROOM_SAY.canarticho = {a:"Les champs de Jadielle. Je m'entraînais ici tous les matins, avant le lever du soleil.",b:"Lui. Le jeune champion. Il s'est à peine incliné, après le duel.",c:"Deux allées. L'une mène à la forge, l'autre aux gradins.",d:"La forge. Le ferronnier redressait les poireaux tordus. Il ne pouvait rien pour le mien.",e:"Mon père… il tenait mon premier poireau dans sa main. Il manque quelque chose à ce souvenir.",f:"La tige, dans la poussière. Je n'arrive pas à la ramasser.",g:"L'arène, sous la pluie. C'est ici que j'ai perdu.",h:"Ce craquement… Je l'entends encore chaque nuit.",i:"Ils décrochent mes trophées. Un par un.",j:"Ils riaient. Le grand Canarticho, battu par un gamin.",k:"Le saule. Je m'y asseyais après chaque victoire. Jamais après une défaite.",l:"Ils scandaient mon nom… Il manque une voix dans la foule."};
// mots-clés des salles
ROOM_KW.canarticho = {b:"duel",e:"poireau",f:"cassé"};
// ombre finale
BOSS.canarticho = {id:83,n:"Ombre du jeune champion"};
// carte légendaire offerte
LEGEND_CARD.canarticho = "dueltfinal";
// carte offerte
CLIENT_CARD.canarticho = "tranche";
// carte « Tranche »
CARDS.tranche = {n:"Tranche",c:1,t:"atk",dmg:8,r:"client",i:"🥬",from:"canarticho"};
// carte « Duel Final »
CARDS.dueltfinal = {n:"Duel Final",c:1,t:"atk",dmg:9,firstDouble:true,r:"legende",i:"⚔️",from:"canarticho",d:"9 dégâts, doublés si c'est la première carte jouée ce tour."};

// =====================================================================
// GOUPIX  (goupix)
// =====================================================================
// fiche (histoire, confidences, Labyrinthe)
CL.goupix = {
    season:2,from:3,id:37,n:"Goupix",fem:true,c:"#d8703a",family:"Abandon",wound:"feu",likesEss:["normal"],comfort:["framby","miel","pommesucree","figuy","lait"],dislike:["fraive","menthe","gateau"],tol:2,
    cold:true,
    intro:"La porte s'entrouvre et une petite Goupix se faufile à l'intérieur, les six queues ramenées autour d'elle comme une écharpe. Elle file droit vers la cheminée, s'assoit le plus près possible des braises, et tend les pattes vers le feu.",
    arrive:"<i>Elle frissonne, malgré la chaleur.</i> Bonsoir… Je peux rester près du feu ? J'ai froid depuis tellement longtemps. Quelque chose de chaud, s'il vous plaît. Pas de glaçons.",
    hints:["Ses six queues se resserrent autour d'elle chaque fois que la porte laisse passer un courant d'air.","Elle regarde souvent la vitrine de la boutique d'en face, de l'autre côté de la rue. Il y a une pierre rouge dedans.","Quand elle croit que personne ne la voit, elle essaie de souffler une flammèche. Il ne sort qu'un peu de fumée."],
    stages:[
      {req:0,t:"<i>Elle compte ses queues du bout du museau.</i> Six. Une pour chaque année de route avec elle. Ma dresseuse disait qu'à la sixième, on fêterait ça.",kw:"six queues"},
      {req:2,t:"<i>Ses oreilles se couchent.</i> Elle m'avait promis une Pierre Feu, pour mes six ans. Pour que je devienne grande, et belle, comme les Feunard des affiches.",kw:"Pierre Feu"},
      {req:3,t:"<i>Sa voix tremble, et la flamme de la cheminée vacille avec.</i> Le jour de mes six ans, elle est revenue du Centre d'échange avec un Feunard. Déjà grand. Déjà beau. Elle m'a dit d'être sage. Et elle est partie avec lui.",kw:"Feunard"},
      {req:4,t:"<i>Elle souffle doucement, et une vraie petite flamme danse au bout de son museau.</i> Je n'ai pas besoin d'une pierre pour avoir chaud. Je l'avais oublié. Le feu, il est déjà là."}
    ],
    lie:{after:0,t:"<i>Elle remue ses queues, un peu trop vite.</i> Ma dresseuse va revenir me chercher. Elle est juste en retard. Très en retard."},
    reform:{"six queues":"« Ces six années t'appartiennent. Personne ne peut te les reprendre. »","Pierre Feu":"« Tu n'as pas besoin de changer pour mériter qu'on t'aime. »","Feunard":"« Elle a fait un choix. Ça ne dit rien de ta valeur. »"},
    essGood:"<i>Elle boit, et une chaleur rose lui monte aux joues. Ses queues se déploient une à une.</i> Oh… Ça réchauffe jusqu'au bout des queues. Comme une vraie flamme.",
    essBad:"<i>Elle tousse, une petite fumée noire s'échappe de sa gueule.</i> Trop chaud ! Ça brûle… comme le jour où j'ai essayé de grandir trop vite.",
    frags:[{n:"La première nuit au coin du feu avec sa dresseuse",e:"nostalgie"},{n:"La flamme qu'elle a allumée toute seule",e:"joie"}],
    thanks:"<i>Elle s'éloigne de la cheminée pour la première fois, et ses six queues s'ouvrent en éventail, rougeoyantes.</i> J'ai chaud. Toute seule. Merci de m'avoir laissée m'asseoir près du feu.",
    gift:{key:"ruban",n:"Ruban de Goupix",i:"🎀",d:"Chaque Brûlure appliquée à une ombre est augmentée de 1"},
    staff:{n:"Feu de cheminée",d:"+1 PC max chaque nuit, et les âmes de l'Abandon arrivent avec 1 Tension de moins",wage:25},
    cogHint:"Elle a toujours froid : pas d'Eau Fraîche ni de Soda glacé, ça la fait frissonner. Une seule Gelée Rouge, pour rallumer sa flamme, et du doux : Miel, Baie Framby, Pomme Sucrée.",
    map:{start:"a",nodes:{
      a:{t:"entree",n:"La route d'automne",x:50,y:6,nx:["b"]},
      b:{t:"echo",e:"tristesse",dmg:1,n:"Les feuilles qui tombent une à une",x:50,y:18,nx:["c","h"]},
      c:{t:"enigme",need:"nostalgie",n:"Le feu de camp éteint",x:28,y:30,nx:["d"]},
      h:{t:"echo",e:"peur",dmg:1,n:"Le vent froid du col",x:74,y:30,nx:["d","i"],art:"a"},
      d:{t:"carrefour",n:"Deux chemins dans la neige",x:40,y:44,nx:["e","j"]},
      i:{t:"enigme",need:"joie",n:"La photo des six ans",x:86,y:44,nx:["j"],art:"c"},
      e:{t:"sanctuaire",n:"La grotte tiède",x:15,y:58,nx:["k"]},
      j:{t:"echo",e:"colere",dmg:2,n:"La vitrine de la Pierre Feu",x:68,y:58,nx:["f"],art:"b"},
      k:{t:"sanctuaire",n:"Les braises sous la cendre",x:28,y:70,nx:["f"],art:"e"},
      f:{t:"echo",e:"tristesse",dmg:2,n:"Le Centre d'échange",x:50,y:82,nx:["g"],foe:{id:38,n:"Feunard"}},
      g:{t:"coeur",key:"joie",n:"Le jour de ses six ans",x:50,y:94,nx:[]}
    }}
  };
// petites conversations
TALK.goupix = [
    {t:"<i>Elle tend une patte vers les braises, puis la retire.</i> Chez ma dresseuse, il y avait toujours une couverture sur le canapé. Elle était pour moi."},
    {t:"<i>Elle renifle le pot de miel, les yeux mi-clos.</i> Le miel chaud, les soirs d'hiver… Ça sentait comme ça, à la maison.",like:"miel"},
    {t:"<i>Elle regarde les baies Framby dans leur bocal.</i> Les Framby ont la couleur de mes queues, quand elles sont bien chaudes. Je les aimais pour ça.",like:"framby"}
  ];
// moments au torchon
WIPE.goupix = ["<i>Le bruit du torchon la berce. Elle bâille, et une petite étincelle s'échappe.</i>","<i>Elle te regarde ranger le verre près du feu.</i> Mettez-le là, il sera tout chaud pour le prochain."];
// lettre (Cadoizo)
LETTERS.goupix = "« J'ai allumé ma première lanterne toute seule. Elle brille plus fort que n'importe quelle Pierre Feu. — G. »";
// visite de jour en habitué
REGULARS.goupix = {order:{base:"lait",add:["miel"]},
    line:"<i>Elle entre en trottinant, ses six queues en éventail, et ne file même pas vers la cheminée.</i> Bonjour ! Un lait au miel, s'il te plaît. Bien chaud. Enfin… normal, ça ira aussi.",
    ok:"<i>Elle boit, et une flammèche heureuse danse au bout de son museau.</i> J'allume les lanternes du village, le soir. Toute seule. Les petits me suivent pour voir les flammes.",
    ko:"<i>Elle penche la tête, sans rancune.</i> Ce n'est pas tout à fait ça. Ce n'est pas grave, je reviendrai."};
// phrases dans les salles
ROOM_SAY.goupix = {a:"La route d'automne. On l'a parcourue six fois, elle et moi.",b:"Les feuilles tombent… une par année. Il n'en reste plus.",c:"Notre feu de camp. Il est éteint. Il manque quelque chose pour le rallumer.",d:"Deux chemins dans la neige. Il fait si froid.",e:"Une grotte tiède. Je peux m'y blottir un moment ?",f:"Le Centre d'échange. C'est là qu'elle est allée chercher l'autre.",g:"Le jour de mes six ans. Le jour où elle est partie.",h:"Le vent du col… Il souffle à travers toutes mes queues.",i:"Notre photo, pour mes six ans. Il manque quelqu'un dessus.",j:"La Pierre Feu, dans la vitrine. Elle brille comme une promesse.",k:"Des braises, sous la cendre. Elles ne sont pas tout à fait éteintes."};
// mots-clés des salles
ROOM_KW.goupix = {b:"six queues",j:"Pierre Feu",f:"Feunard"};
// ombre finale
BOSS.goupix = {id:38,n:"Ombre de Feunard"};
// carte légendaire offerte
LEGEND_CARD.goupix = "sixflammes";
// carte offerte
CLIENT_CARD.goupix = "danseflamme";
// carte « Danse Flamme »
CARDS.danseflamme = {n:"Danse Flamme",c:1,t:"skill",burn:4,block:4,r:"client",i:"🦊",from:"goupix"};
// carte « Six Flammes »
CARDS.sixflammes = {n:"Six Flammes",c:2,t:"atk",dmg:2,hits:6,burn:6,r:"legende",i:"🔥",from:"goupix",d:"2 dégâts ×6, puis Brûlure 6. Une flamme par queue."};

// =====================================================================
// HYPOTREMPE  (hypotrempe)
// =====================================================================
// fiche (histoire, confidences, Labyrinthe)
CL.hypotrempe = {
    season:2,from:5,id:116,n:"Hypotrempe",c:"#5aa8d8",family:"Abandon",wound:"eau",likesEss:["normal"],comfort:["oran","mago","pecha","lait","miel"],dislike:["liqueur","poudre","grochampi"],tol:1,
    quiet:true,
    intro:"Un clapotis, et la porte s'ouvre à peine. Un minuscule Hypotrempe flotte à l'intérieur, enroulé sur lui-même. Il va se coller contre le grand aquarium du fond de la salle et y reste, immobile, à regarder les bulles monter.",
    arrive:"<i>Il parle si bas qu'il faut se pencher pour l'entendre.</i> Bonsoir… Pas trop de bruit, s'il vous plaît. Le bruit, ça fait comme la tempête.",
    hints:["Chaque fois qu'un verre tinte, il s'enroule un peu plus sur lui-même, la queue serrée.","Il colle souvent son ventre contre la vitre de l'aquarium, comme pour sentir quelque chose de chaud contre lui.","Il fixe la porte d'un air triste. Puis il se force à regarder ailleurs."],
    stages:[
      {req:0,t:"<i>Il fait une toute petite bulle.</i> Je viens d'un récif, très loin. Il y avait du corail de toutes les couleurs. Et papa.",kw:"récif"},
      {req:2,t:"<i>Il se tasse contre la vitre.</i> Chez nous, c'est les papas qui portent les petits, dans une poche, contre leur ventre. J'étais tout au fond. C'était chaud.",kw:"poche"},
      {req:3,t:"<i>Sa queue se met à trembler.</i> Une nuit, il y a eu la tempête. Le courant m'a arraché de la poche. J'ai crié. Papa n'est jamais venu. Peut-être qu'il m'a laissé partir. Peut-être que j'étais trop lourd.",kw:"courant"},
      {req:4,t:"<i>Il se déroule lentement, pour la première fois.</i> …Ou peut-être qu'il m'a cherché toute la nuit. Le courant était si fort. Il ne m'a pas laissé partir. Il n'a pas pu me retenir. Ce n'est pas pareil."}
    ],
    lie:{after:0,t:"<i>Il redresse sa petite tête.</i> De toute façon, je suis grand, maintenant. Je n'ai besoin de personne."},
    reform:{"récif":"« Ce récif fait partie de toi, même de loin. »","poche":"« Tu étais là où on te protégeait. Tu comptais. »","courant":"« La tempête t'a emporté. Personne ne t'a lâché. »"},
    essGood:"<i>Il boit à petites gorgées, et ses nageoires se mettent à battre doucement, comme dans une eau calme.</i> C'est… comme le récif, les matins sans vent.",
    essBad:"<i>Il se roule en boule et file au fond de l'aquarium.</i> Trop ! Ça tourbillonne… comme le courant…",
    frags:[{n:"La chaleur de la poche de son père",e:"nostalgie"},{n:"Le premier corail trouvé tout seul",e:"joie"}],
    thanks:"<i>Il fait le tour de l'aquarium, puis revient se poser sur le comptoir, tout déroulé.</i> Demain, je redescends vers la mer. Je vais chercher un récif. Et si je ne trouve pas papa… j'en trouverai un où il ferait bon grandir.",
    gift:{key:"corne",n:"Corne d'Hypotrempe",i:"🐚",d:"Au début de chaque combat, l'ombre est Trempée 3"},
    staff:{n:"Aquarium",d:"Les âmes de l'Abandon arrivent avec +1 Ouverture",wage:20},
    cogHint:"Il a peur du bruit : n'essuie pas les verres devant lui, le tintement l'effraie. Une seule Gelée Bleue, pour lui rappeler la mer calme, et du doux : Baie Oran, Baie Mago, Lait Meumeu.",
    map:{start:"a",nodes:{
      a:{t:"entree",n:"Le récif aux mille couleurs",x:50,y:6,nx:["b"]},
      b:{t:"echo",e:"peur",dmg:2,n:"La tempête qui gronde",x:50,y:18,nx:["c"]},
      c:{t:"carrefour",n:"Trois courants",x:50,y:30,nx:["d","h","e"]},
      d:{t:"sanctuaire",n:"La grotte de corail",x:15,y:42,nx:["i"]},
      h:{t:"echo",e:"tristesse",dmg:1,n:"La poche vide qui s'éloigne",x:50,y:42,nx:["i","j"],art:"b"},
      e:{t:"enigme",need:"nostalgie",n:"Le chant des baleines",x:85,y:42,nx:["j"]},
      i:{t:"echo",e:"peur",dmg:1,n:"Les profondeurs sans lumière",x:30,y:56,nx:["k"],art:"c"},
      j:{t:"carrefour",n:"L'épave silencieuse",x:70,y:56,nx:["k","l"],art:"c"},
      k:{t:"sanctuaire",n:"L'herbier tranquille",x:25,y:70,nx:["f"],art:"d"},
      l:{t:"enigme",need:"joie",n:"Le premier corail",x:75,y:70,nx:["f"],art:"e"},
      f:{t:"echo",e:"colere",dmg:2,n:"Le courant qui arrache tout",x:50,y:82,nx:["g"],foe:{id:117,n:"Hypocéan"}},
      g:{t:"coeur",key:"nostalgie",n:"La nuit de la tempête",x:50,y:94,nx:[]}
    }}
  };
// petites conversations
TALK.hypotrempe = [
    {t:"<i>Il suit des yeux une bulle de l'aquarium jusqu'à la surface.</i> Une, deux, trois… Au récif, on comptait les bulles pour s'endormir."},
    {t:"<i>Il regarde le bocal de baies Oran, tout bleu.</i> Elles ont la couleur de la mer calme. Papa en cueillait pour moi, sur les rochers.",like:"oran"},
    {t:"<i>Il se colle contre une tasse de lait tiède.</i> C'est chaud… comme la poche. Pardon. Je n'aurais pas dû dire ça.",like:"lait"}
  ];
// moments au torchon
WIPE.hypotrempe = ["<i>Le verre tinte contre le comptoir. Il sursaute et s'enroule, tout tremblant.</i>","<i>Il se cache derrière l'aquarium au moindre cliquetis.</i> Pas… pas le bruit, s'il vous plaît."];
// lettre (Cadoizo)
LETTERS.hypotrempe = "« J'ai trouvé un récif. Il est petit, mais les courants y sont doux. J'y apprends à grandir. — H. »";
// visite de jour en habitué
REGULARS.hypotrempe = {order:{base:"lait",add:["oran"]},
    line:"<i>Il entre en flottant, tout déroulé, et ose même un petit bonjour à voix haute.</i> Bonjour ! Un lait Meumeu avec une baie Oran, s'il te plaît. …Ce n'était pas trop fort, j'espère ?",
    ok:"<i>Il boit, puis fait une bulle parfaitement ronde.</i> J'ai trouvé un récif, en contrebas du port. Il y a un vieil Hypocéan qui y vit. Il m'apprend à reconnaître les courants.",
    ko:"<i>Il fait une petite bulle déçue.</i> Ce n'est pas ma commande… Je reviendrai quand même."};
// phrases dans les salles
ROOM_SAY.hypotrempe = {a:"Le récif. Toutes ces couleurs… Je les avais oubliées.",b:"La tempête… Elle arrive. Elle gronde.",c:"Trois courants. Ils tirent tous dans un sens différent.",d:"Une grotte de corail. Ici, le courant ne passe pas.",e:"Le chant des baleines. Papa chantait comme ça, pour m'endormir. Il manque une note.",f:"Le courant ! Il m'arrache, il m'arrache encore !",g:"La nuit de la tempête. La poche qui s'éloigne dans le noir.",h:"La poche… vide. Elle s'éloigne sans moi.",i:"Plus de lumière. Juste le froid et le silence.",j:"Une épave. Les poissons s'y cachent quand la mer se fâche.",k:"Un herbier tranquille. Les algues bougent doucement.",l:"Le premier corail que j'ai trouvé tout seul. Il manque quelque chose autour."};
// mots-clés des salles
ROOM_KW.hypotrempe = {a:"récif",h:"poche",f:"courant"};
// ombre finale
BOSS.hypotrempe = {id:116,n:"Ombre de la tempête",self:true};
// carte légendaire offerte
LEGEND_CARD.hypotrempe = "ouragan";
// carte offerte
CLIENT_CARD.hypotrempe = "brouillard";
// carte « Brouillard »
CARDS.brouillard = {n:"Brouillard",c:1,t:"skill",weak:2,draw:1,r:"client",i:"🌫️",from:"hypotrempe"};
// carte « Ouragan »
CARDS.ouragan = {n:"Ouragan",c:2,t:"atk",dmg:4,hits:3,soak:4,retain:true,r:"legende",i:"🌀",from:"hypotrempe",d:"4 dégâts ×3, Trempé 4. Retenue."};
