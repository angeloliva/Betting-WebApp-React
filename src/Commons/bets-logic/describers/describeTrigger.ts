import { Trigger } from "../../types/Bet/Trigger"

export const describeTrigger = (trigger: Trigger): string => {
  switch (trigger.type) {
    case "passing_yards":
      return `will gain ${trigger.quantity} Passing yards or more`
    case "receiving_yards":
      return `will gain ${trigger.quantity} Receiving yards or more`
    case "rushing_yards":
      return `will gain ${trigger.quantity} Rushing yards or more`
    case "total_yards":
      return `will gain ${trigger.quantity} Total yards or more`
    case "completions":
      return `will record ${trigger.quantity} Completions or more`
    case "carries":
      return `will record ${trigger.quantity} Carries or more`
    case "receptions":
      return `will record ${trigger.quantity} Receptions or more`
    case "tackles":
      return `will record ${trigger.quantity} Tackles or more`
    case "sacks":
      return `will record ${trigger.quantity} Sacks or more`
    case "interceptions":
      return `will record ${trigger.quantity} Interceptions or more`
    case "passing_touchdowns":
      if (trigger.quantity === 1) {
        return `will score a Passing touchdown`
      } else {
        return `will score ${trigger.quantity} Passing touchdowns or more`
      }
    case "rushing_touchdowns":
      if (trigger.quantity === 1) {
        return `will score a Rushing touchdown`
      } else {
        return `will score ${trigger.quantity} Rushing touchdowns or more`
      }
    case "receiving_touchdowns":
      if (trigger.quantity === 1) {
        return `will score a Receiving touchdown`
      } else {
        return `will score ${trigger.quantity} Receiving touchdowns or more`
      }
    case "touchdowns":
      if (trigger.quantity === 1) {
        return `will score a touchdown`
      } else {
        return `will score ${trigger.quantity} touchdowns or more`
      }
    case "score":
      return `will score ${trigger.quantity} or more points`
  }
}
