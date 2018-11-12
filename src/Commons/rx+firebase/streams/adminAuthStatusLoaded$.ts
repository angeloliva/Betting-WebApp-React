import { adminAuthStatus$ } from "./adminAuthStatus$"
import { loadedStatus } from "../utils/loadedStatus"

// true when we know of the current authentication status, which implies:
// - loading the initial status from firebase.auth()
// - loading token info
// - checking admin claim on token
export const adminAuthStatusLoaded$ = adminAuthStatus$.pipe(loadedStatus())
