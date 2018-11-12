import {
  CollectionReference,
  DocumentReference,
  Timestamp,
} from "../../../firebase"
import { PBPEvent } from "../../types/PBPEvent"

// Sets the active game in the firestore
export const createPBPEventForRef = (
  ref: CollectionReference,
  data: PBPEvent,
): Promise<DocumentReference> =>
  ref.add({
    timestamp: Timestamp.now(),
    ...data,
  })
