import { Observable } from "rxjs"
import { currentGameStatusRef$ } from "./currentGameStatusRef$"
import { switchMap } from "rxjs/operators"
import { GameStatus, GameStatusDocument } from "../../types/GameWithStatus"
import { documentForRef$ } from "../utils/documentForRef$"

export const currentGameStatus$: Observable<
  GameStatus
> = currentGameStatusRef$.pipe(
  switchMap(ref => documentForRef$<GameStatusDocument>(ref)),
)
