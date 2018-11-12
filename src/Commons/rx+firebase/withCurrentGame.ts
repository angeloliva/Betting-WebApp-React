import { map, startWith } from "rxjs/operators"
import { Observable } from "rxjs"
import { currentGameWithStatus$ } from "./streams/currentGameWithStatus$"
import { GameWithStatus } from "../types/GameWithStatus"
import { withFunction } from "./utils/withFunction"

export interface Props {
  game: GameWithStatus | null
}

const props$: Observable<Props> = currentGameWithStatus$.pipe(
  map(game => ({ game })),
  startWith({ game: null }),
)

export const withCurrentGame = withFunction(props$)
