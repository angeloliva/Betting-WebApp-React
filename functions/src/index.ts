// initialize Firebase
import * as functions from "firebase-functions"
import * as admin from "firebase-admin"
admin.initializeApp()

// load sub-modules
export * from "./users"
export * from "./images"
export * from "./bets"

// load & expose Admin API module
import adminAPI from "./adminAPI"
export const handleAdminAPIRequest = functions
  .runWith({
    timeoutSeconds: 300,
  })
  .https.onRequest(adminAPI)
