import { Game } from "../../types/Game"
import { Observable } from "rxjs"
import { Bet } from "../../types/Bet"
import { Document } from "../../types/Document"
import { templateBetsQueryForGame } from "../utils/templateBetsQueryForGame"
import { collectionForQuery$ } from "../utils/collectionForQuery$"

export const templateBets$ForGame = (
  game: Game & Document,
): Observable<Array<Bet & Document>> =>
  collectionForQuery$<Bet>(
    templateBetsQueryForGame(game),
    `template bets for game #${game.id}`,
  )
