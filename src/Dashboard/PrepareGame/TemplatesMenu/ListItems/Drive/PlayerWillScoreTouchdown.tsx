import { makeNewBetTemplateListItem } from "../../utils/makeNewBetTemplateListItem"
import PlayerWillScoreTouchdownOnDrive, {
  defaultBet,
} from "../../../Forms/Drive/PlayerWillScoreTouchdown"

export const PlayerWillScoreTouchdownDriveListItem = makeNewBetTemplateListItem(
  "(Player) will score a Touchdown",
  PlayerWillScoreTouchdownOnDrive,
  defaultBet,
)
