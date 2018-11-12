import { Team } from "./Team"

export interface College {
  collegeId: number
  commonName: string
  fullName: string
  team: Team
}
