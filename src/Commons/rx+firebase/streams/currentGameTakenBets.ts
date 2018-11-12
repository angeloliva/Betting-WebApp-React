import { compareAsc } from "date-fns"
import { Observable } from "rxjs"
import { map, switchMap, publishReplay, refCount } from "rxjs/operators"
import { collectionForRef$ } from "../utils/collectionForRef$"
import { currentGamePlayerTakenBetsRef$ } from "./currentGamePlayerTakenBetsRef$"
import { Document } from "../../types/Document"
import { TakenBet } from "../../types/TakenBet"

export const currentGameTakenBets$: Observable<
  Array<TakenBet & Document>
> = currentGamePlayerTakenBetsRef$.pipe(
  switchMap(ref => collectionForRef$<TakenBet>(ref)),
  map((takenBets: Array<TakenBet & Document>) =>
    takenBets.sort(compareTakenBets),
  ),
  publishReplay(),
  refCount(),
)

const compareTakenBets = (l: TakenBet, r: TakenBet): number => {
  if (!l.takenDate || !r.takenDate) {
    return -1
  }
  return compareAsc(l.takenDate.toDate(), r.takenDate.toDate())
}
