import { Typography, TypographyProps } from '@material-ui/core'
import React, { memo, useMemo } from 'react'
import { NativeParam } from '../../store'
import NativeType from '../NativeType'
import NativeParams from '../NativeParams'

export interface NativeDefinitionProps extends Omit<TypographyProps, 'children'> {
  name      : string
  params    : NativeParam[]
  returnType: string
  noWrap   ?: boolean
}

function NativeDefinition({ name, params, returnType, sx, noWrap = false, ...rest }: NativeDefinitionProps) {
  const nameWithBreaks = useMemo(() => name.replace(/_/g, '_\u200b'), [name])
  
  return (
    <Typography 
      component="span" 
      sx={{ 
        fontFamily: '"Roboto Mono", monospace',
        whiteSpace: noWrap ? 'nowrap' : 'normal',
        overflowWrap: noWrap ? 'normal' : 'break-word',
        ...sx
      }} 
      {...rest}
    >
      <NativeType>{returnType}</NativeType>
      <span>
        {' '}{nameWithBreaks}
      </span>
      <NativeParams params={params} />
    </Typography>
  )
}
export default memo(NativeDefinition)
