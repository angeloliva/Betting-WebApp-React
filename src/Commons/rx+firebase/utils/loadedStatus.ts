import { pipe } from "rxjs"
import {
  distinctUntilChanged,
  mapTo,
  publishReplay,
  refCount,
  startWith,
} from "rxjs/operators"

export const loadedStatus = () =>
  pipe(
    mapTo(true),
    startWith(false),
    distinctUntilChanged(),
    publishReplay(),
    refCount(),
  )
