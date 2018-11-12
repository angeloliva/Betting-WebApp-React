import { Validator } from "./Validator"

export const minSecValidator: Validator<number> = gamePeriod => {
  if (gamePeriod < 0) {
    return "too low"
  }
  if (gamePeriod > 60) {
    return "too high"
  }
  return null
}
