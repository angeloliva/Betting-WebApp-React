import { GameTime } from "../types/GameTime"

export interface SplittedGameTime extends GameTimeElements {
  timeSec: number
}

export interface GameTimeElements {
  period: number
  min: number
  sec: number
  timeSec: number
}

export const splitGameTime = (gameTime: GameTime): SplittedGameTime => {
  const [minStr, secStr] = gameTime.time.split(":", 2)
  const min = parseInt(minStr, 10) || 0
  const sec = parseInt(secStr, 10) || 0
  const timeSec = min * 60 + sec
  return {
    period: gameTime.period,
    min,
    sec,
    timeSec,
  }
}
