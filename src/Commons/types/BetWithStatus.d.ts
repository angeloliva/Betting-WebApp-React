import { Bet } from "./Bet"
import { BetStatus } from "./BetStatus"

export type BetWithStatus = Bet & {
  status: BetStatus
  wager: number | void
}
