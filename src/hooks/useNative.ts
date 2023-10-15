import { useNativeDataForGame } from './useNativeDataForGame'

export default function useNative(nativeHash: string) {
  return useNativeDataForGame().natives[nativeHash]
}
