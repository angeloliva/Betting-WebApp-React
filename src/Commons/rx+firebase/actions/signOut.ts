import firebase from "../../../firebase"
import { from, Observable } from "rxjs"

export const signOut = (): Observable<void> => from(firebase.auth().signOut())
