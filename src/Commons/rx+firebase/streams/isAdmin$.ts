import { tokenInfo$ } from "./tokenInfo$"
import { map } from "rxjs/operators"
import { Observable } from "rxjs"

// admin or not admin ?
export const isAdmin$: Observable<boolean> = tokenInfo$.pipe(
  map(tokenInfo => Boolean(tokenInfo.claims.admin)),
)
