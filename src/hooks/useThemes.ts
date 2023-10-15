import { useThemesContext } from '../context'

export default function useThemes()  {
  return useThemesContext().themes
}
