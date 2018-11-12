import { publishReplay, refCount, switchMap } from "rxjs/operators"
import { Observable } from "rxjs"
import { Document } from "../../types/Document"
import { Bet } from "../../types/Bet"
import { RawTimestamped } from "../../types/Timestamped"
import { currentGameBetsQuery$ } from "./currentGameBetsQuery$"
import { collectionForQuery$ } from "../utils/collectionForQuery$"

export const currentGameBets$: Observable<
  Array<Bet & Document & RawTimestamped>
> = currentGameBetsQuery$.pipe(
  switchMap(ref =>
    collectionForQuery$<Bet & RawTimestamped>(ref, "current game bets"),
  ),
  publishReplay(),
  refCount(),
)
