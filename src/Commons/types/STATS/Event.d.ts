import { EventRound } from "./EventRound"
import { IsDataConfirmed } from "./IsDataConfirmed"
import { EventStatus } from "./EventStatus"
import { Venue } from "./Venue"
import { TvStation } from "./TvStation"
import { Team } from "./Team"
import { CoverageLevel } from "./CoverageLevel"
import { PBPEvent } from "./PBPEvent"
import { StartDate } from "./StartDate"

export interface Event {
  eventId: number
  eventRound: EventRound
  eventTitle: string
  startDate?: StartDate[] | null
  isTba: boolean
  isDataConfirmed: IsDataConfirmed
  eventStatus: EventStatus
  venue: Venue
  tvStations?: TvStation[] | null
  teams?: Team[] | null
  week: number
  coverageLevel: CoverageLevel
  pbp: PBPEvent[]
}
