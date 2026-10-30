# AgglOguessr : widget personnalisé pour ArcGIS Experience Builder (Developer Edition)

GeoGuessr de l'agglomération montargoise. Un seul widget, à poser dans une expérience qui contient une carte.

## Installation

1. Copiez le dossier `agglo-guessr` dans `client/your-extensions/widgets/` de votre Experience Builder Developer Edition.
2. Dans `manifest.json`, mettez dans `exbVersion` la version de votre Experience Builder.
3. Lancez `npm start` dans `client`, puis rechargez le builder.
4. Ajoutez le widget AgglOguessr dans votre expérience. Il peut être placé n'importe où et réduit au minimum : en Aperçu ou publié, son cadre laisse passer les clics vers la carte.

## Où modifier quoi

| Je veux changer | Fichier | Remarque |
|---|---|---|
| Les couleurs (boutons, marqueurs, image de score) | `src/runtime/theme.ts` | Chaque couleur est expliquée en commentaire |
| La police de caractères | `src/runtime/theme.ts` | Variable FONT_FAMILY |
| Les textes (titres, boutons, messages) | `src/runtime/textes.ts` | Un texte par ligne |
| Les tailles, positions, arrondis, ombres | `src/runtime/style.ts` | Une propriété par ligne, avec son rôle |
| La taille des marqueurs et de la ligne sur la carte | `src/runtime/widget.tsx` | Constantes GUESS_SYMBOL, TRUTH_SYMBOL, LINE_SYMBOL en haut du fichier |
| Le barème des points | Réglages du widget dans le builder | Ou la fonction computeScore dans `utils.ts` |
| La taille des photos (1 600 et 480 pixels) | `src/runtime/utils.ts` | Fonction prepareImages |
| L'image de score partagée | `src/runtime/utils.ts` | Fonction buildScoreCard |
| Le déroulement du jeu | `src/runtime/widget.tsx` | Fonctions startRound, validate, next, replay |
| Le panneau de réglages | `src/setting/setting.tsx` | |
| L'icône du widget dans le builder | `icon.svg` | Carré coloré avec les lettres AG |

## Réglages par défaut (config.json)

Le fichier JSON n'accepte pas de commentaires, voici le rôle de chaque ligne.

| Clé | Rôle | Valeur par défaut |
|---|---|---|
| layerUrl | Adresse de la couche d'entités hébergée (se termine par /FeatureServer/0) | vide |
| orderField | Champ numérique qui donne l'ordre des manches | ordre |
| nameField | Champ texte du nom du lieu | nom |
| anecdoteField | Champ texte de l'anecdote (optionnel) | anecdote |
| maxRounds | Nombre de manches maximum | 5 |
| perfectDistance | Distance en mètres sous laquelle le score est maximum | 50 |
| maxDistance | Distance en mètres au-delà de laquelle le score est nul | 4000 |

Ces valeurs se modifient aussi dans le panneau de réglages du widget, sans toucher au fichier.

## Préparer la couche

- Couche d'entités hébergée de points, avec les pièces jointes activées : une seule photo par point (JPEG ou PNG).
- Champs : ordre (entier), nom (texte), anecdote (texte, optionnel).
- Donnez aux fichiers photos des noms neutres (pas gare_montargis.jpg).
- Partagez la couche publiquement si l'expérience est publique.
- Ne pas ajouter la couche à la carte : le widget la lit directement, les points restent invisibles.

## Changer les photos

Remplacez la pièce jointe, déplacez le point, mettez à jour le nom et l'anecdote. Le widget ne change pas.

## Comment ça marche

- Les points sont demandés au service en longitude et latitude (WGS84), le service convertit lui-même depuis le Lambert 93.
- Le pari du joueur est converti en longitude et latitude et la distance est calculée en mètres, sans module ArcGIS particulier, donc compatible avec toutes les versions de l'API.
- Les photos sont réduites au chargement (grande version et miniature) pour garder le jeu fluide.
- Le bouton de partage fabrique une image PNG : menu de partage du téléphone sur mobile, téléchargement sur ordinateur.

## Si les clics ne passent toujours pas dans la zone du widget

Le widget rend son cadre traversable automatiquement. Si une version d'Experience Builder ajoute un conteneur qui bloque quand même les clics, réduisez le widget au minimum dans le builder et placez-le dans un coin de la carte.

## Limites connues

- Dans le builder, le jeu est remplacé par un encart de diagnostic. Testez en Aperçu.
- La carte doit être en Web Mercator ou en WGS84.
- L'image de partage ne contient pas de mini-carte récapitulative.
