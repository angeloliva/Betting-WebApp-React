import { makeNewBetTemplateListItem } from "../../utils/makeNewBetTemplateListItem"
import TeamWillScoreOnDrive, {
  defaultBet,
} from "../../../Forms/Drive/TeamWillScore"

export const TeamWillScoreDriveListItem = makeNewBetTemplateListItem(
  "(Team) will score",
  TeamWillScoreOnDrive,
  defaultBet,
)
