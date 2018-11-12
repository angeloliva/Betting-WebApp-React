import { Validator } from "./Validator"

export const maxValue = (max: number): Validator<number> => s =>
  s > max ? `Too high` : null
