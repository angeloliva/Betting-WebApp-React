import { makeNewBetTemplateListItem } from "../../utils/makeNewBetTemplateListItem"
import PlayerWillGainYardsOnQuarter, {
  defaultBet,
} from "../../../Forms/Quarter/PlayerWillGainYards"

export const PlayerWillGainYardsQuarterListItem = makeNewBetTemplateListItem(
  "(Player) will gain N Yards ",
  PlayerWillGainYardsOnQuarter,
  defaultBet,
)
