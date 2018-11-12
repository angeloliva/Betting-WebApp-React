import { Validator } from "./Validator"
import { maxLength } from "./maxLength"
import { minLength } from "./minLength"
import { combine } from "./combine"

export type Value = string | any[]

// Check if a string is between `min` and `max` chars long (inclusive)
export const inRange = (min: number, max: number): Validator<Value> =>
  combine(minLength(min), maxLength(max))
