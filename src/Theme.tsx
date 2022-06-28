import { darkScrollbar } from '@mui/material'
import { createTheme, ThemeOptions, ThemeProvider, useMediaQuery } from '@mui/material'
import React, { useEffect } from 'react'
import { useMemo } from 'react'
import { ReactNode } from 'react'
import { useSettings } from './hooks'

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
  }
}

const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#20ba4e'
    },
    secondary: {
      main: '#f72585'
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: darkScrollbar()
      }
    }
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
