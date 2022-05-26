import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { GenerateCodePage, NativesPage } from './pages'

export default function Router() {
  return (
    <Switch>
      <Route path="/natives/:native">
        <NativesPage />
      </Route>
      <Route path="/natives" exact>
        <NativesPage />
      </Route>
      <Route path="/generate-code/:language" exact>
        <GenerateCodePage />
      </Route>
      <Route path="/generate-code" exact>
        <Redirect to="/generate-code/lua" />
      </Route>
      <Route path="/generate-header">
        <Redirect to="/generate-code" />
      </Route>
      <Route path="*">
        <Redirect to="/natives" />
      </Route>
    </Switch>
  )
}
