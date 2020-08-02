import React from 'react'
import { CssBaseline, makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider as StoreProvider, useDispatch } from 'react-redux'
import store from './store'
import * as Screens from './screens'
import { useEffect } from 'react'
import { loadNatives } from './store/actions/natives'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    height: '100vh',
  }
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
      <CssBaseline />
      <Switch>
        <Route path="/">
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
