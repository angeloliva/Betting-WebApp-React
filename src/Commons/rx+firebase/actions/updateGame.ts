import { defer, Observable } from "rxjs"
import { DocumentReference } from "../../../firebase"
import { Game } from "../../types/Game"

// Sets the active game in the firestore
export const updateGame$ = (
  ref: DocumentReference,
  game: Partial<Game>,
): Observable<void> => defer(() => updateGame(ref, game))

export const updateGame = (
  ref: DocumentReference,
  game: Partial<Game>,
): Promise<void> => ref.set(game, { merge: true })
