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
import CloneBetButton from "./Forms/CloneBetButton"
import OddsShow from "./Forms/OddsShow"
import { Bet } from "../../Commons/types/Bet"
import { Document } from "../../Commons/types/Document"
import { Game } from "../../Commons/types/Game"

export interface Props extends WithStyles<typeof styles> {
  bet: Bet & Document
  game: Game & Document
  selected: boolean
  onClick: undefined | (() => void)
}

export const PendingBetCell = ({
  classes,
  bet,
  game,
  selected,
  onClick,
}: Props) => (
  <Grid item xs={12} key={bet.id}>
    <Card
      onClick={onClick}
      classes={{
        root: classes.card,
      }}
    >
      <CardContent>
        <Typography
          variant="subheading"
          color={selected ? "primary" : "textPrimary"}
        >
          {bet.description}
        </Typography>
      </CardContent>
      <CloneBetButton betID={bet.id} game={game} />
      <OddsShow odds={bet.odds} selected={selected} />
    </Card>
  </Grid>
)

const styles = createStyles({
  card: {
    borderRadius: 0,
  },
})

export default withStyles(styles)(PendingBetCell)
