// Firebase dependencies
import * as admin from "firebase-admin"
import * as functions from "firebase-functions"

// Default display name for newly-created accounts
const defaultName = "Better"

//
// Initialize user profile info on new registrations
//
export const createProfile = functions.auth.user().onCreate(async user => {
  // build initial values for profile
  const { uid, displayName, photoURL } = user
  const profile = {
    displayName: displayName || defaultName,
    photoURL,
    credits: 20,
    streak: 0,
  }

  // and save it to Firebsae
  const ref = admin
    .firestore()
    .collection("users")
    .doc(uid)
  await ref.set(profile)
})

//
// Adds the "admin" custom claim to user accounts, depending on their email address
//
export const setCustomAdminClaim = functions.auth
  .user()
  .onCreate(async user => {
    const { email, uid } = user

    // only process emails under the noce.fr domain
    if (!email || !email.endsWith("@noce.fr")) {
      return
    }

    // we upgrade the user as admin
    await admin.auth().setCustomUserClaims(uid, { admin: true })
  })
