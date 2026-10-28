import { type ImmutableObject } from 'seamless-immutable'

export interface Config {
  /** URL de la couche d'entités hébergée (se termine par /FeatureServer/0) */
  layerUrl: string
  /** Champ numérique qui donne l'ordre des manches (1 à 5) */
  orderField: string
  /** Champ texte : nom du lieu, affiché à la révélation */
  nameField: string
  /** Champ texte optionnel : anecdote affichée à la révélation */
  anecdoteField: string
  /** Nombre maximum de manches jouées */
  maxRounds: number
  /** Distance (m) en dessous de laquelle on obtient le score maximum */
  perfectDistance: number
  /** Distance (m) au-delà de laquelle on obtient 0 point */
  maxDistance: number
}

export type IMConfig = ImmutableObject<Config>
