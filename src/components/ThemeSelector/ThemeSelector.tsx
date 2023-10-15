import { Brightness4 as DarkIcon, Brightness6 as SystemIcon, BrightnessHigh as LightIcon } from '@mui/icons-material'
import { Autocomplete, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { Fragment, useCallback, useEffect, useMemo } from 'react'
import { useSettings, useThemes } from '../../hooks'
import SettingsControl from '../SettingsControl'
import { useSettingsContext } from '../../context'


export default function ThemeSelector() {
  const settings = useSettings()
  const { patchSettings } = useSettingsContext()
  const themes = useThemes()

  const themeIds = useMemo(() => ['Default', ...Object.keys(themes)], [themes])

  const handleThemeChanged = useCallback((_: unknown, value: any) => {
    if (value !== null) {
      patchSettings({
        theme: value
      })
    }
  }, [patchSettings])

  const handleLightThemeChanged = useCallback((_: unknown, value: string) => {
    patchSettings({
      lightTheme: value
    })
  }, [patchSettings])

  const handleDarkThemeChanged = useCallback((_: unknown, value: string) => {
    patchSettings({
      darkTheme: value
    })
  }, [patchSettings])

  useEffect(() => {
    if (!themes[settings.lightTheme] && settings.lightTheme !== 'Default') {
      patchSettings({
        lightTheme: 'Default'
      })
    }
    if (!themes[settings.darkTheme] && settings.darkTheme !== 'Default') {
      patchSettings({
        darkTheme: 'Default'
      })
    }
  }, [settings, themes, patchSettings])

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
