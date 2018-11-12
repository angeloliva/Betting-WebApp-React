import { makeNewBetTemplateListItem } from "../../utils/makeNewBetTemplateListItem"
import PlayerWillRecordEventsOnDrive, {
  defaultBet,
} from "../../../Forms/Drive/PlayerWillRecordEvents"

export const PlayerWillRecordEventsDriveListItem = makeNewBetTemplateListItem(
  "(Player) will record reception/...",
  PlayerWillRecordEventsOnDrive,
  defaultBet,
)
