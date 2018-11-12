import * as React from "react"
import { Game } from "../../../../Commons/types/Game"
import { BetForm } from "../../utils/BetForm"
import { Bet } from "../../../../Commons/types/Bet"
import NewBetDialogListItem from "./NewBetDialogListItem"

export interface Props {
  game: Game
}

export const makeNewBetTemplateListItem = (
  title: string,
  betForm: BetForm,
  defaultBet: Bet,
): React.ComponentType<Props> => (props: Props) =>
  // @ts-ignore
  React.createElement(NewBetDialogListItem, {
    title,
    betForm,
    defaultBet,
    ...props,
  })
