import * as React from "react"
import ScreenSpinner from "../../components/ScreenSpinner"
import Grid from "@material-ui/core/Grid/Grid"
import Typography from "@material-ui/core/Typography"
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core"
import {
  withGame,
  Props as GameProps,
} from "../../Commons/rx+firebase/withGame"
import BetList from "./BetList"
import PendingBetList from "./PendingBetList"
import TemplateBetList from "./TemplateBetList"
import BetTemplatesActionButton from "./TemplatesMenu/BetTemplatesActionButton"

export interface Props extends GameProps, WithStyles<typeof styles> {}

export class BetFactory extends React.PureComponent<Props> {
  render() {
    if (!this.props.game) {
      return <ScreenSpinner />
    }

    const { game } = this.props
    return (
      <div>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Typography variant="display1" color="textPrimary">
              {game.teams.home.name} VS {game.teams.away.name} ({game.isPaused
                ? "P"
                : "R"})
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TemplateBetList game={game} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <PendingBetList game={game} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <BetList game={game} />
          </Grid>
        </Grid>
        <BetTemplatesActionButton game={game} />
      </div>
    )
  }
}

const styles = ({ spacing }: Theme) =>
  createStyles({
    fab: {
      position: "absolute",
      bottom: spacing.unit * 4,
      right: spacing.unit * 4,
    },
  })

export default withGame(withStyles(styles)(BetFactory))
