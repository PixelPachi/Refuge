// Saison 3 · Chapitre 2 « La saison des pluies »
// Tout ce qui concerne chaque âme de la saison est regroupé ici, client par client.
// (L'ordre d'arrivée est dans CLIENT_ORDER, js/01-base.js ; les images à faire sont dans GEMINI.md.)

// =====================================================================
// OSSELAIT  (osselait)
// =====================================================================
// fiche (histoire, confidences, Labyrinthe)
CL.osselait = {
    season:3,from:1,id:104,n:"Osselait",c:"#c8a878",family:"Perte",wound:"normal",likesEss:["combat"],comfort:["lait","pommesucree","mago","biscuit","jusbaie"],dislike:["soda","poudre","gateau"],tol:1,
    noPity:true,
    intro:"La pluie tambourine sur la porte, puis plus rien. Un petit Osselait entre, trempé, le crâne bien enfoncé sur la tête. Il serre un os contre lui comme un bâton de marche, choisit le tabouret le plus sombre, et pose l'os en travers du comptoir, comme une frontière.",
    arrive:"<i>Il ne relève pas la tête. Le crâne cache tout son visage.</i> Un verre. N'importe lequel. Et ne me demande pas si ça va, je déteste quand on me demande ça.",
    hints:["Quand il croit que personne ne regarde, il touche le crâne du bout des doigts, tout doucement, comme on caresse une joue.","Chaque fois qu'un éclair illumine la salle, il se recroqueville sous le comptoir. Puis il se redresse, vite, comme s'il avait honte.","Des gouttes coulent sous le masque. Ce n'est peut-être pas la pluie."],
    stages:[
      {req:0,t:"<i>Il tapote le crâne.</i> Il est trop grand pour moi. Il glisse quand je cours. Je le porte quand même. Tous les Osselait le portent.",kw:"crâne"},
      {req:2,t:"<i>Il serre son os.</i> C'est le crâne de ma maman. Les Osselait portent le crâne de leur maman. Comme ça, elle est toujours là. C'est ce qu'on dit.",kw:"maman"},
      {req:3,t:"<i>Sa voix se brise sous le masque.</i> Un soir de pluie, il y a eu des cris dans la vallée. Elle s'est mise devant moi. Elle m'a dit de courir et de ne pas me retourner. J'ai couru. Je ne me suis pas retourné. Elle ne m'a jamais rattrapé.",kw:"courir"},
      {req:4,t:"<i>Il fait glisser le crâne et le pose devant lui, sur le comptoir. Son vrai visage est tout petit, tout mouillé.</i> Elle voulait que je vive. C'est ça que je porte, en vrai. Pas le crâne. Je peux l'enlever, parfois. Elle reste quand même."}
    ],
    lie:{after:0,t:"<i>Il bombe le torse sous le crâne trop grand.</i> Je n'ai jamais pleuré. Pas une seule fois. Les guerriers ne pleurent pas."},
    reform:{"crâne":"« Tu peux le porter, et tu peux aussi le poser. Les deux sont permis. »","maman":"« Elle est là dans ce que tu fais, pas seulement sur ta tête. »","courir":"« Tu as fait ce qu'elle t'a demandé. Ce n'était pas l'abandonner. »"},
    essGood:"<i>Il boit à petites gorgées, et ses épaules descendent enfin.</i> C'est… simple. Comme quand elle me préparait du lait chaud avant de dormir.",
    essBad:"<i>Il repousse le verre et se cache sous le crâne.</i> Trop ! Ça fait trop de choses en même temps dans la tête.",
    frags:[{n:"La berceuse que sa mère tapait avec son os",e:"nostalgie"},{n:"Le premier soir où il a enlevé le crâne",e:"joie"}],
    thanks:"<i>Il remet le crâne, mais un peu plus haut, pour qu'on voie ses yeux.</i> Je vais rentrer dans la vallée. Je vais lui faire une tombe, une vraie, avec des fleurs. Et je lui raconterai la taverne.",
    gift:{key:"os",n:"Os d'Osselait",i:"🦴",d:"Au début de chaque combat, l'ombre est Vulnérable 1",fx:{combatStart(C,en){ en.vuln+=1; }}},
    staff:{n:"Gardien du seuil",d:"Les âmes de la Perte arrivent avec +1 Ouverture",wage:20},
    staffFx:{arrive(c,d){ if(d.family==="Perte") c.ouv++; }},
    cogHint:"Il déteste qu'on le plaigne : pas d'Eau Fraîche, il la prend pour de l'aumône. Une seule Gelée Blanche, toute simple, et du réconfortant : Lait Meumeu, Pomme Sucrée, Baie Mago.",
    map:{start:"a",nodes:{
      a:{t:"entree",n:"La vallée sous la pluie",x:50,y:6,nx:["b"]},
      b:{t:"echo",e:"peur",dmg:1,n:"L'orage dans la vallée",x:50,y:18,nx:["c","h"]},
      c:{t:"enigme",need:"nostalgie",n:"La berceuse de l'os",x:28,y:30,nx:["d"]},
      h:{t:"echo",e:"tristesse",dmg:1,n:"Les traces dans la boue",x:74,y:30,nx:["d","i"],art:"b"},
      d:{t:"carrefour",n:"Le cimetière des Ossatueur",x:40,y:44,nx:["e","j"]},
      i:{t:"enigme",need:"joie",n:"Le reflet sans masque",x:86,y:44,nx:["j"],art:"c"},
      e:{t:"sanctuaire",n:"Le terrier tiède",x:15,y:58,nx:["k"]},
      j:{t:"echo",e:"colere",dmg:2,n:"Les cris dans la nuit",x:68,y:58,nx:["f"],art:"b"},
      k:{t:"sanctuaire",n:"La fleur sur la pierre",x:28,y:70,nx:["f"],art:"e"},
      f:{t:"echo",e:"peur",dmg:2,n:"La course sans se retourner",x:50,y:82,nx:["g"],foe:{id:24,n:"Arbok"}},
      g:{t:"coeur",key:"nostalgie",n:"Le soir où elle s'est mise devant lui",x:50,y:94,nx:[]}
    }}
  };
// petites conversations
TALK.osselait = [
    {t:"<i>Il tape trois petits coups avec son os sur le bois du comptoir. Puis trois encore.</i> C'est un rythme. Elle le tapait le soir pour m'endormir. Je ne sais pas pourquoi je fais ça."},
    {t:"<i>Il fixe la tasse de lait chaud qui fume.</i> Le lait chaud, ça se boit lentement. C'est elle qui disait ça. Sinon on se brûle la langue et on fait le malin.",like:"lait"},
    {t:"<i>Il fait rouler une Pomme Sucrée entre ses pattes.</i> Il y avait un pommier près du terrier. On y allait après la pluie. Elle me portait sur ses épaules pour attraper les plus hautes.",like:"pommesucree"}
  ];
// moments au torchon
WIPE.osselait = ["<i>Il regarde le torchon tourner, et ses épaules se détendent un tout petit peu.</i>","<i>Il te tend son os, l'air de rien.</i> Tiens. Tu peux l'essuyer aussi. Elle le faisait, le dimanche."];
// lettre (Cadoizo)
LETTERS.osselait = "« J'ai planté un pommier à côté de sa pierre. Je porte le crâne les jours de pluie, et je l'enlève les jours de soleil. Elle aurait trouvé ça bien. — O. »";
// visite de jour en habitué
REGULARS.osselait = {order:{base:"lait",add:["pommesucree"]},
    line:"<i>Il entre en plein jour, le crâne remonté sur le front, et on voit ses yeux.</i> Bonjour ! Un lait avec une Pomme Sucrée, s'il te plaît. Et ne me demande pas si ça va. …Ça va.",
    ok:"<i>Il boit lentement, sans se brûler la langue.</i> Les petits de la vallée m'appellent « le grand frère ». Je leur apprends à taper le rythme du soir avec un bâton.",
    ko:"<i>Il fronce les sourcils sous le crâne.</i> Ce n'est pas ce que j'ai demandé. Je reviendrai. Les guerriers reviennent toujours."};
// phrases dans les salles
ROOM_SAY.osselait = {a:"La vallée. Il pleut toujours, ici. Il pleuvait ce soir-là aussi.",b:"L'orage… Chaque éclair, c'est comme les cris.",c:"Son rythme. Trois coups, puis trois encore. Il en manque un.",d:"Le cimetière des Ossatueur. Je n'y suis jamais venu. Je n'osais pas.",e:"Notre terrier. Il sent encore un peu comme elle.",f:"Je cours. Je cours et je ne me retourne pas. Comme elle a dit.",g:"Le soir où elle s'est mise devant moi.",h:"Ses traces dans la boue. Elles vont dans l'autre sens que les miennes.",i:"Une flaque. Je me vois dedans, sans le masque. Je ne me reconnais pas.",j:"Les cris… Je les entends encore la nuit.",k:"Une fleur sur une pierre. Quelqu'un est venu avant moi."};
// mots-clés des salles
ROOM_KW.osselait = {b:"crâne",d:"maman",f:"courir"};
// ombre finale
BOSS.osselait = {id:104,n:"Ombre du masque",self:true};
// carte légendaire offerte
LEGEND_CARD.osselait = "osmerang";
// carte offerte
CLIENT_CARD.osselait = "massdos";
// carte « Massd'Os »
CARDS.massdos = {n:"Massd'Os",c:1,t:"atk",dmg:6,vuln:1,r:"client",i:"🦴",from:"osselait"};
// carte « Osmerang »
CARDS.osmerang = {n:"Osmerang",c:2,t:"atk",dmg:8,hits:2,retain:true,r:"legende",i:"🦴",from:"osselait",d:"8 dégâts ×2. Retenue. L'os revient toujours dans sa main."};

// =====================================================================
// LOKHLASS  (lokhlass)
// =====================================================================
// fiche (histoire, confidences, Labyrinthe)
CL.lokhlass = {
    season:3,from:3,id:131,n:"Lokhlass",fem:true,c:"#5890c8",family:"Perte",wound:"eau",likesEss:["psy"],comfort:["the","oran","menthe","miel","sitrus"],dislike:["soda","liqueur","figuy"],tol:2,
    quiet:true,
    intro:"On l'entend avant de la voir : un chant très doux, très grave, qui fait vibrer les verres sur les étagères. La porte s'ouvre sur une grande Lokhlass, la carapace couverte d'algues sèches. Elle se glisse jusqu'à la fenêtre qui donne sur la mer, et se tait.",
    arrive:"<i>Elle parle lentement, comme on parle sous l'eau.</i> Bonsoir, tavernier. Je ne resterai pas longtemps. Je voulais juste… écouter la mer d'un endroit chaud. Si tu as quelque chose de tiède.",
    hints:["Toutes les dix minutes, elle ferme les yeux et tend le cou vers la fenêtre, comme si elle attendait une réponse.","Sa carapace porte de vieilles marques de cordes. Des marques de passagers.","Elle sursaute au moindre tintement de verre, puis s'excuse d'une voix minuscule pour une si grande Pokémon."],
    stages:[
      {req:0,t:"<i>Elle regarde l'horizon gris.</i> Nous étions douze. Un troupeau. On chantait ensemble pour se retrouver dans le brouillard. Chacune sa note.",kw:"troupeau"},
      {req:2,t:"<i>Ses nageoires se replient.</i> Moi, je portais les voyageurs d'une île à l'autre. Les enfants surtout. Ils s'accrochaient à ma carapace et ils riaient dans les vagues.",kw:"passagers"},
      {req:3,t:"<i>Le chant revient, cassé.</i> Le soir de la grande tempête, le troupeau est parti vers le large. Moi, j'avais un petit garçon sur le dos, perdu en mer. Je l'ai ramené au port. Quand je suis revenue, il n'y avait plus personne. Je chante depuis. Personne ne répond.",kw:"tempête"},
      {req:4,t:"<i>Elle chante, et cette fois, elle chante pour la salle entière.</i> J'ai choisi l'enfant. Je choisirais encore l'enfant. Ma note n'est pas perdue parce que personne ne répond. Elle est toujours la mienne."}
    ],
    lie:{after:0,t:"<i>Elle sourit, un peu trop doucement.</i> Oh, ils vont revenir. Les troupeaux reviennent toujours. Il suffit d'attendre au même endroit."},
    reform:{"troupeau":"« Ta place dans ce troupeau existe toujours. Rien ne l'efface. »","passagers":"« Tu as porté tant de vies. C'est ça, ta force. »","tempête":"« Tu as sauvé quelqu'un, cette nuit-là. Tu n'as pas été abandonnée pour ça. »"},
    essGood:"<i>Elle boit, et une note très pure monte de sa gorge, toute seule.</i> Oh… C'est comme une eau calme où on entend loin. Très loin.",
    essBad:"<i>Elle tousse, et les vitres tremblent.</i> Trop d'eau d'un coup… C'est comme la tempête qui recommence.",
    frags:[{n:"Le chant à douze voix dans le brouillard",e:"nostalgie"},{n:"Le rire de l'enfant ramené au port",e:"joie"}],
    thanks:"<i>Elle se lève, et pour la première fois elle tourne le dos à la fenêtre.</i> Je vais reprendre la traversée. Il y a des enfants sur les îles qui ont besoin d'une carapace. Et le soir, je chanterai. Pas pour qu'on me réponde. Pour qu'on m'entende.",
    gift:{key:"conque",n:"Conque de Lokhlass",i:"🎶",d:"Au début de chaque tour, si le client a moins de la moitié de ses PV, il gagne 4 de Bouclier",fx:{turnStart(C,D){ if(D.hp<D.maxhp/2){ C.block+=4; C.log=(C.log?C.log+" · ":"")+"🎶 La Conque de Lokhlass chante : +4 de Bouclier"; } }}},
    staff:{n:"Chant du soir",d:"Les âmes de la Perte arrivent avec 1 Tension de moins",wage:25},
    staffFx:{arrive(c,d){ if(d.family==="Perte") c.ten--; }},
    cogHint:"Elle a l'oreille très fine : n'essuie pas les verres devant elle, le tintement la fait sursauter. Une seule Gelée Bleue, pour la mer calme, et du tiède : Thé de Safrania, Baie Oran, Miel.",
    map:{start:"a",nodes:{
      a:{t:"entree",n:"La baie dans le brouillard",x:50,y:6,nx:["b"]},
      b:{t:"echo",e:"tristesse",dmg:1,n:"Le chant sans réponse",x:50,y:18,nx:["c"]},
      c:{t:"carrefour",n:"Les trois îles",x:50,y:30,nx:["d","h","e"]},
      d:{t:"sanctuaire",n:"La crique abritée",x:15,y:42,nx:["i"]},
      h:{t:"echo",e:"peur",dmg:1,n:"Les vagues qui se lèvent",x:50,y:42,nx:["i","j"],art:"b"},
      e:{t:"enigme",need:"nostalgie",n:"Les douze notes",x:85,y:42,nx:["j"]},
      i:{t:"echo",e:"colere",dmg:1,n:"Le large qui s'éloigne",x:30,y:56,nx:["k"],art:"c"},
      j:{t:"carrefour",n:"Le phare éteint",x:70,y:56,nx:["k","l"],art:"c"},
      k:{t:"sanctuaire",n:"Le port aux lanternes",x:25,y:70,nx:["f"],art:"d"},
      l:{t:"enigme",need:"joie",n:"Le rire de l'enfant",x:75,y:70,nx:["f"],art:"e"},
      f:{t:"echo",e:"peur",dmg:2,n:"La grande tempête",x:50,y:82,nx:["g"],foe:{id:73,n:"Tentacruel"}},
      g:{t:"coeur",key:"joie",n:"Le retour au port vide",x:50,y:94,nx:[]}
    }}
  };
// petites conversations
TALK.lokhlass = [
    {t:"<i>Elle fredonne trois notes, attend, puis secoue doucement la tête.</i> L'habitude. On ne perd pas l'habitude de demander « tu es là ? »."},
    {t:"<i>Elle hume la vapeur d'un thé.</i> Au port, les pêcheurs m'offraient du thé quand je ramenais leurs enfants. Ils disaient que ça réchauffait une carapace.",like:"the"},
    {t:"<i>Elle regarde le bocal de Baies Oran.</i> La couleur de la mer quand le brouillard se lève enfin. On chantait plus fort ces matins-là.",like:"oran"}
  ];
// moments au torchon
WIPE.lokhlass = ["<i>Le verre tinte. Elle ferme les yeux très fort, comme si un orage passait.</i>","<i>Elle tend l'oreille vers la fenêtre, puis vers toi.</i> Plus doucement, s'il te plaît. J'essaie d'entendre la mer."];
// lettre (Cadoizo)
LETTERS.lokhlass = "« Hier soir, au large, quelqu'un a chanté une note qui ressemblait à la mienne. Je ne sais pas si c'était eux. J'ai répondu quand même. — L. »";
// visite de jour en habitué
REGULARS.lokhlass = {order:{base:"the",add:["oran"]},
    line:"<i>Elle passe la tête par la fenêtre, toute ruisselante, et chantonne un bonjour.</i> Tavernier ! Un thé avec une Baie Oran, s'il te plaît. J'ai trois enfants qui m'attendent sur le quai.",
    ok:"<i>Elle boit d'une seule gorgée.</i> Les enfants des îles ont appris ma note. Quand le brouillard tombe, ils la chantent depuis la plage pour me guider. Ce sont eux, mon troupeau, maintenant.",
    ko:"<i>Elle sourit malgré tout.</i> Ce n'est pas tout à fait ma commande. Pas grave, la mer attend."};
// phrases dans les salles
ROOM_SAY.lokhlass = {a:"La baie, dans le brouillard. On chantait ici pour se retrouver.",b:"Je chante. Rien. Toujours rien.",c:"Trois îles. J'ai porté des enfants vers chacune d'elles.",d:"Une crique abritée. La mer y est calme, comme un souffle.",e:"Douze notes. Il en manque onze.",f:"La grande tempête. Elle revient. Elle revient toujours.",g:"Le port. Je suis revenue. Il n'y avait plus personne.",h:"Les vagues se lèvent… Comme ce soir-là.",i:"Le large. Ils sont partis par là. Si vite.",j:"Le phare est éteint. Je voyais sa lumière, en rentrant.",k:"Les lanternes du port. Les familles attendaient leurs enfants, ici.",l:"Un rire d'enfant. Le petit garçon. Il riait, sur mon dos, même dans la tempête."};
// mots-clés des salles
ROOM_KW.lokhlass = {b:"troupeau",k:"passagers",f:"tempête"};
// ombre finale
BOSS.lokhlass = {id:131,n:"Ombre du silence",self:true};
// carte légendaire offerte
LEGEND_CARD.lokhlass = "chantdularge";
// carte offerte
CLIENT_CARD.lokhlass = "laserglace";
// carte « Laser Glace »
CARDS.laserglace = {n:"Laser Glace",c:1,t:"atk",dmg:6,weak:1,r:"client",i:"❄️",from:"lokhlass"};
// carte « Chant du Large »
CARDS.chantdularge = {n:"Chant du Large",c:1,t:"skill",heal:6,block:8,draw:2,retain:true,r:"legende",i:"🎶",from:"lokhlass",d:"Soigne 6 PV, 8 de Bouclier, pioche 2. Retenue."};

// =====================================================================
// KANGOUREX  (kangourex)
// =====================================================================
// fiche (histoire, confidences, Labyrinthe)
CL.kangourex = {
    season:3,from:5,id:115,n:"Kangourex",fem:true,c:"#a87850",family:"Perte",wound:"combat",likesEss:["normal"],comfort:["lait","mago","miel","grochampi","pecha"],dislike:["liqueur","poudre","limonade"],tol:3,
    intro:"La porte s'ouvre en grand et une énorme Kangourex se baisse pour passer. Elle balaie la salle du regard, comme une mère qui compte ses petits. Elle s'assoit lourdement, et sa main se pose toute seule sur sa poche. La poche est vide. Il y a un vieux foulard roulé en boule, dedans.",
    arrive:"<i>Sa voix est grave, mais ses yeux sont doux.</i> Bonsoir, mon grand. Tu as mangé, toi, au moins ? Tu es tout maigre. Sers-moi quelque chose de nourrissant, et sers-toi aussi.",
    hints:["Sa main revient sans cesse vers sa poche, et vérifie que le foulard est toujours là.","Chaque fois qu'un petit Pokémon passe dans la rue, elle se lève à moitié, puis se rassoit.","Elle range les tabourets autour d'elle, essuie le comptoir, ramasse les miettes. Elle ne sait pas rester les mains vides."],
    stages:[
      {req:0,t:"<i>Elle lisse le foulard au fond de sa poche.</i> Il s'appelait Pépin. Il tenait tout entier là-dedans. Il dormait contre mon ventre, et il ronflait. Un tout petit ronflement.",kw:"poche"},
      {req:2,t:"<i>Elle regarde ses grandes mains.</i> Un jour, un jeune dresseur est passé dans la prairie. Pépin l'a regardé avec des yeux… Je connais ces yeux. Ce sont les yeux de quelqu'un qui veut voir le monde.",kw:"dresseur"},
      {req:3,t:"<i>Ses poings se serrent.</i> Je l'ai laissé sauter de la poche. J'ai souri. Je lui ai dit d'être courageux. Et depuis, chaque nuit, je me réveille en croyant l'entendre ronfler. La poche est froide. Je ne sais plus à quoi je sers.",kw:"partir"},
      {req:4,t:"<i>Elle sort le foulard, le plie, et le noue autour de son cou.</i> Je l'ai porté pour qu'il puisse partir. C'est ça, le travail d'une mère. La poche est vide parce que je l'ai bien remplie, avant."}
    ],
    lie:{after:0,t:"<i>Elle rit, un peu trop fort.</i> Moi, triste ? Je suis enfin tranquille ! Plus de cris, plus de miettes. C'est le paradis."},
    reform:{"poche":"« Ce que tu lui as donné là-dedans, il l'emporte partout. »","dresseur":"« Il est parti parce qu'il se sentait assez fort. C'est grâce à toi. »","partir":"« Le laisser partir, c'était l'aimer encore. Tu sers toujours. »"},
    essGood:"<i>Elle boit, et ses épaules se détendent d'un coup.</i> Ah… Ça, ça tient au cœur. Comme une bonne bagarre gagnée pour protéger quelqu'un.",
    essBad:"<i>Elle repose le verre en grondant.</i> Trop fort ! Ça me donne envie de cogner quelque chose, et il n'y a plus personne à défendre.",
    frags:[{n:"Le petit ronflement de Pépin dans la poche",e:"nostalgie"},{n:"Le premier saut de Pépin hors de la poche",e:"joie"}],
    thanks:"<i>Elle se lève, le foulard noué au cou comme une médaille.</i> Je vais ouvrir une garderie, dans la prairie. Pour les petits dont les parents travaillent. Ma poche est vide, mais mes bras, eux, sont libres.",
    gift:{key:"poche",n:"Foulard de Kangourex",i:"🧣",d:"+10 PV dans le Labyrinthe",fx:{hp:10}},
    staff:{n:"Garderie",d:"+2 PC max chaque nuit",wage:30},
    staffFx:{pc:2},
    cogHint:"Elle s'occupe de tout le monde et oublie de s'occuper d'elle. Une seule Gelée Orange, pour son courage, et du nourrissant : Lait Meumeu, Gros Champi, Miel. Pas de Limonade, trop acide pour elle.",
    map:{start:"a",nodes:{
      a:{t:"entree",n:"La prairie des hautes herbes",x:50,y:6,nx:["b"]},
      b:{t:"echo",e:"tristesse",dmg:1,n:"La poche froide",x:50,y:18,nx:["c","h"]},
      c:{t:"enigme",need:"nostalgie",n:"Le petit ronflement",x:28,y:30,nx:["d"]},
      h:{t:"echo",e:"colere",dmg:1,n:"Les pas du dresseur",x:74,y:30,nx:["d","i"],art:"b"},
      d:{t:"carrefour",n:"Le grand chêne des Kangourex",x:40,y:44,nx:["e","j"]},
      i:{t:"enigme",need:"joie",n:"Le premier saut",x:86,y:44,nx:["j"],art:"c"},
      e:{t:"sanctuaire",n:"Le nid d'herbe",x:15,y:58,nx:["k"]},
      j:{t:"echo",e:"peur",dmg:2,n:"Le chemin qui part au loin",x:68,y:58,nx:["f"],art:"b"},
      k:{t:"sanctuaire",n:"Le foulard au vent",x:28,y:70,nx:["f"],art:"e"},
      f:{t:"echo",e:"tristesse",dmg:2,n:"La silhouette qui s'éloigne",x:50,y:82,nx:["g"]},
      g:{t:"coeur",key:"joie",n:"Le jour où elle l'a laissé sauter",x:50,y:94,nx:[]}
    }}
  };
// petites conversations
TALK.kangourex = [
    {t:"<i>Elle repousse une mèche imaginaire sur ton front, puis se reprend.</i> Pardon. Mes mains font ça toutes seules. Elles ne savent pas qu'il n'y a plus de petit à recoiffer."},
    {t:"<i>Elle sent le pot de miel, et sourit.</i> Pépin en mettait partout. Sur la poche, sur mon ventre, sur ses oreilles. J'ai mis des semaines à tout laver.",like:"miel"},
    {t:"<i>Elle pose un Gros Champi devant toi.</i> Mange, toi. Je vois bien que tu sautes des repas. Une mère voit ces choses-là, même quand ce n'est pas son petit.",like:"grochampi"}
  ];
// moments au torchon
WIPE.kangourex = ["<i>Elle te prend le torchon des mains.</i> Laisse, laisse, je m'en occupe. Tu ne sais pas plier un torchon, mon grand.","<i>Elle range chaque verre propre en rang, par taille, du plus grand au plus petit.</i>"];
// lettre (Cadoizo)
LETTERS.kangourex = "« La garderie a sept petits. Ils ronflent tous. Pépin m'a écrit : il a gagné son premier badge. Je l'ai accroché au-dessus des lits. — K. »";
// visite de jour en habitué
REGULARS.kangourex = {order:{base:"the",add:["mago"]},
    line:"<i>Elle entre avec trois petits Pokémon accrochés à ses jambes.</i> Bonjour, mon grand ! Un thé à la Baie Mago, s'il te plaît. Et trois laits pour ces affreux, ils n'ont pas goûté.",
    ok:"<i>Elle boit pendant que les petits se chamaillent à ses pieds.</i> Pépin passera à la garderie cet été. Avec son dresseur. J'ai déjà préparé un lit à sa taille. Il ne rentrera plus dans la poche, de toute façon.",
    ko:"<i>Elle fronce le nez.</i> Ce n'est pas ça. Mais je ne vais pas te gronder devant les petits."};
// phrases dans les salles
ROOM_SAY.kangourex = {a:"La prairie. Les herbes sont si hautes. Il s'y cachait pour me faire peur.",b:"Ma poche… Elle est froide.",c:"Un petit ronflement. Je l'entends encore, la nuit.",d:"Le grand chêne. Toutes les mères Kangourex se réunissaient dessous.",e:"Un nid d'herbe. Il ne dort plus ici.",f:"Il s'éloigne. Il ne se retourne pas. C'est bien. C'est bien, non ?",g:"Le jour où je l'ai laissé sauter.",h:"Les pas du dresseur. De petits pas d'humain, pleins d'espoir.",i:"Son premier saut. Il était si fier. Il est retombé sur les fesses.",j:"Le chemin qui part vers le monde. Il est si long.",k:"Mon foulard, au vent. Je le lui mettais quand il faisait froid."};
// mots-clés des salles
ROOM_KW.kangourex = {b:"poche",h:"dresseur",f:"partir"};
// ombre finale
BOSS.kangourex = {id:115,n:"Ombre de la poche vide",self:true};
// carte légendaire offerte
LEGEND_CARD.kangourex = "lienparental";
// carte offerte
CLIENT_CARD.kangourex = "poingcomete";
// carte « Poing Comète »
CARDS.poingcomete = {n:"Poing Comète",c:1,t:"atk",dmg:3,hits:3,r:"client",i:"👊",from:"kangourex"};
// carte « Lien Parental »
CARDS.lienparental = {n:"Lien Parental",c:2,t:"atk",dmg:10,hits:2,r:"legende",i:"👜",from:"kangourex",d:"10 dégâts ×2 : la mère et l'enfant frappent ensemble."};
