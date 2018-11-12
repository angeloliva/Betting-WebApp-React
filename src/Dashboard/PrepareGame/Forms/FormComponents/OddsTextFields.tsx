import * as React from "react"
import { Grid, TextField, Typography } from "@material-ui/core"
import { Bet } from "../../../../Commons/types/Bet"
import { minValue } from "../../../../Commons/validators/minValue"

export interface Props {
  bet: Bet
  onChangeBet: (bet: Bet) => any
}

const min1 = minValue(1)

export const OddsTextField = ({ bet, onChangeBet }: Props) => {
  const { odds } = bet
  const error = min1(odds)
  return (
    <Grid container spacing={8}>
      <Grid item xs={5}>
        <TextField
          fullWidth
          id="odd-numerator"
          label={`Odds ${odds}:1`}
          value={odds}
          error={Boolean(error)}
          helperText={error}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onChangeBet(
              Object.assign({}, bet, {
                odds: parseInt(event.target.value, 10) || 0,
              }),
            )
          }
        />
      </Grid>
      <Grid item xs={1}>
        <Typography align="center">:</Typography>
      </Grid>
      <Grid item xs={5}>
        <TextField
          fullWidth
          id="odd-denominator"
          label="(fractional part)"
          value="1"
          disabled={true}
        />
      </Grid>
    </Grid>
  )
}
