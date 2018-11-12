import * as React from "react"
import {
  Button,
  Card,
  CardActions,
  CardContent,
  createStyles,
  Grid,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core"
import { format } from "date-fns"
import { withRouter } from "react-router-dom"
import { RouteComponentProps } from "react-router"
import { GameWithIsCurrent } from "../../Commons/types/GameWithIsCurrent"
import { Document } from "../../Commons/types/Document"

export interface Props
  extends WithStyles<typeof styles>,
    RouteComponentProps<any> {
  game: GameWithIsCurrent & Document
  loading: boolean
  onClick: () => any
}

export const GameInfo = ({
  classes,
  game,
  loading,
  onClick,
  history,
}: Props) => {
  const prepareGame = () => history.push(`/prepare/${game.id}`)
  return (
    <Grid item xs={12} lg={6} key={game.id}>
      <Card
        classes={{
          root: classes.card,
        }}
      >
        <CardContent>
          <Typography
            variant="headline"
            color={game.isCurrent ? "primary" : "default"}
          >
            {format(game.startDate.toDate(), "YYYY/MM/DD")}{" "}
            {game.teams.home.name} VS {game.teams.away.name}
          </Typography>
          <Typography variant="subheading" color="textSecondary">
            {game.league.shortName} - {game.season.type}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            disabled={loading || game.isCurrent}
            onClick={onClick}
            color="secondary"
          >
            {game.isCurrent ? "NEXT GAME" : "MAKE NEXT GAME"}
          </Button>
          <Button
            size="small"
            disabled={loading}
            onClick={prepareGame}
            color="primary"
          >
            PREPARE
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

const styles = createStyles({
  card: {
    borderRadius: 0,
  },
})

export default withRouter(withStyles(styles)(GameInfo))
