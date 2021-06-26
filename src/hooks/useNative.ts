import useTypedSelector from './useTypedSelector'

export default function useNative(nativeHash: string) {
  return useTypedSelector(selector => selector.natives[nativeHash])
}
