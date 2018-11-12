import { Observable } from "rxjs"
import { Document } from "../../types/Document"
import { Game } from "../../types/Game"
import { lastEvent$ForGame } from "./lastEvent$ForGame"
import { distinctUntilChanged, map } from "rxjs/operators"
import { GameTimeOrPre } from "../../types/GameTimeOrPre"

export const currentGameTimeOrPregame$ForGame = (
  game: Game & Document,
): Observable<GameTimeOrPre> =>
  lastEvent$ForGame(game).pipe(
    map(
      event =>
        event
          ? {
              period: event.period,
              time: event.time,
            }
          : ("pre" as GameTimeOrPre),
    ),
    distinctUntilChanged(),
  )
