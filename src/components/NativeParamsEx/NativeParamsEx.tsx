import { Box, BoxProps } from '@mui/material'
import { Fragment } from 'react'
import { NativeParam } from '../../store'
import NativeType from '../NativeType'
import NativeValue from '../NativeValue'

export interface NativeParamsExProps extends Omit<BoxProps, 'children'> {
  params: NativeParam[]
}

export default function NativeParamsEx({ params, ...rest }: NativeParamsExProps) {
  return (
    <Box component="span" {...rest}>
        {'('}
        {params.map(({ type, name, defaultValue }, index) => (
          <Box sx={{ ml: 2 }} key={name}>
            <NativeType popover type={type} />
            &nbsp;{name}
            {defaultValue && (
              <Fragment>
                &nbsp;=&nbsp;<NativeValue value={defaultValue} />
              </Fragment>
            )}
            {((index + 1) !== params.length) && ','}
          </Box>
        ))}
        {')'}
    </Box>
  )
}
