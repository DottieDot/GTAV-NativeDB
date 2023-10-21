import { Box, Button, Dialog, IconButton, List, ListItem, ListItemText, Paper, Stack, Tooltip, Typography, useTheme } from '@mui/material'
import { LinkSharp as ShareIcon, OpenInNewSharp as OpenInNewSharpIcon } from '@mui/icons-material'
import _ from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { createShareUrl, toPascalCase } from '../../common'
import { CodeExamples, NativeComment, NativeDefinition, NativeDetails, NativeUsage } from '../../components'
import { useCopyToClipboard, useIsSmallDisplay, useLastNotNull, useNative, useSettings } from '../../hooks'
import { Game, NativeSources, SelectedGameProvider, useSelectedGameContext } from '../../context'
import NativeNotFound from './NativeNotFound'
import NoNativeSelected from './NoNativeSelected'
import Giscus from '@giscus/react'

interface NativeInfoProps {
  native?: string 
}

export default function NativeInfo({ native: nativeHashParam }: NativeInfoProps) {
  const nativeHashNotNull = useLastNotNull(nativeHashParam)
  const [ usageNotFound, setUsageNotFound ] = useState(false)
  const settings = useSettings()
  const isSmall = useIsSmallDisplay()
  const nativeHash = isSmall ? nativeHashNotNull : nativeHashParam
  const native = useNative(nativeHash ?? '')
  const copyToClipboard = useCopyToClipboard()
  const theme = useTheme()
  const game = useSelectedGameContext()
  const [ showGta5Definition, setShowGta5Definition ] = useState<string | false>(false)

  const onShare = useCallback(() => {
    copyToClipboard(createShareUrl(`/natives/${nativeHash}`, game))
  }, [ copyToClipboard, nativeHash, game ])

  const onUsageNotFound = useCallback(() => {
    setUsageNotFound(true)
  }, [ setUsageNotFound ])

  useEffect(() => {
    setUsageNotFound(false)
  }, [ nativeHash ])

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
      <Box
        sx={{
          display:    'flex',
          alignItems: 'center',
          gap:        1,
          pb:         1 
        }}
      >
        <Tooltip title="Copy Link">
          <IconButton
            aria-label="copy link"
            color="inherit"
            onClick={onShare}
            size="small"
          >
            <ShareIcon />
          </IconButton>
        </Tooltip>

        <Typography 
          component="h1"
          sx={{ 
            textOverflow: 'ellipsis', 
            overflow:     'hidden' 
          }} 
          variant="h5" 
        >
          {settings.nativeDisplayMode === 'TS' ? toPascalCase(native.name) : native.name}
        </Typography>
      </Box>

      <Stack spacing={2}>
        <Paper sx={{ p: 2 }}>
          <NativeDetails
            build={native.build}
            hash={native.hash}
            jhash={native.jhash}
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
              Old name
              {native.oldNames?.length !== 1 ? 's' : ''}
            </Typography>

            <Paper>
              <List>
                {native.oldNames.map(oldName => (
                  <ListItem 
                    key={oldName}
                    sx={{
                      textOverflow: 'ellipsis',
                      overflow:     'hidden'
                    }} 
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
                nativeHash={nativeHash}
                onNotFound={onUsageNotFound} 
              />
            </Paper>
          </div>
        )}

        {game === Game.RedDeadRedemption2 && native.gtaHash && (
          <Button 
            color="inherit"
            onClick={() => setShowGta5Definition(native.gtaHash!)}
            startIcon={<OpenInNewSharpIcon />}
            variant="text"
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
              category="Native Comments"
              categoryId="DIC_kwDOEPVfds4CUoSH"
              emitMetadata="0"
              id="comments"
              inputPosition="top"
              lang="en"
              loading="lazy"
              mapping="specific"
              reactionsEnabled="1"
              repo="DottieDot/GTAV-NativeDB"
              repoId="MDEwOlJlcG9zaXRvcnkyODQ1MTYyMTQ="
              term={native.hash}
              theme={theme.palette.mode}
            />
          </Paper>
        </div>
      </Stack>

      <Dialog
        maxWidth="xl"
        onClose={() => setShowGta5Definition(false)}
        open={!!showGta5Definition}
        fullWidth
      >
        <SelectedGameProvider game={Game.GrandTheftAuto5}>
          <NativeInfo native={nativeHashParam} />
        </SelectedGameProvider>
      </Dialog>
    </Box>
  )
}
