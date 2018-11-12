import firebase from "../../../firebase"
import { Bet } from "../../types/Bet"
import { Game } from "../../types/Game"
import { betsRefForGame } from "../utils/betsRefForGame"
import { Document } from "../../types/Document"

export const confirmPendingBets = async (
  game: Game & Document,
  bets: Array<Bet & Document>,
): Promise<void> => {
  // Make all selected bets public
  const batch = firebase.firestore().batch()
  for (const bet of bets) {
    const betRef = betsRefForGame(game).doc(bet.id)
    batch.update(betRef, { isPublic: true })
  }
  await batch.commit()
}
