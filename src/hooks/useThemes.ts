import useTypedSelector from './useTypedSelector'

export default function useThemes()  {
  return useTypedSelector(state => state.themes.themes)
}
