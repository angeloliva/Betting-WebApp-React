import * as React from "react"
import { TextField } from "@material-ui/core"
import { Bet } from "../../../../Commons/types/Bet"
import { inBetweenValidator } from "../../../../Commons/validators/inBetween"

export interface Props {
  bet: Bet
  onChangeBet: (bet: Bet) => any
}

const validator = inBetweenValidator(0, 1)

export const TriggerOutPercentTextField = ({ bet, onChangeBet }: Props) => {
  const triggerOutPercent = bet.triggerOutPercent || 0
  const error = validator(triggerOutPercent)
  const invalid = Boolean(error)
  const label =
    triggerOutPercent === 0
      ? "Trigger out (%)"
      : `Trigger out (${100 * triggerOutPercent}%)`

  // handle disabled for 0%
  let helperText = error
  if (!error && triggerOutPercent === 0) {
    helperText = "(disabled)"
  }

  return (
    <TextField
      fullWidth
      id="triggerOutPercent"
      label={label}
      value={triggerOutPercent * 100}
      error={invalid}
      helperText={helperText}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        onChangeBet(
          Object.assign({}, bet, {
            triggerOutPercent: 0.01 * (parseInt(event.target.value, 10) || 0),
          }),
        )
      }
    />
  )
}
