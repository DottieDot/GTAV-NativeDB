import { Typography, TypographyProps, Link } from '@mui/material'
import { memo } from 'react'
import Linkify from 'react-linkify'

export interface NativeCommentProps extends TypographyProps {}

function NativeComment({ children, sx, ...rest }: NativeCommentProps) {
  return (
    <Typography
      sx={{
        whiteSpace: 'pre-wrap',
        wordBreak:  'break-word',
        ...sx 
      }}
      {...rest}
    >
      <Linkify
        componentDecorator={(decoratedHref, decoratedText, key) => (
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
