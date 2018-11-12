import { makeNewBetTemplateListItem } from "../../utils/makeNewBetTemplateListItem"
import PlayerWillRecordEventsOnQuarter, {
  defaultBet,
} from "../../../Forms/Quarter/PlayerWillRecordEvents"

export const PlayerWillRecordEventsQuarterListItem = makeNewBetTemplateListItem(
  "(Player) will record reception/...",
  PlayerWillRecordEventsOnQuarter,
  defaultBet,
)
