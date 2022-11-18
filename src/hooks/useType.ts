import useTypedSelector from './useTypedSelector'

export default function useType(type: string) {
  return useTypedSelector(state => state.types[type])
}
