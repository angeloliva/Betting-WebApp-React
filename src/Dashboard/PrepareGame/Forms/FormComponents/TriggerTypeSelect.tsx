import * as React from "react"
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core"
import { Bet } from "../../../../Commons/types/Bet"
import { TriggerType } from "../../../../Commons/types/Bet/Trigger"
import { map } from "lodash"

export interface Props {
  bet: Bet
  onChangeBet: (bet: Bet) => any
  options: { [k in TriggerType]?: string }
}

export const TriggerTypeSelect = ({ bet, onChangeBet, options }: Props) => {
  const value = bet.trigger.type
  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="trigger-type">"Trigger" event:</InputLabel>
      <Select
        value={value}
        id="trigger-type"
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
          onChangeBet(
            Object.assign({}, bet, {
              trigger: {
                ...bet.trigger,
                type: event.target.value,
              },
            }),
          )
        }
      >
        {map(options, (label: string, type: TriggerType) => (
          <MenuItem key={type} value={type}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
