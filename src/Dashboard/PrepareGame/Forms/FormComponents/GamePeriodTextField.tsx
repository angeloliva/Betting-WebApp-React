import * as React from "react"
import { TextField } from "@material-ui/core"
import { Bet } from "../../../../Commons/types/Bet"
import { gamePeriodValidator } from "../../../../Commons/validators/gamePeriod"
import { withCurrentPeriodForGame } from "../../../../Commons/rx+firebase/withCurrentPeriodForGame"

export interface Props {
  bet: Bet
  onChangeBet: (bet: Bet) => any
  period: number
}

class GamePeriodTextField extends React.PureComponent<Props> {
  componentDidMount() {
    this.validatePeriod()
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.period !== prevProps.period) {
      this.validatePeriod()
    }
  }

  validatePeriod() {
    const { period, bet } = this.props
    const { timeframe } = bet
    if (timeframe.type !== "period") {
      return
    }

    if (period > timeframe.sequenceNumber) {
      this.onChangePeriod(period)
    }
  }

  onChangePeriod = (period: number) => {
    const { bet, onChangeBet } = this.props
    const updatedBet: Bet = {
      ...bet,
      timeframe: {
        type: "period",
        sequenceNumber: period,
      },
    }
    onChangeBet(updatedBet)
  }

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const period = parseInt(event.target.value, 10) || 0
    this.onChangePeriod(period)
  }

  render() {
    const { bet, period: currentPeriod } = this.props
    const period =
      bet.timeframe.type === "period"
        ? bet.timeframe.sequenceNumber
        : currentPeriod
    const gamePeriodError = gamePeriodValidator(period, currentPeriod)
    const label = currentPeriod
      ? `Game Period (current is ${currentPeriod}):`
      : "Game Period:"
    return (
      <TextField
        fullWidth
        id="gamePeriod"
        label={label}
        value={period}
        error={Boolean(gamePeriodError)}
        helperText={gamePeriodError}
        onChange={this.onChange}
      />
    )
  }
}

export default withCurrentPeriodForGame(GamePeriodTextField)
