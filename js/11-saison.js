// ---------- Le Grand Écho : la finale de chaque saison ----------
// ---------- Le Pourboire d'Or : la taverne rival de Miaouss (saisons 4 à 8) ----------
function rivalOpen(){ const se=S.season||1; return se>=4 && se<=7; } // fermé pour faillite au début de la saison 8
const MIAOUSS = {id:52,n:"Miaouss"};
function miaoussVisit(next){
  if(!rivalOpen() || S.night%2!==0 || (S.miaoussSeen||{})[`${S.season}-${S.night}`]){ next(); return; }
  S.miaoussSeen=S.miaoussSeen||{}; S.miaoussSeen[`${S.season}-${S.night}`]=true; S.miaouss=S.miaouss||{aff:0,visits:0}; S.miaouss.visits++;
  const v=S.miaouss.visits;
  const intro = v===1
    ? "<i>Avant la première âme, la porte de la rue s'ouvre. Miaouss entre, fait tinter une pièce sur le comptoir, et s'installe comme chez lui.</i> Je venais voir la concurrence. Sers-moi ton verre le plus cher. Et le plus fort. Je paie bien, tu vas voir."
    : v===2 ? "<i>Miaouss repousse la porte du pied et jette une bourse pleine sur le comptoir.</i> Encore moi. Chez moi, c'est plein à craquer. Mais personne ne parle. Bizarre, non ? Sers-moi du fort, voisin."
    : "<i>Miaouss entre plus tard que d'habitude, sans sa pièce. Il s'assoit sans rien dire.</i> …Le plus cher. Comme d'habitude. Ou… non. Je ne sais pas. Sers ce que tu veux.";
  U.miaNext=next;
  playDialog([{who:MIAOUSS,t:intro,img:"pourboire-int"}], ()=>{
    openModal(`<h3>🪙 Miaouss au comptoir</h3><p class="small muted">Il veut le verre le plus fort et le plus cher. Il laissera un énorme pourboire si tu le sers comme il demande.</p>
      <div class="answers">
        <button class="dopt" data-act="miaPick" data-c="fort"><b>Le servir comme il veut</b><br><small>Un verre très fort, très cher : +90 ₽. Il repart en riant.</small></button>
        <button class="dopt" data-act="miaPick" data-c="ecoute"><b>Lui offrir un verre doux, et lui demander comment il va</b><br><small>Pas de pourboire. Il risque de mal le prendre.</small></button>
        <button class="dopt" data-act="miaPick" data-c="refus"><b>Refuser son argent</b><br><small>« Ici, le premier verre est offert. » Il se méfie.</small></button>
      </div>`);
  }, ()=>{ $app.innerHTML=`${hud()}${scene({night:true,doorOpen:false})}<div class="panel">${dialogBubble()}</div>`; });
}
function miaPick(c){
  closeModal(); const M=S.miaouss; const lines=[];
  if(c==="fort"){ S.money+=90; S.stats.earned+=90; M.aff=Math.max(0,M.aff-1);
    lines.push({who:MIAOUSS,t:"<i>Il vide le verre d'un coup, grimace, et rit très fort.</i> Ha ! Tu vois, tu apprends vite ! L'argent, voisin. Il n'y a que ça de vrai. <i>Il laisse une pile de pièces, et sort sans se retourner.</i>"});
    lines.push({who:"narr",t:"+90 ₽. La pile de pièces brille sur le comptoir. Personne n'a rien dit de vrai."});
  } else if(c==="ecoute"){ M.aff=Math.min(5,M.aff+1);
    lines.push({who:MIAOUSS,t:M.aff>=3?"<i>Il fixe le verre doux longtemps.</i> …Pas mal. Quand j'étais petit, dans la rue, une vieille dame me donnait du lait chaud. Je l'avais oublié. Ne le répète à personne.":"<i>Il renifle le verre doux, vexé.</i> C'est quoi, ça ? Du lait pour chaton ? <i>Il le boit quand même. Jusqu'au bout.</i> …Hm. Je reviendrai. Pour surveiller la concurrence, bien sûr."});
    lines.push({who:"narr",t:"Miaouss repart sans laisser de pièce. Mais il s'est retourné une fois, sur le seuil."});
  } else { M.aff=Math.min(5,M.aff+(M.visits>=2?1:0));
    lines.push({who:MIAOUSS,t:"<i>Il plisse les yeux.</i> Offert ? Personne n'offre rien. Qu'est-ce que tu veux en échange ? <i>Il attend. Rien ne vient. Il boit, lentement, en te surveillant.</i> …Tu es bizarre, voisin."});
    if(M.visits>=2) lines.push({who:"narr",t:"En partant, il laisse une seule pièce. Pas sur le comptoir : dans la main du co-gérant, presque gentiment."});
  }
  save(); const next=U.miaNext||nextClient; U.miaNext=null;
  playDialog(lines, next, ()=>{ $app.innerHTML=`${hud()}${scene({night:true,doorOpen:false})}<div class="panel">${dialogBubble()}</div>`; });
}

// À la fin de la 7e nuit, la Faille rejette tout ce qu'elle a absorbé pendant la saison. Une âme apaisée redescend, avec tous les souvenirs de la saison.
const FINALE_MAP = {start:"fa",nodes:{
  fa:{t:"entree",n:"Le seuil où tout se mélange",x:50,y:6,nx:["fb"],art:"machopeur/a",say:"Le vestiaire de Machopeur… et la pluie de Ponchiot, en même temps. Toutes nos histoires coulent ici."},
  fb:{t:"echo",e:"tristesse",dmg:1,n:"Le lac des phares",x:50,y:20,nx:["fc"],art:"magicarpe/b",foe:{id:130,n:"Léviator"},say:"Des phares qui passent au fond d'un lac. Ce ne sont pas mes souvenirs… et pourtant ils me font mal."},
  fc:{t:"carrefour",n:"Trois souvenirs mêlés",x:50,y:35,nx:["fd","fe","ff"],art:"ponchiot/d",say:"Trois routes. Chacune sent quelqu'un que j'ai croisé à la taverne."},
  fd:{t:"sanctuaire",n:"Le comptoir dans la brume",x:16,y:50,nx:["fg"],art:"leveinard/e",say:"On dirait le comptoir… en flou. Quelqu'un a laissé un verre chaud. Pour moi ?"},
  fe:{t:"echo",e:"colere",dmg:2,n:"Le rire de tous les rivaux",x:50,y:50,nx:["fg"],art:"machopeur/b",foe:{id:65,n:"Alakazam"},say:"Tous ceux qui se sont moqués de nous, réunis en un seul rire."},
  ff:{t:"enigme",need:"joie",n:"La photo de la taverne",x:84,y:50,nx:["fg"],art:"rondoudou/e",say:"Une photo de la taverne, pleine de monde. Il manque le moment où on riait tous."},
  fg:{t:"echo",e:"peur",dmg:2,n:"La porte violette grande ouverte",x:50,y:68,nx:["fh"],art:"ponchiot/f",say:"La porte ne se referme plus. Tout ce qui est entré cette saison veut ressortir."},
  fh:{t:"coeur",key:"nostalgie",n:"Le cœur de la Faille",x:50,y:88,nx:[],art:"faille",say:"Une ombre immense, avec un sourire que je connais… Ce n'est pas un regret à nous. C'est le sien.",
    boss:{id:94,n:"Ombre de la Faille",hp:115,moves:[{a:"atk",v:12},{a:"vuln",v:1,dmg:8},{a:"buff",v:3},{a:"atk",v:7,x:2},{a:"weak",v:2,dmg:9},{a:"atk",v:19},{a:"def",v:14}]}}
}};
// Saison 4 : le Grand Regret du chapitre 2 est Suicune, qui ne parvient plus à purifier l'eau
const FINALE_MAP_S4 = (()=>{ const m=JSON.parse(JSON.stringify(FINALE_MAP)); const n=m.nodes;
  n.fg=Object.assign({},n.fg,{n:"Le lac souillé",art:"suicune-lac",say:"Le lac. Il était si clair qu'on voyait le fond. Maintenant, on ne voit plus rien, même pas son reflet."});
  n.fh=Object.assign({},n.fh,{n:"Suicune sur l'eau noire",art:"suicune",say:"Suicune. Le vent du nord, celui qui purifie les eaux. Il ne purifie plus rien. Il a perdu le lac qu'il protégeait, et il ne sait plus à quoi il sert.",
    boss:{id:245,n:"Suicune, l'eau souillée",hp:135,moves:[{a:"atk",v:13},{a:"def",v:14},{a:"weak",v:2,dmg:9},{a:"atk",v:8,x:2},{a:"buff",v:3},{a:"vuln",v:2,dmg:10},{a:"atk",v:21}]}});
  return m; })();
// Saison 6 : le Grand Regret du chapitre 3 est Mewtwo, créé sans l'avoir demandé
const FINALE_MAP_S6 = (()=>{ const m=JSON.parse(JSON.stringify(FINALE_MAP)); const n=m.nodes;
  n.fg=Object.assign({},n.fg,{n:"Le laboratoire en ruine",art:"mewtwo-labo",say:"Un laboratoire détruit. Des cuves brisées, des écrans morts. C'est ici qu'on l'a fabriqué."});
  n.fh=Object.assign({},n.fh,{n:"Mewtwo dans la cuve",art:"mewtwo",say:"Mewtwo. Le Pokémon le plus puissant qu'on ait jamais créé. Il flotte dans sa cuve brisée, les yeux fermés. Il n'a jamais demandé à exister, et il ne sait pas s'il a le droit de rester.",
    boss:{id:150,n:"Mewtwo, celui qu'on a fabriqué",hp:150,moves:[{a:"atk",v:14},{a:"weak",v:2,dmg:10},{a:"def",v:16},{a:"atk",v:9,x:2},{a:"buff",v:4},{a:"vuln",v:2,dmg:11},{a:"atk",v:24}]}});
  return m; })();
// Saison 8 : le Grand Regret du chapitre 4 est Ho-Oh, qui a abandonné les humains après l'incendie de la Tour Cendrée
const FINALE_MAP_S8 = (()=>{ const m=JSON.parse(JSON.stringify(FINALE_MAP)); const n=m.nodes;
  n.fg=Object.assign({},n.fg,{n:"La Tour Cendrée en flammes",art:"hooh-tour",say:"Une tour de bois qui brûle, il y a très longtemps. Des cris, des cendres. Un oiseau immense s'envole sans se retourner."});
  n.fh=Object.assign({},n.fh,{n:"Ho-Oh au-dessus des cendres",art:"hooh",say:"Ho-Oh. L'oiseau de l'arc-en-ciel, celui qui veillait sur les fêtes des hommes. Il n'est jamais revenu depuis l'incendie. Il plane seul au-dessus des cendres, depuis des siècles.",
    boss:{id:250,n:"Ho-Oh, le ciel abandonné",hp:165,moves:[{a:"atk",v:15},{a:"burn",v:3,dmg:9},{a:"def",v:16},{a:"atk",v:9,x:2},{a:"buff",v:4},{a:"weak",v:2,dmg:11},{a:"atk",v:26}]}});
  return m; })();
// Saison 10 : le Grand Regret du chapitre 5 est Giratina, le maître de la Faille, banni dans le monde à l'envers
const FINALE_MAP_S10 = (()=>{ const m=JSON.parse(JSON.stringify(FINALE_MAP)); const n=m.nodes;
  n.fg=Object.assign({},n.fg,{n:"Le monde à l'envers",art:"giratina-monde",say:"Des escaliers qui montent vers le bas, des cascades qui coulent vers le ciel. Le monde derrière la Faille. Ici, tous les regrets qu'elle a avalés flottent comme des feuilles mortes."});
  n.fh=Object.assign({},n.fh,{n:"Giratina et le ruban rouge",art:"giratina",say:"Giratina. Le maître du monde à l'envers. Il a été banni ici, il y a si longtemps, pour sa colère. Depuis, il garde les regrets que la Faille lui envoie, pour ne pas être seul. Et entre ses griffes, un petit ruban rouge.",
    boss:{id:487,n:"Giratina, le banni",hp:180,moves:[{a:"atk",v:16},{a:"weak",v:2,dmg:11},{a:"def",v:18},{a:"atk",v:10,x:2},{a:"vuln",v:2,dmg:12},{a:"buff",v:4},{a:"atk",v:28}]}});
  return m; })();
// Saison 12 : le donjon d'Hector, plus long et plus dur (14 salles, deux carrefours, ombres d'élite), contre Darkrai, avec qui Hector a passé son pacte
const FINALE_MAP_S12 = {start:"fa",nodes:{
  fa:{t:"entree",n:"La taverne il y a cent ans",x:50,y:4,nx:["fb","fc"],art:"hector-taverne",say:"La taverne, comme elle était il y a cent ans. Les mêmes poutres. Un homme à moustache derrière le comptoir, qui regarde la porte."},
  fb:{t:"echo",e:"colere",dmg:1,n:"Le soir de la dispute",x:28,y:14,nx:["fd"],art:"hector-dispute",say:"Des mots durs, une petite fille qui claque la porte. Hector se fige à côté de toi. « Ne regarde pas trop longtemps, petit. »"},
  fc:{t:"echo",e:"tristesse",dmg:1,n:"Le comptoir où il attendait",x:72,y:14,nx:["fd"],art:"hector-attente",say:"Un comptoir, une chaise tournée vers la porte, des bougies qui fondent nuit après nuit."},
  fd:{t:"carrefour",n:"La salle aux cent hivers",x:50,y:25,nx:["fe","ff","fg"],art:"hector-hivers",say:"Trois chemins. Hector hésite. « Ils mènent tous au même endroit. Mais par des souvenirs différents. »"},
  fe:{t:"sanctuaire",n:"Le ruban de Lise",x:16,y:36,nx:["fh"],art:"hector-ruban",say:"Un ruban rouge, posé sur une table. La seule chose douce de tout ce donjon."},
  ff:{t:"echo",e:"peur",dmg:2,n:"La nuit du pacte",x:50,y:36,nx:["fh"],art:"hector-pacte",foe:{id:94,n:"Hector d'autrefois"},say:"Hector, jeune encore, presque transparent, qui serre la main d'une ombre aux yeux bleus. « Je ne veux pas disparaître avant qu'elle revienne. » C'est lui. C'était lui."},
  fg:{t:"enigme",need:"nostalgie",n:"Le portrait au-dessus de la cheminée",x:84,y:36,nx:["fh"],art:"hector-portrait",say:"Le portrait d'Hector, mais les yeux sont vides. Il manque quelque chose : un souvenir de ce qu'il était avant."},
  fh:{t:"echo",e:"tristesse",dmg:2,n:"Les âmes données à la Faille",x:50,y:48,nx:["fi","fj"],art:"hector-ames",foe:{id:93,n:"Spectrum"},say:"Des voyageurs, un par un, qui s'endorment à une table de la taverne et ne se réveillent jamais tout à fait. Leurs regrets glissent vers la cave. Hector ferme les yeux."},
  fi:{t:"sanctuaire",n:"La cave d'avant la Faille",x:28,y:60,nx:["fk"],art:"hector-cave",say:"La cave, avant. Des tonneaux, de la poussière, rien de violet. Un endroit où se reposer une dernière fois."},
  fj:{t:"echo",e:"colere",dmg:2,n:"La porte du monde à l'envers",x:72,y:60,nx:["fk"],art:"hector-porte",foe:{id:487,n:"Ombre de Giratina"},say:"La porte que le pacte a ouverte dans le monde de Giratina. Une ombre de Giratina, d'avant qu'il apprenne à aimer les verres, garde le passage."},
  fk:{t:"carrefour",n:"Le seuil de la taverne",x:50,y:71,nx:["fl","fm"],art:"hector-seuil",say:"La porte d'entrée de la taverne. Hector ne l'a jamais franchie depuis cent ans. Deux chemins pour aller au bout."},
  fl:{t:"enigme",need:"joie",n:"Les âmes apaisées",x:28,y:81,nx:["fn"],art:"hector-apaisees",say:"Toutes les âmes que tu as écoutées, saison après saison. Elles sont là, en lumière douce. Elles regardent Hector sans colère."},
  fm:{t:"echo",e:"peur",dmg:2,n:"Les cauchemars du marchand",x:72,y:81,nx:["fn"],art:"hector-cauchemars",foe:{id:491,n:"Cauchemar de Darkrai"},say:"Des rêves noirs qui tournent comme des corbeaux. Darkrai sait que tu viens."},
  fn:{t:"coeur",key:"joie",n:"Darkrai, le marchand de cauchemars",x:50,y:94,art:"darkrai",nx:[],say:"Darkrai. Celui qui a proposé le pacte à Hector, il y a cent ans : « Je te garde en ce monde, tant que tu me nourris d'âmes. » Il ne veut pas perdre son meilleur client.",
    boss:{id:491,n:"Darkrai, le marchand de cauchemars",hp:170,moves:[{a:"weak",v:2,dmg:12},{a:"atk",v:16},{a:"def",v:18},{a:"atk",v:9,x:3},{a:"vuln",v:2,dmg:13},{a:"buff",v:5},{a:"burn",v:4,dmg:10},{a:"atk",v:30}]}}
}};
// Plan du Grand Écho selon la saison (Grand Regret de fin de chapitre), sinon le plan standard
const FINALE_MAPS = {4:FINALE_MAP_S4, 6:FINALE_MAP_S6, 8:FINALE_MAP_S8, 10:FINALE_MAP_S10, 12:FINALE_MAP_S12};
function finaleChamps(){ return CLIENT_ORDER.filter(k=>inSeason(k) && ["apaise","staff"].includes(S.clients[k].state)); }
function seasonClose(){
  const se=S.season||1; S.finale=S.finale||{}; S.night=Math.min(S.night,NIGHTS_PER_SEASON);
  if(S.finale[se]){ endSeason(); return; }
  music("donjon");
  const fete = CLIENT_ORDER.filter(k=>[7,8].includes(CL[k].season) && ["apaise","staff"].includes(S.clients[k].state)).map(k=>CL[k].n);
  const lines = se===12 ? [
    {who:"narr",t:"La dernière nuit de la saison, toutes les âmes que la taverne a apaisées passent devant la fenêtre, en silence, comme des lucioles. Elles ne viennent pas boire. Elles regardent Hector."},
    {who:"narr",t:"Puis la cave s'ouvre, et ce n'est pas la lumière violette de la Faille qui monte : c'est un noir épais, qui sent les mauvais rêves. Une voix, très douce, très froide."},
    {who:{id:491,n:"Darkrai"},t:"Hector. Notre contrat. Cent ans que tu me nourris, et voilà que ton tavernier me vole mes repas, saison après saison. Il les apaise. Il me les reprend. Descends. Viens renégocier. Ou je viens chercher ce qu'on me doit… dans la salle."},
    {who:"hector",t:"<i>Hector se lève. Il n'hésite pas, cette fois.</i> C'est mon donjon, petit. Mon regret à moi. Le co-gérant reste en haut pour garder la taverne. C'est moi qui descends avec toi. Et je ne viens pas les mains vides."},
    {who:"cog",t:"Patron… Ramène-le. Ramène-le tout entier."}
  ] : se===11 ? [
    {who:"narr",t:"La dernière nuit de la saison, la porte de la cave s'ouvre en grand, toute seule. Les regrets de la saison remontent, comme chaque fois."},
    {who:{id:487,n:"Giratina"},t:"<i>Une voix grave monte de la cave, presque gênée.</i> Tavernier. La Faille déborde, comme à chaque printemps. Je ne peux pas tout retenir de mon côté. Descends, avec ton acolyte. Je tiendrai les escaliers à l'endroit pour toi."},
    {who:"hector",t:"<i>Hector se lève, hésite, puis se rassoit.</i> Je… je devrais venir avec vous. Non. Pas encore. Vas-y, petit. Je garde le comptoir."},
    {who:"cog",t:"On y va, patron. Même si on a peur. Surtout si on a peur, cette saison."}
  ] : se===10 ? [
    {who:"narr",t:"La dernière nuit de la saison, toutes les horloges de Bourg-Brume s'arrêtent en même temps. Dans la taverne, l'eau des verres coule vers le haut, goutte à goutte."},
    {who:"narr",t:"La porte murée, derrière le portrait, se fend du haut en bas. Une ombre immense passe de l'autre côté, avec des ailes comme des griffes, et six pointes rouges qui luisent dans le noir."},
    {who:{id:487,n:"Giratina"},t:"<i>Sa voix vient d'en dessous, comme si le plancher parlait.</i> Tavernier. Depuis cent ans, ton chagrin m'envoie des âmes. C'est ta Faille. Ton attente a ouvert une porte dans mon monde. Et parmi elles, il y en a une que tu n'as jamais su chercher. Tu la veux ? Viens la prendre. Moi, je n'ai qu'elles, dans mon monde à l'envers."},
    {who:"hector",t:"<i>Hector, la voix brisée.</i> Lise… Elle est là-dessous ? Depuis tout ce temps ? Petit, je… je ne peux pas descendre. Je suis une ombre, je n'ai jamais pu passer la porte. Vas-y. Avec ton acolyte. Ramène-la. Je t'en supplie."},
    {who:"cog",t:"On y va, patron. Pour Hector. Pour Lise. On n'a jamais laissé une âme dans le noir, on ne va pas commencer ce soir."}
  ] : se===9 ? [
    {who:"narr",t:"La dernière nuit de la saison, le portrait d'Hector tombe du mur tout seul. Derrière, dans la pierre, une porte que personne n'avait jamais vue."},
    {who:"hector",t:"<i>Sa voix tremble.</i> Cette porte… c'est moi qui l'ai murée, il y a cent ans. L'ombre qui remonte de la Faille à chaque fin de saison, petit… celle avec mon sourire… Ce n'est pas un regret de tes clients. C'est le mien. C'est la part de moi qui attend encore, au fond."},
    {who:"cog",t:"Alors c'est son regret à lui qu'on va affronter, patron ? On ne va pas lui faire de mal, hein ?"},
    {who:"hector",t:"On ne le combat pas pour le détruire, petit. On le combat comme tu combats les ombres de tes clients : pour l'écouter. Descends, avec ton acolyte. Et si tu la trouves… dis à mon ombre que j'ai le droit de me souvenir."}
  ] : se===8 ? [
    {who:"narr",t:"La dernière nuit de la saison, c'est la fête de Bourg-Brume. Des lampions sur le clocher, une fanfare sur la place, l'odeur des malasadas et de la barbe à papa. La taverne a son stand, pour la première fois : un comptoir de planches, et des verres doux pour tout le monde."},
    {who:"narr",t:fete.length?`Ils sont venus. ${fete.join(", ")}. Ceux que la ville avait oubliés sont au milieu de la place, et la ville les reconnaît. Quelqu'un rit, quelqu'un danse mal, quelqu'un pleure un peu, de joie.`:"La place est pleine. Mais au bord des lampions, quelques silhouettes restent seules, dans l'ombre, et regardent la fête sans y entrer."},
    {who:"cog",t:"Patron… regarde le ciel ! Il y a des couleurs. Comme un arc-en-ciel, mais la nuit."},
    {who:"narr",t:"Un oiseau immense traverse le ciel au-dessus de la place, couvert de plumes de feu et d'or. La fanfare s'arrête. Les anciens du village lèvent la tête, et l'un d'eux murmure un nom qu'on n'avait plus dit depuis des siècles."},
    {who:{id:250,n:"Ho-Oh"},t:"<i>Sa voix tombe du ciel, comme une pluie chaude.</i> Autrefois, je volais au-dessus de toutes vos fêtes. Puis une nuit, les hommes se sont battus, et ma tour a brûlé. Je suis parti. Je n'ai jamais su revenir. Je regarde vos lampions de loin, depuis. Est-ce qu'on a encore une place, à la fête, quand on est parti ?"},
    {who:"narr",t:"Ho-Oh se pose sur le toit de la taverne. La trappe de la cave s'ouvre toute seule, sur une lumière orange, qui sent la cendre."},
    {who:"hector",t:"<i>Hector, très ému.</i> Ho-Oh… Je l'ai vu passer, une fois, quand j'étais vivant. Le dernier Grand Regret du chapitre, petit. Descends avec ton acolyte. Tu as appris à rendre les solitaires à la ville. Rends-lui le ciel."}
  ] : se===6 ? [
    {who:"narr",t:"La dernière nuit de la saison, toutes les cuillères de la taverne se soulèvent en même temps, et restent suspendues dans l'air."},
    {who:"narr",t:"La porte ne s'ouvre pas. Il est simplement là, au milieu de la salle, flottant à un pied du sol. Une silhouette violette et blanche, immense, la queue enroulée autour de lui comme un enfant qui se tient les genoux."},
    {who:{id:150,n:"Mewtwo"},t:"<i>Sa voix résonne directement dans ta tête, et dans celle de tous les présents.</i> On m'a fabriqué dans une cuve, pour être le plus fort. Personne ne m'a demandé si je voulais naître. J'ai détruit le laboratoire, et depuis, je cherche une raison. On dit qu'ici, on écoute ceux qui ne savent plus qui ils sont. Moi, je ne sais même pas si j'ai le droit d'être."},
    {who:"narr",t:"Les cuillères retombent une à une. La trappe de la cave s'ouvre toute seule, sur une lumière froide de laboratoire."},
    {who:"hector",t:"<i>Hector, à voix basse.</i> Le Grand Regret du chapitre, petit. Cette fois, personne ne descendra à ta place : vas-y toi-même, avec ton acolyte. Tu as appris à aimer chacun tel qu'il est. C'est ça qu'il a besoin d'entendre."}
  ] : se===4 ? [
    {who:"narr",t:"La dernière nuit de la saison, la pluie s'arrête d'un coup. Le silence est si total qu'on entend la Faille respirer."},
    {who:"narr",t:"Puis la porte s'ouvre sur un vent du nord glacé. Sur le seuil, une silhouette immense, bleue comme l'eau des montagnes, avec un ruban de cristal qui flotte derrière elle."},
    {who:"narr",t:"Suicune. Le Pokémon légendaire qui court sur les eaux et les purifie. Ses pattes laissent des traces noires et huileuses sur le plancher."},
    {who:{id:245,n:"Suicune"},t:"<i>Sa voix vient de partout à la fois, comme le bruit d'une rivière.</i> On m'a dit qu'ici, on écoutait ceux qui ont perdu ce qu'ils aimaient. J'avais un lac. Le plus clair du monde. Les hommes l'ont souillé, et je n'ai pas su le laver. Je cours sur l'eau depuis, et tout ce que je touche reste sale."},
    {who:"narr",t:"Suicune se couche devant la trappe de la cave. Elle s'ouvre seule. En dessous, la lumière a la couleur d'une eau trouble."},
    {who:"hector",t:"<i>La voix d'Hector, toute proche.</i> C'est un Grand Regret, petit. Un légendaire qui a perdu sa raison d'être. Descends toi-même, avec ton acolyte. Toi, tu sais rester à côté de ceux qui ont perdu."}
  ] : [
    {who:"narr",t:"Le soleil devrait se lever. Il ne se lève pas. Toutes les bougies de la taverne se couchent d'un coup, du même côté."},
    {who:"narr",t:"La trappe de la cave s'ouvre dans un souffle. En dessous, la lumière n'est plus violette : elle a toutes les couleurs des âmes de la saison, mêlées."},
    {who:"cog",t:"Patron… la Faille déborde ! Tout ce qu'elle a avalé cette saison, les regrets, les souvenirs… tout remonte en même temps !"},
    {who:"hector",t:"<i>Une voix, très loin, comme à travers un mur.</i> Hé… hé. Cette fois, c'est à toi de descendre, Tenancier. Pas seul : prends ton acolyte. Et confie-lui quelques-unes de tes cartes, il en aura besoin."},
    {who:"cog",t:"C'était… Hector ? Il avait l'air moins drôle que d'habitude. …Bon. On y va ensemble, patron. Je te couvre."}
  ];
  playDialog(lines, renderFinaleChoice, ()=>{ $app.innerHTML=`${hud()}${scene({night:true,doorOpen:false})}<div class="panel">${dialogBubble()}</div>`; });
}
// ---------- Le Grand Écho en duo : le Tenancier et son acolyte descendent ensemble ----------
// Avant la descente, le Tenancier confie COG_CARDS cartes de son deck à l'acolyte (elles quittent son deck pour l'Écho).
// En combat, l'acolyte joue une de ses cartes par tour, sans énergie ; il récupère toutes ses cartes à chaque nouveau combat.
const COG_CARDS = 5;
// Compagnon du Grand Écho : le co-gérant, sauf pour le donjon d'Hector (saison 12), où Hector descend lui-même
function finaleMate(){ return (S.season||1)===12 ? HECTOR : cog(); }
function cogPickable(id){ const c=CARDS[id]; return !!c && !c.unplayable && !c.x; }
function cogNeed(){ ensureDeck(); return Math.max(0, Math.min(COG_CARDS, S.deck.filter(cogPickable).length, S.deck.length - DECK_MIN)); }
function renderFinaleChoice(){
  ensureDeck(); U.cogPick = U.cogPick || [];
  const need=cogNeed(), K=finaleMate(), n=U.cogPick.length, se=S.season||1;
  $app.innerHTML=`${hud()}<div class="pad scroll" style="flex:1;display:flex;flex-direction:column;gap:10px">
    <h2 class="px" style="color:#c9a8ff;margin:2px 0">🌀 Le Grand Écho</h2>
    <div class="row" style="align-items:center;gap:8px"><span style="width:52px;height:52px;display:inline-block;flex:none">${sprite(S.ten.id,S.ten.n,S.ten.c,{anim:true})}</span><span style="width:44px;height:44px;display:inline-block;flex:none">${sprite(K.id,K.n,K.c,{anim:true})}</span>
      <p class="small grow" style="margin:0">${se===12?`<b>C'est le donjon d'Hector.</b> Il descend avec toi, à la place de ${cog().n}, et glisse ses <b>3 cartes uniques</b> dans ton deck (${HECTOR_CARDS.map(id=>CARDS[id].n).join(", ")}). `:""}Cette fois, <b>tu descends toi-même</b>, avec <b>${K.n}</b>. Tu te bats avec ton deck et <b>tous les souvenirs de la saison</b>. Si vous tombez, rien n'est perdu : vous remontez, et la saison se termine quand même.</p></div>
    <div class="card"><div class="px" style="color:var(--candle)">Confier ${need} carte${need>1?"s":""} à ${K.n} (${n}/${need})</div>
      <div class="small muted">Elles quittent ton deck pour l'Écho. À chaque tour, ${K.n} peut en jouer <b>une</b>, sans énergie, et récupère toutes ses cartes au début de chaque combat.</div>
      <div class="dgrid cogpick">${S.deck.map((id,i)=>cogPickable(id)?`<div class="cogsel ${U.cogPick.includes(i)?"on":""}">${cardHTML(id,{act:"cogPick",i})}</div>`:"").join("")}</div></div>
    <button data-act="finaleGo" ${n<need?"disabled":""}>${n<need?`Choisis encore ${need-n} carte${need-n>1?"s":""}`:`Descendre avec ${K.n}`}</button>
    <button class="alt" data-act="finaleSkip">Laisser la Faille se refermer seule</button></div>`;
}
function cogPickToggle(i){
  U.cogPick=U.cogPick||[]; const j=U.cogPick.indexOf(i);
  if(j>=0) U.cogPick.splice(j,1); else if(U.cogPick.length<cogNeed()) U.cogPick.push(i); else { toast(`${finaleMate().n} a déjà ses ${cogNeed()} cartes.`); return; }
  const p0=document.querySelector(".pad.scroll"), y=p0?p0.scrollTop:0; renderFinaleChoice(); const p=document.querySelector(".pad.scroll"); if(p) p.scrollTop=y;
}
function finaleGo(){
  ensureDeck(); const ids=(U.cogPick||[]).map(i=>S.deck[i]).filter(Boolean); U.cogPick=null;
  // le duo est un « client » temporaire, le temps de l'Écho (retiré par finaleEnd)
  CL._duo = {id:S.ten.id, n:S.ten.n, c:S.ten.c||"#f0c060", family:"", reform:{}, frags:[], comfort:[], dislike:[], map:null};
  S.clients._duo = {aff:0,state:"new",carryOuv:0,carryTen:0,visits:0,shake:false};
  U.night = U.night || {out:{},recruits:[]};
  U.dawn = {list:[{k:"_duo",ten:0,euph:false,hang:0,finale:true,duo:true,cogCards:ids,hector:(S.season||1)===12}], i:0};
  setupDungeon();
}
// L'acolyte joue seul : à la fin de chaque tour du Tenancier, il choisit une de ses cartes (sans énergie)
function cogChoose(){
  const D=U.dawn, C=D.combat, en=C.en, spent=C.cogSpent||[];
  const m=en.moves[en.mi%en.moves.length];
  const incoming = en.stun ? 0 : m.a==="atk" ? (m.v+(en.str||0))*(m.x||1) : (m.dmg||0);
  const opts=D.x.cogCards.map((id,j)=>({j,cd:CARDS[id]})).filter(o=>o.cd && !spent.includes(o.j));
  if(!opts.length) return -1;
  const dmgOf=cd=>cd.dmg ? (cd.dmg+(C.str||0))*(cd.hits||1) : 0;
  const best=(list,f)=>list.length ? list.slice().sort((x,y)=>f(y.cd)-f(x.cd))[0].j : -1;
  // 1. achever l'ombre s'il le peut
  const kill=opts.filter(o=>dmgOf(o.cd)>=en.hp+(en.block||0)); if(kill.length) return best(kill,dmgOf);
  // 2. protéger le Tenancier si le coup qui arrive passe le Bouclier
  const blk=opts.filter(o=>o.cd.block); if(incoming>C.block && blk.length) return best(blk,cd=>cd.block);
  // 3. soigner s'il est mal en point
  const heal=opts.filter(o=>o.cd.heal); if(D.hp<D.maxhp*0.4 && heal.length) return best(heal,cd=>cd.heal);
  // 4. sinon, frapper fort (ou faire ce qu'il peut)
  const atk=opts.filter(o=>o.cd.dmg); if(atk.length) return best(atk,dmgOf);
  return opts[0].j;
}
function cogAct(){
  const D=U.dawn, C=D&&D.combat; if(!C||C.over||!D.x.duo||C.cogUsed) return;
  C.cogUsed=true; const j=cogChoose(); if(j<0){ C.cogMsg=null; return; }
  const id=D.x.cogCards[j], cd=CARDS[id]; C.cogSpent=(C.cogSpent||[]).concat([j]);
  const e={id}; C.hand.push(e); C.energy+=cd.c||0;
  playCard(C.hand.length-1, 0);
  // la carte reste à l'acolyte : on la retire de la défausse du Tenancier
  [C.disc, C.exh].forEach(p=>{ const k=p.indexOf(e); if(k>=0) p.splice(k,1); });
  C.cogMsg=`${D.x.hector?"👻":"🐾"} ${finaleMate().n} joue ${C.log||cd.n}`;
}
function cogRowHTML(){
  const D=U.dawn, C=D.combat; if(!D.x.duo || !(D.x.cogCards||[]).length) return "";
  const K=finaleMate(), spent=C.cogSpent||[], left=D.x.cogCards.length-spent.length;
  return `<div class="cogrow"><div class="small cogtitle"><span class="cogav">${sprite(K.id,K.n,K.c,{anim:true})}</span><span><b>${K.n}</b> choisit seul sa carte à la fin de ton tour${left?` (${left} restante${left>1?"s":""})`:" : plus de carte pour ce combat"}.</span></div>
    ${C.cogMsg?`<div class="small cogmsg">${C.cogMsg}</div>`:""}
    <div class="dhand cog">${D.x.cogCards.map((id,j)=>cardHTML(id,{dis:spent.includes(j)})).join("")}</div></div>`;
}
function finaleEnd(win){
  const se=S.season||1; S.finale=S.finale||{}; S.finale[se]=win?"win":"lose"; U.inDungeon=false;
  delete CL._duo; if(S.clients) delete S.clients._duo;
  const lines=[];
  if(win && se===12){
    S.pages+=5; addXP(500); S.pacte=true;
    const nb=CLIENT_ORDER.filter(k=>["apaise","staff"].includes(S.clients[k].state)).length;
    lines.push({who:"narr",t:"Au fond du donjon, Darkrai recule dans ses propres ombres. Le contrat se déchire tout seul, comme une vieille page mouillée."});
    lines.push({who:{id:491,n:"Darkrai"},t:"<i>Sa voix s'éloigne.</i> Tu n'as plus rien à me donner, tavernier. Ton remplaçant les a toutes rendues à elles-mêmes. Un client perdu… Les cauchemars trouveront d'autres portes. Pas celle-ci."});
    lines.push({who:"narr",t:`Quand vous remontez, la taverne est pleine. ${nb} âme${nb>1?"s":""}, toutes celles que tu as écoutées, de Machopeur jusqu'à aujourd'hui. Elles ne disent rien. Elles attendent qu'Hector parle.`});
    lines.push({who:"hector",t:"<i>Il enlève son tablier, et le tient dans ses mains.</i> C'est moi. C'est à cause de moi que vous étiez perdues. J'avais peur de disparaître avant le retour de Lise. Alors j'ai passé un marché : chaque voyageur qui s'endormait ici laissait un peu de son âme à la Faille, et moi, je restais. Je vous ai volé vos regrets pour durer. Je n'ai pas d'excuse. Seulement… pardon."});
    const first=CLIENT_ORDER.find(k=>["apaise","staff"].includes(S.clients[k].state))||"machopeur";
    lines.push({who:clientSp2(first),t:`<i>${CL[first].n}, ${CL[first].fem?"la première":"le premier"} à avoir été écouté${CL[first].fem?"e":""} ici, s'avance.</i> Tu nous as perdus, Hector. Mais c'est ta taverne qui nous a retrouvés. Et c'est toi qui as fait venir le Tenancier, non ? Tu as passé cent ans à réparer en cachette ce que tu avais cassé.`});
    lines.push({who:"narr",t:"Une à une, les âmes passent devant Hector. Certaines lui serrent la main, d'autres lui sourient seulement. Aucune ne part fâchée. Quand la dernière est passée, Hector est en larmes. Et pour la première fois, il a une ombre normale, à ses pieds."});
    lines.push({who:"hector",t:"<i>Il se tourne vers la porte d'entrée de la taverne. Il pose la main sur la poignée. Il hésite. Puis il l'ouvre, et il fait un pas dehors, dans la nuit de Bourg-Brume.</i> …Cent ans que je n'avais pas senti le vent. Petit. Tu viens marcher avec moi jusqu'à la fontaine ? Juste jusqu'à la fontaine. Après, on rentre. On a une taverne à tenir."});
    lines.push({who:"narr",t:"Carte légendaire obtenue : 🕯️ <b>Le Pacte Brisé</b>. Cinq pages s'écrivent au Grand Registre."});
    addCard("pactebrise","le cadeau d'Hector");
    if(!S.equip.faille){ S.equip.faille=true; lines.push({who:"narr",t:"Artefact obtenu : 🔮 <b>Éclat de la Faille</b> (+6 PV dans chaque Labyrinthe)."}); }
  } else if(!win && se===12){
    lines.push({who:"narr",t:"Le noir vous repousse jusqu'en haut de l'escalier. Darkrai rit, très loin. La trappe se referme."});
    lines.push({who:"hector",t:"<i>Hector, essoufflé, la main sur ton épaule.</i> Pas cette fois. Mais il a eu peur, petit. Je l'ai vu. Cent ans que personne ne lui avait fait peur. On y retournera."});
    S.finale[se]=undefined; delete S.finale[se];
  } else if(win && se===10){
    S.pages+=4; addXP(400); S.lise=true;
    lines.push({who:"narr",t:"Au fond du monde à l'envers, Giratina repose doucement ses ailes. Les escaliers se remettent à l'endroit, un par un."});
    lines.push({who:{id:487,n:"Giratina"},t:"<i>Plus bas, presque humble.</i> On m'a banni pour ma colère. J'ai gardé les regrets des autres parce que c'était tout ce qu'on m'envoyait. Ton âme ne m'a pas combattu pour me les reprendre. Elle m'a demandé si j'avais froid. …Personne ne m'avait jamais demandé ça. Prends le ruban. Et laisse-moi la porte entrouverte. Juste un peu. Pour les soirs où je voudrai un verre."});
    lines.push({who:"narr",t:"Par l'escalier de la cave monte une petite fille, avec un ruban rouge dans les cheveux. À chaque marche, elle a l'air plus vieille, puis plus jeune, comme si le temps ne savait pas quoi faire d'elle. Arrivée en haut, c'est une vieille dame aux yeux d'enfant."});
    lines.push({who:{id:92,n:"Lise"},t:"<i>Elle regarde la salle, le comptoir, le portrait tombé.</i> Papa ? Le soir de la fête, je me suis perdue dans le brouillard. Une famille m'a recueillie, loin. J'ai grandi. Je suis revenue à Bourg-Brume, vieille. La taverne était fermée, on la disait hantée. Je n'ai jamais osé pousser la porte. Je laissais du lait chaud sur ma fenêtre, pour un petit chat des rues, en me disant que toi aussi, tu aurais fait ça."});
    lines.push({who:"hector",t:"<i>Hector apparaît, tout entier, sans violet, avec sa moustache et son tablier. Il ne dit rien. Il ouvre les bras.</i> …Pardon, ma Lise. Pour les mots durs. J'aurais dû courir après toi. Je t'ai attendue au lieu de te chercher."});
    lines.push({who:{id:92,n:"Lise"},t:"Moi aussi, je t'ai attendu. On s'est attendus, papa. C'est fini, maintenant."});
    lines.push({who:"narr",t:"Ils restent longtemps serrés l'un contre l'autre, au milieu de la taverne. Puis Lise s'efface doucement, comme une bougie qu'on souffle. Sur le comptoir, son ruban rouge est resté."});
    lines.push({who:"narr",t:"Carte légendaire obtenue : 🎀 <b>Le Ruban de Lise</b>. Quatre pages s'écrivent au Grand Registre."});
    addCard("rubanlise","le cadeau de Lise");
    if(!S.equip.faille){ S.equip.faille=true; lines.push({who:"narr",t:"Artefact obtenu : 🔮 <b>Éclat de la Faille</b> (+6 PV dans chaque Labyrinthe)."}); }
    lines.push({who:"hector",t:"<i>Hector, la voix légère, presque un rire.</i> Je pourrais partir, maintenant, petit. Je le sens. Mais tu sais quoi ? Je crois que je vais rester encore un peu. Il y a une Faille à surveiller, un Giratina qui veut un verre de temps en temps, et un tavernier qui a encore beaucoup à apprendre. Hé hé."});
    if(S.clients.miaouss && ["apaise","staff"].includes(S.clients.miaouss.state)) lines.push({who:{id:52,n:"Miaouss"},t:"<i>Le lendemain matin, Miaouss trouve le ruban rouge accroché à sa petite fenêtre aux bols de lait. Il le regarde longtemps.</i> …Elle s'appelait Lise. Je ne l'ai jamais su. Merci, voisin."});
  } else if(win && se===9){
    S.pages+=2; addXP(250); S.hectorMem=1;
    lines.push({who:"narr",t:"Au fond de la cave, l'ombre au sourire d'Hector cesse de se débattre. Elle s'assoit sur la dernière marche, comme un vieil homme fatigué, et regarde vers la porte murée."});
    lines.push({who:"hector",t:"<i>Hector apparaît en entier, pour la première fois, debout dans la cave. Il regarde son ombre longtemps.</i> Je me souviens, maintenant. Pas de tout. D'une petite fille, avec un ruban rouge, qui courait entre les tables. Ma fille. Lise. Elle avait sept ans."});
    lines.push({who:"hector",t:"On s'est disputés, un soir. Une bêtise. Elle voulait aller à la fête, je devais servir. Je lui ai dit des mots durs. Elle est partie en claquant la porte. Je me suis dit : elle reviendra, elle revient toujours. Elle n'est pas revenue."});
    lines.push({who:"narr",t:"L'ombre se lève, prend la main d'Hector, et se fond en lui. Hector a l'air un peu plus solide, un peu moins violet."});
    if(!S.equip.faille){ S.equip.faille=true; lines.push({who:"narr",t:"Artefact obtenu : 🔮 <b>Éclat de la Faille</b> (+6 PV dans chaque Labyrinthe)."}); }
    lines.push({who:"narr",t:"Deux pages s'écrivent au Grand Registre. Sur la première, une seule phrase : « Lise, sept ans, un ruban rouge. »"});
    lines.push({who:"hector",t:"<i>Plus bas.</i> Je ne sais pas encore ce qui lui est arrivé, petit. Mais la porte murée, au fond de la cave… elle tremble. Quelque chose, de l'autre côté, sait que je me souviens. Et ça ne lui plaît pas."});
  } else if(win && se===8){
    S.pages+=3; addXP(350); S.hooh=true;
    lines.push({who:"narr",t:"Au fond de la cave, les cendres s'envolent d'un coup, et deviennent des plumes de toutes les couleurs."});
    lines.push({who:{id:250,n:"Ho-Oh"},t:"<i>Il déploie ses ailes au-dessus de la place, et toute la fête lève les yeux.</i> Je croyais qu'il fallait mériter de revenir. Réparer la tour, effacer l'incendie. Mais personne ici ne m'a demandé de réparer quoi que ce soit. Ils ont juste levé la tête. …Je reviendrai chaque année. Pour la fête."});
    lines.push({who:"narr",t:"Ho-Oh fait trois tours au-dessus de Bourg-Brume. Un arc-en-ciel se lève en pleine nuit, du clocher jusqu'à la colline de la ferme. La fanfare reprend. Sur le comptoir du stand, une plume aux sept couleurs est restée."});
    lines.push({who:"narr",t:"Carte légendaire obtenue : 🌈 <b>Plume Arc-en-ciel</b>. Trois pages s'écrivent au Grand Registre."});
    addCard("arcenciel","le cadeau de Ho-Oh");
    if(!S.equip.faille){ S.equip.faille=true; lines.push({who:"narr",t:"Artefact obtenu : 🔮 <b>Éclat de la Faille</b> (+6 PV dans chaque Labyrinthe)."}); }
    lines.push({who:"hector",t:"<i>Le mur tremble, longtemps, et pour la première fois on entend Hector pleurer de rire.</i> Une fête, petit. Une vraie. Avec Ho-Oh. …Je me souviens, maintenant. Pourquoi j'ai ouvert cette taverne, autrefois. Je te raconterai. Bientôt."});
  } else if(win && se===6){
    S.pages+=3; addXP(300); S.mewtwo=true;
    lines.push({who:"narr",t:"Au fond de la cave, la lumière froide se réchauffe, tout doucement, jusqu'à devenir celle d'une bougie."});
    lines.push({who:{id:150,n:"Mewtwo"},t:"<i>Il pose les pieds par terre. C'est peut-être la première fois.</i> Je croyais qu'il fallait une raison pour exister. Une mission, un créateur, une utilité. Ton âme ne m'a donné aucune raison. Elle m'a juste dit : « reste, si tu veux ». …Je crois que je veux."});
    lines.push({who:"narr",t:"Mewtwo s'assoit au comptoir, maladroitement, comme quelqu'un qui n'a jamais eu de tabouret. Tu lui sers un verre de lait. Il le regarde longtemps, puis le boit d'un trait. Au matin, il est parti. Sur le comptoir, une cuillère est restée pliée en forme de cœur."});
    lines.push({who:"narr",t:"Carte légendaire obtenue : 🧬 <b>Droit d'Exister</b>. Trois pages s'écrivent au Grand Registre."});
    addCard("droitdexister","le cadeau de Mewtwo");
    if(!S.equip.faille){ S.equip.faille=true; lines.push({who:"narr",t:"Artefact obtenu : 🔮 <b>Éclat de la Faille</b> (+6 PV dans chaque Labyrinthe)."}); }
    lines.push({who:"hector",t:"<i>Le mur tremble, longtemps.</i> Mewtwo… dans ma taverne. Je n'aurais jamais cru. …Le prochain chapitre sera plus léger, petit. Une fête. Profites-en. Moi, je commence à me souvenir de choses que j'avais oubliées."});
  } else if(win && se===4){
    S.pages+=3; addXP(300); S.suicune=true;
    lines.push({who:"narr",t:"Au fond de la cave, l'eau trouble s'éclaircit d'un coup, comme si quelqu'un avait ouvert une fenêtre sur une source."});
    lines.push({who:{id:245,n:"Suicune"},t:"<i>Il se relève, et ses pattes ne laissent plus de traces noires.</i> Je croyais que purifier, c'était effacer. Rendre le lac comme avant. Mais on ne revient jamais avant. On aide l'eau à couler, et elle se nettoie toute seule, un peu chaque jour. Je vais retourner au lac. Pas pour le réparer. Pour rester à côté de lui."});
    lines.push({who:"narr",t:"Suicune s'incline devant toi, et le vent du nord traverse la taverne en emportant toute la poussière des étagères. Sur le comptoir, une goutte d'eau parfaitement claire est restée."});
    lines.push({who:"narr",t:"Carte légendaire obtenue : 💧 <b>Aurore Pure</b>. Trois pages s'écrivent au Grand Registre."});
    addCard("aurorepure","le cadeau de Suicune");
    if(!S.equip.faille){ S.equip.faille=true; lines.push({who:"narr",t:"Artefact obtenu : 🔮 <b>Éclat de la Faille</b> (+6 PV dans chaque Labyrinthe)."}); }
    lines.push({who:"hector",t:"<i>Le mur tremble.</i> Un légendaire, petit. Tu as écouté un légendaire. …Le chapitre se ferme. Le prochain sera plus étrange. Hé hé."});
  } else if(win && se===11){
    S.pages+=2; addXP(250);
    lines.push({who:"narr",t:"Au fond de la cave, la lumière redevient calme. Giratina replie ses ailes sur les dernières marches, comme un gros chat qui garde une porte."});
    if(!S.equip.faille){ S.equip.faille=true; lines.push({who:"narr",t:"Artefact obtenu : 🔮 <b>Éclat de la Faille</b> (+6 PV dans chaque Labyrinthe)."}); }
    lines.push({who:"narr",t:"Deux pages s'écrivent au Grand Registre."});
    lines.push({who:"hector",t:"<i>Hector t'attend en haut de l'escalier, et pose la main sur ton épaule. Elle est presque chaude.</i> Tu es descendu sans moi, et tu es remonté. Bien. …La prochaine fois, petit, je crois que j'essaierai de descendre aussi. Une marche. Juste une."});
  } else if(win){
    S.pages+=2; addXP(200);
    lines.push({who:"narr",t:"Au fond de la cave, la lumière redevient violette, calme. La trappe se referme doucement, comme on borde quelqu'un."});
    if(!S.equip.faille){ S.equip.faille=true; lines.push({who:"narr",t:"Sur la dernière marche, un éclat de lumière est resté accroché. Il pulse comme un cœur."},{who:"narr",t:"Artefact obtenu : 🔮 <b>Éclat de la Faille</b>. Il accompagnera chaque client dans son Labyrinthe : +6 PV."}); }
    lines.push({who:"narr",t:"Deux pages s'écrivent d'un coup au Grand Registre."});
    lines.push({who:"hector",t:"<i>Le mur tremble, et une main violette fait un petit signe avant de disparaître.</i> Pas mal, Tenancier. Pas mal du tout. …Un jour, il faudra que je te parle de cette ombre-là. Pas aujourd'hui. Hé hé."});
  } else {
    lines.push({who:"narr",t:"La lumière reflue toute seule, à contrecœur. La trappe claque. Le silence revient, mais quelque chose gratte encore, très loin en dessous."});
    lines.push({who:"cog",t:cogSay("defaite")});
  }
  playDialog(lines, (!win && se===12) ? renderFinaleChoice : endSeason, ()=>{ $app.innerHTML=`${hud()}${scene({night:false,doorOpen:false})}<div class="panel">${dialogBubble()}</div>`; });
}
// ---------- Fin de saison : la chronique ----------
const LAST_SEASON = 12; // chapitre 1 « Portes ouvertes » (saisons 1 et 2) + début du chapitre 2 « La saison des pluies » (saison 3)
function seasonStats(){ const z=S.stats0||{served:0,perfect:0,earned:0,apaise:0}; return {served:S.stats.served-z.served, perfect:S.stats.perfect-z.perfect, earned:S.stats.earned-z.earned}; }
function endSeason(){
  music("fin");
  S.night=Math.min(S.night,NIGHTS_PER_SEASON);
  const season=S.season||1;
  if(!S.seasonOver){
    S.seasonOver=true;
    // L'échec utile : chaque âme rencontrée mais non apaisée laisse un Fragment amer pour la saison suivante
    S.amerGiven=[];
    CLIENT_ORDER.filter(k=>inSeason(k) && S.clients[k].visits>0 && isAvailable(k)).forEach(k=>{
      S.fragments.push({n:`Regret amer de ${CL[k].n}`,e:"tristesse",from:k,amer:true}); S.clients[k].amerSeason=season; S.amerGiven.push(k);
    });
    S.chronicles=S.chronicles||[];
    S.chronicles.push({season, apaise:S.log.filter(l=>l.type==="apaise").map(l=>l.k), stats:seasonStats(), duet:!!S.duetDone});
    save();
  }
  const ap = S.log.filter(l=>l.type==="apaise").map(l=>l.k);
  const first = S.log.find(l=>l.type==="first");
  const quoteK = ap[ap.length-1];
  const quote = quoteK ? CL[quoteK].stages[CL[quoteK].stages.length-1].t : "La porte s'est ouverte, et nous avons écouté.";
  const st=seasonStats(), last = season>=LAST_SEASON;
  $app.innerHTML = `<div class="pad fade scroll" style="flex:1">
    <div class="parch" id="chron">
      <h2>Chronique de la saison ${season}</h2>
      <div class="center small">${season===2?"Chapitre 1 · Portes ouvertes · ":season===3||season===4?"Chapitre 2 · La saison des pluies · ":season===5||season===6?"Chapitre 3 · Les métamorphoses · ":season===7||season===8?"Chapitre 4 · La fête de Bourg-Brume · ":season===9||season===10?"Chapitre 5 · Le secret d'Hector · ":season===11||season===12?"Chapitre 6 · Les premiers pas · ":""}La taverne · Bourg-Brume</div>
      <div class="souls">
        <div class="soul">${sprite(S.ten.id,S.ten.n,S.ten.c,{shiny:S.shiny})}</div>
        <div class="soul">${sprite(cog().id,cog().n,cog().c)}</div>
      </div>
      <div class="center"><b>${S.ten.n}${S.shiny?" chromatique":""}</b>, Tenancier, et <b>${cog().n}</b>, co-gérant.</div>
      <h3 class="px" style="margin:14px 0 4px;color:#6a3a14">Âmes apaisées</h3>
      ${ap.length?`<div class="souls">${ap.map(k=>`<div class="soul">${sprite(CL[k].id,CL[k].n,CL[k].c)}</div>`).join("")}</div>`:`<p class="small">Aucune âme apaisée cette saison. Elles reviendront.</p>`}
      ${S.finale&&S.finale[season]?`<p class="small"><b>Le Grand Écho :</b> ${S.finale[season]==="win"?"la Faille a été apaisée.":S.finale[season]==="lose"?"la Faille a résisté, pour cette fois.":"la Faille s'est refermée seule."}</p>`:""}
      ${S.cmd&&S.cmd.season===season?`<p class="small"><b>Commandes de la Faille :</b> ${S.cmd.ids.filter(i=>S.cmd.done[i]).length}/3 accomplies.</p>`:""}
      ${first?`<p class="small"><b>Moment fort :</b> nuit ${first.night}, ${CL[first.k].n} a trouvé la paix dans le Labyrinthe des Origines.</p>`:""}
      ${S.duetDone && S.chronicles && S.chronicles.filter(c=>c.duet).length===1 && S.chronicles[S.chronicles.length-1].duet ? `<p class="small"><b>Une rencontre :</b> Rondoudou a chanté son quatrième couplet, et Ronflex est resté éveillé jusqu'au bout.</p>`:""}
      <blockquote>« ${quote} »</blockquote>
      ${(S.amerGiven||[]).length?`<p class="small"><b>Ceux qui reviendront :</b> ${S.amerGiven.map(k=>CL[k].n).join(", ")}. Chacun laisse un Fragment amer, qui pourra l'aider à la saison prochaine.</p>`:""}
      <div class="stats">
        <div>Verres servis : <b>${st.served}</b></div><div>Verres parfaits : <b>${st.perfect}</b></div>
        <div>Pokédollars gagnés : <b>${st.earned} ₽</b></div><div>Pages du Registre : <b>${S.pages}</b></div>
        <div>Niveau du Tenancier : <b>${S.level}</b></div><div>Personnel : <b>${S.staff.map(k=>CL[k].n).join(", ")||"aucun"}</b></div>
      </div>
      ${season===2?`<p class="small center" style="margin-top:10px"><b>Fin du chapitre 1 · Portes ouvertes.</b> La taverne a appris à écouter.</p>`:season===4?`<p class="small center" style="margin-top:10px"><b>Fin du chapitre 2 · La saison des pluies.</b> La taverne a appris à rester à côté de ceux qui ont perdu quelqu'un.</p>`:season===12?`<p class="small center" style="margin-top:10px"><b>Fin du chapitre 6 · Les premiers pas.</b> La taverne a appris qu'on peut réparer ce qu'on a cassé, et qu'il faut parfois du courage pour franchir sa propre porte.</p>`:season===10?`<p class="small center" style="margin-top:10px"><b>Fin du chapitre 5 · Le secret d'Hector.</b> La taverne a appris qu'il n'est jamais trop tard pour revenir.</p>`:season===8?`<p class="small center" style="margin-top:10px"><b>Fin du chapitre 4 · La fête de Bourg-Brume.</b> La taverne a appris à rendre les solitaires à la ville.</p>`:season===6?`<p class="small center" style="margin-top:10px"><b>Fin du chapitre 3 · Les métamorphoses.</b> La taverne a appris à aimer chacun tel qu'il est, même ceux qui n'ont pas demandé à naître.</p>`:""}
    </div>
    <div class="row" style="margin-top:14px"><button class="grow alt" data-act="copyChron">Copier la chronique</button>${last?`<button class="grow" data-act="startPostgame">✦ La suite : après la fin</button>`:`<button class="grow" data-act="nextSeason">Commencer la saison ${season+1}</button>`}</div>
    <p class="small muted center">${last?"Les six chapitres sont terminés : Hector a franchi la porte de sa taverne. La taverne continue : des voyageurs du monde entier arrivent, et chaque nuit la Faille rêve un nouveau donjon.<br><a href='#' data-act='newGameAsk' style='color:var(--candle)'>Ou recommencer une nouvelle partie</a>":"Tes niveaux, ton personnel, tes affinités, tes recettes et tes artefacts te suivent. Les bibelots, eux, restent dans la saison qui s'achève."}</p>
  </div>`;
}
function startNextSeason(){
  S.season=(S.season||1)+1; S.night=1; S.seasonOver=false; S.log=[]; S.bibelots=[]; S.amerGiven=[];
  S.stats0={served:S.stats.served,perfect:S.stats.perfect,earned:S.stats.earned,apaise:S.stats.apaise};
  CLIENT_ORDER.forEach(k=>{ if(!S.clients[k]) S.clients[k]={aff:0,state:"new",carryOuv:0,carryTen:0,visits:0,shake:false}; S.clients[k].lastNight=0; });
  U={}; save();
  const lines=[
    ...(S.season===12?[
      {who:"narr",t:"Chapitre 6 · Les premiers pas. Saison 12."},
      {who:"narr",t:"L'été arrive. Le Grand Registre est presque plein. Un soir, après la fermeture, Hector ne fait pas de blague. Il s'assoit en face de toi, de l'autre côté du comptoir, à la place des clients."},
      {who:"hector",t:"<i>Très bas.</i> Petit. Il faut que je te dise la vérité. Toutes les âmes égarées qui sont passées par cette porte… C'est de ma faute."},
      {who:"hector",t:"Quand Lise est partie, j'ai attendu. Mais un fantôme qui attend s'efface, petit. Je sentais que j'allais disparaître avant son retour. Alors une nuit, quelqu'un est venu me voir dans mes cauchemars. Darkrai. Il m'a proposé un marché : je resterais en ce monde, tant que je lui donnerais des âmes."},
      {who:"hector",t:"<i>Sa voix se brise.</i> Les voyageurs qui s'endormaient ici… je laissais la Faille leur prendre un morceau d'âme. Leurs regrets. Ils repartaient le matin un peu plus vides, un peu plus perdus. Et ils revenaient, des années plus tard, la nuit, sans savoir pourquoi. Machopeur. Ponchiot. Tous. Je les ai volés pour durer."},
      {who:"cog",t:"<i>Le co-gérant ne dit rien pendant un long moment.</i> …Et nous ? Pourquoi le Tenancier est venu ici ?"},
      {who:"hector",t:"Parce que je l'ai appelé. Quand j'ai compris ce que j'avais fait, j'ai fait la seule chose que je pouvais : faire venir quelqu'un qui saurait les écouter. Toi. Tu as rendu à chacune ce que je lui avais pris. Je ne sais pas comment te remercier. Je ne sais pas comment leur demander pardon."},
      {who:"hector",t:"<i>Il se lève.</i> Cette saison, il reste des âmes sur le seuil. Écoute-les, comme les autres. Et à la fin… il faudra descendre. Moi aussi. C'est mon donjon, cette fois."}
    ]:S.season===11?[
      {who:"narr",t:"Chapitre 6 · Les premiers pas. Saison 11."},
      {who:"narr",t:"Le printemps revient sur Bourg-Brume. Le ruban rouge de Lise est accroché au-dessus du comptoir. La porte de la cave reste entrouverte, juste un peu, comme Giratina l'a demandé."},
      {who:"hector",t:"<i>Hector est assis au bout du comptoir, presque solide, sa moustache bien peignée.</i> Tu sais ce qui est drôle, petit ? Pendant cent ans, j'ai attendu au lieu d'agir. Et maintenant que je pourrais partir, je n'ose pas. Je reste sur le seuil. Comme un débutant."},
      {who:"cog",t:"Patron, il y avait un œuf sur le paillasson ce matin. Avec un mot : « Pour la taverne. » Je l'ai mis sur un tabouret, près du poêle. Il bouge un peu."},
      {who:"hector",t:"Cette saison, ils viendront parce qu'ils n'osent pas commencer. Le premier pas, petit. Le plus dur. Ne les pousse pas. Tends-leur la main, c'est tout. Et si tu en as une de libre… tends-la-moi aussi, un jour."}
    ]:S.season===10?[
      {who:"narr",t:"Chapitre 5 · Le secret d'Hector. Saison 10."},
      {who:"narr",t:"L'hiver tombe sur Bourg-Brume, plus tôt que d'habitude. La porte murée de la cave ne tremble plus : elle respire. Certaines nuits, une odeur de feuilles mortes en sort, et on entend des pas qui montent sans jamais arriver."},
      {who:"hector",t:"<i>La voix d'Hector, plus claire depuis qu'il a retrouvé son ombre.</i> Lise, petit. Je n'arrête pas d'y penser. Où est-elle allée, ce soir-là ? Je n'ai jamais cherché. J'ai attendu. C'est ça, mon vrai regret. Pas qu'elle soit partie. Que je ne sois jamais allé la chercher."},
      {who:{id:52,n:"Miaouss"},t:"<i>Miaouss passe la tête par la porte, un chaton sur l'épaule.</i> Dis, voisin. La vieille dame qui me laissait du lait sur sa fenêtre, quand j'étais petit… Elle avait un ruban rouge, tout délavé, noué à son poignet. Elle regardait toujours ta taverne, de loin. Je viens d'y repenser. Je ne sais pas pourquoi."},
      {who:"hector",t:"<i>Un très long silence.</i> …Un ruban rouge."},
      {who:"cog",t:"Patron. Cette saison, on écoute ceux qui n'ont pas fini. Et à la fin, on va finir l'histoire d'Hector. Je le sens."}
    ]:S.season===9?[
      {who:"narr",t:"Chapitre 5 · Le secret d'Hector. Saison 9."},
      {who:"narr",t:"L'automne revient sur Bourg-Brume. Depuis la fête, quelque chose a changé dans la taverne : la nuit, on entend des pas dans la cave, et le vieux portrait au-dessus de la cheminée, celui qu'on ne regardait plus, semble sourire un peu."},
      {who:"hector",t:"<i>La voix d'Hector, pour la première fois sans un rire.</i> Petit… Assieds-toi. Ce portrait, au-dessus de la cheminée. L'homme à la moustache, avec le tablier. C'est moi. Avant. Quand j'avais encore une ombre, et pas une ombre à la place de moi."},
      {who:"hector",t:"Je m'appelais Hector. J'étais le tavernier, ici, il y a cent ans. Et une nuit, j'ai attendu quelqu'un qui n'est jamais venu. J'ai attendu si fort, si longtemps, que je suis resté. Les Ectoplasma, petit, ce sont les ombres de ceux qui n'ont pas su partir."},
      {who:"cog",t:"Patron… Hector était humain ? Et la Faille, alors, dans la cave ? C'est lui qui l'a ouverte ?"},
      {who:"hector",t:"<i>Un long silence.</i> Cette saison, ils viendront parce qu'ils ont laissé quelque chose d'inachevé. Une promesse, une lettre, une attente. Comme moi. Écoute-les bien, petit. Peut-être qu'en les écoutant, je me souviendrai du reste."}
    ]:S.season===8?[
      {who:"narr",t:"Chapitre 4 · La fête de Bourg-Brume. Saison 8."},
      {who:"narr",t:"Un matin, l'enseigne du Pourboire d'Or ne s'allume pas. À midi, un huissier cloue une planche en travers de la porte.",img:"pourboire"},
      {who:{id:431,n:"Chaglam"},t:"<i>Chaglam, la commère du village, s'accoude à ta fenêtre, ravie et un peu triste à la fois.</i> Tu as vu ? Faillite ! Le banquier a tout saisi. Et son associé, le grand Persian, est parti avec la caisse la veille. Le pauvre Miaouss dort dans la remise, il paraît. Moi je dis : c'était à prévoir. …Mais ça fait quand même quelque chose."},
      {who:"cog",t:"Patron… La rue est toute sombre, sans son enseigne. Je ne pensais pas que ça me ferait de la peine."},
      {who:"narr",t:"Sur la place, on monte les derniers stands. La fête aura lieu à la fin de la saison. Le maire t'a gardé un emplacement, juste à côté de l'étal de Kecleon."},
      {who:"hector",t:"<i>La voix d'Hector, pensive.</i> Hé… Celui qui comptait ses pièces n'a plus rien à compter. Il viendra, petit. Pas cette nuit, peut-être. Mais il viendra. Et ce soir-là, ne lui fais pas payer."}
    ]:S.season===7?[
      {who:"narr",t:"Chapitre 4 · La fête de Bourg-Brume. Saison 7."},
      {who:"narr",t:"La fin de l'été approche, et tout Bourg-Brume ne parle que d'une chose : la grande fête annuelle, à la fin de la saison prochaine. On accroche déjà des lampions au clocher, on repeint les étals, on répète la fanfare sur la place."},
      {who:"narr",t:"Mais dans une ville qui se prépare à faire la fête ensemble, ceux qui sont seuls le sont encore plus. Ceux que la ville a oubliés en grandissant. Ceux qui ne servent plus à rien, croient-ils."},
      {who:{id:52,n:"Miaouss"},t:"<i>Il compte ses pièces sur son seuil, moins vite qu'avant.</i> La fête, voisin ? Je vais louer le plus grand stand de la place. Des verres dorés à la louche. …Enfin, si le banquier veut bien me prêter encore un peu. Il me regarde bizarrement, ces temps-ci."},
      {who:"cog",t:"Patron… Le maire a demandé si la taverne voulait un stand, à la fête. J'ai dit qu'on réfléchirait. On n'a jamais fait la fête, nous. On a toujours été ceux qui écoutent, après."},
      {who:"hector",t:"<i>La voix d'Hector, plus douce que d'habitude.</i> Hé… La fête, petit, c'est quand une ville se souvient qu'elle est une ville. Cette saison, ils viendront parce que la ville les a oubliés. Ne les guéris pas de la solitude. Rends-les juste à la ville."}
    ]:S.season===6?[
      {who:"narr",t:"Chapitre 3 · Les métamorphoses. Saison 6."},
      {who:"narr",t:"L'été arrive sur Bourg-Brume. Les Chrysacier du jardin public sont devenus des Papilusion, sauf un, qui prend son temps. Les villageois ont appris à ne plus demander « tu évolues quand ? »."},
      {who:{id:52,n:"Miaouss"},t:"<i>La pancarte des Super Bonbons a disparu. Miaouss regarde la taverne depuis son seuil, sans rien dire.</i> …Ils sont revenus me demander de la Confiture d'Antan, voisin. Celle qui a le même goût depuis toujours. Chez moi. J'en ai pas. Tu te rends compte ? Ils veulent rester comme ils sont, et ils paient pour ça."},
      {who:"cog",t:"Patron… J'ai rêvé d'une silhouette violette, cette nuit. Immense. Qui flottait au-dessus de la Faille sans oser descendre."},
      {who:"hector",t:"<i>La voix d'Hector, grave, presque inquiète.</i> Hé… Celui-là, petit, personne ne l'a fait naître par amour. On l'a fabriqué. Quand il viendra, ne lui demande pas d'où il vient. Demande-lui s'il veut rester."}
    ]:S.season===5?[
      {who:"narr",t:"Chapitre 3 · Les métamorphoses. Saison 5."},
      {who:"narr",t:"Au printemps, tout Bourg-Brume change. Les Chenipan du jardin public deviennent des Chrysacier, les Ptitard de la fontaine des Têtartes. Sur la place, on ne parle plus que de ça : qui a évolué, qui pas encore."},
      {who:{id:52,n:"Miaouss"},t:"<i>Il affiche une pancarte devant le Pourboire d'Or : « SUPER BONBONS · ÉVOLUEZ CE SOIR · PAIEMENT À LA SORTIE ».</i> Grandir, voisin, c'est rentable. Personne ne paie pour un Pokémon qui reste petit."},
      {who:"cog",t:"Patron… Il vend de l'évolution en bocal, maintenant. Et Kecleon a reçu de la Confiture d'Antan, celle qui a le même goût depuis cent ans. Il paraît que ça aide à rester soi-même."},
      {who:"hector",t:"<i>La voix traverse le mur, songeuse.</i> Hé… Cette saison, ils viendront parce qu'ils n'ont pas changé comme on l'attendait d'eux. Ou parce qu'ils ont trop changé. Ne leur dis pas qui devenir, petit. Aide-les juste à se souvenir de qui ils sont."}
    ]:S.season===4?[
      {who:"narr",t:"Chapitre 2 · La saison des pluies. Saison 4."},
      {who:"narr",t:"Un matin, des ouvriers arrivent en face de la taverne avec des charrettes de dorures. En trois jours, la vieille grange devient un palais qui brille comme une pièce neuve."},
      {who:"narr",t:"<b>Le Pourboire d'Or</b> ouvre ses portes. Une enseigne géante, un tapis rouge, et des verres si forts qu'on oublie tout après le premier.",img:"pourboire"},
      {who:{id:52,n:"Miaouss"},t:"<i>Il traverse la rue, une pièce d'or entre les griffes, qu'il fait tourner sans arrêt.</i> Alors c'est toi, le petit nouveau qui écoute les clients pleurer ? Moi, je leur sers du fort, je leur prends leur argent, et ils oublient. Tout le monde y gagne. Bonne chance, voisin."},
      {who:"cog",t:"Patron… Il va nous voler nos clients. Même la nuit, j'ai l'impression que son enseigne brille à travers la Faille."},
      {who:"hector",t:"<i>La voix passe à travers le mur, très sèche.</i> Hm. Un Miaouss. J'en ai connu un, autrefois, qui comptait ses pièces pour ne pas compter autre chose. Ne te bats pas contre lui, petit. Fais juste ton travail. Mieux que lui."}
    ]:S.season===3?[
      {who:"narr",t:"Chapitre 2 · La saison des pluies. Saison 3."},
      {who:"narr",t:"La pluie ne s'arrête plus sur Bourg-Brume. Elle coule des toits, remplit les tonneaux, efface les chemins. Les villageois disent que c'est la saison où les âmes pleurent ce qu'elles ont perdu."}
    ]:[{who:"narr",t:`Saison ${S.season}. Les premières pluies d'automne tambourinent sur le toit de la taverne.`}]),
    {who:"cog",t:cogSay("saison")},
    ...((SEASON_NEW[S.season]||[]).length?[{who:"kecleon",t:`Nouvel arrivage à l'étal, patron ! ${(SEASON_NEW[S.season]).map(k=>ING[k].n).join(", ")}. Personne d'autre au village n'en a !`}]:[]),
    S.season===12 ? {who:"cog",t:"Dernière saison du chapitre. On finit ce qu'on a commencé, patron. Pour elles. Et pour lui."} : S.season===11 ? {who:"cog",t:"Une saison pour ceux qui restent sur le pas de la porte. On leur garde la porte ouverte."} : S.season===10 ? {who:"cog",t:"Dernière saison du chapitre. On garde la porte de la cave à l'œil."} : S.season===9 ? {who:"cog",t:"Une saison pour ceux qui n'ont pas fini quelque chose. On va les aider à finir, patron. Et Hector aussi, peut-être."} : S.season===8 ? {who:"cog",t:"Dernière saison du chapitre. Et à la fin, la fête ! On aura un stand, patron. Un vrai."} : S.season===7 ? {who:"cog",t:"Une saison pour ceux qui sont seuls. On leur gardera une place à la fête."} : S.season===6 ? {who:"cog",t:"Dernière saison du chapitre. On garde un tabouret libre, au cas où."} : S.season===5 ? {who:"cog",t:"Une saison de changements. On sera là, quoi qu'ils deviennent."} : S.season===4 ? {who:"cog",t:"Et cette saison, ceux qui ont perdu quelqu'un continuent d'arriver. On reste à côté d'eux, comme dit Hector."} : S.season===3
      ? {who:"hector",t:"<i>La voix traverse le mur, plus basse que d'habitude.</i> Hé… Cette saison, ils ne viendront pas parce qu'ils ont échoué, ou parce qu'on les a laissés. Ils viendront parce qu'ils ont perdu quelqu'un. Ceux-là, petit, il ne faut pas les réparer. Il faut juste rester à côté."}
      : {who:"hector",t:"<i>Une voix rieuse traverse le mur.</i> Hé hé… Prépare un tabouret de plus, petit. Ce soir, quelqu'un de très fier va pousser la porte. Quelqu'un que personne n'a jamais attendu."}
  ];
  playDialog(lines, startDay, ()=>{ $app.innerHTML=`${hud()}${scene({doorOpen:false})}<div class="panel">${dialogBubble()}</div>`; });
}
function copyChron(){
  const ap = S.log.filter(l=>l.type==="apaise").map(l=>CL[l.k].n);
  const txt = `Chronique de la taverne — saison ${S.season||1}\n${S.ten.n}${S.shiny?" chromatique":""} (Tenancier) et ${cog().n} (co-gérant)\nÂmes apaisées : ${ap.join(", ")||"aucune"}\nVerres servis : ${S.stats.served} · parfaits : ${S.stats.perfect} · ${S.stats.earned} ₽\nTavern Keeper's Ledger`;
  try{ navigator.clipboard.writeText(txt).then(()=>toast("Chronique copiée !"),()=>toast("Copie impossible ici.")); }catch(e){ toast("Copie impossible ici."); }
}
