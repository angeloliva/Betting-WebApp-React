import { Validator } from "./Validator"
import { minValue } from "./minValue"
import { maxValue } from "./maxValue"

export const inBetweenValidator = (
  min: number,
  max: number,
): Validator<number> => {
  const minValidator = minValue(min)
  const maxValidator = maxValue(max)
  return value => {
    const error = minValidator(value)
    if (error) {
      return error
    }
    return maxValidator(value)
  }
}
