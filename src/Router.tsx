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
        <Redirect to="/natives/0x4EDE34FBADD967A6" />
      </Route>
      <Route path="/generate-code/:language" exact>
        <GenerateCodePage />
      </Route>
      <Route path="/generate-code" exact>
        <Redirect to="/generate-code/cpp" />
      </Route>
      <Route path="/generate-header">
        <Redirect to="/generate-code" />
      </Route>
      <Route path="/" exact>
        <Redirect to="/natives" />
      </Route>
    </Switch>
  )
}
