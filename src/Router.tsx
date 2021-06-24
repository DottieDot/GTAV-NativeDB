import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

export default function Router() {
  return (
    <Switch>
      <Route path="/natives">

      </Route>
      <Route path="/" exact>
        <Redirect to="/natives" />
      </Route>
    </Switch>
  )
}
