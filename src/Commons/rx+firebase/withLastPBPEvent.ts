import { Observable } from "rxjs"
import { map, startWith } from "rxjs/operators"
import { PBPEvent } from "../types/PBPEvent"
import { currentGameLastEvent$ } from "./streams/currentGameLastEvent$"
import { withFunction } from "./utils/withFunction"

export type Props = {
  lastEvent: PBPEvent | null
}

const props$: Observable<Props> = currentGameLastEvent$.pipe(
  map(event => ({ lastEvent: event })),
  startWith({ lastEvent: null }),
)

export const withLastPBPEvent = withFunction(props$)
