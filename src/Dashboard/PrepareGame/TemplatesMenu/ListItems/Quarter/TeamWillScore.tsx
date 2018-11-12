import { makeNewBetTemplateListItem } from "../../utils/makeNewBetTemplateListItem"
import TeamWillScoreOnQuarter, {
  defaultBet,
} from "../../../Forms/Quarter/TeamWillScore"

export const TeamWillScoreQuarterListItem = makeNewBetTemplateListItem(
  "(Team) will score",
  TeamWillScoreOnQuarter,
  defaultBet,
)
