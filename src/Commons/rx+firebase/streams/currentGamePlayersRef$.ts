import { CollectionReference } from "../../../firebase"
import { currentGameRef$ } from "./currentGameRef$"
import { map, publishReplay, refCount } from "rxjs/operators"
import { Observable } from "rxjs"

export const currentGamePlayersRef$: Observable<
  CollectionReference
> = currentGameRef$.pipe(
  map(ref => ref.collection("players")),
  publishReplay(),
  refCount(),
)
