import { Observable } from "rxjs"
import { Document } from "../../types/Document"
import { Game } from "../../types/Game"
import { PBPEvent } from "../../types/STATS/PBPEvent"
import { events$ForGame } from "./events$ForGame"
import { map } from "rxjs/operators"
import { last } from "lodash"

export const lastEvent$ForGame = (
  game: Game & Document,
): Observable<(PBPEvent & Document) | null> =>
  events$ForGame(game).pipe(map(events => last(events) || null))
