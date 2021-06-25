import { useContext } from 'react'
import { appBarContext } from '../components'

export default function useAppBar() {
  return useContext(appBarContext)
}
