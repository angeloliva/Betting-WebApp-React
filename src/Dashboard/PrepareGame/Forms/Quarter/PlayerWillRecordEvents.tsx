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
import PlayerAutosuggest from "../FormComponents/PlayerAutosuggest"
import { TriggerOutPercentTextField } from "../FormComponents/TriggerOutPercent"
import { OddsTextField } from "../FormComponents/OddsTextFields"
import { Document } from "../../../../Commons/types/Document"
import TimestampFields from "../FormComponents/TimestampFields"
import { TriggerTypeSelect } from "../FormComponents/TriggerTypeSelect"
import { TriggerQuantityTextField } from "../FormComponents/TriggerQuantityTextField"
import { minValue } from "../../../../Commons/validators/minValue"

export interface Props extends BetFormProps, WithStyles<typeof styles> {
  game: Game & Document
}

export const defaultBet: Bet = {
  actor: {
    type: "player",
    id: 0,
  },
  trigger: {
    type: "completions",
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

const PlayerWillRecordEventsForm: React.SFC<Props> = ({
  classes,
  bet,
  game,
  onChangeBet,
}) => (
  <form className={classes.form}>
    <Grid container spacing={32}>
      <Grid item xs={12} sm={6}>
        <div className={classes.separator}>
          <Typography variant="subheading" color="primary">
            Actor
          </Typography>
        </div>
        <div className={classes.row}>
          <PlayerAutosuggest
            autoFocus
            bet={bet}
            onChangeBet={onChangeBet}
            game={game}
          />
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
      </Grid>
      <Grid item xs={12} sm={6}>
        <div className={classes.separator}>
          <Typography variant="subheading" color="primary">
            Trigger
          </Typography>
        </div>
        <div className={classes.row}>
          <TriggerQuantityTextField
            bet={bet}
            onChangeBet={onChangeBet}
            label="Minimum number of"
            validator={minValue(1)}
          />
        </div>
        <div className={classes.row}>
          <TriggerTypeSelect
            bet={bet}
            onChangeBet={onChangeBet}
            options={{
              completions: "Completions",
              carries: "Carries",
              receptions: "Receptions",
              tackles: "Tackles",
              sacks: "Sacks",
              interceptions: "Interceptions",
            }}
          />
        </div>
        <div className={classes.separator}>
          <Typography variant="subheading" color="primary">
            (Automatic) Trigger Out
          </Typography>
        </div>
        <div className={classes.row}>
          <TriggerOutPercentTextField bet={bet} onChangeBet={onChangeBet} />
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
      maxWidth: 450 * 2 + 8,
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
    item: {
      width: "100%",
      maxWidth: 450,
    },
  })

export default withStyles(styles)(PlayerWillRecordEventsForm)
