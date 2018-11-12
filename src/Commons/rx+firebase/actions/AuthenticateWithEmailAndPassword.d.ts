import { Credentials } from "../../types/Credentials"
import { UserCredential } from "../../../firebase"
import { Observable } from "rxjs"

export type AuthenticateWithEmailAndPassword = (
  credentials: Credentials,
) => Observable<UserCredential>
