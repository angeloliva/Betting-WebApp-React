import { Validator } from "./Validator"

export const gameTimeSecValidator: Validator<number> = gameTimeSec => {
  if (gameTimeSec < 0) {
    return "too low"
  }
  if (gameTimeSec > 15 * 60) {
    return "too high"
  }
  return null
}
