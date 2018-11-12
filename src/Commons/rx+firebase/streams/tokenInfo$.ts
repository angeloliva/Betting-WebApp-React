import firebase from "../../../firebase"
import { currentUser$ } from "../../../utils/currentUser$"
import { publishReplay, refCount, switchMap } from "rxjs/operators"
import { from, NEVER, Observable } from "rxjs"

// The token info associated with the user
//
// Each time we log a (firebase.)User in, we call Firebase API to check the
// token details.
//
export const tokenInfo$: Observable<
  firebase.auth.IdTokenResult
> = currentUser$
  .pipe(
    switchMap(
      (currentUser: firebase.User | null) =>
        currentUser ? from(currentUser.getIdTokenResult()) : NEVER,
    ),
  )
  .pipe(
    publishReplay(),
    refCount(),
  )
