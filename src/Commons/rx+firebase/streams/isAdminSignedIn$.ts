import { adminAuthStatus$ } from "./adminAuthStatus$"
import { map } from "rxjs/operators"

// true when the User is signed in.
// This is not "just" the status from firebase: it includes the check of the
// admin claim !
export const isAdminSignedIn$ = adminAuthStatus$.pipe(
  map(authStatus => authStatus === "authorized"),
)
