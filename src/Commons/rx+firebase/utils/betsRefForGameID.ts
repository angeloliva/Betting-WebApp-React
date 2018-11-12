import { gamesRef } from "../refs"
import { CollectionReference } from "../../../firebase"

export const betsRefForGameID = (gameID: string): CollectionReference =>
  gamesRef.doc(gameID).collection("bets")
