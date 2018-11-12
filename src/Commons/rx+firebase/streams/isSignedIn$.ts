import { currentUser$ } from "../../../utils/currentUser$"
import { distinctUntilChanged, map, startWith } from "rxjs/operators"
import { Observable } from "rxjs"

// true when the User is signed in.
// This is not "just" the status from firebase: it includes the check of the
// admin claim !
export const isSignedIn$: Observable<boolean> = currentUser$.pipe(
  map(Boolean),
  startWith(false),
  distinctUntilChanged(),
)
