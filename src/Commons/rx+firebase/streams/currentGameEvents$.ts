import { map, publishReplay, refCount, switchMap } from "rxjs/operators"
import { Observable } from "rxjs"
import { PBPEvent } from "../../types/PBPEvent"
import { currentGameEventsRef$ } from "./currentGameEventsRef$"
import { collectionForRef$ } from "../utils/collectionForRef$"
import { Document } from "../../types/Document"
import { compareGameTimes } from "../../utils/compareGameTimes"

export const currentGameEvents$: Observable<
  Array<PBPEvent & Document>
> = currentGameEventsRef$.pipe(
  switchMap(ref => collectionForRef$<PBPEvent>(ref)),
  map(events => events.sort(compareGameTimes)),
  publishReplay(),
  refCount(),
)
