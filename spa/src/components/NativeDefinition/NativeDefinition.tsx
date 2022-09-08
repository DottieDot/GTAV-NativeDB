import { Typography, TypographyProps } from '@mui/material'
import React, { memo, useMemo } from 'react'
import { NativeParam } from '../../store'
import NativeType from '../NativeType'
import NativeParams from '../NativeParams'
import CopyableText from '../CopyableText'

export interface NativeDefinitionProps extends Omit<TypographyProps, 'children'> {
  name         : string
  params       : NativeParam[]
  returnType   : string
  noWrap      ?: boolean
  nameCopyable?: boolean
}

function NativeDefinition({ name, params, returnType, sx, noWrap = false, nameCopyable = true, ...rest }: NativeDefinitionProps) {
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
      <NativeType>{returnType}{' '}</NativeType>
        {nameCopyable ? (
          <CopyableText>
            {nameWithBreaks}
          </CopyableText>
        ) : (
          <span>
            {nameWithBreaks}
          </span>
        )}
      <NativeParams params={params} />
    </Typography>
  )
}
export default memo(NativeDefinition)
