import * as React from "react"
import {
  Card,
  CardContent,
  createStyles,
  Grid,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core"
import { Document } from "../../Commons/types/Document"
import { Bet } from "../../Commons/types/Bet"
import CloneBetButton from "./Forms/CloneBetButton"
import OddsShow from "./Forms/OddsShow"
import { Game } from "../../Commons/types/Game"
import ManualTriggerOutButton from "./Forms/ManualTriggerOutButton"
import { gameTimeOrPreToString } from "../../Commons/utils/gameTimeOrPreToString"

export interface Props extends WithStyles<typeof styles> {
  bet: Bet & Document
  game: Game & Document
}

export const BetCell = ({ classes, bet, game }: Props) => (
  <Grid item xs={12} key={bet.id}>
    <Card
      classes={{
        root: classes.card,
      }}
    >
      <CardContent>
        <Typography
          variant="subheading"
          color={bet.isTriggeredOut ? "textSecondary" : "textPrimary"}
        >
          {bet.timestamp && gameTimeOrPreToString(bet.timestamp)}
          {bet.description}
        </Typography>
      </CardContent>
      <CloneBetButton betID={bet.id} game={game} />
      <OddsShow odds={bet.odds} selected={false} />
      <ManualTriggerOutButton bet={bet} game={game} />
    </Card>
  </Grid>
)

const styles = createStyles({
  card: {
    borderRadius: 0,
  },
})

export default withStyles(styles)(BetCell)
