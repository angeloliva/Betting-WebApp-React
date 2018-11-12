import { GameClock } from "./GameClock"

export interface DriveStart {
  driveChartPlayName: string
  gameClock: GameClock
  period: number
  yardLine: string
  yardsFromGoal: number
}
