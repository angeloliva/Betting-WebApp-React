import { Bet } from "../types/Bet"
import { describeActor } from "./describers/describeActor"
import { DescriptionContext } from "./describers/DescriptionContext"
import { describeTrigger } from "./describers/describeTrigger"
import { describeTimeframe } from "./describers/describeTimeframe"

export const describe = (bet: Bet, context: DescriptionContext): string => {
  if (bet.description) {
    return bet.description
  }

  // we work each individual component
  const actor = describeActor(bet.actor, context)
  const trigger = describeTrigger(bet.trigger)
  const timeframe = describeTimeframe(bet.timeframe)

  // we build the result by appending all the things
  let result = `${actor} ${trigger}`
  if (timeframe) {
    result += ` ${timeframe}`
  }
  return result
}
