import * as React from "react"
import { TextField } from "@material-ui/core"
import { Bet } from "../../../../Commons/types/Bet"
import { Validator } from "../../../../Commons/validators/Validator"

export interface Props {
  bet: Bet
  onChangeBet: (bet: Bet) => any
  label: string
  validator?: Validator<number>
}

export const TriggerQuantityTextField = ({
  bet,
  onChangeBet,
  label,
  validator,
}: Props) => {
  const numYards = bet.trigger.quantity
  const numYardsError = validator && validator(numYards)
  return (
    <TextField
      fullWidth
      id="quantity"
      label={label}
      value={numYards}
      error={Boolean(numYardsError)}
      helperText={numYardsError}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        onChangeBet(
          Object.assign({}, bet, {
            trigger: {
              ...bet.trigger,
              quantity: parseInt(event.target.value, 10) || 0,
            },
          }),
        )
      }
    />
  )
}
