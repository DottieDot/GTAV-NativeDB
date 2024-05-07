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
  onClose: (_: false) => void
}

export default function SettingsDrawer({ open, onClose }: SettingsDrawerProps) {
  const smallDisplay = useIsSmallDisplay()
  const settings = useSettings()
  const { patchSettings } = useSettingsContext()

  const handleSourcesChanged = useCallback((_: unknown, value: unknown) => {
    if (value === undefined || Array.isArray(value)) {
      patchSettings({ sources: value })
    }
  }, [ patchSettings ])

  const handleNativeOrderingChanged = useCallback((_: unknown, value: unknown) => {
    if (value === 'registration' || value === 'alphabetical') {
      patchSettings({ nativeOrdering: value })
    }
  }, [ patchSettings ])

  const handleListDisplayModeChanged = useCallback((_: unknown, value: unknown) => {
    if (value === 'C' || value === 'UML' || value === 'TS') {
      patchSettings({ nativeDisplayMode: value })
    }
  }, [ patchSettings ])

  const handleDisplayVoidReturnTypeChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    patchSettings({ displayVoidReturnType: e.target.checked })
  }, [ patchSettings ])

  const handleNativeTypesChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    patchSettings({ nativeTypes: e.target.checked })
  }, [ patchSettings ])

  const handleCompactVectorsChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    patchSettings({ compactVectors: e.target.checked })
  }, [ patchSettings ])

  const handleClose = useCallback(() => {
    onClose(false)
  }, [ onClose ])

  return (
    <Drawer
      PaperProps={{ sx: { width: smallDisplay ? undefined : 500 }}}
      anchor={smallDisplay ? 'bottom' : 'left'}
      onClose={handleClose}
      open={open}
    >
      <Box
        sx={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          p:              2
        }}
      >
        <Typography
          variant="h5"
        >
          Settings
        </Typography>

        <IconButton aria-label="close settings" onClick={handleClose}>
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
              onChange={handleSourcesChanged}
              value={settings.sources}
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
              Native Ordering
            </Typography>

            <ToggleButtonGroup
              color="primary"
              onChange={handleNativeOrderingChanged}
              value={settings.nativeOrdering}
              exclusive
              fullWidth
            >
              <ToggleButton value="registration">
                Registration
              </ToggleButton>

              <ToggleButton value="alphabetical">
                Alphabetical
              </ToggleButton>
            </ToggleButtonGroup>
          </div>

          <div>
            <Typography variant="body1" gutterBottom>
              Native Display Mode
            </Typography>

            <ToggleButtonGroup
              color="primary"
              onChange={handleListDisplayModeChanged}
              value={settings.nativeDisplayMode}
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
              label="Compact Vectors"
              sx={{ userSelect: 'none' }}
            />

            {(settings.nativeDisplayMode === 'UML' || settings.nativeDisplayMode === 'TS') && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={settings.displayVoidReturnType}
                    onChange={handleDisplayVoidReturnTypeChanged}
                  />
                }
                label="Display void return type"
                sx={{ userSelect: 'none' }}
              />
            )}

            {settings.nativeDisplayMode === 'TS' && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={settings.nativeTypes}
                    onChange={handleNativeTypesChanged}
                  />
                }
                label="Use Native Types"
                sx={{ userSelect: 'none' }}
              />
            )}
          </div>

          <div>
            <Typography variant="body1" gutterBottom>
              Special Data
            </Typography>

            <LocalFileUpload
              helpText={(
                <Fragment>
                  Make sure the json matches
                  {' '}

                  <Link
                    href="https://github.com/DottieDot/GTAV-NativeDB/blob/master/special-schema.json"
                    target="_blank"
                    underline="hover"
                  >
                    this schema
                  </Link>
                  .
                </Fragment>
              )}
              label="special.json"
              storeAs="special.json"
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
