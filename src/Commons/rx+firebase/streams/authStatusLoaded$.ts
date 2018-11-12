import { currentUser$ } from "../../../utils/currentUser$"
import { Observable } from "rxjs"
import { loadedStatus } from "../utils/loadedStatus"

// true when we know of the current authentication status, which implies:
export const authStatusLoaded$: Observable<boolean> = currentUser$.pipe(
  loadedStatus(),
)
