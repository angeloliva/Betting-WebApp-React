import { makeNewBetTemplateListItem } from "../../utils/makeNewBetTemplateListItem"
import PlayerWillScoreTouchdownOnQuarter, {
  defaultBet,
} from "../../../Forms/Quarter/PlayerWillScoreTouchdown"

export const PlayerWillScoreTouchdownQuarterListItem = makeNewBetTemplateListItem(
  "(Player) will score a Touchdown",
  PlayerWillScoreTouchdownOnQuarter,
  defaultBet,
)
