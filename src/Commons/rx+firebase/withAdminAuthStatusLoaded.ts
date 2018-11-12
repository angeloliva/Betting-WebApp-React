import { map } from "rxjs/operators"
import { adminAuthStatusLoaded$ } from "./streams/adminAuthStatusLoaded$"
import { withFunction } from "./utils/withFunction"

export interface Props {
  authStatusLoaded: boolean
}

const props$ = adminAuthStatusLoaded$.pipe(
  map(authStatusLoaded => ({ authStatusLoaded })),
)

export const withAdminAuthStatusLoaded = withFunction(props$)
