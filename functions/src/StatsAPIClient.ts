import axios, { AxiosInstance, AxiosResponse } from "axios"
import * as moment from "moment"
import * as crypto from "crypto"
import { APIResponse } from "./types/STATS/APIResponse"
import { Game } from "./types/Game"
import { parseGames, parsePlayers, TeamPlayers } from "./Stats.parser"
import { Document } from "./types/Document"

export type EventParams = EventSportInfo & {
  searchParams?: EventSearchParams
}

export type EventSearchParams = SearchPeriod & {
  eventTypeId: SeasonType
}

export type SearchPeriod =
  | {
      season: number
    }
  | {
      week: number
    }
  | {
      date: string
    }

export type SeasonType =
  | 0 // Preseason
  | 1 // Regular Season
  | 2 // Post Season
  | 3 // Pro bowl, All-star game etc.

export type EventSportInfo =
  | {
      sport: "Basketball"
      league: "NBA"
    }
  | {
      sport: "Football"
      league: "NFL"
    }

export default class StatsAPIClient {
  apiKey: string
  apiSecret: string
  client: AxiosInstance

  constructor(apiKey: string, apiSecret: string) {
    this.apiKey = apiKey
    this.apiSecret = apiSecret

    this.client = axios.create({
      baseURL: "http://api.stats.com/v1",
    })
  }

  async getUpcomingEvents(
    options: EventParams,
  ): Promise<Array<Game & Document>> {
    // path depends on the sport we're interseted in !
    const { sport, league, searchParams = {} } = options
    const path = `/stats/${sport.toLowerCase()}/${league.toLowerCase()}/scores/`

    // call Stats.com
    const response: AxiosResponse<APIResponse> = await this.client.get(path, {
      params: {
        accept: "json",
        api_key: this.apiKey,
        sig: this.computeAPISignature(),
        ...searchParams,
      },
    })

    // we want to parse this result info our own api-types
    console.info("Parsing response data")
    return parseGames(response.data)
  }

  async getTeamInfo(teamID: number): Promise<TeamPlayers> {
    const path = `/stats/football/nfl/participants/teams/${teamID}`

    // call Stats.com
    const response: AxiosResponse<APIResponse> = await this.client.get(path, {
      params: {
        accept: "json",
        api_key: this.apiKey,
        sig: this.computeAPISignature(),
      },
    })

    // we want to parse this result info our own api-types
    console.info("Parsing response data")
    return parsePlayers(response.data)
  }

  computeAPISignature() {
    // code betForm http://developer.stats.com/docs/read/Authentication
    const timeFromEpoch = moment.utc().unix()
    const feed = this.apiKey + this.apiSecret + timeFromEpoch
    return crypto
      .createHash("sha256")
      .update(feed)
      .digest("hex")
  }
}
