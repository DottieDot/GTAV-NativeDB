import { Box, BoxProps, useTheme } from '@mui/material'
import { Fragment } from 'react'
import { useSettings } from '../../hooks'
import NativeType from '../NativeType'
import NativeValue from '../NativeValue'
import { convertTypeToTS } from '../../code-generation'
import { compactParams } from '../../code-generation/CodeGeneratorBase'
import { NativeParam } from '../../context'

export interface NativeParamsExProps extends Omit<BoxProps, 'children'> {
  params: NativeParam[]
}

export default function NativeParamsEx({ params, ...rest }: NativeParamsExProps) {
  const { nativeDisplayMode, nativeTypes, compactVectors } = useSettings()
  const { extensions } = useTheme()

  params = compactParams(params, compactVectors)

  return (
    <Box component="span" sx={{ color: extensions.symbolColor }} {...rest}>
      {params.length ? (
        <Fragment>
          (

          {params.map(({ type, name, defaultValue }, index) => (
            <Box key={name} sx={{ ml: 2 }}>
              {(nativeDisplayMode === 'C') && (
                <Fragment>
                  <NativeType type={type} popover />
                &nbsp;
                </Fragment>
              )}

              <Box component="span" sx={{ color: extensions.parameterColor }}>
                {name}
              </Box>

              {(nativeDisplayMode === 'UML' || nativeDisplayMode === 'TS') && (
                <Fragment>
                  :&nbsp;
                  <NativeType type={nativeDisplayMode === 'TS' ? convertTypeToTS(type, nativeTypes) : type} popover />
                </Fragment>
              )}

              {defaultValue && (
                <Fragment>
                &nbsp;=&nbsp;
                  <NativeValue value={defaultValue} popover />
                </Fragment>
              )}

              {((index + 1) !== params.length) && ','}
            </Box>
          ))}

          )
        </Fragment>
      ) : (
        <Fragment>
          ()
        </Fragment>
      )}
    </Box>
  )
}
