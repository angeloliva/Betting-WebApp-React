import * as React from "react"
import { Grid, TextField, Typography } from "@material-ui/core"
import { Bet } from "../../../../Commons/types/Bet"
import {
  withCurrentGameTimeForGame,
  Props as GameTimeProps,
} from "../../../../Commons/rx+firebase/withCurrentGameTimeForGame"
import { GameTime } from "../../../../Commons/types/GameTime"
import { isBefore } from "../../../../Commons/utils/isBefore"
import {
  GameTimeElements,
  splitGameTime,
} from "../../../../Commons/utils/splitGameTime"
import { minSecToString } from "../../../../Commons/utils/minSecToString"

export interface Props extends GameTimeProps {
  bet: Bet
  onChangeBet: (bet: Bet) => any
}

class TimestampFields extends React.PureComponent<Props> {
  componentDidMount() {
    this.validateTime()
  }

  componentDidUpdate(prevProps: Props) {
    this.validateTime()
  }

  validateTime() {
    const { currentGameTime, bet } = this.props
    const gameTime: GameTime =
      currentGameTime === "pre"
        ? {
            period: 1,
            time: "15:00",
          }
        : currentGameTime

    if (!bet.timestamp || isBefore(bet.timestamp, gameTime)) {
      this.onChangeTime(gameTime)
    }
  }

  onChangeTime = (gameTime: GameTime) => {
    const { bet, onChangeBet } = this.props
    const updatedBet: Bet = {
      ...bet,
      timestamp: gameTime,
    }
    onChangeBet(updatedBet)
  }

  onChangePeriod = (event: React.ChangeEvent<HTMLInputElement>) => {
    const period = parseInt(event.target.value, 10) || 0
    this.onChangeTimeElements({ period })
  }

  onChangeMinutes = (event: React.ChangeEvent<HTMLInputElement>) => {
    const min = parseInt(event.target.value, 10) || 0
    this.onChangeTimeElements({ min })
  }

  onChangeSeconds = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sec = (parseInt(event.target.value, 10) || 0) % 60
    this.onChangeTimeElements({ sec })
  }

  onChangeTimeElements = ({
    period: newPeriod,
    min: newMin,
    sec: newSec,
  }: Partial<GameTimeElements>) => {
    const { bet } = this.props
    const gameTime = bet.timestamp || {
      period: 1,
      time: "15:00",
    }
    const { period, min, sec } = splitGameTime(gameTime)
    this.onChangeTime({
      period: newPeriod || period,
      time: minSecToString(newMin || min, newSec || sec),
    })
  }

  render() {
    const { bet } = this.props
    const gameTime = bet.timestamp || {
      period: 1,
      time: "15:00",
    }
    const { period, min, sec } = splitGameTime(gameTime)
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Typography variant="body1" color="textSecondary">
            Timestamp
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            id="gameTime-period"
            label="Period"
            value={period}
            onChange={this.onChangePeriod}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            id="gameTime-minutes"
            label="Minutes"
            value={min}
            onChange={this.onChangeMinutes}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            id="gameTime-seconds"
            label="Seconds"
            value={sec}
            onChange={this.onChangeSeconds}
          />
        </Grid>
      </Grid>
    )
  }
}

export default withCurrentGameTimeForGame(TimestampFields)
