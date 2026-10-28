# AgglOguessr : widget personnalisé pour ArcGIS Experience Builder (Developer Edition)

GeoGuessr de l'agglomération montargoise. Un seul widget, à poser dans une expérience qui contient une carte.

## Installation

1. Copiez le dossier `agglo-guessr` dans `client/your-extensions/widgets/` de votre Experience Builder Developer Edition.
2. Dans `manifest.json`, mettez dans `exbVersion` la version de votre Experience Builder (1.14.0 est une valeur par défaut).
3. Redémarrez le client (`npm start` dans `client`) puis rechargez le builder.
4. Dans votre expérience, ajoutez le widget **AgglOguessr** (peu importe où : il s'affiche par-dessus la page en mode Aperçu ou publié, et montre un petit encart de diagnostic dans le builder).

## Réglages du widget

| Réglage | Valeur |
|---|---|
| Carte | La carte de l'expérience |
| URL de la couche | URL de la couche d'entités hébergée, terminant par `/FeatureServer/0` |
| Champ ordre | Champ numérique (1 à 5) qui fixe l'ordre des manches |
| Champ nom | Nom du lieu, affiché à la révélation |
| Champ anecdote | Optionnel, phrase affichée avec le résultat |
| Barème | 5 000 pts sous 50 m, 0 pt au-delà de 4 000 m (décroissance quadratique) |

## Préparer la couche

- Couche d'entités hébergée de points, avec **pièces jointes activées** : une seule photo par point (JPEG ou PNG, environ 1 600 px de large).
- Champs : `ordre` (entier), `nom` (texte), `anecdote` (texte, optionnel).
- Donnez aux fichiers photos des noms neutres (pas `gare_montargis.jpg`).
- Partagez la couche publiquement si l'expérience est publique.
- Ne **pas** ajouter la couche à la carte : le widget la lit directement, les points restent invisibles.

## Changer les photos

Remplacez la pièce jointe, déplacez le point, mettez à jour `nom` et `anecdote`. Le widget ne change pas.

## Comment ça marche

- Les points sont demandés au service en Lambert 93 (EPSG:2154). Le pari du joueur est reprojeté en Lambert 93 et la distance est calculée en mètres.
- Le jeu s'affiche en fenêtre superposée (photo en grand, puis vignette dans le coin, bouton « Deviner », carte résultat, écran final).
- Le bouton « Partager mon score » fabrique une image PNG : menu de partage du téléphone sur mobile, téléchargement sur PC.

## Limites connues

- Le jeu est masqué dans le builder (encart de diagnostic à la place) pour ne pas recouvrir l'interface d'édition : testez en Aperçu.
- L'image de partage ne contient pas de mini-carte récap (option abandonnée pour l'instant).
