import { Validator } from "./Validator"

// Combine several validators into a unique validator
export const combine = <T>(
  ...validators: Array<Validator<T>>
): Validator<T> => s => {
  for (const validator of validators) {
    const error = validator(s)
    if (error) {
      return error
    }
  }
  return null
}
