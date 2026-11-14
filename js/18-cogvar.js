// ---------- Répliques variées du co-gérant ----------
// Pour les moments qui reviennent chaque nuit : une réplique au hasard, jamais la même deux fois de suite,
// dont une partie dépend du caractère du co-gérant (Tarsal ressent, Marcacrin renifle, Otaria rassure, Pichu s'enthousiasme, Sorbébé se tait, Pifeuil souffle).
const COG_LINES = {
  ouvrir:{
    all:["C'est l'heure, patron. On ouvre ?","Minuit pile. J'allume les dernières bougies ?","La porte brille… Quelqu'un attend déjà, j'en suis sûr.","Les verres sont propres, le comptoir est essuyé. On est prêts.","Encore une nuit. J'aime bien ce moment, juste avant qu'ils arrivent.","Tu entends ? Le silence de Bourg-Brume. Et puis… ce petit grincement de porte.","J'ai mis de l'eau à chauffer. On ne sait jamais qui va passer.","Allez, patron. Qui sait quelle histoire on va entendre ce soir ?"],
    tarsal:["Je… je sens déjà des émotions derrière la porte. Quelqu'un hésite à entrer.","Il y a beaucoup de peine dehors, ce soir. On va l'accueillir doucement."],
    marcacrin:["*renifle* Ça sent la pluie… et quelqu'un qui n'a pas mangé depuis longtemps.","Mon groin me chatouille. Il va y avoir du monde !"],
    otaria:["Pas de stress, patron ! Si un verre est raté, on en refait un. On ouvre ?","J'ai mis un torchon propre sur mon épaule. Je suis prête à tout !"],
    pichu:["Pichu ! Pichu-pi ! …Pardon. J'ai hâte. On ouvre, on ouvre ?","Je suis tout chargé ! Je pourrais éclairer la salle à moi tout seul !"],
    sorbebe:["…On ouvre.","Je suis prêt. J'écouterai ce qu'ils ne disent pas."],
    pifeuil:["Un petit souffle sur les bougies… voilà. L'ambiance est parfaite.","Le vent tourne, patron. Quelqu'un arrive avec lui."]
  },
  finVide:{
    all:["Quelle nuit… Ils sont tous repartis dans cette lumière violette. Tu crois qu'ils reviendront ?","Personne ne s'est vraiment confié ce soir. Ce n'est pas grave : demain, peut-être.","Les tabourets sont vides. Mais on a semé quelque chose, je le sens.","Ils sont repartis, mais un peu moins lourds qu'en arrivant. C'est déjà ça.","Une nuit calme. Parfois, il faut juste qu'ils sachent que la porte est ouverte."],
    tarsal:["Ils partent toujours avec un peu moins de tristesse. Je l'ai senti, patron."],
    otaria:["On fera mieux demain ! Et puis, on a bien rigolé quand j'ai renversé le seau."],
    pichu:["Pi… je suis tout vidé. Mais on a été super, hein ?"],
    sorbebe:["…Ils reviendront. Ils reviennent toujours."]
  },
  finPersonne:{
    all:["Personne n'est prêt à descendre ce soir… Ce n'est pas grave. Ils reviendront.","Aucun souvenir n'est assez clair pour descendre. Il faudra encore les écouter.","Pas de Labyrinthe cette nuit. Je vais pouvoir dormir un peu, pour une fois.","La trappe reste fermée ce soir. On a toute l'aube pour souffler."],
    marcacrin:["Pas de descente ? Tant mieux, je vais finir les restes de gâteau."],
    pifeuil:["Pas de Labyrinthe… je vais aller compter les feuilles mortes dans la cour."]
  },
  finConfiance:{
    all:["{n} {v} près de la trappe. À l'aube, on les guidera avec leurs souvenirs.","{n} {s} assoupi{e} près de la trappe. Ses souvenirs brillent sur le comptoir.","À l'aube, on descend avec {n}. Je prépare les lanternes.","{n} {o} prêt{e}s. Les Fragments n'ont jamais autant brillé."],
    tarsal:["Je sens que {n} {o} enfin prêt{e}s à regarder en face. On les accompagne à l'aube."],
    pichu:["{n} ! On descend à l'aube ! Je vais faire de la lumière en bas, promis !"]
  },
  courantAir:{
    all:["Un petit courant d'air… Reviens demain soir, l'ami. On te gardera ta place.","Ce soir, ce n'était pas le bon moment. On t'attend demain.","Va te reposer. Le tabouret t'attendra.","On reprendra la conversation demain, promis."]
  },
  flair:{
    all:["*renifle* {n} aime bien {i}. Je le sens d'ici.","{n} sent un peu {i}… Ça doit lui plaire.","Mon flair me dit : {i}, pour {n}.","*renifle renifle* Pour {n}, je dirais… {i} !","{n} a regardé {i} sur l'étagère en entrant. Je l'ai vu."]
  },
  saison:{
    all:["Une nouvelle saison ! Ceux qu'on a aidés passeront sûrement de jour. Et les autres… ils reviendront, la nuit. On sera prêts.","Nouvelle saison, nouvelles âmes. J'ai rangé l'étagère en ton honneur, patron.","Le Registre a encore des pages blanches. On va les remplir ensemble.","Tu as vu ? Le village a changé un peu. Nous aussi, je crois."]
  },
  pgDefaite:{
    all:["Ce donjon-là était coriace. Pas grave : la Faille en rêvera un autre demain soir.","La Faille a rêvé fort cette nuit. On fera mieux au prochain rêve.","On est remontés entiers, c'est l'essentiel. Demain, un autre donjon.","Coriaces, ces ombres-là. Je vais préparer un bon chocolat chaud."]
  },
  defaite:{
    all:["On a tenu bon, patron. La prochaine fois, on sera plus forts.","Ce n'est que partie remise. Le regret ne va pas s'envoler.","On a appris des choses, là-dessous. On reviendra mieux préparés.","On remonte, on souffle, et on y retourne. Comme toujours."]
  }
};
function cogSay(kind, vars){
  const L=COG_LINES[kind]; if(!L) return "";
  const pool=(L.all||[]).concat(L[S.cog]||[]);
  S.cogLast=S.cogLast||{}; let line, guard=0;
  do{ line=pool[rnd(pool.length)]; }while(pool.length>1 && line===S.cogLast[kind] && guard++<10);
  S.cogLast[kind]=line;
  return vars ? line.replace(/\{(\w+)\}/g,(_,k)=>vars[k]??"") : line;
}
