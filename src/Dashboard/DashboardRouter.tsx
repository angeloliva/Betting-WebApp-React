import * as React from "react"
import { Switch, Route, Redirect } from "react-router-dom"

import routes, { RouteSpec } from "./Dashboard.routes"

const DashboardRouter = () => (
  <Switch>
    {routes.map(
      ({ rootRoute, path, component }: RouteSpec) =>
        rootRoute ? (
          <Route exact path={path} key={path} component={component} />
        ) : (
          <Route path={path} key={path} component={component} />
        ),
    )}
    <Redirect to="/upcoming" />
  </Switch>
)

export default DashboardRouter
