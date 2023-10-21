import { useEffect } from 'react'
import { AppBarSettings } from '../components'
import { useAppBarSettingsContext } from '../context'

export default function useSetAppBarSettings(id: string, settings: AppBarSettings) {
  const { registerAppBarSettings, removeAppBarSettings } = useAppBarSettingsContext()

  useEffect(() => {
    registerAppBarSettings(id, settings)

    return () => {
      removeAppBarSettings(id)
    }
  }, [ registerAppBarSettings, removeAppBarSettings, id, settings ])
}
