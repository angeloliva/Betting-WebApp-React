import { Bet } from "./Bet"
import { BetStatus } from "./BetStatus"

export type PublicBetWithStatus = Bet & {
  status: BetStatus
  wager: number | void
}
