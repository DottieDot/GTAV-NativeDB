import { useEffect } from 'react'
import { NativeDataLoader } from './external'
import { useSettings } from './hooks'
import _ from 'lodash'
import useLocalStorageState from 'use-local-storage-state'
import { Game, NativeSources, useNativeDataContext } from './context'

export default function NativeLoader() {
  const { sources } = useSettings()
  const [ specialFile ] = useLocalStorageState<string | null>('special.json', { defaultValue: null })
  const { setNatives } = useNativeDataContext()
  useEffect(() => {
    for (const game of [ Game.GrandTheftAuto5, Game.RedDeadRedemption2 ]) {
      (async () => {
        const loader = new NativeDataLoader(game)
        if (_.includes(sources, NativeSources.Alloc8or)) {
          await loader.loadAlloc8or()
        }
        if (game === Game.GrandTheftAuto5) {
          if (_.includes(sources, NativeSources.FiveM)) {
            await loader.loadFiveM()
          }
          if (_.includes(sources, NativeSources.DottieDot)) {
            await loader.loadDottieDot()
          }
          if (_.includes(sources, NativeSources.SpecialData) && specialFile) {
            await loader.loadSpecialData(specialFile)
          }
        }

        setNatives(game, loader)
      })()
    }
  }, [ setNatives, sources, specialFile ])

  return null
}
