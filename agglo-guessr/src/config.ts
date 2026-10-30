import { type ImmutableObject } from 'seamless-immutable' // type spécial d'Experience Builder pour des données non modifiables directement

// Liste des réglages du widget (les valeurs par défaut sont dans config.json).
export interface Config {
  /** URL de la couche d'entités hébergée (se termine par /FeatureServer/0) */
  layerUrl: string // adresse de la couche qui contient les points et les photos
  /** Champ numérique qui donne l'ordre des manches (1 à 5) */
  orderField: string // nom du champ "ordre" de la couche
  /** Champ texte : nom du lieu, affiché à la révélation */
  nameField: string // nom du champ "nom" de la couche
  /** Champ texte optionnel : anecdote affichée à la révélation */
  anecdoteField: string // nom du champ "anecdote" de la couche
  /** Nombre maximum de manches jouées */
  maxRounds: number // nombre de manches maximum (5 par défaut)
  /** Distance (m) en dessous de laquelle on obtient le score maximum */
  perfectDistance: number // distance parfaite en mètres (5 000 points en dessous)
  /** Distance (m) au-delà de laquelle on obtient 0 point */
  maxDistance: number // distance maximale en mètres (0 point au-delà)
}

// Version "immuable" de la configuration, c'est ce que reçoit le widget.
export type IMConfig = ImmutableObject<Config>
