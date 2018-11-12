import { makeNewBetTemplateListItem } from "../../utils/makeNewBetTemplateListItem"
import TeamWillRecordDefenseOnDrive, {
  defaultBet,
} from "../../../Forms/Drive/TeamWillRecordDefense"

export const TeamWillRecordDefenseDriveListItem = makeNewBetTemplateListItem(
  "(Team) will record sack/turnover",
  TeamWillRecordDefenseOnDrive,
  defaultBet,
)
