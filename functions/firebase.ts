import * as admin from "firebase-admin"
admin.firestore().settings({
  timestampsInSnapshots: true,
})

// export common types & classes
export const Timestamp = admin.firestore.Timestamp
export type Timestamp = admin.firestore.Timestamp
export type DocumentReference = admin.firestore.DocumentReference
export type DocumentSnapshot = admin.firestore.DocumentSnapshot
export type Query = admin.firestore.Query
export type QuerySnapshot = admin.firestore.QuerySnapshot

export default admin
