import { map, startWith } from "rxjs/operators"
import { Observable } from "rxjs"
import { isLive$ } from "./streams/isLive$"
import { withFunction } from "./utils/withFunction"

export type Props =
  | {
      isLiveLoaded: false
    }
  | {
      isLiveLoaded: true
      isLive: boolean
    }

const props$: Observable<Props> = isLive$.pipe(
  map(
    (isLive: boolean): Props => ({
      isLiveLoaded: true,
      isLive,
    }),
  ),
  startWith({
    isLiveLoaded: false,
  } as Props),
)

export const withIsLive = withFunction(props$)
