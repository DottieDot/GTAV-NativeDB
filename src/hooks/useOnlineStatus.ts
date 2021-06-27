import { useContext } from 'react'
import { onlineStatusContext } from '../components'

export default function useOnlineStatus() {
  return useContext(onlineStatusContext)
}
