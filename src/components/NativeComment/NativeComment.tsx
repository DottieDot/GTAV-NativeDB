import { Typography, TypographyProps, Link } from '@material-ui/core'
import React, { memo } from 'react'
import Linkify from 'react-linkify'

export interface NativeCommentProps extends TypographyProps {}

function NativeComment({ children, sx, ...rest }: NativeCommentProps) {
  return (
    <Typography sx={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', ...sx }} {...rest}>
      <Linkify componentDecorator={(decoratedHref: string, decoratedText: string, key: number) => (
          <Link href={decoratedHref} key={key} target="_blank">
            {decoratedText}
          </Link>
        )}
      >
        {children || 'No comment available.'}
      </Linkify>
    </Typography>
  )
}
export default memo(NativeComment)
