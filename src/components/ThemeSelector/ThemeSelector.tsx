import { Brightness4 as DarkIcon, Brightness6 as SystemIcon, BrightnessHigh as LightIcon } from '@mui/icons-material'
import { Autocomplete, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { Fragment, useCallback, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useSettings, useThemes } from '../../hooks'
import { setSettings } from '../../store'
import SettingsControl from '../SettingsControl'


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

      <SettingsControl
        label="Light Theme"
        icon={LightIcon}
      >
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
      </SettingsControl>
      <SettingsControl 
        label="Dark Theme"
        icon={DarkIcon}
      >
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
      </SettingsControl>
    </Fragment>
  )
}
