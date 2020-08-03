import React from 'react'
import { CssBaseline, makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider as StoreProvider, useDispatch } from 'react-redux'
import store from './store'
import * as Screens from './screens'
import { useEffect } from 'react'
import { loadNatives } from './store/actions/natives'
import { AppBar } from './components'

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
        <Route path="/natives" exact>
          <Screens.Natives />
        </Route>
        <Route path="/natives/:native">
          <Screens.Natives />
        </Route>
      </Switch>
    </div>
  )
}

export default () => (
  <StoreProvider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Content />
      </BrowserRouter>
    </ThemeProvider>
  </StoreProvider>
)
