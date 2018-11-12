import firebase from "../firebase"
import { Observable, Observer } from "rxjs"
import { publishReplay, refCount, startWith } from "rxjs/operators"

// The current User: either a firebase.User or null is signed out
//
// Since firebase has partial supports for "Standard" observables (through
// firebase.Observer), this is basically a call to Observable.create.
// I just added a bunch oof debug statements to log the behaviour and check the
// (good) behaviours of publish+refcount
//
export const currentUser$: Observable<firebase.User | null> = Observable.create(
  (observer: Observer<firebase.User | null>) => {
    if (process.env.NODE_ENV === "development") {
      console.debug("[FIREBASE] Subscribing to auth")
    }
    const unsubscribe = firebase.auth().onAuthStateChanged(observer)
    return () => {
      if (process.env.NODE_ENV === "development") {
        console.debug("[FIREBASE] Unubscribing from auth")
      }
      unsubscribe()
    }
  },
  startWith(firebase.auth().currentUser),
).pipe(
  publishReplay(1),
  refCount(),
)
