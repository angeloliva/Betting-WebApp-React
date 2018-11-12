import { combineLatest, Observable } from "rxjs"
import { switchMap, take } from "rxjs/operators"
import { currentGamePlayerTakenBetRef$ForID } from "../streams/currentGamePlayerTakenBetRef$ForID"
import { DocumentReference, FieldValue } from "../../../firebase"
import { Profile } from "../../types/Profile"
import { Document } from "../../types/Document"
import firebase from "../../../firebase"
import { usersRef } from "../refs"
import { profile$ } from "../streams/profile$"

// Sets the active game in the firestore
export const enterBet = (betID: string, wager: number): Observable<void> =>
  combineLatest(profile$, currentGamePlayerTakenBetRef$ForID(betID)).pipe(
    take(1),
    switchMap(([profile, currentGamePlayerTakenBetRef]) =>
      enterBetBatch(profile, currentGamePlayerTakenBetRef, wager),
    ),
  )

const enterBetBatch = (
  profile: Profile & Document,
  currentGamePlayerTakenBetRef: DocumentReference,
  wager: number,
): Promise<void> => {
  const batch = firebase.firestore().batch()
  const hasEnoughCredit = profile.credits >= wager
  // Add the bet ID to the list of joined bets for this user (on this game)
  batch.set(
    currentGamePlayerTakenBetRef,
    {
      wager,
      isStreakBet: true,
      isPointBet: hasEnoughCredit,
      takenDate: FieldValue.serverTimestamp(),
    },
    { merge: true },
  )
  // And remove immediately 'wager' points from the user profile in case it is a point bet
  const profileRef = usersRef.doc(profile.id)
  batch.set(
    profileRef,
    {
      credits: hasEnoughCredit ? profile.credits - wager : profile.credits,
    },
    { merge: true },
  )

  return batch.commit()
}
