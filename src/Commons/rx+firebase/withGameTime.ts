import { map, startWith } from "rxjs/operators"
import { Observable } from "rxjs"
import { withFunction } from "./utils/withFunction"
import { GameTimeOrPre } from "../types/GameTimeOrPre"
import { currentGameTimeOrPregame$ } from "./streams/currentGameTimeOrPregame$"

export type Props = {
  gameTime: GameTimeOrPre
}

const props$: Observable<Props> = currentGameTimeOrPregame$.pipe(
  map(gameTime => ({
    gameTime,
  })),
  startWith({ gameTime: "pre" }),
)

export const withGameTime = withFunction(props$)
