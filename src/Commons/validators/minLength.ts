import { Validator } from "./Validator"

export type Value = string | any[]

// Check if a string is at least `min` chars long (inclusive)
export const minLength = (min: number): Validator<Value> => s =>
  s.length < min ? `Too short` : null
