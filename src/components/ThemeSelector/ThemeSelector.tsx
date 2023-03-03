import { Brightness4 as DarkIcon, Brightness6 as SystemIcon, BrightnessHigh as LightIcon } from '@mui/icons-material'
import { Autocomplete, Paper, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { Fragment, useCallback, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useSettings, useThemes } from '../../hooks'
import { setSettings } from '../../store'


export default function ThemeSelector() {
  const settings = useSettings()
  const dispatch = useDispatch()
  const themes = useThemes()

  const themeIds = useMemo(() => ['Default', ...Object.keys(themes)], [themes])

  const handleThemeChanged = useCallback((_: unknown, value: any) => {
    if (value !== null) {
      dispatch(setSettings({
        theme: value
      }))
    }
  }, [dispatch])

  const handleLightThemeChanged = useCallback((_: unknown, value: string) => {
    dispatch(setSettings({
      lightTheme: value
    }))
  }, [dispatch])

  const handleDarkThemeChanged = useCallback((_: unknown, value: string) => {
    dispatch(setSettings({
      darkTheme: value
    }))
  }, [dispatch])

  useEffect(() => {
    if (!themes[settings.lightTheme] && settings.lightTheme !== 'Default') {
      dispatch(setSettings({
        lightTheme: 'Default'
      }))
    }
    if (!themes[settings.darkTheme] && settings.darkTheme !== 'Default') {
      dispatch(setSettings({
        darkTheme: 'Default'
      }))
    }
  }, [settings, themes, dispatch])

  return (
    <Fragment>
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

      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          background: 'none',
          mt: 1,
          p: 1,
          pl: 2
        }}
        variant="outlined"
      >
        <Typography sx={{ flex: 1, display: 'flex', alignItems: 'center' }} variant="body1">
          <LightIcon fontSize="small" sx={{ mr: 1 }} /> Light Theme
        </Typography>
        <Autocomplete 
          options={themeIds}
          value={settings.lightTheme}
          onChange={handleLightThemeChanged}
          renderInput={(params) => <TextField {...params} />}
          getOptionLabel={(id) => themes[id]?.name ?? id}
          size="small"
          sx={{ width: 200 }}
          disableClearable
          disablePortal
        />
      </Paper>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          background: 'none',
          mt: 1,
          p: 1,
          pl: 2
        }}
        variant="outlined"
      >
        <Typography sx={{ flex: 1, display: 'flex', alignItems: 'center' }} variant="body1">
          <DarkIcon fontSize="small" sx={{ mr: 1 }} /> Dark Theme
        </Typography>
        <Autocomplete
          options={themeIds}
          value={settings.darkTheme}
          onChange={handleDarkThemeChanged}
          renderInput={(params) => <TextField {...params} />}
          getOptionLabel={(id) => themes[id]?.name ?? id}
          size="small"
          sx={{ width: 200 }}
          disableClearable
          disablePortal
        />
      </Paper>
    </Fragment>
  )
}
