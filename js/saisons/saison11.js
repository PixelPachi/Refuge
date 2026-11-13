// Saison 11 · Chapitre 6 « Les premiers pas »
// Famille de blessure du chapitre : le Seuil (ceux qui n'osent pas commencer, qui restent sur le pas de la porte).
// Images Gemini à faire : voir GEMINI.md (décor générique en attendant).

// =====================================================================
// TOGEPI  (togepi)
// =====================================================================
CL.togepi = {
    season:11,from:1,id:175,n:"Togepi",c:"#f4f0e0",family:"Seuil",wound:"normal",likesEss:["vol"],comfort:["lait","miel","pecha","muffin","coeursucre"],dislike:["liqueur","soda","poudre"],tol:2,
    intro:"Un matin de printemps, il y avait un œuf sur le paillasson de la taverne. Ce soir, l'œuf est sur un tabouret. Deux petits pieds dépassent dessous, et une petite tête toute ronde sort de la coquille, juste assez pour voir. Togepi regarde la salle avec des yeux immenses, puis rentre la tête. Puis la ressort.",
    arrive:"<i>Une toute petite voix, depuis l'intérieur de la coquille.</i> Toge… pi ? C'est grand, dehors. C'est bruyant. Ça sent des choses. Je peux rester dans ma coquille pour boire ? Je ne sors pas. Pas encore.",
    hints:["La coquille est fendue de partout, mais Togepi la tient fermée avec ses petits bras, comme une couverture.","Chaque fois que quelqu'un rit dans la salle, il sort un peu plus la tête. Chaque fois qu'un verre tinte, il la rentre.","Sur la coquille, quelqu'un a écrit au crayon, très soigneusement : « Pour la taverne. Elle saura s'occuper de lui. »"],
    stages:[
      {req:0,t:"<i>Il tapote sa coquille de l'intérieur.</i> Dedans, c'est chaud. C'est rond. Il ne se passe rien. Je connais tout par cœur. Dehors, je ne connais rien. Les autres Togepi sont sortis depuis longtemps. Moi, je suis encore dans la coquille. Ça fait trois saisons.",kw:"coquille"},
      {req:2,t:"<i>Il sort un bras, un seul.</i> Quelqu'un m'a posé devant ta porte, avant que j'éclose. Je ne sais pas qui. J'entends ta taverne tous les soirs, à travers la coquille. Les rires, les pleurs, les verres. Je me dis : si je sors, il faudra que je sois heureux. Les Togepi, ça rend les gens heureux. Et si je n'y arrive pas ?",kw:"bonheur"},
      {req:3,t:"<i>Sa petite voix tremble.</i> Tout le monde dit que les Togepi portent bonheur. Alors si je sors et que je ne porte pas bonheur, on saura que je suis raté. Tant que je suis dans ma coquille, je peux encore être parfait. Dehors, je serai juste… moi.",kw:"dehors"},
      {req:4,t:"<i>La coquille craque, et Togepi sort les deux pieds, puis tout le corps. Il garde juste un morceau de coquille sur la tête, comme un chapeau.</i> Je ne porte pas bonheur, peut-être. Mais j'ai envie de voir à quoi ressemble le comptoir de près. C'est tout. C'est déjà beaucoup."}
    ],
    lie:{after:0,t:"<i>Il rentre la tête.</i> Je suis très bien dedans. Je sortirai quand je serai prêt. Je ne serai jamais prêt. C'est très bien."},
    reform:{"coquille":"« Ta coquille t'a protégé. Tu as le droit de la quitter quand tu veux. »","bonheur":"« Tu n'as pas besoin de rendre les gens heureux pour avoir le droit d'être là. »","dehors":"« Dehors, tu seras juste toi. Et toi, c'est assez. »"},
    essGood:"<i>Il boit avec une paille, et sa tête sort tout entière.</i> Oh… C'est tiède. Comme dedans. Mais dehors.",
    essBad:"<i>Il rentre complètement dans sa coquille.</i> Trop ! C'est trop, dehors !",
    frags:[{n:"Les rires de la taverne à travers la coquille",e:"joie"},{n:"Le soir où il a sorti un bras pour la première fois",e:"peur"}],
    thanks:"<i>Il trottine jusqu'au comptoir, son bout de coquille sur la tête, et te tend un morceau de sa coquille.</i> Pour toi. Je n'en ai plus besoin. Enfin, si, un petit bout, pour la tête. Je vais aller voir les enfants de l'école. Ils ont l'air bruyants. Je vais essayer d'être bruyant aussi.",
    gift:{key:"coquille",n:"Éclat de Coquille de Togepi",i:"🥚",d:"Au premier tour de chaque combat, le client a 8 de Bouclier",fx:{combatStart(C){ C.blockNext=(C.blockNext||0)+8; }}},
    staff:{n:"Petit porte-bonheur",d:"Les âmes du Seuil arrivent avec +1 Ouverture",wage:10},
    staffFx:{arrive(c,d){ if(d.family==="Seuil") c.ouv++; }},
    cogHint:"Il est tout juste né : rien de fort, rien de pétillant, il rentrerait dans sa coquille. Une Gelée Ciel pour le monde qu'il découvre, et du très doux : Lait Meumeu, Miel, Baie Pêcha.",
    map:mapStd({a:"L'intérieur de la coquille",b:"La fente dans la coquille",h:"Le bruit du dehors",c:"Le paillasson de la taverne",i:"Les rires à travers la coquille",d:"Le coin tiède du tabouret",j:"Les autres Togepi déjà sortis",k:"La main qui l'a posé là",l:"La cour de l'école",f:"Trois saisons sans éclore",g:"Le matin où il aurait dû éclore"},{eb:"peur",eh:"peur",ej:"tristesse",ef:"peur",key:"joie"})
};
TALK.togepi = [
    {t:"<i>Il regarde ton acolyte par la fente de la coquille.</i> Toi, tu es sorti de ton œuf il y a longtemps ? Ça faisait peur ? <i>Il écoute la réponse, très sérieux.</i> D'accord. Un peu peur. D'accord."},
    {t:"<i>Il aspire le Lait Meumeu.</i> On m'en a laissé un bol, devant la porte, le premier soir. Je l'ai bu par la fente. C'était toi ?",like:"lait"},
    {t:"<i>Il serre le Cœur Sucré contre sa coquille.</i> Un cœur. Pour moi. Même si je ne porte pas bonheur ?",like:"coeursucre"}
];
WIPE.togepi = ["<i>Il sort la tête pour regarder ton torchon. Il la laisse sortie un peu plus longtemps que d'habitude.</i>","<i>Il tend un petit bras hors de la coquille et essuie le bord du comptoir avec. Très fier.</i>"];
LETTERS.togepi = "« Je suis allé à l'école. J'ai fait tomber les crayons de tout le monde. Un garçon a ri. Moi aussi. La maîtresse m'a donné une place au premier rang. Je garde mon bout de coquille sur la tête. Elle dit que ça me va bien. — T. »";
REGULARS.togepi = {order:{base:"lait",add:["miel"]},
    line:"<i>Il entre en courant, son bout de coquille de travers sur la tête.</i> Bonjour ! Un lait au miel ! J'ai couru jusqu'ici sans m'arrêter. Dehors, c'est grand. C'est bien, grand.",
    ok:"<i>Il boit en balançant les pieds.</i> Les grands disent que je porte bonheur. Moi, je ne sais pas. Mais quand je ris, ils rient aussi. C'est peut-être ça.",
    ko:"<i>Il penche la tête, et le bout de coquille tombe. Il le remet.</i> Pas grave ! Je ne rentre plus dans ma coquille pour si peu."};
ROOM_SAY.togepi = {a:"Dedans. C'est chaud, c'est rond, il ne se passe rien.",b:"Une fente. Par là, je vois la lumière de la taverne.",h:"Le bruit du dehors. Trop fort. Trop de choses.",c:"Le paillasson. On m'a posé là. Pourquoi ici ?",i:"Des rires, à travers la coquille. J'aimerais rire avec eux.",d:"Le coin tiède du tabouret. On m'y a posé. Je n'ai pas bougé.",j:"Les autres Togepi sont sortis. Ils courent, ils tombent, ils rient.",k:"Une main qui me pose doucement. « Elle saura s'occuper de lui. »",l:"La cour de l'école. Pleine d'enfants. Pas encore moi.",f:"Trois saisons dans ma coquille. Le printemps est revenu trois fois.",g:"Le matin où j'aurais dû éclore, et où je n'ai pas osé."};
ROOM_KW.togepi = {a:"coquille",i:"bonheur",h:"dehors"};
BOSS.togepi = {id:175,n:"Ombre de la coquille",self:true};
LEGEND_CARD.togepi = "premierpas";
CLIENT_CARD.togepi = "charme";
CARDS.charme = {n:"Charme",c:1,t:"skill",block:6,weak:1,r:"client",i:"🥚",from:"togepi",d:"6 de Bouclier, l'ombre est Faible 1."};
CARDS.premierpas = {n:"Le Premier Pas",c:0,t:"skill",energy:2,draw:2,exhaust:true,r:"legende",i:"🥚",from:"togepi",d:"+2 énergie, pioche 2. Épuisée. C'est déjà beaucoup."};

// =====================================================================
// PTIRAVI  (ptiravi)
// =====================================================================
CL.ptiravi = {
    season:11,from:2,id:440,n:"Ptiravi",fem:true,c:"#f0b8c8",family:"Seuil",wound:"eau",likesEss:["normal"],comfort:["the","miel","oran","sitrus","pommenectar"],dislike:["liqueur","poudre","superbonbon"],tol:3,
    intro:"Ptiravi entre en serrant contre elle un caillou rond et blanc, dans sa petite poche, comme on tient un œuf. Elle porte une coiffe d'infirmière en papier, pliée à la main, un peu froissée. Elle s'assoit très droite, pose son caillou devant elle, et vérifie qu'il ne roule pas.",
    arrive:"<i>Elle sourit, d'un sourire de bonne élève.</i> Bonsoir ! Une infusion, s'il vous plaît. Pas trop chaude. J'ai encore des fiches à réviser. L'examen, c'est dans trois jours. Enfin, c'est toujours dans trois jours.",
    hints:["Le caillou dans sa poche est poli à force d'être tenu. Elle lui parle tout bas, comme à un œuf.","Sa coiffe de papier porte trois petites marques au crayon. Trois examens. Trois échecs.","Quand quelqu'un se cogne ou tousse dans la salle, elle se lève d'un bond, puis se rassoit sans rien faire."],
    stages:[
      {req:0,t:"<i>Elle tapote sa coiffe de papier.</i> Je veux être infirmière au Centre Pokémon. Comme Leveinard. Les Ptiravi deviennent des Leveinard quand ils sont assez heureux, on dit. Alors je travaille. Je révise. Je repasse l'examen. Je vais y arriver, c'est sûr.",kw:"examen"},
      {req:2,t:"<i>Elle serre son caillou.</i> Les Leveinard portent un œuf, qu'ils offrent aux blessés. Moi, je n'ai pas d'œuf. Alors je porte ce caillou. Je fais semblant. Le jour où je serai prête, peut-être qu'il deviendra un œuf. C'est bête, hein.",kw:"caillou"},
      {req:3,t:"<i>Sa voix tremble.</i> Je n'ai jamais raté l'examen. Je ne l'ai jamais passé. Trois fois, je suis allée jusqu'à la porte du Centre. Trois fois, je suis repartie. Si je le passe et que je rate, alors je saurai que je ne serai jamais infirmière. Tant que je ne le passe pas, je peux encore rêver.",kw:"soigner"},
      {req:4,t:"<i>Elle pose le caillou au milieu du comptoir, et le laisse là.</i> Tout à l'heure, quand le monsieur a toussé, je me suis levée. C'était déjà soigner, de se lever. Le caillou ne deviendra jamais un œuf. Mais moi, je peux devenir quelque chose. Il faut juste que je passe la porte."}
    ],
    lie:{after:0,t:"<i>Elle sourit, très vite.</i> L'examen ? Oh, il est très facile ! Je le passerai quand je serai prête. Je suis presque prête. Presque."},
    reform:{"examen":"« Rater un examen, ce n'est pas rater sa vie. Ne pas le passer, si. »","caillou":"« Tu n'as pas besoin d'un œuf pour soigner. Tu as déjà les gestes. »","soigner":"« Tu t'es levée pour lui. C'est ça, être infirmière. »"},
    essGood:"<i>Elle boit, et ses joues rosissent.</i> C'est réconfortant. Comme une main sur l'épaule avant d'entrer.",
    essBad:"<i>Elle grimace.</i> Trop fort… Je dois garder les idées claires, pour les fiches.",
    frags:[{n:"La porte du Centre Pokémon, trois fois sans la pousser",e:"peur"},{n:"Le jour où elle a soigné la patte d'un Rattata, toute seule",e:"joie"}],
    thanks:"<i>Elle remet sa coiffe de papier bien droite, et laisse le caillou sur le comptoir.</i> Demain, j'y vais. Pas dans trois jours. Demain. Si je rate, je repasserai. Et vous savez quoi ? Je vous laisse le caillou. Si un jour quelqu'un entre ici blessé, vous lui donnerez. Ça ne soigne rien. Mais ça aide à attendre.",
    gift:{key:"coiffe",n:"Coiffe de Papier de Ptiravi",i:"🩺",d:"À la fin de chaque combat gagné, le client récupère 4 PV",fx:{}},
    staff:{n:"Infirmière de la taverne",d:"Les âmes repartent sans gueule de bois",wage:20},
    staffFx:{arrive(c){ c.hang=0; }},
    cogHint:"Elle est sérieuse et nerveuse : quelque chose de calmant, pas d'excitant. Une Gelée Bleue pour apaiser, et du doux : Thé de Safrania, Miel, Baie Oran.",
    map:mapStd({a:"La porte du Centre Pokémon",b:"Le caillou dans la poche",h:"La salle d'examen vide",c:"Les fiches de révision",i:"La patte du Rattata",d:"La chambre aux livres",j:"La coiffe aux trois marques",k:"Les Leveinard qui offrent leur œuf",l:"Le premier patient",f:"La troisième fois devant la porte",g:"Le premier jour où elle a fait demi-tour"},{eb:"peur",eh:"peur",ej:"tristesse",ef:"peur",key:"joie",foe:{id:242,n:"Leuphorie"}})
};
TALK.ptiravi = [
    {t:"<i>Elle sort une fiche de révision.</i> Question 47 : que faire face à un Pokémon qui a peur d'entrer ? Réponse : lui laisser le temps, et rester à côté. <i>Elle relève la tête.</i> C'est drôle. C'est ce que vous faites, ici."},
    {t:"<i>Elle boit son thé à petites gorgées.</i> L'infirmière du Centre en boit, le soir. Je l'ai vue par la fenêtre. Trois fois.",like:"the"},
    {t:"<i>Elle croque la Pomme Nectar.</i> C'est si sucré. On dirait une récompense. Je n'ai encore rien fait pour la mériter. <i>Elle en reprend quand même.</i>",like:"pommenectar"}
];
WIPE.ptiravi = ["<i>Elle te regarde essuyer et corrige ta posture, très doucement : « Le poignet souple, pour ne pas se faire mal. »</i>","<i>Elle range les verres propres par taille, sans qu'on lui demande. Ça la calme.</i>"];
LETTERS.ptiravi = "« J'ai passé l'examen. Je l'ai raté. De deux points. Je l'ai repassé le mois suivant. Je l'ai eu. Hier, au Centre, j'ai soigné l'aile d'un Roucool. Ce matin, je me suis réveillée plus grande. Je crois que je suis en train de devenir Leveinard. — P. »";
REGULARS.ptiravi = {order:{base:"the",add:["miel"]},
    line:"<i>Elle entre en blouse, la coiffe de papier remplacée par une vraie.</i> Bonsoir ! Un thé au miel. J'ai fini ma garde. Six patients. Six !",
    ok:"<i>Elle boit, fatiguée et heureuse.</i> Une petite Rattata avait peur d'entrer au Centre. Je suis restée à côté d'elle, dehors, une heure. Elle est entrée. Je lui ai donné le caillou.",
    ko:"<i>Elle sourit quand même.</i> Pas tout à fait. Mais ce n'est pas grave. On ne réussit pas tout du premier coup."};
ROOM_SAY.ptiravi = {a:"La porte du Centre. Grande, blanche. Elle s'ouvre toute seule. Je recule.",b:"Mon caillou. Rond, blanc, poli. Il ne sera jamais un œuf.",h:"La salle d'examen. Les tables. Ma place est vide.",c:"Des fiches, des fiches, des fiches. Je les connais par cœur.",i:"Un Rattata avec la patte blessée. Je l'ai soigné. Toute seule. J'avais oublié.",d:"Ma chambre, pleine de livres. Je révise jusqu'à l'aube.",j:"Trois marques sur ma coiffe. Trois fois demi-tour.",k:"Des Leveinard qui offrent leur œuf aux blessés. Si beaux.",l:"Mon premier patient. Il me fait confiance.",f:"La troisième fois devant la porte. Je repars encore.",g:"Le premier jour où j'ai fait demi-tour."};
ROOM_KW.ptiravi = {h:"examen",b:"caillou",i:"soigner"};
BOSS.ptiravi = {id:440,n:"Ombre de la porte du Centre",self:true};
LEGEND_CARD.ptiravi = "oeufsoin";
CLIENT_CARD.ptiravi = "lancerdoux";
CARDS.lancerdoux = {n:"Soin Doux",c:1,t:"skill",heal:6,block:4,r:"client",i:"🩺",from:"ptiravi"};
CARDS.oeufsoin = {n:"L'Œuf Offert",c:1,t:"skill",heal:14,draw:1,retain:true,r:"legende",i:"🩺",from:"ptiravi",d:"Soigne 14 PV, pioche 1. Retenue. Il fallait juste passer la porte."};

// =====================================================================
// RELICANTH  (relicanth)
// =====================================================================
CL.relicanth = {
    season:11,from:3,id:369,n:"Relicanth",c:"#a89880",family:"Seuil",wound:"combat",likesEss:["eau"],comfort:["eau","grochampi","craquiroc","the","sable"],dislike:["soda","limonade","superbonbon"],tol:3,
    intro:"On entend un frottement lourd sur le plancher. Relicanth se traîne jusqu'au comptoir, vieux comme les pierres, couvert d'écailles grises et rugueuses. Il sent la mer profonde et le sel ancien. Il s'installe près de la fenêtre et regarde le ciel, longtemps, sans rien dire.",
    arrive:"<i>Sa voix est très lente, comme une vague qui recule.</i> Bonsoir, jeune homme. Un verre d'eau, simplement. J'ai vécu au fond de l'océan cent millions d'années. Ce soir, je suis remonté. Je voulais voir les étoiles une fois. Juste une fois. Avant qu'il soit trop tard.",
    hints:["Il lève les yeux vers le ciel chaque fois que la porte s'ouvre, comme s'il vérifiait qu'il était toujours là.","Ses nageoires portent des rayures de coquillages fossiles. Il est plus vieux que tout ce qui l'entoure.","Il répète « trop tard » souvent, sans s'en rendre compte."],
    stages:[
      {req:0,t:"<i>Il regarde ses nageoires.</i> Au fond, dans les abysses, rien ne change. Je n'ai pas changé non plus. Les Kabuto sont devenus des Kabutops, les Amonita des Amonistar. Moi, je suis resté Relicanth. Cent millions d'années de la même vie, au fond du même noir.",kw:"abysses"},
      {req:2,t:"<i>Il lève les yeux vers la fenêtre.</i> Je voyais une lueur, très haut, à travers l'eau. Toute ma vie. On disait que c'était la surface, et qu'au-dessus, il y avait un autre ciel, avec des lumières. Je me disais : un jour, je monterai voir. Demain. Ou le siècle prochain.",kw:"surface"},
      {req:3,t:"<i>Sa voix tremble, très doucement.</i> Je n'y suis jamais allé. Il y avait toujours une bonne raison d'attendre. Et puis un jour, je me suis rendu compte que j'étais vieux. Si vieux. Que j'avais passé cent millions d'années à préparer un voyage que je ne faisais pas. Il est trop tard pour commencer quoi que ce soit, à mon âge.",kw:"trop tard"},
      {req:4,t:"<i>Il regarde les étoiles par la fenêtre, et ses vieux yeux brillent.</i> Je suis monté, ce soir. Elles sont là. Plus belles que tout ce que j'avais imaginé. Il n'était pas trop tard. Il n'est jamais trop tard pour regarder en l'air."}
    ],
    lie:{after:0,t:"<i>Il hausse ses vieilles nageoires.</i> Les étoiles ? Elles sont sûrement très surfaites. Je suis très bien au fond. Le noir, c'est reposant. Il n'y a rien à voir là-haut."},
    reform:{"abysses":"« Tu es resté le même, et pourtant tu es monté ce soir. Ça, c'est nouveau. »","surface":"« Tu l'as vue toute ta vie. Ce soir, tu es de l'autre côté. »","trop tard":"« Tu es là, ce soir. Ce n'était pas trop tard. »"},
    essGood:"<i>Il boit lentement, et ses écailles brillent un peu.</i> L'eau douce. Je n'en avais jamais goûté. Cent millions d'années, et une première fois.",
    essBad:"<i>Il recule, lourdement.</i> Trop vif. Je suis un vieux poisson.",
    frags:[{n:"La lueur de la surface, vue depuis les abysses",e:"nostalgie"},{n:"Les étoiles, enfin, depuis la fenêtre de la taverne",e:"joie"}],
    thanks:"<i>Il se traîne jusqu'à la porte, et s'arrête sur le seuil pour regarder le ciel.</i> Je vais rester un peu sur la plage, avant de redescendre. Il y a les étoiles, le soir. Et le matin, paraît-il, une grosse lumière qui chauffe. Je voudrais voir ça aussi. Ensuite, on verra. J'ai tout mon temps. Enfin, je crois.",
    gift:{key:"ecaillefossile",n:"Écaille Fossile de Relicanth",i:"🪨",d:"Au début de chaque combat, le client gagne 1 de Force et 5 de Bouclier",fx:{combatStart(C){ C.str+=1; C.blockNext=(C.blockNext||0)+5; }}},
    staff:{n:"Vieux sage",d:"Les âmes du Seuil arrivent avec 1 Tension de moins",wage:20},
    staffFx:{arrive(c,d){ if(d.family==="Seuil") c.ten--; }},
    cogHint:"Il est très vieux et très lent : rien de pétillant, rien de neuf. Une Gelée Orange pour le courage qu'il lui a fallu, et du simple : Eau Fraîche, Gros Champi, Craquiroc.",
    map:mapStd({a:"Les abysses",b:"Les fossiles des autres",h:"Le noir sans fin",c:"La remontée",i:"Les étoiles, enfin",d:"Le creux de roche",j:"Ceux qui ont changé",k:"La lueur, très haut",l:"La plage au lever du jour",f:"Cent millions d'années à attendre",g:"Le jour où il s'est dit « demain »"},{eb:"tristesse",eh:"peur",ej:"tristesse",ef:"tristesse",key:"joie",foe:{id:171,n:"Lanturn"}})
};
TALK.relicanth = [
    {t:"<i>Il regarde ton acolyte.</i> Tu es né quand, toi ? Hier ? Je plaisante. Pour moi, tout le monde est né hier."},
    {t:"<i>Il boit l'Eau Fraîche à toutes petites gorgées.</i> Pas de sel. C'est étrange. C'est bon. C'est léger, comme une idée neuve.",like:"eau"},
    {t:"<i>Il croque un Craquiroc, lentement.</i> Ça me rappelle les cailloux du fond. En meilleur. Beaucoup meilleur.",like:"craquiroc"}
];
WIPE.relicanth = ["<i>Il te regarde essuyer, avec une patience infinie. Il a tout son temps. Toi aussi, ce soir.</i>","<i>Il te raconte, très lentement, comment était la mer il y a cent millions d'années. Tu essuies le même verre pendant tout le récit.</i>"];
LETTERS.relicanth = "« J'ai vu mon premier lever de soleil. Puis mon deuxième. Puis j'ai arrêté de compter. Les enfants de la plage m'appellent \"le vieux rocher qui parle\". Je leur raconte la mer d'avant. Ils me racontent le monde d'aujourd'hui. On apprend tous beaucoup. — R. »";
REGULARS.relicanth = {order:{base:"eau",add:["craquiroc"]},
    line:"<i>Il arrive en fin d'après-midi, avant le coucher du soleil.</i> Bonjour, jeune homme. Une eau, et un Craquiroc. Je veux être sur la plage pour les étoiles.",
    ok:"<i>Il boit, en regardant le ciel par la fenêtre.</i> Hier, j'ai nagé dans une rivière. De l'eau douce, qui coule. Cent millions d'années, et je découvre encore. C'est merveilleux, d'être vieux, quand on recommence.",
    ko:"<i>Il hausse ses vieilles nageoires.</i> Pas tout à fait. Mais j'ai le temps. J'ai toujours eu le temps."};
ROOM_SAY.relicanth = {a:"Les abysses. Le noir, le froid, le silence. Ma maison, depuis toujours.",b:"Des fossiles. Ceux qui ont changé, ou qui sont partis. Pas moi.",h:"Le noir sans fin. Il n'y a pas de matin, ici.",c:"La remontée. L'eau devient plus claire. J'ai peur.",i:"Les étoiles. Elles sont là. Elles étaient là depuis toujours.",d:"Mon creux de roche. Cent millions d'années au même endroit.",j:"Kabuto, Amonita… Ils ont tous changé. Moi, j'ai attendu.",k:"La lueur, très haut. « Un jour, je monterai voir. »",l:"La plage au lever du jour. Une grosse lumière qui chauffe.",f:"Cent millions d'années à préparer un voyage que je ne faisais pas.",g:"Le jour où je me suis dit « demain », pour la première fois."};
ROOM_KW.relicanth = {a:"abysses",k:"surface",f:"trop tard"};
BOSS.relicanth = {id:369,n:"Ombre des abysses",self:true};
LEGEND_CARD.relicanth = "jamaistroptard";
CLIENT_CARD.relicanth = "fracasroc";
CARDS.fracasroc = {n:"Fracass'Tête",c:2,t:"atk",dmg:15,r:"client",i:"🪨",from:"relicanth"};
CARDS.jamaistroptard = {n:"Jamais Trop Tard",c:2,t:"atk",dmg:12,block:12,str:1,r:"legende",i:"🪨",from:"relicanth",d:"12 dégâts, 12 de Bouclier, +1 Force. Il n'est jamais trop tard pour regarder en l'air."};
