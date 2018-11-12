import { Observable } from "rxjs"
import { GameTimeOrPre } from "../../types/GameTimeOrPre"
import { currentGameLastEvent$ } from "./currentGameLastEvent$"
import { distinctUntilChanged, map } from "rxjs/operators"

export const currentGameTimeOrPregame$: Observable<
  GameTimeOrPre
> = currentGameLastEvent$.pipe(
  map(
    event =>
      event
        ? { period: event.period, time: event.time }
        : ("pre" as GameTimeOrPre),
  ),
  distinctUntilChanged(),
)
