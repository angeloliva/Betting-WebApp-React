import { CollectionReference } from "../../../firebase"
import { Observable } from "rxjs"
import { map, publishReplay, refCount } from "rxjs/operators"
import { currentGamePlayerRef$ } from "./currentGamePlayerRef$"

export const currentGamePlayerTakenBetsRef$: Observable<
  CollectionReference
> = currentGamePlayerRef$.pipe(
  map(ref => ref.collection("takenBets")),
  publishReplay(),
  refCount(),
)
