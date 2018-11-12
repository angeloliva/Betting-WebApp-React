import * as React from "react"
import { TextField } from "@material-ui/core"
import { describe } from "../../../../Commons/bets-logic/describe"
import { Game } from "../../../../Commons/types/Game"
import { Bet } from "../../../../Commons/types/Bet"
import { TeamMember } from "../../../../Commons/types/Team/TeamMember"
import { withTeamMembers } from "../../../../Commons/rx+firebase/withTeamMembers"

export interface Props {
  bet: Bet
  onChangeBet: (bet: Bet) => any
  game: Game
  homeTeamMembers: TeamMember[]
  awayTeamMembers: TeamMember[]
}

export const DescriptionTextField = ({
  bet,
  game,
  onChangeBet,
  homeTeamMembers,
  awayTeamMembers,
}: Props) => (
  <TextField
    fullWidth
    id="description"
    label="Override description:"
    value={bet.description}
    placeholder={
      Boolean(bet.description)
        ? undefined
        : describe(bet, { game, homeTeamMembers, awayTeamMembers })
    }
    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
      onChangeBet(Object.assign({}, bet, { description: event.target.value }))
    }
  />
)

export default withTeamMembers(DescriptionTextField)
