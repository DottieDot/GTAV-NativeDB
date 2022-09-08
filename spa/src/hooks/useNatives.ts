import useTypedSelector from './useTypedSelector'

export default function useNatives() {
  return useTypedSelector(state => state.natives)
}
