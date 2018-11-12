import firebase from "../../../firebase"
import { Observable } from "rxjs"
import { currentUserID$ } from "./currentUserID$"
import { map, publishReplay, refCount } from "rxjs/operators"
import { usersRef } from "../refs"

export const currentUserRef$: Observable<
  firebase.firestore.DocumentReference
> = currentUserID$.pipe(
  map(id => usersRef.doc(id)),
  publishReplay(),
  refCount(),
)
