import * as React from "react"
import ScreenSpinner from "./components/ScreenSpinner"
import { withAdminAuthStatusLoaded } from "./Commons/rx+firebase/withAdminAuthStatusLoaded"

export interface Props {
  authStatusLoaded: boolean
  children: JSX.Element
}

export const AppLoader = ({ authStatusLoaded, children }: Props): JSX.Element =>
  authStatusLoaded ? children : <ScreenSpinner />

export default withAdminAuthStatusLoaded(AppLoader)
