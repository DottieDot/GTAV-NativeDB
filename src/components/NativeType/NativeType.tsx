import { Box, BoxProps } from '@mui/material'
import React from 'react'

interface NativeTypeProps extends BoxProps {}

export default function NativeType({ children, ...rest }: NativeTypeProps) {
  return (
    <Box sx={{ color: 'secondary.main' }} component="span" {...rest}>
      {children}
    </Box>
  )
}
