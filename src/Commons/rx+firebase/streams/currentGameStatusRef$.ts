import { DocumentReference } from "../../../firebase"
import { combineLatest, Observable } from "rxjs"
import { currentUserRef$ } from "./currentUserRef$"
import { map, publishReplay, refCount } from "rxjs/operators"
import { currentGameID$ } from "./currentGameID$"

export const currentGameStatusRef$: Observable<
  DocumentReference
> = combineLatest(currentUserRef$, currentGameID$).pipe(
  map(([currentUserRef, gameID]) =>
    currentUserRef.collection("games").doc(gameID),
  ),
  publishReplay(),
  refCount(),
)
