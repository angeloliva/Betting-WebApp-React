import { Validator } from "../Validator"
import { Trigger } from "../../types/Bet/Trigger"

export const triggerValidator: Validator<Trigger> = trigger => {
  if (trigger.quantity < 1) {
    return "quantity: must be at least 1"
  }
  switch (trigger.type) {
    case "passing_yards":
    case "receiving_yards":
    case "rushing_yards":
    case "total_yards":
    case "completions":
    case "receptions":
    case "carries":
    case "tackles":
    case "sacks":
    case "interceptions":
    case "passing_touchdowns":
    case "receiving_touchdowns":
    case "rushing_touchdowns":
    case "touchdowns":
    case "score":
      return null
    default:
      return "type: invalid"
  }
}
