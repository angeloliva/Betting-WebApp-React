import * as React from "react"
import { FormControlLabel, Switch } from "@material-ui/core"
import { Bet } from "../../../../Commons/types/Bet"

export interface Props {
  bet: Bet
  onChangeBet: (bet: Bet) => any
}

export const DriveOrPeriodSideSwitch: React.SFC<Props> = ({
  bet,
  onChangeBet,
}) => {
  const isPeriod = bet.timeframe.type === "period"
  return (
    <FormControlLabel
      control={
        <Switch
          id="player-or-team"
          checked={isPeriod}
          onChange={(_: any, isPeriod: boolean) =>
            onChangeBet(
              Object.assign({}, bet, {
                timeframe: {
                  type: isPeriod ? "period" : "drive",
                  sequenceNumber: 1,
                },
              }),
            )
          }
        />
      }
      label={bet.timeframe.type.toUpperCase()}
    />
  )
}
