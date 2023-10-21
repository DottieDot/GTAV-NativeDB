import { ReactNode, createContext, memo } from 'react'
import { useGuardedContext } from '../../hooks'
import { Game } from '../native-data'

export const selectedGameContext = createContext<Game | null>(null)

export function useSelectedGameContext() {
  return useGuardedContext(selectedGameContext, 'useSelectedGame', 'SelectedGameProvider')
}

export interface SelectedGameProviderProps {
  game: Game,
  children: ReactNode
}

export const SelectedGameProvider = memo(function SelectedGameProvider({ game, children }: SelectedGameProviderProps) {
  return (
    <selectedGameContext.Provider value={game}>
      {children}
    </selectedGameContext.Provider>
  )
})
