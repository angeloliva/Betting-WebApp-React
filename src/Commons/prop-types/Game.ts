import * as PropTypes from "prop-types"
import { Sport } from "./Sport"
import { Season } from "./Season"
import { League } from "./League"
import { Team } from "./Team"
import { Venue } from "./Venue"
import { Timestamp } from "./Timestamp"

export const Game = PropTypes.shape({
  sport: Sport.isRequired,
  season: Season,
  league: League,
  teams: PropTypes.shape({
    home: Team,
    away: Team,
  }).isRequired,
  venue: Venue.isRequired,
  startDate: Timestamp.isRequired,
})
