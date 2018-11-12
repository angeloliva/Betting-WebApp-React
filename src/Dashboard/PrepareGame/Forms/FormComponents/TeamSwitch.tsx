import * as React from "react"
import { FormControlLabel, Switch } from "@material-ui/core"
import { Game } from "../../../../Commons/types/Game"
import { Bet } from "../../../../Commons/types/Bet"

export interface Props {
  bet: Bet
  game: Game
  onChangeBet: (bet: Bet) => any
}

export const TeamSideSwitch: React.SFC<Props> = ({
  bet: rawBet,
  game,
  onChangeBet,
}) => {
  const { teams } = game

  // TODO(Aurélien): this is a HACK
  let bet = rawBet
  if (bet.actor.type === "team" && bet.actor.id === 0) {
    bet = {
      ...bet,
      actor: {
        type: "team",
        id: teams.home.statsID,
      },
    }
    onChangeBet(bet)
  }

  const isHome =
    bet.actor.type === "team" && bet.actor.id === teams.home.statsID
  return (
    <FormControlLabel
      control={
        <Switch
          id="team"
          checked={isHome}
          onChange={(_: any, isHome: boolean) =>
            onChangeBet(
              Object.assign({}, bet, {
                actor: {
                  type: "team",
                  id: isHome ? teams.home.statsID : teams.away.statsID,
                },
              }),
            )
          }
        />
      }
      label={`Team: ` + (isHome ? teams.home.name : teams.away.name)}
    />
  )
}
