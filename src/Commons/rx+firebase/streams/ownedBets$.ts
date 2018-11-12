import { Observable } from "rxjs"
import { map } from "rxjs/operators"
import { currentGameBetsWithStatus$ } from "./currentGameBetsWithStatus$"
import { BetWithStatus } from "../../types/BetWithStatus"
import { Document } from "../../types/Document"
import { Timestamped } from "../../types/Timestamped"

export const ownedBets$: Observable<
  Array<BetWithStatus & Document & Timestamped>
> = currentGameBetsWithStatus$.pipe(
  map(bets =>
    bets.filter(
      bet =>
        bet.status === "joined" ||
        bet.status === "won" ||
        bet.status === "lost",
    ),
  ),
)
