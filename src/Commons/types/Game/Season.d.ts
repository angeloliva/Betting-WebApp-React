// Information about the Game Season
import { SeasonType } from "./SeasonType"

export interface Season {
  // Year of the current season (eg. 2018)
  year: number
  // Name (eg. "NFP 2018 - 2019)
  name: string
  // The type of season (pre/post etc.)
  type: SeasonType
}
