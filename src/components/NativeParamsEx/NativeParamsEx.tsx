import { Box, BoxProps, useTheme } from '@mui/material'
import { Fragment } from 'react'
import { useSettings } from '../../hooks'
import { NativeParam } from '../../store'
import NativeType from '../NativeType'
import NativeValue from '../NativeValue'

export interface NativeParamsExProps extends Omit<BoxProps, 'children'> {
  params: NativeParam[]
}

export default function NativeParamsEx({ params, ...rest }: NativeParamsExProps) {
  const { nativeDisplayMode } = useSettings()
  const { extensions } = useTheme()

  return (
    <Box component="span" sx={{ color: extensions.symbolColor }} {...rest}>
      {params.length ? (
        <Fragment>
        {'('}
        {params.map(({ type, name, defaultValue }, index) => (
          <Box sx={{ ml: 2 }} key={name}>
            {(nativeDisplayMode === 'C') && (
              <Fragment>
                <NativeType type={type} popover />
                &nbsp;
              </Fragment>
            )}
            <Box component="span" sx={{ color: extensions.parameterColor }}>
              {name}
            </Box>
            {(nativeDisplayMode === 'UML') && (
              <Fragment>
                :&nbsp;
                <NativeType type={type} popover />
              </Fragment>
            )}
            {defaultValue && (
              <Fragment>
                &nbsp;=&nbsp;<NativeValue value={defaultValue} popover />
              </Fragment>
            )}
            {((index + 1) !== params.length) && ','}
          </Box>
        ))}
        {')'}
        </Fragment>
      ) : (
        <Fragment>
          {'()'}
        </Fragment>
      )}
    </Box>
  )
}
