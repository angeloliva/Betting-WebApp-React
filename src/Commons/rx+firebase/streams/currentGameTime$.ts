import { Observable } from "rxjs"
import { filter } from "rxjs/operators"
import { GameTime } from "../../types/GameTime"
import { currentGameTimeOrPregame$ } from "./currentGameTimeOrPregame$"

export const currentGameTime$: Observable<
  GameTime
> = currentGameTimeOrPregame$.pipe(
  filter(gameTime => gameTime !== "pre"),
) as Observable<GameTime>
