import firebase, { CollectionReference, batchMaxSize } from "../../../firebase"

export const clearCollection = async (ref: CollectionReference) => {
  while (true) {
    const snap = await ref.limit(batchMaxSize).get()
    if (snap.size === 0) {
      break // nothing to do...
    }

    const batch = firebase.firestore().batch()
    snap.forEach(docSnap => batch.delete(docSnap.ref))
    await batch.commit()

    if (snap.size < batchMaxSize) {
      break // done
    }
  }
}
