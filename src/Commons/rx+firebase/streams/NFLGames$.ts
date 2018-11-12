import { gamesRef } from "../refs"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"
import { Game } from "../../types/Game"
import { collectionForQuery$ } from "../utils/collectionForQuery$"
import { Document } from "../../types/Document"

const NFLGamesQuery = gamesRef
  .where("sport", "==", "Football")
  .orderBy("startDate", "asc")

export const NFLGames$: Observable<
  Array<Game & Document>
> = collectionForQuery$<Game>(NFLGamesQuery, "Current Games").pipe(
  map(games => games.filter(game => game.id !== "current")),
)
