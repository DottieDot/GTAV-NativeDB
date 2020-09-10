import React from 'react'
import { CssBaseline, makeStyles, createMuiTheme, ThemeProvider, fade } from '@material-ui/core'
import { BrowserRouter, Route, Switch, Redirect, useParams } from 'react-router-dom'
import { Provider as StoreProvider, useDispatch } from 'react-redux'
import store from './store'
import * as Screens from './screens'
import { useEffect } from 'react'
import { loadNatives } from './store/actions/natives'
import { AppBarProvider } from './components'
import { useMediaPredicate } from 'react-media-hook'
import { setSelectedNative } from './store/actions/app'

const useStyles = makeStyles({
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
})

const useScrollbarStyles = makeStyles(theme => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '12px',
      background: theme.palette.scrollBar.main,
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: fade(theme.palette.getContrastText(theme.palette.scrollBar.main), .25),
      outline: '1px solid slategrey'
    },
    '*::-webkit-scrollbar-thumb:hover': {
      backgroundColor: fade(theme.palette.getContrastText(theme.palette.scrollBar.main), .35),
      outline: '1px solid slategrey'
    },
    '*::-webkit-scrollbar-thumb:active': {
      backgroundColor: fade(theme.palette.getContrastText(theme.palette.scrollBar.main), .45),
      outline: '1px solid slategrey'
    }
  }
}))

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#eee'
    },
    primary: {
      main: '#0e752e'
    },
    secondary: {
      main: '#ff3d00'
    },
    scrollBar: {
      main: '#b2b2b2'
    },
  }
})

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#20ba4e'
    },
    secondary: {
      main: '#ff8c00'
    },
    scrollBar: {
      main: '#242424'
    },
  },
})

const HandleNativeLink = () => {
  const dispatch = useDispatch()
  const { native } = useParams()

  dispatch(setSelectedNative(native))

  return (
    <Redirect to={{ pathname: '/natives' }} />
  )
}

const Content = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  useScrollbarStyles()

  useEffect(() => {
    dispatch(loadNatives())
  }, [dispatch])

  return (
    <div className={classes.container}>
      <AppBarProvider>
        <CssBaseline />
        <Switch>
          <Route exact path="/natives">
            <Screens.Natives />
          </Route>
          <Route exact path="/natives/:native">
            <HandleNativeLink />
          </Route>
          <Route path="/generate-header">
            <Screens.GenerateCode />
          </Route>
          <Route path="*">
            <Redirect to={{ pathname: "/natives" }} />
          </Route>
        </Switch>
      </AppBarProvider>
    </div>
  )
}

export default () => {
  const dark = useMediaPredicate('(prefers-color-scheme: dark)')

  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={dark ? darkTheme : theme}>
        <BrowserRouter>
          <Content />
        </BrowserRouter>
      </ThemeProvider>
    </StoreProvider>
  )
}
