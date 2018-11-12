import { Game } from "../../types/Game"
import { TeamMember } from "../../types/Team/TeamMember"

export interface DescriptionContext {
  game: Game
  homeTeamMembers: TeamMember[]
  awayTeamMembers: TeamMember[]
}
