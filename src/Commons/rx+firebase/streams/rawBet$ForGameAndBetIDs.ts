import { Observable } from "rxjs"
import { documentForRef$ } from "../utils/documentForRef$"
import { Bet } from "../../types/Bet"
import { Document } from "../../types/Document"
import { betsRefForGameID } from "../utils/betsRefForGameID"

export const rawBet$ForGameAndBetIDs = (
  gameID: string,
  betID: string,
): Observable<Bet & Document> => {
  const ref = betsRefForGameID(gameID).doc(betID)
  return documentForRef$<Bet>(ref)
}
