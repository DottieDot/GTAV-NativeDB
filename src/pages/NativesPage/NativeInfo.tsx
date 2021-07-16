import { Box, IconButton, List, Paper, Stack, Tooltip, Typography, ListItem, ListItemText } from '@material-ui/core'
import { LinkSharp as ShareIcon } from '@material-ui/icons'
import React, { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createShareUrl } from '../../common'
import { CodeExamples, NativeComment, NativeDefinition, NativeDetails, NativeUsage } from '../../components'
import { useCopyToClipboard, useNative, useSettings } from '../../hooks'
import NativeNotFound from './NativeNotFound'
import _ from 'lodash'
import { useEffect } from 'react'
import { NativeSources } from '../../store'

export default function NativeInfo() {
  const { native: nativeHash } = useParams<{ native: string }>()
  const [usageNotFound, setUsageNotFound] = useState(false)
  const settings = useSettings()
  const native = useNative(nativeHash)
  const copyToClipboard = useCopyToClipboard()

  const onShare = useCallback(() => {
    copyToClipboard(createShareUrl(`/natives/${nativeHash}`))
  }, [copyToClipboard, nativeHash])

  const onUsageNotFound = useCallback(() => {
    setUsageNotFound(true)
  }, [setUsageNotFound])

  useEffect(() => {
    setUsageNotFound(false)
  }, [nativeHash])

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
        {native.comment && (
          <div>
          <Typography variant="subtitle1" gutterBottom>
            Comment
          </Typography>
          <Paper sx={{ p: 2 }}>
            <NativeComment variant="body2">
              {native.comment}
            </NativeComment>
          </Paper>
        </div>
        )}
        {native.examples && !_.isEmpty(native.examples) && (
          <div>
            <Typography variant="subtitle1" gutterBottom>
              Examples
            </Typography>
            <Paper>
              <CodeExamples
                examples={native.examples}
              />
            </Paper>
          </div>
        )}
        {native.oldNames && (
          <div>
            <Typography variant="subtitle1" gutterBottom>
              Old name{native.oldNames?.length !== 1 ? 's' : ''}
            </Typography>
            <Paper>
              <List>
                {native.oldNames.map(oldName => (
                  <ListItem key={oldName} dense>
                    <ListItemText primary={oldName} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </div>
        )}
        {(!usageNotFound && _.includes(settings.sources, NativeSources.DottieDot)) && (
          <div>
            <Typography variant="subtitle1" gutterBottom>
              Script usage
            </Typography>
            <Paper>
              <NativeUsage 
                onNotFound={onUsageNotFound}
                nativeHash={nativeHash} 
              />
            </Paper>
          </div>
        )}
      </Stack>
    </Box>
  )
}
