import { CollectionReference } from "../../../firebase"
import { currentGameRef$ } from "./currentGameRef$"
import { map } from "rxjs/operators"
import { Observable } from "rxjs"

export const currentGameEventsRef$: Observable<
  CollectionReference
> = currentGameRef$.pipe(map(ref => ref.collection("events")))
