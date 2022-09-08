import { Box, BoxProps } from '@mui/material'
import React, { Fragment } from 'react'
import { NativeParam } from '../../store'
import NativeType from '../NativeType'

export interface NativeParamsProps extends Omit<BoxProps, 'children'> {
  params: NativeParam[]
}

export default function NativeParams({ params, ...rest }: NativeParamsProps) {
  return (
    <Box component="span" {...rest}>
        {'(\u200B'}
        {params.map(({ type, name }, index) => (
          <Fragment key={name}>
            <NativeType>{type}</NativeType>
            &nbsp;{name}
            {((index + 1) !== params.length) && ', '}
          </Fragment>
        ))}
        {')'}
    </Box>
  )
}
