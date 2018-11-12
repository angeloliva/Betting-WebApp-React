import { timestampFromDateElements } from "../../Commons/utils/timestampFromDateElements"
import { Game } from "../../Commons/types/Game"

const game: Partial<Game> = {
  sport: "Basketball",
  startDate: timestampFromDateElements(2018, 5, 2),
  league: {
    sport: "Basketball",
    name: "National Football League",
    longName: "National Football League",
    shortName: "NFL",
  },
  teams: {
    home: {
      statsID: 348,
      name: "Patriots",
      location: "New England",
      shortName: "NE",
    },
    away: {
      statsID: 354,
      name: "Eagles",
      location: "Philadelphia",
      shortName: "Phi",
    },
  },
  season: {
    name: "2017-2018 NFL Season",
    type: "Regular Season",
    year: 2017,
  },
  venue: {
    name: "U.S. Bank Stadium",
    city: "Minneapolis",
    state: {
      name: "Minnesota",
      shortName: "MN",
    },
    country: {
      name: "United States",
      shortName: "USA",
    },
  },
  score: {
    home: 0,
    away: 0,
  },
  isPaused: false,
}

export default game
