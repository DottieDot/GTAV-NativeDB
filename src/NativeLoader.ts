import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import LoadNatives from './external/alloc8or-nativedb'
import { setNatives } from './store'

export default function NativeLoader() {
  const dispatch = useDispatch()
  useEffect(() => {
    (async () => {
      const natives = await LoadNatives()
      if (natives) {
        dispatch(setNatives(natives))
      }
    })()
  }, [dispatch])

  return null
}
