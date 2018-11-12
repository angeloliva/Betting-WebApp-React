import { defer, Observable } from "rxjs"
import { DocumentReference } from "../../../firebase"
import { Bet } from "../../types/Bet"
import { Game } from "../../types/Game"
import { gamesRef } from "../refs"
import { Document } from "../../types/Document"

// Sets the active game in the firestore
export const updateBet$ = (
  game: Game & Document,
  betID: string,
  update: Partial<Bet>,
): Observable<void> => defer(() => updateBet(game, betID, update))

export const updateBet = (
  game: Game & Document,
  betID: string,
  update: Partial<Bet>,
): Promise<void> => {
  const ref = publicBetRef(game, betID)
  return ref.set(update, { merge: true })
}

const publicBetRef = (
  game: Game & Document,
  betID: string,
): DocumentReference =>
  gamesRef
    .doc(game.id)
    .collection("bets")
    .doc(betID)
