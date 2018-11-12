import { Observable } from "rxjs"
import { map, startWith } from "rxjs/operators"
import { ownedBets$ } from "./streams/ownedBets$"
import { withFunction } from "./utils/withFunction"
import { BetWithStatus } from "../types/BetWithStatus"
import { Document } from "../types/Document"

export type Props = {
  betsLoaded: boolean
  bets: Array<BetWithStatus & Document>
}

const props$: Observable<Props> = ownedBets$.pipe(
  map(bets => ({
    betsLoaded: true,
    bets,
  })),
  startWith({
    betsLoaded: false,
    bets: [],
  }),
)

export const withOwnedBets = withFunction(props$)
