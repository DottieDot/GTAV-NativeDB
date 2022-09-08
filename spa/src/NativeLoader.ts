import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NativeDataLoader } from './external'
import { useSettings } from './hooks'
import { NativeSources, setNatives } from './store'
import _ from 'lodash'

export default function NativeLoader() {
  const { sources } = useSettings()
  const dispatch = useDispatch()
  useEffect(() => {
    (async () => {
      const loader = new NativeDataLoader()
      if (_.includes(sources, NativeSources.Alloc8or)) {
        await loader.loadAlloc8or()
      }
      if (_.includes(sources, NativeSources.FiveM)) {
        await loader.loadFiveM()
      }
      if (_.includes(sources, NativeSources.DottieDot)) {
        await loader.loadDottieDot()
      }

      dispatch(setNatives(loader))
    })()
  }, [dispatch, sources])

  return null
}
