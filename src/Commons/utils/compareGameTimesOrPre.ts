import { GameTimeOrPre } from "../types/GameTimeOrPre"
import { compareGameTimes } from "./compareGameTimes"

export const compareGameTimesOrPre = (
  lhs: GameTimeOrPre,
  rhs: GameTimeOrPre,
): number => {
  if (lhs === "pre") {
    if (rhs === "pre") {
      return 0
    }
    return -1
  }
  if (rhs === "pre") {
    return 1
  }
  return compareGameTimes(lhs, rhs)
}
