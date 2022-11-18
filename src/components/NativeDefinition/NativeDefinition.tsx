import { Typography, TypographyProps } from '@mui/material'
import { memo, useMemo } from 'react'
import { NativeParam } from '../../store'
import NativeType from '../NativeType'
import CopyableText from '../CopyableText'
import NativeParamsEx from '../NativeParamsEx'
import NativeParams from '../NativeParams'

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
      <NativeType popover={!noWrap} type={returnType} />{' '}
      {nameCopyable ? (
        <CopyableText>
          {nameWithBreaks}
        </CopyableText>
      ) : (
        <span>
          {nameWithBreaks}
        </span>
      )}
      {noWrap ? (
        <NativeParams params={params} />
      ) : (
        <NativeParamsEx params={params} />
      )}
    </Typography>
  )
}
export default memo(NativeDefinition)
