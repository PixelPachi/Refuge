// Saison 10 · Chapitre 5 « Le secret d'Hector » (fin du chapitre)
// Famille : l'Inachevé. On apprend ce qu'est devenue Lise, la fille d'Hector, et le maître de la Faille (Giratina) monte de la cave.
// Images Gemini à faire : voir GEMINI.md (décor générique en attendant).

// =====================================================================
// PTÉRA  (ptera)
// =====================================================================
CL.ptera = {
    season:10,from:1,id:142,n:"Ptéra",c:"#a898b8",family:"Inachevé",wound:"vol",likesEss:["feu"],comfort:["eau","grochampi","sitrus","craquiroc","the"],dislike:["soda","poudre","limonade"],tol:3,
    intro:"Un cri rauque, très ancien, fait trembler les vitres. Ptéra se pose sur le rebord de la fenêtre, trop grand, les ailes de pierre grise repliées n'importe comment. Il entre en se cognant partout, comme quelqu'un qui ne connaît pas les portes, et s'accroupit dans un coin, les yeux fous.",
    arrive:"<i>Sa voix est un grondement de caverne.</i> Où est la forêt ? Il y avait une forêt, ici. Des fougères plus hautes que les maisons. Et les miens, partout dans le ciel. Où sont les miens ? Pardon. Un verre. Je ne sais pas ce qu'on boit, maintenant.",
    hints:["Il regarde les maisons par la fenêtre comme on regarde des choses impossibles.","Sur son aile, une étiquette de musée est restée collée : « Spécimen n°142. Réanimé à partir d'un fragment d'ambre. »","Il sursaute à chaque bruit de moteur, de cloche, de voix. Tout est trop nouveau."],
    stages:[
      {req:0,t:"<i>Il fixe ses griffes.</i> Je volais au-dessus d'une forêt immense. Avec ma nuée. Des centaines, comme moi. Et puis un matin, un grand froid. Je me suis endormi dans la résine d'un arbre. Et je me suis réveillé dans une salle blanche, avec des humains qui applaudissaient.",kw:"ambre"},
      {req:2,t:"<i>Sa voix baisse.</i> Ils m'ont dit : « Félicitations, tu es le dernier de ton espèce. » Comme si c'était une bonne nouvelle. Ils ont mis une vitre devant moi. Les enfants tapaient dessus. Je ne comprenais rien. Je cherchais ma nuée dans le ciel du musée.",kw:"musée"},
      {req:3,t:"<i>Ses ailes tremblent.</i> Je n'ai pas fini ma vie. On me l'a coupée au milieu, et on me l'a rendue des millions d'années plus tard, sans personne dedans. Ma nuée, ma forêt, mon ciel. Je vole dans un monde qui n'est pas le mien. Je suis la fin d'une phrase dont personne ne connaît le début.",kw:"nuée"},
      {req:4,t:"<i>Il regarde enfin par la fenêtre, et il sourit, d'un sourire de pierre.</i> Les Roucool, dehors. Ils volent en nuée. Petits, bruyants, ridicules. Pas les miens. Mais ils volent ensemble. Peut-être que je peux voler à côté d'eux. Une vie interrompue, ça se continue. Autrement."}
    ],
    lie:{after:0,t:"<i>Il gonfle les ailes, menaçant.</i> Je n'ai besoin de personne. Je suis un prédateur. Le roi du ciel. Le seul. C'est très bien d'être le seul."},
    reform:{"ambre":"« Tu t'es endormi dans un monde, tu t'es réveillé dans un autre. Ce n'est pas ta faute. »","musée":"« Tu n'es pas un spécimen. Tu es quelqu'un. »","nuée":"« Ta nuée n'est plus là, mais ta vie, elle, continue. »"},
    essGood:"<i>Il boit d'un coup, et pousse un cri, très ancien, presque joyeux.</i> Ça… ça a le goût de la pluie sur les fougères.",
    essBad:"<i>Il recrache, les crocs sortis.</i> Ça pique ! Votre monde pique de partout !",
    frags:[{n:"La nuée au-dessus de la forêt de fougères",e:"nostalgie"},{n:"Les enfants qui tapent sur la vitre du musée",e:"peur"}],
    thanks:"<i>Il se lève, et ouvre ses ailes jusqu'aux deux murs.</i> Je vais aller voler avec les Roucool. Ils vont avoir très peur au début. Ensuite, peut-être, ils me laisseront voler à l'arrière de la nuée. Je leur raconterai la forêt. Comme ça, elle existera encore un peu, quelque part.",
    gift:{key:"ambre",n:"Vieil Ambre de Ptéra",i:"🟠",d:"Au début de chaque combat, le client gagne 3 d'Élan",fx:{combatStart(C){ C.elan=(C.elan||0)+3; }}},
    staff:{n:"Sentinelle du toit",d:"Les âmes de l'Inachevé arrivent avec 1 Tension de moins",wage:25},
    staffFx:{arrive(c,d){ if(d.family==="Inachevé") c.ten--; }},
    cogHint:"Tout est trop nouveau pour lui : rien de pétillant, rien d'acide. Une Gelée Ciel pour le ciel qu'il a perdu, et du simple, très ancien : Eau Fraîche, Gros Champi, Baie Sitrus.",
    map:mapStd({a:"La forêt de fougères",b:"La goutte d'ambre",h:"Le grand froid",c:"Le ciel d'autrefois",i:"La nuée qui vole ensemble",d:"Le nid dans la falaise",j:"La vitre du musée",k:"Les cris des siens",l:"Les Roucool au-dessus des toits",f:"Le réveil dans la salle blanche",g:"Le matin du grand froid"},{eb:"tristesse",eh:"peur",ej:"colere",ef:"peur",key:"nostalgie",foe:{id:141,n:"Kabutops"}})
};
TALK.ptera = [
    {t:"<i>Il observe la lampe de la taverne, fasciné.</i> Un petit soleil, enfermé dans du verre. Vous enfermez tout, vous, les humains. Les soleils. Les Ptéra."},
    {t:"<i>Il dévore un Gros Champi.</i> Ça, ça existait déjà. Enfin une chose qui n'a pas changé.",like:"grochampi"},
    {t:"<i>Il croque un Craquiroc, et le bruit le fait rire.</i> Ça craque comme les os de… Non. Rien. Je ne raconte pas ça à table.",like:"craquiroc"}
];
WIPE.ptera = ["<i>Il regarde ton torchon avec méfiance. Puis il tend une aile, et tu l'essuies aussi. Il se laisse faire.</i>","<i>Il compte les verres en grognant. Il ne sait pas compter. Il fait semblant.</i>"];
LETTERS.ptera = "« Les Roucool m'ont laissé voler derrière eux. Puis devant. Puis au milieu. Les petits me demandent l'histoire de la forêt tous les soirs. Ils l'appellent \"la forêt du grand-père\". Je ne suis pas leur grand-père. Je n'ai pas corrigé. — P. »";
REGULARS.ptera = {order:{base:"eau",add:["sitrus"]},
    line:"<i>Il se pose sur le toit, une nuée de Roucool autour de lui, et passe la tête par la fenêtre.</i> Bonjour. Une eau à la Baie Sitrus. Et des miettes pour eux. Ils ne me lâchent plus.",
    ok:"<i>Il boit, les Roucool perchés sur ses ailes.</i> Le musée m'a écrit. Ils veulent que je revienne, pour une exposition. J'ai dit oui. Mais sans vitre. Je raconterai la forêt aux enfants, moi-même.",
    ko:"<i>Il grogne, puis se reprend.</i> Pas ça. Mais je ne casse plus rien quand ce n'est pas ça. C'est un progrès."};
ROOM_SAY.ptera = {a:"La forêt. Des fougères plus hautes que tout. L'air est chaud et humide.",b:"Une goutte d'ambre. Je suis dedans. Je ne bouge plus.",h:"Le grand froid. Il descend du ciel. Tout s'arrête.",c:"Le ciel d'autrefois. Il n'y avait que nous dedans.",i:"Ma nuée. Des centaines d'ailes. Le bruit, comme un orage vivant.",d:"Le nid, dans la falaise. Il ne reste même pas la falaise.",j:"La vitre. Des mains qui tapent. Des yeux qui regardent.",k:"Les cris des miens. Je les entends encore, dans mes rêves.",l:"Des Roucool au-dessus des toits. Ridicules. Ensemble.",f:"La salle blanche. Les applaudissements. Personne de mon espèce.",g:"Le matin du grand froid, où ma vie s'est arrêtée au milieu."};
ROOM_KW.ptera = {b:"ambre",j:"musée",i:"nuée"};
BOSS.ptera = {id:142,n:"Ombre de la vie interrompue",self:true};
LEGEND_CARD.ptera = "derniernuee";
CLIENT_CARD.ptera = "attaqueciel";
CARDS.attaqueciel = {n:"Piqué Ancien",c:1,t:"atk",dmg:9,r:"client",i:"🟠",from:"ptera"};
CARDS.derniernuee = {n:"Voler avec la Nuée",c:2,t:"atk",dmg:6,hits:3,elan:2,r:"legende",i:"🟠",from:"ptera",d:"6 dégâts ×3, +2 Élan. Une vie interrompue, ça se continue."};

// =====================================================================
// JIRACHI  (jirachi)
// =====================================================================
CL.jirachi = {
    season:10,from:2,id:385,n:"Jirachi",c:"#f0e070",family:"Inachevé",wound:"psy",likesEss:["eau"],comfort:["lait","miel","pecha","coeursucre","muffin"],dislike:["liqueur","soda","poudre"],tol:2,
    quiet:true,
    intro:"Une étoile tombe dans la rue, juste devant la porte. Elle rebondit, roule sur le seuil, et se déplie : Jirachi, tout petit, les yeux encore lourds de sommeil, trois petits papiers accrochés aux pointes de son étoile. Il flotte jusqu'au comptoir en bâillant.",
    arrive:"<i>Une voix toute douce, encore ensommeillée.</i> Bonsoir… Je viens de me réveiller. Je dors mille ans, et je me réveille sept jours. Il me reste six jours. Est-ce que vous connaissez un petit garçon qui s'appelle Mathis ? Il avait huit ans, la dernière fois.",
    hints:["Sur un des trois papiers accrochés à sa tête, une écriture d'enfant, très effacée : « Je voudrais que… »","Il compte sur ses doigts, encore et encore, et son visage s'assombrit à chaque fois.","Il bâille sans arrêt, mais il refuse de fermer les yeux. Il a peur de se rendormir trop tôt."],
    stages:[
      {req:0,t:"<i>Il caresse un des papiers.</i> À chaque réveil, j'exauce les vœux qu'on écrit sur mes papiers. La dernière fois, un petit garçon m'a trouvé dans un champ. Mathis. On a joué pendant sept jours. Le septième soir, il a écrit son vœu. Mais je me suis endormi avant de le lire.",kw:"vœu"},
      {req:2,t:"<i>Il compte sur ses doigts.</i> Je lui avais promis : « Je le lirai à mon prochain réveil, et je l'exaucerai. » Il a dit « promis ? » J'ai dit « promis ». Il s'est endormi contre moi, dans l'herbe. Et moi aussi. Mille ans.",kw:"sommeil"},
      {req:3,t:"<i>Sa voix se brise.</i> Mille ans, vous comprenez ? Mathis est mort depuis neuf cent cinquante ans, au moins. Son vœu est là, sur ce papier, et l'encre a tellement pâli que je ne peux plus le lire. Je ne saurai jamais ce qu'il voulait. J'ai promis, et je ne peux pas tenir ma promesse. Je suis une étoile qui exauce les vœux, et je n'ai pas su exaucer le seul qui comptait.",kw:"promis"},
      {req:4,t:"<i>Il décroche le papier effacé, et le pose dans tes mains.</i> Je crois que je sais ce qu'il voulait. Il me l'a dit, le premier jour, avant même d'écrire : « Je voudrais un ami. » Je ne pouvais pas l'exaucer avec un papier. Je l'avais déjà exaucé, en jouant avec lui. Pendant sept jours."}
    ],
    lie:{after:0,t:"<i>Il bâille très fort.</i> Ce n'est rien, je cherche juste quelqu'un. Pas grave. Je peux me rendormir et oublier. C'est pratique, mille ans, pour oublier."},
    reform:{"vœu":"« Tu ne l'as pas lu, mais tu l'as vécu avec lui. »","sommeil":"« Tu t'es endormi contre lui. Il n'était pas seul, cette nuit-là. »","promis":"« Tu as tenu parole. Mille ans, tu as gardé son papier. »"},
    essGood:"<i>Il boit, et son étoile brille d'un coup, toute dorée.</i> Oh… Je suis réveillé. Vraiment réveillé. Merci.",
    essBad:"<i>Il bâille, et ses yeux se ferment à moitié.</i> Trop… je vais m'endormir… non, non, pas maintenant !",
    frags:[{n:"Sept jours à jouer dans un champ avec Mathis",e:"joie"},{n:"Le petit garçon endormi contre lui, le septième soir",e:"nostalgie"}],
    thanks:"<i>Il flotte jusqu'à la porte, et accroche un papier neuf à son étoile.</i> Il me reste cinq jours. Je vais jouer avec les enfants de Bourg-Brume, tous les jours, jusqu'au bout. Et le dernier soir, je leur dirai la vérité : le vœu, ce n'est pas le papier. C'est les sept jours.",
    gift:{key:"etoile",n:"Papier à Vœux de Jirachi",i:"⭐",d:"Une fois par combat, quand le client tomberait à 0 PV, il garde 1 PV et récupère 10 PV",fx:{combatStart(C){ C.wish=true; }}},
    staff:{n:"Petite étoile",d:"Chaque nuit, la première âme arrive avec +1 Ouverture",wage:15},
    staffFx:{arrive(c){ if(U.night && U.night.idx===0) c.ouv++; }},
    cogHint:"Il est tout petit et à moitié endormi : surtout rien de fort. Une Gelée Rose, et du très doux : Lait Meumeu, Miel, Baie Pêcha.",
    map:mapStd({a:"Le champ sous les étoiles",b:"Les trois papiers",h:"Mille ans de sommeil",c:"Le ciel où il dort",i:"Les sept jours à jouer",d:"Le creux d'herbe tiède",j:"L'encre qui pâlit",k:"« Promis ? » « Promis. »",l:"Les enfants de Bourg-Brume",f:"Le réveil, mille ans plus tard",g:"Le septième soir"},{eb:"tristesse",eh:"peur",ej:"tristesse",ef:"tristesse",key:"joie"})
};
TALK.jirachi = [
    {t:"<i>Il regarde ton acolyte, la tête penchée.</i> Toi aussi, tu as l'air de quelqu'un qui a exaucé un vœu sans le savoir. Tu restes à côté de lui tous les soirs. C'est déjà un vœu, ça."},
    {t:"<i>Il boit le Lait Meumeu, les deux mains autour du verre.</i> Mathis m'avait apporté du lait, le troisième jour. Il l'avait volé à sa maman. On l'avait partagé.",like:"lait"},
    {t:"<i>Il croque le Muffin du Matin, et ses yeux se ferment de bonheur.</i> C'est le goût d'un réveil. Je ne savais pas que ça existait, un goût de réveil.",like:"muffin"}
];
WIPE.jirachi = ["<i>Il flotte au-dessus du comptoir et souffle doucement sur les verres. Ils brillent un instant, comme des étoiles.</i>","<i>Il bâille, et s'appuie contre ton épaule. Il ne dort pas. Il se repose.</i>"];
LETTERS.jirachi = "« Ce soir, c'est mon septième soir. Les enfants de Bourg-Brume ont écrit cent vœux sur cent papiers. Je ne vais pas les lire. Je vais les garder pour mon prochain réveil, et je saurai, à ce moment-là, qu'ils ont déjà été exaucés. Bonne nuit, tavernier. À dans mille ans. — J. »";
REGULARS.jirachi = {order:{base:"lait",add:["miel"]},
    line:"<i>Il flotte par la fenêtre, une ribambelle d'enfants derrière lui.</i> Bonjour ! Un lait au miel. Vite, vite, il me reste quatre jours, et j'ai promis une partie de cache-cache.",
    ok:"<i>Il boit d'un trait.</i> Une petite fille m'a demandé ce que je voudrais, moi, si on exauçait mes vœux. Je n'avais jamais réfléchi. J'ai dit : ne plus jamais me réveiller seul. Elle a promis d'être là. Dans mille ans. Je l'ai crue.",
    ko:"<i>Il sourit, la moustache de lait.</i> Ce n'est pas tout à fait ça. Mais je n'ai pas le temps d'être déçu. Quatre jours !"};
ROOM_SAY.jirachi = {a:"Le champ, sous les étoiles. C'est ici qu'il m'a trouvé.",b:"Mes trois papiers. Un vœu sur chacun. Un seul compte.",h:"Mille ans de sommeil. Le noir, et rien d'autre.",c:"Le ciel où je dors, entre deux réveils. Si loin.",i:"Sept jours à jouer. Cache-cache, ricochets, histoires.",d:"Un creux d'herbe tiède. On s'y couchait pour regarder les nuages.",j:"L'encre pâlit, siècle après siècle. Les mots s'en vont.",k:"« Promis ? » « Promis. » Il s'endort contre moi.",l:"Des enfants qui rient. Il me reste des jours.",f:"Je me réveille. Mille ans ont passé. Il n'est plus là.",g:"Le septième soir, où je me suis endormi avant de lire."};
ROOM_KW.jirachi = {b:"vœu",h:"sommeil",k:"promis"};
BOSS.jirachi = {id:385,n:"Ombre des mille ans",self:true};
LEGEND_CARD.jirachi = "septjours";
CLIENT_CARD.jirachi = "voeu";
CARDS.voeu = {n:"Vœu",c:1,t:"skill",heal:5,blockNext:6,draw:1,r:"client",i:"⭐",from:"jirachi",d:"Soigne 5 PV, 6 de Bouclier au prochain tour, pioche 1."};
CARDS.septjours = {n:"Les Sept Jours",c:1,t:"skill",heal:10,block:7,draw:1,retain:true,r:"legende",i:"⭐",from:"jirachi",d:"Soigne 10 PV, 7 de Bouclier, pioche 1. Retenue. Le vœu, ce n'est pas le papier."};

// =====================================================================
// NOCTALI  (noctali)
// =====================================================================
CL.noctali = {
    season:10,from:3,id:197,n:"Noctali",c:"#404858",family:"Inachevé",wound:"normal",likesEss:["psy"],comfort:["the","miel","mago","sable","jusbaie"],dislike:["soda","limonade","superbonbon"],tol:3,
    intro:"La lune passe derrière un nuage, et quand elle revient, Noctali est assis sur le tabouret le plus sombre, les anneaux jaunes de son corps luisant doucement. Il tient entre ses dents un vieux pinceau, la pointe sèche et dure. Il le pose sur le comptoir avec un soin infini.",
    arrive:"<i>Sa voix est calme, très basse.</i> Bonsoir. Ne vous inquiétez pas pour le pinceau. Il ne peindra plus. Je l'emmène partout, c'est tout. Quelque chose de sombre, s'il vous plaît. Comme la nuit.",
    hints:["Ses anneaux jaunes clignotent faiblement quand il regarde le pinceau, comme un cœur qui bat.","Il a de la peinture séchée sur une oreille, bleu nuit. Il ne l'a jamais lavée.","Il fixe le mur blanc de la taverne comme s'il y voyait un tableau que personne d'autre ne voit."],
    stages:[
      {req:0,t:"<i>Il pousse le pinceau du bout du museau.</i> Il appartenait à Augustin. Un peintre. Il peignait la nuit, parce que la lumière de la lune, disait-il, ne ment pas. Moi, j'étais son Évoli. Je suis devenu Noctali en restant éveillé avec lui, nuit après nuit, au clair de lune.",kw:"pinceau"},
      {req:2,t:"<i>Ses anneaux brillent.</i> Pendant des années, il m'a peint. Le portrait de sa vie. Moi, assis sous la lune, sur le toit de l'atelier. Il le reprenait chaque nuit, il ajoutait une étoile, il effaçait une ombre. Il disait : « Quand il sera fini, ce sera le plus beau tableau du monde. »",kw:"toile"},
      {req:3,t:"<i>Sa voix tremble enfin.</i> Il est mort une nuit de pleine lune, le pinceau à la main. Le tableau n'était pas fini. Il manque un coin de ciel, en haut à gauche. Juste un coin. On l'a vendu à un marchand, pas fini. Je ne sais pas où il est. Je pense à ce coin vide toutes les nuits. Comme si un morceau de lui manquait au monde.",kw:"lune"},
      {req:4,t:"<i>Il prend le pinceau entre ses dents, et le trempe dans ton thé noir, et trace un petit croissant de lune sur un sous-verre.</i> Voilà. Il manquait ça. Pas sur le tableau. Ici. Augustin disait que la lune ne ment pas. Elle dit que c'est fini, quand on décide que c'est fini."}
    ],
    lie:{after:0,t:"<i>Il hausse les épaules, impassible.</i> C'est juste un vieux pinceau. Je ne suis pas du genre à m'attacher. Les Noctali ne s'attachent pas."},
    reform:{"pinceau":"« Tu as veillé avec lui chaque nuit. Tu fais partie du tableau. »","toile":"« Le plus beau tableau du monde, c'était peut-être vos nuits ensemble. »","lune":"« Un coin vide, ce n'est pas un tableau raté. C'est une place pour la suite. »"},
    essGood:"<i>Il boit, et ses anneaux brillent d'un jaune doux, comme une lune pleine.</i> C'est juste. Comme une nuit sans nuage.",
    essBad:"<i>Ses anneaux s'éteignent.</i> Trop clair. Trop fort. Ça éblouit.",
    frags:[{n:"Les nuits sur le toit de l'atelier, sous la lune",e:"nostalgie"},{n:"Augustin qui ajoute une étoile au tableau",e:"joie"}],
    thanks:"<i>Il se lève, le pinceau entre les dents, et laisse le sous-verre au croissant de lune sur le comptoir.</i> Il y a une jeune Queulorior sur la place, qui peint les passants pour trois sous. Elle ne sait pas peindre la nuit. Je vais lui apprendre. Je n'ai pas de mains, mais j'ai regardé pendant des années.",
    gift:{key:"pinceau",n:"Pinceau d'Augustin",i:"🖌️",d:"Au début de chaque combat, l'ombre est Faible 2",fx:{combatStart(C,en){ en.weak+=2; }}},
    staff:{n:"Veilleur de nuit",d:"+1 échange avec chaque âme",wage:20},
    staffFx:{arrive(c){ c.turns++; }},
    cogHint:"Il est calme et digne, il aime ce qui est sombre et simple. Une Gelée Blanche, et du thé noir : Thé de Safrania, Miel, Baie Mago.",
    map:mapStd({a:"L'atelier au clair de lune",b:"Le pinceau sec",h:"La nuit sans lui",c:"Le toit de l'atelier",i:"L'étoile ajoutée chaque nuit",d:"Le coussin près du chevalet",j:"Le marchand qui emporte la toile",k:"Augustin qui peint en silence",l:"La jeune Queulorior sur la place",f:"La nuit de pleine lune où il est parti",g:"Le coin de ciel qui manque"},{eb:"tristesse",eh:"peur",ej:"colere",ef:"tristesse",key:"nostalgie",foe:{id:235,n:"Queulorior"}})
};
TALK.noctali = [
    {t:"<i>Il regarde la lune par la fenêtre, longtemps.</i> Ce soir, elle est un peu jaune. Augustin aurait mélangé de l'ocre et du blanc de zinc. Une pointe de bleu, dans l'ombre."},
    {t:"<i>Il boit son thé lentement.</i> Augustin en buvait des litres, pour rester éveillé. Il en renversait sur ses toiles. Il disait que ça donnait une patine.",like:"the"},
    {t:"<i>Il grignote un Sablé au Beurre.</i> Il mangeait ça au petit matin, quand il posait le pinceau. On partageait. Il me laissait les miettes avec le plus de beurre.",like:"sable"}
];
WIPE.noctali = ["<i>Il regarde la lumière jouer sur les verres que tu essuies, et hoche la tête, comme un peintre devant un reflet réussi.</i>","<i>Il te regarde en silence. Ses anneaux brillent doucement. C'est sa façon de dire merci.</i>"];
LETTERS.noctali = "« La jeune Queulorior sait peindre la nuit, maintenant. Elle a fait mon portrait sous la lune, sur le toit de la mairie. Elle a laissé un coin vide, en haut à gauche. Je lui ai demandé pourquoi. Elle a dit : \"Pour quelqu'un.\" — N. »";
REGULARS.noctali = {order:{base:"the",add:["mago"]},
    line:"<i>Il entre sans bruit, de la peinture fraîche sur les pattes.</i> Bonsoir. Un thé à la Baie Mago. Je sors de l'atelier de la petite. Elle a peint toute la nuit. Moi aussi, à ma façon.",
    ok:"<i>Il boit, les anneaux tranquilles.</i> Le marchand d'art du port a retrouvé le tableau d'Augustin. Il veut me le rendre. J'ai dit non. Qu'il reste là où il est. Avec son coin vide. C'est très bien, un coin vide.",
    ko:"<i>Il penche la tête.</i> Pas tout à fait juste. Mais Augustin disait qu'un trait raté fait partie du tableau."};
ROOM_SAY.noctali = {a:"L'atelier, la nuit. L'odeur de la térébenthine et du thé froid.",b:"Le pinceau. Sec, depuis des années. Je ne l'ai jamais lavé.",h:"La nuit, sans lui. La lune éclaire une chaise vide.",c:"Le toit de l'atelier. Je posais ici. Il peignait là.",i:"Une étoile de plus sur la toile. Il souriait à chaque fois.",d:"Mon coussin, près du chevalet. J'y dormais à l'aube.",j:"Un marchand emporte la toile sous son bras. Pas finie.",k:"Il peint en silence. Le pinceau gratte. La lune monte.",l:"Une jeune Queulorior sur la place. Elle ne sait pas peindre la nuit. Pas encore.",f:"La nuit de pleine lune où il s'est endormi, le pinceau à la main.",g:"Le coin de ciel qui manque, en haut à gauche."};
ROOM_KW.noctali = {b:"pinceau",j:"toile",f:"lune"};
BOSS.noctali = {id:197,n:"Ombre du tableau inachevé",self:true};
LEGEND_CARD.noctali = "coindeciel";
CLIENT_CARD.noctali = "feinte";
CARDS.feinte = {n:"Feinte Lunaire",c:1,t:"atk",dmg:6,weak:1,draw:1,r:"client",i:"🖌️",from:"noctali",d:"6 dégâts, l'ombre est Faible 1, pioche 1."};
CARDS.coindeciel = {n:"Le Coin de Ciel",c:1,t:"skill",block:9,weak:2,vuln:1,retain:true,r:"legende",i:"🖌️",from:"noctali",d:"9 de Bouclier, l'ombre est Faible 2 et Vulnérable 1. Retenue. C'est fini quand on décide que c'est fini."};

// =====================================================================
// GIRATINA — Grand Regret du chapitre 5 (finale de la saison 10)
// =====================================================================
CARDS.rubanlise = {n:"Le Ruban de Lise",c:1,t:"skill",heal:12,block:12,str:2,draw:2,retain:true,r:"legende",i:"🎀",from:"giratina",d:"Soigne 12 PV, 12 de Bouclier, +2 Force, pioche 2. Retenue. Il n'est jamais trop tard pour revenir."};
