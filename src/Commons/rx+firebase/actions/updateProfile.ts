import firebase from "../../../firebase"
import { Observable } from "rxjs"
import { currentUser$ } from "../../../utils/currentUser$"
import { filter, switchMap, take } from "rxjs/operators"
import { usersRef } from "../refs"
import { Profile } from "../../types/Profile"

export type ProfileUpdate = Partial<Profile>

// Update the profile info
export const updateProfile = (update: ProfileUpdate): Observable<void> =>
  currentUser$.pipe(
    filter(Boolean),
    switchMap((currentUser: firebase.User) =>
      usersRef.doc(currentUser.uid).set(update, { merge: true }),
    ),
    take(1),
  )
