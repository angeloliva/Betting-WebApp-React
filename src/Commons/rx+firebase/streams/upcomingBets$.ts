import { currentGameBetsWithStatus$ } from "./currentGameBetsWithStatus$"
import { map } from "rxjs/operators"

export const upcomingBets$ = currentGameBetsWithStatus$.pipe(
  map(bets =>
    bets.filter(
      bet => bet.status === "not_started" || bet.status === "can_join",
    ),
  ),
)
