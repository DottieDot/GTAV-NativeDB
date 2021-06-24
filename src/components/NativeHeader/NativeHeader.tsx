import { Box, BoxProps, Typography, styled, alpha  } from '@material-ui/core'
import React, { memo } from 'react'
import { getOverlayAlpha } from '../../common'

export interface NativeHeaderProps extends BoxProps { }

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backdropFilter: 'blur(20px)',
  backgroundColor: alpha(theme.palette.background.default, 0.6),
  ...(theme.palette.mode === 'dark' && {
    backgroundImage: `linear-gradient(${alpha(
      '#fff',
      getOverlayAlpha(4),
    )}, ${alpha('#fff', getOverlayAlpha(4))})`,
  }),
}))

function NativeHeader({ children, ...rest }: BoxProps) {
  return (
    <StyledBox {...rest}>
      <Typography variant="h4" component="span">
        {children}
      </Typography>
    </StyledBox>
  )
}
export default memo(NativeHeader)
