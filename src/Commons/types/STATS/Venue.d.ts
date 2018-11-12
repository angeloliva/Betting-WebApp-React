import { City } from "./City"

export interface Venue extends City {
  venueId: number
  name: string
}
