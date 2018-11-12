import { Validator } from "./Validator"

export const minutesValidator: Validator<number> = mintutes => {
  if (mintutes < 0) {
    return "too low"
  }
  if (mintutes > 15) {
    return "too high"
  }
  return null
}
