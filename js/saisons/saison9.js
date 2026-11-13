// Saison 9 · Chapitre 5 « Le secret d'Hector »
// Famille de blessure du chapitre : l'Inachevé (une promesse non tenue, une attente qui n'a jamais fini).
// Fil rouge : Hector se souvient de sa vie, au début de la saison et après le Grand Écho (voir js/11-saison.js).
// Images Gemini à faire : voir GEMINI.md (décor générique en attendant).

// =====================================================================
// DRACOLOSSE  (dracolosse)
// =====================================================================
CL.dracolosse = {
    season:9,from:1,id:149,n:"Dracolosse",c:"#e8a048",family:"Inachevé",wound:"vol",likesEss:["normal"],comfort:["the","miel","sitrus","craquiroc","grochampi"],dislike:["soda","poudre","superbonbon"],tol:3,
    intro:"Un grand Dracolosse se pose devant la porte dans un souffle de vent. Il porte en bandoulière une vieille sacoche de facteur, en cuir craquelé, qu'il serre contre lui. Il entre en baissant la tête sous le linteau, et s'assoit sans lâcher la sacoche.",
    arrive:"<i>Il sourit, d'un grand sourire triste.</i> Bonsoir. J'ai fait le tour du monde en une nuit, des centaines de fois. Mais il y a une adresse que je n'ai jamais trouvée. Un thé, s'il vous plaît. Bien chaud. Il fait froid, là-haut.",
    hints:["Il ne lâche jamais la sacoche. Même pour boire, il la garde coincée sous son aile.","Par l'ouverture de la sacoche, on voit dépasser une seule enveloppe, jaunie, avec un timbre très ancien.","Il regarde chaque fois la plaque de la rue, au-dessus de la porte, comme s'il vérifiait une adresse."],
    stages:[
      {req:0,t:"<i>Il tapote la sacoche.</i> J'étais le facteur des mers, autrefois. On me confiait les lettres que personne d'autre ne pouvait porter : de l'autre côté des océans, au fond des tempêtes. Je n'en ai jamais perdu une. Sauf une.",kw:"lettre"},
      {req:2,t:"<i>Il sort l'enveloppe jaunie, sans l'ouvrir.</i> Un vieux marin me l'a donnée, sur le port, le soir de son dernier voyage. « Pour ma fille. Dis-lui que je regrette. » L'adresse était effacée par l'eau de mer. Il ne restait qu'un nom de ville : Bourg-Brume.",kw:"adresse"},
      {req:3,t:"<i>Sa voix tremble.</i> J'ai cherché pendant quarante ans. Toutes les portes de Bourg-Brume. Personne ne connaissait la fille du marin. Le marin est mort en mer. Et moi, je porte sa lettre depuis. Un facteur qui n'a pas livré, ce n'est plus un facteur. C'est juste quelqu'un qui porte un poids.",kw:"promesse"},
      {req:4,t:"<i>Il pose l'enveloppe sur le comptoir, doucement.</i> Peut-être que je ne la trouverai jamais. Mais j'ai porté ces mots pendant quarante ans, et je les connais par cœur, sans les avoir lus. « Je regrette. » Ça, je peux le dire à quelqu'un. Je crois que c'est ça, livrer."}
    ],
    lie:{after:0,t:"<i>Il rit, trop fort.</i> Oh, je suis à la retraite ! Plus de courrier, plus de tempêtes. Je vole pour le plaisir, maintenant. Rien d'autre."},
    reform:{"lettre":"« En quarante ans, tu n'as jamais lâché ces mots. C'est ça, être facteur. »","adresse":"« L'adresse s'est effacée, mais pas la personne. Elle existe quelque part. »","promesse":"« Tu as tenu ta promesse chaque jour où tu as continué à chercher. »"},
    essGood:"<i>Il boit, et ses ailes se détendent.</i> Ah… Comme une escale. Un port, après la tempête.",
    essBad:"<i>Il grimace.</i> Trop fort. Je dois voler droit, moi. Toujours.",
    frags:[{n:"Le vieux marin sur le port, qui lui tend l'enveloppe",e:"nostalgie"},{n:"La première lettre livrée de l'autre côté de l'océan",e:"joie"}],
    thanks:"<i>Il se lève, et laisse l'enveloppe sur le comptoir.</i> Gardez-la, tavernier. Ici, tout le monde passe un jour. Si une vieille dame entre, un soir, et qu'elle a les yeux d'un marin… vous saurez quoi lui donner. Moi, je vais livrer autre chose : des cartes postales. Des choses légères. Pour réapprendre.",
    gift:{key:"sacoche",n:"Sacoche de Dracolosse",i:"✉️",d:"Au début de chaque combat, le client pioche 1 carte et gagne 1 de Force",fx:{draw(C){ return C.turn===1?1:0; },combatStart(C){ C.str+=1; }}},
    staff:{n:"Facteur de la taverne",d:"Les âmes de l'Inachevé arrivent avec +1 Ouverture",wage:25},
    staffFx:{arrive(c,d){ if(d.family==="Inachevé") c.ouv++; }},
    cogHint:"Il est fort et doux à la fois, et il a besoin de se poser. Une Gelée Ciel pour celui qui a trop volé, et du chaud : Thé de Safrania, Miel, Craquiroc.",
    map:mapStd({a:"Le port au crépuscule",b:"La sacoche de cuir",h:"La tempête au-dessus des mers",c:"Les toits de Bourg-Brume",i:"La première lettre livrée",d:"Le phare où il se reposait",j:"Les portes qui se ferment",k:"Le vieux marin sur le quai",l:"Les cartes postales légères",f:"Les quarante ans à chercher",g:"Le soir où l'adresse s'est effacée"},{eb:"tristesse",eh:"peur",ej:"tristesse",ef:"tristesse",key:"nostalgie"})
};
TALK.dracolosse = [
    {t:"<i>Il regarde par la fenêtre, vers la mer qu'on ne voit pas.</i> Vous savez combien il y a de boîtes aux lettres dans le monde ? Moi oui. Je les ai toutes vues. La plus belle est à Bourg-Brume, devant la fontaine. Elle est rouillée. Elle est parfaite."},
    {t:"<i>Il boit son thé à petites gorgées.</i> Les marins m'en offraient, sur les quais. Toujours trop sucré. Je n'ai jamais osé leur dire.",like:"the"},
    {t:"<i>Il croque un Craquiroc, ravi.</i> Ça craque comme le pont d'un bateau. J'adore.",like:"craquiroc"}
];
WIPE.dracolosse = ["<i>Il trie les sous-verres par couleur pendant que tu essuies. Vieux réflexe de facteur.</i>","<i>Il fredonne une chanson de marin, très bas. Il connaît toutes les paroles.</i>"];
LETTERS.dracolosse = "« Une carte postale, pour changer. Au recto, le phare du cap. Au verso, ces mots : il fait beau, je vole moins vite, je regarde plus. Gardez bien la lettre du marin. — D. »";
REGULARS.dracolosse = {order:{base:"the",add:["miel"]},
    line:"<i>Il se pose devant la porte, une pile de cartes postales sous l'aile.</i> Bonjour, tavernier ! Un thé au miel. J'ai du courrier pour la moitié de la rue, et rien de lourd. C'est merveilleux, le courrier léger.",
    ok:"<i>Il boit en lisant les adresses.</i> Les enfants du village me guettent, maintenant. Ils m'écrivent des lettres, juste pour me voir passer. Je les livre toutes. Même celles adressées « au ciel ».",
    ko:"<i>Il sourit quand même.</i> Pas tout à fait. Mais un facteur boit ce qu'on lui offre. C'est la règle."};
ROOM_SAY.dracolosse = {a:"Le port. Le soleil se couche. C'est ici que tout a commencé.",b:"Ma sacoche. Vide, sauf une enveloppe. Elle pèse plus lourd que toutes les autres.",h:"La tempête. Je l'ai traversée cent fois. Celle-ci ne finit jamais.",c:"Les toits de Bourg-Brume. J'ai frappé à chaque porte. À chacune.",i:"Ma première lettre livrée. Une grand-mère a pleuré de joie. J'ai su que c'était mon métier.",d:"Le phare. Je m'y reposais entre deux océans.",j:"Des portes qui se ferment. « Connais pas. » « Connais pas. »",k:"Le vieux marin. « Dis-lui que je regrette. » Ses mains tremblaient.",l:"Des cartes postales. Légères. Joyeuses.",f:"Quarante ans. Quarante hivers à chercher.",g:"Le soir où l'eau de mer a effacé l'adresse."};
ROOM_KW.dracolosse = {b:"lettre",c:"adresse",k:"promesse"};
BOSS.dracolosse = {id:149,n:"Ombre de la lettre perdue",self:true};
LEGEND_CARD.dracolosse = "lettrelivree";
CLIENT_CARD.dracolosse = "ouragan";
CARDS.ouragan = {n:"Vol Postal",c:1,t:"atk",dmg:6,draw:1,r:"client",i:"✉️",from:"dracolosse"};
CARDS.lettrelivree = {n:"La Lettre Livrée",c:1,t:"skill",heal:8,str:2,draw:2,r:"legende",i:"✉️",from:"dracolosse",d:"Soigne 8 PV, +2 Force, pioche 2. « Je regrette. » Enfin dit à quelqu'un."};

// =====================================================================
// SPIRITOMB  (spiritomb)
// =====================================================================
CL.spiritomb = {
    season:9,from:2,id:442,n:"Spiritomb",c:"#6a5a9a",family:"Inachevé",wound:"psy",likesEss:["eau"],comfort:["lait","pecha","miel","eaumystique","coeursucre"],dislike:["liqueur","soda","limonade"],tol:2,
    quiet:true,
    intro:"Personne n'a ouvert la porte. Pourtant, une vieille pierre fendue est posée sur le tabouret du fond, et un tourbillon violet en sort, plein de visages qui murmurent tous en même temps. Spiritomb. Cent huit âmes liées à une pierre. Les bougies baissent toutes d'un coup.",
    arrive:"<i>Les voix parlent ensemble, puis une seule se détache, plus claire, presque une enfant.</i> …On ne fait pas peur exprès. On voulait juste un endroit chaud. Les autres ont froid. Moi aussi. Un verre doux, s'il te plaît. Pour nous tous.",
    hints:["Parmi les cent huit visages, une petite voix revient sans cesse, plus claire que les autres, comme si elle essayait de parler pour tous.","La pierre fendue porte une inscription effacée. On devine seulement : « … la promesse … ».","Quand quelqu'un rit dans la salle, tous les visages se tournent vers lui, affamés de chaleur."],
    stages:[
      {req:0,t:"<i>La petite voix, au milieu des autres.</i> On est cent huit. Cent huit âmes qui avaient fait une promesse et ne l'ont pas tenue. La pierre nous a attrapées, une par une, au fil des siècles. On ne se connaît pas. On partage juste la même pierre, et le même froid.",kw:"pierre"},
      {req:2,t:"<i>Les voix se taisent, une à une, pour la laisser parler.</i> Moi, j'avais promis à mon petit frère de revenir le chercher à la fête. Je me suis perdue dans la foule. Quand je suis revenue, il était parti avec une autre famille, loin. Je ne l'ai jamais retrouvé. Je suis morte vieille, en le cherchant encore.",kw:"promesse"},
      {req:3,t:"<i>Le tourbillon tremble.</i> Les autres ont toutes une histoire pareille. Un rendez-vous manqué. Un pardon pas dit. Une lettre pas envoyée. On croit que si on nous libère, on disparaîtra. Alors on reste. Ensemble, mais chacune seule avec sa promesse. C'est ça, le froid.",kw:"froid"},
      {req:4,t:"<i>Tous les visages sourient en même temps, et la petite voix rit.</i> Tu sais ce qu'on vient de comprendre ? On a toutes raté une promesse. Mais on en a tenu une, sans le savoir : on ne s'est jamais laissées seules. Cent huit, depuis des siècles. Ça compte, non ?"}
    ],
    lie:{after:0,t:"<i>Toutes les voix ensemble, très fort.</i> On n'a besoin de personne ! On est cent huit ! On ne sera jamais seules !"},
    reform:{"pierre":"« Vous êtes cent huit histoires. Pas une pierre. »","promesse":"« Tu l'as cherché toute ta vie. C'est ça, tenir parole. »","froid":"« Le froid part quand on se le dit. Dites-le-vous. »"},
    essGood:"<i>Le tourbillon se calme, et les cent huit visages ferment les yeux en même temps.</i> …C'est chaud. Pour toutes. Ça n'était jamais arrivé.",
    essBad:"<i>Les voix crient, toutes ensemble, et la pierre se fend un peu plus.</i> Trop ! Trop ! Les petites ont peur !",
    frags:[{n:"La main du petit frère, lâchée dans la foule de la fête",e:"tristesse"},{n:"Cent huit voix qui rient ensemble pour la première fois",e:"joie"}],
    thanks:"<i>La pierre se lève toute seule, légère.</i> On ne part pas, tavernier. On reste ensemble. Mais on va se raconter nos promesses, chaque nuit, une par une. Il y en a cent huit. Ça va prendre du temps. Et quand on aura fini… peut-être qu'on n'aura plus froid du tout.",
    gift:{key:"pierreclef",n:"Clé de Voûte de Spiritomb",i:"🪨",d:"Au début de chaque combat, l'ombre est Faible 1 et Vulnérable 1",fx:{combatStart(C,en){ en.weak+=1; en.vuln+=1; }}},
    staff:{n:"Cent huit oreilles",d:"Les âmes silencieuses arrivent avec +1 Ouverture",wage:15},
    staffFx:{arrive(c,d){ if(d.quiet) c.ouv++; }},
    cogHint:"Elles sont cent huit et elles ont froid : rien de piquant, rien de fort. Une Gelée Rose, et du très doux : Lait Meumeu, Baie Pêcha, Eau Mystique.",
    map:mapStd({a:"La pierre fendue",b:"Les cent huit visages",h:"Le froid entre les âmes",c:"La foule de la fête d'autrefois",i:"Les cent huit qui rient",d:"Le creux de la pierre",j:"La main lâchée",k:"Le petit frère",l:"Les histoires racontées une à une",f:"Une vie à chercher",g:"Le soir de la promesse manquée"},{eb:"tristesse",eh:"peur",ej:"tristesse",ef:"peur",key:"joie",foe:{id:92,n:"Fantominus"}})
};
TALK.spiritomb = [
    {t:"<i>Une voix d'homme, grave, se détache un instant.</i> J'avais promis de réparer le toit avant l'hiver. <i>Une autre, aiguë :</i> J'avais promis d'écrire. <i>La petite voix :</i> Chut, vous tous. C'est mon tour de parler."},
    {t:"<i>Le Lait Meumeu se vide tout seul, gorgée par gorgée, cent huit fois.</i> Chacune a eu une goutte. Il en faut si peu.",like:"lait"},
    {t:"<i>Les visages se penchent sur l'Eau Mystique.</i> Ça sent le large. Il y a un marin, parmi nous. Il pleure. Pas de tristesse.",like:"eaumystique"}
];
WIPE.spiritomb = ["<i>Cent huit visages suivent ton torchon des yeux. C'est un peu inquiétant. C'est aussi un peu touchant.</i>","<i>La petite voix compte les verres à voix haute. Les autres corrigent quand elle se trompe.</i>"];
LETTERS.spiritomb = "« Promesse n°37 : un vieux jardinier qui avait promis de planter un arbre. On a planté un gland devant la pierre. Promesse n°38 : une fille qui avait promis de chanter au mariage de sa sœur. On a chanté. Mal. Il reste soixante-dix. — Les cent huit »";
REGULARS.spiritomb = {order:{base:"lait",add:["pecha"]},
    line:"<i>La pierre est déjà sur le tabouret quand tu ouvres. Les visages font tous coucou.</i> Bonjour ! Un lait à la Baie Pêcha. Avec cent huit pailles. Non, on rigole. Une seule. On partage.",
    ok:"<i>Le tourbillon tourne doucement.</i> Promesse n°61 cette nuit : une vieille dame qui avait promis de pardonner. Elle l'a fait. Elle est partie, après. Pas disparue. Partie. On était contentes pour elle.",
    ko:"<i>Quelques visages font la moue, les autres disent merci.</i> Pas tout à fait. Mais on est cent huit, il y en a toujours une qui aime."};
ROOM_SAY.spiritomb = {a:"La pierre. Fendue. C'est notre maison. Notre prison.",b:"Cent huit visages. On ne se connaît pas. On partage tout.",h:"Le froid. Entre chacune de nous. Personne ne parle de sa promesse.",c:"La foule de la fête, autrefois. Les lampions. Le bruit. Je le tenais par la main.",i:"Cent huit voix qui rient. Ensemble. Enfin.",d:"Le creux de la pierre. On s'y blottit, toutes.",j:"Sa main glisse de la mienne. La foule l'emporte.",k:"Mon petit frère. Il avait un bonnet rouge. Je me souviens du bonnet.",l:"Une histoire par nuit. Il y en a cent huit.",f:"Une vie entière à chercher un bonnet rouge.",g:"Le soir où j'ai promis de revenir le chercher."};
ROOM_KW.spiritomb = {a:"pierre",j:"promesse",h:"froid"};
BOSS.spiritomb = {id:442,n:"Ombre des cent huit promesses",self:true};
LEGEND_CARD.spiritomb = "centhuit";
CLIENT_CARD.spiritomb = "malediction";
CARDS.malediction = {n:"Vibra Sombre",c:1,t:"atk",dmg:5,vuln:1,r:"client",i:"🪨",from:"spiritomb",d:"5 dégâts, l'ombre est Vulnérable 1."};
CARDS.centhuit = {n:"Les Cent Huit",c:2,t:"atk",dmg:3,hits:4,block:6,r:"legende",i:"🪨",from:"spiritomb",d:"3 dégâts ×4, 6 de Bouclier. On ne s'est jamais laissées seules."};

// =====================================================================
// MUCIOLE  (muciole)
// =====================================================================
CL.muciole = {
    season:9,from:3,id:313,n:"Muciole",c:"#d8e060",family:"Inachevé",wound:"normal",likesEss:["feu"],comfort:["jusbaie","miel","pommesucree","coeursucre","malasada"],dislike:["liqueur","poudre","soda"],tol:2,
    intro:"Une petite lumière jaune danse devant la fenêtre, s'éteint, se rallume, s'éteint. Puis Muciole entre, la queue qui clignote faiblement. Il s'installe près de la bougie, face à la porte, et surveille l'entrée comme on attend un rendez-vous.",
    arrive:"<i>Il se redresse dès que la porte grince, puis se rassoit, déçu.</i> Pardon. Je croyais… Non. Rien. Bonsoir. Un verre, n'importe lequel. Je ne reste pas longtemps. Enfin, je dis ça tous les soirs.",
    hints:["Sa queue clignote toujours le même motif : trois longs, deux courts. Comme un message.","Il a posé sur la table une petite fleur séchée, et il la tourne vers la porte.","Chaque fois qu'une lueur passe dans la rue, il se penche, puis se rassoit."],
    stages:[
      {req:0,t:"<i>Sa queue clignote, trois longs, deux courts.</i> C'est notre signal. À Lumivole et moi. Les soirs d'été, on dansait au-dessus de l'étang, et nos lumières dessinaient des choses dans le ciel. Des étoiles, des cœurs, des mots. Le soir de la grande danse, je devais lui demander de rester avec moi pour toujours.",kw:"danse"},
      {req:2,t:"<i>Il tourne la fleur séchée.</i> J'avais cueilli cette fleur pour elle. J'ai attendu sur l'étang, toute la nuit. Elle n'est pas venue. Au matin, j'ai cru qu'elle ne voulait pas de moi. Je suis parti sans chercher à savoir. Je clignote ce signal tous les soirs depuis, au cas où.",kw:"fleur"},
      {req:3,t:"<i>Sa lumière faiblit.</i> J'ai appris, bien plus tard, qu'elle était tombée malade ce soir-là. Elle m'a attendu, elle aussi, chez elle, en croyant que c'était moi qui n'étais pas venu la chercher. Quand je l'ai su, elle était partie. On s'est attendus, chacun de notre côté. On ne s'est jamais rien dit.",kw:"attente"},
      {req:4,t:"<i>Sa queue s'allume, franchement, et dessine un cœur au-dessus de la bougie.</i> On s'est attendus, tous les deux. C'est triste. Mais ça veut dire qu'elle voulait venir. Elle voulait. Je l'ai attendue pour rien pendant des années… sauf que non. Pas pour rien."}
    ],
    lie:{after:0,t:"<i>Il hausse les épaules, la lumière éteinte.</i> Je n'attends personne. Je clignote, c'est tout. C'est un tic. Les Muciole clignotent."},
    reform:{"danse":"« Ce soir-là, tu allais dire quelque chose de beau. Ça reste vrai. »","fleur":"« Tu l'as gardée tout ce temps. Elle aurait aimé la voir. »","attente":"« Vous vous êtes attendus. Ça veut dire que vous vous aimiez. »"},
    essGood:"<i>Il boit, et sa lumière s'allume d'un coup, chaude, dorée.</i> Oh… Je brille. Je ne savais plus que je pouvais briller aussi fort.",
    essBad:"<i>Sa lumière s'éteint.</i> Trop… je ne vois plus la porte.",
    frags:[{n:"La danse des lumières au-dessus de l'étang",e:"joie"},{n:"La nuit à attendre sur l'étang, une fleur à la patte",e:"tristesse"}],
    thanks:"<i>Il pose la fleur séchée devant la bougie de la taverne.</i> Je vais retourner à l'étang. Les jeunes Muciole et Lumivole y dansent toujours, les soirs d'été. Je leur apprendrai notre signal. Et je leur dirai : si quelqu'un ne vient pas, allez frapper à sa porte. Toujours. Ne restez pas sur l'étang.",
    gift:{key:"lueur",n:"Lueur de Muciole",i:"✨",d:"À chaque tour, le client gagne 3 de Bouclier",fx:{turnStart(C){ C.block+=3; }}},
    staff:{n:"Lumière à la fenêtre",d:"Les âmes de l'Inachevé arrivent avec 1 Tension de moins",wage:15},
    staffFx:{arrive(c,d){ if(d.family==="Inachevé") c.ten--; }},
    cogHint:"Il surveille la porte : il a besoin de quelque chose de chaleureux. Une Gelée Blanche, et du sucré, comme un soir d'été : Jus de Baie, Miel, Pomme Sucrée.",
    map:mapStd({a:"L'étang au crépuscule",b:"La fleur séchée",h:"La nuit sans elle",c:"Les roseaux de la rive",i:"La danse des lumières",d:"La feuille de nénuphar",j:"Le matin où il est parti",k:"Le signal, trois longs, deux courts",l:"Les jeunes qui dansent",f:"La maison où elle attendait",g:"Le soir de la grande danse"},{eb:"tristesse",eh:"peur",ej:"tristesse",ef:"tristesse",key:"joie",foe:{id:314,n:"Lumivole"}})
};
TALK.muciole = [
    {t:"<i>Sa queue dessine un petit Pikachu au-dessus de la table, pour ton acolyte.</i> Tu vois ? Je n'ai pas perdu la main. Enfin, la queue."},
    {t:"<i>Il goûte le Jus de Baie.</i> Elle adorait ça. Elle disait que ça avait le goût d'un soir d'été qui ne finit pas.",like:"jusbaie"},
    {t:"<i>Il fixe le Cœur Sucré, et sa lumière tremble.</i> Un cœur. C'est ce que je voulais dessiner dans le ciel, ce soir-là.",like:"coeursucre"}
];
WIPE.muciole = ["<i>Sa lumière éclaire les verres pendant que tu essuies. Tu vois chaque trace. Il est très fier d'être utile.</i>","<i>Il clignote doucement, trois longs, deux courts, au rythme de ton torchon.</i>"];
LETTERS.muciole = "« Hier soir, sur l'étang, une jeune Lumivole n'est pas venue au rendez-vous d'un jeune Muciole. Il allait partir. Je lui ai dit : va frapper. Il y est allé. Elle avait un rhume. Ils ont dansé le lendemain. Trois longs, deux courts. — M. »";
REGULARS.muciole = {order:{base:"jusbaie",add:["miel"]},
    line:"<i>Il entre en dessinant une étoile au-dessus de la porte.</i> Bonsoir ! Un Jus de Baie au miel. Je ne surveille plus la porte. Enfin, un peu. Par habitude.",
    ok:"<i>Il boit, la lumière tranquille.</i> Les jeunes de l'étang m'appellent « le vieux qui frappe aux portes ». J'aime bien. C'est mieux que « le vieux qui attend ».",
    ko:"<i>Sa lumière vacille, puis se reprend.</i> Pas tout à fait. Mais je ne repars pas fâché. Plus jamais fâché sans demander."};
ROOM_SAY.muciole = {a:"L'étang. Le soleil se couche. Bientôt, les lumières.",b:"La fleur. Je l'avais cueillie au bord de l'eau. Elle a séché dans ma patte.",h:"La nuit. Sans elle. L'étang est si noir quand on est seul à briller.",c:"Les roseaux. On s'y cachait pour se faire peur, en riant.",i:"Nos lumières dans le ciel. Une étoile. Un cœur. Un mot.",d:"La feuille de nénuphar. Notre place.",j:"Le matin. Je suis parti sans frapper à sa porte.",k:"Trois longs, deux courts. « Je suis là. »",l:"Des jeunes qui dansent. Ils ne savent pas encore.",f:"Sa maison. Elle était à la fenêtre. Elle attendait. Moi.",g:"Le soir de la grande danse, où personne n'est venu."};
ROOM_KW.muciole = {i:"danse",b:"fleur",f:"attente"};
BOSS.muciole = {id:313,n:"Ombre de l'étang vide",self:true};
LEGEND_CARD.muciole = "troislongs";
CLIENT_CARD.muciole = "lumiqueue";
CARDS.lumiqueue = {n:"Lumiqueue",c:1,t:"skill",block:6,elan:1,draw:1,r:"client",i:"✨",from:"muciole"};
CARDS.troislongs = {n:"Trois Longs, Deux Courts",c:1,t:"skill",block:12,heal:5,retain:true,r:"legende",i:"✨",from:"muciole",d:"12 de Bouclier, soigne 5 PV. Retenue. « Je suis là. »"};

// =====================================================================
// DÉMOLOSSE  (demolosse)
// =====================================================================
CL.demolosse = {
    season:9,from:4,id:229,n:"Démolosse",c:"#c05040",family:"Inachevé",wound:"feu",likesEss:["combat"],comfort:["the","grochampi","sitrus","biscuit","craquiroc"],dislike:["superbonbon","limonade","gateau"],tol:3,
    intro:"Un hurlement, très loin, sur la colline. Puis Démolosse pousse la porte du museau. Grand, noir, les cornes recourbées, l'air terrible. Mais il s'arrête sur le paillasson, s'essuie les pattes soigneusement, et s'assoit très droit, comme un chien bien élevé qui attend qu'on l'autorise à entrer.",
    arrive:"<i>Sa voix est rauque, polie.</i> Bonsoir. Je ne reste pas. Je dois rentrer garder la maison. Mais il fait froid, et la maison est vide depuis si longtemps… Un thé, si ce n'est pas trop demander.",
    hints:["Toutes les dix minutes, il tourne la tête vers la colline, les oreilles dressées.","Il porte un vieux collier de cuir avec une médaille gravée. Un prénom d'enfant, et une adresse sur la colline.","Il garde une patte posée sur le pied de la chaise, comme s'il protégeait quelque chose."],
    stages:[
      {req:0,t:"<i>Il touche la médaille de son collier.</i> La maison sur la colline. Celle aux volets bleus. J'y garde la porte depuis que je suis tout petit Malosse. Une famille. Un petit garçon, Théo, qui dormait avec moi dans la cuisine quand il avait peur de l'orage.",kw:"maison"},
      {req:2,t:"<i>Sa voix devient plus douce.</i> Un matin, ils ont chargé une charrette. Théo m'a serré très fort. Il m'a dit : « Garde la maison, on revient. » Le père a dit que la ville, ce n'était pas pour un Démolosse. Ils sont partis. J'ai gardé la maison.",kw:"garde"},
      {req:3,t:"<i>Ses flammes baissent.</i> Ça fait dix-neuf ans. Personne n'est revenu. La maison s'écroule. Les volets ne sont plus bleus. Mais Théo a dit « on revient ». Si je pars, et qu'il revient, et que la porte n'est pas gardée… Alors je reste. Je hurle la nuit, pour qu'il entende, où qu'il soit.",kw:"retour"},
      {req:4,t:"<i>Il enlève la patte de la chaise.</i> Théo a trente ans, maintenant. Il ne reviendra pas dans une maison qui s'écroule. Il pensait revenir, quand il l'a dit. Les enfants le pensent toujours. …J'ai gardé la maison. J'ai tenu ma part. Je crois que j'ai le droit d'aller voir à quoi ressemble la ville."}
    ],
    lie:{after:0,t:"<i>Il gronde, les crocs sortis, puis se reprend.</i> Je garde la maison parce que c'est mon travail. Pas parce que j'attends quelqu'un. Un Démolosse n'attend personne."},
    reform:{"maison":"« Tu as gardé plus qu'une maison. Tu as gardé son enfance. »","garde":"« Tu as tenu ta promesse. Dix-neuf ans. Personne ne peut t'en demander plus. »","retour":"« Il ne reviendra peut-être pas. Mais toi, tu peux aller vers lui. »"},
    essGood:"<i>Il boit, et ses flammes deviennent douces, comme une cheminée.</i> C'est bon. Comme la cuisine de la maison, les soirs d'orage.",
    essBad:"<i>Il gronde.</i> Trop fort. Je dois garder la tête claire. Pour la porte.",
    frags:[{n:"Les nuits d'orage, Théo blotti contre lui dans la cuisine",e:"nostalgie"},{n:"« Garde la maison, on revient. »",e:"tristesse"}],
    thanks:"<i>Il se lève, et pour la première fois, il ne regarde pas vers la colline.</i> Le facteur dragon m'a dit qu'il connaissait toutes les adresses de la ville. Je vais lui demander celle d'un certain Théo, trente ans, qui avait peur de l'orage. Je ne frapperai pas, peut-être. Mais je passerai devant chez lui. Juste pour voir s'il va bien.",
    gift:{key:"collierdemo",n:"Collier de Démolosse",i:"🦴",d:"Au début de chaque combat, le client gagne 2 de Force et l'ombre brûle (Brûlure 3)",fx:{combatStart(C,en){ C.str+=2; en.burn+=3; }}},
    staff:{n:"Gardien de la porte",d:"Les âmes ne repartent jamais fâchées dès la première nuit : +1 échange pour tous",wage:25},
    staffFx:{arrive(c){ c.turns++; }},
    cogHint:"Il a l'air terrible, mais c'est un gentil chien de garde. Une Gelée Rouge pour ses flammes, et du nourrissant : Thé de Safrania, Gros Champi, Baie Sitrus.",
    map:mapStd({a:"La maison aux volets bleus",b:"Le collier et la médaille",h:"L'orage sur la colline",c:"Le chemin de la ville",i:"Les nuits dans la cuisine",d:"Le paillasson de l'entrée",j:"La charrette qui s'éloigne",k:"Théo qui le serre très fort",l:"La ville au loin, la nuit",f:"Dix-neuf hivers à garder",g:"Le matin du départ"},{eb:"tristesse",eh:"peur",ej:"colere",ef:"tristesse",key:"nostalgie",foe:{id:228,n:"Malosse"}})
};
TALK.demolosse = [
    {t:"<i>Il renifle l'air de la taverne.</i> Il y a beaucoup de chagrin ici. Mais il est rangé. Bien gardé. C'est une bonne maison."},
    {t:"<i>Il boit son thé avec délicatesse, malgré ses crocs.</i> La mère de Théo m'en donnait, les soirs d'hiver, dans une écuelle ébréchée. Ça ne se fait pas, un thé pour un chien. Elle le faisait quand même.",like:"the"},
    {t:"<i>Il croque un Biscuit Lava, et sa queue bat le sol.</i> Théo m'en volait dans le placard. Il en mangeait un, il m'en donnait deux.",like:"biscuit"}
];
WIPE.demolosse = ["<i>Il monte la garde devant la porte pendant que tu essuies. Personne n'entrera sans ta permission.</i>","<i>Il te regarde essuyer, la tête penchée. Il a l'air de trouver ça très important.</i>"];
LETTERS.demolosse = "« Le facteur m'a emmené en ville. Théo habite au troisième étage, avec un petit garçon. Le petit avait peur de l'orage, hier soir. Je l'ai entendu pleurer par la fenêtre. Je suis resté sous la fenêtre jusqu'à ce qu'il dorme. Personne ne m'a vu. Je reviendrai. — D. »";
REGULARS.demolosse = {order:{base:"the",add:["biscuit"]},
    line:"<i>Il s'essuie les pattes sur le paillasson, très soigneusement.</i> Bonjour. Un thé, et un Biscuit Lava. Deux, en fait. On ne mange jamais un biscuit seul.",
    ok:"<i>Il boit, tranquille.</i> Théo m'a vu, sous la fenêtre. Il m'a reconnu tout de suite. Il a pleuré. Son petit garçon m'a fait un câlin. J'ai une nouvelle maison à garder, maintenant. Au troisième étage.",
    ko:"<i>Il penche la tête.</i> Pas tout à fait. Mais je ne gronde plus pour si peu."};
ROOM_SAY.demolosse = {a:"La maison aux volets bleus. Ils étaient si bleus, avant.",b:"Mon collier. « Théo, maison de la colline ». Je ne l'ai jamais enlevé.",h:"L'orage. Théo pleurait. Je me collais contre lui.",c:"Le chemin de la ville. Je ne l'ai jamais pris. Jamais.",i:"La cuisine, la nuit. Son souffle contre mon flanc.",d:"Le paillasson. Ma place. Face à la porte.",j:"La charrette qui s'éloigne. Il me fait signe. Je reste.",k:"Il me serre très fort. « On revient. »",l:"La ville, au loin. Des milliers de lumières. Une d'elles est la sienne.",f:"Dix-neuf hivers. La neige sur le toit qui s'effondre.",g:"Le matin où ils sont partis."};
ROOM_KW.demolosse = {a:"maison",d:"garde",j:"retour"};
BOSS.demolosse = {id:229,n:"Ombre de la maison vide",self:true};
LEGEND_CARD.demolosse = "gardefidele";
CLIENT_CARD.demolosse = "crocfeu";
CARDS.crocfeu = {n:"Crocs Feu",c:1,t:"atk",dmg:6,burn:2,r:"client",i:"🦴",from:"demolosse",d:"6 dégâts, Brûlure 2."};
CARDS.gardefidele = {n:"Gardien Fidèle",c:2,t:"atk",dmg:10,block:10,burn:3,r:"legende",i:"🦴",from:"demolosse",d:"10 dégâts, 10 de Bouclier, Brûlure 3. Il a tenu sa part."};
