import firebase from "../../../firebase"
import { Facebook } from "expo"
import {
  AppID,
  permissions as facebookPermissions,
  // @ts-ignore
} from "../../facebook.json"

export async function signInUpWithFacebook(): Promise<firebase.auth.UserCredential | null> {
  // Show the Facebook login UI from Expo and grab an access token
  const { type, token } = await Facebook.logInWithReadPermissionsAsync(AppID, {
    permissions: facebookPermissions,
  })

  // check result => we must handle cancelation *without* throwing !
  if (type !== "success") {
    if (type === "cancel") return null
    throw "Invalid credentials"
  }

  // Create (or sign in) a user in Firebase, given a valid Facebook access token
  const credential = firebase.auth.FacebookAuthProvider.credential(
    token as string,
  )
  return await firebase.auth().signInAndRetrieveDataWithCredential(credential)
}
