import { combineLatest, Observable } from "rxjs"
import { currentGame$ } from "./currentGame$"
import { map, publishReplay, refCount } from "rxjs/operators"
import { GameWithStatus } from "../../types/GameWithStatus"
import { currentGamePlayerStatus$ } from "./currentGamePlayerStatus$"

export const currentGameWithStatus$: Observable<GameWithStatus> = combineLatest(
  currentGame$,
  currentGamePlayerStatus$,
).pipe(
  map(([currentGame, currentGamePlayerStatus]) => ({
    ...currentGame,
    // add the "isEntered field", which is relative to the current User
    isEntered: currentGamePlayerStatus.isEntered,
    currentStreak: currentGamePlayerStatus.currentStreak,
    longestStreak: currentGamePlayerStatus.longestStreak,
  })),
  publishReplay(),
  refCount(),
)
