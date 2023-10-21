import { Typography } from '@mui/material'
import { memo } from 'react'
import { useType } from '../../hooks'
import NativeType from '../NativeType'
import EnumDefinition from './EnumDefinition'
import NativeTypeDefinition from './NativeTypeDefinition'
import StructDefinition from './StructDefinition'

export interface TypeDefinitionProps {
  type: string
}

export default memo(function TypeDefinition({ type: typeName }: TypeDefinitionProps) {
  const type = useType(typeName.replace('&', '').replace('[]', ''))

  if (!type) {
    return (
      <Typography sx={{ p: 1 }} variant="body2">
        No type information for 
        {' '}
        <NativeType type={typeName} />
        .
      </Typography>
    )
  }

  switch (type.type) {
    case 'Struct':
      return (
        <StructDefinition type={type} />
      )
    case 'Enum':
      return (
        <EnumDefinition type={type} />
      )
    case 'NativeType':
      return (
        <NativeTypeDefinition type={type} />
      )
  }
})
