import { Observable } from "rxjs"
import { currentGameLastEvent$ } from "./currentGameLastEvent$"
import { map } from "rxjs/operators"

export const currentGamePeriod$: Observable<
  number
> = currentGameLastEvent$.pipe(map(event => (event ? event.period : 0)))
