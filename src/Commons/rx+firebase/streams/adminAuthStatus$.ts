import { Observable, of } from "rxjs"
import { map, switchMap } from "rxjs/operators"
import { currentUser$ } from "../../../utils/currentUser$"
import { isAdmin$ } from "./isAdmin$"
import { AuthStatus } from "../../types/AuthStatus"

// The Authentication status for the current User
export const adminAuthStatus$: Observable<AuthStatus> = currentUser$.pipe(
  switchMap(
    currentUser =>
      currentUser
        ? // ask the "isAdmin$" stream for token status
          isAdmin$.pipe(
            map(isAdmin => (isAdmin ? "authorized" : "unauthorized")),
          )
        : // default to signed-out
          of("signedOut" as AuthStatus),
  ),
)
