import React from 'react'
import { CssBaseline, makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Provider as StoreProvider, useDispatch } from 'react-redux'
import store from './store'
import * as Screens from './screens'
import { useEffect } from 'react'
import { loadNatives } from './store/actions/natives'
import { AppBar } from './components'
import { useMediaPredicate } from 'react-media-hook'

const useStyles = makeStyles({
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
})

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#eee'
    }
  }
})

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
})

const Content = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadNatives())
  }, [ dispatch ])

  return (
    <div className={classes.container}>
      <div>
        <AppBar />
      </div>
      <CssBaseline />
      <Switch>
        <Route path="/natives/:native">
          <Screens.Natives />
        </Route>
        <Route path="*">
          <Redirect to={{ pathname: "/natives/0x4EDE34FBADD967A6" }} />
        </Route>
      </Switch>
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
