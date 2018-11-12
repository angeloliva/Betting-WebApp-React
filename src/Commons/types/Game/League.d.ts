// Information about the League hosting the Game
import { Sport } from "./Sport"

export interface League {
  // The sport this league is about
  sport: Sport
  // Name of the league (eg. "National Football League")
  name: string
  // Short name (eg. "NFL")
  shortName: string
  // A longer name (often the same as "name")
  longName: string
}
