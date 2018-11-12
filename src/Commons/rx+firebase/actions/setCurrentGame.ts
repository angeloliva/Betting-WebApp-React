import { DocumentReference } from "../../../firebase"
import { currentGameRef } from "../refs"
import { from, Observable } from "rxjs"

// Sets the active game in the firestore
export const setCurrentGame = (ref: DocumentReference): Promise<void> =>
  currentGameRef.set({
    isStarted: false,
    ref,
  })

export const setCurrentGame$ = (ref: DocumentReference): Observable<void> =>
  from(setCurrentGame(ref))
