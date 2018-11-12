// Supported Authentication status
// For the Backend, we need to know is the user has the valid claims on his/her token
export type AuthStatus =
  // The user is signed out from Firebase Auth
  | "signedOut"
  // The user is signed in & his/her token holds the "admin" claim
  | "authorized"
  // The user is signed in but his/her token *does not* hold the "admin" claim
  | "unauthorized"
