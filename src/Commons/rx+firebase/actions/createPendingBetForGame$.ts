import { DocumentReference } from "../../../firebase"
import { Bet } from "../../types/Bet"
import { Game } from "../../types/Game"
import { createBetForRef } from "./createBetForRef"
import { from, Observable } from "rxjs"
import { Document } from "../../types/Document"
import { betsRefForGame } from "../utils/betsRefForGame"

// Sets the active game in the firestore
export const createPendingBetForGame = <T extends Bet>(
  bet: Bet,
  game: Game & Document,
): Promise<DocumentReference> => createBetForRef(betsRefForGame(game), bet)

export const createPendingBetForGame$ = <T extends Bet>(
  bet: Bet,
  game: Game & Document,
): Observable<DocumentReference> => from(createPendingBetForGame(bet, game))
