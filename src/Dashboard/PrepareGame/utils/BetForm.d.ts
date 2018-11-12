import * as React from "react"
import { Bet } from "../../../Commons/types/Bet"
import { Game } from "../../../Commons/types/Game"

export interface Props {
  game: Game
  onChangeBet: (bet: Bet) => void
  bet: Bet
}

export type BetForm = React.ComponentType<Props>

export type WithDefaultBet = {
  defaultBet: Bet
}
