import { NEVER, Observable, of } from "rxjs"
import { currentUser$ } from "../../../utils/currentUser$"
import {
  distinctUntilChanged,
  publishReplay,
  refCount,
  switchMap,
} from "rxjs/operators"

export const currentUserID$: Observable<string> = currentUser$.pipe(
  switchMap(currentUser => (currentUser ? of(currentUser.uid) : NEVER)),
  distinctUntilChanged(),
  publishReplay(1),
  refCount(),
)
