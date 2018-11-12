import { DocumentReference } from "../../../firebase"
import { combineLatest, Observable } from "rxjs"
import { map, publishReplay, refCount } from "rxjs/operators"
import { currentUserID$ } from "./currentUserID$"
import { currentGamePlayersRef$ } from "./currentGamePlayersRef$"

export const currentGamePlayerRef$: Observable<
  DocumentReference
> = combineLatest(currentUserID$, currentGamePlayersRef$).pipe(
  map(([currentUserID, playersRef]) => playersRef.doc(currentUserID)),
  publishReplay(),
  refCount(),
)
