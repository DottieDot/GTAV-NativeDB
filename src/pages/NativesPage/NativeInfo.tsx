import { Box, IconButton, Paper, Stack, Tooltip, Typography } from '@material-ui/core'
import { LinkSharp as ShareIcon } from '@material-ui/icons'
import React, { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { NativeComment, NativeDefinition, NativeDetails } from '../../components'
import { useCopyToClipboard, useNative } from '../../hooks'
import NativeNotFound from './NativeNotFound'

export default function NativeInfo() {
  const { native: nativeHash } = useParams<{ native: string }>()
  const native = useNative(nativeHash)
  const copyToClipboard = useCopyToClipboard()

  const onShare = useCallback(() => {
    copyToClipboard(`${window.location.host}/natives/${nativeHash}`)
  }, [copyToClipboard, nativeHash])

  if  (!native) {
    return (
      <Box sx={{ p: 2 }}>
        <NativeNotFound nativeHash={nativeHash} />
      </Box>
    )
  }

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pb: 1 }}>
        <Tooltip title="Copy Link">
          <IconButton onClick={onShare} size="small" aria-label="copy link">
            <ShareIcon />
          </IconButton>
        </Tooltip>
        <Typography 
          sx={{ 
            textOverflow: 'ellipsis', 
            overflow: 'hidden' 
          }}
          variant="h5" 
          component="h1" 
        >
          {native.name}
        </Typography>
      </Box>
      <Stack spacing={2}>
        <Paper sx={{ p: 2 }}>
          <NativeDetails
            hash={native.hash}
            jhash={native.jhash}
            build={native.build}
            variant="body2"
          />
          <NativeDefinition
            name={native.name}
            params={native.params}
            returnType={native.returnType}
            variant="body2"
          />
        </Paper>
        <Paper sx={{ p: 2 }}>
          <NativeComment variant="body2">
            {native.comment}
          </NativeComment>
        </Paper>
      </Stack>
    </Box>
  )
}
