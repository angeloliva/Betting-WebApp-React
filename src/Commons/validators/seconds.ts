import { Validator } from "./Validator"

export const secondsValidator: Validator<number> = seconds => {
  if (seconds < 0) {
    return "too low"
  }
  if (seconds > 60) {
    return "too high"
  }
  return null
}
