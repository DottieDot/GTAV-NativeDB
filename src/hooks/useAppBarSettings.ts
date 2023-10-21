import { useMemo } from 'react'
import { AppBarSettings } from '../components'
import { useAppBarSettingsContext } from '../context'

export default function useAppBarSettings() {
  const { settings: raw } = useAppBarSettingsContext()
  return useMemo(() => 
    Object.values(raw).reduce<AppBarSettings>((accumulator, { actions, ...rest }) => ({
      ...accumulator,
      actions: [
        ...accumulator.actions!,
        ...(actions ?? [])
      ],
      ...rest
    }), { actions: []})
  , [ raw ])
}
