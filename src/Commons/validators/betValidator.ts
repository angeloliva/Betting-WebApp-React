import { Validator } from "./Validator"
import { Bet } from "../types/Bet"
import { actorValidator } from "./Bets/actorValidator"
import { timeframeValidator } from "./Bets/timeframeValidator"
import { triggerValidator } from "./Bets/triggerValidator"
import { isNumber } from "lodash"
import { minValue } from "./minValue"

const min1 = minValue(1)

export const betValidator: Validator<Bet> = bet => {
  if (isNumber(bet.triggerOutPercent)) {
    if (bet.triggerOutPercent < 0 || bet.triggerOutPercent > 1) {
      return "triggerOutPercent: must be between 0.0 and 1.0"
    }
  }
  let error = min1(bet.odds)
  if (error) {
    return `odds: ${error}`
  }

  error = actorValidator(bet.actor)
  if (error) {
    return `actor: ${error}`
  }
  error = timeframeValidator(bet.timeframe)
  if (error) {
    return `timeframe: ${error}`
  }
  error = triggerValidator(bet.trigger)
  if (error) {
    return `trigger: ${error}`
  }

  return null
}
