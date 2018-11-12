import { Season } from "./Season"
import { PlayerInformation } from "./PlayerInformation"

export interface League {
  leagueId: number
  name: string
  abbreviation: string
  displayName: string
  season?: Season
  players?: PlayerInformation[]
}
