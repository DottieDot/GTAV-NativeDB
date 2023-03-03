import { Box, Button, IconButton, List, ListItem, ListItemText, Paper, Stack, Tooltip, Typography, useTheme } from '@mui/material'
import { LinkSharp as ShareIcon, OpenInNewSharp as OpenInNewSharpIcon } from '@mui/icons-material'
import _ from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createShareUrl } from '../../common'
import { CodeExamples, NativeComment, NativeDefinition, NativeDetails, NativeUsage } from '../../components'
import { useCopyToClipboard, useIsSmallDisplay, useLastNotNull, useNative, useSettings } from '../../hooks'
import { NativeSources } from '../../store'
import NativeNotFound from './NativeNotFound'
import NoNativeSelected from './NoNativeSelected'
import { getGame } from '../../constants'
import Giscus from '@giscus/react'

export default function NativeInfo() {
  const { native: nativeHashParam } = useParams<{ native?: string }>()
  const nativeHashNotNull = useLastNotNull(nativeHashParam)
  const [usageNotFound, setUsageNotFound] = useState(false)
  const settings = useSettings()
  const isSmall = useIsSmallDisplay()
  const nativeHash = isSmall ? nativeHashNotNull : nativeHashParam
  const native = useNative(nativeHash ?? '')
  const copyToClipboard = useCopyToClipboard()
  const theme = useTheme()

  const onShare = useCallback(() => {
    copyToClipboard(createShareUrl(`/natives/${nativeHash}`))
  }, [copyToClipboard, nativeHash])

  const onUsageNotFound = useCallback(() => {
    setUsageNotFound(true)
  }, [setUsageNotFound])

  useEffect(() => {
    setUsageNotFound(false)
  }, [nativeHash])

  if (!nativeHash) {
    return (
      <Box sx={{ p: 2 }}>
        <NoNativeSelected />
      </Box>
    )
  }

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
          <IconButton onClick={onShare} size="small" aria-label="copy link" color="inherit">
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
        {native.schComment && (
          <div>
            <Typography variant="subtitle1" gutterBottom>
              Rockstar Description
            </Typography>
            <Paper sx={{ p: 2 }}>
              <NativeComment variant="body2">
                {native.schComment}
              </NativeComment>
            </Paper>
          </div>
        )}
        {native.comment && (
          <div>
            <Typography variant="subtitle1" gutterBottom>
              Description
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
                  <ListItem 
                    sx={{
                      textOverflow: 'ellipsis',
                      overflow: 'hidden'
                    }}
                    key={oldName} 
                    dense
                  >
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
        {getGame() === 'RDR3' && native.gtaHash && (
          <Button 
            variant="text"
            color="inherit"
            component="a"
            target="_blank"
            href={`https://gta5.nativedb.dotindustries.dev/natives/${native.gtaHash}`}
            startIcon={<OpenInNewSharpIcon />}
          >
            GTA5 Native Definition
          </Button>
        )}
        <div>
          <Typography variant="subtitle1" gutterBottom>
            Comments
          </Typography>
          <Paper sx={{ p: 2 }}>
            <Giscus
              id="comments"
              repo="DottieDot/GTAV-NativeDB"
              repoId="MDEwOlJlcG9zaXRvcnkyODQ1MTYyMTQ="
              category="Native Comments"
              categoryId="DIC_kwDOEPVfds4CUoSH"
              mapping="specific"
              term={native.hash}
              reactionsEnabled="1"
              emitMetadata="0"
              inputPosition="top"
              theme={theme.palette.mode}
              lang="en"
              loading="lazy"
            />
          </Paper>
        </div>
      </Stack>
    </Box>
  )
}
