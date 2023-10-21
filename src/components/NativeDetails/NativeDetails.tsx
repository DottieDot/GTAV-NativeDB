import { Typography, TypographyProps } from '@mui/material'
import { Fragment, memo } from 'react'
import CopyableText from '../CopyableText'

export interface NativeDetailsProps extends TypographyProps {
  hash  : string
  jhash?: string
  build?: string
}

function NativeDetails({ hash, jhash, build, sx, ...rest }: NativeDetailsProps) {
  return (
    <Typography
      sx={{
        fontFamily: '"Roboto Mono", monospace',
        opacity:    .7,
        ...sx 
      }}
      {...rest}
    >
      //&nbsp;

      <CopyableText>
        {hash}
      </CopyableText> 

      {' '}

      <CopyableText>
        {jhash}
      </CopyableText> 

      {' '}

      {build && (
        <Fragment>
          b{build}
        </Fragment>
      ) }
    </Typography>
  )
}
export default memo(NativeDetails)
