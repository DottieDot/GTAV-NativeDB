import useTypedSelector from './useTypedSelector'

export default function useStats() {
  return useTypedSelector(state => state.stats)
}
