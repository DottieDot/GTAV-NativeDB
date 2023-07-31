import { ReactNode, createContext, memo } from 'react'

export const selectedGameContext = createContext<'gta5' | 'rdr3' | null>(null)

export interface SelectedGameProviderProps {
  game: 'gta5' | 'rdr3',
  children: ReactNode
}

export const SelectedGameProvider = memo(({ game, children }: SelectedGameProviderProps) => {
  return (
    <selectedGameContext.Provider value={game}>
      {children}
    </selectedGameContext.Provider>
  )
})
