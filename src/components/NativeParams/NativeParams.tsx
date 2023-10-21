import { Box, BoxProps, useTheme } from '@mui/material'
import { Fragment } from 'react'
import { useSettings } from '../../hooks'
import { NativeParam } from '../../context'
import NativeType from '../NativeType'
import { convertTypeToTS } from '../../code-generation'
import { compactParams } from '../../code-generation/CodeGeneratorBase'

export interface NativeParamsProps extends Omit<BoxProps, 'children'> {
  params: NativeParam[]
}

export default function NativeParams({ params, ...rest }: NativeParamsProps) {
  const { nativeDisplayMode, nativeTypes, compactVectors } = useSettings()
  const { extensions } = useTheme()

  params = compactParams(params, compactVectors)

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

          {(nativeDisplayMode === 'TS') && (
            <Fragment>
              :&nbsp;
              <NativeType type={convertTypeToTS(type, nativeTypes)} />
            </Fragment>
          )}

          {((index + 1) !== params.length) && ', '}
        </Fragment>
      ))}

      )
    </Box>
  )
}
