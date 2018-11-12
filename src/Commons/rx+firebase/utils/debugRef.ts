import firebase from "../../../firebase"

// Recursively print a Firestore reference
export function debugRef(
  ref:
    | firebase.firestore.DocumentReference
    | firebase.firestore.CollectionReference,
  path = "",
): string {
  const newPath = `/${ref.id}${path}`
  return ref.parent ? debugRef(ref.parent, newPath) : newPath
}
