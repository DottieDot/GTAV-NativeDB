import { useMemo } from 'react'
import { AppBarSettings } from '../components'
import useTypedSelector from './useTypedSelector'

export default function useAppBarSettings() {
  const raw = useTypedSelector(state => state.appBar)
  return useMemo(() => 
    Object.values(raw).reduce<AppBarSettings>((accumulator, { actions, ...rest }) => ({
      ...accumulator,
      actions: [
        ...accumulator.actions!,
        ...(actions ?? [])
      ],
      ...rest
    }), { actions: [] })
  , [raw])
}
