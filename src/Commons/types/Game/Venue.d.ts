import { LocationInfo } from "./LocationInfo"

// The place the game takes place
export interface Venue {
  // Name of the place ("xxx Stadium")
  name: string
  // The city where the Game takes place
  city: string
  // The state, when relevant
  state?: LocationInfo
  // The country where the Game takes place
  country: LocationInfo
}
