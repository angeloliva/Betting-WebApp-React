import { Observable } from "rxjs"
import { tokenInfo$ } from "./tokenInfo$"
import { map } from "rxjs/operators"

// the access token for the current user
export const token$: Observable<string> = tokenInfo$.pipe(
  map(tokenInfo => tokenInfo.token),
)
