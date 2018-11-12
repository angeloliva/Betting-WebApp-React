import { Validator } from "./Validator"

export type Value = string | any[]

// Check if a string is at most `max` chars long (inclusive)
export const maxLength = (max: number): Validator<Value> => s =>
  s.length > max ? `Too short` : null
