import { useNativeDataForGame } from './useNativeDataForGame'

export default function useStats() {
  return useNativeDataForGame().stats
}
