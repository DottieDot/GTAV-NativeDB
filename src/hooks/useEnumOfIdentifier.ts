import { useMemo } from 'react'
import { TypeDefinitionEnum } from '../context'
import _ from 'lodash'
import { useNativeDataForGame } from './useNativeDataForGame'

export default function useEnumOfIdentifier(ident: string): TypeDefinitionEnum | null {
  const { types } = useNativeDataForGame()

  const enums = useMemo(() => {
    return Object.values(types).filter(type => type.type === 'Enum') as TypeDefinitionEnum[]
  }, [ types ])

  return useMemo(() => {
    return enums.find(e => _.find(e.values, v => v.name === ident)) ?? null
  }, [ enums, ident ])
}
