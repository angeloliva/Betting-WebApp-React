import { Validator } from "./Validator"

export type Value = string | any[]

// Checks if input is empty
export const notEmpty: Validator<Value> = s =>
  s.length === 0 ? `Cannot be empty` : null
