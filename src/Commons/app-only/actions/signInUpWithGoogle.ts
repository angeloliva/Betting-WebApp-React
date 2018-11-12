import firebase from "../../../firebase"
import { Google } from "expo"
import {
  androidClientId,
  iosClientId,
  scopes as googleScopes,
  // @ts-ignore
} from "../../google.json"

export async function signInUpWithGoogle(): Promise<firebase.auth.UserCredential | null> {
  // Show the Google login UI from Expo and grab an access token
  const loginResult = await Google.logInAsync({
    androidClientId,
    iosClientId,
    scopes: googleScopes,
  })

  // detect cancelation
  if (loginResult.type !== "success") {
    return null
  }

  // Create (or sign in) a user in Firebase, given a valid Facebook access token
  const credential = firebase.auth.GoogleAuthProvider.credential(
    loginResult.accessToken,
  )
  return await firebase.auth().signInAndRetrieveDataWithCredential(credential)
}
