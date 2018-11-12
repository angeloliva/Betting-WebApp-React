import { map } from "rxjs/operators"
import { Observable } from "rxjs"
import { isAdminSignedIn$ } from "./streams/isAdminSignedIn$"
import { withFunction } from "./utils/withFunction"

interface Props {
  isSignedIn: boolean
}

const props$: Observable<Props> = isAdminSignedIn$.pipe(
  map(isSignedIn => ({ isSignedIn })),
)

export const withIsAdminSignedIn = withFunction(props$)
