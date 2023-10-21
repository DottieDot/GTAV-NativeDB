import { Typography, TypographyProps } from '@mui/material'
import { memo } from 'react'

export interface CodeCommentProps extends TypographyProps {
  noWrap?: boolean
}

function CodeComment({ noWrap = false, children, sx, ...rest }: CodeCommentProps) {
  return (
    <Typography 
      sx={{ 
        whiteSpace:   noWrap ? 'pre' : 'pre-wrap', 
        overflowWrap: 'anywhere', 
        fontFamily:   '"Roboto Mono", monospace',
        ...sx 
      }} 
      {...rest}
    >
      {children}
    </Typography>
  )
}
export default memo(CodeComment)
