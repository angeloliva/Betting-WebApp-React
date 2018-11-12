import { DocumentReference } from "../../../firebase"
import { defer, Observable } from "rxjs"
import { Score } from "../../types/Game/Score"

export const setScore = (
  gameRef: DocumentReference,
  score: Score,
): Observable<void> =>
  defer(() =>
    gameRef.set(
      {
        score,
      },
      { merge: true },
    ),
  )
