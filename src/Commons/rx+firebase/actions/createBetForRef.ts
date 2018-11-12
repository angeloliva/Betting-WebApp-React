import {
  CollectionReference,
  DocumentReference,
  FieldValue,
} from "../../../firebase"
import { Bet } from "../../types/Bet"

// Sets the active game in the firestore
export const createBetForRef = (
  ref: CollectionReference,
  bet: Bet,
): Promise<DocumentReference> =>
  ref.add({
    ...bet,
    serverTimestamp: FieldValue.serverTimestamp(),
  })
