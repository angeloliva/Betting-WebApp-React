import firebase from "../../firebase"

export const usersRef = firebase.firestore().collection("users")
export const gamesRef = firebase.firestore().collection("games")
export const teamsRef = firebase.firestore().collection("teams")
export const currentGameRef = gamesRef.doc("current")

// simulator-specifig
export const superBowlID = "super-bowl"
export const superBowlRef = gamesRef.doc(superBowlID)
export const superBowlBetsRef = superBowlRef.collection("bets")
export const superBowlEventsRef = superBowlRef.collection("events")
