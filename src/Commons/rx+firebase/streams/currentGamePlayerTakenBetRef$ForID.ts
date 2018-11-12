import { DocumentReference } from "../../../firebase"
import { Observable } from "rxjs"
import { map, publishReplay, refCount } from "rxjs/operators"
import { currentGamePlayerTakenBetsRef$ } from "./currentGamePlayerTakenBetsRef$"

export const currentGamePlayerTakenBetRef$ForID = (
  betID: string,
): Observable<DocumentReference> =>
  currentGamePlayerTakenBetsRef$.pipe(
    map(takenBetsRef => takenBetsRef.doc(betID)),
    publishReplay(),
    refCount(),
  )
