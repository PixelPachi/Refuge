// Saison 4 · Chapitre 2 « La saison des pluies »
// Tout ce qui concerne chaque âme de la saison est regroupé ici, client par client.
// (L'ordre d'arrivée est dans CLIENT_ORDER, js/01-base.js ; les images à faire sont dans GEMINI.md.)

// =====================================================================
// LUCARIO  (lucario)
// =====================================================================
// fiche (histoire, confidences, Labyrinthe)
CL.lucario = {
    season:4,from:1,id:448,n:"Lucario",c:"#4878c0",family:"Perte",wound:"psy",likesEss:["combat"],comfort:["the","sitrus","menthe","grena","oran"],dislike:["soda","liqueur","gateau"],tol:2,
    intro:"Il entre sans bruit, comme s'il connaissait la salle par cœur sans l'avoir jamais vue. Un Lucario, droit, les yeux fermés. Il s'arrête au milieu de la pièce, tend une patte, et frôle quelque chose que personne d'autre ne voit.",
    arrive:"<i>Il ouvre les yeux, à regret.</i> Pardon. Je cherchais une aura. Une aura que je connais. Elle n'est pas ici non plus. Un thé, s'il te plaît. Sans sucre.",
    hints:["Il ferme les yeux toutes les deux minutes, et ses antennes noires frémissent. Il écoute quelque chose qui ne répond pas.","Il porte autour du poignet un vieux chapelet de bois, beaucoup trop grand pour lui.","Quand tu poses son verre, il s'incline très bas. Une politesse de temple, de celles qu'on n'apprend plus."],
    stages:[
      {req:0,t:"<i>Il caresse le chapelet.</i> J'ai grandi dans un temple, en haut de la montagne. Un vieux moine m'a recueilli quand j'étais un Riolu. Il m'a appris à lire les auras.",kw:"temple"},
      {req:2,t:"<i>Sa voix baisse.</i> Chaque matin, on méditait côte à côte. Son aura était chaude, orange, un peu tremblante. Je la sentais d'un bout à l'autre de la montagne. Je savais toujours où il était.",kw:"aura"},
      {req:3,t:"<i>Il serre le poing.</i> Un hiver, son aura est devenue plus pâle. Je l'ai senti. Je n'ai rien dit, parce qu'il souriait. Une nuit, elle s'est éteinte. Je lis les auras de tout le monde, et je n'ai pas su retenir la sienne.",kw:"éteinte"},
      {req:4,t:"<i>Il ferme les yeux, et pour la première fois il sourit.</i> Il savait. Il m'a appris à lire les auras pour que je ne sois jamais seul, même après lui. Je la sens, maintenant. Elle n'est pas partie. Elle est dans chaque aura que je soigne."}
    ],
    lie:{after:0,t:"<i>Il redresse le dos.</i> Je n'ai pas besoin de lui. Un vrai maître d'aura n'a besoin de personne."},
    reform:{"temple":"« Ce temple vit encore en toi, dans chaque geste. »","aura":"« Tu connaissais son aura par cœur. C'est une forme d'amour. »","éteinte":"« Tu n'aurais pas pu la retenir. Tu as pu l'accompagner. »"},
    essGood:"<i>Il boit, et ses antennes se détendent.</i> Clair. Comme l'air de la montagne avant la méditation.",
    essBad:"<i>Il repose le verre, les yeux plissés.</i> Trop agité. Mon aura tremble, maintenant.",
    frags:[{n:"La méditation du matin, côte à côte",e:"nostalgie"},{n:"Le jour où il a senti l'aura du maître pour la première fois",e:"joie"}],
    thanks:"<i>Il s'incline, plus bas que jamais.</i> Je vais rouvrir le temple. Il y a des Riolu dans la vallée qui ne savent pas encore lire les auras. Il faut bien quelqu'un pour leur apprendre à ne jamais être seuls.",
    gift:{key:"bandeau",n:"Bandeau d'Aura",i:"🥋",d:"Le client pioche 1 carte de plus au premier tour, et 1 de plus quand il est sous la moitié de ses PV",fx:{draw(C,D){ return (C.turn===1 || D.hp<D.maxhp/2) ? 1 : 0; }}},
    staff:{n:"Maître d'aura",d:"Les âmes de la Perte restent un échange de plus",wage:30},
    staffFx:{arrive(c,d){ if(d.family==="Perte") c.turns++; }},
    cogHint:"Il est très poli, presque raide. Pas de boisson sucrée, il trouve ça frivole. Une Gelée Rose pour l'esprit, et du sobre : Thé de Safrania, Baie Sitrus, Menthe.",
    map:{start:"a",nodes:{
      a:{t:"entree",n:"Le temple sous la pluie",x:50,y:6,nx:["b","h"]},
      b:{t:"echo",e:"tristesse",dmg:1,n:"Les auras qui s'éteignent",x:30,y:18,nx:["c"]},
      h:{t:"echo",e:"peur",dmg:1,n:"Les mille marches",x:72,y:18,nx:["c","i"],art:"d"},
      c:{t:"carrefour",n:"Les toriis rouges",x:45,y:32,nx:["d","j"],art:"d"},
      i:{t:"enigme",need:"joie",n:"La première aura",x:84,y:34,nx:["j"],art:"c"},
      d:{t:"sanctuaire",n:"Le jardin zen",x:20,y:46,nx:["k"],art:"e"},
      j:{t:"echo",e:"colere",dmg:1,n:"La montagne qui gronde",x:64,y:48,nx:["k","l"],art:"f"},
      k:{t:"enigme",need:"nostalgie",n:"Les deux coussins",x:30,y:62,nx:["f"],art:"c"},
      l:{t:"sanctuaire",n:"La salle d'encens",x:78,y:64,nx:["f"],art:"b"},
      f:{t:"echo",e:"tristesse",dmg:2,n:"L'aura dans la tempête",x:50,y:80,nx:["g"]},
      g:{t:"coeur",key:"nostalgie",n:"La nuit où l'aura s'est éteinte",x:50,y:94,nx:[]}
    }}
  };
// petites conversations
TALK.lucario = [
    {t:"<i>Il pose une patte sur le comptoir, ferme les yeux.</i> Ton aura est fatiguée, tavernier. Tu dors mal. Ne t'inquiète pas, je ne le dirai à personne."},
    {t:"<i>Il hume la vapeur du thé.</i> Le maître buvait son thé si chaud qu'il fumait encore au bout d'une heure. Il disait que la patience, ça se boit.",like:"the"},
    {t:"<i>Il fait rouler une Baie Sitrus.</i> Il en gardait toujours une dans sa manche, pour les novices qui tombaient dans l'escalier. J'en ai beaucoup mangé.",like:"sitrus"}
  ];
// moments au torchon
WIPE.lucario = ["<i>Il regarde tes gestes avec attention.</i> Tu essuies comme on médite. Lentement. Le maître aurait aimé.","<i>Il ferme les yeux et écoute le bruit du torchon, comme une prière.</i>"];
// lettre (Cadoizo)
LETTERS.lucario = "« Trois Riolu ont monté les mille marches ce matin. L'un d'eux a senti mon aura du bas de la montagne. J'ai pleuré pendant la méditation. Le maître aurait ri. — L. »";
// visite de jour en habitué
REGULARS.lucario = {order:{base:"the",add:["sitrus"]},
    line:"<i>Il entre en plein jour et s'incline sur le seuil.</i> Bonjour, tavernier. Un thé à la Baie Sitrus, s'il te plaît. Brûlant.",
    ok:"<i>Il boit d'une traite, sans grimacer.</i> Le temple a douze élèves, maintenant. Le plus petit lit déjà mon aura mieux que moi à son âge. Il m'appelle « maître ». Je n'arrive pas à m'y faire.",
    ko:"<i>Il s'incline quand même.</i> Ce n'est pas ce que j'ai demandé. Mais le geste était sincère. Je reviendrai."};
// phrases dans les salles
ROOM_SAY.lucario = {a:"Le temple. Les cloches ne sonnent plus.",b:"Les auras s'éteignent une à une. Comme les bougies, le soir.",c:"Les toriis… On les passait ensemble, chaque matin.",d:"Les mille marches. Il les montait plus lentement chaque hiver.",e:"Le jardin zen. Il ratissait le sable pendant des heures.",f:"Son aura dans la tempête. Elle vacille. Je n'arrive pas à la retenir.",g:"La nuit où l'aura s'est éteinte.",h:"Les mille marches. Il les montait plus lentement chaque hiver.",i:"La première aura que j'ai sentie. La sienne. Orange et chaude.",j:"La montagne gronde. Elle aussi, elle le pleure.",k:"Deux coussins. Un grand, un petit. Le grand est vide.",l:"L'encens. Il en brûlait un bâton pour chaque âme qui partait."};
// mots-clés des salles
ROOM_KW.lucario = {b:"aura",a:"temple",f:"éteinte"};
// ombre finale
BOSS.lucario = {id:448,n:"Ombre de l'aura éteinte",self:true};
// carte légendaire offerte
LEGEND_CARD.lucario = "dernierenseignement";
// carte offerte
CLIENT_CARD.lucario = "aurasphere";
// carte « Aurasphère »
CARDS.aurasphere = {n:"Aurasphère",c:1,t:"atk",dmg:8,r:"client",i:"🔵",from:"lucario"};
// carte « Dernier Enseignement »
CARDS.dernierenseignement = {n:"Dernier Enseignement",c:2,t:"atk",dmg:6,hits:3,retain:true,r:"legende",i:"🔵",from:"lucario",d:"6 dégâts ×3. Retenue. Ce que le maître lui a appris, il ne l'oublie jamais."};

// =====================================================================
// ABSOL  (absol)
// =====================================================================
// fiche (histoire, confidences, Labyrinthe)
CL.absol = {
    season:4,from:2,id:359,n:"Absol",c:"#b8c0d0",family:"Perte",wound:"normal",likesEss:["psy"],comfort:["lait","grena","pommesucree","sitrus","coeursucre"],dislike:["limonade","soda","poudre"],tol:1,
    noPity:true,
    intro:"La porte s'ouvre sur un courant d'air glacé. Absol entre, la corne baissée, et la salle se tait d'un coup, comme si chacun retenait son souffle. Il choisit le coin le plus éloigné des autres, et s'assoit dos au mur.",
    arrive:"<i>Il ne te regarde pas.</i> Tu peux me servir de loin, si tu préfères. Tout le monde préfère. Ils disent que je porte malheur.",
    hints:["Sa corne frémit au moindre bruit dehors. Il regarde la fenêtre comme on guette un orage.","Il a des cicatrices sur le flanc. Des cicatrices de pierres.","Quand quelqu'un rit dans la salle, il ferme les yeux et écoute, très attentivement, comme on boit de l'eau."],
    stages:[
      {req:0,t:"<i>Il fixe sa corne dans le reflet du verre.</i> Je sens les catastrophes avant qu'elles arrivent. Les avalanches, les crues, les orages. Ma corne me fait mal, et je sais.",kw:"corne"},
      {req:2,t:"<i>Sa voix se durcit.</i> Alors je descends au village, pour prévenir. Et chaque fois que j'apparais, ils voient le malheur arriver juste après. Ils ont fini par croire que c'était moi qui l'apportais.",kw:"village"},
      {req:3,t:"<i>Il frissonne.</i> Le dernier hiver, j'ai senti l'avalanche. Je suis descendu en courant. Ils m'ont jeté des pierres et fermé leurs portes. J'ai hurlé jusqu'à ce que la chapelle sonne l'alarme. Tout le monde a survécu. Et personne ne m'a jamais dit merci.",kw:"pierres"},
      {req:4,t:"<i>Il relève enfin la tête.</i> Ils sont vivants. C'est ça, mon merci. Je n'ai pas besoin qu'ils m'aiment pour continuer à veiller sur eux. Mais ça fait du bien, que quelqu'un sache."}
    ],
    lie:{after:0,t:"<i>Il découvre les crocs, à moitié.</i> Ils ont raison. Je porte malheur. Regarde : il pleut depuis que je suis entré."},
    reform:{"corne":"« Ta corne ne fait pas venir le malheur. Elle le voit venir. »","village":"« Tu descendais pour eux. Ce n'est pas ta faute s'ils n'ont pas compris. »","pierres":"« Ils ont survécu grâce à toi. Même sans merci, c'était vrai. »"},
    essGood:"<i>Il boit, et sa corne cesse de frémir.</i> Simple. Rien qui annonce un orage. Merci.",
    essBad:"<i>Il recule, les poils hérissés.</i> Trop. Ça me fait le même effet qu'un tremblement de terre qui approche.",
    frags:[{n:"Le matin où le village s'est réveillé sain et sauf",e:"joie"},{n:"La cloche de la chapelle dans la nuit",e:"nostalgie"}],
    thanks:"<i>Il se lève, et pour la première fois il passe au milieu de la salle.</i> Je vais retourner sur ma crête. Et la prochaine fois que ma corne me fera mal, je descendrai quand même. Peut-être qu'un jour, quelqu'un ouvrira sa porte.",
    gift:{key:"cornemal",n:"Corne d'Absol",i:"🌙",d:"L'ombre commence chaque combat avec 6 PV en moins",fx:{combatStart(C,en){ en.hp=Math.max(1,en.hp-6); en.maxhp=en.hp+6; }}},
    staff:{n:"Vigie",d:"Les âmes très tendues (Tension 2 ou plus) arrivent avec 1 Tension de moins",wage:25},
    staffFx:{arrive(c){ if(c.ten>=2) c.ten--; }},
    cogHint:"Il déteste qu'on ait pitié de lui : pas d'Eau Fraîche. Une seule Gelée Blanche, simple, et de la douceur : Lait Meumeu, Baie Grena, Pomme Sucrée.",
    map:{start:"a",nodes:{
      a:{t:"entree",n:"Le col enneigé",x:50,y:6,nx:["b"]},
      b:{t:"echo",e:"colere",dmg:1,n:"Les volets qui se ferment",x:50,y:18,nx:["c","h"]},
      c:{t:"enigme",need:"nostalgie",n:"La cloche de la chapelle",x:26,y:32,nx:["d"],art:"d"},
      h:{t:"echo",e:"peur",dmg:1,n:"La neige suspendue",x:74,y:32,nx:["d","i"],art:"c"},
      d:{t:"carrefour",n:"La crête des vigies",x:44,y:46,nx:["e","j"],art:"a"},
      i:{t:"sanctuaire",n:"La grotte de glace",x:86,y:48,nx:["j"],art:"e"},
      e:{t:"sanctuaire",n:"La chapelle ouverte",x:16,y:60,nx:["k"],art:"d"},
      j:{t:"echo",e:"tristesse",dmg:2,n:"Les pierres jetées",x:66,y:62,nx:["f"],art:"b"},
      k:{t:"enigme",need:"joie",n:"Le rire des villageois",x:30,y:74,nx:["f"],art:"g"},
      f:{t:"echo",e:"peur",dmg:2,n:"L'avalanche",x:50,y:84,nx:["g"]},
      g:{t:"coeur",key:"joie",n:"Le matin où tout le monde était vivant",x:50,y:95,nx:[]}
    }}
  };
// petites conversations
TALK.absol = [
    {t:"<i>Il tourne la tête vers la fenêtre.</i> Pas d'orage cette nuit. Ma corne est calme. C'est rare. Je crois que j'aime bien cet endroit."},
    {t:"<i>Il regarde le lait chaud avec méfiance, puis le goûte.</i> Une petite fille du village m'en laissait une coupelle devant la chapelle. La seule. Je ne l'ai jamais remerciée.",like:"lait"},
    {t:"<i>Il renifle la Baie Grena.</i> Ça pousse sur la crête, sous la neige. On la trouve quand on sait où creuser. Comme les gens.",like:"grena"}
  ];
// lettre (Cadoizo)
LETTERS.absol = "« Ma corne m'a fait mal hier. Je suis descendu. Une porte s'est ouverte : la petite fille du lait, devenue grande. Elle a sonné la cloche avant même que je parle. — A. »";
// visite de jour en habitué
REGULARS.absol = {order:{base:"lait",add:["grena"]},
    line:"<i>Il entre en plein jour, et les villageois au comptoir ne s'écartent pas.</i> Bonjour. Un lait à la Baie Grena, s'il te plaît. Au comptoir. Pas dans le coin.",
    ok:"<i>Il boit au milieu de la salle.</i> On m'a gravé un petit symbole sur la porte de la chapelle. Une corne. Les enfants disent que c'est « l'ange de la montagne ». C'est ridicule. C'est très bien.",
    ko:"<i>Il fronce le museau.</i> Ce n'est pas ça. Ce n'est pas grave. Ma corne ne m'a rien dit de mauvais aujourd'hui."};
// phrases dans les salles
ROOM_SAY.absol = {a:"Le col. Je venais ici pour sentir le vent tourner.",b:"Les volets se ferment quand j'arrive. Toujours.",c:"La cloche de la chapelle. Elle a sonné, cette nuit-là.",d:"La crête. De là-haut, on voit tout le village. On voit tout venir.",e:"La chapelle. Ils s'y sont tous réfugiés.",f:"L'avalanche. Elle descend. Je cours.",g:"Le matin où tout le monde était vivant.",h:"La neige, suspendue au-dessus des toits. Personne ne la voit, sauf moi.",i:"Une grotte de glace. Je dormais ici, loin d'eux.",j:"Les pierres. Je les sens encore.",k:"Leur rire, le lendemain. Ils riaient d'être vivants."};
// mots-clés des salles
ROOM_KW.absol = {a:"corne",b:"village",j:"pierres"};
// ombre finale
BOSS.absol = {id:359,n:"Ombre du mauvais augure",self:true};
// carte légendaire offerte
LEGEND_CARD.absol = "presage";
// carte offerte
CLIENT_CARD.absol = "tranchenuit";
// carte « Tranche-Nuit »
CARDS.tranchenuit = {n:"Tranche-Nuit",c:1,t:"atk",dmg:6,weak:1,r:"client",i:"🌙",from:"absol"};
// carte « Présage »
CARDS.presage = {n:"Présage",c:1,t:"atk",dmg:6,weak:2,vuln:2,r:"legende",i:"🌙",from:"absol",d:"6 dégâts, Faiblesse 2, Vulnérabilité 2. Il l'avait vu venir."};

// =====================================================================
// GRANIVOL  (granivol)
// =====================================================================
// fiche (histoire, confidences, Labyrinthe)
CL.granivol = {
    season:4,from:3,id:187,n:"Granivol",c:"#e890b0",family:"Abandon",wound:"vol",likesEss:["normal"],comfort:["lait","miel","pecha","jusbaie","coeursucre"],dislike:["liqueur","poudre","soda"],tol:3,
    intro:"La porte s'ouvre toute seule, poussée par une bourrasque, et quelque chose de rose et léger roule jusqu'au comptoir. Un petit Granivol, les feuilles en bataille, s'accroche au pied d'un tabouret comme à une branche dans la tempête.",
    arrive:"<i>Il a le hoquet, à force d'avoir pleuré.</i> Pardon… pardon, le vent m'a lâché ici. C'est où, ici ? C'est loin de la colline aux fleurs ? Dis, c'est loin ?",
    hints:["Chaque fois que la porte s'ouvre et qu'un courant d'air passe, il s'agrippe à la table de toutes ses forces.","Il regarde par la fenêtre dans toutes les directions, comme s'il essayait de reconnaître une colline.","Il a gardé une graine de pissenlit, toute petite, coincée sous une feuille. Il la vérifie sans arrêt."],
    stages:[
      {req:0,t:"<i>Il serre la graine.</i> On était toute une famille, sur la colline aux fleurs. Maman disait de toujours se tenir les feuilles, les jours de vent.",kw:"famille"},
      {req:2,t:"<i>Il hoquette.</i> Il y a eu une bourrasque énorme. Je me suis lâché. Juste une seconde, pour attraper cette graine. Et après, la colline était toute petite, très loin en dessous.",kw:"vent"},
      {req:3,t:"<i>Ses feuilles tremblent.</i> J'ai volé des jours et des jours. Des villes grises, des champs, des panneaux avec plein de flèches. Je ne sais pas lire. Je ne sais même plus de quel côté est la maison. Et si eux, ils m'avaient oublié ?",kw:"perdu"},
      {req:4,t:"<i>Il lève la graine vers la lumière.</i> Maman disait que le vent finit toujours par tourner. Les Granivol reviennent toujours avec le printemps. Je ne suis pas perdu. Je suis juste en voyage."}
    ],
    lie:{after:0,t:"<i>Il bombe ses toutes petites feuilles.</i> Moi, je n'ai pas peur ! J'ai fait exprès de partir, d'abord. C'est une aventure."},
    reform:{"famille":"« Ils te cherchent sûrement autant que tu les cherches. »","vent":"« Tu t'es lâché pour attraper quelque chose de beau. Ce n'est pas une faute. »","perdu":"« On n'oublie pas quelqu'un qu'on aime parce qu'il est loin. »"},
    essGood:"<i>Il boit, et ses feuilles se déplient doucement.</i> C'est léger ! Comme quand on flotte au-dessus des fleurs, tous ensemble.",
    essBad:"<i>Il roule sous la table.</i> Ça tourne ! Ça tourne comme dans la bourrasque !",
    frags:[{n:"La colline aux fleurs au printemps",e:"nostalgie"},{n:"Le vol de toute la famille dans la brise",e:"joie"}],
    thanks:"<i>Il se laisse soulever par le courant d'air de la porte, et cette fois il ne s'accroche pas.</i> Le vent a tourné, je le sens ! Il va vers le sud. Vers les fleurs. Je reviendrai te dire bonjour, au printemps !",
    gift:{key:"graine",n:"Graine de Granivol",i:"🌱",d:"Les deux premiers tours de chaque combat, le client gagne 5 de Bouclier",fx:{turnStart(C){ if(C.turn<=2) C.block+=5; }}},
    staff:{n:"Messager du vent",d:"Les âmes de l'Abandon arrivent avec +1 Ouverture",wage:15},
    staffFx:{arrive(c,d){ if(d.family==="Abandon") c.ouv++; }},
    cogHint:"Il est tout petit et très inquiet. Une seule Gelée Ciel, légère comme le vent, et du doux : Lait Meumeu, Miel, Baie Pêcha. Rien de fort, il roulerait sous la table.",
    map:{start:"a",nodes:{
      a:{t:"entree",n:"La colline aux pissenlits",x:50,y:6,nx:["b"]},
      b:{t:"echo",e:"peur",dmg:1,n:"La bourrasque",x:50,y:18,nx:["c","h"]},
      c:{t:"enigme",need:"nostalgie",n:"La colline aux fleurs",x:26,y:32,nx:["d"],art:"a"},
      h:{t:"echo",e:"tristesse",dmg:1,n:"La ville grise",x:74,y:32,nx:["d","i"],art:"c"},
      d:{t:"carrefour",n:"Le panneau aux mille flèches",x:44,y:46,nx:["e","j"]},
      i:{t:"sanctuaire",n:"Le creux de l'arbre",x:86,y:48,nx:["j"],art:"e"},
      e:{t:"sanctuaire",n:"Le nid à l'abri du vent",x:16,y:60,nx:["k"]},
      j:{t:"echo",e:"peur",dmg:2,n:"Au-dessus des nuages",x:66,y:62,nx:["f"],art:"b"},
      k:{t:"enigme",need:"joie",n:"Le vol de la famille",x:30,y:74,nx:["f"],art:"g"},
      f:{t:"echo",e:"colere",dmg:2,n:"La tempête sur la forêt",x:50,y:84,nx:["g"]},
      g:{t:"coeur",key:"joie",n:"Le vent qui tourne",x:50,y:95,nx:[]}
    }}
  };
// petites conversations
TALK.granivol = [
    {t:"<i>Il observe un brin de poussière qui flotte dans la lumière.</i> Tu crois que le vent sait où il va ? Moi, je crois qu'il fait semblant."},
    {t:"<i>Il plonge presque entier dans le pot de miel.</i> À la maison, on en léchait sur les fleurs ! Maman disait que ça collait les feuilles et que c'était pour ça qu'on ne s'envolait pas.",like:"miel"},
    {t:"<i>Il serre une Baie Pêcha contre lui.</i> Elle est aussi rose que nous ! On dirait un petit frère.",like:"pecha"}
  ];
// lettre (Cadoizo)
LETTERS.granivol = "« LE VENT A TOURNÉ ! J'ai retrouvé la colline ! Maman m'a grondé pendant une heure et m'a serré pendant deux. Toute la famille te dit merci (on est 34). — G. »";
// visite de jour en habitué
REGULARS.granivol = {order:{base:"lait",add:["miel"]},
    line:"<i>Un courant d'air, et une petite boule rose atterrit sur le comptoir.</i> Coucou ! Un lait au miel, vite, le vent repart dans dix minutes !",
    ok:"<i>Il boit en tenant le verre à deux feuilles.</i> J'ai emmené mes petits cousins voler jusqu'ici. Ils sont dehors, accrochés à ton enseigne. Ne t'inquiète pas, ils se tiennent les feuilles !",
    ko:"<i>Il fait la moue.</i> Pas ça ! Mais je reviendrai, promis. Le vent revient toujours."};
// phrases dans les salles
ROOM_SAY.granivol = {a:"La colline aux pissenlits ! Ah non… Ce n'est pas la mienne.",b:"La bourrasque ! Tiens-toi, tiens-toi !",c:"Les fleurs… La maison sentait comme ça.",d:"Plein de flèches. Je ne sais pas lire. Laquelle va à la maison ?",e:"Un nid, à l'abri. On peut se reposer, ici.",f:"La tempête ! Elle arrache tout !",g:"Le vent qui tourne. Je le sens !",h:"Une ville grise. Personne ne me regarde.",i:"Le creux d'un arbre. Il sent bon la sève.",j:"Les nuages… le sol est si loin.",k:"Toute la famille, dans la brise. Je me souviens du vol !"};
// mots-clés des salles
ROOM_KW.granivol = {a:"famille",b:"vent",h:"perdu"};
// ombre finale
BOSS.granivol = {id:187,n:"Ombre de la bourrasque",self:true};
// carte légendaire offerte
LEGEND_CARD.granivol = "retouraunid";
// carte offerte
CLIENT_CARD.granivol = "cotogarde";
// carte « Cotogarde »
CARDS.cotogarde = {n:"Cotogarde",c:1,t:"skill",block:11,r:"client",i:"🌱",from:"granivol"};
// carte « Retour au Nid »
CARDS.retouraunid = {n:"Retour au Nid",c:1,t:"skill",heal:8,draw:2,retain:true,r:"legende",i:"🌸",from:"granivol",d:"Soigne 8 PV, pioche 2. Retenue. Le vent finit toujours par tourner."};

// =====================================================================
// APIREINE  (apireine)
// =====================================================================
// fiche (histoire, confidences, Labyrinthe)
CL.apireine = {
    season:4,from:4,id:416,n:"Apireine",fem:true,c:"#e0a830",family:"Perte",wound:"feu",likesEss:["normal"],comfort:["miel","the","coeursucre","sitrus","glace"],dislike:["eau","soda","limonade"],tol:2,
    intro:"Elle entre comme une reine entre dans une salle de bal, la tête haute, la robe dorée parfaitement lissée. Puis elle s'assoit, et ses ailes s'affaissent d'un coup. Les alvéoles de sa robe sont toutes vides. Pas un seul bourdonnement.",
    arrive:"<i>Sa voix est très digne, et très lasse.</i> Bonsoir. Je voudrais… quelque chose de doux. Avec du miel, si vous en avez. Je n'en ai plus goûté depuis longtemps.",
    hints:["Toutes les cinq minutes, elle bourdonne un ordre très bas, puis s'interrompt, comme si elle avait oublié que personne ne répondrait.","Elle aligne les miettes sur le comptoir en petits hexagones parfaits, sans y penser.","Ses ailes ont des bords roussis. Comme si elles avaient frôlé une flamme."],
    stages:[
      {req:0,t:"<i>Elle lisse sa robe dorée.</i> J'avais une ruche. La plus belle de la forêt de miel. Trois cents Apitrini. Je connaissais chacune par son bourdonnement.",kw:"ruche"},
      {req:2,t:"<i>Ses mains se crispent.</i> Une nuit d'été, la forêt a brûlé. Un feu de camp mal éteint. Les flammes sont montées si vite. J'ai ordonné à tout le monde de fuir vers le sud.",kw:"feu"},
      {req:3,t:"<i>Sa voix se brise.</i> Je suis restée la dernière, pour garder la ruche. Une reine ne quitte pas sa ruche. Quand je suis sortie de la fumée, il n'y avait plus personne autour de moi. Je ne sais pas si elles ont survécu. Je ne sais pas si elles m'en veulent d'être restée.",kw:"reine"},
      {req:4,t:"<i>Elle bourdonne doucement, et cette fois elle ne s'interrompt pas.</i> Je leur ai dit de fuir, et elles ont fui. Elles ont obéi à leur reine jusqu'au bout. Une reine n'est pas une ruche. Une reine, c'est quelqu'un qui veut que les siens vivent."}
    ],
    lie:{after:0,t:"<i>Elle relève le menton.</i> Tout va parfaitement bien. Une reine ne se plaint pas. Une reine ne pleure pas."},
    reform:{"ruche":"« Tu les connaissais toutes. Elles le savaient. »","feu":"« Ton ordre les a sauvées. C'était ton dernier cadeau de reine. »","reine":"« Rester pour les protéger, c'était de l'amour. Pas une faute. »"},
    essGood:"<i>Elle boit, et ses ailes frémissent pour la première fois.</i> Oh… Chaud et doré. Comme la ruche un soir d'été.",
    essBad:"<i>Elle repose le verre, les antennes rabattues.</i> Trop d'eau. Ça me rappelle les seaux, cette nuit-là. Les seaux qui n'arrivaient pas à temps.",
    frags:[{n:"Le bourdonnement de trois cents ailes",e:"nostalgie"},{n:"La première récolte de miel",e:"joie"}],
    thanks:"<i>Elle se lève, et ses alvéoles brillent d'une lumière chaude.</i> Je vais partir vers le sud. Il paraît qu'une nouvelle ruche bourdonne près du lac. Si ce sont elles… je ne leur demanderai pas de me suivre. Je leur demanderai si je peux rester.",
    gift:{key:"mielroyal",n:"Miel Royal",i:"🍯",d:"+8 PV dans le Labyrinthe",fx:{hp:8}},
    staff:{n:"Reine de la ruche",d:"+1 PC max chaque nuit et les âmes de la Perte arrivent avec 1 Tension de moins",wage:35},
    staffFx:{pc:1, arrive(c,d){ if(d.family==="Perte") c.ten--; }},
    cogHint:"Une vraie reine : elle veut être servie avec dignité. Pas d'Eau Fraîche, ça lui rappelle l'incendie. Une Gelée Rouge pour la chaleur, et du doux : Miel, Thé de Safrania, Cœur Sucré.",
    map:{start:"a",nodes:{
      a:{t:"entree",n:"La forêt de miel",x:50,y:6,nx:["b","h"]},
      b:{t:"echo",e:"tristesse",dmg:1,n:"La ruche vide",x:30,y:18,nx:["c"]},
      h:{t:"echo",e:"tristesse",dmg:1,n:"Les alvéoles qui tombent",x:72,y:18,nx:["c","i"],art:"d"},
      c:{t:"enigme",need:"joie",n:"Le champ de fleurs",x:40,y:32,nx:["d","j"]},
      i:{t:"sanctuaire",n:"L'abri de cire",x:84,y:34,nx:["j"],art:"e"},
      d:{t:"carrefour",n:"Le trône de cire",x:22,y:48,nx:["e","k"],art:"b"},
      j:{t:"echo",e:"colere",dmg:1,n:"Le feu de camp mal éteint",x:66,y:48,nx:["k"],art:"f"},
      e:{t:"sanctuaire",n:"La salle des récoltes",x:14,y:64,nx:["f"],art:"e"},
      k:{t:"enigme",need:"nostalgie",n:"Trois cents bourdonnements",x:50,y:64,nx:["f"],art:"b"},
      f:{t:"echo",e:"peur",dmg:2,n:"La forêt en flammes",x:50,y:80,nx:["g"],foe:{id:109,n:"Smogo"}},
      g:{t:"coeur",key:"nostalgie",n:"La reine restée dans la fumée",x:50,y:94,nx:[]}
    }}
  };
// petites conversations
TALK.apireine = [
    {t:"<i>Elle range tes verres par taille, en rangs parfaits.</i> Pardon. Une ruche, ça se tient. On ne perd pas ses habitudes de reine."},
    {t:"<i>Elle goûte le miel du bout de l'antenne, les yeux fermés.</i> Trop jeune, celui-là. Un miel de printemps. Le nôtre était un miel de fin d'été, ambré. Mais il est bon. Il est bon.",like:"miel"},
    {t:"<i>Elle regarde le Cœur Sucré fondre dans sa tasse.</i> Mes Apitrini m'en apportaient un, le jour de mon anniversaire. Trois cents petits cœurs. J'en ai pleuré de joie.",like:"coeursucre"}
  ];
// moments au torchon
WIPE.apireine = ["<i>Elle te prend le verre des mains et le fait briller d'un coup d'aile.</i> Voilà. Une ruche, ça se tient.","<i>Elle hoche la tête, approbatrice, à chaque verre rangé.</i>"];
// lettre (Cadoizo)
LETTERS.apireine = "« C'étaient elles. Toutes, ou presque. Elles ont gardé une alvéole vide au centre de la ruche. Elles disent que c'était la place de leur reine, et qu'elles l'attendaient. — A. »";
// visite de jour en habitué
REGULARS.apireine = {order:{base:"the",add:["miel"]},
    line:"<i>Elle entre suivie d'une petite escorte bourdonnante.</i> Bonjour, tavernier. Un thé au miel, s'il vous plaît. Et un dé à coudre de miel pour chacune de mes filles.",
    ok:"<i>Elle boit pendant que ses Apitrini se disputent le miel.</i> La nouvelle ruche est près du lac. Plus petite que l'ancienne. Plus bruyante aussi. Je ne l'échangerais pour rien au monde.",
    ko:"<i>Elle repose la tasse avec élégance.</i> Ce n'est pas tout à fait cela. Je ne vous en tiendrai pas rigueur."};
// phrases dans les salles
ROOM_SAY.apireine = {a:"La forêt de miel. Elle sentait si bon, avant.",b:"Le trône de cire. Vide. Il n'y a plus personne à qui donner des ordres.",c:"Un champ de fleurs. Mes filles butinaient ici tout l'été.",d:"Les alvéoles tombent comme des feuilles mortes.",e:"Un abri de cire, chaud. Comme la ruche les soirs de récolte.",f:"La forêt brûle. Fuyez ! Vers le sud ! FUYEZ !",g:"La reine restée dans la fumée.",h:"Les alvéoles tombent comme des feuilles mortes.",i:"Un abri de cire, chaud. Comme la ruche les soirs de récolte.",j:"Le feu de camp. Une seule braise oubliée…",k:"Trois cents bourdonnements. Je les reconnaîtrais entre mille."};
// mots-clés des salles
ROOM_KW.apireine = {b:"ruche",j:"feu",f:"reine"};
// ombre finale
BOSS.apireine = {id:416,n:"Ombre de la reine seule",self:true};
// carte légendaire offerte
LEGEND_CARD.apireine = "ruchereine";
// carte offerte
CLIENT_CARD.apireine = "appeldefense";
// carte « Appel Défense »
CARDS.appeldefense = {n:"Appel Défense",c:1,t:"skill",block:7,draw:1,r:"client",i:"🐝",from:"apireine"};
// carte « Ruche Reine »
CARDS.ruchereine = {n:"Ruche Reine",c:2,t:"skill",block:14,heal:6,r:"legende",i:"🍯",from:"apireine",d:"14 de Bouclier, soigne 6 PV. Une reine protège les siens."};
