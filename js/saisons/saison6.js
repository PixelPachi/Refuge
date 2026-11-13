// Saison 6 · Chapitre 3 « Les métamorphoses » (fin du chapitre)
// Famille de blessure : l'Évolution manquée. Grand Regret de fin de chapitre : Mewtwo (js/11-saison.js).
// Tout ce qui concerne chaque âme de la saison est regroupé ici, client par client.
// Images Gemini à faire : voir GEMINI.md (décor générique en attendant).

// =====================================================================
// RAMOLOSS  (ramoloss)
// =====================================================================
CL.ramoloss = {
    season:6,from:1,id:79,n:"Ramoloss",c:"#f0a0b0",family:"Évolution manquée",wound:"eau",likesEss:["psy"],comfort:["eau","miel","oran","eaumystique","the"],dislike:["soda","superbonbon","poudre"],tol:3,
    intro:"La porte s'ouvre. Rien ne se passe pendant un long moment. Puis, très, très lentement, un Ramoloss rose entre, s'arrête au milieu de la salle pour réfléchir, et finit par s'asseoir. Sa queue traîne derrière lui. Il la regarde souvent, comme s'il y manquait quelque chose.",
    arrive:"<i>Il ouvre la bouche. Attend. La referme. La rouvre.</i> …Bonsoir. Je voudrais… de l'eau. Ou… peut-être… Non. De l'eau. Je crois.",
    hints:["Il regarde le bout de sa queue, puis la porte, puis le bout de sa queue. Il soupire tout doucement.","Sur sa queue, il y a une petite marque ronde, comme la trace de quelque chose qui y est resté accroché longtemps.","Quand quelqu'un parle vite, il sourit, perdu, et attend que les mots arrivent jusqu'à lui."],
    stages:[
      {req:0,t:"<i>Il fixe sa queue pendant une bonne minute.</i> Avant… j'étais Flagadoss. Grand. Debout. Avec… un ami, accroché là. Un Kokiyas. Il s'appelait Clac.",kw:"queue"},
      {req:2,t:"<i>Il sourit, très lentement.</i> Clac m'a mordu la queue, un jour, à la pêche. Et on a évolué. Tous les deux. Ensemble. Pendant des années, on a tout fait à deux. Lui parlait vite. Moi, je réfléchissais. Ça marchait bien.",kw:"Kokiyas"},
      {req:3,t:"<i>Ses yeux se mouillent, lentement aussi.</i> Un matin, Clac a lâché. Il a dit qu'il voulait voir la mer, la vraie, celle du large. Je n'ai pas été assez rapide pour répondre. Le temps que je dise « attends », il était parti. Et je suis redevenu… Ramoloss. Comme si j'avais reculé.",kw:"reculer"},
      {req:4,t:"<i>Il caresse la petite marque ronde sur sa queue.</i> Je n'ai pas reculé. Les années avec Clac, elles sont là. Dans la marque. Je suis Ramoloss, avec un souvenir de Flagadoss. C'est… plutôt bien, en fait. Ça m'a pris du temps. Je prends toujours du temps."}
    ],
    lie:{after:0,t:"<i>Il hausse les épaules, très lentement.</i> Je préfère être Ramoloss. C'est plus… léger. Clac était lourd. Je ne pense plus à lui."},
    reform:{"queue":"« Ce qui manque sur ta queue raconte une belle histoire. »","Kokiyas":"« Vous avez évolué ensemble. Ça, personne ne peut te l'enlever. »","reculer":"« Revenir à ta forme, ce n'est pas reculer. C'est continuer autrement. »"},
    essGood:"<i>Il boit… et au bout de dix secondes, il sourit.</i> …Ah. C'est doux. Comme la rivière où on pêchait.",
    essBad:"<i>Il repose le verre, avec un temps de retard.</i> …C'était trop. Je viens de m'en rendre compte.",
    frags:[{n:"La première pêche, et la morsure de Clac",e:"joie"},{n:"Les années à deux, l'un rapide, l'autre lent",e:"nostalgie"}],
    thanks:"<i>Il se lève, très lentement, et sa queue ne traîne plus.</i> Je vais retourner à la rivière. Pêcher. Peut-être qu'un autre Kokiyas mordra. Peut-être pas. Si Clac revient du large, il saura où me trouver. Je ne vais nulle part très vite.",
    gift:{key:"marque",n:"Queue de Ramoloss",i:"🎣",d:"Tous les 3 tours, le client gagne 1 énergie de plus (aux tours 3, 6, 9…)",fx:{turnStart(C){ if(C.turn%3===0){ C.energy++; C.emax++; } }}},
    staff:{n:"Pêcheur patient",d:"Tous les clients restent un échange de plus, mais arrivent avec 1 Ouverture de moins (minimum 0)",wage:15},
    staffFx:{arrive(c){ c.turns++; c.ouv=Math.max(0,c.ouv-1); }},
    cogHint:"Il est très lent : laisse-lui le temps, ne le relance pas trop vite. Une Gelée Bleue, comme sa rivière, et du simple : Eau Fraîche, Miel, Eau Mystique.",
    map:mapStd({a:"La rivière de pêche",b:"La queue qui traîne",h:"Le courant trop rapide",c:"Le ponton de bois",i:"La morsure de Clac",d:"La berge au soleil",j:"Les mots qui arrivent trop tard",k:"Les années à deux",l:"L'eau calme du soir",f:"Le matin où Clac a lâché",g:"Le jour où il est redevenu Ramoloss"},{eb:"tristesse",eh:"peur",ej:"colere",ef:"tristesse",key:"joie",foe:{id:80,n:"Flagadoss"}})
};
TALK.ramoloss = [
    {t:"<i>Il regarde une mouche se poser sur le comptoir, puis repartir. Il sourit avec trois secondes de retard.</i> …Elle était jolie."},
    {t:"<i>Il plonge le bout de sa queue dans son verre d'eau, par réflexe.</i> Oh… pardon. L'habitude de la pêche. Clac disait que c'était dégoûtant. Il avait raison.",like:"eau"},
    {t:"<i>Il fixe l'Eau Mystique dans son flacon.</i> …Elle brille comme la mer du large. Celle que Clac voulait voir. Je comprends, un peu.",like:"eaumystique"}
];
WIPE.ramoloss = ["<i>Il regarde le torchon tourner, tourner, tourner, et finit par s'endormir à moitié, la tête sur le comptoir.</i>","<i>Il dit « merci » pour le verre essuyé. Tu l'as essuyé il y a deux minutes.</i>"];
LETTERS.ramoloss = "« Un Kokiyas a mordu ma queue hier. Pas Clac. Un petit, très bavard. Je ne suis pas devenu Flagadoss. Il est resté accroché quand même. On pêche. — R. (écrit en quatre jours) »";
REGULARS.ramoloss = {order:{base:"eau",add:["oran"]},
    line:"<i>Il entre, très lentement, un petit Kokiyas accroché à la queue qui parle sans arrêt.</i> …Bonjour. Une Eau Fraîche à la Baie Oran. Et… il voudrait savoir si vous avez du sel. Pour lui.",
    ok:"<i>Il boit pendant que le Kokiyas raconte toute sa semaine.</i> …On n'évolue pas, lui et moi. Ça ne prend pas. Ce n'est pas grave. On s'entend bien quand même.",
    ko:"<i>Il goûte, réfléchit longtemps.</i> …Ce n'est pas ça. Mais ce n'est pas loin. Je reviendrai. Lentement."};
ROOM_SAY.ramoloss = {a:"La rivière. On pêchait ici, Clac et moi.",b:"Ma queue traîne. Il manque quelque chose au bout.",h:"Le courant va trop vite. Tout va trop vite.",c:"Le ponton. C'est là qu'il m'a mordu, la première fois.",i:"La morsure. Ça faisait mal. Et après, on était grands, tous les deux.",d:"La berge au soleil. On y faisait la sieste. Enfin, moi.",j:"« Attends. » Je l'ai dit trop tard. Toujours trop tard.",k:"Les années à deux. Lui parlait, moi je pensais.",l:"L'eau du soir est calme. Comme moi.",f:"Le matin où Clac a lâché. Il est parti si vite.",g:"Le jour où je suis redevenu Ramoloss."};
ROOM_KW.ramoloss = {b:"queue",c:"Kokiyas",f:"reculer"};
BOSS.ramoloss = {id:80,n:"Ombre de Flagadoss"};
LEGEND_CARD.ramoloss = "lenteur";
CLIENT_CARD.ramoloss = "flemme";
CARDS.flemme = {n:"Paresse",c:1,t:"skill",heal:5,block:5,r:"client",i:"🎣",from:"ramoloss"};
CARDS.lenteur = {n:"Tout en Lenteur",c:2,t:"skill",block:12,heal:8,draw:1,retain:true,r:"legende",i:"🎣",from:"ramoloss",d:"12 de Bouclier, soigne 8 PV, pioche 1. Retenue. Rien ne presse."};

// =====================================================================
// EMBRYLEX  (embrylex)
// =====================================================================
CL.embrylex = {
    season:6,from:2,id:246,n:"Embrylex",c:"#88a858",family:"Évolution manquée",wound:"combat",likesEss:["normal"],comfort:["lait","pommesucree","mago","biscuit","pierrestase"],dislike:["superbonbon","liqueur","soda"],tol:2,
    intro:"Un tout petit Embrylex pousse la porte avec la tête, puis entre en traînant un énorme sac de cailloux. Il le pose sous le tabouret, vérifie que personne ne regarde, et en sort une petite pierre ronde et brillante qu'il pose devant lui sur le comptoir, comme un trésor.",
    arrive:"<i>Il parle vite, d'une voix grave qu'il essaie de rendre encore plus grave.</i> Bonsoir. Un verre. Le plus fort. Je suis grand, maintenant. Enfin, presque. Bientôt. …Un lait, finalement.",
    hints:["Il cache son sac de cailloux dès que quelqu'un s'approche. Ce ne sont pas des cailloux à manger. Ils sont trop jolis.","Il serre les poings en regardant le portrait d'un énorme Tyranocif accroché à la porte d'une auberge, dehors.","Il a de la terre au coin de la bouche. Il l'essuie, honteux, en grimaçant."],
    stages:[
      {req:0,t:"<i>Il fait rouler sa pierre ronde.</i> Mes parents sont des Tyranocif. Les plus grands de la montagne. Quand papa marche, la vallée tremble. Moi, quand je marche, rien ne tremble.",kw:"montagne"},
      {req:2,t:"<i>Il essuie la terre au coin de sa bouche.</i> Pour évoluer, un Embrylex doit manger la montagne. Des tonnes de terre et de roche. Papa en mangeait des collines entières, à mon âge. Moi… je n'aime pas ça. Ça a goût de rien. Ça craque sous les dents.",kw:"manger"},
      {req:3,t:"<i>Il serre le sac contre lui.</i> Alors je garde les jolies pierres au lieu de les manger. Les rondes, les brillantes, celles avec des lignes dedans. Papa a trouvé mon sac. Il a dit qu'un futur Tyranocif ne joue pas avec ce qu'il doit avaler. Que je lui faisais honte.",kw:"Tyranocif"},
      {req:4,t:"<i>Il pose toutes ses pierres en rang sur le comptoir, fièrement.</i> Je mangerai la montagne un jour. Peut-être. Mais je n'arrêterai pas de regarder les pierres. Un Tyranocif qui sait voir la beauté des cailloux, ce serait un Tyranocif bizarre. Ce serait le mien."}
    ],
    lie:{after:0,t:"<i>Il bombe le torse.</i> J'adore manger la montagne. J'en ai mangé une hier. Une grosse. C'est pour ça que je n'ai pas faim."},
    reform:{"montagne":"« Tu n'as pas besoin de faire trembler la vallée pour compter. »","manger":"« Chacun grandit à sa façon, même un Embrylex. »","Tyranocif":"« Tu peux devenir Tyranocif sans cesser d'être toi. »"},
    essGood:"<i>Il boit, et pose les deux mains sur sa pierre ronde, apaisé.</i> C'est solide. Comme une roche qui ne bouge pas.",
    essBad:"<i>Il tousse, et un petit caillou tombe de sa bouche.</i> Trop ! Ça gratte comme la terre de papa !",
    frags:[{n:"La première pierre ronde, trouvée au bord du ruisseau",e:"joie"},{n:"Papa qui le portait sur son épaule, avant",e:"nostalgie"}],
    thanks:"<i>Il remet ses pierres dans le sac, une par une, avec soin.</i> Je vais rentrer et montrer ma collection à papa. Toute. Il va peut-être se fâcher. Mais il verra. Je vais aussi essayer la terre du ruisseau : maman dit qu'elle a meilleur goût.",
    gift:{key:"caillou",n:"Caillou Rond d'Embrylex",i:"🪨",d:"Au début de chaque combat, le client gagne 1 de Force, et 1 de plus contre une ombre finale",fx:{combatStart(C,en){ C.str+=1; if(en.boss) C.str+=1; }}},
    staff:{n:"Petit costaud",d:"Les âmes de l'Évolution manquée arrivent avec +1 Ouverture",wage:20},
    staffFx:{arrive(c,d){ if(d.family==="Évolution manquée") c.ouv++; }},
    cogHint:"Il veut avoir l'air grand : ne lui sers surtout pas de Super Bonbon. Une Gelée Orange pour son courage, et du solide : Lait Meumeu, Pomme Sucrée, Biscuit Lava.",
    map:mapStd({a:"La vallée des Tyranocif",b:"La vallée qui ne tremble pas",h:"La montagne à avaler",c:"Le chemin de la carrière",i:"La première pierre ronde",d:"La grotte aux cristaux",j:"Le sac découvert",k:"Sur l'épaule de papa",l:"Le ruisseau aux galets",f:"Les pas qui font trembler la vallée",g:"Le jour où papa a dit « honte »"},{eb:"tristesse",eh:"peur",ej:"colere",ef:"peur",key:"joie",foe:{id:248,n:"Tyranocif"}})
};
TALK.embrylex = [
    {t:"<i>Il te tend sa pierre ronde, solennel.</i> Tu peux la tenir. Une seconde. Attention, elle a une ligne bleue dedans. C'est la plus rare."},
    {t:"<i>Il boit son lait à grandes gorgées, les yeux fermés.</i> Maman m'en donnait en cachette, quand papa disait que je devais manger de la roche. Elle disait : « grandis comme tu veux, mon caillou. »",like:"lait"},
    {t:"<i>Il croque un Biscuit Lava, et ses yeux s'illuminent.</i> Ça croque comme la roche, mais ça a du goût ! C'est la roche que je voudrais manger !",like:"biscuit"}
];
WIPE.embrylex = ["<i>Il frotte sa pierre ronde avec un coin de ton torchon, en imitant tes gestes.</i>","<i>Il compte ses cailloux pendant que tu essuies. Il y en a quarante-trois. Il recompte. Quarante-trois.</i>"];
LETTERS.embrylex = "« J'ai montré ma collection à papa. Il n'a rien dit pendant une heure. Puis il m'a donné une pierre noire avec des étoiles dedans. Il la gardait depuis qu'il était petit. Lui aussi. — E. »";
REGULARS.embrylex = {order:{base:"lait",add:["biscuit"]},
    line:"<i>Il entre en traînant un sac encore plus gros.</i> Bonjour ! Un lait avec un Biscuit Lava ! Et regarde ma nouvelle pierre !",
    ok:"<i>Il boit d'un trait.</i> Papa m'emmène chercher des pierres le dimanche, maintenant. Il fait trembler la vallée pour les déterrer. C'est très pratique, un papa Tyranocif.",
    ko:"<i>Il fronce les sourcils.</i> Pas ça ! Mais je te pardonne. Tiens, une pierre pour la peine."};
ROOM_SAY.embrylex = {a:"La vallée des Tyranocif. Tout est grand, ici. Sauf moi.",b:"Je marche. Rien ne tremble. Rien du tout.",h:"La montagne. Je dois la manger. Toute.",c:"Le chemin de la carrière. Papa y mangeait des rochers comme des biscuits.",i:"Ma première pierre ronde. Au bord du ruisseau. Je ne l'ai pas mangée.",d:"Une grotte pleine de cristaux. C'est le plus bel endroit du monde.",j:"Mon sac. Papa l'a trouvé. Il l'a renversé par terre.",k:"Sur l'épaule de papa. Je voyais toute la vallée.",l:"Le ruisseau. Les galets brillent sous l'eau.",f:"Ses pas font trembler la vallée. Les miens, jamais.",g:"Le jour où papa a dit « honte »."};
ROOM_KW.embrylex = {a:"montagne",h:"manger",f:"Tyranocif"};
BOSS.embrylex = {id:248,n:"Ombre du Tyranocif attendu"};
LEGEND_CARD.embrylex = "collection";
CLIENT_CARD.embrylex = "jetpierres";
CARDS.jetpierres = {n:"Jet-Pierres",c:1,t:"atk",dmg:3,hits:3,r:"client",i:"🪨",from:"embrylex"};
CARDS.collection = {n:"La Collection",c:2,t:"atk",dmg:4,hits:4,str:1,r:"legende",i:"🪨",from:"embrylex",d:"4 dégâts ×4, +1 Force. Chaque pierre a son histoire."};

// =====================================================================
// PARASECT  (parasect)
// =====================================================================
CL.parasect = {
    season:6,from:3,id:47,n:"Parasect",c:"#e07040",family:"Évolution manquée",wound:"psy",likesEss:["normal"],comfort:["the","sitrus","mago","baieprine","miel"],dislike:["poudre","liqueur","superbonbon"],tol:2,
    quiet:true,
    intro:"Une odeur de forêt humide entre avant lui. Parasect avance de côté, le grand champignon rouge penché sur le dos comme un parapluie trop lourd. Ses yeux sont blancs, sans pupille. Mais quand il s'assoit, une toute petite voix sort de dessous le champignon : « …pardon. »",
    arrive:"<i>Deux voix parlent en même temps, une grave et lente, une petite et timide. La petite gagne, de justesse.</i> Un thé, s'il vous plaît. Je… nous… Non. Je. C'est moi qui demande. Un thé.",
    hints:["Parfois il se lève sans le vouloir, fait trois pas vers l'ombre, puis revient s'asseoir en s'excusant.","Ses pinces tremblent quand il essaie de prendre le verre. Il y arrive, très lentement.","Il fredonne une comptine de Paras, toute petite, comme pour se rappeler sa propre voix."],
    stages:[
      {req:0,t:"<i>La petite voix, sous le champignon.</i> Quand j'étais Paras, j'avais deux petits champignons sur le dos. On vivait ensemble. Ils me donnaient des spores, je les promenais au soleil. On était… une équipe.",kw:"champignon"},
      {req:2,t:"<i>La voix grave couvre un instant la petite, puis s'efface.</i> Quand j'ai évolué, le champignon a grandi. Grandi. Il est devenu plus grand que moi. Maintenant, c'est lui qui décide où on va. Vers l'ombre. Toujours vers l'ombre humide.",kw:"ombre"},
      {req:3,t:"<i>La petite voix tremble.</i> Les autres disent que Parasect n'est plus qu'un champignon avec des pattes. Que le petit Paras a disparu dedans. Et parfois… je ne sais plus si c'est moi qui pense, ou lui. Je ne sais plus qui a commandé le thé.",kw:"disparu"},
      {req:4,t:"<i>Ses pinces se posent, fermes, sur le comptoir. La petite voix est claire.</i> C'est moi qui ai commandé le thé. Moi qui ai poussé la porte. Moi qui fredonne la comptine. Le champignon est grand, mais je suis encore là, dessous. Je vais réapprendre à marcher au soleil. Lui, il s'y fera."}
    ],
    lie:{after:0,t:"<i>La voix grave, lente.</i> Il n'y a plus de Paras. Il n'y a que le champignon. C'est mieux comme ça. Le champignon sait ce qui est bon."},
    reform:{"champignon":"« Vous étiez une équipe. Une équipe, ça se renégocie. »","ombre":"« Tu as le droit de vouloir le soleil, même si lui préfère l'ombre. »","disparu":"« Tu es là. C'est toi qui m'as parlé, ce soir. »"},
    essGood:"<i>Il boit, et pendant un moment ses yeux blancs ont presque une pupille.</i> …C'est clair. Je m'entends penser. Moi.",
    essBad:"<i>Un nuage de spores s'échappe du champignon.</i> Trop… il prend le dessus… je ne…",
    frags:[{n:"Les promenades au soleil, du temps de Paras",e:"joie"},{n:"La comptine des Paras, chantée à deux voix",e:"nostalgie"}],
    thanks:"<i>Il se lève et marche droit vers la fenêtre, en plein clair de lune. Le champignon frémit, mais suit.</i> Demain matin, j'irai au soleil. Juste cinq minutes. Puis dix. On négociera. On est deux, après tout. Mais c'est moi qui marche.",
    gift:{key:"spore",n:"Spore de Parasect",i:"🍄",d:"Au début de chaque combat, l'ombre est Faible 1 et perd 3 PV par tour pendant 3 tours (Vampigraine 3)",fx:{combatStart(C,en){ en.weak+=1; en.seed=(en.seed||0)+3; }}},
    staff:{n:"Herboriste",d:"Les âmes très tendues (Tension 3 ou plus) arrivent avec 1 Tension de moins et 1 Ouverture de plus",wage:30},
    staffFx:{arrive(c){ if(c.ten>=3){ c.ten--; c.ouv++; } }},
    cogHint:"Deux voix se disputent en lui : parle doucement, et adresse-toi à la petite. Une Gelée Rose pour qu'il s'entende penser, et du clair : Thé de Safrania, Baie Sitrus, Baie Prine.",
    map:mapStd({a:"La forêt humide",b:"La comptine oubliée",h:"Les spores qui recouvrent tout",c:"Le sous-bois sans soleil",i:"Les promenades au soleil",d:"La clairière tiède",j:"« Ce n'est plus qu'un champignon »",k:"La comptine à deux voix",l:"La flaque de lumière",f:"Le champignon qui grandit",g:"Le jour où il ne savait plus qui pensait"},{eb:"tristesse",eh:"peur",ej:"colere",ef:"peur",key:"joie",foe:{id:46,n:"Paras"}})
};
TALK.parasect = [
    {t:"<i>La petite voix, très bas.</i> Vous savez quoi ? Le champignon déteste les bougies. Moi, je les aime. On ne se dispute plus que pour ça."},
    {t:"<i>Il hume la vapeur du thé, et ses pinces se détendent.</i> Du temps de Paras, je buvais la rosée sur les feuilles, au soleil. Ça avait un peu ce goût-là. Un goût de matin.",like:"the"},
    {t:"<i>Il fixe la Baie Prine.</i> Elle guérit de tout, paraît-il. Je me demande si elle guérit d'être deux. …Non. Je ne veux pas guérir de ça. Je veux juste avoir mon mot à dire.",like:"baieprine"}
];
WIPE.parasect = ["<i>La petite voix fredonne la comptine au rythme du torchon.</i>","<i>Le champignon s'incline vers le coin sombre. Parasect le redresse, doucement, et continue de te regarder faire.</i>"];
LETTERS.parasect = "« Vingt minutes de soleil ce matin. Le champignon a boudé, puis il s'est mis à pousser plus droit. Il paraît que ça lui fait du bien aussi. Il ne l'avouera jamais. — P. (la petite voix) »";
REGULARS.parasect = {order:{base:"the",add:["sitrus"]},
    line:"<i>Il entre de face, pas de côté, les yeux presque clairs.</i> Bonjour ! C'est moi. Un thé à la Baie Sitrus. Et… pour le champignon, rien, il boude.",
    ok:"<i>Il boit, et la petite voix chantonne.</i> Les Paras de la forêt viennent me voir, maintenant. Ils ont peur d'évoluer. Je leur dis que ce n'est pas grave, qu'on reste là, dessous. Il faut juste continuer à parler.",
    ko:"<i>La petite voix soupire.</i> Ce n'est pas ça… Le champignon dit que c'est très bien. Je ne suis pas d'accord."};
ROOM_SAY.parasect = {a:"La forêt humide. Le champignon adore. Moi, j'ai froid.",b:"La comptine… je ne me souviens plus de la fin.",h:"Les spores recouvrent tout. On ne voit plus rien.",c:"Le sous-bois. Pas un rayon de soleil. C'est lui qui a choisi.",i:"Les promenades au soleil. Il y avait deux petits champignons, et moi devant.",d:"Une clairière tiède. On y était bien, tous les trois.",j:"« Ce n'est plus qu'un champignon avec des pattes. » Ils le disent tous.",k:"La comptine à deux voix. Les miennes.",l:"Une flaque de lumière. Je veux y aller. Lui ne veut pas.",f:"Le champignon grandit. Grandit. Je deviens tout petit dessous.",g:"Le jour où je ne savais plus qui pensait."};
ROOM_KW.parasect = {a:"champignon",c:"ombre",j:"disparu"};
BOSS.parasect = {id:47,n:"Ombre du champignon",self:true};
LEGEND_CARD.parasect = "deuxvoix";
CLIENT_CARD.parasect = "spore";
CARDS.spore = {n:"Para-Spore",c:1,t:"atk",dmg:4,para:2,r:"client",i:"🍄",from:"parasect"};
// carte du Grand Regret de la saison (offerte par Mewtwo, voir js/11-saison.js)
CARDS.droitdexister = {n:"Droit d'Exister",c:2,t:"skill",block:15,heal:10,draw:2,energy:1,r:"legende",i:"🧬",from:"mewtwo",d:"15 de Bouclier, soigne 10 PV, pioche 2, +1 énergie. Personne ne demande à naître. Tout le monde a le droit de rester."};
CARDS.deuxvoix = {n:"Deux Voix",c:1,t:"atk",dmg:6,seed:4,weak:1,retain:true,r:"legende",i:"🍄",from:"parasect",d:"6 dégâts, Vampigraine 4, Faible 1. Retenue. Ils sont deux, mais c'est lui qui marche."};
