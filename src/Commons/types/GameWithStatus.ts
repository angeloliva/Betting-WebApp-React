import { Game } from "./Game"
import { Document } from "./Document"

export type GameStatusDocument = GameStatus & Document

export interface GameStatus {
  // true if the Current User has subscribed to the Game, false otherwise
  isEntered: boolean
  // streak info
  currentStreak: number
  longestStreak: number
}
export type GameWithStatus = Game & GameStatus
