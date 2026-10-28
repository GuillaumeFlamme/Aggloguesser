import { React, type AllWidgetSettingProps } from 'jimu-core'
import { MapWidgetSelector, SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components'
import { TextInput, NumericInput } from 'jimu-ui'
import { type IMConfig } from '../config'

const Setting = (props: AllWidgetSettingProps<IMConfig>): React.ReactElement => {
  const { config, id, onSettingChange, useMapWidgetIds } = props

  const setConfig = (key: string, value: string | number): void => {
    onSettingChange({ id, config: config.set(key, value) })
  }

  const onMapSelected = (ids: string[]): void => {
    onSettingChange({ id, useMapWidgetIds: ids })
  }

  return (
    <div className="widget-setting-agglo-guessr">
      <SettingSection title="Carte">
        <SettingRow flow="wrap" label="Carte sur laquelle jouer">
          <MapWidgetSelector useMapWidgetIds={useMapWidgetIds} onSelect={onMapSelected} />
        </SettingRow>
      </SettingSection>

      <SettingSection title="Couche des points">
        <SettingRow flow="wrap" label="URL de la couche d’entités (…/FeatureServer/0)">
          <TextInput
            className="w-100"
            size="sm"
            defaultValue={config.layerUrl}
            placeholder="https://services.arcgis.com/…/FeatureServer/0"
            onAcceptValue={(value: string) => setConfig('layerUrl', value.trim())}
          />
        </SettingRow>
        <SettingRow flow="wrap" label="Champ « ordre » des manches">
          <TextInput
            className="w-100"
            size="sm"
            defaultValue={config.orderField}
            onAcceptValue={(value: string) => setConfig('orderField', value.trim())}
          />
        </SettingRow>
        <SettingRow flow="wrap" label="Champ « nom du lieu »">
          <TextInput
            className="w-100"
            size="sm"
            defaultValue={config.nameField}
            onAcceptValue={(value: string) => setConfig('nameField', value.trim())}
          />
        </SettingRow>
        <SettingRow flow="wrap" label="Champ « anecdote » (optionnel)">
          <TextInput
            className="w-100"
            size="sm"
            defaultValue={config.anecdoteField}
            onAcceptValue={(value: string) => setConfig('anecdoteField', value.trim())}
          />
        </SettingRow>
      </SettingSection>

      <SettingSection title="Règles du jeu">
        <SettingRow flow="wrap" label="Nombre de manches maximum">
          <NumericInput
            className="w-100"
            size="sm"
            min={1}
            max={20}
            value={config.maxRounds}
            onChange={(value: number) => setConfig('maxRounds', value)}
          />
        </SettingRow>
        <SettingRow flow="wrap" label="Distance parfaite (m) : score maximum en dessous">
          <NumericInput
            className="w-100"
            size="sm"
            min={0}
            value={config.perfectDistance}
            onChange={(value: number) => setConfig('perfectDistance', value)}
          />
        </SettingRow>
        <SettingRow flow="wrap" label="Distance maximale (m) : 0 point au-delà">
          <NumericInput
            className="w-100"
            size="sm"
            min={100}
            value={config.maxDistance}
            onChange={(value: number) => setConfig('maxDistance', value)}
          />
        </SettingRow>
      </SettingSection>
    </div>
  )
}

export default Setting
