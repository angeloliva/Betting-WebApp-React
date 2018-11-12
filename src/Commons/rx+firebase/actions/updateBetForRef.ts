// Sets the active game in the firestore
import { DocumentReference } from "../../../firebase"
import { Bet } from "../../types/Bet"

export const updateBetForRef = (
  ref: DocumentReference,
  bet: Bet,
): Promise<void> => ref.set(bet, { merge: true })
