import { Validator } from "../Validator"
import { Actor } from "../../types/Bet/Actor"

export const actorValidator: Validator<Actor> = actor => {
  // must be either "anyone" or have an id
  switch (actor.type) {
    case "anyone":
      return null
    case "player":
    case "team":
      return Boolean(actor.id) ? null : "id: must be present"
    default:
      return "type: invalid"
  }
}
