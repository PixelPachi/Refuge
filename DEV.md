# Tavern Keeper's Ledger — carte du code

Jeu web sans dépendance : `index.html` charge le style puis les scripts dans l'ordre ci-dessous.
Toutes les constantes sont globales (scripts classiques), donc l'ordre de chargement compte.

## Où trouver quoi

| Fichier | Contenu |
|---|---|
| `css/style.css` | Tout le style (écrans, cartes, Labyrinthe, registre…) |
| `js/assets.js` | **Généré** par `tools/genassets.py` : liste des illustrations de `assets/art` (`ART_FILES`) |
| `js/items.js` | **Généré** par `tools/genitems.py` : icônes d'objets en data URI (`ITEM_ICONS`, `itemSrc()`) |
| `js/00-tables.js` | `mapStd()` (plan de Labyrinthe standard à 11 salles) et déclaration des tables remplies par les saisons : `CL`, `TALK`, `WIPE`, `LETTERS`, `REGULARS`, `ROOM_SAY`, `ROOM_KW`, `BOSS`, `LEGEND_CARD`, `CLIENT_CARD`, et `CARDS` (cartes communes) |
| `js/01-base.js` | Auras, talents, Tenanciers, co-gérants, gelées (`ESS`), **ingrédients** (`ING`, `SEASON_NEW`), émotions, `CLIENT_ORDER` |
| `js/saisons/saisonN.js` | **Tout ce qui concerne chaque âme**, client par client : fiche, conversations, torchon, lettre, visite de jour, salles, ombre finale, cartes, effets du poste et de l'artefact |
| `js/02-village.js` | Villageois de jour, commandes, bibelots, questions, présages, commandes de la Faille |
| `js/03-medias.js` | Sprites (local puis PokeAPI), illustrations (`ART_KEYS`, `artSrc`), icônes de boissons |
| `js/04-audio.js` | Cris, voix synthétique, musique générée (`TRACKS`, `SEASON_THEME`) |
| `js/05-moteur.js` | État (`S` sauvegardé, `U` interface), outils, rendu commun, moteur de dialogue, **crochets** (`staffFx`, `relicFx`, `relicHP`, `ingFx`) |
| `js/06-histoire.js` | Écran titre, prologue, cinématique d'arrivée |
| `js/07-journee.js` | Journée : marché de Kecleon, villageois, salaires |
| `js/08-nuit.js` | Nuit : file des âmes, comptoir, préparation et effets d'un verre, fin de service, récap, poste de Cadoizo |
| `js/09-labyrinthe.js` | Aube : Labyrinthe salle par salle, carte, images des salles (`roomSrc`) |
| `js/10-combat.js` | Deck building : effets des cartes, combats, reliques, récompenses |
| `js/11-saison.js` | Pourboire d'Or et Miaouss, Grand Écho en duo (le Tenancier et l'acolyte autonome : `COG_CARDS`, `cogChoose`, `cogAct`) et Grands Regrets par saison (`FINALE_MAPS` : Suicune en 4, Mewtwo en 6), fin de saison, début de saison suivante (`LAST_SEASON`) |
| `js/12-registre.js` | Le Grand Registre (livre), le menu, le code de sauvegarde (copier / charger) et la confirmation de nouvelle partie |
| `js/13-actions.js` | Table `ACT` (boutons `data-act`) et démarrage du jeu |

## Ajouter une âme (checklist)

1. Dans `js/saisons/saisonN.js`, copier le bloc d'un client et remplir :
   `CL.k` (avec `staffFx` et `gift.fx`), `TALK.k`, `WIPE.k`, `LETTERS.k`, `REGULARS.k`, `ROOM_SAY.k`, `ROOM_KW.k`, `BOSS.k`, `LEGEND_CARD.k`, `CLIENT_CARD.k`, `CARDS.<carte>`.
   - `wound` = la gelée qui l'aide (clé de `ESS` : normal, feu, eau, combat, psy, vol) ; `cogHint` doit nommer la même couleur.
   - `likesEss` = une autre gelée qu'il aime bien.
2. Ajouter `k` à `CLIENT_ORDER` (`js/01-base.js`).
3. Télécharger son sprite animé et son cri dans `assets/anim/<id>.gif` et `assets/cries/<id>.mp3`.
4. Lister ses images à faire dans `GEMINI.md` (salles, cartes, icône d'artefact). En attendant, le jeu utilise le décor générique du type de salle et le design de carte sans dessin.
5. Ajouter son plan au bot de test (`tests/bot.py`, dictionnaire `plan`).

## Ajouter un ingrédient

Dans `ING` (`js/01-base.js`) avec `season:N` et une fonction `fx:x=>({ouv,ten,hang,turns,note})` ; ajouter la clé à `SEASON_NEW[N]` ; icône PokeAPI dans `assets/items/` puis `python3 tools/genitems.py`.

## Ajouter des images

Déposer le fichier `.webp` dans `assets/art/` puis `python3 tools/genassets.py`. Noms attendus :
`dj-<client>-<salle>` (salles 2:1), `card-<carte>` (320×480, bas calme pour le texte), `relic-<clé>` (128×128 détouré).

## Publier

Le jeu est publié sur GitHub Pages : https://pixelpachi.github.io/Refuge/ (dépôt PixelPachi/Refuge, branche `main`).
Copier le projet dans le clone du dépôt, committer, pousser ; la page se met à jour en une ou deux minutes.

## Vérifications avant publication

`node --check` sur chaque fichier js, puis les tests : audit des boutons, bot qui joue toutes les saisons, glisser-viser des cartes.
Les sprites chromatiques (rares) sont chargés depuis PokeAPI en ligne.

## Historique

Les saisons 1 et 2 gardent quelques effets historiques codés directement dans le moteur (postes et artefacts de Machopeur à Hypotrempe, `staffOn("…")`, `S.equip.…`). À partir de la saison 3, tout passe par les crochets déclarés dans la fiche du client.

## Équilibrage
- Difficulté des ombres : `DIFF` dans `js/10-combat.js` (multiplicateurs de PV et de dégâts, progression par saison, saison 1 plus douce, multiplicateur des ombres finales des Grands Échos).
- Artefacts : on les possède tous (`S.owned`) mais on n'en porte que `RELIC_MAX` (5) à la fois (`S.equip`), à choisir dans le Registre. L'Éclat de la Faille est toujours actif.
- Mesurer : `tests/bot.py` écrit une sauvegarde à chaque fin de saison (`/tmp/snap_sN.json`), puis `tests/sim.py` rejoue des Labyrinthes depuis ces sauvegardes avec un joueur glouton et donne le taux de victoire et les PV restants. Cible : PV restants autour de 30 à 50 % contre l'ombre finale, environ une défaite sur dix.

## Affichage ordinateur
- `js/14-ordi.js` : sur grand écran en paysage (`min-width:1000px` et `min-aspect-ratio:5/4`), ajoute `body.desk`, agrandit la colonne de téléphone avec un zoom (`--z`), affiche deux panneaux sur les côtés (saison, personnel, artefacts portés, âmes de la saison, raccourcis) et gère les raccourcis clavier (Espace/Entrée, 1 à 9, F, D, R, Échap).
- Les styles sont à la fin de `css/style.css` (bloc « Affichage ordinateur »). Sur téléphone, rien ne change.
- Le glisser des cartes divise le déplacement par `deskZoom()`.

## Après la fin (post-game)
- Bouton « La suite : après la fin » dans la chronique de la saison 12 → `startPostgame()` (js/15-postgame.js). `S.pg = {depth,best,runs,wins,tired}`.
- Jour : `pgPickGuests()` remplace `pickVillager()` (âmes apaisées, voyageurs `WORLD` de js/saisons/postgame.js, villageois ; `PG_GUESTS`). Chaque client peut arriver chromatique (`SHINY_RATE` = 1/25, `shinyRoll()`) : page au Registre (`S.shinies`), cartes `SHINY_CARDS` (rareté `chroma`, exclusives).
- Voyageurs : entrées `CL[k].world` hors `CLIENT_ORDER` ; carte à 2 cœurs (`affCard`, dans `gainAff`), artefact à 5 cœurs. `giftOwners()` = âmes + voyageurs pour tous les artefacts.
- Nuit : pas de service. `renderPgNight()` → `pgGo(k)` (une âme apaisée ou `__ten`, le Tenancier) → `pgMakeMap(depth)` (carte procédurale, salles prises dans tous les Labyrinthes) → `makeEnemyPG()` (`PG_MOVES` : poison, drain, gel, malédiction, brise-garde, soin, confusion) → `pgAfterRun()`. Profondeur +1 par victoire : PV ×(1+0,06·prof.), dégâts ×(1+0,04·prof.).
- Test : `python3 tests/postgame.py $PWD/index.html <snapshot.json> [jours] [captures]`.

## Deck
- `DECK_MAX = 30` (js/10-combat.js) : `deckAdd(id)` met la carte dans la réserve quand le deck est plein ; `deckFit()` (appelé par `ensureDeck`) range l'excédent des anciennes sauvegardes dans la réserve.
- Test longue durée de l'après-fin : `/tmp/pglong.py` (300 jours simulés sans interface).

## Malédictions et coûts
- Malédictions (`CURSES`, js/10-combat.js) : Doute, Regret (−2 PV en fin de tour), Remords (Faible 1), Cauchemar (−1 énergie à la pioche, éphémère), Poids du Passé (retenue), Hésitation (ne fait rien). Ajoutées par les marchés risqués des salles à choix (`curseBargains`) et par le coup Maléfice des ombres (`hexCurse`). Le sanctuaire retire d'abord une malédiction.
- `js/16-equilibrage.js` : `COST_FIX` (coûts relevés) et `STAT_FIX` (cartes gardées à 1 énergie mais réduites).
- `jusbaie` ajouté à `BASES` (le Jus de Baies n'était pas sélectionnable au comptoir).
