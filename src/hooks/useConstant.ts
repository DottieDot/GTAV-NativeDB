import { useNativeDataForGame } from './useNativeDataForGame'

export default function useConstant(constant: string) {
  return useNativeDataForGame()?.constants[constant]
}
