import { CloseOutlined as CloseIcon } from '@mui/icons-material'
import { Box, Checkbox, Divider, Drawer, FormControlLabel, IconButton, Link, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { Fragment, useCallback } from 'react'
import { useIsSmallDisplay, useSettings } from '../../hooks'
import LocalFileUpload from '../LocalFileUpload/LocalFileUpload'
import ThemeManager from '../ThemeManager'
import ThemeSelector from '../ThemeSelector'
import { useSettingsContext } from '../../context'

interface SettingsDrawerProps {
  open: boolean
  onClose: () => void
}

export default function SettingsDrawer({ open, onClose }: SettingsDrawerProps) {
  const smallDisplay = useIsSmallDisplay()
  const settings = useSettings()
  const { patchSettings } = useSettingsContext()

  const handleSourcesChanged = useCallback((_: unknown, value: any) => {
    patchSettings({
      sources: value
    })
  }, [patchSettings])

  const handleListDisplayModeChanged = useCallback((_: unknown, value: unknown) => {
    if (value === 'C' || value === 'UML' || value === 'TS') {
      patchSettings({
        nativeDisplayMode: value
      })
    }
  }, [patchSettings])

  const handleDisplayVoidReturnTypeChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    patchSettings({
      displayVoidReturnType: e.target.checked
    })
  }, [patchSettings])

  const handleNativeTypesChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    patchSettings({
      nativeTypes: e.target.checked
    })
  }, [patchSettings])

  const handleCompactVectorsChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    patchSettings({
      compactVectors: e.target.checked
    })
  }, [patchSettings])

  return (
    <Drawer
      anchor={smallDisplay ? 'bottom' : 'right'}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: smallDisplay ? undefined : 500
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2
        }}
      >
        <Typography
          variant="h5"
        >
          Settings
        </Typography>
        <IconButton aria-label="close settings" onClick={onClose}>
          <CloseIcon fontSize="medium" />
        </IconButton>
      </Box>
      <Divider variant="fullWidth" />
      <Box sx={{ p: 2 }}>
        <Stack spacing={2}>
          <div>
            <Typography variant="body1" gutterBottom>
              Theme
            </Typography>
            <ThemeSelector />
          </div>
          <div>
            <Typography variant="body1" gutterBottom>
              Sources
            </Typography>
            <ToggleButtonGroup
              color="primary"
              value={settings.sources}
              onChange={handleSourcesChanged}
              fullWidth
            >
              <ToggleButton value="alloc8or" disabled>
                Alloc8or
              </ToggleButton>
              <ToggleButton value="dottiedot">
                DottieDot
              </ToggleButton>
              <ToggleButton value="fivem">
                FiveM
              </ToggleButton>
              <ToggleButton value="special">
                Special
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div>
            <Typography variant="body1" gutterBottom>
              Native Display Mode
            </Typography>
            <ToggleButtonGroup
              color="primary"
              value={settings.nativeDisplayMode}
              onChange={handleListDisplayModeChanged}
              exclusive
              fullWidth
            >
              <ToggleButton value="C">
                C Style
              </ToggleButton>
              <ToggleButton value="UML">
                UML Style
              </ToggleButton>
              <ToggleButton value="TS">
                TypeScript
              </ToggleButton>
            </ToggleButtonGroup>

            <FormControlLabel
              control={
                <Checkbox
                  checked={settings.compactVectors}
                  onChange={handleCompactVectorsChanged}
                />
              }
              sx={{ userSelect: 'none' }}
              label="Compact Vectors"
            />

            {(settings.nativeDisplayMode === 'UML' || settings.nativeDisplayMode === 'TS') && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={settings.displayVoidReturnType}
                    onChange={handleDisplayVoidReturnTypeChanged}
                  />
                }
                sx={{ userSelect: 'none' }}
                label="Display void return type"
              />
            )}

            {settings.nativeDisplayMode === 'TS' && (
              <Fragment>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={settings.nativeTypes}
                      onChange={handleNativeTypesChanged}
                    />
                  }
                  sx={{ userSelect: 'none' }}
                  label="Use Native Types"
                />
              </Fragment>
            )}
          </div>
          <div>
            <Typography variant="body1" gutterBottom>
              Special Data
            </Typography>
            <LocalFileUpload
              storeAs="special.json"
              label="special.json"
              helpText={(
                <Fragment>
                  Make sure the json matches{' '}
                  <Link
                    href="https://github.com/DottieDot/GTAV-NativeDB/blob/master/special-schema.json"
                    target="_blank"
                    underline="hover"
                  >
                    this schema
                  </Link>.
                </Fragment>
              )}
            />
          </div>
          <div>
            <Typography variant="body1" gutterBottom>
              Custom Theme
            </Typography>
            <ThemeManager />
          </div>
        </Stack>
      </Box>
    </Drawer>
  )
}
