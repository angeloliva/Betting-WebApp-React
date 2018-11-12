import { DescriptionContext } from "./DescriptionContext"
import { TeamMember } from "../../types/Team/TeamMember"

export const findPlayerName = (
  context: DescriptionContext,
  playerID: number,
): string => {
  const player = findPlayer(context, playerID)
  return player ? `${player.firstName} ${player.lastName}` : ""
}

export const findPlayer = (
  context: DescriptionContext,
  playerID: number,
): TeamMember | null => {
  const { homeTeamMembers, awayTeamMembers } = context
  let member = homeTeamMembers.find(member => member.statsID === playerID)
  if (!member) {
    member = awayTeamMembers.find(member => member.statsID === playerID)
  }
  return member || null
}
