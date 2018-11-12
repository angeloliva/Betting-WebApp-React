import { Team } from "./Team"

export interface Draft {
  year: number
  round: number
  roundPickNumber: number
  overallPickNumber: number
  ssSupplemental: string
  team: Team
}
