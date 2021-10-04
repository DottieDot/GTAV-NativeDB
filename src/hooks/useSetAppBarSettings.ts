import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppBarSettings } from '../components'
import { registerAppBarSettings, removeAppBarSettings } from '../store'

export default function useSetAppBarSettings(id: string, settings: AppBarSettings) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(registerAppBarSettings(id, settings))

    return () => {
      dispatch(removeAppBarSettings(id))
    }
  }, [dispatch, id, settings])
}
