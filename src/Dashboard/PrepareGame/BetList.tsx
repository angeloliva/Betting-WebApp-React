import * as React from "react"
import Grid from "@material-ui/core/Grid"
import {
  withBetsForGame,
  Props,
} from "../../Commons/rx+firebase/withBetsForGame"
import ScreenSpinner from "../../components/ScreenSpinner"
import BetCell from "./BetCell"
import { Typography } from "@material-ui/core"

export const BetList: React.SFC<Props> = props => {
  if (!props.betsLoaded) {
    return <ScreenSpinner />
  }
  const { bets } = props
  return (
    <Grid container spacing={8}>
      <Grid item>
        <Typography variant="subheading" color="primary">
          Live Bets (visible to end user)
        </Typography>
      </Grid>
      {bets.map(bet => <BetCell key={bet.id} game={props.game} bet={bet} />)}
    </Grid>
  )
}

export default withBetsForGame(BetList)
