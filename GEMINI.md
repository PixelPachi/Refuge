# Images à faire avec Gemini

Même direction artistique que le reste : anime peint, fantasy doux et lumineux, références Pokémon subtiles.
Après chaque lot : déposer les `.webp` dans `assets/art/` puis `python3 tools/genassets.py` (le jeu les utilise automatiquement).

## Gabarits de prompt

- **Salle (2:1)** — « Génère une image : décor de jeu vidéo panoramique, format paysage très large 2:1, style anime peint fantasy doux et lumineux, ambiance de souvenir onirique dans un monde Pokémon, aucun texte, aucun personnage au premier plan, le bas et le centre restent dégagés pour placer des personnages. Scène : … » → `tools/save.py dj-<client>-<salle>:<suffixe>`
- **Cœur du Regret** — même gabarit, avec « un grand halo de lumière dorée en forme de cœur » et la silhouette lumineuse de ce que le client a perdu.
- **Carte (2:3)** — préfixe `CARD` stocké dans Gemini (`localStorage.tklH`) : illustration portrait, tiers bas calme et sombre pour le texte. Légendaire : « carte légendaire : … » avec le Pokémon propriétaire. → `tools/cards.py <carte>:<suffixe>`
- **Icône d'artefact** — « icône d'objet de jeu vidéo, style anime peint, un seul objet centré, bien détouré, légère lueur magique, sur un fond vert pur uni #00FF00, sans ombre portée au sol, sans texte. Objet : … » → `tools/art.py relic-<clé> <fichier> icon`

## À faire — Cartes souvenir (design commun)

Toutes les cartes souvenir partagent un dessin par type d'émotion, plus un cadre à elles. Les mots-clés (« … ») ont leur propre dessin.
Les cartes souvenir coûtent toujours 0 : le cadre porte une bulle avec « 0 ».

- **Cadre** `frame-souvenir` : même forme et même fenêtre rectangulaire que les cadres normaux (bulle bleue en haut à gauche avec « 0 »), mais en argent nacré et bleu pâle, avec de petites plumes et des fils de lumière, comme un souvenir qu'on garde précieusement. Intérieur et fond en vert #00FF00. → traiter comme les autres cadres (`tools/frame.py`).
- **Dessins** (format carte 2:3, tiers bas calme pour le texte, style onirique, sans personnage précis pour servir à tous les clients) :
  - `souvenir-joie` : un rayon de soleil doré qui traverse des pétales, chaleur, rires lointains
  - `souvenir-nostalgie` : une vieille photo floue qui flotte au milieu de fleurs de cerisier roses, lumière douce du soir
  - `souvenir-colere` : des braises rouges et des étincelles qui tourbillonnent, un éclat de verre brisé
  - `souvenir-tristesse` : de la pluie sur une vitre, un parapluie bleu abandonné, gouttes lumineuses
  - `souvenir-peur` : une forêt violette dans la brume, une petite lanterne qui résiste à l'obscurité
  - `souvenir-motcle` : une bulle de parole lumineuse faite de fils dorés, comme un mot qui revient en mémoire
- En attendant les images, ces cartes gardent leur design actuel.

## À faire — Saison 5 · Les métamorphoses

### Métamorph (salles `dj-metamorph-a` … `-l`)
- a Le chapiteau vide · b Les rires du public (écho tristesse) · h Mille formes à la seconde (écho peur) · c Les coulisses aux miroirs · i Le premier soir sur la piste · d La caisse où il dormait · j Les noms criés par la foule (écho colère) · k Le visage effacé · l La flaque au clair de lune · f Le miroir qui ne renvoie rien (écho peur) · g **Cœur** : la nuit où il a oublié son visage (une flaque violette souriante devant un miroir doré)
- Cartes : `card-copie` (Métamorph copie un coup), `card-millevisages` (légendaire : Métamorph entouré de dizaines de silhouettes de ses formes, lui au centre en flaque souriante)
- Icône : `relic-masque` (un masque de théâtre violet souple)

### Insécateur (`dj-insecateur-*`)
- a La forêt des lames · b Le clan qui tourne le dos · h La pluie d'acier · c Le cercle du rituel · i La feuille coupée en deux · d La clairière de l'aube · j Les pinces qui claquent · k Les entraînements avec sa sœur · l Le ruisseau où il aiguisait ses lames · f Le rituel de l'acier · g **Cœur** : le jour où il a gardé ses lames (silhouette d'une Cizayox qui lui tend la pince)
- Cartes : `card-taillade`, `card-lamefidele` (légendaire : Insécateur lames levées sous la lune, une feuille coupée en deux qui tombe)
- Icône : `relic-lames` (deux lames vertes croisées)

### Kadabra (`dj-kadabra-*`)
- a La chambre de Margot · b Le billet d'échange pâli · h Les cuillères qui tremblent · c Le centre d'échange · i La première pensée lue · d La bibliothèque silencieuse · j Les Alakazam des autres · k Les devoirs à deux · l Le jardin de l'école · f Le samedi où personne n'est venu · g **Cœur** : la promesse oubliée (silhouette d'une jeune fille qui serre Kadabra dans ses bras)
- Cartes : `card-chocpsy`, `card-echangeprecieux` (légendaire : Kadabra et une fille qui font leurs devoirs, cuillères flottantes dorées)
- Icône : `relic-cuillere` (une cuillère argentée tordue, lueur rose)

### Chrysacier (`dj-chrysacier-*`)
- a L'arbre aux sept chenilles · b La coque froide · h Les battements d'ailes au loin · c La branche d'où ils sont partis · i La première fissure · d Le cocon de feuilles · j Les Papilusion qui appellent · k L'été des sept Chenipan · l Le rebord de fenêtre au soleil · f Le ciel où ils ont migré · g **Cœur** : le printemps où il est resté dedans (une coque fissurée d'où sort une lumière dorée)
- Cartes : `card-armurecoque`, `card-premierenvol` (légendaire : un Papilusion aux ailes un peu de travers qui s'envole au soleil, six autres l'attendent)
- Icône : `relic-coque` (une coque verte de chrysalide fissurée, lumière dorée)

## À faire — Saison 6 · Les métamorphoses (fin du chapitre)

### Ramoloss (`dj-ramoloss-*`)
- a La rivière de pêche · b La queue qui traîne · h Le courant trop rapide · c Le ponton de bois · i La morsure de Clac · d La berge au soleil · j Les mots qui arrivent trop tard · k Les années à deux · l L'eau calme du soir · f Le matin où Clac a lâché · g **Cœur** : le jour où il est redevenu Ramoloss (silhouette dorée d'un Flagadoss avec un Kokiyas sur la queue)
- Cartes : `card-flemme` (Ramoloss qui fait la sieste au bord de l'eau), `card-lenteur` (légendaire : Ramoloss qui pêche, un petit Kokiyas accroché à la queue, lumière dorée)
- Icône : `relic-marque` (une canne à pêche de bois avec un petit coquillage)

### Embrylex (`dj-embrylex-*`)
- a La vallée des Tyranocif · b La vallée qui ne tremble pas · h La montagne à avaler · c Le chemin de la carrière · i La première pierre ronde · d La grotte aux cristaux · j Le sac découvert · k Sur l'épaule de papa · l Le ruisseau aux galets · f Les pas qui font trembler la vallée · g **Cœur** : le jour où papa a dit « honte » (silhouette dorée d'un Tyranocif qui tend une pierre noire étoilée)
- Cartes : `card-jetpierres`, `card-collection` (légendaire : Embrylex devant sa collection de pierres brillantes alignées, un grand Tyranocif penché sur elles)
- Icône : `relic-caillou` (une pierre ronde avec une ligne bleue brillante)

### Parasect (`dj-parasect-*`)
- a La forêt humide · b La comptine oubliée · h Les spores qui recouvrent tout · c Le sous-bois sans soleil · i Les promenades au soleil · d La clairière tiède · j « Ce n'est plus qu'un champignon » · k La comptine à deux voix · l La flaque de lumière · f Le champignon qui grandit · g **Cœur** : le jour où il ne savait plus qui pensait (un petit Paras lumineux sous un grand champignon, au soleil)
- Cartes : `card-spore`, `card-deuxvoix` (légendaire : Parasect qui marche vers un rayon de soleil, son grand champignon penché qui suit)
- Icône : `relic-spore` (un petit champignon rouge à pois qui libère des spores dorées)

### Mewtwo — Grand Regret du chapitre 3
- `dj-mewtwo-labo` : un laboratoire en ruine la nuit, cuves brisées, écrans éteints, câbles, lumière froide verte
- `dj-mewtwo` : Mewtwo flottant les yeux fermés dans une cuve de verre brisée, lumière violette, très mélancolique
- Carte : `card-droitdexister` (légendaire : Mewtwo assis maladroitement au comptoir d'une taverne, un verre de lait, une cuillère pliée en cœur)

## À faire — Saison 7 · La fête de Bourg-Brume (chapitre 4)

### Écrémeuh (`dj-ecremeuh-*`)
- a La colline de la ferme · b L'étable vide · h Les bouteilles de la ville · c Le chemin du village · i Le premier verre d'un enfant · d La paille tiède · j Les volets de la ferme fermés · k Les matins de traite · l Le banc devant la fontaine · f L'hiver où Basile est parti · g **Cœur** : le jour où personne n'est monté sur la colline (une ferme seule sur la colline enneigée, une Écrémeuh dorée devant la barrière, le village en bas)
- Cartes : `card-roulade` (Écrémeuh qui roule dans l'herbe de la colline), `card-laitmaison` (légendaire : un vieux fermier qui verse un verre de lait à un enfant, Écrémeuh qui regarde, lumière du matin)
- Icône : `relic-clochemeuh` (une cloche de vache en laiton avec un ruban rose)

### Tropius (`dj-tropius-*`)
- a La place du village décorée · b Les fruits flétris · h La foule qui passe sans voir · c Les guirlandes de la fête · i Les enfants qui grimpent · d La palmeraie tranquille · j La machine à barbe à papa · k Le ruban de la petite fille · l Le verger au lever du jour · f La fête où personne n'a grimpé · g **Cœur** : le jour où elle ne l'a pas reconnu (Tropius seul au bout d'une place illuminée, un ruban délavé autour du cou)
- Cartes : `card-tranchefeuille` (Tropius qui tranche le vent avec ses feuilles), `card-dernierfruit` (légendaire : des enfants sur le dos de Tropius qui cueillent ses fruits sous les lampions)
- Icône : `relic-regime` (un régime de fruits jaunes noué d'un ruban)

### Arcanin (`dj-arcanin-*`)
- a Le poste de police la nuit · b La médaille et le placard · h Les rues sans lui · c Le carrefour de la grand-rue · i L'enfant retrouvé à la fête · d La niche du poste · j Les sifflets des Caninos · k Les rondes avec Lucie · l Le toit d'où l'on voit tout · f Le soir de la relève · g **Cœur** : le jour où plus personne n'avait besoin de lui (un vieil Arcanin assis sous un lampadaire, rue vide, insigne terni)
- Cartes : `card-vitesseextreme` (Arcanin qui bondit dans une ruelle, traînée de feu), `card-derniereronde` (légendaire : un vieil Arcanin et deux Caninos qui patrouillent ensemble sous la lune)
- Icône : `relic-insigne` (un insigne de police terni sur un collier de cuir)

### Branette (`dj-branette-*`)
- a Le grenier poussiéreux · b Le carton des jouets cassés · h Le noir sous la poussière · c L'escalier du grenier · i Le premier secret confié · d Le lit d'enfant · j La fermeture qui se coud · k Les nuits serrée contre elle · l La lucarne au clair de lune · f Les années à attendre · g **Cœur** : le jour où le carton est monté au grenier (une peluche noire dans un carton, rayon de lune par la lucarne)
- Cartes : `card-griffeombre` (Branette qui griffe dans l'ombre), `card-sourirecousu` (légendaire : Branette qui ouvre sa fermeture éclair sur un sourire cousu, des petites Branette autour d'elle)
- Icône : `relic-zip` (une fermeture éclair dorée sur un bout de tissu noir)

## À faire — Saison 8 · La fête de Bourg-Brume (fin du chapitre 4)

### Kecleon (`dj-kecleon-*`)
- a L'étal à l'aube · b Les couleurs des clients · h Le mur où il disparaît · c La place qui se remplit · i Le premier jour de l'étal · d La remise aux cageots · j La fanfare qui joue sans lui · k Le bonjour de chaque client · l Le soir où il redevient vert · f La place vide après la fête · g **Cœur** : le jour où il n'a plus su sa couleur (Kecleon à moitié transparent devant son étal, lampions éteints)
- Cartes : `card-camouflage` (Kecleon qui se fond dans un mur de cageots), `card-vraiecouleur` (légendaire : Kecleon bien vert qui danse maladroitement sur la place illuminée)
- Icône : `relic-bandezigzag` (un ruban rouge en zigzag)

### Mimiqui (`dj-mimiqui-*`)
- a Sous la table · b Le costume rapiécé · h Les yeux qui regardent dessous · c Les affiches de la mascotte · i Le câlin d'un enfant · d Le carton où elle dort · j La tête de chiffon qui tombe · k Le fil et l'aiguille, la nuit · l Le concours de déguisements · f Le cri de la mère · g **Cœur** : le jour où elle a cousu le costume (Mimiqui qui coud un costume jaune à la bougie, dans un carton)
- Cartes : `card-ombreportee` (l'ombre de Mimiqui projetée sur un mur, plus grande qu'elle), `card-calinvrai` (légendaire : un enfant qui serre Mimiqui dans ses bras sous les lampions)
- Icône : `relic-chiffon` (une tête de Pikachu en chiffon, dessinée au feutre)

### Miaouss (`dj-miaouss-*`)
- a Le Pourboire d'Or éteint · b La pièce dans le caniveau · h Le banquier qui compte · c La ruelle derrière le marché · i Le bol de lait sur la fenêtre · d Le carton de l'hiver · j Persian qui part avec la caisse · k La vieille dame qui ne demandait rien · l La petite fenêtre aux bols de lait · f La fenêtre restée fermée · g **Cœur** : le jour où il a décidé de tout acheter (un chaton Miaouss sous la neige devant une fenêtre fermée)
- Cartes : `card-jackpot` (Miaouss qui lance une pluie de pièces), `card-bolchaud` (légendaire : un bol de lait fumant sur un rebord de fenêtre, un chaton qui s'approche)
- Icône : `relic-rubanor` (un ruban usé sans sa pièce)

### Ho-Oh — Grand Regret du chapitre 4
- `dj-hooh-tour` : une haute tour de bois japonaise en flammes, la nuit, cendres qui volent
- `dj-hooh` : Ho-Oh qui plane seul au-dessus d'un champ de cendres, plumes de feu, très mélancolique
- Carte : `card-arcenciel` (légendaire : Ho-Oh au-dessus d'une fête de village illuminée, un arc-en-ciel en pleine nuit)

## À faire — Saison 9 · Le secret d'Hector (chapitre 5)

### Dracolosse (`dj-dracolosse-*`)
- a Le port au crépuscule · b La sacoche de cuir · h La tempête au-dessus des mers · c Les toits de Bourg-Brume · i La première lettre livrée · d Le phare où il se reposait · j Les portes qui se ferment · k Le vieux marin sur le quai · l Les cartes postales légères · f Les quarante ans à chercher · g **Cœur** : le soir où l'adresse s'est effacée (une enveloppe jaunie sous la pluie, l'encre qui coule)
- Cartes : `card-ouragan` (Dracolosse en vol au-dessus de la mer, sacoche en bandoulière), `card-lettrelivree` (légendaire : Dracolosse qui tend une lettre à une vieille dame sur le pas de sa porte)
- Icône : `relic-sacoche` (une sacoche de facteur en cuir craquelé)

### Spiritomb (`dj-spiritomb-*`)
- a La pierre fendue · b Les cent huit visages · h Le froid entre les âmes · c La foule de la fête d'autrefois · i Les cent huit qui rient · d Le creux de la pierre · j La main lâchée · k Le petit frère · l Les histoires racontées une à une · f Une vie à chercher · g **Cœur** : le soir de la promesse manquée (un petit bonnet rouge perdu dans une foule de fête ancienne)
- Cartes : `card-malediction` (un tourbillon violet de visages au-dessus d'une pierre), `card-centhuit` (légendaire : cent huit petites lueurs qui tournent ensemble, chaudes, au-dessus de la pierre)
- Icône : `relic-pierreclef` (une petite pierre fendue avec un éclat violet)

### Muciole (`dj-muciole-*`)
- a L'étang au crépuscule · b La fleur séchée · h La nuit sans elle · c Les roseaux de la rive · i La danse des lumières · d La feuille de nénuphar · j Le matin où il est parti · k Le signal, trois longs, deux courts · l Les jeunes qui dansent · f La maison où elle attendait · g **Cœur** : le soir de la grande danse (une seule lueur jaune au-dessus d'un étang noir, une fleur posée sur un nénuphar)
- Cartes : `card-lumiqueue` (Muciole dont la queue dessine une étoile), `card-troislongs` (légendaire : une lueur jaune et une lueur bleue qui dessinent un cœur dans le ciel nocturne)
- Icône : `relic-lueur` (une petite lanterne-luciole jaune)

### Démolosse (`dj-demolosse-*`)
- a La maison aux volets bleus · b Le collier et la médaille · h L'orage sur la colline · c Le chemin de la ville · i Les nuits dans la cuisine · d Le paillasson de l'entrée · j La charrette qui s'éloigne · k Théo qui le serre très fort · l La ville au loin, la nuit · f Dix-neuf hivers à garder · g **Cœur** : le matin du départ (une charrette sur un chemin, un Malosse assis devant une maison aux volets bleus)
- Cartes : `card-crocfeu` (Démolosse aux crocs enflammés), `card-gardefidele` (légendaire : Démolosse couché sous une fenêtre éclairée de la ville, un enfant qui dort derrière la vitre)
- Icône : `relic-collierdemo` (un collier de cuir avec une médaille gravée)

### Fil rouge
- Le portrait d'Hector humain (moustache, tablier, taverne d'il y a cent ans) pourra servir d'image de dialogue plus tard.

## À faire — Icônes d'ingrédients (remplacent des objets non comestibles)
Même méthode que les icônes d'artefacts (prompt ICP, fond vert, `tools/art.py ing-<clé> fichier icon`, puis `tools/genassets.py`). Le jeu les affiche dès que le fichier `assets/art/ing-<clé>.webp` existe ; en attendant, une pastille de couleur.
- `ing-plume` : Gingembre Confit (morceaux de gingembre confits au sucre dans une petite coupelle)
- `ing-poudre` : Sucre Pétillant (un petit sachet de sucre pétillant doré qui crépite)
- `ing-pierrestase` : Confiture d'Antan (un pot de confiture rouge avec un tissu à carreaux noué sur le couvercle)
- `ing-poudremetal` : Flocons d'Avoine (un bocal de flocons d'avoine avec une cuillère en bois)
- `ing-runesort` : Châtaigne Grillée (trois châtaignes grillées fendues, dans un cornet de papier)
- `ing-runepurif` : Tisane de Sauge (une tasse fumante avec des feuilles de sauge)

## À faire — Boissons préparées (nouvelles bases)
Même style que les `drink-lait-*` existants (verre seul sur fond transparent). Le jeu les affiche dès que le fichier existe ; sinon, le verre dessiné en CSS.
- Thé de Safrania : `drink-the` (tasse de thé ambré), `drink-the-rouge` (Thé à la Cerise), `drink-the-bleu` (Thé Bleu des Brumes), `drink-the-jaune` (Thé Citron-Sitrus), `drink-the-rose` (Thé Rose de Mago), `drink-the-vert` (Thé à la Menthe), `drink-the-miel` (Thé au Miel)
- Jus de Baie : `drink-jusbaie` (grand verre de jus violet-rose), `drink-jusbaie-rouge` (Jus Rubis), `drink-jusbaie-bleu` (Jus des Baies Bleues), `drink-jusbaie-jaune` (Jus Soleil), `drink-jusbaie-rose` (Jus Douceur Rose), `drink-jusbaie-vert` (Jus Vert des Prés), `drink-jusbaie-miel` (Jus Doré au Miel)
- Les ingrédients des saisons 2 à 10 colorent déjà le verre (Baie Pêcha → rose, Bonbon Fête → rouge, Galette → miel, etc.) : pas d'image en plus à prévoir.

## À faire — Saison 10 · Le secret d'Hector (fin du chapitre 5)

### Ptéra (`dj-ptera-*`)
- a La forêt de fougères · b La goutte d'ambre · h Le grand froid · c Le ciel d'autrefois · i La nuée qui vole ensemble · d Le nid dans la falaise · j La vitre du musée · k Les cris des siens · l Les Roucool au-dessus des toits · f Le réveil dans la salle blanche · g **Cœur** : le matin du grand froid (un Ptéra figé dans une goutte d'ambre géante, forêt préhistorique sous la neige)
- Cartes : `card-attaqueciel` (Ptéra en piqué au-dessus des fougères), `card-derniernuee` (légendaire : Ptéra qui vole au milieu d'une nuée de Roucool au coucher du soleil)
- Icône : `relic-ambre` (un morceau d'ambre orange avec une bulle dedans)

### Jirachi (`dj-jirachi-*`)
- a Le champ sous les étoiles · b Les trois papiers · h Mille ans de sommeil · c Le ciel où il dort · i Les sept jours à jouer · d Le creux d'herbe tiède · j L'encre qui pâlit · k « Promis ? » « Promis. » · l Les enfants de Bourg-Brume · f Le réveil, mille ans plus tard · g **Cœur** : le septième soir (un petit garçon endormi dans l'herbe contre Jirachi, sous les étoiles)
- Cartes : `card-voeu` (Jirachi qui tient un petit papier lumineux), `card-septjours` (légendaire : Jirachi et un enfant qui font des ricochets sur un étang au soleil)
- Icône : `relic-etoile` (un petit papier à vœux plié, avec une étoile dorée)

### Noctali (`dj-noctali-*`)
- a L'atelier au clair de lune · b Le pinceau sec · h La nuit sans lui · c Le toit de l'atelier · i L'étoile ajoutée chaque nuit · d Le coussin près du chevalet · j Le marchand qui emporte la toile · k Augustin qui peint en silence · l La jeune Queulorior sur la place · f La nuit de pleine lune où il est parti · g **Cœur** : le coin de ciel qui manque (une toile nocturne inachevée, un coin blanc en haut à gauche, un Noctali assis devant)
- Cartes : `card-feinte` (Noctali dont les anneaux brillent dans le noir), `card-coindeciel` (légendaire : Noctali qui trace un croissant de lune avec un pinceau dans la gueule)
- Icône : `relic-pinceau` (un vieux pinceau à la pointe sèche, bleu nuit)

### Giratina — Grand Regret du chapitre 5
- `dj-giratina-monde` : le monde à l'envers (escaliers qui montent vers le bas, cascades vers le ciel, feuilles mortes qui flottent, lumière grise et violette)
- `dj-giratina` : Giratina immense dans le monde à l'envers, un petit ruban rouge entre ses griffes, très mélancolique
- Carte : `card-rubanlise` (légendaire : un ruban rouge posé sur le comptoir d'une vieille taverne, une moustache et un tablier en silhouette dorée derrière)
- Icône d'ingrédient : `ing-muffin` (Muffin du Matin, un muffin doré encore chaud)

## À faire — Saison 11 · Les premiers pas (chapitre 6)

### Togepi (`dj-togepi-*`)
- a L'intérieur de la coquille · b La fente dans la coquille · h Le bruit du dehors · c Le paillasson de la taverne · i Les rires à travers la coquille · d Le coin tiède du tabouret · j Les autres Togepi déjà sortis · k La main qui l'a posé là · l La cour de l'école · f Trois saisons sans éclore · g **Cœur** : le matin où il aurait dû éclore (un œuf à pois sur un paillasson, au petit matin, une lumière chaude derrière la porte)
- Cartes : `card-charme` (Togepi qui sort la tête de sa coquille avec un grand sourire), `card-premierpas` (légendaire : Togepi qui fait son premier pas hors de la coquille, un bout de coquille sur la tête)
- Icône : `relic-coquille` (un éclat de coquille d'œuf blanc à pois rouges et bleus)

### Ptiravi (`dj-ptiravi-*`)
- a La porte du Centre Pokémon · b Le caillou dans la poche · h La salle d'examen vide · c Les fiches de révision · i La patte du Rattata · d La chambre aux livres · j La coiffe aux trois marques · k Les Leveinard qui offrent leur œuf · l Le premier patient · f La troisième fois devant la porte · g **Cœur** : le premier jour où elle a fait demi-tour (une petite Ptiravi de dos devant la grande porte blanche d'un Centre Pokémon)
- Cartes : `card-lancerdoux` (Ptiravi qui pose un pansement sur un petit Pokémon), `card-oeufsoin` (légendaire : Ptiravi qui tend un œuf lumineux à un Roucool blessé)
- Icône : `relic-coiffe` (une coiffe d'infirmière en papier plié, avec une croix rose)

### Relicanth (`dj-relicanth-*`)
- a Les abysses · b Les fossiles des autres · h Le noir sans fin · c La remontée · i Les étoiles, enfin · d Le creux de roche · j Ceux qui ont changé · k La lueur, très haut · l La plage au lever du jour · f Cent millions d'années à attendre · g **Cœur** : le jour où il s'est dit « demain » (un vieux poisson de pierre au fond de l'océan noir, regardant une lueur lointaine)
- Cartes : `card-fracasroc` (Relicanth qui fonce tête la première), `card-jamaistroptard` (légendaire : Relicanth sur une plage la nuit, sous un ciel plein d'étoiles)
- Icône : `relic-ecaillefossile` (une écaille grise avec des traces de coquillages fossiles)

## À faire — Saison 12 · Les premiers pas (fin du chapitre 6)

### Mordudor (`dj-mordudor-*`)
- a Le coffre fermé · b Les pièces qu'on compte · h Les mains qui prennent · c La charrette du marchand · i Le vent sur le coffre · d Le fond du coffre · j Le marchand qui s'en va · k Les autocollants des villes · l La route au matin · f Le bord de la route · g **Cœur** : le jour où le coffre s'est refermé (un petit coffre seul au bord d'une route, une charrette qui s'éloigne)
- Cartes : `card-piecejetee` (des pièces qui volent hors d'un coffre), `card-unepiece` (légendaire : Mordudor sur une route au soleil levant, une seule pièce sur le dos)
- Icône : `relic-pieceroute` (une pièce d'or usée, avec un petit ruban)

### Zarbi (`dj-zarbi-*`)
- a La page blanche · b Le point d'interrogation · h Les mots qui le refusent · c Les ruines aux inscriptions · i La première phrase dans la buée · d Le coin de la page · j Le groupe qui part sans lui · k L'alphabet dans le ciel · l La phrase qui finit par lui · f Toutes les questions sans réponse · g **Cœur** : le jour où il est resté à côté (un Zarbi point d'interrogation seul, à côté d'un mot formé par d'autres Zarbi dans le ciel)
- Cartes : `card-puissancecachee` (Zarbi qui brille d'une lueur étrange), `card-onyvaensemble` (légendaire : une phrase de Zarbi dans le ciel nocturne, terminée par un point d'interrogation lumineux)
- Icône : `relic-pointinterro` (un point d'interrogation noir avec un œil)

### Évoli (`dj-evoli-*`)
- a Le couloir aux portes · b Les pierres alignées · h Toutes les vies perdues · c La portée réunie · i Le lac avec sa sœur · d Le panier de la portée · j Les photos de famille · k Les frères et sœurs qui choisissent · l Une journée à la fois · f Deux ans sans choisir · g **Cœur** : le jour où elle a retiré la patte (une Évoli devant une rangée de pierres d'évolution colorées, dans un long couloir aux portes ouvertes)
- Cartes : `card-adaptabilite` (Évoli qui bondit), `card-unejournee` (légendaire : Évoli au bord d'un lac au soleil, une Aquali qui l'éclabousse)
- Icône : `relic-sacpierres` (un petit sac de toile d'où dépassent des pierres de couleurs)

### Le donjon d'Hector — dernier Grand Écho du chapitre 6
- Salles (`dj-hector-*`) : `taverne` (la taverne il y a cent ans, Hector humain derrière le comptoir), `dispute` (une fillette au ruban rouge qui claque la porte), `attente` (une chaise tournée vers la porte, des bougies fondues), `hivers` (la salle sous la neige, cent hivers), `ruban` (un ruban rouge sur une table, lumière douce), `pacte` (un homme presque transparent qui serre la main d'une ombre aux yeux bleus), `portrait` (le portrait d'Hector aux yeux vides), `ames` (des voyageurs endormis aux tables, des lueurs qui glissent vers la cave), `cave` (la cave avant la Faille, tonneaux et poussière), `porte` (une porte vers le monde à l'envers), `seuil` (la porte d'entrée de la taverne vue de l'intérieur, la nuit), `apaisees` (des dizaines d'âmes en lumière douce), `cauchemars` (des rêves noirs qui tournent comme des corbeaux)
- `dj-darkrai` : Darkrai dans une salle de cauchemars, contrat déchiré qui flotte
- Cartes d'Hector : `card-hectorpardon` (Hector qui tend la main, ombre violette et lumière dorée), `card-hectorecoute` (Hector derrière son comptoir, cent bougies), `card-hectorservice` (Hector qui pose un dernier verre sur le comptoir), `card-pactebrise` (légendaire : un contrat déchiré qui brûle, Hector qui franchit la porte de sa taverne dans la nuit)
- Icônes d'ingrédients : déjà fournies par PokeAPI (Crème Chantilly, Baie Lonme)

## Déjà fait
- Icônes des 8 bibelots de saison (`bib-*`).
- Session du 13/11 (après-midi) : les 6 icônes d'ingrédients non comestibles + Muffin, 27 icônes d'artefacts (saisons 5 à 12), les 14 boissons au thé et au jus de baie, les 6 dessins de souvenirs, et les 58 illustrations de cartes manquantes (saisons 5 à 12, cartes d'Hector). Les décors des Grands Regrets (Mewtwo, Ho-Oh, Giratina, Darkrai) et les 13 salles du donjon d'Hector.
- Toutes les salles des labyrinthes (saisons 1 à 12), le cadre `frame-souvenir`, les cartes et artefacts de l'après-fin (voyageurs et chromatiques) sont faits.
Saisons 1 à 4 complètes (salles, cartes, artefacts), cadres de cartes normaux et légendaires, Pourboire d'Or (façade et salle), lac de Suicune et Suicune.
