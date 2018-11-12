import { Date } from "./Date"
import { State } from "./State"
import { Country } from "./Country"

export interface Birth {
  birthDate: Date
  city: string
  state: State
  country: Country
}
