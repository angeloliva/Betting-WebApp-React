import { Observable } from "rxjs"
import { switchMap, take } from "rxjs/operators"
import { currentGamePlayerRef$ } from "../streams/currentGamePlayerRef$"

export const enterGame = (isEntered: boolean): Observable<void> =>
  currentGamePlayerRef$.pipe(
    switchMap(currentGamePlayersRef =>
      currentGamePlayersRef.set(
        {
          isEntered,
        },
        { merge: true },
      ),
    ),
    take(1),
  )
