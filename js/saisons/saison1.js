// Saison 1 · Chapitre 1 « Portes ouvertes »
// Tout ce qui concerne chaque âme de la saison est regroupé ici, client par client.
// (L'ordre d'arrivée est dans CLIENT_ORDER, js/01-base.js ; les images à faire sont dans GEMINI.md.)

// =====================================================================
// MACHOPEUR  (machopeur)
// =====================================================================
// fiche (histoire, confidences, Labyrinthe)
CL.machopeur = {
    id:67,n:"Machopeur",c:"#a8b0c0",family:"Défaite",wound:"psy",likesEss:["combat"],comfort:["ceriz","lait","sitrus","figuy","pommeacide"],dislike:["poudre","soda"],tol:3,
    intro:"La porte s'ouvre d'un coup sec. Un Machopeur doit se baisser pour passer l'encadrement. Il traverse la salle sans regarder personne et s'assoit lourdement ; le tabouret grince. Une de ses mains reste posée sur la boucle de sa ceinture.",
    arrive:"<i>Il pose ses deux poings sur le comptoir, lourdement, comme pour s'y ancrer.</i> Un verre. Fort. Et pas de questions.",
    hints:["Chaque fois qu'un verre tinte trop fort, ses bras se raidissent d'un coup, comme pour parer un coup.", "Il évite du regard la cuillère à mélange posée sur le comptoir. Quand tu la déplaces, il expire, soulagé. Une cuillère… comme celles des Pokémon Psy.", "Ses phalanges sont couvertes de vieilles égratignures. Il ne touche pas au bol de baies Ceriz, mais ses yeux y reviennent sans cesse."],
    stages:[
      {req:0,t:"<i>Il fait rouler une épaule, puis l'autre.</i> J'étais le premier au dojo. Le premier levé, le dernier couché. Personne ne me mettait au tapis.",kw:"dojo"},
      {req:2,t:"<i>Sa mâchoire se crispe. Une de ses mains se referme sur le vide.</i> Et puis il y a eu cet Alakazam. Je n'ai même pas pu le toucher. Ses cuillères… tout tournait. Le sol, le plafond. Moi.",kw:"Alakazam"},
      {req:3,t:"<i>Il baisse les yeux vers sa ceinture et la serre, par réflexe.</i> Depuis, je ne l'enlève plus. Même pour dormir. Si je l'enlève… c'est que j'ai abandonné.",kw:"ceinture"},
      {req:4,t:"<i>Pour la première fois, ses bras se posent, immobiles, sur le comptoir.</i> Peut-être que… perdre une fois, ça ne veut pas dire que je ne suis plus fort ?"}
    ],
    lie:{after:0,t:"<i>Il hausse les épaules, un peu trop haut.</i> Remarque, je m'en fiche, de ce combat. Vraiment."},
    reform:{"dojo": "« Le dojo, c'était bien plus qu'un endroit où s'entraîner. »", "Alakazam": "« Tu n'as même pas eu le temps de te battre. »", "ceinture": "« Tant que tu la portes, tu te bats encore. »"},
    essGood:"<i>Il porte le verre à ses lèvres, méfiant. Un frisson remonte le long de ses bras.</i> …Une Gelée Rose. Juste une. Comme ça, je peux le regarder en face.",
    essBad:"<i>Il repousse le verre si fort qu'il glisse jusqu'au bord du comptoir.</i> Trop ! Ça tourne… comme ses cuillères !",
    frags:[{n:"Le dernier combat",e:"colere"},{n:"Le premier salut du dojo",e:"joie"}],
    thanks:"<i>Lentement, il défait la boucle de sa ceinture d'un cran. Ses épaules descendent, comme à la fin d'un très long combat.</i> J'ai perdu une fois. Je suis toujours fort.",
    gift:{key:"ceinture",n:"Ceinture de Machopeur",i:"🥋",d:"Au début de chaque combat, le client gagne 1 Force"},
    recipe:{key:"shake",n:"Protéine Shake de Machopeur",d:"Lait Meumeu + Baie Sitrus : +3 PC pour la nuit"},
    staff:{n:"Entraînement",d:"+6 PV pour chaque client dans son Labyrinthe",wage:30},
    cogHint:"Il ne quittait pas la cuillère des yeux… Une seule Gelée Rose, pas plus. Et une baie Ceriz, peut-être : il la regardait comme un vieux souvenir.",
    map:{start:"a",nodes:{
      a:{t:"entree",n:"Le vestiaire du dojo",x:50,y:7,nx:["b"]},
      b:{t:"echo",e:"colere",dmg:1,n:"Écho du rival moqueur",x:50,y:23,nx:["c"]},
      c:{t:"carrefour",n:"Deux portes du tatami",x:50,y:39,nx:["d","e"]},
      d:{t:"sanctuaire",n:"Le banc des élèves",x:22,y:55,nx:["f"]},
      e:{t:"enigme",need:"joie",n:"Le tableau des victoires effacé",x:78,y:55,nx:["f"]},
      f:{t:"echo",e:"peur",dmg:2,n:"Les cuillères qui tournent",x:50,y:72,nx:["g"],foe:{id:65,n:"Alakazam"}},
      g:{t:"coeur",key:"colere",n:"L'arène du dernier combat",x:50,y:90,nx:[],foe:{id:65,n:"Alakazam"}}
    }}
  };
// petites conversations
TALK.machopeur = [
    {t:"<i>Ses bras se croisent, puis se décroisent, comme s'ils ne savaient pas où se poser.</i> Ils sont petits, tes tabourets. Pas faits pour des gabarits comme moi."},
    {t:"<i>Il fait craquer ses doigts, un à un.</i> Au dojo, on mâchait des baies Ceriz avant les combats. Ça piquait la langue. On adorait ça.",like:"ceriz"},
    {t:"<i>Il fixe un point au-dessus de la porte.</i> Le vieux Mackogneur du dojo disait que les pommes acidulées forgent le caractère. Il disait beaucoup de choses.",like:"pommeacide"}
  ];
// moments au torchon
WIPE.machopeur = ["<i>Le bruit régulier du torchon semble le détendre. Ses épaules descendent d'un cran.</i>","<i>Il te regarde faire, longtemps.</i> Tu les essuies comme on bande une main avant un combat. Avec soin."];
// lettre (Cadoizo)
LETTERS.machopeur = "« Le dojo a rouvert. J'apprends aux petits à tomber, et à se relever. Je garde un tabouret pour toi au premier rang. — M. »";
// visite de jour en habitué
REGULARS.machopeur = {order:{base:"lait",add:["sitrus"]},
    line:"<i>Il entre en plein jour, la ceinture desserrée d'un cran, et cligne des yeux comme s'il découvrait la lumière.</i> Je passais devant. Enfin… je suis venu exprès. Ça se dit, ça ?",
    ok:"<i>Il boit, puis repose le verre doucement, sans le faire tinter.</i> Au dojo, les petits m'ont demandé de leur apprendre à tomber. À tomber, tu te rends compte ? J'ai dit oui.",
    ko:"<i>Il fait rouler une épaule, sans rancune.</i> C'est pas tout à fait ça. Mais c'est pas grave. Je reviendrai."};
// phrases dans les salles
ROOM_SAY.machopeur = {a:"Le vestiaire… Ça sent encore le tatami. Allons-y.",b:"Lui… Il riait quand je suis tombé. Je ne veux pas l'entendre.",c:"Deux portes. Je ne sais pas laquelle prendre…",d:"Le banc où je regardais les grands s'entraîner.",e:"Mes victoires… Quelqu'un les a effacées. Ou c'est moi ?",f:"Les cuillères… Elles tournent… Je ne peux plus bouger.",g:"L'arène. C'est ici que tout s'est arrêté."};
// mots-clés des salles
ROOM_KW.machopeur = {b:"dojo",e:"ceinture",f:"Alakazam"};
// ombre finale
BOSS.machopeur = {id:65,n:"Ombre d'Alakazam"};
// carte légendaire offerte
LEGEND_CARD.machopeur = "revanche";
// carte offerte
CLIENT_CARD.machopeur = "poingkarate";
// carte « Poing Karaté »
CARDS.poingkarate = {n:"Poing Karaté",c:1,t:"atk",dmg:9,r:"client",i:"🥋",from:"machopeur"};
// carte « Revanche »
CARDS.revanche = {n:"Revanche",c:2,t:"atk",dmg:8,revenge:true,retain:true,r:"legende",i:"🥊",from:"machopeur",d:"8 dégâts, plus tous les dégâts qu'il a reçus au tour précédent. Retenue."};

// =====================================================================
// PONCHIOT  (ponchiot)
// =====================================================================
// fiche (histoire, confidences, Labyrinthe)
CL.ponchiot = {
    id:506,n:"Ponchiot",c:"#c8a070",family:"Abandon",wound:"normal",likesEss:[],comfort:["mago","lait","miel","pommesucree","framby","pecha"],dislike:["liqueur","poudre","figuy"],tol:1,
    intro:"La porte s'entrouvre à peine. Un petit Ponchiot se glisse par l'interstice, le pelage collé par la pluie. Il choisit le tabouret le plus proche de la porte et s'y installe de travers, prêt à repartir.",
    arrive:"<i>Ses oreilles se couchent quand tu t'approches, puis se redressent à moitié.</i> Bonsoir… Je peux juste m'asseoir ? Je ne dérangerai pas. Je dois rester près de la porte. Au cas où.",
    hints:["Chaque fois que la porte grince, ses oreilles se dressent et sa queue s'agite… puis tout retombe.", "Son collier porte une médaille gravée : « Si perdu, appelez… ». Le reste a été effacé par la pluie. Il l'a frottée si souvent que le métal brille.", "Il tremble légèrement, malgré la chaleur des bougies. Ses pattes avant se serrent l'une contre l'autre, comme pour se tenir chaud."],
    stages:[
      {req:0,t:"<i>Il fixe la porte en parlant, comme s'il s'adressait à elle.</i> On m'a dit d'attendre sur l'aire d'autoroute. Que ça ne serait pas long. Alors j'ai attendu.",kw:"aire d'autoroute"},
      {req:2,t:"<i>Il frotte sa médaille du bout de la patte.</i> Il a plu pendant trois jours. J'ai gardé le collier bien propre. Pour qu'on me reconnaisse, quand on reviendrait.",kw:"collier"},
      {req:3,t:"<i>Sa voix se fait toute petite. Sa queue s'enroule autour de ses pattes.</i> J'ai dû faire une bêtise, non ? Sinon on serait revenu. C'est forcément ma faute.",kw:"ma faute"},
      {req:4,t:"<i>Ses oreilles se relèvent doucement, comme s'il entendait un son lointain.</i> Ce jour-là… une Leveinard de la station-service m'a donné à manger. Je l'avais complètement oubliée…"}
    ],
    lie:{after:0,t:"<i>Il remue la queue, un peu trop vite.</i> Mais je vais bien, hein. Vraiment."},
    reform:{"aire d'autoroute": "« Tu as attendu, exactement comme on te l'avait demandé. »", "collier": "« Tu as pris soin de toi pour qu'on te retrouve. »", "ma faute": "« Ce n'était pas ta faute. »"},
    essGood:"<i>Il renifle le verre longuement avant d'y tremper le bout de la langue.</i> Ça sent… un peu la maison. C'est doux.",
    essBad:"<i>Il recule si vite qu'il manque de tomber du tabouret, les oreilles plaquées.</i> Ça sent trop comme avant…",
    frags:[{n:"La pluie sur l'aire d'autoroute",e:"tristesse"},{n:"Le jour du collier neuf",e:"nostalgie"},{n:"La Leveinard qui m'a nourri",e:"joie"}],
    thanks:"<i>Il regarde la porte une dernière fois… puis se tourne vers toi. Sa queue se met à battre, franchement, sans retenue.</i> Ce n'était pas ma faute.",
    gift:{key:"collier",n:"Collier de Ponchiot",i:"🏷️",d:"Une fois par Labyrinthe, quand le client tombe à 0 PV, il se relève avec 10 PV"},
    staff:{n:"Accueil",d:"Révèle un ingrédient apprécié de chaque nouveau client",wage:20},
    cogHint:"Il tremblait sans arrêt. Du lait, quelque chose de doux, et surtout pas d'alcool fort. Une petite Gelée Blanche, peut-être : ça lui rappellera un foyer.",
    map:{start:"a",nodes:{
      a:{t:"entree",n:"Le parking sous la pluie",x:50,y:7,nx:["b"]},
      b:{t:"echo",e:"tristesse",dmg:1,n:"Les phares qui passent sans s'arrêter",x:50,y:23,nx:["c"]},
      c:{t:"enigme",need:"nostalgie",n:"La médaille effacée",x:50,y:39,nx:["d"]},
      d:{t:"carrefour",n:"Deux bretelles",x:50,y:55,nx:["e","f"]},
      e:{t:"sanctuaire",n:"L'abri de la station-service",x:22,y:72,nx:["g"]},
      f:{t:"echo",e:"peur",dmg:2,n:"Le klaxon du camion",x:78,y:72,nx:["g"]},
      g:{t:"coeur",key:"joie",n:"L'endroit où la voiture est partie",x:50,y:90,nx:[]}
    }}
  };
// petites conversations
TALK.ponchiot = [
    {t:"<i>Ses oreilles pivotent vers la porte au moindre craquement du plancher.</i> Il fait bon, ici. Ça faisait longtemps que je n'avais pas eu les pattes au sec."},
    {t:"<i>Sa queue bat une fois contre le tabouret, puis s'immobilise, comme prise en faute.</i> Avant, on me donnait du lait tiède, le soir. Dans une gamelle bleue.",like:"lait"},
    {t:"<i>Il renifle l'air, le museau tendu vers les étagères.</i> Ça sent la baie Mago, non ? … Ça sent les jours de fête.",like:"mago"}
  ];
// moments au torchon
WIPE.ponchiot = ["<i>Le frottement du torchon le berce. Ses paupières se ferment à moitié.</i>","<i>Il suit le verre des yeux, de ta main jusqu'à l'étagère.</i> Vous rangez toujours tout à sa place ? … C'est bien, quand les choses restent à leur place."];
// lettre (Cadoizo)
LETTERS.ponchiot = "« Je ne regarde plus les voitures. Je regarde les gens qui restent. Merci d'être resté, toi. — P. »";
// visite de jour en habitué
REGULARS.ponchiot = {order:{base:"lait",add:["mago"]},
    line:"<i>Cette fois, il s'assoit au milieu de la salle, loin de la porte. Sa queue balaie le plancher.</i> Bonjour ! Je ne reste pas longtemps. Enfin… je peux rester un peu ?",
    ok:"<i>Il lape le lait jusqu'à la dernière goutte, les oreilles bien droites.</i> La Leveinard de la station-service me laisse l'aider à ranger les baies. Je suis très doué pour porter les paniers.",
    ko:"<i>Ses oreilles se couchent une seconde, puis se redressent.</i> C'est bon quand même ! C'est toi qui l'as fait, alors c'est bon."};
// phrases dans les salles
ROOM_SAY.ponchiot = {a:"Il pleut encore, ici. Comme ce jour-là.",b:"Chaque voiture… je crois que c'est lui. Et ce n'est jamais lui.",c:"Ma médaille… Je n'arrive plus à lire ce qui est écrit.",d:"Deux routes. Laquelle il aurait prise, lui ?",e:"Il fait sec, là-dessous. Je peux m'asseoir une minute ?",f:"Ce klaxon… J'ai eu si peur, ce jour-là.",g:"C'est là. C'est là qu'il est parti."};
// mots-clés des salles
ROOM_KW.ponchiot = {b:"aire d'autoroute",c:"collier",f:"ma faute"};
// ombre finale
BOSS.ponchiot = {id:209,n:"Ombre de l'attente",self:true};
// carte légendaire offerte
LEGEND_CARD.ponchiot = "fidele";
// carte offerte
CLIENT_CARD.ponchiot = "gardeloyale";
// carte « Garde Loyale »
CARDS.gardeloyale = {n:"Garde Loyale",c:1,t:"skill",block:9,r:"client",i:"🐾",from:"ponchiot"};
// carte « Fidèle au poste »
CARDS.fidele = {n:"Fidèle au poste",c:2,t:"power",keepBlock:true,block:6,r:"legende",i:"🏠",from:"ponchiot",d:"6 de Bouclier. Désormais, son Bouclier ne disparaît plus d'un tour à l'autre."};

// =====================================================================
// MAGICARPE  (magicarpe)
// =====================================================================
// fiche (histoire, confidences, Labyrinthe)
CL.magicarpe = {
    from:2,id:129,n:"Magicarpe",c:"#f08048",family:"Évolution manquée",wound:"vol",likesEss:["eau"],comfort:["eau","oran","menthe","limonade","wiki"],dislike:["poudre","plume","figuy"],tol:2,
    intro:"Un bruit mouillé, puis un autre : flop, flop. Un Magicarpe entre en sautillant, se hisse sur un tabouret au troisième essai… puis s'immobilise, gêné d'avoir fait autant de bruit.",
    arrive:"<i>Une bulle s'échappe de sa bouche et éclate contre le comptoir.</i> Splash. …Pardon. C'est tout ce que je sais faire de bien. Une eau, s'il vous plaît. Fraîche.",
    hints:["Quand une ombre passe au plafond, il sursaute et rentre la tête dans ses écailles, comme si quelque chose d'immense volait au-dessus de lui.", "Il rit fort aux bruits de la salle, trop fort… puis se tait d'un coup et fixe ses nageoires.", "Il regarde son reflet dans le verre bien plus que le verre lui-même. Parfois, il gonfle les joues, comme pour paraître plus grand."],
    stages:[
      {req:0,t:"<i>Ses nageoires battent doucement, en rythme.</i> On était deux cents, dans ma bancée. On s'entraînait à sauter tous ensemble. Ça faisait des vagues magnifiques.",kw:"bancée"},
      {req:2,t:"<i>Ses nageoires s'arrêtent net.</i> Un matin, ils ont tous évolué. Tous. Des Léviator, partout. Le lac est devenu trop petit pour eux.",kw:"Léviator"},
      {req:3,t:"<i>Il fait un petit saut sur place, sans conviction.</i> Moi, j'ai continué à faire Trempette. Tous les jours. Il ne s'est jamais rien passé.",kw:"Trempette"},
      {req:4,t:"<i>Il tourne l'œil vers la fenêtre, là où l'on devine la pluie.</i> Ils m'envoient encore des vagues, parfois. Pour dire bonjour. Je ne réponds jamais."}
    ],
    lie:{after:1,t:"<i>Il gonfle les joues.</i> Mais ça ne me dérange pas d'être petit, hein. Pas du tout."},
    reform:{"bancée": "« Ta bancée, c'était ta famille. »", "Léviator": "« Ils ont changé, et toi, tu es resté. »", "Trempette": "« Tu as continué, même seul. Il en faut, du courage. »"},
    essGood:"<i>Il fait une rangée de petites bulles, ravi.</i> Un petit goût de ciel… Ça fait moins peur, quand c'est tout petit.",
    essBad:"<i>Il plonge la tête sous le comptoir, les nageoires tremblantes.</i> Trop de ciel ! Ça me rappelle leurs ailes…",
    frags:[{n:"Le grand saut de la bancée",e:"joie"},{n:"Le lac devenu silencieux",e:"tristesse"}],
    thanks:"<i>Il fait un Trempette. Un vrai, joyeux, qui éclabousse tout le comptoir.</i> Demain, je répondrai à leurs vagues.",
    gift:{key:"ecaille",n:"Écaille brillante de Magicarpe",i:"✨",d:"Après chaque combat gagné, le client récupère 5 PV"},
    staff:{n:"Service en salle",d:"+10 % de pourboire",wage:30},
    cogHint:"Il sursautait à chaque ombre au plafond. Une seule Gelée Ciel l'aiderait à regarder le ciel en face. Mais pas de Plume Envol : ça lui rappelle trop leurs ailes.",
    map:{start:"a",nodes:{
      a:{t:"entree",n:"Le lac à l'aube",x:50,y:6,nx:["b"]},
      b:{t:"echo",e:"peur",dmg:2,n:"Les ombres immenses sous la surface",x:50,y:18,nx:["c"],foe:{id:130,n:"Léviator"}},
      c:{t:"carrefour",n:"Le courant se divise",x:50,y:30,nx:["d","h"]},
      d:{t:"sanctuaire",n:"Les roseaux",x:22,y:42,nx:["i","e"]},
      h:{t:"echo",e:"tristesse",dmg:1,n:"Le banc qui s'éloigne sans lui",x:78,y:42,nx:["e","j"],art:"b"},
      i:{t:"enigme",need:"nostalgie",n:"Le nid d'œufs dans la vase",x:14,y:56,nx:["k"],art:"d"},
      e:{t:"enigme",need:"joie",n:"Le reflet qui ne bouge pas",x:50,y:56,nx:["k","l"]},
      j:{t:"echo",e:"colere",dmg:2,n:"Le pêcheur et sa canne",x:86,y:56,nx:["l"],art:"c"},
      k:{t:"sanctuaire",n:"Le rocher plat au soleil",x:28,y:70,nx:["f"],art:"d"},
      l:{t:"echo",e:"peur",dmg:1,n:"Le tourbillon",x:72,y:70,nx:["f"],art:"c"},
      f:{t:"echo",e:"colere",dmg:1,n:"Le rire des Léviator",x:50,y:82,nx:["g"],foe:{id:130,n:"Léviator"}},
      g:{t:"coeur",key:"tristesse",n:"La cascade que personne ne remonte",x:50,y:94,nx:[]}
    }}
  };
// petites conversations
TALK.magicarpe = [
    {t:"<i>Ses nageoires battent dans le vide, un peu trop vite.</i> C'est joli, vos bougies. Au lac, on n'avait que la lune. Et encore, quand il n'y avait pas de nuages."},
    {t:"<i>Il se penche pour voir son reflet dans le comptoir, puis recule.</i> L'eau d'ici est bonne ? J'aime quand elle est fraîche. Vraiment fraîche, comme le fond du lac au printemps.",like:"eau"},
    {t:"<i>Il fait une petite bulle, qui éclate aussitôt.</i> Un jour, un Wailmer m'a fait goûter une limonade. Ça pique, ça fait des bulles. J'ai ri pendant une heure.",like:"limonade"}
  ];
// moments au torchon
WIPE.magicarpe = ["<i>Il regarde la lumière des bougies danser dans le verre que tu essuies.</i>","<i>Il souffle une petite bulle sur le verre propre, puis sursaute.</i> Pardon ! C'est… c'est l'habitude."];
// lettre (Cadoizo)
LETTERS.magicarpe = "« J'ai remonté un petit bout de cascade, hier. Juste un petit bout. Le lac entier a applaudi. — M. »";
// visite de jour en habitué
REGULARS.magicarpe = {order:{base:"eau",add:["oran"]},
    line:"<i>Flop. Flop. Il saute sur le tabouret du premier coup, et a l'air très fier de lui.</i> Tu as vu ? Premier essai ! Une eau, s'il te plaît. Avec un peu de bleu dedans.",
    ok:"<i>Il fait une bulle, puis une autre, en forme de petite vague.</i> J'ai répondu à leurs vagues. Ils ont fait une cascade rien que pour moi. C'était… beaucoup d'eau.",
    ko:"<i>Il gonfle les joues, puis pouffe.</i> Splash. Ce n'est pas ce que j'avais demandé, mais ça mouille quand même."};
// phrases dans les salles
ROOM_SAY.magicarpe = {a:"Le lac. Mon lac. Tout est si calme, maintenant.",b:"Des ombres immenses sous moi… Ce sont eux ? Des Léviator ?",c:"Le courant se divise. Je ne suis pas assez fort pour lutter.",d:"Les roseaux. On se cachait là, quand on était petits.",e:"Mon reflet ne bouge pas. Comme s'il attendait que je change.",f:"Ils rient. Ils rient de moi, j'en suis sûr.",g:"La cascade. Personne ne l'a jamais remontée. Moi non plus.",h:"Mon banc… Ils nagent tous dans le même sens. Sans moi.",i:"Des œufs, là, dans la vase. C'est ici que je suis né, je crois.",j:"Cette canne… Il m'a rejeté à l'eau sans même me regarder.",k:"Un rocher chaud. Je peux rester là un peu, à sécher mes nageoires ?",l:"L'eau tourne, tourne… Je n'arrive pas à en sortir !"};
// mots-clés des salles
ROOM_KW.magicarpe = {b:"Léviator",e:"Trempette",f:"bancée"};
// ombre finale
BOSS.magicarpe = {id:130,n:"Ombre de Léviator"};
// carte légendaire offerte
LEGEND_CARD.magicarpe = "evolution";
// carte offerte
CLIENT_CARD.magicarpe = "trempette";
// carte « Trempette »
CARDS.trempette = {n:"Trempette",c:0,t:"skill",str:1,exhaust:true,r:"client",i:"🐟",from:"magicarpe",d:"Rien ne se passe… ou presque : +1 Force. Épuise."};
// carte « Évolution »
CARDS.evolution = {n:"Évolution",c:2,t:"power",str:2,strTurn:1,r:"legende",i:"🐉",from:"magicarpe",d:"+2 Force, puis +1 Force au début de chaque tour. Le Magicarpe devient Léviator."};

// =====================================================================
// PSYKOKWAK  (psykokwak)
// =====================================================================
// fiche (histoire, confidences, Labyrinthe)
CL.psykokwak = {
    from:2,id:54,n:"Psykokwak",c:"#f0d050",family:"Défaite",wound:"psy",likesEss:["eau"],comfort:["menthe","wiki","eau","oran","limonade"],dislike:["soda","liqueur","poudre"],tol:1,
    noLaugh:true,
    intro:"La porte s'ouvre lentement. Un Psykokwak entre en se tenant la tête à deux mains, les yeux mi-clos, comme si la lumière des bougies lui faisait mal. Il choisit le tabouret le plus sombre, tout au fond, et s'y pose avec précaution.",
    arrive:"<i>Il garde les mains plaquées sur ses tempes. Sa voix sort toute petite, un peu traînante.</i> Psy… Pardon. Tu peux parler moins fort ? Non, tu ne parles pas. C'est moi. C'est toujours moi.",
    hints:["Quand le co-gérant pouffe à une blague, Psykokwak sursaute et se recroqueville, persuadé qu'on rit de lui.", "Une goutte d'eau perle au bout de son bec, encore et encore. Il l'essuie, et elle revient. Il vient d'une mare, ça se voit.", "Le verre vide devant lui tremble tout seul, quelques secondes, puis s'immobilise. Il fait semblant de n'avoir rien vu."],
    stages:[
      {req:0,t:"<i>Il se masse les tempes en petits cercles.</i> À l'école de la mare, ils m'appelaient « le Canard en panne ». Quand je me tenais la tête, ils faisaient pareil. Pour rire.",kw:"rires"},
      {req:2,t:"<i>Ses doigts se crispent sur son crâne.</i> Quand la migraine monte trop… il se passe des choses. Les cailloux volent. Les vitres se fendent. Et après, je ne me souviens de rien. On me le raconte. En riant.",kw:"migraine"},
      {req:3,t:"<i>Pour la première fois, il lâche sa tête d'une main et regarde sa paume.</i> Une fois, une seule, j'ai fait flotter une fleur jusqu'à une petite Marill qui pleurait. Elle a souri. Personne n'a ri, ce jour-là.",kw:"la fleur"},
      {req:4,t:"<i>Ses deux mains reposent maintenant sur le comptoir. Il cligne des yeux, comme surpris par sa propre tranquillité.</i> Peut-être que ce qui fait mal dans ma tête… ça pourrait aussi faire du bien ?"}
    ],
    lie:{after:0,t:"<i>Il fait un petit « kwak » qui se veut joyeux.</i> Mais ils rigolaient gentiment, hein. C'était pour rire. Je riais aussi."},
    reform:{"rires":"« Ce n'est pas toi qui étais drôle. C'est eux qui avaient peur de ce qu'ils ne comprenaient pas. »","migraine":"« Ce n'est pas ta faute si ça déborde. Ça déborde parce que c'est fort. »","la fleur":"« Ce jour-là, tu as choisi ce que tu en faisais. »"},
    essGood:"<i>Il boit une gorgée. Ses épaules descendent d'un coup, et il ouvre grand les yeux.</i> Oh. C'est… calme. C'est la première fois que c'est calme, là-dedans.",
    essBad:"<i>Il lâche le verre et se reprend la tête à deux mains. Le verre glisse tout seul sur le comptoir.</i> Trop ! Ça monte… ça monte !",
    frags:[{n:"La fleur qui flottait pour Marill",e:"joie"},{n:"Le chant de la mare au crépuscule",e:"nostalgie"}],
    thanks:"<i>Il lâche sa tête. Doucement, sans un mot, il fait flotter une petite goutte d'eau au-dessus du comptoir, qui scintille à la lueur des bougies. Personne ne rit. Il sourit.</i> C'est moi qui ai fait ça. Exprès.",
    gift:{key:"bonnet",n:"Bonnet de Psykokwak",i:"🧢",d:"+1 énergie au premier tour de chaque combat"},
    recipe:{key:"remede",n:"Remède de Psykokwak",d:"Limonade + Feuille Menthe + Baie Wiki : le client servi ne commencera pas ses combats Faible"},
    staff:{n:"Cave",d:"Les gelées coûtent 20 % moins cher au marché",wage:20},
    cogHint:"Il sursautait à chaque rire… surtout, ne rate pas son verre : il croirait qu'on se moque de lui. Une seule Gelée Rose, et de la menthe : ça le calme.",
    map:{start:"a",nodes:{
      a:{t:"entree",n:"La mare derrière l'école",x:50,y:6,nx:["b"]},
      b:{t:"echo",e:"tristesse",dmg:1,n:"Les rires dans le couloir",x:50,y:18,nx:["c"]},
      c:{t:"carrefour",n:"Trois casiers entrouverts",x:50,y:30,nx:["d","h","e"]},
      d:{t:"sanctuaire",n:"L'infirmerie et sa compresse froide",x:15,y:42,nx:["i"]},
      h:{t:"echo",e:"colere",dmg:1,n:"Le tableau noir couvert de moqueries",x:50,y:42,nx:["i","j"],art:"b"},
      e:{t:"enigme",need:"joie",n:"Le cahier couvert de dessins",x:85,y:42,nx:["j"]},
      i:{t:"echo",e:"peur",dmg:1,n:"La cour de récré qui tourne",x:30,y:56,nx:["k"],art:"a"},
      j:{t:"carrefour",n:"L'escalier de secours",x:70,y:56,nx:["k","l"],art:"c"},
      k:{t:"sanctuaire",n:"Le saule au bord de la mare",x:25,y:70,nx:["f"],art:"a"},
      l:{t:"enigme",need:"nostalgie",n:"La fleur pressée dans le livre",x:75,y:70,nx:["f"],art:"e"},
      f:{t:"echo",e:"peur",dmg:2,n:"La tempête qu'il ne contrôle pas",x:50,y:82,nx:["g"],foe:{id:55,n:"Akwakwak"}},
      g:{t:"coeur",key:"joie",n:"La salle de classe où tout le monde rit",x:50,y:94,nx:[]}
    }}
  };
// petites conversations
TALK.psykokwak = [
    {t:"<i>Il lève les yeux vers les bougies, puis les referme aussitôt.</i> C'est joli, mais ça clignote. Tout ce qui clignote me rentre dans la tête."},
    {t:"<i>Une goutte perle au bout de son bec. Il ne l'essuie pas, cette fois.</i> À la mare, l'eau était toujours fraîche. Quand j'avais trop mal, je mettais la tête dedans. Ça faisait taire le bruit.",like:"eau"},
    {t:"<i>Il renifle vers les feuilles de menthe, les paupières à demi closes.</i> Ça, ça sent comme l'infirmière de l'école. Elle me posait une compresse à la menthe sur le front. Elle ne riait jamais.",like:"menthe"}
  ];
// moments au torchon
WIPE.psykokwak = ["<i>Le frottement régulier du torchon semble apaiser quelque chose dans sa tête. Il relâche un peu ses tempes.</i>","<i>Il suit le verre des yeux, puis le fait légèrement trembler, sans le vouloir. Il te regarde, inquiet.</i> Pardon. Tu… tu ne te moques pas ?"];
// lettre (Cadoizo)
LETTERS.psykokwak = "« Ma tête me fait moins mal. Les autres viennent dessiner avec moi, au bord de la mare. — P. »";
// visite de jour en habitué
REGULARS.psykokwak = {order:{base:"limonade",add:["menthe"]},
    line:"<i>Il entre en marchant normalement, les mains le long du corps. Il s'en rend compte au milieu de la salle, et il a l'air ravi.</i> Bonjour ! Une limonade avec de la menthe, s'il te plaît. J'ai dormi toute la nuit, tu sais.",
    ok:"<i>Il fait flotter une rondelle de citron au-dessus de son verre, la fait tourner, et la repose pile au bord.</i> Les petits de la mare me demandent de le refaire. Encore et encore. Ils rient. Mais avec moi.",
    ko:"<i>Il penche la tête, perplexe, puis hausse les épaules.</i> Ce n'est pas ce que j'avais demandé. Mais ma tête ne me fait pas mal, alors tout va bien."};
// phrases dans les salles
ROOM_SAY.psykokwak = {a:"La mare derrière l'école. Ici, au moins, personne ne me regarde.",b:"Ils rient. Ils rient encore. Même ici, ils me suivent.",c:"Trois casiers. L'un d'eux, c'était le mien. Ils y mettaient des choses dedans.",d:"L'infirmerie. On m'y envoyait quand j'avais trop mal. C'était calme.",e:"Mon cahier… Je dessinais pendant les cours. Il manque une page.",f:"Ça monte ! Ça monte dans ma tête… Arrête ! ARRÊTE !",g:"La classe. Tout le monde me regarde. Ils vont rire. Ils vont tous rire.",h:"Le tableau… Ils avaient écrit mon nom. Avec un dessin à côté. Ma tête me lance.",i:"La cour tourne. Tout le monde court en rond, et moi au milieu.",j:"L'escalier de secours. Je m'y asseyais à la récré. Il part en haut, et en bas.",k:"Le saule. Ses branches touchent l'eau. Personne ne me trouvait, ici.",l:"Une fleur, entre deux pages. Qui l'a mise là ?"};
// mots-clés des salles
ROOM_KW.psykokwak = {b:"rires",e:"la fleur",f:"migraine"};
// ombre finale
BOSS.psykokwak = {id:55,n:"Ombre d'Akwakwak"};
// carte légendaire offerte
LEGEND_CARD.psykokwak = "migraine";
// carte offerte
CLIENT_CARD.psykokwak = "chocmental";
// carte « Choc Mental »
CARDS.chocmental = {n:"Choc Mental",c:2,t:"atk",dmg:13,draw:1,r:"client",i:"🌀",from:"psykokwak"};
// carte « Migraine Psychique »
CARDS.migraine = {n:"Migraine Psychique",c:0,x:true,t:"atk",xHits:7,xPara:true,r:"legende",i:"🤕",from:"psykokwak",d:"X : inflige 7 dégâts X fois et Paralysie X. Utilise toute son énergie."};

// =====================================================================
// RONDOUDOU  (rondoudou)
// =====================================================================
// fiche (histoire, confidences, Labyrinthe)
CL.rondoudou = {
    from:3,id:39,n:"Rondoudou",fem:true,c:"#f8b8c8",family:"Abandon",wound:"feu",likesEss:["normal"],comfort:["miel","framby","pommesucree","lait","mago"],dislike:["petitchampi","grochampi","liqueur"],tol:2,
    intro:"La porte s'ouvre sur une petite boule rose qui flotte plus qu'elle ne marche. Rondoudou tient un micro contre elle, comme un doudou. Elle choisit le tabouret au milieu de la salle, bien en vue… puis se tasse, comme si elle regrettait de s'être mise là.",
    arrive:"<i>Elle tapote son micro, deux fois, comme pour vérifier qu'il marche encore.</i> Bonsoir ! Vous… vous aimez la musique ? Non, ne répondez pas. Un verre, s'il vous plaît. Quelque chose de doux.",
    hints:["Quand le co-gérant bâille, elle se crispe d'un coup et serre son micro à deux mains.", "Le bout de son micro est taché d'encre noire. Elle le frotte avec sa patte quand elle croit que personne ne regarde.", "Elle fredonne tout bas, puis s'arrête net au bout de quelques notes, toujours au même endroit."],
    stages:[
      {req:0,t:"<i>Elle fait tourner son micro entre ses pattes.</i> J'ai écrit une chanson. Quatre couplets. Personne n'a jamais entendu le quatrième.",kw:"quatrième couplet"},
      {req:2,t:"<i>Ses joues se gonflent, puis se dégonflent lentement.</i> Avant, je chantais sur la grande scène du parc. Et puis, au premier couplet, ils ont commencé à fermer les yeux. Tous. À chaque fois.",kw:"scène"},
      {req:3,t:"<i>Elle cache son micro derrière son dos, puis le ramène devant elle.</i> Alors je dessinais sur leurs visages, avec mon feutre. Pour qu'au réveil, ils sachent que j'étais là. C'est méchant, hein ?",kw:"feutre"},
      {req:4,t:"<i>Elle regarde ta tasse de café, sur le comptoir, avec un drôle de sourire.</i> Si quelqu'un restait éveillé jusqu'au bout… une seule fois. Je crois que ça me suffirait."}
    ],
    lie:{after:0,t:"<i>Elle sourit très fort, un peu trop.</i> Mais je m'en fiche, qu'ils dorment ! Ça veut dire que ma voix est apaisante, non ?"},
    reform:{"quatrième couplet":"« Ton dernier couplet attend juste quelqu'un pour l'écouter. »","scène":"« Ils dormaient, mais toi, tu étais là, debout, à chanter. »","feutre":"« Tu voulais juste qu'on se souvienne de toi. »"},
    essGood:"<i>Elle boit à petites gorgées, et ses joues prennent une couleur plus vive.</i> Oh… ça réveille. Ça réchauffe la gorge. Je pourrais chanter jusqu'au matin.",
    essBad:"<i>Elle tousse, les yeux pleins d'eau.</i> Trop fort ! Ma voix… elle part toute seule…",
    frags:[{n:"Le tout premier rappel",e:"joie"},{n:"La berceuse qu'on me chantait",e:"nostalgie"}],
    thanks:"<i>Elle lève son micro, prend une grande inspiration… et chante le quatrième couplet. Tu restes éveillé jusqu'à la dernière note.</i> Tu… tu as tout entendu ? Jusqu'au bout ?",
    gift:{key:"micro",n:"Micro de Rondoudou",i:"🎤",d:"Au début de chaque combat, l'ombre est Faible pendant 1 tour (sa berceuse)"},
    staff:{n:"Chanteuse",d:"Les clients arrivent avec 1 Tension de moins",wage:25},
    cogHint:"Elle se crispait dès que quelqu'un bâillait. Une seule Gelée Rouge, pour qu'elle se sente bien réveillée. Et du miel : elle le regardait comme un trésor. Pas de champignons, surtout.",
    map:{start:"a",nodes:{
      a:{t:"entree",n:"La loge vide",x:50,y:6,nx:["b"]},
      b:{t:"echo",e:"tristesse",dmg:1,n:"Les applaudissements qui s'éteignent",x:50,y:18,nx:["c"]},
      c:{t:"carrefour",n:"Deux coulisses",x:50,y:30,nx:["d","e"]},
      d:{t:"sanctuaire",n:"Le petit miroir de loge",x:22,y:42,nx:["h","i"]},
      e:{t:"enigme",need:"nostalgie",n:"La partition déchirée",x:78,y:42,nx:["i","j"]},
      h:{t:"echo",e:"peur",dmg:1,n:"Le projecteur qui s'éteint",x:14,y:56,nx:["k"],art:"a"},
      i:{t:"carrefour",n:"L'escalier sous la scène",x:50,y:56,nx:["k","l"],art:"c"},
      j:{t:"echo",e:"colere",dmg:2,n:"Les sifflets du dernier rang",x:86,y:56,nx:["l"],art:"b"},
      k:{t:"enigme",need:"joie",n:"Le micro posé au sol",x:28,y:70,nx:["f"],art:"d"},
      l:{t:"sanctuaire",n:"La loge d'à côté, encore allumée",x:72,y:70,nx:["f"],art:"a"},
      f:{t:"echo",e:"peur",dmg:2,n:"Le public endormi",x:50,y:82,nx:["g"],foe:{id:143,n:"Ronflex"}},
      g:{t:"coeur",key:"joie",n:"La scène vide du parc",x:50,y:94,nx:[]}
    }}
  };
// petites conversations
TALK.rondoudou = [
    {t:"<i>Elle balance ses pattes sous le tabouret, en rythme avec une musique que personne n'entend.</i> Elle est bien, votre acoustique. Les murs en bois, ça renvoie le son tout doux."},
    {t:"<i>Elle lèche le bout de sa patte, l'air coupable.</i> Ma grand-mère mettait du miel dans tout. Elle disait que c'était bon pour la voix. Et pour le moral.",like:"miel"},
    {t:"<i>Elle regarde le bocal de baies Framby, les yeux brillants.</i> Les Framby, ça a le goût des fêtes foraines. On en vendait au parc, à côté de la scène.",like:"framby"}
  ];
// moments au torchon
WIPE.rondoudou = ["<i>Le frottement du torchon suit un rythme. Elle se met à fredonner dessus, sans s'en rendre compte.</i>","<i>Elle te regarde faire, le menton dans les pattes.</i> Vous ne bâillez pas, vous. Même à cette heure-ci."];
// lettre (Cadoizo)
LETTERS.rondoudou = "« J'ai chanté le quatrième couplet devant tout le parc. Personne ne s'est endormi. Enfin, presque personne. — R. »";
// visite de jour en habitué
REGULARS.rondoudou = {order:{base:"lait",add:["miel"]},
    line:"<i>Elle entre en fredonnant, et cette fois, elle ne s'arrête pas au milieu.</i> Bonjour ! J'ai répété toute la matinée. Tu crois que tu tiendras éveillé jusqu'au refrain ?",
    ok:"<i>Elle chante un couplet tout bas. Personne ne s'endort. Elle te regarde, les yeux ronds.</i> …Tu es encore là. Tu es encore là !",
    ko:"<i>Elle tapote son micro, deux fois, et sourit quand même.</i> Ce n'est pas le bon verre… mais tu m'as écoutée jusqu'au bout. C'est ça qui compte."};
// phrases dans les salles
ROOM_SAY.rondoudou = {a:"Ma loge. Le miroir, les ampoules… Tout est prêt. Il ne manque que le public.",b:"Vous entendez ? Les applaudissements… Ils s'éteignent, un par un.",c:"Deux coulisses. D'un côté, je me cache. De l'autre… je ne sais pas.",d:"Le petit miroir. Je m'y entraînais à sourire avant de monter sur scène.",e:"Ma partition… Il manque la dernière page. Je l'ai arrachée ?",f:"Ils dorment. Tous. Il y en a même un énorme qui ronfle au premier rang…",g:"La scène du parc. Vide. Et pourtant, je dois chanter jusqu'au bout.",h:"Le projecteur… Il me suivait partout. Et un soir, il s'est éteint au milieu de ma chanson.",i:"L'escalier sous la scène. Je m'y cachais avant d'entrer. Il descend… ou il remonte ?",j:"Ces sifflets. Toujours le même rang. Toujours les mêmes.",k:"Mon micro. Posé par terre, comme si je l'avais lâché.",l:"Une loge allumée. Quelqu'un d'autre se prépare, et ça sent le maquillage. C'est doux."};
// mots-clés des salles
ROOM_KW.rondoudou = {b:"scène",e:"quatrième couplet",f:"feutre"};
// ombre finale
BOSS.rondoudou = {id:39,n:"Ombre de la scène vide",self:true};
// carte légendaire offerte
LEGEND_CARD.rondoudou = "grandeberceuse";
// carte offerte
CLIENT_CARD.rondoudou = "berceuse";
// carte « Berceuse »
CARDS.berceuse = {n:"Berceuse",c:1,t:"skill",stun:1,exhaust:true,r:"client",i:"🎤",from:"rondoudou",d:"L'ombre s'endort et passe son prochain tour. Épuise."};
// carte « Grande Berceuse »
CARDS.grandeberceuse = {n:"Grande Berceuse",c:1,t:"skill",stun:1,vuln:2,innate:true,exhaust:true,r:"legende",i:"🎶",from:"rondoudou",d:"L'ombre s'endort et passe son tour, Vulnérable 2. Innée. Épuise."};

// =====================================================================
// LEVEINARD  (leveinard)
// =====================================================================
// fiche (histoire, confidences, Labyrinthe)
CL.leveinard = {
    from:4,id:113,n:"Leveinard",fem:true,c:"#f8c0c8",family:"Défaite",wound:"eau",likesEss:["normal"],comfort:["oran","sitrus","lait","miel","pommesucree"],dislike:["soda","poudre","liqueur"],tol:2,
    intro:"La porte s'ouvre doucement. Une Leveinard entre, son œuf serré contre elle, et commence par ramasser une serviette tombée près de l'entrée. Elle la plie, la pose sur une table, puis s'assoit enfin, tout au bord du tabouret.",
    arrive:"<i>Elle jette un coup d'œil à tes mains, puis à celles du co-gérant, comme pour vérifier que personne n'est blessé.</i> Bonsoir. Je ne reste pas longtemps. Il y a sûrement quelqu'un qui a besoin de moi, quelque part.",
    hints:["Chaque fois qu'une clochette tinte, elle se lève à moitié de son tabouret, puis se rassoit, confuse.", "Ses pattes sont rouges et gercées, comme si elle les avait lavées cent fois par jour. Elle les cache sous son œuf.", "Elle n'a pas touché à son verre. Elle a juste vérifié qu'il était assez frais pour quelqu'un d'autre."],
    stages:[
      {req:0,t:"<i>Elle remet son œuf bien droit dans sa poche.</i> Je travaille au Centre Pokémon de la route. Enfin, je travaillais. Trois cents soins par jour. Je les comptais tous.",kw:"Centre Pokémon"},
      {req:2,t:"<i>Ses doigts tapotent le comptoir, en rythme, comme une sonnette.</i> Un soir, mes jambes ont lâché, en plein couloir. Je suis restée par terre, et j'entendais la sonnette sonner, sonner…",kw:"sonnette"},
      {req:3,t:"<i>Elle fixe ses pattes gercées.</i> On m'a dit de me reposer. Mais si je ne soigne personne… à quoi je sers ?",kw:"à quoi je sers"},
      {req:4,t:"<i>Un sourire lui échappe, presque malgré elle.</i> Une fois, sur une aire d'autoroute, j'ai partagé mon déjeuner avec un petit Ponchiot trempé. Je ne l'ai pas soigné. Je l'ai juste nourri. Et je me suis sentie bien, comme ça, sans rien réparer."}
    ],
    lie:{after:0,t:"<i>Elle se redresse, très droite.</i> Mais je ne suis pas fatiguée, hein. Une Leveinard n'est jamais fatiguée."},
    reform:{"Centre Pokémon":"« Tu as pris soin de tellement de monde, là-bas. »","sonnette":"« Ce soir-là, c'est toi qui avais besoin qu'on vienne. »","à quoi je sers":"« Tu comptes, même quand tu ne soignes personne. »"},
    essGood:"<i>Elle boit une gorgée, puis une autre, et ses épaules descendent enfin.</i> C'est frais. C'est calme. On dirait une salle de repos où personne ne sonne.",
    essBad:"<i>Elle repose le verre et se lève, déjà prête à repartir.</i> Non, ça… ça m'agite. Je devrais y retourner.",
    frags:[{n:"Le déjeuner sur l'aire d'autoroute",e:"joie"},{n:"Le tout premier Pokémon soigné",e:"nostalgie"}],
    thanks:"<i>Elle sort son œuf de sa poche et le pose sur le comptoir, devant elle. Pour une fois, elle le garde pour elle.</i> Ce soir, c'est moi qu'on a soignée. Merci.",
    gift:{key:"oeuf",n:"Œuf Chance de Leveinard",i:"🥚",d:"Les sanctuaires soignent 50 % des PV au lieu de 35 %"},
    staff:{n:"Infirmerie",d:"+2 PC max chaque nuit",wage:35},
    cogHint:"Elle ne pensait qu'aux autres, même ici. Une seule Gelée Bleue, pour l'apaiser. Et une Baie Oran ou Sitrus : elle en a donné des milliers, sans jamais en goûter une.",
    map:{start:"a",nodes:{
      a:{t:"entree",n:"Le hall du Centre, la nuit",x:50,y:6,nx:["b"]},
      b:{t:"echo",e:"peur",dmg:2,n:"La sonnette qui ne s'arrête jamais",x:50,y:18,nx:["c","h"]},
      c:{t:"enigme",need:"nostalgie",n:"La fiche de soin à son propre nom",x:28,y:30,nx:["d"]},
      h:{t:"echo",e:"tristesse",dmg:1,n:"La file d'attente infinie",x:74,y:30,nx:["d","i"],art:"a"},
      d:{t:"carrefour",n:"Deux couloirs blancs",x:40,y:44,nx:["e","j"]},
      i:{t:"enigme",need:"joie",n:"Le dessin d'un enfant guéri",x:86,y:44,nx:["j"],art:"c"},
      e:{t:"sanctuaire",n:"La salle de repos jamais utilisée",x:15,y:58,nx:["k"]},
      j:{t:"echo",e:"colere",dmg:2,n:"Le téléphone qui sonne dans le vide",x:68,y:58,nx:["f"],art:"b"},
      k:{t:"sanctuaire",n:"La terrasse sur le toit",x:28,y:70,nx:["f"],art:"e"},
      f:{t:"echo",e:"tristesse",dmg:1,n:"Les lits qui l'appellent",x:50,y:82,nx:["g"]},
      g:{t:"coeur",key:"joie",n:"Le couloir où elle est tombée",x:50,y:94,nx:[]}
    }}
  };
// petites conversations
TALK.leveinard = [
    {t:"<i>Elle redresse machinalement une pile de sous-verres, puis s'arrête, gênée.</i> Pardon. L'habitude. Au Centre, tout devait toujours être prêt."},
    {t:"<i>Elle regarde le bocal de baies Oran, et un petit rire lui échappe.</i> J'en ai donné des milliers, de celles-là. Je crois que je n'en ai jamais mangé une seule.",like:"oran"},
    {t:"<i>Elle respire l'odeur du lait chaud qui monte d'une casserole.</i> Le lait Meumeu tiède, c'est ce qu'on donnait aux petits qui avaient peur des piqûres. Ça marchait à chaque fois.",like:"lait"}
  ];
// moments au torchon
WIPE.leveinard = ["<i>Elle tend la patte vers le torchon, par réflexe, puis la retire.</i> Non, non. Fais, toi. Je… je regarde.","<i>Elle te regarde ranger le verre propre, et soupire, apaisée.</i> C'est agréable, de voir quelqu'un d'autre prendre soin des choses."];
// lettre (Cadoizo)
LETTERS.leveinard = "« J'ai pris ma première journée de repos. Le Centre n'a pas explosé. Je suis très fière de moi. — L. »";
// visite de jour en habitué
REGULARS.leveinard = {order:{base:"lait",add:["oran"]},
    line:"<i>Elle s'installe, se relève aussitôt pour essuyer le comptoir, puis s'arrête net et se rassoit en riant.</i> Pardon. L'habitude. Aujourd'hui, c'est mon jour de repos. Le premier depuis… je ne sais plus.",
    ok:"<i>Elle tient le verre à deux mains et prend tout son temps.</i> C'est la première fois qu'on me sert, moi. C'est doux. Je crois que je pourrais m'y habituer.",
    ko:"<i>Elle hoche la tête, pleine d'indulgence.</i> Ce n'est pas ce que j'ai demandé, mais je sais ce que c'est, de faire de son mieux toute la journée."};
// phrases dans les salles
ROOM_SAY.leveinard = {a:"Le hall du Centre, la nuit. Les lumières sont allumées. Elles le sont toujours.",b:"La sonnette. Encore. Il faut que j'y aille, il faut que…",c:"Une fiche de soin… à mon nom ? Je n'en ai jamais rempli pour moi.",d:"Deux couloirs. Tous les deux mènent à quelqu'un qui attend.",e:"La salle de repos. Je ne l'ai jamais utilisée. Pas une seule fois.",f:"Les lits m'appellent. Tous. En même temps.",g:"Le couloir où je suis tombée. Le carrelage est encore froid.",h:"La file d'attente. Elle ne finit jamais. Il y a toujours quelqu'un après le dernier.",i:"Un dessin, scotché au mur. Un enfant et moi, main dans la main. Je ne m'en souvenais plus.",j:"Le téléphone. Il sonne, il sonne. Si je ne décroche pas, quelqu'un va avoir mal.",k:"Le toit. On voit toute la ville d'ici. Je ne savais même pas qu'on pouvait monter."};
// mots-clés des salles
ROOM_KW.leveinard = {b:"sonnette",c:"Centre Pokémon",f:"à quoi je sers"};
// ombre finale
BOSS.leveinard = {id:113,n:"Ombre de l'épuisement",self:true};
// carte légendaire offerte
LEGEND_CARD.leveinard = "voeu";
// carte offerte
CLIENT_CARD.leveinard = "soin";
// carte « Soin »
CARDS.soin = {n:"Soin",c:1,t:"skill",heal:7,exhaust:true,r:"client",i:"🥚",from:"leveinard"};
// carte « Vœu Soin »
CARDS.voeu = {n:"Vœu Soin",c:1,t:"skill",heal:12,cleanse:true,retain:true,exhaust:true,r:"legende",i:"💖",from:"leveinard",d:"Soigne 12 PV et retire Faible, Vulnérable et Brûlure. Retenue. Épuise."};

// =====================================================================
// RONFLEX  (ronflex)
// =====================================================================
// fiche (histoire, confidences, Labyrinthe)
CL.ronflex = {
    from:5,id:143,n:"Ronflex",c:"#3a6878",family:"Abandon",wound:"normal",likesEss:["combat"],comfort:["lait","miel","pommesucree","grochampi","petitchampi"],dislike:["soda","limonade","poudre"],tol:3,
    patient:true,
    intro:"La porte s'ouvre en grand, puis s'arrête : quelque chose d'énorme coince dans l'encadrement. Un Ronflex s'y glisse en rentrant le ventre, très lentement. Aucun tabouret ne tiendrait : il s'assoit par terre, devant le comptoir, et le plancher craque sous lui.",
    arrive:"<i>Ses paupières se lèvent à moitié, puis retombent. Un long moment passe.</i> …Bonsoir. Prends ton temps. Moi, j'ai tout le temps. On me l'a assez dit.",
    hints:["Quand le co-gérant s'agite derrière le comptoir, Ronflex ferme les yeux et respire plus lourdement, comme pour se protéger du bruit.", "Une vieille médaille de Ligue est cousue à même la fourrure de son ventre. Elle est ternie, mais il la recouvre de sa patte quand on la regarde.", "Il fixe l'horloge au mur. Chaque fois que l'aiguille avance, ses oreilles retombent un peu plus."],
    stages:[
      {req:0,t:"<i>Il pose une patte sur la médaille cousue à son ventre.</i> On était six. J'étais le mur, celui qui encaissait. On a gagné la Ligue, tu sais. Tous les six.",kw:"l'équipe"},
      {req:2,t:"<i>Ses yeux s'ouvrent un peu plus, fixés sur l'horloge.</i> Et puis les combats sont devenus plus rapides. Moi, non. « Trop lent », il a dit. Il l'a dit gentiment. C'était pire.",kw:"trop lent"},
      {req:3,t:"<i>Un très long soupir soulève son ventre, et la médaille avec.</i> Il m'a déposé au Centre Pokémon. Il a dit qu'il reviendrait. Un Dracolosse est parti avec lui à ma place. Très rapide, le Dracolosse.",kw:"remplacé"},
      {req:4,t:"<i>Il ferme les yeux, mais cette fois, il ne dort pas. Il sourit.</i> Le mur, il a tenu jusqu'à la victoire. Ça, personne ne peut me l'enlever."}
    ],
    lie:{after:0,t:"<i>Il bâille, très fort, un peu trop.</i> Bah. Je suis mieux à dormir, de toute façon. Les combats, c'était fatigant."},
    reform:{"l'équipe":"« Le mur, c'est grâce à lui que les autres pouvaient frapper. »","trop lent":"« Tu n'étais pas lent. Tu étais celui qui tenait quand tout tremblait. »","remplacé":"« On ne remplace pas celui qui a tenu jusqu'à la victoire. On lui succède. »"},
    essGood:"<i>Il boit à longues gorgées, lentement, et ses yeux s'ouvrent grand pour la première fois.</i> Ça… ça a le goût des soirs de victoire. On mangeait tous ensemble, assis par terre.",
    essBad:"<i>Il repousse le verre du bout de la patte, très doucement, mais très fermement.</i> Non. Trop. Ça me rappelle les jours où il ne m'a plus appelé.",
    frags:[{n:"La coupe soulevée tous les six",e:"joie"},{n:"Les siestes au soleil avec l'équipe",e:"nostalgie"}],
    thanks:"<i>Il se lève, enfin, de toute sa hauteur. Le plancher craque. Il dépose la vieille médaille sur le comptoir, délicatement.</i> Garde-la pour moi. Je n'en ai plus besoin pour savoir ce que j'ai fait.",
    gift:{key:"bavoir",n:"Bavoir de Ronflex",i:"🍽️",d:"Le client commence chaque combat avec 8 de Bouclier"},
    staff:{n:"Portier",d:"Chaque client de nuit reste un échange de plus",wage:30},
    cogHint:"Ne le presse surtout pas : si tu le relances deux fois de suite, ça l'agace. Sers-le, laisse-le respirer, puis relance. Il aime ce qui se mange : champignons, miel, pomme.",
    map:{start:"a",nodes:{
      a:{t:"entree",n:"Le banc trop petit du Centre Pokémon",x:50,y:6,nx:["b"]},
      b:{t:"echo",e:"tristesse",dmg:1,n:"Les Poké Balls qui s'éloignent",x:50,y:18,nx:["c"]},
      c:{t:"carrefour",n:"Deux tunnels de la Route Victoire",x:50,y:30,nx:["d","h"]},
      d:{t:"sanctuaire",n:"Le pique-nique d'après-victoire",x:22,y:42,nx:["i","e"]},
      h:{t:"echo",e:"colere",dmg:2,n:"Le rocher qui bloque la route",x:78,y:42,nx:["e","j"],art:"c"},
      i:{t:"echo",e:"peur",dmg:1,n:"La sieste qui dure trop longtemps",x:12,y:56,nx:["k"],art:"d"},
      e:{t:"enigme",need:"joie",n:"La photo d'équipe déchirée",x:50,y:56,nx:["k","l"]},
      j:{t:"echo",e:"tristesse",dmg:1,n:"La foule du Plateau Indigo",x:88,y:56,nx:["l"],art:"b"},
      k:{t:"sanctuaire",n:"La source chaude de la grotte",x:28,y:70,nx:["f"],art:"c"},
      l:{t:"carrefour",n:"Les portes du Conseil 4",x:72,y:70,nx:["f","m"],art:"g"},
      f:{t:"echo",e:"peur",dmg:2,n:"Le chronomètre géant",x:50,y:82,nx:["g"],foe:{id:149,n:"Dracolosse"}},
      m:{t:"enigme",need:"nostalgie",n:"Le trophée sans son nom",x:86,y:82,nx:["g"],art:"e"},
      g:{t:"coeur",key:"nostalgie",n:"L'arène de la Ligue, déserte",x:50,y:94,nx:[]}
    }}
  };
// petites conversations
TALK.ronflex = [
    {t:"<i>Il remue à peine, mais le plancher craque.</i> Ton plancher est solide. Celui du Centre Pokémon, il gémissait chaque fois que je me retournais."},
    {t:"<i>Son ventre gargouille, très fort. Il ne s'en excuse pas.</i> Après chaque victoire, le dresseur nous faisait du lait au miel. Il m'en donnait trois bols. Il disait que je l'avais mérité.",like:"miel"},
    {t:"<i>Il regarde le Gros Champi posé sur l'étagère comme on regarde un vieil ami.</i> En Route Victoire, on en trouvait des énormes. Je les mangeais d'une bouchée, et les autres riaient.",like:"grochampi"}
  ];
// moments au torchon
WIPE.ronflex = ["<i>Le bruit du torchon le berce. Ses paupières tombent, mais il les relève, comme s'il tenait à rester là, avec toi.</i>","<i>Il te regarde ranger le verre, très lentement.</i> Tu prends ton temps, toi. C'est bien. On ne fait pas de bonnes choses en se pressant."];
// lettre (Cadoizo)
LETTERS.ronflex = "« Les petits Pokémon dorment toujours sur mon ventre. Ils disent que je suis le meilleur oreiller de la région. Je prends ça comme un titre. — R. »";
// visite de jour en habitué
REGULARS.ronflex = {order:{base:"lait",add:["miel"]},
    line:"<i>La porte s'ouvre en grand. Cette fois, il entre sans rentrer le ventre, et s'assoit par terre avec un grand sourire.</i> Me revoilà. Rien ne presse. Un lait avec du miel, quand tu auras le temps.",
    ok:"<i>Il boit à toutes petites gorgées, pour que ça dure.</i> J'ai trouvé un pré, au-dessus du village. Je m'y allonge, et les petits Pokémon viennent dormir sur mon ventre. Ils disent que c'est le meilleur endroit du monde.",
    ko:"<i>Il contemple le verre un long moment.</i> Ce n'est pas tout à fait ça. Mais j'ai tout mon temps. Je reviendrai."};
// phrases dans les salles
ROOM_SAY.ronflex = {a:"Le banc du Centre. Trop petit pour moi. J'y ai attendu longtemps.",b:"Les Poké Balls… Elles partent sans moi. Une par une.",c:"La Route Victoire. On l'a traversée tous ensemble, autrefois.",d:"Le pique-nique d'après-victoire. On mangeait tous assis par terre. Moi, j'avais la plus grosse part.",e:"Notre photo d'équipe. Quelqu'un a déchiré le coin. Mon coin.",f:"Le chronomètre. Il va trop vite. Je n'y arriverai jamais.",g:"L'arène. Vide. Je croyais entendre encore la foule.",h:"Ce rocher… Autrefois, c'est MOI qui bloquais la route. Maintenant, je ne la passe même plus.",i:"Juste une petite sieste… Quand je me suis réveillé, ils étaient partis.",j:"Tous ces gens qui crient des noms. Jamais le mien.",k:"La source chaude. On s'y arrêtait tous, après la grotte. L'eau montait jusqu'à mon menton.",l:"Les portes du Conseil 4. On les a franchies ensemble. Une seule fois.",m:"Le trophée. Il y a tous les noms gravés… sauf le mien."};
// mots-clés des salles
ROOM_KW.ronflex = {b:"remplacé",e:"l'équipe",f:"trop lent"};
// ombre finale
BOSS.ronflex = {id:149,n:"Ombre de Dracolosse"};
// carte légendaire offerte
LEGEND_CARD.ronflex = "murvivant";
// carte offerte
CLIENT_CARD.ronflex = "plaquage";
// carte « Plaquage »
CARDS.plaquage = {n:"Plaquage",c:2,t:"atk",dmg:15,weak:1,r:"client",i:"💤",from:"ronflex"};
// carte « Mur Vivant »
CARDS.murvivant = {n:"Mur Vivant",c:2,t:"atk",block:10,dmgBlock:true,r:"legende",i:"🏔️",from:"ronflex",d:"10 de Bouclier, puis inflige des dégâts égaux à tout son Bouclier."};
