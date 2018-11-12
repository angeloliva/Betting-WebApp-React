import * as React from "react"
import { FormControlLabel, Switch } from "@material-ui/core"
import { Bet } from "../../../../Commons/types/Bet"
import { Game } from "../../../../Commons/types/Game"

export interface Props {
  bet: Bet
  onChangeBet: (bet: Bet) => any
  game: Game
}

export const TeamOrPlayerSideSwitch: React.SFC<Props> = ({
  bet,
  onChangeBet,
  game,
}) => {
  const type: "team" | "player" =
    bet.actor.type === "anyone" ? "player" : bet.actor.type
  const isPlayer = type === "player"

  // This is a HACK !
  const { teams } = game
  if (
    bet.actor.type === "team" &&
    bet.actor.id !== teams.home.statsID &&
    bet.actor.id !== teams.away.statsID
  ) {
    bet = {
      ...bet,
      actor: {
        type: "team",
        id: teams.home.statsID,
      },
    }
    // onChangeBet(bet)
  }

  return (
    <FormControlLabel
      control={
        <Switch
          id="player-or-team"
          checked={isPlayer}
          onChange={(_: any, isPlayer: boolean) =>
            onChangeBet(
              Object.assign({}, bet, {
                actor: {
                  type: isPlayer ? "player" : "team",
                  id: isPlayer ? 0 : teams.home.statsID,
                },
              }),
            )
          }
        />
      }
      label={type.toUpperCase()}
    />
  )
}
