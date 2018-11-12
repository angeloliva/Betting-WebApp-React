import { Validator } from "./Validator"

export const minValue = (min: number): Validator<number> => s =>
  s < min ? `Too low` : null
