import useTypedSelector from './useTypedSelector'

export default function useConstant(constant: string) {
  return useTypedSelector(state => state.constants[constant])
}
