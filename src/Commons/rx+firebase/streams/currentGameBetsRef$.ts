import { CollectionReference } from "../../../firebase"
import { currentGameRef$ } from "./currentGameRef$"
import { map, publishReplay, refCount } from "rxjs/operators"
import { Observable } from "rxjs"

export const currentGameBetsRef$: Observable<
  CollectionReference
> = currentGameRef$.pipe(
  map(ref => ref.collection("bets")),
  publishReplay(),
  refCount(),
)
