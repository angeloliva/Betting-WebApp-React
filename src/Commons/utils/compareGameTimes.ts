import { GameTime } from "../types/GameTime"

// Compare two GameTime(s)
export const compareGameTimes = (lhs: GameTime, rhs: GameTime): number => {
  const { period: lPeriod, time: lTime } = lhs
  const { period: rPeriod, time: rTime } = rhs
  if (lPeriod < rPeriod) {
    return -1
  }
  if (lPeriod > rPeriod) {
    return 1
  }
  const leftSec = extractGameTimeInSeconds(lTime)
  const rightSec = extractGameTimeInSeconds(rTime)
  if (leftSec > rightSec) {
    return -1
  }
  if (leftSec < rightSec) {
    return 1
  }
  return 0
}

const extractGameTimeInSeconds = (time: string): number => {
  const [min, sec] = time.split(":", 2)
  return parseInt(min, 10) * 60 + parseInt(sec, 10)
}
