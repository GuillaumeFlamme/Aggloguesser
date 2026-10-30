// PANNEAU DE RÉGLAGES : ce que l'on voit à droite dans le builder quand on sélectionne le widget.

import { React, type AllWidgetSettingProps } from 'jimu-core' // outils de base d'Experience Builder
import { MapWidgetSelector, SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components' // éléments de mise en page des réglages
import { TextInput, NumericInput } from 'jimu-ui' // champ texte et champ numérique
import { type IMConfig } from '../config' // type des réglages du widget

// Composant du panneau de réglages.
const Setting = (props: AllWidgetSettingProps<IMConfig>): React.ReactElement => {
  const { config, id, onSettingChange, useMapWidgetIds } = props // récupère les réglages actuels et la fonction pour les enregistrer

  // Enregistre la nouvelle valeur d'un réglage (key est le nom du réglage).
  const setConfig = (key: string, value: string | number): void => {
    onSettingChange({ id, config: config.set(key, value) }) // envoie la configuration modifiée à Experience Builder
  }

  // Enregistre la carte choisie.
  const onMapSelected = (ids: string[]): void => {
    onSettingChange({ id, useMapWidgetIds: ids }) // mémorise l'identifiant de la carte sélectionnée
  }

  return (
    <div className="widget-setting-agglo-guessr">
      {/* Section 1 : choix de la carte */}
      <SettingSection title="Carte">
        <SettingRow flow="wrap" label="Carte sur laquelle jouer">
          <MapWidgetSelector useMapWidgetIds={useMapWidgetIds} onSelect={onMapSelected} />
        </SettingRow>
      </SettingSection>

      {/* Section 2 : couche des points */}
      <SettingSection title="Couche des points">
        {/* Adresse de la couche */}
        <SettingRow flow="wrap" label="URL de la couche d’entités (se termine par /FeatureServer/0)">
          <TextInput
            className="w-100" // champ sur toute la largeur
            size="sm" // petite taille
            defaultValue={config.layerUrl} // valeur actuelle
            placeholder="Adresse de la couche, terminant par /FeatureServer/0" // texte indicatif
            onAcceptValue={(value: string) => setConfig('layerUrl', value.trim())} // enregistre à la validation, sans espaces autour
          />
        </SettingRow>
        {/* Nom du champ d'ordre */}
        <SettingRow flow="wrap" label="Champ d’ordre des manches">
          <TextInput
            className="w-100" // champ sur toute la largeur
            size="sm" // petite taille
            defaultValue={config.orderField} // valeur actuelle
            onAcceptValue={(value: string) => setConfig('orderField', value.trim())} // enregistre à la validation
          />
        </SettingRow>
        {/* Nom du champ du nom de lieu */}
        <SettingRow flow="wrap" label="Champ du nom du lieu">
          <TextInput
            className="w-100" // champ sur toute la largeur
            size="sm" // petite taille
            defaultValue={config.nameField} // valeur actuelle
            onAcceptValue={(value: string) => setConfig('nameField', value.trim())} // enregistre à la validation
          />
        </SettingRow>
        {/* Nom du champ d'anecdote */}
        <SettingRow flow="wrap" label="Champ de l’anecdote (optionnel)">
          <TextInput
            className="w-100" // champ sur toute la largeur
            size="sm" // petite taille
            defaultValue={config.anecdoteField} // valeur actuelle
            onAcceptValue={(value: string) => setConfig('anecdoteField', value.trim())} // enregistre à la validation
          />
        </SettingRow>
      </SettingSection>

      {/* Section 3 : règles du jeu */}
      <SettingSection title="Règles du jeu">
        {/* Nombre de manches */}
        <SettingRow flow="wrap" label="Nombre de manches maximum">
          <NumericInput
            className="w-100" // champ sur toute la largeur
            size="sm" // petite taille
            min={1} // au moins une manche
            max={20} // vingt manches au maximum
            value={config.maxRounds} // valeur actuelle
            onChange={(value: number) => setConfig('maxRounds', value)} // enregistre à chaque changement
          />
        </SettingRow>
        {/* Distance parfaite */}
        <SettingRow flow="wrap" label="Distance parfaite en mètres (score maximum en dessous)">
          <NumericInput
            className="w-100" // champ sur toute la largeur
            size="sm" // petite taille
            min={0} // pas de valeur négative
            value={config.perfectDistance} // valeur actuelle
            onChange={(value: number) => setConfig('perfectDistance', value)} // enregistre à chaque changement
          />
        </SettingRow>
        {/* Distance maximale */}
        <SettingRow flow="wrap" label="Distance maximale en mètres (0 point au-delà)">
          <NumericInput
            className="w-100" // champ sur toute la largeur
            size="sm" // petite taille
            min={100} // au moins 100 mètres
            value={config.maxDistance} // valeur actuelle
            onChange={(value: number) => setConfig('maxDistance', value)} // enregistre à chaque changement
          />
        </SettingRow>
      </SettingSection>
    </div>
  )
}

export default Setting // exporte le panneau pour Experience Builder
