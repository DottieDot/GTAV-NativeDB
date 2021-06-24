import { Typography, TypographyProps } from '@material-ui/core'
import React, { memo } from 'react'

export interface NativeDetailsProps extends TypographyProps {
  hash  : string
  jhash?: string
  build : string
}

function NativeDetails({ hash, jhash, build, children, sx, ...rest }: NativeDetailsProps) {
  return (
    <Typography sx={{ fontFamily: '"Roboto Mono", monospace', ...sx }} {...rest}>
      {'//'}&nbsp;{hash} {jhash} b{build}
    </Typography>
  )
}
export default memo(NativeDetails)
