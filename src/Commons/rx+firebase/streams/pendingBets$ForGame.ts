import { Game } from "../../types/Game"
import { Observable } from "rxjs"
import { Bet } from "../../types/Bet"
import { Document } from "../../types/Document"
import { pendingBetsQueryForGame } from "../utils/pendingBetsQueryForGame"
import { collectionForQuery$ } from "../utils/collectionForQuery$"

export const pendingBets$ForGame = (
  game: Game & Document,
): Observable<Array<Bet & Document>> =>
  collectionForQuery$<Bet>(
    pendingBetsQueryForGame(game),
    `pending bets for game #${game.id}`,
  )
