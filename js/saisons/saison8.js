// Saison 8 · Chapitre 4 « La fête de Bourg-Brume » (fin du chapitre)
// Famille : la Solitude. La fête a lieu la dernière nuit, juste avant le Grand Écho (Ho-Oh).
// Le Pourboire d'Or a fait faillite au début de la saison : Miaouss vient comme client.
// Images Gemini à faire : voir GEMINI.md (décor générique en attendant).

// =====================================================================
// KECLEON  (kecleon)
// =====================================================================
CL.kecleon = {
    season:8,from:1,id:352,n:"Kecleon",c:"#88c860",family:"Solitude",wound:"normal",likesEss:["psy"],comfort:["the","miel","mago","galette","malasada"],dislike:["liqueur","poudre","soda"],tol:3,
    intro:"La porte s'ouvre, et il n'y a personne. Puis le portemanteau cligne des yeux. Kecleon se détache du mur, vert, puis beige comme le plancher, puis vert à nouveau. Le marchand de l'étal, celui qui te vend tes baies depuis le premier jour. C'est la première fois qu'il passe la porte de nuit.",
    arrive:"<i>Il se frotte les griffes, trop poli.</i> Bonsoir, patron ! Ne faites pas attention à moi. Je passais. Enfin, je ne passais pas. Je voulais voir à quoi ressemble la taverne… de l'autre côté du comptoir.",
    hints:["Il change de couleur selon la personne qui lui parle. Avec toi, il est couleur bois. Avec ton acolyte, couleur poussin.","Il connaît le prénom, le goût préféré et l'allergie de chaque client du village. Personne ne connaît le sien.","Sur son ventre, la bande rouge en zigzag est la seule chose qui ne change jamais de couleur."],
    stages:[
      {req:0,t:"<i>Il devient couleur comptoir sans s'en rendre compte.</i> Je prends la couleur des clients. Toujours. C'est pratique pour vendre : on se sent compris. Le boulanger me voit doré, la fleuriste me voit rose. Et moi, à force, je ne sais plus de quelle couleur je suis.",kw:"couleur"},
      {req:2,t:"<i>Il regarde par la fenêtre, vers la place où l'on monte les stands.</i> L'étal, c'est ma vie. Je l'ouvre à l'aube, je le ferme à la nuit. Tout le village passe devant. Tout le monde me dit bonjour. Personne ne me dit bonsoir. Le soir, je rentre seul, et je redeviens vert, pour personne.",kw:"étal"},
      {req:3,t:"<i>Sa voix se casse.</i> À la fête, tous les ans, je tiens l'étal pendant que les autres dansent. Je vends des baies jusqu'à minuit. Puis je range, et la place est vide. Je n'ai jamais dansé. Personne ne m'a jamais invité. Je crois que personne ne m'a jamais vu en dehors de l'étal.",kw:"danse"},
      {req:4,t:"<i>Il redevient vert, franchement vert, et sa bande rouge brille.</i> Voilà ma couleur. Pas très jolie. Mais c'est la mienne. Cette année, je fermerai l'étal à neuf heures. Et j'irai sur la place. Vert."}
    ],
    lie:{after:0,t:"<i>Il prend ta couleur, aussitôt.</i> Oh, moi, je suis très bien comme ça ! Un bon marchand n'a pas besoin d'être vu. Il a besoin d'être utile. C'est tout."},
    reform:{"couleur":"« On t'aime pour toi, pas pour la couleur que tu prends. »","étal":"« L'étal ferme le soir. Toi, tu as le droit d'exister après. »","danse":"« Personne ne t'a invité ? Alors je t'invite. »"},
    essGood:"<i>Il boit, et il reste vert jusqu'au bout du verre.</i> Oh. Je ne me suis pas changé. C'est la première fois depuis longtemps.",
    essBad:"<i>Il devient gris, d'un coup.</i> Trop… Désolé, je prends la couleur du verre, maintenant.",
    frags:[{n:"Le premier jour de l'étal, l'odeur des baies fraîches",e:"nostalgie"},{n:"La place vide après la fête, quand il range seul",e:"tristesse"}],
    thanks:"<i>Il se lève, vert comme une feuille de printemps.</i> Merci, patron. Demain, je vous ferai un prix sur les Baies Mago. Non, pas pour vous remercier. Pour rien. Parce que vous êtes mon ami, et que ça, je ne l'avais jamais dit à un client.",
    gift:{key:"bandezigzag",n:"Bande Zigzag de Kecleon",i:"🦎",d:"Au début de chaque combat, le client pioche 1 carte de plus",fx:{draw(C){ return C.turn===1?1:0; }}},
    staff:{n:"Ami du marchand",d:"Les ingrédients de Kecleon coûtent 10 % de moins",wage:15},
    staffFx:{discount:0.1},
    cogHint:"Il prend la couleur de tout le monde : aide-le à retrouver la sienne. Une Gelée Blanche, toute simple, et du doux : Thé de Safrania, Miel, Baie Mago.",
    map:mapStd({a:"L'étal à l'aube",b:"Les couleurs des clients",h:"Le mur où il disparaît",c:"La place qui se remplit",i:"Le premier jour de l'étal",d:"La remise aux cageots",j:"La fanfare qui joue sans lui",k:"Le bonjour de chaque client",l:"Le soir où il redevient vert",f:"La place vide après la fête",g:"Le jour où il n'a plus su sa couleur"},{eb:"tristesse",eh:"peur",ej:"tristesse",ef:"tristesse",key:"joie"})
};
TALK.kecleon = [
    {t:"<i>Il fait l'inventaire de ton étagère, par réflexe.</i> Il vous reste deux Baies Oran, trois Lait Meumeu. Je vous en mets de côté demain. …Pardon. Ce soir, je suis client. J'oublie toujours."},
    {t:"<i>Il goûte la Baie Mago, et ferme les yeux.</i> Je les vends depuis vingt ans. Je n'en avais jamais mangé une. On ne mange pas la marchandise.",like:"mago"},
    {t:"<i>Il croque la Grosse Malasada.</i> C'est moi qui les ai fait venir de loin, pour la fête. Je ne savais pas que c'était aussi bon. Personne ne me l'avait dit.",like:"malasada"}
];
WIPE.kecleon = ["<i>Il devient couleur torchon pour t'aider. Puis il se rend compte, et redevient vert, gêné. Tu lui dis que c'est bien, vert.</i>","<i>Il compte les verres que tu essuies, à voix basse. Vieux réflexe d'inventaire.</i>"];
LETTERS.kecleon = "« J'ai dansé. Mal. Toute la place a ri, et moi aussi. La fleuriste m'a dit qu'elle ne savait pas que j'étais vert. Elle m'a dit que ça m'allait bien. J'ai fermé l'étal tous les soirs à neuf heures depuis. — K. »";
REGULARS.kecleon = {order:{base:"the",add:["mago"]},
    line:"<i>Il entre en fin d'après-midi, vert, l'étal fermé derrière lui.</i> Bonjour, patron ! Un thé à la Baie Mago, s'il vous plaît. C'est moi qui les fournis, mais c'est vous qui les servez. Ça change tout.",
    ok:"<i>Il boit, et reste vert même quand le facteur entre.</i> La fleuriste m'a demandé de l'accompagner au bal de la fête. Je lui ai dit oui. En vert.",
    ko:"<i>Il devient un peu gris, puis se reprend.</i> Ce n'est pas tout à fait ça. Mais je ne change plus de couleur pour faire plaisir. Vert quand même."};
ROOM_SAY.kecleon = {a:"L'étal, à l'aube. Je dispose les baies une par une. Personne n'est encore levé.",b:"Toutes les couleurs des clients, superposées. Laquelle est la mienne ?",h:"Le mur. Je deviens le mur. On ne me voit plus.",c:"La place se remplit. Tout le monde passe. Tout le monde achète.",i:"Le premier jour de l'étal. J'étais si fier. Et si vert.",d:"La remise, les cageots vides. Mon seul endroit à moi.",j:"La fanfare joue. Je vends des baies. Ils dansent sans moi.",k:"« Bonjour Kecleon ! » Tous les matins. Jamais « bonsoir ».",l:"Le soir. Je rentre seul. Je redeviens vert, pour personne.",f:"La place vide après la fête. Les lampions éteints. Je range.",g:"Le jour où je n'ai plus su de quelle couleur j'étais."};
ROOM_KW.kecleon = {b:"couleur",a:"étal",j:"danse"};
BOSS.kecleon = {id:352,n:"Ombre de l'étal",self:true};
LEGEND_CARD.kecleon = "vraiecouleur";
CLIENT_CARD.kecleon = "camouflage";
CARDS.camouflage = {n:"Camouflage",c:1,t:"skill",block:7,draw:1,r:"client",i:"🦎",from:"kecleon"};
CARDS.vraiecouleur = {n:"Sa Vraie Couleur",c:1,t:"skill",block:6,str:2,draw:1,r:"legende",i:"🦎",from:"kecleon",d:"6 de Bouclier, +2 Force, pioche 1. Vert. Pas très joli. Mais c'est le sien."};

// =====================================================================
// MIMIQUI  (mimiqui)
// =====================================================================
CL.mimiqui = {
    season:8,from:2,id:778,n:"Mimiqui",fem:true,c:"#e8d060",family:"Solitude",wound:"psy",likesEss:["normal"],comfort:["lait","pecha","coeursucre","bonbonfete","miel"],dislike:["liqueur","limonade","poudre"],tol:2,
    quiet:true,
    intro:"Quelque chose de jaune entre en trottinant, de travers. On dirait un Pikachu… mais dessiné par un enfant, avec un crayon. La tête pend sur le côté, les joues sont deux ronds de feutre rouge. Sous le costume, deux petits yeux noirs regardent par un trou. Mimiqui s'assoit sous la table, pas dessus.",
    arrive:"<i>Une petite voix étouffée, sous le tissu.</i> Pika… pika ? <i>Silence.</i> …Ça ne marche pas, hein. Ça ne marche jamais. Tu peux me servir quand même ? Je ne fais pas peur. Promis. C'est pour ça, le costume.",
    hints:["Quand ton acolyte s'approche, Mimiqui recule sous la table et remet sa tête de chiffon droite, en vitesse.","Le costume est rapiécé à plein d'endroits, avec des fils de toutes les couleurs. Elle le recoud elle-même, seule.","Elle regarde les affiches de la fête sur le mur : un grand Pikachu souriant, mascotte de l'année."],
    stages:[
      {req:0,t:"<i>Elle tire sur son costume.</i> Je l'ai cousu moi-même. Avec un vieux sac et du feutre. Tout le monde aime Pikachu. Alors je me suis dit : si je lui ressemble, on m'aimera un peu aussi. Juste un peu.",kw:"déguisement"},
      {req:2,t:"<i>Elle regarde l'affiche de la fête.</i> Une fois, à la fête, un enfant m'a prise pour la mascotte. Il m'a fait un câlin. Le plus beau moment de ma vie. Puis sa mère a crié. Ma tête de chiffon était tombée. Ils ont vu ce qu'il y a dessous.",kw:"câlin"},
      {req:3,t:"<i>Sa voix tremble sous le tissu.</i> Personne ne sait ce qu'il y a sous mon costume. Ceux qui l'ont vu… sont tombés malades de peur, dit-on. Alors je ne l'enlève plus jamais. Je dors avec. Je mange avec. Je suis toute seule là-dessous, depuis toujours.",kw:"dessous"},
      {req:4,t:"<i>Elle sort de sous la table, et pose la patte sur le comptoir. Une patte d'ombre, toute petite.</i> Tu n'as pas eu peur. Tu n'as même pas regardé dessous. Tu as juste servi le verre. Alors… je vais le garder, le costume. Mais pour jouer. Plus pour me cacher."}
    ],
    lie:{after:0,t:"<i>Elle remet sa tête droite.</i> Pika pika ! Je suis un vrai Pikachu, tu vois bien. Il n'y a rien dessous. Rien du tout."},
    reform:{"déguisement":"« Tu n'as pas besoin de ressembler à quelqu'un pour être aimée. »","câlin":"« Ce câlin était pour toi. Pas pour le costume. »","dessous":"« Ce qu'il y a dessous, c'est toi. Et toi, tu ne fais pas peur. »"},
    essGood:"<i>Elle boit par le trou du costume, avec une paille, et sa tête de chiffon se redresse toute seule.</i> …C'est doux. On dirait le câlin, en verre.",
    essBad:"<i>Le costume se froisse, et elle disparaît sous la table.</i> Trop… Pika. Pika pas.",
    frags:[{n:"Le câlin d'un enfant qui la prenait pour la mascotte",e:"joie"},{n:"La tête de chiffon qui tombe, et le cri",e:"peur"}],
    thanks:"<i>Elle trottine jusqu'à la porte, la tête de chiffon bien droite, et se retourne.</i> À la fête, il y aura un concours de déguisements. Je vais m'inscrire. Pas en Pikachu. En Mimiqui déguisée en Pikachu. C'est pas pareil. Et si on me fait un câlin… je le garderai pour moi.",
    gift:{key:"chiffon",n:"Tête de Chiffon de Mimiqui",i:"🎭",d:"Le premier coup que reçoit le client à chaque combat est annulé (Déguisement)",fx:{combatStart(C){ C.disguise=true; }}},
    staff:{n:"Mascotte",d:"Les âmes qui viennent pour la première fois arrivent avec 1 Tension de moins",wage:15},
    staffFx:{arrive(c){ if(S.clients[c.k] && S.clients[c.k].visits<=1) c.ten--; }},
    cogHint:"Elle a très peur qu'on regarde sous son costume : ne la brusque pas. Une Gelée Rose, et du très doux : Lait Meumeu, Baie Pêcha, Cœur Sucré.",
    map:mapStd({a:"Sous la table",b:"Le costume rapiécé",h:"Les yeux qui regardent dessous",c:"Les affiches de la mascotte",i:"Le câlin d'un enfant",d:"Le carton où elle dort",j:"La tête de chiffon qui tombe",k:"Le fil et l'aiguille, la nuit",l:"Le concours de déguisements",f:"Le cri de la mère",g:"Le jour où elle a cousu le costume"},{eb:"tristesse",eh:"peur",ej:"peur",ef:"peur",key:"joie",foe:{id:25,n:"Pikachu"}})
};
TALK.mimiqui = [
    {t:"<i>Sous la table, elle dessine un Pikachu sur un sous-verre. Il est très réussi. Bien plus que son costume.</i> …Je dessine mieux que je couds."},
    {t:"<i>Elle aspire le Lait Meumeu par sa paille, tout doucement.</i> Le lait, c'est ce qu'on donne aux bébés. Personne n'a jamais peur d'un bébé.",like:"lait"},
    {t:"<i>Elle serre le Cœur Sucré contre son costume.</i> Un cœur. Pour moi ? Pour moi-moi, ou pour le Pikachu ? …Pour moi-moi ? D'accord.",like:"coeursucre"}
];
WIPE.mimiqui = ["<i>Une petite patte d'ombre sort de sous la table, prend un verre, l'essuie avec le bout du costume, et le repose. Sans un mot.</i>","<i>Elle te regarde essuyer, la tête de chiffon penchée. Tu ne regardes pas dessous. Elle se rapproche d'un pas.</i>"];
LETTERS.mimiqui = "« J'ai gagné le deuxième prix du concours de déguisements. Le premier, c'était un Ronflex déguisé en montagne. Trois enfants m'ont fait un câlin. Aucun n'est tombé malade. Je crois que c'était une légende. — M. »";
REGULARS.mimiqui = {order:{base:"lait",add:["pecha"]},
    line:"<i>Elle entre par la porte, pas par la fenêtre, et s'assoit sur le tabouret. Pas dessous.</i> Bonjour ! Un lait à la Baie Pêcha, s'il te plaît. Avec une paille. Pika !",
    ok:"<i>Elle boit, et balance les pieds.</i> Les enfants de l'école m'appellent « la Pikachu bizarre ». Ils disent ça gentiment. Ils me gardent une place à la cantine.",
    ko:"<i>La tête de chiffon penche un peu.</i> Pas tout à fait… Mais je reste quand même. Je ne me cache plus sous la table."};
ROOM_SAY.mimiqui = {a:"Sous la table. On voit les pieds de tout le monde. Personne ne voit les miens.",b:"Le costume. Rapiécé cent fois. C'est ma peau, maintenant.",h:"Des yeux. Partout. Qui veulent voir dessous.",c:"Les affiches. Pikachu sourit. Tout le monde l'aime. Lui.",i:"Un enfant me serre dans ses bras. Il croit que je suis la mascotte. Je ne bouge pas. Surtout ne pas bouger.",d:"Le carton où je dors. Avec le costume. Toujours.",j:"Ma tête de chiffon tombe. Tout s'arrête.",k:"Le fil et l'aiguille, la nuit. Je recouds ce qui s'est déchiré.",l:"Le concours de déguisements. Tout le monde est déguisé. Personne n'est bizarre.",f:"Le cri de la mère. Je l'entends encore.",g:"Le jour où j'ai cousu le costume, pour qu'on m'aime."};
ROOM_KW.mimiqui = {b:"déguisement",i:"câlin",j:"dessous"};
BOSS.mimiqui = {id:778,n:"Ombre sous le costume",self:true};
LEGEND_CARD.mimiqui = "calinvrai";
CLIENT_CARD.mimiqui = "ombreportee";
CARDS.ombreportee = {n:"Ombre Portée",c:1,t:"atk",dmg:6,weak:1,r:"client",i:"🎭",from:"mimiqui",d:"6 dégâts, l'ombre est Faible 1."};
CARDS.calinvrai = {n:"Le Câlin Gardé",c:1,t:"skill",heal:6,block:10,retain:true,r:"legende",i:"🎭",from:"mimiqui",d:"Soigne 6 PV, 10 de Bouclier. Retenue. Celui-là, elle le garde pour elle."};

// =====================================================================
// MIAOUSS  (miaouss) — le patron ruiné du Pourboire d'Or
// =====================================================================
CL.miaouss = {
    season:8,from:3,id:52,n:"Miaouss",c:"#e8d098",family:"Solitude",wound:"combat",likesEss:["normal"],comfort:["lait","miel","the","mago","pommesucree"],dislike:["liqueur","poudre","superbonbon"],tol:2,
    intro:"La porte s'ouvre sur la pluie. Miaouss, trempé, sans sa pièce d'or, sans sa veste. De l'autre côté de la rue, l'enseigne du Pourboire d'Or est éteinte, une planche clouée en travers de la porte. Il reste longtemps sur le seuil, comme s'il attendait qu'on le chasse.",
    arrive:"<i>Il s'assoit au bout du comptoir, la tête basse.</i> Je n'ai pas d'argent, voisin. Pour une fois. Tu peux me mettre dehors, je comprendrais. Moi, je l'aurais fait.",
    hints:["Il porte autour du cou un ruban sale où pendait sa pièce. Il ne reste que le ruban.","Il regarde ton verre de lait avec une drôle d'envie, puis détourne les yeux, comme s'il avait honte.","Il sursaute chaque fois qu'il entend une pièce tomber, n'importe où."],
    onArrive(c){ if(S.miaouss && S.miaouss.aff>=3) c.ouv++; if(S.miaouss && S.miaouss.aff>=5) c.ten--; },
    stages:[
      {req:0,t:"<i>Il touche le ruban vide.</i> Ma pièce. Je l'ai trouvée dans le caniveau quand j'avais six mois. Je me suis dit : avec ça, plus jamais faim. J'ai eu raison pendant des années. Et puis la pièce, je l'ai vendue, la semaine dernière. Pour payer le banquier. Ça n'a pas suffi.",kw:"pièce"},
      {req:2,t:"<i>Sa voix baisse.</i> J'ai grandi dans la rue, derrière le marché. L'hiver, on dort dans les cartons. On vole. On mord. Tout le monde est seul, dans la rue. J'ai appris qu'il n'y a que l'argent qui ne part pas. Les gens, eux, partent toujours.",kw:"rue"},
      {req:3,t:"<i>Il regarde le lait, enfin.</i> Sauf une. Une vieille dame, près du marché. Elle me laissait un bol de lait chaud sur sa fenêtre, chaque soir. Elle ne demandait rien. Un hiver, la fenêtre est restée fermée. Je ne suis jamais allé frapper. J'avais trop peur d'apprendre pourquoi. Après, j'ai décidé que je ne dépendrais plus jamais de la gentillesse de personne. J'ai tout acheté. Même les amis. Persian est parti avec la caisse.",kw:"vieille dame"},
      {req:4,t:"<i>Il prend le verre de lait, à deux pattes, comme un chaton.</i> Le Pourboire d'Or, c'était pour qu'on ait besoin de moi. Ta taverne, c'est l'inverse. Tu donnes, et les gens reviennent quand même. …Je crois que je viens de comprendre ce que la vieille dame essayait de m'apprendre."}
    ],
    lie:{after:0,t:"<i>Il bombe le torse, et tousse.</i> La faillite ? Une stratégie, voisin. Je rachète tout le quartier le mois prochain. Tu verras. Je n'ai besoin de personne."},
    reform:{"pièce":"« Tu valais plus que ta pièce. Bien plus. »","rue":"« Dans la rue, tu étais seul. Ici, tu ne l'es pas. »","vieille dame":"« Elle t'a donné sans rien demander. C'était de l'amour, pas une dette. »"},
    essGood:"<i>Il boit, et ses moustaches se détendent.</i> C'est… chaud. Comme le bol, sur la fenêtre. Tu ne me feras pas pleurer, voisin. …Presque.",
    essBad:"<i>Il repousse le verre, les griffes sorties.</i> C'est ce que je servais, moi. Fort, pour oublier. Je ne veux plus oublier.",
    frags:[{n:"Le bol de lait chaud sur la fenêtre de la vieille dame",e:"nostalgie"},{n:"La pièce d'or trouvée dans le caniveau",e:"joie"}],
    thanks:"<i>Il se lève, s'étire, et pour la première fois, il ne fait pas tinter de pièce.</i> Je vais rouvrir. Pas le Pourboire d'Or. Une petite fenêtre, derrière le marché. Avec des bols de lait chaud, le soir, pour les chatons de la rue. Gratuit. Si quelqu'un se moque de moi, je dirai que c'est une idée de mon voisin.",
    gift:{key:"rubanor",n:"Ruban de Miaouss",i:"🪙",d:"Au premier tour de chaque combat, le client a 1 énergie de plus",fx:{turnStart(C){ if(C.turn===1){ C.energy++; C.emax++; } }}},
    staff:{n:"Ancien rival",d:"Le Pourboire d'Or est fermé pour de bon. Les âmes de la Solitude arrivent avec +1 Ouverture",wage:10},
    staffFx:{arrive(c,d){ if(d.family==="Solitude") c.ouv++; }},
    cogHint:"Il a l'habitude du fort, mais il n'en veut plus. Une Gelée Blanche, et du lait chaud, comme la vieille dame : Lait Meumeu, Miel, Pomme Sucrée. Si tu l'as écouté les nuits où il passait narguer la taverne, il arrivera déjà un peu ouvert.",
    map:mapStd({a:"Le Pourboire d'Or éteint",b:"La pièce dans le caniveau",h:"Le banquier qui compte",c:"La ruelle derrière le marché",i:"Le bol de lait sur la fenêtre",d:"Le carton de l'hiver",j:"Persian qui part avec la caisse",k:"La vieille dame qui ne demandait rien",l:"La petite fenêtre aux bols de lait",f:"La fenêtre restée fermée",g:"Le jour où il a décidé de tout acheter"},{eb:"tristesse",eh:"peur",ej:"colere",ef:"tristesse",key:"nostalgie",foe:{id:53,n:"Persian"}})
};
TALK.miaouss = [
    {t:"<i>Il regarde son ancien palais par la fenêtre.</i> Tu sais ce qu'il y avait, sous le tapis rouge ? Un plancher pourri. Comme tout le reste. J'ai tout doré par-dessus. Ça tient un temps."},
    {t:"<i>Il lape le lait, en vitesse, puis s'essuie les moustaches, gêné.</i> Personne ne m'a vu. On est d'accord, voisin ?",like:"lait"},
    {t:"<i>Il croque une Pomme Sucrée.</i> Elle en mettait dans le lait, parfois. Une rondelle. Je croyais que c'était un luxe. C'était juste sa façon de dire bonsoir.",like:"pommesucree"}
];
WIPE.miaouss = ["<i>Il calcule à voix basse combien tu gagnes par verre. Puis il arrête. « Ce n'est pas la question, hein ? »</i>","<i>Il prend un torchon sans rien dire et essuie à côté de toi. Il essuie très bien. Il a été plongeur, avant d'être riche.</i>"];
LETTERS.miaouss = "« La fenêtre derrière le marché : quatorze chatons le premier soir, trente le troisième. Ça me coûte une fortune en lait. Je n'ai jamais été aussi pauvre ni aussi peu seul. Chaglam vient m'aider. Elle me traite de vieux grigou. Je crois que c'est affectueux. — Miaouss, ton voisin »";
REGULARS.miaouss = {order:{base:"lait",add:["miel"]},
    line:"<i>Il entre avec un chaton accroché à la queue.</i> Salut, voisin. Un lait au miel. Et un petit, pour celui-là. Il me suit partout. Je n'ai pas réussi à le décrocher. Je n'ai pas vraiment essayé.",
    ok:"<i>Il boit, le chaton endormi sur la tête.</i> Le banquier m'a proposé un prêt pour rouvrir le Pourboire d'Or. J'ai dit non. Tu te rends compte ? Moi, dire non à de l'argent.",
    ko:"<i>Il fronce les moustaches.</i> Pas le bon. Mais je ne vais pas te faire une scène. Je ne fais plus de scènes. Presque plus."};
ROOM_SAY.miaouss = {a:"Mon palais. Éteint. Une planche clouée en travers de la porte.",b:"La pièce, dans le caniveau. Elle brillait. J'avais six mois.",h:"Le banquier compte. Et recompte. Il ne me regarde pas, il regarde les chiffres.",c:"La ruelle derrière le marché. Il fait froid. On dort dans les cartons.",i:"Un bol de lait chaud, sur une fenêtre. Personne autour. Pour moi ?",d:"Le carton de l'hiver. Je me roulais en boule. Seul.",j:"Persian part avec la caisse. Il ne se retourne pas. Moi non plus, je ne me serais pas retourné.",k:"La vieille dame. Elle ne m'a jamais demandé de payer.",l:"Une petite fenêtre, avec des bols. Des chatons partout.",f:"La fenêtre est restée fermée. Je ne suis jamais allé frapper.",g:"Le jour où j'ai décidé de tout acheter, pour ne plus jamais dépendre de personne."};
ROOM_KW.miaouss = {b:"pièce",c:"rue",k:"vieille dame"};
BOSS.miaouss = {id:52,n:"Ombre du Pourboire d'Or",self:true};
LEGEND_CARD.miaouss = "bolchaud";
CLIENT_CARD.miaouss = "jackpot";
CARDS.jackpot = {n:"Jackpot",c:1,t:"atk",dmg:4,hits:2,r:"client",i:"🪙",from:"miaouss"};
CARDS.bolchaud = {n:"Le Bol sur la Fenêtre",c:0,t:"skill",heal:7,block:5,draw:1,exhaust:true,r:"legende",i:"🪙",from:"miaouss",d:"Soigne 7 PV, 5 de Bouclier, pioche 1. Épuisée. Donné sans rien demander."};

// =====================================================================
// HO-OH — Grand Regret du chapitre 4 (finale de la saison 8)
// =====================================================================
CARDS.arcenciel = {n:"Plume Arc-en-ciel",c:2,t:"skill",heal:15,block:12,str:2,retain:true,r:"legende",i:"🌈",from:"hooh",d:"Soigne 15 PV, 12 de Bouclier, +2 Force. Retenue. Le ciel de la fête, en entier."};
