import { useContext, useEffect } from 'react'
import { appBarContext, AppBarSettings } from '../components'

export default function useSetAppBarSettings(settings: AppBarSettings) {
  const [currentSettings, setSettings] = useContext(appBarContext) ?? [{}, () => {}]

  useEffect(() => {
    const newSettings = {
      ...currentSettings,
      ...settings,
      actions: (currentSettings.actions || [])
        .filter(action => !settings.actions?.find(a2 => a2.text === action.text))
        .concat(settings.actions ?? [])
    }
    setSettings(newSettings)

    return () => {
      setSettings({
        ...currentSettings,
        actions: (currentSettings.actions || [])
          .filter(action => !settings.actions?.find(a2 => a2.text === action.text))
      })
    }
  }, [currentSettings, setSettings, settings])
}
