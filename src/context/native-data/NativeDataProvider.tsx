import { ReactNode, createContext, memo, useCallback, useState } from 'react'
import { ConstDefinition, Game, Namespace, Native, NativeStats, TypeDefinition } from './model'
import { NativeDataLoader } from '../../external'

export interface GameNativeData {
  natives: { [hash: string]: Native }
  namespaces: { [name: string]: Namespace }
  constants: { [name: string]: ConstDefinition }
  types: { [name: string]: TypeDefinition }
  stats: NativeStats
}

export interface NativeDataContext {
  games: { [name in keyof Game]?: GameNativeData }
  setNatives: (game: Game, data: NativeDataLoader) => void
}

export const nativeDataContext = createContext<NativeDataContext | null>(null)

export interface NativeDataProviderProps {
  children: ReactNode
}

export const NativeDataProvider = memo(({ children }: NativeDataProviderProps) => {
  const [games, setGames] = useState<NativeDataContext['games']>({})

  const setNatives = useCallback<NativeDataContext['setNatives']>((game, { namespaces, natives, types, constants }) => {
    const stats: NativeStats = {
      namespaces: Object.keys(namespaces).length,
      natives: Object.keys(natives).length,
      comments: Object.values(natives).reduce((accumulator, { comment }) => {
        accumulator += +!!comment
        return accumulator
      }, 0),
      knownNames: Object.values(natives).reduce((accumulator, native) => {
        accumulator.total += +(native.name.slice(0, 2) !== '_0')
        accumulator.confirmed += +(native.name[0] !== '_')
        return accumulator
      }, { total: 0, confirmed: 0 })
    }

    setGames(games => ({
      ...games,
      [game]: {
        natives,
        namespaces,
        constants,
        types,
        stats
      }
    }))
  }, [setGames])

  return (
    <nativeDataContext.Provider value={{
      games,
      setNatives
    }}>
      {children}
    </nativeDataContext.Provider>
  )
})
