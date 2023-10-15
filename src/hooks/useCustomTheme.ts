import { useThemesContext } from '../context'
import { Theme } from '../context'

export default function useCustomTheme(id: string): Theme | undefined {
  return useThemesContext().themes[id]
}
