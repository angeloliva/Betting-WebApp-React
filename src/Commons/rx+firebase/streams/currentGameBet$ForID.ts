import { Observable } from "rxjs"
import { switchMap, publishReplay, refCount } from "rxjs/operators"
import { documentForRef$ } from "../utils/documentForRef$"
import { Document } from "../../types/Document"
import { currentGameBetsRef$ } from "./currentGameBetsRef$"
import { Bet } from "../../types/Bet"

export const currentGameBet$ForID = (
  betID: string,
): Observable<Bet & Document> =>
  currentGameBetsRef$.pipe(
    switchMap(betsRef => documentForRef$<Bet & Document>(betsRef.doc(betID))),
    publishReplay(),
    refCount(),
  )
