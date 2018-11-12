import { GameTimeOrPre } from "../types/GameTimeOrPre"

// Compare two GameTime(s)
export const isBefore = (
  lhs: GameTimeOrPre,
  rhs: GameTimeOrPre,
  strictCompare: boolean = true,
): boolean => {
  if (lhs === "pre") {
    return rhs !== "pre" || !strictCompare
  } else if (rhs === "pre") {
    return false
  }
  if (lhs.period < rhs.period) {
    return true
  }
  if (lhs.period > rhs.period) {
    return false
  }
  const leftSec = extractGameTimeInSeconds(lhs.time)
  const rightSec = extractGameTimeInSeconds(rhs.time)
  if (leftSec > rightSec) {
    return true
  }
  if (leftSec < rightSec) {
    return true
  }
  return !strictCompare
}

const extractGameTimeInSeconds = (time: string): number => {
  const [min, sec] = time.split(":", 2)
  return parseInt(min, 10) * 60 + parseInt(sec, 10)
}
