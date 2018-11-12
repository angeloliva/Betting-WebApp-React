import { Actor } from "../../types/Bet/Actor"
import { DescriptionContext } from "./DescriptionContext"
import { findPlayerName } from "./utils"

export const describeActor = (
  actor: Actor,
  context: DescriptionContext,
): string => {
  switch (actor.type) {
    case "anyone":
      return "Anyone"
    case "team": {
      const { teams } = context.game
      return teams.away.statsID === actor.id ? teams.away.name : teams.home.name
    }
    case "player":
      return findPlayerName(context, actor.id) || "?"
  }
}
