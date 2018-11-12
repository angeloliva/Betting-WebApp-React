import { makeNewBetTemplateListItem } from "../../utils/makeNewBetTemplateListItem"
import TeamWillRecordDefenseOnQuarter, {
  defaultBet,
} from "../../../Forms/Quarter/TeamWillRecordDefense"

export const TeamWillRecordDefenseQuarterListItem = makeNewBetTemplateListItem(
  "(Team) will record sack/turnover",
  TeamWillRecordDefenseOnQuarter,
  defaultBet,
)
