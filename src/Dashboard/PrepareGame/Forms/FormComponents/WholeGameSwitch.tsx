import * as React from "react"
import { FormControlLabel, Switch } from "@material-ui/core"
import { Bet } from "../../../../Commons/types/Bet"
import { Game } from "../../../../Commons/types/Game"

export interface Props {
  bet: Bet
  onChangeBet: (bet: Bet) => any
  game: Game
}

export class WholeGameSideSwitch extends React.PureComponent<Props> {
  onChangeWholeGame(isWholeGame: boolean) {
    const { bet, onChangeBet } = this.props
    const newBet = { ...bet }
    newBet.timeframe = isWholeGame
      ? { type: "game" }
      : {
          type: "period",
          sequenceNumber: 1,
        }
    onChangeBet(newBet)
  }

  onChange = (_: any, isWholeGame: boolean) => {
    this.onChangeWholeGame(isWholeGame)
  }

  render() {
    const { bet } = this.props
    const isWholeGame = bet.timeframe.type === "game"
    return (
      <FormControlLabel
        control={
          <Switch
            id="player-or-team"
            checked={isWholeGame}
            onChange={this.onChange}
          />
        }
        label="Whole Game"
      />
    )
  }
}
