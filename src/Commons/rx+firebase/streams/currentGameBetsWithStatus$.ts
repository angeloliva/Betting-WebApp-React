import { combineLatest, Observable } from "rxjs"
import { map } from "rxjs/operators"
import { currentGameBets$ } from "./currentGameBets$"
import { currentGameTakenBets$ } from "./currentGameTakenBets"
import { Bet } from "../../types/Bet"
import { TakenBet } from "../../types/TakenBet"
import { BetWithStatus } from "../../types/BetWithStatus"
import { Document } from "../../types/Document"
import { RawTimestamped, Timestamped } from "../../types/Timestamped"
import { compareDesc } from "date-fns"

export const currentGameBetsWithStatus$: Observable<
  Array<BetWithStatus & Document & Timestamped>
> = combineLatest(currentGameBets$, currentGameTakenBets$).pipe(
  map(([currentGameBets, currentGameTakenBets]) =>
    currentGameBets.map(bet => mergeBetAndStatus(bet, currentGameTakenBets)),
  ),
  map(sortBets),
)

const mergeBetAndStatus = (
  bet: Bet & Document & RawTimestamped,
  takenBets: Array<TakenBet & Document>,
): BetWithStatus & Document & Timestamped => {
  // first we load the server Timestamp
  const timestampedBet: Bet & Document & Timestamped = {
    ...bet,
    serverTimestamp: bet.serverTimestamp.toDate(),
  }

  const takenBet: TakenBet | undefined = takenBets.find(
    takenBet => takenBet.id === bet.id,
  )
  const wager = takenBet ? takenBet.wager : undefined
  const hasJoined = takenBet !== undefined

  // is bet resolved ?
  if (bet.isResolved) {
    // status depends on the answer (or no anwer)
    if (!hasJoined) {
      // cannot answer anymore !
      return {
        ...timestampedBet,
        wager,
        status: "missed",
      }
    }
    const status = bet.isSuccess ? "won" : "lost"
    return {
      ...timestampedBet,
      wager,
      status,
    }
  }

  // aleready joined ?
  if (hasJoined) {
    return {
      ...timestampedBet,
      wager,
      status: "joined",
    }
  }

  // or triggered out by an event
  if (bet.isTriggeredOut) {
    return {
      ...timestampedBet,
      wager,
      status: "missed",
    }
  }

  // bet is joinable
  return {
    ...timestampedBet,
    wager,
    status: "can_join",
  }
}

function sortBets<B extends Bet & Timestamped>(bets: B[]): B[] {
  return bets.sort(compareBets)
}

const compareBets = (l: Bet & Timestamped, r: Bet & Timestamped): number => {
  const comp = compareDesc(l.serverTimestamp, r.serverTimestamp)
  if (comp !== 0) {
    return comp
  }
  return l.description.localeCompare(r.description)
}
