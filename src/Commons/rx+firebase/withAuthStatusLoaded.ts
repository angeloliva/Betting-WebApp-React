import { map } from "rxjs/operators"
import { authStatusLoaded$ } from "./streams/authStatusLoaded$"
import { withFunction } from "./utils/withFunction"

export interface Props {
  authStatusLoaded: boolean
}

const props$ = authStatusLoaded$.pipe(
  map(authStatusLoaded => ({ authStatusLoaded })),
)

export const withAuthStatusLoaded = withFunction(props$)
