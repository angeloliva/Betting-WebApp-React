import * as React from "react"
import Grid from "@material-ui/core/Grid"
import GameInfo from "./GameInfo"
import { GameWithIsCurrent } from "../../Commons/types/GameWithIsCurrent"
import { Game } from "../../Commons/types/Game"
import { Document } from "../../Commons/types/Document"

export interface Props {
  games: Array<GameWithIsCurrent & Document>
  loaded: boolean
  settingCurrentGame: boolean
  setCurrentGame: (game: Game) => any
}

export default class GamesList extends React.PureComponent<Props> {
  onClick = (game: Game) => () => this.props.setCurrentGame(game)

  render() {
    const { games, loaded, settingCurrentGame } = this.props
    return (
      <Grid container spacing={8}>
        {loaded &&
          games.map(game => (
            <GameInfo
              game={game}
              loading={settingCurrentGame}
              key={game.id}
              onClick={this.onClick(game)}
            />
          ))}
      </Grid>
    )
  }
}
