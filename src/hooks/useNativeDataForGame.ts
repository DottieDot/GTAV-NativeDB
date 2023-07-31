import { useNativeDataContext, useSelectedGameContext } from '../context'

export function useNativeDataForGame() {
  return useNativeDataContext().games[useSelectedGameContext()]
}
