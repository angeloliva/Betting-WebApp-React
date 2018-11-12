import firebase, { batchMaxSize } from "../../../firebase"
import { usersRef } from "../refs"

const resetPlayerScoreBatch = async (
  fieldName: string,
  score: number,
  operator: ">" | "<",
): Promise<number> => {
  const snap = await usersRef
    .where(fieldName, operator, score)
    .limit(batchMaxSize)
    .get()
  if (snap.size === 0) {
    return 0
  }

  const batch = firebase.firestore().batch()
  snap.forEach(docSnap =>
    batch.set(docSnap.ref, { [fieldName]: score }, { merge: true }),
  )

  await batch.commit()

  return snap.size
}

export const resetPlayerScores = async (score: number) => {
  while (true) {
    // no '!=' operator in firestore
    const [nbUpdatedLower, nbUpdatedGreater] = await Promise.all([
      resetPlayerScoreBatch("credits", score, "<"),
      resetPlayerScoreBatch("credits", score, ">"),
      resetPlayerScoreBatch("currentStreak", 0, "<"),
      resetPlayerScoreBatch("currentStreak", 0, ">"),
      resetPlayerScoreBatch("longestStreak", 0, "<"),
      resetPlayerScoreBatch("longestStreak", 0, ">"),
    ])

    if (nbUpdatedLower === 0 && nbUpdatedGreater === 0) {
      break // nothing
    }
  }
}
