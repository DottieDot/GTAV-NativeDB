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

  const themeIds = useMemo(() => [ 'Default', ...Object.keys(themes) ], [ themes ])

  const handleThemeChanged = useCallback((_: unknown, value: unknown) => {
    if (value !== null && value === 'light' || value === 'dark' || value === 'system') {
      patchSettings({ theme: value })
    }
  }, [ patchSettings ])

  const handleLightThemeChanged = useCallback((_: unknown, value: string) => {
    patchSettings({ lightTheme: value })
  }, [ patchSettings ])

  const handleDarkThemeChanged = useCallback((_: unknown, value: string) => {
    patchSettings({ darkTheme: value })
  }, [ patchSettings ])

  useEffect(() => {
    if (!themes[settings.lightTheme] && settings.lightTheme !== 'Default') {
      patchSettings({ lightTheme: 'Default' })
    }
    if (!themes[settings.darkTheme] && settings.darkTheme !== 'Default') {
      patchSettings({ darkTheme: 'Default' })
    }
  }, [ settings, themes, patchSettings ])

  return (
    <Fragment>
      <ToggleButtonGroup
        color="primary"
        onChange={handleThemeChanged}
        value={settings.theme}
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
        icon={LightIcon}
        label="Light Theme"
      >
        <Autocomplete 
          getOptionLabel={(id) => themes[id]?.name ?? id}
          onChange={handleLightThemeChanged}
          options={themeIds}
          renderInput={(params) => <TextField {...params} />}
          size="small"
          sx={{ width: 200 }}
          value={settings.lightTheme}
          disableClearable
          disablePortal
        />
      </SettingsControl>

      <SettingsControl 
        icon={DarkIcon}
        label="Dark Theme"
      >
        <Autocomplete
          getOptionLabel={(id) => themes[id]?.name ?? id}
          onChange={handleDarkThemeChanged}
          options={themeIds}
          renderInput={(params) => <TextField {...params} />}
          size="small"
          sx={{ width: 200 }}
          value={settings.darkTheme}
          disableClearable
          disablePortal
        />
      </SettingsControl>
    </Fragment>
  )
}
