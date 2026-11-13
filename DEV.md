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
| `js/11-saison.js` | Pourboire d'Or et Miaouss, Grand Écho (finale) et Grands Regrets par saison (`FINALE_MAPS` : Suicune en 4, Mewtwo en 6), fin de saison, début de saison suivante (`LAST_SEASON`) |
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
