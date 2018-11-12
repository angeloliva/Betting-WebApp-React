import { Timestamp } from "./Timestamp"

export interface TakenBet {
  wager: number
  takenDate: Timestamp
  isPointBet: boolean
  isStreakBet: boolean
}
