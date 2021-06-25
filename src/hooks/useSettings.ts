import useTypedSelector from './useTypedSelector'

export default function useSettings() {
  return useTypedSelector(state => state.settings)
}
