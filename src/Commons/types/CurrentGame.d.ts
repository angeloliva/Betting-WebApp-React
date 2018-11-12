import { DocumentReference } from "../../firebase"
import { Document } from "./Document"

// the "current" entries in the "games" collection references the active game
export interface CurrentGame extends Document {
  // A reference to the upcoming / active game (aka. the one displayed in the app)
  ref: DocumentReference
}
