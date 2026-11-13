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
- a La chambre de Lise · b Le billet d'échange pâli · h Les cuillères qui tremblent · c Le centre d'échange · i La première pensée lue · d La bibliothèque silencieuse · j Les Alakazam des autres · k Les devoirs à deux · l Le jardin de l'école · f Le samedi où personne n'est venu · g **Cœur** : la promesse oubliée (silhouette d'une jeune fille qui serre Kadabra dans ses bras)
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

## Plus tard (optionnel)
- Icônes des 8 bibelots de saison : Tasse ébréchée d'Hector, Clochette de la Faille, Torchon brodé, Lanterne de poche, Bocal à pourboires, Carnet de notes, Sablier de sable fin, Bougie parfumée.

## Déjà fait
Saisons 1 à 4 complètes (salles, cartes, artefacts), cadres de cartes normaux et légendaires, Pourboire d'Or (façade et salle), lac de Suicune et Suicune.
