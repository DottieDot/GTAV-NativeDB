import { Typography, TypographyProps } from '@material-ui/core'
import React, { memo, Fragment } from 'react'

export interface NativeDetailsProps extends TypographyProps {
  hash  : string
  jhash?: string
  build?: string
}

function NativeDetails({ hash, jhash, build, children, sx, ...rest }: NativeDetailsProps) {
  return (
    <Typography sx={{ fontFamily: '"Roboto Mono", monospace', ...sx }} {...rest}>
      {'//'}&nbsp;{hash} {jhash} {build && (<Fragment>b{build}</Fragment>) }
    </Typography>
  )
}
export default memo(NativeDetails)
