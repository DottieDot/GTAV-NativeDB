import React from 'react'
import { CssBaseline, makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import * as Screens from './screens'

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

export default () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Switch>
            <Route path="/">
              <Screens.Natives />
            </Route>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  )
}
