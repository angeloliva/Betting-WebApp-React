import { Query, QuerySnapshot } from "../firebase"
import { Observable, Observer } from "rxjs"
import { publishReplay, refCount, retry } from "rxjs/operators"

export const SnapshotsForQuery = (
  ref: Query,
  description: string,
): Observable<QuerySnapshot> =>
  Observable.create((observer: Observer<QuerySnapshot>) => {
    if (process.env.NODE_ENV === "development") {
      console.debug(
        "[FIREBASE] Subscribing to (query on) collection:",
        description,
      )
    }
    const unsubscribe = ref.onSnapshot(observer)
    return () => {
      if (process.env.NODE_ENV === "development") {
        console.debug(
          "[FIREBASE] Unsubscribing from (query on) collection:",
          description,
        )
      }
      unsubscribe()
    }
  }).pipe(
    retry(),
    publishReplay(),
    refCount(),
  )
