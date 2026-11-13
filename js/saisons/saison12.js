// Saison 12 · Chapitre 6 « Les premiers pas » (fin du chapitre)
// Famille : le Seuil. Hector avoue : pour ne pas disparaître, il a nourri la Faille d'âmes égarées.
// Le dernier Grand Écho est le donjon d'Hector : il y descend lui-même avec le Tenancier, à la place du co-gérant.
// Images Gemini à faire : voir GEMINI.md (décor générique en attendant).

// =====================================================================
// MORDUDOR  (mordudor)
// =====================================================================
CL.mordudor = {
    season:12,from:1,id:999,n:"Mordudor",c:"#c8a050",family:"Seuil",wound:"combat",likesEss:["normal"],comfort:["lait","miel","craquiroc","sable","grochampi"],dislike:["liqueur","poudre","soda"],tol:3,
    intro:"Un petit coffre en bois entre tout seul, en sautillant sur le plancher. Il s'arrête devant le comptoir. Le couvercle s'entrouvre de deux doigts, et deux yeux jaunes regardent la salle. Mordudor. Il ne sort pas. Il ne sort jamais.",
    arrive:"<i>Une petite voix sèche, depuis l'intérieur du coffre.</i> Je paie en pièces. J'en ai plein, dedans. Un verre, posé devant le coffre, s'il te plaît. Je ne sors pas. Dehors, les gens prennent les pièces. Et après, ils s'en vont.",
    hints:["Le coffre est couvert d'autocollants de villes lointaines, très vieux. Il a voyagé, autrefois. Ou quelqu'un l'a fait voyager.","Il compte ses pièces à voix basse, encore et encore, même quand il parle.","Par la fente du couvercle, on voit une petite patte qui se tend vers la fenêtre, puis qui se retire."],
    stages:[
      {req:0,t:"<i>Le couvercle s'ouvre d'un doigt de plus.</i> Les Mordudor gardent des coffres. C'est ce qu'on fait. On reste dedans, on garde les pièces, et on ne bouge plus. Mes cousins, eux, se promènent avec une pièce sur le dos. Moi, je suis un Mordudor de coffre. Ce n'est pas pareil.",kw:"coffre"},
      {req:2,t:"<i>Il fait tinter une pièce.</i> J'appartenais à un marchand ambulant. Il m'emmenait partout. Les autocollants, c'est lui. Un jour, il a vendu tout le contenu du coffre, et il est parti avec l'argent, en me laissant au bord d'une route. Depuis, je ne laisse plus personne approcher des pièces. Ni de moi.",kw:"pièces"},
      {req:3,t:"<i>Sa voix tremble, sous le couvercle.</i> Les pièces, ce n'était pas ça que j'aimais. C'était la route. Les villes, les marchés, le vent sur le coffre. Mais si je sors pour marcher seul, je n'aurai plus de coffre pour me cacher. Et si quelqu'un me reprend tout encore une fois ?",kw:"voyage"},
      {req:4,t:"<i>Le couvercle s'ouvre en grand. Mordudor saute hors du coffre, une seule pièce sur le dos, comme ses cousins.</i> Une pièce. Juste une. Le reste, je te le laisse, pour la taverne. Le coffre aussi. Je pars sur la route. Si on me prend ma pièce, tant pis : j'en trouverai une autre. Les routes en sont pleines."}
    ],
    lie:{after:0,t:"<i>Le couvercle claque.</i> Je n'ai besoin de rien ni de personne. J'ai mes pièces. Ça suffit. Ça a toujours suffi."},
    reform:{"coffre":"« Tu peux garder ton coffre et sortir quand même. Il t'attendra. »","pièces":"« Ce n'est pas toi qu'il a vendu. C'est ce qu'il y avait dedans. »","voyage":"« La route, c'est toi qui l'aimais. Elle est encore là. »"},
    essGood:"<i>Il tire le verre dans le coffre avec une patte, et on l'entend boire.</i> …Bon. Très bon. Je paie double.",
    essBad:"<i>Le couvercle claque.</i> Non. Je le savais. Dehors, tout est trop fort.",
    frags:[{n:"Le vent sur le coffre, à l'arrière de la charrette du marchand",e:"joie"},{n:"Le bord de la route, le coffre vide",e:"tristesse"}],
    thanks:"<i>Il fait tinter sa pièce sur son dos, et sautille vers la porte.</i> Je laisse le coffre sous ta table. Si un jour quelqu'un a besoin de se cacher un peu, il peut l'emprunter. Mais pas trop longtemps. Le monde est plus grand qu'un coffre.",
    gift:{key:"pieceroute",n:"Pièce de Route de Mordudor",i:"🪙",d:"Au début de chaque combat, le client gagne 1 de Force et renvoie 2 dégâts à chaque coup reçu (Épines 2)",fx:{combatStart(C){ C.str+=1; C.thorns=(C.thorns||0)+2; }}},
    staff:{n:"Trésorier",d:"+20 ₽ par nuit, quoi qu'il arrive",wage:0},
    staffFx:{arrive(c){ if(U.night && U.night.idx===0 && !U.night.mordudorPaid){ U.night.mordudorPaid=true; S.money+=20; } }},
    cogHint:"Il se méfie de tout le monde et a peur qu'on le dépouille : du simple, du solide, rien d'extravagant. Une Gelée Orange pour le courage de sortir du coffre, et du réconfortant : Lait Meumeu, Miel, Craquiroc.",
    map:mapStd({a:"Le coffre fermé",b:"Les pièces qu'on compte",h:"Les mains qui prennent",c:"La charrette du marchand",i:"Le vent sur le coffre",d:"Le fond du coffre",j:"Le marchand qui s'en va",k:"Les autocollants des villes",l:"La route au matin",f:"Le bord de la route",g:"Le jour où le coffre s'est refermé"},{eb:"peur",eh:"peur",ej:"colere",ef:"tristesse",key:"joie"})
};
TALK.mordudor = [
    {t:"<i>Il compte à voix haute.</i> Trois cent douze, trois cent treize… Tu veux savoir combien j'en ai ? Non. Personne ne doit savoir. …Trois cent quatorze."},
    {t:"<i>On l'entend laper le lait dans le coffre.</i> Le marchand m'en donnait le dimanche. On s'arrêtait près des fermes. Il disait que j'étais son associé.",like:"lait"},
    {t:"<i>Il croque un Craquiroc dans le coffre. Ça résonne.</i> Ça craque comme une roue de charrette sur les cailloux. J'aime bien ce bruit. Il veut dire qu'on avance.",like:"craquiroc"}
];
WIPE.mordudor = ["<i>Le coffre se rapproche de toi en sautillant pendant que tu essuies. Juste un peu.</i>","<i>Une petite patte sort du coffre et pose une pièce sur le comptoir. « Pour le torchon. » Tu ne demandes pas ce que ça veut dire.</i>"];
LETTERS.mordudor = "« Trois villes, deux marchés, une fête foraine. On m'a pris ma pièce deux fois. J'en ai trouvé deux autres. J'ai un ami, un Miaouss de la ville d'à côté, qui a une pièce sur le front. On compare. — M. »";
REGULARS.mordudor = {order:{base:"lait",add:["craquiroc"]},
    line:"<i>Il entre en sautillant, sa pièce sur le dos, de la poussière de route sur les pattes.</i> Salut ! Un lait et un Craquiroc. Je reste une nuit, et je repars. J'ai vu la mer, la semaine dernière.",
    ok:"<i>Il boit en racontant ses routes.</i> J'ai croisé le marchand ambulant, sur un marché. Il était vieux. Il m'a reconnu. Il a pleuré. Je lui ai donné ma pièce. J'en ai trouvé une autre le soir même.",
    ko:"<i>Il hausse les épaules.</i> Pas tout à fait. Mais je ne retourne plus dans le coffre pour si peu."};
ROOM_SAY.mordudor = {a:"Le coffre. Fermé. Noir. Sûr.",b:"Mes pièces. Je les compte. Trois cent quatorze. Toujours.",h:"Des mains. Elles prennent. Elles prennent toujours.",c:"La charrette du marchand. Le coffre bringuebale à l'arrière.",i:"Le vent sur le coffre. Les villes qui passent. J'aimais ça.",d:"Le fond du coffre. Il sent le bois et le métal.",j:"Le marchand s'en va avec l'argent. Il ne se retourne pas.",k:"Les autocollants. Chaque ville. Chaque route.",l:"La route au matin. Une pièce sur le dos. Rien d'autre.",f:"Le bord de la route. Le coffre est vide. Moi, je suis dedans.",g:"Le jour où j'ai refermé le couvercle pour toujours."};
ROOM_KW.mordudor = {a:"coffre",b:"pièces",i:"voyage"};
BOSS.mordudor = {id:999,n:"Ombre du coffre",self:true};
LEGEND_CARD.mordudor = "unepiece";
CLIENT_CARD.mordudor = "piecejetee";
CARDS.piecejetee = {n:"Lancer de Pièces",c:1,t:"atk",dmg:3,hits:3,r:"client",i:"🪙",from:"mordudor"};
CARDS.unepiece = {n:"Une Seule Pièce",c:1,t:"atk",dmg:10,block:6,draw:1,r:"legende",i:"🪙",from:"mordudor",d:"10 dégâts, 6 de Bouclier, pioche 1. Le monde est plus grand qu'un coffre."};

// =====================================================================
// ZARBI  (zarbi)
// =====================================================================
CL.zarbi = {
    season:12,from:2,id:201,n:"Zarbi",c:"#404040",family:"Seuil",wound:"psy",likesEss:["eau"],comfort:["the","miel","pecha","jusbaie","chantilly"],dislike:["soda","limonade","poudre"],tol:2,
    quiet:true,
    intro:"Une petite forme noire flotte par la fenêtre, comme une lettre tombée d'un livre. Zarbi. Un seul œil, un corps tordu en forme de point d'interrogation. Il se pose sur le bord du comptoir et ne bouge plus, comme un signe oublié sur une page blanche.",
    arrive:"<i>Il ne parle pas. Il penche son corps, un peu plus courbé, comme une question. Puis, très bas, un murmure qui ressemble à du papier qu'on froisse.</i> …?",
    hints:["Quand tu lui parles, son corps change légèrement de forme, comme s'il essayait de devenir une autre lettre, puis redevient un point d'interrogation.","Il regarde les mots écrits sur l'ardoise de la taverne avec une envie immense.","Dehors, on voit parfois passer d'autres Zarbi, en groupe, qui forment des mots en flottant ensemble. Lui reste seul."],
    stages:[
      {req:0,t:"<i>Des lettres apparaissent dans la buée de son verre, une à une, tracées par son œil.</i> JE SUIS UN POINT D'INTERROGATION. LES AUTRES SONT DES LETTRES. A, B, C. ILS SE METTENT ENSEMBLE ET ILS FONT DES MOTS. MOI, JE NE SUIS PAS UNE LETTRE.",kw:"lettre"},
      {req:2,t:"<i>La buée s'efface, puis de nouvelles lettres.</i> ILS M'ONT DEMANDÉ DE VENIR AVEC EUX. POUR FAIRE UN MOT. MAIS UN MOT AVEC UN POINT D'INTERROGATION À LA FIN, ÇA DEVIENT UNE QUESTION. J'AI EU PEUR DE GÂCHER LEUR MOT. ALORS JE SUIS RESTÉ À CÔTÉ.",kw:"mot"},
      {req:3,t:"<i>Les lettres tremblent.</i> JE ME DEMANDE TOUJOURS : ET SI JE ME TROMPE ? ET S'ILS NE VEULENT PAS DE MOI ? ET SI CE N'EST PAS LE BON MOMENT ? TOUT EST UNE QUESTION, POUR MOI. ALORS JE NE COMMENCE JAMAIS RIEN. JE SUIS UNE QUESTION QUI ATTEND UNE RÉPONSE QUI NE VIENT PAS.",kw:"question"},
      {req:4,t:"<i>Il trace, très lentement, dans la buée, une phrase entière, et se place lui-même à la fin.</i> « ON Y VA ENSEMBLE » … ? <i>Il regarde la phrase. Il a l'air heureux.</i> UNE QUESTION, ÇA VEUT DIRE QU'ON ATTEND L'AUTRE. C'EST GENTIL, UNE QUESTION."}
    ],
    lie:{after:0,t:"<i>Dans la buée, très vite :</i> JE PRÉFÈRE ÊTRE SEUL. LES MOTS, C'EST SURFAIT. JE N'AI AUCUNE QUESTION."},
    reform:{"lettre":"« Tu n'es pas une lettre. Tu es le signe qui donne envie de répondre. »","mot":"« Un mot qui finit par une question, c'est un mot qui invite. »","question":"« Tu n'as pas besoin de la réponse pour commencer. »"},
    essGood:"<i>Il boit, et son œil se plisse de plaisir. Dans la buée apparaît :</i> MERCI. <i>Puis, après un temps :</i> MERCI ?",
    essBad:"<i>Il se tord, et la buée affiche :</i> !!!",
    frags:[{n:"Les Zarbi qui forment un mot dans le ciel, sans lui",e:"tristesse"},{n:"La première phrase qu'il a écrite dans la buée",e:"joie"}],
    thanks:"<i>Il flotte jusqu'à la fenêtre, où un groupe de Zarbi attend dehors, en forme de mot. Il se place au bout. Le mot devient :</i> RESTE ? <i>Et le groupe repart dans la nuit, avec lui.</i>",
    gift:{key:"pointinterro",n:"Point d'Interrogation de Zarbi",i:"❔",d:"Au début de chaque combat, le client pioche 2 cartes de plus",fx:{draw(C){ return C.turn===1?2:0; }}},
    staff:{n:"Écriteau vivant",d:"Les âmes silencieuses arrivent avec 1 Tension de moins",wage:10},
    staffFx:{arrive(c,d){ if(d.quiet) c.ten--; }},
    cogHint:"Il ne parle pas, il écrit dans la buée : laisse-lui du temps, et un verre chaud pour qu'il y ait de la buée. Une Gelée Rose, et du doux : Thé de Safrania, Miel, Baie Pêcha.",
    map:mapStd({a:"La page blanche",b:"Le point d'interrogation",h:"Les mots qui le refusent",c:"Les ruines aux inscriptions",i:"La première phrase dans la buée",d:"Le coin de la page",j:"Le groupe qui part sans lui",k:"L'alphabet dans le ciel",l:"La phrase qui finit par lui",f:"Toutes les questions sans réponse",g:"Le jour où il est resté à côté"},{eb:"tristesse",eh:"peur",ej:"tristesse",ef:"peur",key:"joie"})
};
TALK.zarbi = [
    {t:"<i>Dans la buée de son verre :</i> TON ACOLYTE A UNE QUESTION SUR LE VISAGE. TOUT LE TEMPS. C'EST POUR ÇA QUE JE L'AIME BIEN."},
    {t:"<i>Il boit le thé, et la buée s'épaissit.</i> BEAUCOUP DE BUÉE. BEAUCOUP DE PLACE POUR ÉCRIRE. LE THÉ, C'EST LE MEILLEUR PAPIER.",like:"the"},
    {t:"<i>Il plonge son œil dans la Crème Chantilly.</i> C'EST BLANC COMME UNE PAGE. ET C'EST SUCRÉ. UNE PAGE SUCRÉE. ?",like:"chantilly"}
];
WIPE.zarbi = ["<i>Il suit ton torchon des yeux. Dans la buée d'un verre propre, il écrit : BRILLANT.</i>","<i>Il se pose sur une étagère, entre deux verres, et ressemble à une petite ponctuation de la taverne.</i>"];
LETTERS.zarbi = "« NOUS AVONS ÉCRIT UN MOT DANS LE CIEL AU-DESSUS DE LA FÊTE. TOUT LE VILLAGE L'A LU. C'ÉTAIT : MERCI ? LES GENS ONT RÉPONDU : DE RIEN ! C'EST LA PREMIÈRE FOIS QU'ON ME RÉPOND. — ? »";
REGULARS.zarbi = {order:{base:"the",add:["pecha"]},
    line:"<i>Il entre avec deux autres Zarbi, un A et un H. Ensemble, ils forment :</i> AH ? <i>Puis lui, seul, dans la buée :</i> UN THÉ À LA PÊCHA, S'IL TE PLAÎT.",
    ok:"<i>Dans la buée :</i> CETTE SEMAINE, ON A FORMÉ « POURQUOI », « QUAND » ET « ENCORE ». JE SUIS DANS TOUTES LES PHRASES, MAINTENANT.",
    ko:"<i>Dans la buée :</i> PAS TOUT À FAIT. MAIS CE N'EST PAS GRAVE ?"};
ROOM_SAY.zarbi = {a:"Une page blanche. Je suis seul dessus. Un petit signe tordu.",b:"Moi. Une courbe et un point. Une question.",h:"Les mots. Ils sont complets sans moi.",c:"Des ruines, couvertes d'inscriptions. Mes cousins y dorment, en phrases.",i:"Ma première phrase. Dans la buée. Elle finit par moi.",d:"Le coin de la page. On n'y écrit jamais rien.",j:"Le groupe part. Ils forment un mot. Je reste à côté.",k:"Un alphabet entier dans le ciel. A, B, C… et pas de place pour moi.",l:"Une phrase qui finit par moi. Elle attend une réponse.",f:"Toutes les questions que je ne pose pas.",g:"Le jour où je suis resté à côté, pour ne pas gâcher leur mot."};
ROOM_KW.zarbi = {k:"lettre",j:"mot",b:"question"};
BOSS.zarbi = {id:201,n:"Ombre du point d'interrogation",self:true};
LEGEND_CARD.zarbi = "onyvaensemble";
CLIENT_CARD.zarbi = "puissancecachee";
CARDS.puissancecachee = {n:"Puissance Cachée",c:1,t:"atk",dmg:5,draw:2,r:"client",i:"❔",from:"zarbi",d:"5 dégâts, pioche 2."};
CARDS.onyvaensemble = {n:"On Y Va Ensemble ?",c:1,t:"skill",block:8,draw:2,energy:1,retain:true,r:"legende",i:"❔",from:"zarbi",d:"8 de Bouclier, pioche 2, +1 énergie. Retenue. Une question, ça veut dire qu'on attend l'autre."};

// =====================================================================
// ÉVOLI  (evoli)
// =====================================================================
CL.evoli = {
    season:12,from:3,id:133,n:"Évoli",fem:true,c:"#c89058",family:"Seuil",wound:"normal",likesEss:["feu"],comfort:["lait","miel","mago","pommenectar","chantilly"],dislike:["superbonbon","liqueur","soda"],tol:3,
    intro:"Évoli entre en tirant derrière elle un petit sac de toile, bien trop lourd pour elle. Elle s'installe au comptoir, ouvre le sac, et aligne devant elle des pierres : une rouge, une bleue, une jaune, une verte, une blanche… Elle les regarde une par une, sans en toucher aucune.",
    arrive:"<i>Elle soupire, les oreilles basses.</i> Bonsoir… Un lait, s'il vous plaît. Ne faites pas attention aux pierres. Ce sont toutes les Évoli que je pourrais devenir. Je n'arrive pas à choisir. Ça fait deux ans.",
    hints:["Elle a rangé les pierres dans un ordre très précis, et elle les réarrange chaque fois qu'elle hésite.","Ses frères et sœurs de portée ont tous évolué. Elle porte leurs photos dans une petite pochette : Pyroli, Aquali, Voltali, Mentali, Noctali, Phyllali…","Quand elle touche presque une pierre, elle retire la patte comme si elle s'était brûlée."],
    stages:[
      {req:0,t:"<i>Elle pousse la pierre rouge du bout du nez.</i> Pyroli, Aquali, Voltali, Phyllali, Givrali… Toutes ces vies possibles. Mes frères et sœurs ont choisi en une semaine. Moi, chaque fois que je tends la patte vers une pierre, je pense à toutes celles que je n'aurai jamais.",kw:"pierre"},
      {req:2,t:"<i>Elle sort les photos de sa portée.</i> Ma sœur est devenue Aquali. Elle nage dans le lac et elle est heureuse. Mon frère, Pyroli. Il est le plus fort de la ville. Si je deviens Aquali, je ne serai jamais forte. Si je deviens Pyroli, je ne nagerai jamais. Choisir, c'est perdre tout le reste.",kw:"choix"},
      {req:3,t:"<i>Sa voix tremble.</i> Alors je reste Évoli. Tant que je ne choisis pas, je peux encore tout devenir. Toutes les portes sont ouvertes. Mais je ne passe par aucune. Je reste dans le couloir, avec mes pierres, pendant que les autres vivent leur vie dans les pièces.",kw:"porte"},
      {req:4,t:"<i>Elle range toutes les pierres dans le sac, sauf aucune, et referme le sac.</i> Vous savez quoi ? Je ne vais pas choisir de pierre ce soir. Je vais choisir autre chose : demain, j'irai au lac avec ma sœur. Et le jour d'après, en ville avec mon frère. Je choisirai une journée à la fois. La pierre viendra quand elle viendra. Ou pas. Évoli, c'est déjà quelqu'un."}
    ],
    lie:{after:0,t:"<i>Elle sourit, trop vite.</i> Oh, je choisirai bientôt ! Demain, sûrement. C'est juste que je veux être sûre. Je suis presque sûre."},
    reform:{"pierre":"« Chaque pierre, c'est une vie. Mais toi, tu en as déjà une. »","choix":"« Choisir, ce n'est pas perdre. C'est commencer quelque chose. »","porte":"« Tu peux passer une porte et revenir dans le couloir. Elles ne se ferment pas toutes. »"},
    essGood:"<i>Elle boit, et sa queue s'agite enfin.</i> Oh… C'est bon. Je n'ai même pas hésité avant de boire. C'est un début.",
    essBad:"<i>Elle repousse le verre.</i> Trop… Je ne sais plus quoi penser, maintenant.",
    frags:[{n:"La portée réunie, avant que chacun choisisse sa pierre",e:"nostalgie"},{n:"Sa sœur Aquali qui l'éclabousse au lac",e:"joie"}],
    thanks:"<i>Elle hisse le sac sur son dos, et sourit.</i> Je laisse une pierre ici, au hasard, sans regarder. Si un jour je reviens et que j'ai envie de la prendre, ce sera la bonne. Et si je n'en ai jamais envie, ce sera la bonne aussi.",
    gift:{key:"sacpierres",n:"Sac de Pierres d'Évoli",i:"💎",d:"Au début de chaque combat, le client gagne 1 de Force, 1 d'Élan et 4 de Bouclier",fx:{combatStart(C){ C.str+=1; C.elan=(C.elan||0)+1; C.blockNext=(C.blockNext||0)+4; }}},
    staff:{n:"Mille possibles",d:"Les âmes du Seuil arrivent avec +1 Ouverture",wage:15},
    staffFx:{arrive(c,d){ if(d.family==="Seuil") c.ouv++; }},
    cogHint:"Elle hésite sur tout : ne lui propose pas de choix compliqué, sers-lui quelque chose de sûr et chaleureux. Une Gelée Blanche, et du doux : Lait Meumeu, Miel, Baie Mago.",
    map:mapStd({a:"Le couloir aux portes",b:"Les pierres alignées",h:"Toutes les vies perdues",c:"La portée réunie",i:"Le lac avec sa sœur",d:"Le panier de la portée",j:"Les photos de famille",k:"Les frères et sœurs qui choisissent",l:"Une journée à la fois",f:"Deux ans sans choisir",g:"Le jour où elle a retiré la patte"},{eb:"peur",eh:"tristesse",ej:"tristesse",ef:"peur",key:"joie"})
};
TALK.evoli = [
    {t:"<i>Elle regarde ton Tenancier.</i> Vous, vous avez choisi votre forme, ou vous êtes né comme ça ? <i>Elle écoute la réponse en hochant la tête.</i> Né comme ça. Ça a l'air reposant."},
    {t:"<i>Elle boit son lait, les yeux fermés.</i> Notre maman nous en donnait à tous, dans un grand bol. On se bousculait. C'était avant les pierres.",like:"lait"},
    {t:"<i>Elle goûte la Crème Chantilly, et rit.</i> J'en ai sur le nez. Ma sœur se moquerait. Elle me manque. Je vais aller la voir.",like:"chantilly"}
];
WIPE.evoli = ["<i>Elle regarde ton torchon, puis le verre, puis le torchon. « Vous ne vous demandez jamais quel verre essuyer en premier ? » Tu essuies le plus proche. Elle a l'air impressionnée.</i>","<i>Elle range ses pierres en cercle pendant que tu essuies. Pour une fois, elle ne les réarrange pas.</i>"];
LETTERS.evoli = "« Je suis allée au lac avec ma sœur, en ville avec mon frère, dans les bois avec ma petite sœur Phyllali. Un matin, il a neigé, et je me suis réveillée toute bleue et froide. Givrali. Je n'avais même pas touché de pierre. Je crois que c'est la neige qui m'a choisie. Ça me va. — G. (anciennement É.) »";
REGULARS.evoli = {order:{base:"lait",add:["mago"]},
    line:"<i>Elle entre, et choisit son tabouret en une seconde.</i> Bonsoir ! Un lait à la Baie Mago. Je n'ai pas hésité ! Vous avez vu ?",
    ok:"<i>Elle boit, ravie.</i> J'ai passé la journée au lac. Demain, je ne sais pas encore. C'est ça qui est bien.",
    ko:"<i>Elle sourit.</i> Pas tout à fait. Mais j'avais choisi de venir ce soir, et je suis contente d'être venue."};
ROOM_SAY.evoli = {a:"Un couloir, plein de portes. Toutes ouvertes. Je n'en passe aucune.",b:"Mes pierres, bien alignées. Rouge, bleue, jaune, verte, blanche…",h:"Toutes les vies que je n'aurai pas, si je choisis.",c:"Ma portée, réunie. Avant les pierres. On était tous pareils.",i:"Le lac. Ma sœur m'éclabousse. Je ris.",d:"Le panier de la portée. Chaud. Personne n'avait encore choisi.",j:"Leurs photos. Chacun dans sa vie. Moi dans le couloir.",k:"Ils choisissent leur pierre, un par un, en une semaine.",l:"Une journée à la fois. Une seule. C'est assez.",f:"Deux ans sans choisir. Les autres ont tant vécu.",g:"Le jour où j'ai retiré la patte de la pierre."};
ROOM_KW.evoli = {b:"pierre",k:"choix",a:"porte"};
BOSS.evoli = {id:133,n:"Ombre du couloir aux portes",self:true};
LEGEND_CARD.evoli = "unejournee";
CLIENT_CARD.evoli = "adaptabilite";
CARDS.adaptabilite = {n:"Adaptabilité",c:1,t:"atk",dmg:6,block:4,r:"client",i:"💎",from:"evoli"};
CARDS.unejournee = {n:"Une Journée à la Fois",c:1,t:"skill",block:8,str:1,elan:2,draw:1,r:"legende",i:"💎",from:"evoli",d:"8 de Bouclier, +1 Force, +2 Élan, pioche 1. Évoli, c'est déjà quelqu'un."};

// =====================================================================
// HECTOR — ses 3 cartes, ajoutées au deck du Tenancier pour le dernier Grand Écho (son donjon)
// =====================================================================
CARDS.hectorpardon = {n:"Le Pardon d'Hector",c:1,t:"skill",heal:12,block:12,cleanse:true,retain:true,r:"legende",i:"👻",from:"hector",d:"Soigne 12 PV, 12 de Bouclier, retire Faiblesse, Vulnérabilité et Brûlure. Retenue. « Pardon. À toutes. »"};
CARDS.hectorecoute = {n:"Cent Ans d'Écoute",c:0,t:"skill",draw:3,str:2,energy:1,exhaust:true,r:"legende",i:"👻",from:"hector",d:"Pioche 3, +2 Force, +1 énergie. Épuisée. Cent ans derrière un comptoir, ça apprend à entendre."};
CARDS.hectorservice = {n:"Le Dernier Service",c:2,t:"atk",dmg:14,hits:2,block:10,r:"legende",i:"👻",from:"hector",d:"14 dégâts ×2, 10 de Bouclier. Le dernier verre qu'il sert, il le sert à la Faille."};
CARDS.pactebrise = {n:"Le Pacte Brisé",c:1,t:"atk",dmg:12,block:8,draw:1,str:1,retain:true,r:"legende",i:"🕯️",from:"hector",d:"12 dégâts, 8 de Bouclier, pioche 1, +1 Force. Retenue. Plus aucune âme ne sera donnée à la Faille."};
const HECTOR_CARDS = ["hectorpardon","hectorecoute","hectorservice"];
