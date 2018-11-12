import * as React from "react"
import {
  createStyles,
  Grid,
  Theme,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core"
import { Game } from "../../../Commons/types/Game"
import { Props as BetFormProps } from "../utils/BetForm"
import DescriptionTextField from "./FormComponents/DescriptionTextField"
import GamePeriodTextField from "./FormComponents/GamePeriodTextField"
import { Bet } from "../../../Commons/types/Bet"
import { TriggerQuantityTextField } from "./FormComponents/TriggerQuantityTextField"
import { minValue } from "../../../Commons/validators/minValue"
import { TriggerTypeSelect } from "./FormComponents/TriggerTypeSelect"
import { TeamSideSwitch } from "./FormComponents/TeamSwitch"
import { OddsTextField } from "./FormComponents/OddsTextFields"
import { TeamOrPlayerSideSwitch } from "./FormComponents/TeamOrPlayerSwitch"
import PlayerAutosuggest from "./FormComponents/PlayerAutosuggest"
import DriveIDTextField from "./FormComponents/DriveIDTextField"
import { Document } from "../../../Commons/types/Document"
import { WholeGameSideSwitch } from "./FormComponents/WholeGameSwitch"
import { DriveOrPeriodSideSwitch } from "./FormComponents/DriveOrPeriodSwitch"
import { TriggerOutPercentTextField } from "./FormComponents/TriggerOutPercent"
import TimestampFields from "./FormComponents/TimestampFields"

export interface Props extends BetFormProps, WithStyles<typeof styles> {
  game: Game & Document
}

export const defaultBet: Bet = {
  actor: {
    type: "team",
    id: 0,
  },
  trigger: {
    type: "sacks",
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

const AnyBetForm: React.SFC<Props> = ({ classes, bet, game, onChangeBet }) => (
  <form className={classes.form}>
    <Grid container spacing={8}>
      <Grid item xs={12} sm={6}>
        <div className={classes.separator}>
          <Typography variant="subheading" color="primary">
            Actor
          </Typography>
        </div>
        <div className={classes.row}>
          <Grid container>
            <Grid item xs={6}>
              <TeamOrPlayerSideSwitch
                bet={bet}
                onChangeBet={onChangeBet}
                game={game}
              />
            </Grid>
            <Grid item xs={6}>
              {bet.actor.type === "team" && (
                <TeamSideSwitch
                  bet={bet}
                  game={game}
                  onChangeBet={onChangeBet}
                />
              )}
            </Grid>
          </Grid>
        </div>
        {bet.actor.type === "player" && (
          <div className={classes.row}>
            <PlayerAutosuggest
              bet={bet}
              onChangeBet={onChangeBet}
              game={game}
            />
          </div>
        )}
        <div className={classes.separator}>
          <Typography variant="subheading" color="primary">
            Resolution Timeframe
          </Typography>
        </div>
        <div className={classes.row}>
          <Grid container>
            <Grid item xs={6}>
              <WholeGameSideSwitch
                bet={bet}
                onChangeBet={onChangeBet}
                game={game}
              />
            </Grid>
            <Grid item xs={6}>
              {bet.timeframe.type !== "game" && (
                <DriveOrPeriodSideSwitch bet={bet} onChangeBet={onChangeBet} />
              )}
            </Grid>
          </Grid>
        </div>
        {bet.timeframe.type === "period" && (
          <div className={classes.row}>
            <GamePeriodTextField
              bet={bet}
              game={game}
              onChangeBet={onChangeBet}
            />
          </div>
        )}
        {bet.timeframe.type === "drive" && (
          <div className={classes.row}>
            <DriveIDTextField
              bet={bet}
              gameID={game.id}
              onChangeBet={onChangeBet}
            />
          </div>
        )}
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
              sacks: "Sacks",
              passing_yards: "Passing yards",
              receiving_yards: "Receiving yards",
              rushing_yards: "Rushing yards",
              total_yards: "Total yards",
              completions: "Completions",
              carries: "Carries",
              receptions: "Receptions",
              tackles: "Tackles",
              interceptions: "Interceptions",
              rushing_touchdowns: "Rushing touchdown",
              passing_touchdowns: "Passing touchdown",
              receiving_touchdowns: "Receiving touchdown",
              touchdowns: "Touchdown",
              score: "Points",
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

export default withStyles(styles)(AnyBetForm)
