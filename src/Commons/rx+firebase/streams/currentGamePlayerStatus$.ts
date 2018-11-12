import { map, publishReplay, refCount, switchMap } from "rxjs/operators"
import { Observable } from "rxjs"
import { Document } from "../../types/Document"
import { documentForRef$ } from "../utils/documentForRef$"
import { PlayerStatus } from "../../types/PlayerStatus"
import { currentGamePlayerRef$ } from "./currentGamePlayerRef$"

export const currentGamePlayerStatus$: Observable<
  PlayerStatus & Document
> = currentGamePlayerRef$.pipe(
  switchMap(ref => documentForRef$<PlayerStatus>(ref)),
  map(status => ({
    id: status.id,
    isEntered: status.isEntered || false,
    currentStreak: status.currentStreak || 0,
    longestStreak: status.longestStreak || 0,
  })),
  publishReplay(),
  refCount(),
)
