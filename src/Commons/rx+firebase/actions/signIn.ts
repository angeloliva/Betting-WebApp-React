import firebase from "../../../firebase"
import { from } from "rxjs"
import { AuthenticateWithEmailAndPassword } from "./AuthenticateWithEmailAndPassword"

export const signIn: AuthenticateWithEmailAndPassword = ({ email, password }) =>
  from(firebase.auth().signInWithEmailAndPassword(email, password))
