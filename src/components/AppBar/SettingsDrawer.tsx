import { Brightness4 as DarkIcon, Brightness6 as SystemIcon, BrightnessHigh as LightIcon, CloseOutlined as CloseIcon } from '@mui/icons-material'
import { Box, Checkbox, Divider, Drawer, FormControlLabel, IconButton, Link, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { Fragment, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { getGame } from '../../constants'
import { useIsSmallDisplay, useSettings } from '../../hooks'
import { setSettings } from '../../store'
import LocalFileUpload from '../LocalFileUpload/LocalFileUpload'

interface SettingsDrawerProps {
  open: boolean
  onClose: () => void
}

export default function SettingsDrawer({ open, onClose }: SettingsDrawerProps) {
  const smallDisplay = useIsSmallDisplay()
  const settings = useSettings()
  const dispatch = useDispatch()

  const handleThemeChanged = useCallback((_: unknown, value: any) => {
    if (value !== null) {
      dispatch(setSettings({
        theme: value
      }))
    }
  }, [dispatch])

  const handleSourcesChanged = useCallback((_: unknown, value: any) => {
    dispatch(setSettings({
      sources: value
    }))
  }, [dispatch])

  const handleListDisplayModeChanged = useCallback((e: unknown, value: unknown) => {
    if (value === 'C' || value === 'UML') {
      dispatch(setSettings({
        nativeDisplayMode: value
      }))
    }
  }, [dispatch])

  const handleDisplayVoidReturnTypeChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSettings({
      displayVoidReturnType: e.target.checked
    }))
  }, [dispatch])

  return (
    <Drawer
      anchor={smallDisplay ? 'bottom' : 'right' }
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
            <ToggleButtonGroup
              color="primary"
              value={settings.theme}
              onChange={handleThemeChanged}
              exclusive
              fullWidth
            >
              <ToggleButton value="light">
                <LightIcon sx={{ mr: 1 }} /> 
                Light
              </ToggleButton>
              <ToggleButton value="system">
                <SystemIcon sx={{ mr: 1 }} /> 
                System
              </ToggleButton>
              <ToggleButton value="dark">
                <DarkIcon sx={{ mr: 1 }} />
                Dark
              </ToggleButton>
            </ToggleButtonGroup>
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
              {getGame() === 'GTA5' && (
                <ToggleButton value="dottiedot">
                  DottieDot
                </ToggleButton>
              )}
              {getGame() === 'GTA5' && (
                <ToggleButton value="fivem">
                  FiveM
                </ToggleButton>
              )}
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
            </ToggleButtonGroup>

            {settings.nativeDisplayMode === 'UML' && (
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
        </Stack>
      </Box>
    </Drawer>
  )
}
