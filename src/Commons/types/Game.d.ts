import { Season } from "./Game/Season"
import { League } from "./Game/League"
import { Team } from "./Game/Team"
import { Venue } from "./Game/Venue"
import { Sport } from "./Game/Sport"
import { Timestamp } from "./Timestamp"
import { Score } from "./Game/Score"
import { Drive } from "./Game/Drive/Drive"
import { EventStatus } from "./Game/EventStatus"

export interface Game {
  sport: Sport
  season: Season
  league: League
  teams: {
    home: Team
    away: Team
  }
  venue: Venue
  startDate: Timestamp
  status: EventStatus
  score: Score
  isPaused: boolean
  drive: Drive | void
}
