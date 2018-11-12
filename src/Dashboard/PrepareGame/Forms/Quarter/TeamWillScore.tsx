import * as React from "react"
import {
  createStyles,
  Grid,
  Theme,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core"
import { Game } from "../../../../Commons/types/Game"
import { Props as BetFormProps } from "../../utils/BetForm"
import DescriptionTextField from "../FormComponents/DescriptionTextField"
import GamePeriodTextField from "../FormComponents/GamePeriodTextField"
import { Bet } from "../../../../Commons/types/Bet"
import { TeamSideSwitch } from "../FormComponents/TeamSwitch"
import { OddsTextField } from "../FormComponents/OddsTextFields"
import { Document } from "../../../../Commons/types/Document"
import TimestampFields from "../FormComponents/TimestampFields"

export interface Props extends BetFormProps, WithStyles<typeof styles> {
  game: Game & Document
}

export const defaultBet: Bet = {
  actor: {
    type: "team",
    id: 0,
  },
  trigger: {
    type: "score",
    quantity: 1,
  },
  triggerOutPercent: 0,
  description: "",
  timeframe: {
    type: "period",
    sequenceNumber: 1,
  },
  isPublic: false,
  isTemplate: false,
  isTriggeredOut: false,
  isResolved: false,
  odds: 1,
}

const PlayerWillScoreOnQuarterForm: React.SFC<Props> = ({
  classes,
  bet,
  game,
  onChangeBet,
}) => (
  <form className={classes.form}>
    <Grid container>
      <Grid item xs={12}>
        <div className={classes.separator}>
          <Typography variant="subheading" color="primary">
            Actor
          </Typography>
        </div>
        <div className={classes.row}>
          <TeamSideSwitch bet={bet} game={game} onChangeBet={onChangeBet} />
        </div>
        <div className={classes.separator}>
          <Typography variant="subheading" color="primary">
            Resolution Timeframe
          </Typography>
        </div>
        <div className={classes.row}>
          <GamePeriodTextField
            bet={bet}
            game={game}
            onChangeBet={onChangeBet}
          />
        </div>
        <div className={classes.separator}>
          <Typography variant="subheading" color="primary">
            Timestamp (defaults to last event time)
          </Typography>
        </div>
        <div className={classes.row}>
          <TimestampFields bet={bet} game={game} onChangeBet={onChangeBet} />
        </div>
        <div className={classes.separator}>
          <Typography variant="subheading" color="primary">
            Other details
          </Typography>
        </div>
        <div className={classes.row}>
          <OddsTextField bet={bet} onChangeBet={onChangeBet} />
        </div>
        <div className={classes.row}>
          <DescriptionTextField
            bet={bet}
            game={game}
            onChangeBet={onChangeBet}
          />
        </div>
      </Grid>
    </Grid>
  </form>
)

const styles = ({ spacing }: Theme) =>
  createStyles({
    form: {
      width: "100%",
      maxWidth: 450,
      margin: "0 auto",
      padding: spacing.unit,
    },
    row: {
      marginTop: 2 * spacing.unit,
    },
    separator: {
      marginBottom: 0.5 * spacing.unit,
      marginTop: 1.5 * spacing.unit,
    },
  })

export default withStyles(styles)(PlayerWillScoreOnQuarterForm)
