import { Box, BoxProps, Typography, styled, alpha, IconButton, Tooltip  } from '@material-ui/core'
import React, { memo } from 'react'
import { getOverlayAlpha } from '../../common'
import { LinkSharp as ShareIcon } from '@material-ui/icons'
import { useNamespace } from '../../hooks'
import { useCopyToClipboard } from '../../hooks'
import { useCallback } from 'react'

export interface NativeHeaderProps extends Omit<BoxProps, 'children'> {
  namespace: string
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

function NativeHeader({ namespace: namespaceName, ...rest }: NativeHeaderProps) {
  const namespace = useNamespace(namespaceName)
  const copyToClipboard = useCopyToClipboard()

  const onShare = useCallback(() => {
    copyToClipboard(`${window.location.host}/natives/${namespace.natives[0]}`)
  }, [copyToClipboard, namespace])
  
  return (
    <StyledBox {...rest}>
      <Tooltip title="Copy Link">
        <IconButton onClick={onShare} size="small" aria-label="copy link">
          <ShareIcon />
        </IconButton>
      </Tooltip>
      <Typography variant="h4" component="span">
        {namespace.name}
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <Typography variant="h6" component="span" textAlign="right">
        {namespace.natives.length} natives
      </Typography>
    </StyledBox>
  )
}
export default memo(NativeHeader)
