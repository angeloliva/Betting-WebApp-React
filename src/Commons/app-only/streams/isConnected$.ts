import { connectivityStatus$ } from "./connectivityStatus$"
import { Observable } from "rxjs"
import { map, distinctUntilChanged } from "rxjs/operators"

export const isConnected$: Observable<boolean> = connectivityStatus$.pipe(
  map(
    connectivityStatus =>
      connectivityStatus.type != "none" && connectivityStatus.type != "unknown",
  ),
  distinctUntilChanged(),
)
