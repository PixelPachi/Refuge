// Saison 7 · Chapitre 4 « La fête de Bourg-Brume »
// Famille de blessure du chapitre : la Solitude (ceux que la ville a oubliés, les liens défaits).
// Tout ce qui concerne chaque âme de la saison est regroupé ici, client par client.
// Images Gemini à faire : voir GEMINI.md (décor générique en attendant).

// =====================================================================
// ÉCRÉMEUH  (ecremeuh)
// =====================================================================
CL.ecremeuh = {
    season:7,from:1,id:241,n:"Écrémeuh",fem:true,c:"#f0a8c0",family:"Solitude",wound:"normal",likesEss:["feu"],comfort:["the","miel","biscuit","pommesucree","coeursucre"],dislike:["lait","soda","poudre"],tol:3,
    intro:"La cloche qu'elle porte au cou tinte avant qu'elle n'entre. Une grande Écrémeuh, un peu voûtée, s'arrête sur le seuil et regarde la salle comme une vieille photo. Elle choisit une table au fond, près de la fenêtre qui donne sur les champs.",
    arrive:"<i>Elle sourit poliment.</i> Bonsoir, mon petit. N'importe quoi, sauf du lait. Ça fait trente ans que tout le monde me sert du lait. Comme si je ne savais faire que ça.",
    hints:["Elle regarde les bouteilles de Lait Meumeu sur l'étagère avec un drôle d'air, entre la fierté et le chagrin.","Sa cloche ne sonne plus quand elle bouge : quelqu'un a coincé un bout de tissu dedans.","Elle connaît le prénom de chaque villageois qui passe dans la rue. Aucun ne la salue."],
    stages:[
      {req:0,t:"<i>Elle caresse sa cloche.</i> La ferme Meumeu, sur la colline. C'est moi. Enfin, c'était moi. Tout le lait de Bourg-Brume venait de là. Les Lait Meumeu de ton étagère, c'est le mien, mon petit.",kw:"lait"},
      {req:2,t:"<i>Elle regarde les champs, par la fenêtre.</i> Le vieux fermier, Basile, me parlait tous les matins en me trayant. De la pluie, de sa femme, des enfants du village. J'étais sa confidente. Je savais tout de Bourg-Brume.",kw:"ferme"},
      {req:3,t:"<i>Sa voix tremble.</i> Basile est mort l'hiver dernier. La ferme a fermé. Les gens achètent leur lait en bouteille, maintenant, à la ville. Personne n'est monté sur la colline. Personne ne s'est demandé ce qu'était devenue la vache de Basile. Je n'étais plus utile, alors je n'existais plus.",kw:"utile"},
      {req:4,t:"<i>Elle retire le bout de tissu de sa cloche, et la fait tinter, clair.</i> Basile ne me parlait pas pour le lait. Il me parlait parce que j'écoutais. Je sais encore écouter. Ça, ça ne se vend pas en bouteille."}
    ],
    lie:{after:0,t:"<i>Elle rit, un peu trop haut.</i> Oh, je suis très bien toute seule ! Enfin tranquille. Plus personne ne me réveille à cinq heures."},
    reform:{"lait":"« Tout Bourg-Brume a grandi avec ton lait. Ça ne s'efface pas. »","ferme":"« Tu étais sa confidente. C'est bien plus qu'une vache laitière. »","utile":"« On n'existe pas parce qu'on est utile. Tu comptes, toi. »"},
    essGood:"<i>Elle boit, et sa cloche tinte toute seule.</i> Ah… Ça réchauffe. Comme l'étable un matin d'hiver, avec Basile qui chantonnait.",
    essBad:"<i>Elle repose le verre, les oreilles basses.</i> Trop fort, mon petit. Je ne suis plus toute jeune.",
    frags:[{n:"Les matins de traite avec Basile qui chantonnait",e:"nostalgie"},{n:"Le premier verre de Lait Meumeu bu par un enfant du village",e:"joie"}],
    thanks:"<i>Elle se lève, et sa cloche sonne à chaque pas.</i> Je vais redescendre au village. Pas pour vendre du lait. Il y a un banc devant la fontaine où les vieux s'assoient seuls. Je vais m'asseoir avec eux. Quelqu'un doit bien écouter, maintenant que Basile n'est plus là.",
    gift:{key:"clochemeuh",n:"Clochette d'Écrémeuh",i:"🔔",d:"Au début de chaque combat, le client récupère 5 PV",fx:{turnStart(C,D){ if(C.turn===1) D.hp=Math.min(D.maxhp,D.hp+5); }}},
    staff:{n:"Oreille du village",d:"Les âmes de la Solitude arrivent avec +1 Ouverture",wage:20},
    staffFx:{arrive(c,d){ if(d.family==="Solitude") c.ouv++; }},
    cogHint:"Surtout pas de lait : elle en a servi toute sa vie, elle le prendrait mal. Une Gelée Blanche, et du réconfortant : Thé de Safrania, Miel, Biscuit Lava.",
    map:mapStd({a:"La colline de la ferme",b:"L'étable vide",h:"Les bouteilles de la ville",c:"Le chemin du village",i:"Le premier verre d'un enfant",d:"La paille tiède",j:"Les volets de la ferme fermés",k:"Les matins de traite",l:"Le banc devant la fontaine",f:"L'hiver où Basile est parti",g:"Le jour où personne n'est monté sur la colline"},{eb:"tristesse",eh:"colere",ej:"tristesse",ef:"tristesse",key:"nostalgie"})
};
TALK.ecremeuh = [
    {t:"<i>Elle regarde passer le facteur Cadoizo par la fenêtre.</i> Lui, je l'ai connu tout petit. Il volait de travers. Il venait boire du lait chaud à la ferme quand il pleuvait trop pour distribuer le courrier."},
    {t:"<i>Elle hume le thé.</i> Basile buvait du thé noir, très fort, avec une goutte de mon lait. Juste une goutte. Il disait que c'était ma signature.",like:"the"},
    {t:"<i>Elle croque un Biscuit Lava, ravie.</i> Ça croque ! À la ferme, il n'y avait que du foin. Trente ans de foin. Tu ne peux pas savoir.",like:"biscuit"}
];
WIPE.ecremeuh = ["<i>Elle te raconte, pendant que tu essuies, l'histoire de chaque famille de la rue. Tu n'as rien demandé. Ça lui fait du bien.</i>","<i>Elle hoche la tête au rythme du torchon, comme Basile au rythme de la traite.</i>"];
LETTERS.ecremeuh = "« Sur le banc de la fontaine, nous sommes cinq, maintenant. Le vieux Ronflex du moulin, la grand-mère Mélofée, et deux autres. On parle de la pluie. C'est merveilleux, la pluie, quand on en parle à plusieurs. — É. »";
REGULARS.ecremeuh = {order:{base:"the",add:["miel"]},
    line:"<i>Elle entre en faisant tinter sa cloche, et trois villageois lui disent bonjour.</i> Bonjour, mon petit ! Un thé au miel, s'il te plaît. Pas de lait, hein ?",
    ok:"<i>Elle boit lentement.</i> Les enfants du village montent à la colline, le mercredi. Je leur raconte comment c'était, la ferme. Ils ne me demandent jamais de lait. Ils me demandent des histoires.",
    ko:"<i>Elle sourit quand même.</i> Ce n'est pas tout à fait ça, mais c'est gentil d'avoir essayé."};
ROOM_SAY.ecremeuh = {a:"La colline. D'ici, on voit tout Bourg-Brume. Personne ne lève les yeux vers ici.",b:"L'étable. Vide. Ma place, mon seau, ma paille.",h:"Des bouteilles de la ville. Toutes pareilles. Elles n'ont personne derrière.",c:"Le chemin qui descend au village. Basile le prenait chaque matin, avec ses bidons.",i:"Un enfant boit son premier verre de mon lait. Il fait une moustache blanche.",d:"La paille tiède. Je dormais ici, et Basile me disait bonne nuit.",j:"Les volets de la ferme. Fermés. Personne ne les rouvrira.",k:"Les matins de traite. Il chantonnait faux. Je ne lui ai jamais dit.",l:"Le banc devant la fontaine. Des gens seuls, assis côte à côte, sans se parler.",f:"L'hiver où Basile est parti. Il faisait si froid.",g:"Le jour où personne n'est monté sur la colline."};
ROOM_KW.ecremeuh = {h:"lait",b:"ferme",j:"utile"};
BOSS.ecremeuh = {id:241,n:"Ombre de la ferme vide",self:true};
LEGEND_CARD.ecremeuh = "laitmaison";
CLIENT_CARD.ecremeuh = "roulade";
CARDS.roulade = {n:"Roulade",c:1,t:"atk",dmg:5,block:4,r:"client",i:"🔔",from:"ecremeuh"};
CARDS.laitmaison = {n:"Lait de la Ferme",c:1,t:"skill",heal:12,draw:1,retain:true,r:"legende",i:"🔔",from:"ecremeuh",d:"Soigne 12 PV, pioche 1. Retenue. Le goût de tout un village."};

// =====================================================================
// TROPIUS  (tropius)
// =====================================================================
CL.tropius = {
    season:7,from:2,id:357,n:"Tropius",c:"#78b858",family:"Solitude",wound:"vol",likesEss:["normal"],comfort:["eau","sitrus","pecha","jusbaie","galette"],dislike:["liqueur","poudre","soda"],tol:2,
    intro:"Il faut ouvrir les deux battants de la porte pour qu'il passe. Tropius, immense, les feuilles de son dos repliées pour ne rien renverser. Sous son menton pendent quelques fruits jaunes, un peu flétris. Il s'installe au milieu de la salle, très droit, et attend.",
    arrive:"<i>Sa voix est grave et douce, comme le vent dans les palmes.</i> Bonsoir. Vous pouvez prendre un fruit, si vous voulez. Tout le monde prend un fruit. C'est pour ça qu'on vient me voir, d'habitude.",
    hints:["Ses fruits sont flétris. Personne ne les a cueillis depuis longtemps.","Chaque fois qu'un enfant rit dans la rue, il tend le cou vers la fenêtre, plein d'espoir, puis le replie.","Il garde, coincé sous une feuille, un vieux ruban de la fête du village, délavé."],
    stages:[
      {req:0,t:"<i>Il secoue doucement ses fruits.</i> Pendant la fête de Bourg-Brume, je me tenais sur la place. Les enfants grimpaient sur mon dos et cueillaient les fruits sous mon menton. C'était le meilleur moment de l'année.",kw:"fruits"},
      {req:2,t:"<i>Il sort le ruban délavé.</i> Une petite fille m'avait accroché ce ruban, la première année. « Pour que tu reviennes l'an prochain. » Je suis revenu. Dix ans de suite. Elle grandissait, et moi je restais pareil.",kw:"enfants"},
      {req:3,t:"<i>Ses feuilles se replient.</i> L'an dernier, il y avait une machine à barbe à papa à ma place. Les enfants étaient devant la machine. La petite fille était grande, elle m'a regardé sans me reconnaître. Je suis resté au bout de la place, avec mes fruits. Personne n'a grimpé. Ils ne m'aimaient que pour les fruits.",kw:"fête"},
      {req:4,t:"<i>Il accroche le ruban délavé autour de son cou, bien en vue.</i> Les enfants grandissent. C'est ce qu'ils doivent faire. Elle a grandi avec mes fruits dans le ventre, et un souvenir de moi quelque part. Ce n'est pas rien. Et il y a toujours de nouveaux enfants."}
    ],
    lie:{after:0,t:"<i>Il hausse les feuilles.</i> Je ne vais plus à la fête par choix. C'est trop bruyant. Je préfère les palmiers. Les palmiers ne grimpent pas sur moi."},
    reform:{"fruits":"« On venait pour les fruits, on revenait pour toi. »","enfants":"« Elle a grandi, mais tu fais partie de son enfance. »","fête":"« La fête a changé, ta place peut changer aussi. Elle existe toujours. »"},
    essGood:"<i>Il boit, et ses fruits reprennent un peu de couleur.</i> Comme une pluie d'été sur les palmes. Merci.",
    essBad:"<i>Il tangue, et un fruit tombe.</i> Trop… je ne vole plus droit, même assis.",
    frags:[{n:"Le rire des enfants qui grimpent sur son dos",e:"joie"},{n:"Le ruban noué par la petite fille",e:"nostalgie"}],
    thanks:"<i>Il se lève, et ses feuilles se déploient jusqu'au plafond.</i> Cette année, j'irai à la fête. Pas au milieu. À côté de la machine à barbe à papa. Les enfants qui attendent leur tour pourront grimper en attendant. Et si la grande fille passe, je lui rendrai son ruban.",
    gift:{key:"regime",n:"Régime de Tropius",i:"🍌",d:"Au début de chaque combat, le client gagne 2 d'Élan et récupère 3 PV",fx:{combatStart(C,en,D){ C.elan=(C.elan||0)+2; D.hp=Math.min(D.maxhp,D.hp+3); }}},
    staff:{n:"Jardinier",d:"+2 PC max chaque nuit",wage:20},
    staffFx:{pc:2},
    cogHint:"Il est doux et léger : rien de fort. Une Gelée Ciel pour ses ailes, et du fruité : Eau Fraîche, Baie Sitrus, Galette de Fête.",
    map:mapStd({a:"La place du village décorée",b:"Les fruits flétris",h:"La foule qui passe sans voir",c:"Les guirlandes de la fête",i:"Les enfants qui grimpent",d:"La palmeraie tranquille",j:"La machine à barbe à papa",k:"Le ruban de la petite fille",l:"Le verger au lever du jour",f:"La fête où personne n'a grimpé",g:"Le jour où elle ne l'a pas reconnu"},{eb:"tristesse",eh:"peur",ej:"colere",ef:"tristesse",key:"joie"})
};
TALK.tropius = [
    {t:"<i>Il penche le cou pour regarder par la fenêtre du haut.</i> D'ici, on voit le clocher. Le jour de la fête, on y accroche des lampions. Je les regardais s'allumer un par un."},
    {t:"<i>Il goûte une Baie Pêcha avec délicatesse.</i> Les enfants m'en glissaient sous les feuilles, en échange des fruits. Un troc. Le plus beau des trocs.",like:"pecha"},
    {t:"<i>Il fixe la Galette de Fête.</i> Une galette de la fête… Ça sent la place du village, les lampions, le bruit. Ça sent le jour où je comptais.",like:"galette"}
];
WIPE.tropius = ["<i>Le vent de ses feuilles sèche les verres plus vite que ton torchon. Il a l'air très fier.</i>","<i>Il te regarde faire en se balançant doucement, comme un palmier.</i>"];
LETTERS.tropius = "« Quarante-deux enfants ont grimpé sur mon dos à la fête. J'ai compté. Une jeune femme m'a regardé longtemps, puis elle a pleuré, et elle a dit : \"Tu es revenu.\" J'ai gardé mon ruban. Elle m'en a noué un deuxième. — T. »";
REGULARS.tropius = {order:{base:"eau",add:["pecha"]},
    line:"<i>Il passe la tête par la fenêtre, trois enfants accrochés à ses feuilles.</i> Bonjour ! Une Eau Fraîche à la Baie Pêcha, s'il vous plaît. Et des fruits pour ceux-là, je n'en ai plus, ils ont tout mangé.",
    ok:"<i>Il boit, et les enfants rient sur son dos.</i> Ils m'appellent « l'arbre qui marche ». Le maire veut faire de moi la mascotte de la fête. Moi, je veux juste qu'ils continuent à grimper.",
    ko:"<i>Il sourit, les fruits tout ronds.</i> Pas tout à fait, mais les enfants ont bu la moitié, alors ce n'est pas grave."};
ROOM_SAY.tropius = {a:"La place du village, décorée pour la fête. Je connais chaque pavé.",b:"Mes fruits ont flétri. Personne ne les a cueillis.",h:"La foule passe. Elle ne lève pas les yeux. Je suis trop grand pour être vu.",c:"Les guirlandes. Je les portais sur mes feuilles, avant.",i:"Les enfants grimpent sur mon dos ! Ils rient, ils se battent pour le plus gros fruit.",d:"Une palmeraie tranquille. Personne n'y vient. C'est calme. C'est triste.",j:"La machine à barbe à papa. À ma place.",k:"Le ruban. « Pour que tu reviennes l'an prochain. »",l:"Le verger au lever du jour. Mes fruits poussent ici, pour eux.",f:"La fête. Je suis au bout de la place. Personne ne grimpe.",g:"Le jour où elle ne m'a pas reconnu."};
ROOM_KW.tropius = {b:"fruits",i:"enfants",f:"fête"};
BOSS.tropius = {id:357,n:"Ombre de la place vide",self:true};
LEGEND_CARD.tropius = "dernierfruit";
CLIENT_CARD.tropius = "tranchefeuille";
CARDS.tranchefeuille = {n:"Lame-Feuille",c:1,t:"atk",dmg:8,r:"client",i:"🍌",from:"tropius"};
CARDS.dernierfruit = {n:"Le Fruit Partagé",c:1,t:"skill",heal:8,block:8,elan:2,r:"legende",i:"🍌",from:"tropius",d:"Soigne 8 PV, 8 de Bouclier, +2 Élan. Il y a toujours de nouveaux enfants."};

// =====================================================================
// ARCANIN  (arcanin)
// =====================================================================
CL.arcanin = {
    season:7,from:3,id:59,n:"Arcanin",c:"#e88838",family:"Solitude",wound:"feu",likesEss:["combat"],comfort:["the","sitrus","mago","grochampi","biscuit"],dislike:["superbonbon","limonade","gateau"],tol:3,
    intro:"Un grand Arcanin entre au pas, la tête haute, comme pour une inspection. Sa crinière est blanchie par endroits. Il fait le tour de la salle, renifle chaque coin, vérifie la fenêtre, puis s'assoit face à la porte. Les vieilles habitudes.",
    arrive:"<i>Il hoche la tête, très droit.</i> Bonsoir, tavernier. Rien à signaler, à ce que je vois. Un thé, s'il vous plaît. Je suis encore en service. Enfin… plus vraiment.",
    hints:["Toutes les dix minutes, il tourne la tête vers la porte, prêt à bondir. Personne n'entre.","Il porte un vieil insigne de police accroché à son collier, terni, qu'il polit du bout de la patte.","Dehors, deux jeunes Caninos passent en courant, un sifflet à la gueule. Il les suit des yeux longtemps."],
    stages:[
      {req:0,t:"<i>Il polit son insigne.</i> Douze ans au poste de Bourg-Brume, avec l'agente Lucie. Les vols de baies, les Rattata dans les caves, les enfants perdus à la fête. Je connaissais chaque rue la nuit.",kw:"patrouille"},
      {req:2,t:"<i>Il s'adoucit.</i> L'agente Lucie me parlait pendant les rondes. Elle disait que Bourg-Brume dormait tranquille parce qu'on veillait, nous deux. On était une équipe. Elle m'appelait « mon grand ».",kw:"agente"},
      {req:3,t:"<i>Ses flammes baissent.</i> Un jour, on m'a dit que j'étais trop vieux. Ils ont amené deux Caninos, jeunes, rapides. Lucie a été mutée en ville. On m'a remercié, on m'a donné une médaille. Et le soir même, plus personne n'avait besoin de moi. Je fais encore mes rondes. Seul. Personne ne le sait.",kw:"relève"},
      {req:4,t:"<i>Il pose son insigne sur le comptoir, avec respect.</i> Les Caninos ne connaissent pas encore les rues. Moi, si. Je n'ai pas besoin d'un insigne pour leur apprendre. Bourg-Brume dormira tranquille, parce qu'on veillera. Nous trois."}
    ],
    lie:{after:0,t:"<i>Il bombe le torse.</i> Je suis à la retraite, et c'est très bien. J'ai mérité mon repos. Je n'ai plus jamais envie de faire une ronde."},
    reform:{"patrouille":"« Tu as veillé sur cette ville pendant douze ans. Elle te le doit. »","agente":"« Une équipe comme la vôtre, ça ne s'efface pas avec une mutation. »","relève":"« Être relevé, ce n'est pas être remplacé. Tu peux transmettre. »"},
    essGood:"<i>Il boit, et ses flammes reprennent, vives.</i> Ah. Ça, c'est un verre de service. Chaud et droit.",
    essBad:"<i>Il grogne, les crocs à moitié sortis.</i> Trop fort. Ça brouille le flair.",
    frags:[{n:"Les rondes de nuit avec l'agente Lucie",e:"nostalgie"},{n:"L'enfant retrouvé pendant la fête, endormi sous un étal",e:"joie"}],
    thanks:"<i>Il se lève, et salue de la patte, comme au poste.</i> Demain, j'irai voir les deux Caninos. Je leur montrerai les ruelles, les caves, les raccourcis. Et le soir, je ferai ma ronde avec eux. Pas en chef. En vieux collègue.",
    gift:{key:"insigne",n:"Insigne d'Arcanin",i:"🎖️",d:"Au début de chaque combat, l'ombre est Faible 1 et le client gagne 4 de Bouclier",fx:{combatStart(C,en){ en.weak+=1; C.blockNext+=4; }}},
    staff:{n:"Garde de nuit",d:"Les âmes de la Solitude arrivent avec 1 Tension de moins",wage:25},
    staffFx:{arrive(c,d){ if(d.family==="Solitude") c.ten--; }},
    cogHint:"Il est fier et droit, et il tient bien : il aime les verres francs. Une Gelée Rouge pour ses flammes, et du solide : Thé de Safrania, Baie Sitrus, Gros Champi. Pas de Super Bonbon, il le prendrait pour une moquerie sur son âge.",
    map:mapStd({a:"Le poste de police la nuit",b:"La médaille et le placard",h:"Les rues sans lui",c:"Le carrefour de la grand-rue",i:"L'enfant retrouvé à la fête",d:"La niche du poste",j:"Les sifflets des Caninos",k:"Les rondes avec Lucie",l:"Le toit d'où l'on voit tout",f:"Le soir de la relève",g:"Le jour où plus personne n'avait besoin de lui"},{eb:"tristesse",eh:"peur",ej:"colere",ef:"colere",key:"joie",foe:{id:58,n:"Caninos"}})
};
TALK.arcanin = [
    {t:"<i>Il renifle l'air, sourcils froncés.</i> Quelqu'un a laissé une tarte trop cuire, trois maisons plus loin. Ce n'est pas mon problème. …Ce n'est plus mon problème."},
    {t:"<i>Il boit son thé d'une traite.</i> L'agente Lucie m'apportait un thé au poste, à minuit pile. Elle disait que c'était l'heure où même les voleurs ont froid.",like:"the"},
    {t:"<i>Il dévore un Gros Champi.</i> La cantine du poste servait les mêmes. Ils étaient mauvais. Ceux-là sont bons. C'est presque triste.",like:"grochampi"}
];
WIPE.arcanin = ["<i>Il inspecte chaque verre que tu essuies, et hoche la tête : conforme.</i>","<i>Il surveille la porte pendant que tu essuies. Ça le rassure d'avoir quelqu'un à protéger.</i>"];
LETTERS.arcanin = "« Les deux Caninos connaissent toutes les ruelles. L'un d'eux a retrouvé un enfant perdu hier, sous un étal, à l'endroit exact où je l'avais fait il y a dix ans. Lucie m'a écrit de la ville. Elle m'appelle toujours \"mon grand\". — A. »";
REGULARS.arcanin = {order:{base:"the",add:["sitrus"]},
    line:"<i>Il entre suivi de deux Caninos qui imitent sa démarche.</i> Bonjour, tavernier. Un thé à la Baie Sitrus. Et deux laits pour mes recrues, elles ont bien travaillé.",
    ok:"<i>Il boit pendant que les Caninos se chamaillent.</i> Le maire a proposé de me rendre mon insigne. J'ai refusé. Je l'ai donné au plus jeune des deux. Il dort avec.",
    ko:"<i>Il fronce le museau.</i> Pas conforme. Mais je ne verbalise plus. Je suis à la retraite."};
ROOM_SAY.arcanin = {a:"Le poste. La lumière est encore allumée, mais je n'ai plus la clé.",b:"Une médaille, dans un placard. C'est tout ce qui reste.",h:"Les rues, sans moi. Elles ont l'air plus sombres.",c:"Le carrefour de la grand-rue. Mon point de départ, chaque nuit.",i:"Un enfant, endormi sous un étal, pendant la fête. Je l'ai trouvé. Sa mère a pleuré.",d:"Ma niche, au poste. Quelqu'un d'autre dort dedans.",j:"Les sifflets des Caninos. Si jeunes. Si rapides.",k:"Les rondes avec Lucie. Elle parlait, j'écoutais la ville.",l:"Le toit d'où l'on voit tout Bourg-Brume. Ma ville.",f:"Le soir de la relève. Une médaille, et la porte qui se ferme.",g:"Le jour où plus personne n'avait besoin de moi."};
ROOM_KW.arcanin = {c:"patrouille",k:"agente",f:"relève"};
BOSS.arcanin = {id:59,n:"Ombre du gardien oublié",self:true};
LEGEND_CARD.arcanin = "derniereronde";
CLIENT_CARD.arcanin = "vitesseextreme";
CARDS.vitesseextreme = {n:"Vitesse Extrême",c:1,t:"atk",dmg:7,firstDouble:true,r:"client",i:"🎖️",from:"arcanin",d:"7 dégâts, doublés si c'est la première carte du tour."};
CARDS.derniereronde = {n:"La Ronde de Nuit",c:2,t:"atk",dmg:9,hits:2,block:8,r:"legende",i:"🎖️",from:"arcanin",d:"9 dégâts ×2, 8 de Bouclier. Bourg-Brume dort tranquille."};

// =====================================================================
// BRANETTE  (branette)
// =====================================================================
CL.branette = {
    season:7,from:4,id:354,n:"Branette",fem:true,c:"#706888",family:"Solitude",wound:"psy",likesEss:["eau"],comfort:["lait","miel","pecha","bonbonfete","coeursucre"],dislike:["liqueur","poudre","limonade"],tol:2,
    quiet:true,
    intro:"La porte grince, et une petite silhouette sombre se glisse à l'intérieur sans faire de bruit. Branette, une poupée de chiffon noire, la bouche fermée par une fermeture éclair dorée. Elle s'assoit sur le rebord de la fenêtre, les jambes dans le vide, et fixe la rue d'un œil rouge.",
    arrive:"<i>La fermeture éclair s'entrouvre à peine. Sa voix est un murmure de tissu.</i> …Je ne suis pas venue pour être gentille. Je suis venue parce qu'il fait froid, dehors. Un verre. Doux. Et ne me regarde pas comme ça.",
    hints:["Quand un enfant passe dans la rue avec une poupée, elle se recroqueville, puis se penche pour mieux voir.","Il manque un bouton à son ventre. On voit le fil qui pend, là où il était.","Elle fait tourner entre ses doigts une petite étiquette de tissu, effacée, où l'on devine un prénom."],
    stages:[
      {req:0,t:"<i>Elle tire sur sa fermeture éclair.</i> J'ai été une peluche. Une vraie. Avec un sourire cousu et des boutons. Une petite fille dormait avec moi toutes les nuits. Je connaissais tous ses secrets.",kw:"peluche"},
      {req:2,t:"<i>Elle fait tourner l'étiquette.</i> Elle a grandi. Un jour, elle m'a mise dans un carton, avec les jouets cassés. Le carton est monté au grenier. Il y faisait noir, et froid, et la poussière tombait sur mes yeux. J'ai attendu qu'elle revienne. Des années.",kw:"grenier"},
      {req:3,t:"<i>La fermeture éclair grince.</i> Elle n'est jamais revenue. Alors j'ai fermé ma bouche, pour ne plus jamais dire de secrets à personne. Et ma colère a cousu une fermeture éclair dessus. Les autres jouets abandonnés deviennent des Branette. On est beaucoup, dans les greniers.",kw:"oubliée"},
      {req:4,t:"<i>Elle ouvre doucement sa fermeture éclair, et en dessous, on devine encore le vieux sourire cousu.</i> Elle ne m'a pas oubliée par méchanceté. Elle a grandi, c'est tout. Le sourire est toujours là, dessous. Je crois que je peux le garder sans lui en vouloir."}
    ],
    lie:{after:0,t:"<i>Ses yeux rouges brillent.</i> Je la déteste. Je ne pense plus à elle. Je ne pense plus à personne. C'est mieux."},
    reform:{"peluche":"« Tu as gardé ses secrets toutes ces nuits. C'était précieux. »","grenier":"« Tu as attendu si longtemps dans le noir. Tu es au chaud, maintenant. »","oubliée":"« Elle a grandi. Ça ne veut pas dire que tu ne comptais pas. »"},
    essGood:"<i>Elle boit à petites gorgées, et sa fermeture éclair s'entrouvre d'un cran.</i> …C'est doux. Comme le lait qu'elle me faisait semblant de boire, le soir.",
    essBad:"<i>Elle se renfrogne, la fermeture éclair bien fermée.</i> Trop. Je déteste quand c'est trop.",
    frags:[{n:"Les nuits serrée contre la petite fille",e:"nostalgie"},{n:"Le premier secret qu'on lui a confié",e:"joie"}],
    thanks:"<i>Elle saute du rebord de la fenêtre, et pour la première fois elle sourit, fermeture ouverte.</i> Je vais retourner au grenier. Pas pour attendre. Il y a les autres Branette, là-haut, et ils ont tous un sourire cousu, dessous. Je vais leur montrer comment on ouvre.",
    gift:{key:"zip",n:"Fermeture Éclair de Branette",i:"🧵",d:"Le client renvoie 2 dégâts à l'ombre chaque fois qu'elle attaque (Épines 2)",fx:{combatStart(C){ C.thorns=(C.thorns||0)+2; }}},
    staff:{n:"Gardienne des oubliés",d:"Les âmes qui reviennent (2e visite ou plus) arrivent avec +1 Ouverture",wage:15},
    staffFx:{arrive(c){ if(S.clients[c.k] && S.clients[c.k].visits>=2) c.ouv++; }},
    cogHint:"Elle se méfie de tout le monde : ne la regarde pas trop, laisse-la venir. Une Gelée Rose pour qu'elle s'apaise, et du doux : Lait Meumeu, Miel, Bonbon Fête.",
    map:mapStd({a:"Le grenier poussiéreux",b:"Le carton des jouets cassés",h:"Le noir sous la poussière",c:"L'escalier du grenier",i:"Le premier secret confié",d:"Le lit d'enfant",j:"La fermeture qui se coud",k:"Les nuits serrée contre elle",l:"La lucarne au clair de lune",f:"Les années à attendre",g:"Le jour où le carton est monté au grenier"},{eb:"tristesse",eh:"peur",ej:"colere",ef:"tristesse",key:"nostalgie",foe:{id:353,n:"Polichombr"}})
};
TALK.branette = [
    {t:"<i>Elle regarde ta tasse, ta cuillère, ton torchon.</i> Tout le monde a des choses qu'il oublie dans un coin. Toi aussi. Je le vois. Je les vois toujours."},
    {t:"<i>Elle trempe le bout de sa main de chiffon dans le lait chaud.</i> Elle me faisait des dînettes. Du lait imaginaire dans des tasses minuscules. C'était le meilleur lait du monde, alors qu'il n'existait pas.",like:"lait"},
    {t:"<i>Elle serre un Bonbon Fête dans sa main.</i> Elle m'emmenait à la fête du village, sous son bras. Elle m'achetait toujours un bonbon. Elle le mangeait. C'était pour moi quand même.",like:"bonbonfete"}
];
WIPE.branette = ["<i>Elle fait semblant de ne pas regarder. Elle regarde.</i>","<i>Elle tend la main vers ton torchon, puis la retire. Puis la retend. Tu lui donnes un coin. Elle essuie un verre, très sérieusement.</i>"];
LETTERS.branette = "« Au grenier, nous étions onze Branette. Sept ont rouvert leur fermeture. Une est redescendue : un petit garçon de la maison l'a trouvée, il l'a lavée. Elle dort dans un lit, maintenant. Moi, je reste là-haut. Il faut bien quelqu'un pour les nouveaux. — B. »";
REGULARS.branette = {order:{base:"lait",add:["miel"]},
    line:"<i>Elle se glisse par la fenêtre, fermeture éclair ouverte sur un petit sourire cousu.</i> …Bonjour. Un lait au miel. Et un pour le Branette qui attend dehors. Il est timide.",
    ok:"<i>Elle boit, assise sur le comptoir.</i> Une petite fille m'a vue dans la rue, hier. Elle n'a pas eu peur. Elle m'a dit bonjour. Je lui ai dit bonjour aussi. C'est tout. C'était énorme.",
    ko:"<i>Elle referme sa fermeture d'un cran.</i> …Ce n'est pas ça. Mais je reviendrai quand même. Je reviens toujours, maintenant."};
ROOM_SAY.branette = {a:"Le grenier. La poussière tombe comme de la neige grise.",b:"Le carton. Les jouets cassés. Et moi, qui ne l'étais pas.",h:"Le noir. La poussière sur mes yeux. Je ne vois plus rien.",c:"L'escalier. Je l'entends monter, parfois. Ce n'est jamais elle.",i:"Son premier secret. « J'ai peur du noir. » Moi aussi, maintenant.",d:"Son lit d'enfant. Ma place, contre l'oreiller.",j:"La fermeture se coud toute seule, point par point, avec ma colère.",k:"Les nuits serrée contre elle. Elle me tenait si fort.",l:"La lucarne. Un rayon de lune. Le seul visiteur.",f:"Les années à attendre. Les saisons passent sur le toit.",g:"Le jour où le carton est monté au grenier."};
ROOM_KW.branette = {a:"peluche",b:"grenier",f:"oubliée"};
BOSS.branette = {id:354,n:"Ombre du grenier",self:true};
LEGEND_CARD.branette = "sourirecousu";
CLIENT_CARD.branette = "griffeombre";
CARDS.griffeombre = {n:"Griffe Ombre",c:1,t:"atk",dmg:6,draw:1,r:"client",i:"🧵",from:"branette"};
CARDS.sourirecousu = {n:"Le Sourire Cousu",c:1,t:"skill",block:10,thorns:3,retain:true,r:"legende",i:"🧵",from:"branette",d:"10 de Bouclier, Épines 3 (renvoie 3 dégâts à chaque attaque). Retenue. Le sourire était toujours là, dessous."};
