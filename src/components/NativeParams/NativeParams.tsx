import { alpha, Box, BoxProps, useTheme } from '@mui/material'
import React, { Fragment } from 'react'
import { useSettings } from '../../hooks'
import { NativeParam } from '../../store'
import NativeType from '../NativeType'

export interface NativeParamsProps extends Omit<BoxProps, 'children'> {
  params: NativeParam[]
}

export default function NativeParams({ params, ...rest }: NativeParamsProps) {
  const { nativeDisplayMode } = useSettings()
  const { extensions } = useTheme()

  return (
    <Box component="span" sx={{ color: extensions.symbolColor }} {...rest}>
      {'(\u200B'}
      {params.map(({ type, name }, index) => (
        <Fragment key={name}>
          {(nativeDisplayMode === 'C') && (
            <Fragment>
              <NativeType type={type} />
              &nbsp;
            </Fragment>
          )}
          <Box component="span" sx={{ color: extensions.parameterColor }}>
            {name}
          </Box>
          {(nativeDisplayMode === 'UML') && (
            <Fragment>
              :&nbsp;
              <NativeType type={type} />
            </Fragment>
          )}
          {((index + 1) !== params.length) && ', '}
        </Fragment>
      ))}
      {')'}
    </Box>
  )
}
