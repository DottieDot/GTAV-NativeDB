import { Typography, TypographyProps } from '@material-ui/core'
import React, { memo } from 'react'
import { NativeParam } from '../../store'
import NativeType from '../NativeType'
import NativeParams from '../NativeParams'

export interface NativeDefinitionProps extends Omit<TypographyProps, 'children'> {
  name      : string
  params    : NativeParam[]
  returnType: string
}

function NativeDefinition({ name, params, returnType, sx, ...rest }: NativeDefinitionProps) {
  return (
    <Typography component="span" sx={{ fontFamily: '"Roboto Mono", monospace', ...sx }} {...rest}>
      <NativeType>{returnType}</NativeType>
      <span>
        {' '}{name}
      </span>
      <NativeParams params={params} />
    </Typography>
  )
}
export default memo(NativeDefinition)
