import { map } from "rxjs/operators"
import { Observable } from "rxjs"
import { isSignedIn$ } from "./streams/isSignedIn$"
import { withFunction } from "./utils/withFunction"

interface Props {
  isSignedIn: boolean
}

const props$: Observable<Props> = isSignedIn$.pipe(
  map(isSignedIn => ({ isSignedIn })),
)

export const withIsSignedIn = withFunction(props$)
