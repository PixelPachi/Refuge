# Images à faire avec Gemini

Même direction artistique que le reste : anime peint, fantasy doux et lumineux, références Pokémon subtiles.
Après chaque lot : déposer les `.webp` dans `assets/art/` puis `python3 tools/genassets.py` (le jeu les utilise automatiquement).

## Gabarits de prompt

- **Salle (2:1)** — « Génère une image : décor de jeu vidéo panoramique, format paysage très large 2:1, style anime peint fantasy doux et lumineux, ambiance de souvenir onirique dans un monde Pokémon, aucun texte, aucun personnage au premier plan, le bas et le centre restent dégagés pour placer des personnages. Scène : … » → `tools/save.py dj-<client>-<salle>:<suffixe>`
- **Cœur du Regret** — même gabarit, avec « un grand halo de lumière dorée en forme de cœur » et la silhouette lumineuse de ce que le client a perdu.
- **Carte (2:3)** — préfixe `CARD` stocké dans Gemini (`localStorage.tklH`) : illustration portrait, tiers bas calme et sombre pour le texte. Légendaire : « carte légendaire : … » avec le Pokémon propriétaire. → `tools/cards.py <carte>:<suffixe>`
- **Icône d'artefact** — « icône d'objet de jeu vidéo, style anime peint, un seul objet centré, bien détouré, légère lueur magique, sur un fond vert pur uni #00FF00, sans ombre portée au sol, sans texte. Objet : … » → `tools/art.py relic-<clé> <fichier> icon`

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

## Plus tard (optionnel)
- Icônes des 8 bibelots de saison : Tasse ébréchée d'Hector, Clochette de la Faille, Torchon brodé, Lanterne de poche, Bocal à pourboires, Carnet de notes, Sablier de sable fin, Bougie parfumée.
- Saison 6 (Mewtwo) : à lister quand la saison sera écrite.

## Déjà fait
Saisons 1 à 4 complètes (salles, cartes, artefacts), cadres de cartes normaux et légendaires, Pourboire d'Or (façade et salle), lac de Suicune et Suicune.
