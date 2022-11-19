import useTypedSelector from './useTypedSelector'
import { useMemo } from 'react'
import { TypeDefinitionEnum } from '../store'
import _ from 'lodash'

export default function useEnumOfIdentifier(ident: string): TypeDefinitionEnum | null {
  const types = useTypedSelector(state => state.types)

  const enums = useMemo(() => {
    return Object.values(types).filter(type => type.type === 'Enum') as TypeDefinitionEnum[]
  }, [types])

  return useMemo(() => {
    return enums.find(e => _.find(e.values, v => v.name === ident)) ?? null
  }, [enums, ident]);
}
