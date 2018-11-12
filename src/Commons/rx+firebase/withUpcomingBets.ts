import { upcomingBets$ } from "./streams/upcomingBets$"
import { map, startWith } from "rxjs/operators"
import { withFunction } from "./utils/withFunction"
import { BetWithStatus } from "../types/BetWithStatus"
import { Document } from "../types/Document"

export interface Props {
  betsLoaded: boolean
  bets: Array<BetWithStatus & Document>
}

const props$ = upcomingBets$.pipe(
  map(bets => ({
    betsLoaded: true,
    bets,
  })),
  startWith({
    betsLoaded: false,
    bets: [],
  }),
)

export const withUpcomingBets = withFunction(props$)
