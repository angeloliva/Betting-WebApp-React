import { distinctUntilChanged, map } from "rxjs/operators"
import { Observable } from "rxjs"
import { currentGameEvents$ } from "./currentGameEvents$"

export const isLive$: Observable<boolean> = currentGameEvents$.pipe(
  map(bets => bets.length > 0),
  distinctUntilChanged(),
)
