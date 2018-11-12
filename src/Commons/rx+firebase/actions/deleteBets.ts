import firebase from "../../../firebase"
import { Bet } from "../../types/Bet"
import { Game } from "../../types/Game"
import { Document } from "../../types/Document"
import { betsRefForGame } from "../utils/betsRefForGame"

export const deleteBets = async (
  game: Game & Document,
  bets: Array<Bet & Document>,
): Promise<void> => {
  const batch = firebase.firestore().batch()
  for (const bet of bets) {
    const pendingRef = betsRefForGame(game).doc(bet.id)
    batch.delete(pendingRef)
  }
  await batch.commit()
}
