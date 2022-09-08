import { Box, BoxProps, Typography, styled, alpha, IconButton, Tooltip  } from '@mui/material'
import React, { memo } from 'react'
import { createShareUrl, getOverlayAlpha } from '../../common'
import { LinkSharp as ShareIcon } from '@mui/icons-material'
import { useNamespace } from '../../hooks'
import { useCopyToClipboard } from '../../hooks'
import { useCallback } from 'react'

export interface NativeHeaderProps extends Omit<BoxProps, 'children'> {
  namespace: string
  nativeCount: number
}

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  backdropFilter: 'blur(20px)',
  backgroundColor: alpha(theme.palette.background.default, 0.6),
  ...(theme.palette.mode === 'dark' && {
    backgroundImage: `linear-gradient(${alpha(
      '#fff',
      getOverlayAlpha(4),
    )}, ${alpha('#fff', getOverlayAlpha(4))})`,
  })
}))

function NamespaceHeader({ namespace, nativeCount, ...rest }: NativeHeaderProps) {
  const firstNative = useNamespace(namespace).natives[0]
  const copyToClipboard = useCopyToClipboard()

  const onShare = useCallback(() => {
    copyToClipboard(createShareUrl(`/natives/${firstNative}`))
  }, [copyToClipboard, firstNative])
  
  return (
    <StyledBox {...rest}>
      <Tooltip title="Copy Link">
        <IconButton onClick={onShare} size="small" aria-label="copy link">
          <ShareIcon />
        </IconButton>
      </Tooltip>
      <Typography variant="h4" component="span">
        {namespace}
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <Typography variant="h6" component="span" textAlign="right">
        {nativeCount} {nativeCount === 1 ? 'Native' : 'Natives'}
      </Typography>
    </StyledBox>
  )
}
export default memo(NamespaceHeader)
