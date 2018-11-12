import * as admin from "firebase-admin"
import * as functions from "firebase-functions"
import * as express from "express"
import * as cors from "cors"
import { ensureAdminMiddleware, extractAuthInfoMiddleware } from "./apiTools"
import StatsAPIClient, {
  EventParams,
  EventSearchParams,
  EventSportInfo,
  SearchPeriod,
  SeasonType,
} from "./StatsAPIClient"
import { AxiosError } from "axios"
import { teamsRef } from "./admin-types/refs"
import { TeamPlayers } from "./Stats.parser"

const app = express.Router()

// initialize API client from the env settings (names HAVE TO be snake case !)
// noinspection TsLint
const { api_key, api_secret } = functions.config().stats
// noinspection TsLint
// const api_secret = "ww7ZRGNCA6"
// noinspection TsLint
// const api_key = "6m86w94q6exce7yg67k8bsbf"
// const api_secret = "MVdrTZVrVD"
// const api_key = "pqq7qgspb4v7gtmjtq5jz57s"
const api = new StatsAPIClient(api_key, api_secret)

app.use(cors({ origin: true }))
app.use(extractAuthInfoMiddleware)
app.use(ensureAdminMiddleware)

const gamesRef = admin.firestore().collection("games")

app.get("/upcomingGames", async (req, res) => {
  try {
    // First we parse the "league" parameter
    const leagueInfo = parseLeague(req.query)

    // Then the additional search parameters
    const searchParams = parseSearchParams(req.query)

    // Finally we load games from stats.com
    const games = await loadGames({
      ...leagueInfo,
      searchParams,
    })

    // and return the game info
    res.json(games)
  } catch (err) {
    failOnError(res, err)
  }
})

app.get("/teamInfo/:teamID", async (req, res) => {
  try {
    const teamID = parseInt(req.params.teamID, 10) || 0
    if (teamID === 0) {
      throw new Error("Invalid team ID")
    }

    // we load the players (into Firestore)
    const { team } = await loadPlayers(teamID)

    // and also respond with the players data
    res.json(team)
  } catch (err) {
    failOnError(res, err)
  }
})

function parseLeague(params: any): EventSportInfo {
  const { league } = params
  switch (params.league) {
    case "NBA":
      return {
        league,
        sport: "Basketball",
      }
    case "NFL":
      return {
        league,
        sport: "Football",
      }
  }
  throw new Error("Unrecognized league")
}

function parseSearchParams(params: any): EventSearchParams {
  const period = parseSearchPeriod(params)
  const eventTypeId = parseSeasonType(params)
  return {
    ...period,
    eventTypeId,
  }
}

function parseSeasonType(params: any): SeasonType {
  switch (params.seasonType) {
    case "preseason":
      return 0
    case "regular":
      return 1
    case "postseason":
      return 2
    case "special":
      return 3
  }
  // not recognized -> default to Regular season
  return 1
}

function parseSearchPeriod(params: any): SearchPeriod {
  // check presence of params
  if (params.season) {
    const season = parseInt(params.season, 10)
    return { season }
  }
  if (params.week) {
    const week = parseInt(params.week, 10)
    return { week }
  }
  if (params.date) {
    const date = params.date
    return { date }
  }

  // By default, reload the full season
  const currentSeason = new Date().getFullYear()
  return { season: currentSeason }
}

async function loadPlayers(teamID: number): Promise<TeamPlayers> {
  console.info(`Loading players info for team #${teamID}`)

  // load players from stats.com
  const { team, players } = await api.getTeamInfo(teamID)
  console.info(`Found ${players.length} players for team #${teamID}`)

  // main ref for the team
  const teamRef = teamsRef.doc(teamID.toString())
  const playersRef = teamRef.collection("players")

  // update the player info in the Firestore
  const batch = admin.firestore().batch()
  batch.set(teamRef, team, { merge: true })
  // for (const player of players) {
  for (const player of players) {
    const ref = playersRef.doc(player.playerId.toString())
    batch.set(ref, player, { merge: true })
  }

  console.info(
    `Saving ${players.length} players and related info for team #${teamID}`,
  )
  await batch.commit()

  return { team, players }
}

async function loadGames(params: EventParams) {
  // load games from stats.com
  const games = await api.getUpcomingEvents(params)

  // update game info in the firestore
  let count = 0
  let batch = admin.firestore().batch()
  const commitedBatches: Array<Promise<any>> = []
  for (const game of games) {
    const { id, ...data } = game
    const ref = gamesRef.doc(id)
    batch.set(
      ref,
      {
        gameID: id,
        score: {
          home: 0,
          away: 0,
        },
        ...data,
      },
      { merge: true },
    )

    // limit batch size to 500
    count += 1
    if (count % 499 === 0) {
      commitedBatches.push(batch.commit())
      count = 0
      batch = admin.firestore().batch()
    }
  }
  commitedBatches.push(batch.commit())
  await Promise.all(commitedBatches)

  return games
}

interface ErrorJson {
  status: string
  description: string
  request?: {
    host: string
    path: string
  }
  response?: {
    data: any
  }
}

// failure on axios error
function failOnError(res: express.Response, err: Error) {
  const response: ErrorJson = {
    status: "error",
    description: err.message,
  }
  const axiosError = err as AxiosError
  if (axiosError.response) {
    response.request = {
      host: axiosError.request.host,
      path: axiosError.request.path,
    }
    response.response = {
      data: axiosError.response.data,
    }
  }
  res.status(500).json(response)
}

// mount the router on top of /admin-api
export default express().use("/admin-api", app)
