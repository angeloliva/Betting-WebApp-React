import { DocumentReference, DocumentSnapshot } from "../firebase"
import { asyncScheduler, Observable, Observer } from "rxjs"
import { publishReplay, refCount, retry } from "rxjs/operators"
import { debugRef } from "../Commons/rx+firebase/utils/debugRef"

export const SnapshotsForDoc = (
  ref: DocumentReference,
): Observable<DocumentSnapshot> =>
  Observable.create((observer: Observer<DocumentSnapshot>) => {
    if (process.env.NODE_ENV === "development") {
      console.debug("[FIREBASE] Subscribing to document:", debugRef(ref))
    }
    const unsubscribe = ref.onSnapshot(observer)
    return () => {
      if (process.env.NODE_ENV === "development") {
        console.debug("[FIREBASE] Unsubscribing from document:", debugRef(ref))
      }
      unsubscribe()
    }
  }).pipe(
    retry(),
    publishReplay(1, 1, asyncScheduler),
    refCount(),
  )
