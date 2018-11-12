import firebase from "../../../firebase"
import { from } from "rxjs"
import { AuthenticateWithEmailAndPassword } from "./AuthenticateWithEmailAndPassword"

export const signUp: AuthenticateWithEmailAndPassword = ({ email, password }) =>
  from(firebase.auth().createUserWithEmailAndPassword(email, password))
