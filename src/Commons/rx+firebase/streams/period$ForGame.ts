import { Observable } from "rxjs"
import { Document } from "../../types/Document"
import { Game } from "../../types/Game"
import { distinctUntilChanged, map } from "rxjs/operators"
import { lastEvent$ForGame } from "./lastEvent$ForGame"

export const period$ForGame = (game: Game & Document): Observable<number> =>
  lastEvent$ForGame(game).pipe(
    map(event => (event ? event.period : 1)),
    distinctUntilChanged(),
  )
