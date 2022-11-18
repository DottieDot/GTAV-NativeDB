import { Box, BoxProps } from '@mui/material'
import { NativeParam } from '../../store'
import NativeType from '../NativeType'

export interface NativeParamsExProps extends Omit<BoxProps, 'children'> {
  params: NativeParam[]
}

export default function NativeParamsEx({ params, ...rest }: NativeParamsExProps) {
  return (
    <Box component="span" {...rest}>
        {'('}
        {params.map(({ type, name }, index) => (
          <Box sx={{ ml: 2 }} key={name}>
            <NativeType>{type}</NativeType>
            &nbsp;{name}
            {((index + 1) !== params.length) && ','}
          </Box>
        ))}
        {')'}
    </Box>
  )
}
