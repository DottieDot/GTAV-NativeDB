import { useNativeDataForGame } from './useNativeDataForGame'

export default function useType(type: string) {
  return useNativeDataForGame().types[type]
}
