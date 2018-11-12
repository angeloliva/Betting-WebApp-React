import { makeNewBetTemplateListItem } from "../../utils/makeNewBetTemplateListItem"
import PlayerWillGainYardsOnDrive, {
  defaultBet,
} from "../../../Forms/Drive/PlayerWillGainYards"

export const PlayerWillGainYardsDriveListItem = makeNewBetTemplateListItem(
  "(Player) will gain N Yards ",
  PlayerWillGainYardsOnDrive,
  defaultBet,
)
