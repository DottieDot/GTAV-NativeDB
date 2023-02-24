import { Box, BoxProps } from '@mui/material'
import React, { Fragment } from 'react'
import { useSettings } from '../../hooks'
import { NativeParam } from '../../store'
import NativeType from '../NativeType'

export interface NativeParamsProps extends Omit<BoxProps, 'children'> {
  params: NativeParam[]
}

export default function NativeParams({ params, ...rest }: NativeParamsProps) {
  const { nativeDisplayMode: listDisplayMode } = useSettings()

  if (listDisplayMode === 'C') {
    return (
      <Box component="span" {...rest}>
          {'(\u200B'}
          {params.map(({ type, name }, index) => (
            <Fragment key={name}>
              <NativeType type={type} />
              &nbsp;{name}
              {((index + 1) !== params.length) && ', '}
            </Fragment>
          ))}
          {')'}
      </Box>
    )
  }
  else {
    return (
      <Box component="span" {...rest}>
        {'(\u200B'}
        {params.map(({ type, name }, index) => (
          <Fragment key={name}>
            {name}
            :&nbsp;
            <NativeType type={type} />
            {((index + 1) !== params.length) && ', '}
          </Fragment>
        ))}
        {')'}
      </Box>
    )
  }
}
