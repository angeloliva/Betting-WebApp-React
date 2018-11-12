import { combineLatest, defer, from, interval, NEVER, Observable } from "rxjs"
import { filter, map, scan, switchMap } from "rxjs/operators"
import { ajax } from "rxjs/ajax"
import { GameTime } from "../../Commons/types/GameTime"
import { APIResponse } from "../../Commons/types/STATS/APIResponse"
import { PBPEvent } from "../../Commons/types/STATS/PBPEvent"
import { Season } from "../../Commons/types/STATS/Season"
import { splitGameTime } from "../../Commons/utils/splitGameTime"
import config from "../../config"

export const makeGameTime$: (
  isRunning$: Observable<boolean>,
  gameSpeed$: Observable<number>,
  initialGameTime: GameTime,
) => Observable<GameTime> = (isRunning$, gameSpeed$, initialGameTime) =>
  combineLatest(isRunning$, gameSpeed$).pipe(
    switchMap(
      ([isRunning, gameSpeed]) =>
        isRunning ? interval(1000 / gameSpeed) : NEVER,
    ),
    scan((gameTime: GameTime | null): GameTime => {
      if (gameTime === null) {
        return initialGameTime
      }
      const { min, sec, period } = splitGameTime(gameTime)
      if (min === 0 && sec === 0) {
        // end of period
        return {
          period: period + 1,
          time: "15:00",
        }
      } else if (sec === 0) {
        return {
          period,
          time: `${min - 1}:59`,
        }
      } else {
        return {
          period,
          time: `${min}:${sec - 1}`,
        }
      }
    }, null),
  )

export const sendUpdatesToProcessor$: (
  json$: APIResponse,
  headers?: object,
) => Observable<any> = (json, headers = {}) =>
  ajax.post(config.processorURL, json, {
    "Content-Type": "application/json",
    Authorization: "Bearer byiGDqN7BmRQTX8Uo9OS0VpFgkArIpZLXPNYWzfOqdjRqES7BY",
    ...headers,
  })

// when the game time update, we want to trigger all the events for this game time
export const makeJSONUpdates$: (
  gameTime$: Observable<GameTime>,
) => Observable<APIResponse> = gameTime$ =>
  combineLatest(rawAPIResponse$, gameTime$).pipe(
    map(
      ([statsResponse, gameTime]): APIResponse | null =>
        filterResponseForGameTime(statsResponse, gameTime),
    ),
    filter(Boolean),
  )

const rawAPIResponse$: Observable<APIResponse> = defer(() =>
  from(loadPBPModule()),
)
async function loadPBPModule(): Promise<APIResponse> {
  const module = await import("./Simulator.events")
  return module.default as APIResponse
}

function filterResponseForGameTime(
  statsResponse: APIResponse,
  gameTime: GameTime,
): APIResponse | null {
  const season = statsResponse.apiResults[0].league.season
  if (!season) {
    return null
  }
  const allEvents = season.eventType[0].events[0].pbp

  // find all the events that match the game time, exactly
  const { time, period } = gameTime
  const newEvents = allEvents.filter(
    (event: PBPEvent) => event.period === period && event.time === time,
  )

  if (newEvents.length === 0) {
    return null // no update !
  }

  // we return the "truncated API response
  const lastEventID = newEvents[newEvents.length - 1].playId
  const lastEventGlobalIndex = allEvents.findIndex(
    (event: PBPEvent) => event.playId === lastEventID,
  )
  const truncatedEvents = allEvents.slice(0, lastEventGlobalIndex + 1)

  // not-so-shallow clone of the response
  return cloneResponseChangingEvents(statsResponse, truncatedEvents)
}

function cloneResponseChangingEvents(
  statsResponse: APIResponse,
  pbp: PBPEvent[],
): APIResponse {
  // When we call this method *we know* that season is not null !
  const statsSeason = statsResponse.apiResults[0].league.season as Season
  const event = {
    ...statsSeason.eventType[0].events[0],
  }
  event.pbp = pbp
  const eventType = {
    ...statsSeason.eventType[0],
  }
  eventType.events = [event]
  const season = { ...statsSeason }
  season.eventType = [eventType]
  const league = { ...statsResponse.apiResults[0].league }
  league.season = season
  const apiResult = { ...statsResponse.apiResults[0] }
  apiResult.league = league
  const result: APIResponse = { ...statsResponse }
  result.apiResults = [apiResult]
  return result
}
