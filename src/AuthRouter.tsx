import * as React from "react"
import LoginScreen from "./Login/LoginScreen"
import UnauthorizedScreen from "./Login/UnauthorizedScreen"
import Dashboard from "./Dashboard/DashboardLoader"
import {
  withAdminAuthStatus,
  Props,
} from "./Commons/rx+firebase/withAdminAuthStatus"

export const AuthRouter = ({ authStatus }: Props) =>
  authStatus === "signedOut" ? (
    <LoginScreen />
  ) : authStatus === "authorized" ? (
    <Dashboard />
  ) : (
    <UnauthorizedScreen />
  )

export default withAdminAuthStatus(AuthRouter)
