import { map } from "rxjs/operators"
import { adminAuthStatus$ } from "./streams/adminAuthStatus$"
import { AuthStatus } from "../types/AuthStatus"
import { withFunction } from "./utils/withFunction"

export interface Props {
  authStatus: AuthStatus
}

const props$ = adminAuthStatus$.pipe(map(authStatus => ({ authStatus })))

export const withAdminAuthStatus = withFunction(props$)
