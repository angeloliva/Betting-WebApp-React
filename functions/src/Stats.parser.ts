import * as admin from "firebase-admin"
import * as moment from "moment"
import { APIResponse } from "./types/STATS/APIResponse"
import { Game } from "./types/Game"
import { Venue } from "./types/Game/Venue"
import { Team } from "./types/Game/Team"
import { Season } from "./types/Game/Season"
import { SeasonType } from "./types/Game/SeasonType"
import { League } from "./types/Game/League"
import { PlayerInformation } from "./types/STATS/PlayerInformation"
import { Team as TeamInfo } from "./types/Team"
import { EventStatus } from "./types/Game/EventStatus"
import { Drive } from "./types/Game/Drive/Drive"
import { TeamMember } from "../../src/Commons/types/Team/TeamMember"
import { Document } from "./types/Document"

export interface TeamPlayers {
  team: TeamInfo
  players: PlayerInformation[]
}

export function parsePlayers(scoresResponse: APIResponse): TeamPlayers {
  // first check if the rawEventsAPIResponse is valid
  if (scoresResponse.status !== "OK") {
    throw new Error("Error when calling stats.com")
  }
  // then we slowly dig into the rawEventsAPIResponse object
  const { apiResults } = scoresResponse
  if (!apiResults) {
    throw new Error("Invalid rawEventsAPIResponse from stats.com")
  }
  const apiResult = apiResults[0]
  const sport = apiResult.name
  if (sport !== "Basketball" && sport !== "Football") {
    throw new Error(`Wrong response: expecting Basketball data: got ${sport}`)
  }
  const { league } = apiResult
  if (!league) {
    throw new Error("Missing League info")
  }
  const { players } = league
  if (!players || players.length === 0) {
    throw new Error("Missing players info")
  }

  // build the TeamInfo instance
  const members: TeamMember[] = []
  for (const player of players) {
    const member: TeamMember = {
      statsID: player.playerId,
      firstName: player.firstName,
      lastName: player.lastName,
    }
    if (player.uniform) {
      member.uniform = player.uniform
    }
    members.push(member)
  }

  const statsTeam = players[0].team
  const team: TeamInfo = {
    statsID: statsTeam.teamId,
    name: statsTeam.nickname,
    shortName: statsTeam.abbreviation,
    location: statsTeam.location,
    members,
  }

  return {
    team,
    players,
  }
}

export function parseGames(
  scoresResponse: APIResponse,
): Array<Game & Document> {
  // first check if the rawEventsAPIResponse is valid
  if (scoresResponse.status !== "OK") {
    throw new Error("Error when calling stats.com")
  }
  // then we slowly dig into the rawEventsAPIResponse object
  const { apiResults } = scoresResponse
  if (!apiResults) {
    throw new Error("Invalid rawEventsAPIResponse from stats.com")
  }
  const apiResult = apiResults[0]
  const sport = apiResult.name
  if (sport !== "Basketball" && sport !== "Football") {
    throw new Error(`Wrong response: expecting Basketball data: got ${sport}`)
  }
  const { league: leagueInfo } = apiResult
  if (!leagueInfo) {
    throw new Error("Missing League info")
  }
  const league: League = {
    sport,
    name: leagueInfo.name,
    shortName: leagueInfo.abbreviation,
    longName: leagueInfo.displayName || leagueInfo.name,
  }

  const { season: seasonInfo } = leagueInfo
  if (!seasonInfo) {
    throw new Error("missing Season info")
  }
  const { eventType } = seasonInfo
  if (!eventType) {
    throw new Error("missing Season info")
  }
  const seasonDetails = eventType[0]
  const season: Season = {
    year: seasonInfo.season,
    name: seasonInfo.name,
    type: seasonDetails.name as SeasonType,
  }

  const result: Array<Game & Document> = []
  for (const event of seasonDetails.events) {
    const dateInfo = event.startDate.find(date => date.dateType === "UTC")
    if (!dateInfo) {
      continue
    }
    const startDate = admin.firestore.Timestamp.fromDate(
      moment.utc(dateInfo.full).toDate(),
    )
    const venueInfo = event.venue
    if (!venueInfo) {
      continue
    }
    const stateInfo = venueInfo.state
    const state = stateInfo
      ? {
          name: stateInfo.name,
          shortName: stateInfo.abbreviation,
        }
      : null
    const countryInfo = venueInfo.country
    if (!countryInfo) {
      continue
    }
    const country = {
      name: countryInfo.name,
      shortName: countryInfo.abbreviation,
    }
    const venue: Venue = {
      name: venueInfo.name,
      city: venueInfo.city,
      state,
      country,
    }

    // parse event status
    const statusInfo = event.eventStatus
    const status: EventStatus = statusInfo

    const teamsInfo = event.teams
    if (!teamsInfo || teamsInfo.length < 2) {
      continue
    }
    const homeTeamInfo = teamsInfo.find(
      teamInfo =>
        teamInfo.teamLocationType && teamInfo.teamLocationType.name === "home",
    )
    if (!homeTeamInfo) {
      continue
    }
    const homeTeam: Team = {
      statsID: homeTeamInfo.teamId,
      location: homeTeamInfo.location,
      name: homeTeamInfo.nickname,
      shortName: homeTeamInfo.abbreviation,
    }
    const awayTeamInfo = teamsInfo.find(
      teamInfo =>
        teamInfo.teamLocationType && teamInfo.teamLocationType.name === "away",
    )
    if (!awayTeamInfo) {
      continue
    }
    const awayTeam: Team = {
      statsID: awayTeamInfo.teamId,
      location: awayTeamInfo.location,
      name: awayTeamInfo.nickname,
      shortName: awayTeamInfo.abbreviation,
    }

    // dynamic ID name, such as "nba-1234" or "nfl-1234"
    const id = `${league.shortName.toLowerCase()}-${event.eventId}`
    const game: Game & Document = {
      id,
      sport: "Football",
      season,
      league,
      teams: {
        home: homeTeam,
        away: awayTeam,
      },
      score: {
        home: 0,
        away: 0,
      },
      venue,
      drive: null,
      status,
      startDate,
      isPaused: false,
    }
    result.push(game)
  }

  return result
}
