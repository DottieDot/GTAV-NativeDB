import { darkScrollbar } from '@mui/material'
import { createTheme, ThemeOptions, ThemeProvider, useMediaQuery } from '@mui/material'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { ReactNode } from 'react'
import { useSettings, useThemes } from './hooks'

declare module '@mui/material/styles' {
  interface Theme {
    extensions: {
      nativeValueHighlight: string
      constantIdentifierHighlight: string
      typeInfoBorderColor: string
      parameterColor: string
      symbolColor: string
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    extensions: {
      nativeValueHighlight: string
      constantIdentifierHighlight: string
      typeInfoBorderColor: string
      parameterColor: string
      symbolColor: string
    }
  }
}

function getLightTheme(): ThemeOptions {
  return {
    palette: {
      mode:       'light',
      background: { default: '#eee' },
      primary:    { main: '#0e752e' },
      secondary:  { main: '#ff3d00' }
    },
    extensions: {
      nativeValueHighlight:        '#bf360c',
      constantIdentifierHighlight: '#870000',
      typeInfoBorderColor:         '#565656',
      symbolColor:                 '#bf360c',
      parameterColor:              '#870000'
    }
  }
}

const lightTheme = getLightTheme()

function getDarkTheme(): ThemeOptions {
  return {
    palette: {
      mode:      'dark',
      primary:   { main: '#20ba4e' },
      secondary: { main: '#ff8c00' }
    },
    components: { MuiCssBaseline: { styleOverrides: { body: darkScrollbar() }}},
    extensions: {
      nativeValueHighlight:        '#ffccbc',
      constantIdentifierHighlight: '#ff9e80',
      typeInfoBorderColor:         '#565656',
      symbolColor:                 '#ffab91',
      parameterColor:              '#ffcc80'
    }
  }
}

const darkTheme = getDarkTheme()

function useSelectedColorScheme(dark: boolean): ThemeOptions {
  const themes = useThemes()
  const settings = useSettings()

  const key = dark ? settings.darkTheme : settings.lightTheme
  const theme = themes[key]
  if (key === 'Default' || !theme) {
    return dark ? darkTheme : lightTheme
  }

  const colors = theme.colors
  return {
    palette: {
      mode:       theme.mode,
      primary:    { main: colors.primary },
      secondary:  { main: colors.secondary },
      background: {
        default: colors.background,
        paper:   colors.paper
      },
      text: { primary: colors.text }
    },
    extensions: {
      nativeValueHighlight:        colors.nativeValueHighlight,
      constantIdentifierHighlight: colors.constantIdentifierHighlight,
      typeInfoBorderColor:         colors.typeInfoBorderColor,
      symbolColor:                 colors.symbolColor,
      parameterColor:              colors.parameterColor
    },
    components: { MuiCssBaseline: { styleOverrides: { body: theme.mode === 'dark' ? darkScrollbar() : undefined }}}
  }
}

function Theme({ children }: { children: ReactNode }) {
  const settings = useSettings()
  const systemIsDark = useMediaQuery('(prefers-color-scheme: dark)')
  const dark = settings.theme === 'dark' || (settings.theme === 'system' && systemIsDark)
  const scheme = useSelectedColorScheme(dark)

  const theme = useMemo(
    () => createTheme(scheme),
    [ scheme ]
  )

  useEffect(() => {
    document.querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', dark ? theme.palette.background.paper : theme.palette.primary.main)
  }, [ dark, theme ])

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

export default Theme
