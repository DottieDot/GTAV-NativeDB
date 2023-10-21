import { Box, BoxProps, Typography, styled, alpha, IconButton, Tooltip  } from '@mui/material'
import { memo } from 'react'
import { createShareUrl, getOverlayAlpha } from '../../common'
import { LinkSharp as ShareIcon } from '@mui/icons-material'
import { useNamespace } from '../../hooks'
import { useCopyToClipboard } from '../../hooks'
import { useCallback } from 'react'
import { useSelectedGameContext } from '../../context'

export interface NativeHeaderProps extends Omit<BoxProps, 'children'> {
  namespace: string
  nativeCount: number
}

const StyledBox = styled(Box)(({ theme }) => ({
  display:         'flex',
  alignItems:      'center',
  gap:             theme.spacing(1),
  padding:         theme.spacing(2),
  backdropFilter:  'blur(20px)',
  backgroundColor: alpha(theme.palette.background.default, 0.6),
  ...(theme.palette.mode === 'dark' && {
    backgroundImage: `linear-gradient(${alpha(
      '#fff',
      getOverlayAlpha(4),
    )}, ${alpha('#fff', getOverlayAlpha(4))})`
  })
}))

function NamespaceHeader({ namespace, nativeCount, ...rest }: NativeHeaderProps) {
  const firstNative = useNamespace(namespace).natives[0]
  const copyToClipboard = useCopyToClipboard()
  const game = useSelectedGameContext()

  const onShare = useCallback(() => {
    copyToClipboard(createShareUrl(`/natives/${firstNative}`, game))
  }, [ copyToClipboard, firstNative, game ])
  
  return (
    <StyledBox {...rest}>
      <Tooltip title="Copy Link">
        <IconButton
          aria-label="copy link"
          onClick={onShare}
          size="small"
          sx={{ color: 'inherit' }}
        >
          <ShareIcon />
        </IconButton>
      </Tooltip>

      <Typography component="span" variant="h4">
        {namespace}
      </Typography>

      <Box sx={{ flexGrow: 1 }} />

      <Typography component="span" textAlign="right" variant="h6">
        {nativeCount} 
        {' '}
        {nativeCount === 1 ? 'Native' : 'Natives'}
      </Typography>
    </StyledBox>
  )
}
export default memo(NamespaceHeader)
