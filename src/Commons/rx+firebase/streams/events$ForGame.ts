import { Observable } from "rxjs"
import { Document } from "../../types/Document"
import { collectionForRef$ } from "../utils/collectionForRef$"
import { eventsRefForGame } from "../utils/eventsRefForGame"
import { Game } from "../../types/Game"
import { PBPEvent } from "../../types/STATS/PBPEvent"
import { map } from "rxjs/operators"
import { compareGameTimes } from "../../utils/compareGameTimes"

export const events$ForGame = (
  game: Game & Document,
): Observable<Array<PBPEvent & Document>> =>
  collectionForRef$<PBPEvent>(eventsRefForGame(game)).pipe(
    map(events => events.sort(compareGameTimes)),
  )
