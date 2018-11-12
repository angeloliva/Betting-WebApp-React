import { Team as GameTeam } from "./Game/Team"
import { TeamMember } from "./Team/TeamMember"

export interface Team extends GameTeam {
  members?: TeamMember[]
}
