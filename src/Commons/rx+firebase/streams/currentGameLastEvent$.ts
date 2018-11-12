import { Observable } from "rxjs"
import { currentGameEvents$ } from "./currentGameEvents$"
import { map, publishReplay, refCount } from "rxjs/operators"
import { last } from "lodash"
import { PBPEvent } from "../../types/PBPEvent"

export const currentGameLastEvent$: Observable<PBPEvent | null> = currentGameEvents$.pipe(
  map(events => last(events) || null),
  publishReplay(),
  refCount(),
)
