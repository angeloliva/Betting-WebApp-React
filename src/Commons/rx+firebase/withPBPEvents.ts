import { Observable } from "rxjs"
import { map, startWith } from "rxjs/operators"
import { PBPEvent } from "../types/PBPEvent"
import { currentGameEvents$ } from "./streams/currentGameEvents$"
import { withFunction } from "./utils/withFunction"

export type Props = {
  eventsLoaded: boolean
  events: PBPEvent[]
}

const props$: Observable<Props> = currentGameEvents$.pipe(
  map(events => ({
    eventsLoaded: true,
    events,
  })),
  startWith({
    eventsLoaded: false,
    events: [],
  }),
)

export const withPBPEvents = withFunction(props$)
