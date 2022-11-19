import { Box, Divider, Drawer, IconButton, Link, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { Brightness4 as DarkIcon, Brightness6 as SystemIcon, BrightnessHigh as LightIcon, CloseOutlined as CloseIcon } from '@mui/icons-material'
import { MouseEvent as ReactMouseEvent, useCallback, FocusEventHandler, useState, ChangeEventHandler, useEffect, Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { useIsSmallDisplay, useSettings } from '../../hooks'
import { setSources, setSpecialSource as setSpecialSourceAction, setTheme } from '../../store'

interface SettingsDrawerProps {
  open: boolean
  onClose: () => void
}

export default function SettingsDrawer({ open, onClose }: SettingsDrawerProps) {
  const smallDisplay = useIsSmallDisplay()
  const settings = useSettings()
  const dispatch = useDispatch()
  const [specialSource, setSpecialSource] = useState('')

  useEffect(() => {
    setSpecialSource(settings.specialDataSource)
  }, [settings])

  const handleThemeChanged = useCallback((e: ReactMouseEvent<HTMLElement, MouseEvent>, value: any) => {
    if (value !== null) {
      dispatch(setTheme(value))
    }
  }, [dispatch])

  const handleSourcesChanged = useCallback((e: ReactMouseEvent<HTMLElement, MouseEvent>, value: any) => {
    dispatch(setSources(value))
  }, [dispatch])

  const handleSpecialSourceBlur = useCallback<FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>>((e) => {
    dispatch(setSpecialSourceAction(e.target.value))
  }, [dispatch])

  const handleSpecialSourceChange = useCallback<ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>>((e) => {
    setSpecialSource(e.target.value)
  }, [])

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
              Special Source
            </Typography>
            <TextField
              variant="standard"
              placeholder="https://example.com"
              label="Source URL"
              FormHelperTextProps={{
                sx: {
                  "color": "red"
                }
              }}
              helperText={(
                <Fragment>
                  Make sure CORS is setup correctly and the json returned matches{' '}
                  <Link 
                    href="https://github.com/DottieDot/GTAV-NativeDB/blob/master/special-schema.json" 
                    target="_blank" 
                    underline="hover"
                  >
                    this schema
                  </Link>.
                </Fragment>
              )}
              onBlur={handleSpecialSourceBlur}
              value={specialSource}
              onChange={handleSpecialSourceChange}
              fullWidth
            />
          </div>
        </Stack>
      </Box>
    </Drawer>
  )
}
