import { darkScrollbar } from '@mui/material'
import { createTheme, ThemeOptions, ThemeProvider, useMediaQuery } from '@mui/material'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { ReactNode } from 'react'
import { useSettings } from './hooks'

declare module '@mui/material/styles' {
  interface Theme {
    extensions: {
      nativeValueHighlight: string
      constantIdentifierHighlight: string
      typeInfoBorderColor: string
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    extensions: {
      nativeValueHighlight: string
      constantIdentifierHighlight: string
      typeInfoBorderColor: string
    }
  }
}

const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    background: {
      default: '#eee'
    },
    primary: {
      main: '#0e752e'
    },
    secondary: {
      main: '#ff3d00'
    }
  },
  extensions: {
    nativeValueHighlight: '#bf360c',
    constantIdentifierHighlight: '#870000',
    typeInfoBorderColor: 'rgba(0,0,0,.25)'
  }
}

const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#20ba4e'
    },
    secondary: {
      main: '#ff8c00'
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: darkScrollbar()
      }
    }
  },
  extensions: {
    nativeValueHighlight: '#ffccbc',
    constantIdentifierHighlight: '#ff9e80',
    typeInfoBorderColor: 'rgba(255,255,255,.25)'
  }
}

function Theme({ children }: { children: ReactNode }) {
  const settings = useSettings()
  const systemIsDark = useMediaQuery('(prefers-color-scheme: dark)')
  const dark = settings.theme === 'dark' || (settings.theme === 'system' && systemIsDark)
  const theme = useMemo(
    () => createTheme(dark ? darkTheme : lightTheme),
    [dark]
  )

  useEffect(() => {
    document.querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', dark ? '#272727' :'#0e752e')
  }, [dark])

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

export default Theme
