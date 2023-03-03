import { CustomTheme } from '../store'
import useTypedSelector from './useTypedSelector'

export default function useCustomTheme(id: string): CustomTheme | undefined {
  return useTypedSelector(state => state.themes.themes[id])
}
