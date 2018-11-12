import * as React from "react"
import Typography from "@material-ui/core/Typography"
import Spinner from "../../components/Spinner"
import { Game } from "../../Commons/types/Game"

export interface Props {
  games: Game[]
  loaded: boolean
}

const GamesCount = ({ games, loaded }: Props) =>
  loaded ? (
    <Typography variant="display1" color="primary">
      {games.length} Games loaded
    </Typography>
  ) : (
    <Spinner size={30} />
  )

export default GamesCount
