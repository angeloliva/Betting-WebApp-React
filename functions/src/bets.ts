// Firebase dependencies
import * as admin from "firebase-admin"
import * as functions from "firebase-functions"
import { Bet } from "./types/Bet"
import { PlayerStatus } from "./types/PlayerStatus"
import { Profile } from "./types/Profile"
import { TakenBet } from "./types/TakenBet"
import { Document } from "./types/Document"
import { DocumentReference } from "../firebase"

interface Params {
  gameID: string
  betID: string
}

// refs to global collections
const usersRef = admin.firestore().collection("users")
const gamesRef = admin.firestore().collection("games")

export const updateScore = functions.firestore
  .document("games/{gameID}/bets/{betID}")
  .onUpdate(async (change, context) => {
    const bet = change.after.data() as Bet
    if (!bet.isResolved) {
      return
    }
    const oldValue = (change.before.get("isResolved") as boolean) || false
    if (bet.isResolved === oldValue) {
      return
    }

    // bet just resolved !
    const { gameID, betID } = context.params as Params
    console.info(`Found new resolution update for bet ${betID}`)
    const gameRef = gamesRef.doc(gameID)

    // step 1: we need to find the players that entered the bet
    console.info(`Looking up users that entered the bet`)
    const playerStatuses = await loadPlayerStatuses(gameRef, betID)
    if (playerStatuses.length === 0) {
      console.info("Found no players who entered this bet: aborting")
      return
    }

    // group player info for ease of use
    const playerIDs = playerStatuses.map(playerStatus => playerStatus.id)
    const statusByPlayerID: Map<
      string,
      PlayerStatus & TakenBet & Document
    > = new Map()
    for (const status of playerStatuses) {
      statusByPlayerID.set(status.id, status)
    }

    // prepare a batch for the updates
    const batch = admin.firestore().batch()

    // prepare a bunch of refs...
    const playerStatusesRef = gameRef.collection("players")

    if (bet.isSuccess) {
      // step 2a: if the bet is won, we need to update the credits

      console.info(`Looking up players initial credits`)
      const profileByID = await loadPlayerProfiles(playerIDs)

      console.info(`Pushing up new status for ${profileByID.size} users`)
      for (const [id, profile] of profileByID.entries()) {
        const status: PlayerStatus & TakenBet = statusByPlayerID.get(id)
        const playerRef = usersRef.doc(id)

        const currentStreak = (status.currentStreak || 0) + bet.odds
        const credits = profile.credits + (bet.odds + 1) * status.wager
        const currentGameLongestStreak =
          currentStreak > (status.longestStreak || 0)
            ? currentStreak
            : status.longestStreak
        const globalLongestStreak =
          currentStreak > (profile.longestStreak || 0)
            ? currentStreak
            : profile.longestStreak

        // update points
        if (status.isPointBet) {
          batch.set(playerRef, { credits }, { merge: true })
        }

        // update streak
        if (status.isStreakBet) {
          // for the current game
          const playerStatusRef = playerStatusesRef.doc(id)
          const update: Partial<PlayerStatus> = { currentStreak }
          if (currentStreak !== status.currentStreak) {
            update.currentStreak = currentStreak
          }
          if (currentGameLongestStreak !== status.longestStreak) {
            update.longestStreak = currentGameLongestStreak
          }
          batch.set(playerStatusRef, update, { merge: true })

          // on all games
          const updateProfile: Partial<Profile> = {}
          if (currentStreak !== profile.currentStreak) {
            update.currentStreak = currentStreak
          }
          if (globalLongestStreak !== profile.longestStreak) {
            update.longestStreak = globalLongestStreak
          }
          batch.set(playerRef, update, { merge: true })
        }
      }
    } else {
      // step 2b: if the bet is lost we reset the "current streak"

      for (const id of playerIDs) {
        const playerStatusRef = playerStatusesRef.doc(id)
        const playerRef = usersRef.doc(id)
        const update = { currentStreak: 0 }
        batch.set(playerStatusRef, update, { merge: true })
        batch.set(playerRef, update, { merge: true })
      }
    }

    // step 3: finally we commit all the changes at once
    await batch.commit()
  })

export const loadPlayerStatuses = async (
  gameRef,
  betID,
): Promise<Array<PlayerStatus & TakenBet & Document>> => {
  const playersRef = gameRef.collection("players")
  const playersSnap = await playersRef.get()

  const playerStatusPromises: Array<
    Promise<PlayerStatus & TakenBet & Document>
  > = playersSnap.docs.map(async docSnap => {
    const playerStatus = docSnap.data()
    const takenBet = await playersRef
      .doc(docSnap.id)
      .collection("takenBets")
      .doc(betID)
      .get()
    if (takenBet.exists) {
      return {
        ...takenBet.data(),
        ...playerStatus,
        id: docSnap.id,
      }
    }
    return null
  })

  const playerStatusesWithBet = await Promise.all(playerStatusPromises)
  return playerStatusesWithBet.filter(status => status !== null)
}

const loadPlayerProfiles = async (playerIDs): Promise<Map<string, Profile>> => {
  const profileRefs: DocumentReference[] = playerIDs.map(id => usersRef.doc(id))
  const snaps = await admin.firestore().getAll(...profileRefs)
  const profileByID = new Map()
  for (const docSnap of snaps) {
    const credits: number = docSnap.get("credits") || 0
    profileByID.set(docSnap.id, docSnap.data())
  }
  return profileByID
}
