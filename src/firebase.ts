import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"
import { ObservableConfig, setObservableConfig } from "recompose"
import { from } from "rxjs"
import config from "./config"

// export common types & classes
export const Timestamp = firebase.firestore.Timestamp
export type Timestamp = firebase.firestore.Timestamp
export type DocumentReference = firebase.firestore.DocumentReference
export type DocumentSnapshot = firebase.firestore.DocumentSnapshot
export type CollectionReference = firebase.firestore.CollectionReference
export type FieldValue = firebase.firestore.FieldValue
export const FieldValue = firebase.firestore.FieldValue
export type Query = firebase.firestore.Query
export type QuerySnapshot = firebase.firestore.QuerySnapshot
export type UserCredential = firebase.auth.UserCredential

export const batchMaxSize = 499

// @ts-ignore
firebase.initializeApp(config)

firebase.firestore().settings({
  timestampsInSnapshots: true,
})

export const observableConfig: ObservableConfig = {
  fromESObservable: from,
  toESObservable: stream => stream,
}
setObservableConfig(observableConfig)

export default firebase
