import { Box, BoxProps } from '@mui/material'
import { Fragment } from 'react'
import { useSettings } from '../../hooks'
import { NativeParam } from '../../store'
import NativeType from '../NativeType'
import NativeValue from '../NativeValue'

export interface NativeParamsExProps extends Omit<BoxProps, 'children'> {
  params: NativeParam[]
}

export default function NativeParamsEx({ params, ...rest }: NativeParamsExProps) {
  const { nativeDisplayMode: listDisplayMode } = useSettings()

  if (listDisplayMode === 'C') {
    return (
      <Box component="span" {...rest}>
        {params.length ? (
          <Fragment>
          {'('}
          {params.map(({ type, name, defaultValue }, index) => (
            <Box sx={{ ml: 2 }} key={name}>
              <NativeType popover type={type} />
              &nbsp;{name}
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
  else {
    return (
      <Box component="span" {...rest}>
        {params.length ? (
          <Fragment>
            {'('}
            {params.map(({ type, name, defaultValue }, index) => (
              <Box sx={{ ml: 2 }} key={name}>
                {name}:&nbsp;
                <NativeType popover type={type} />
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
}
