import { Document } from "../../types/Document"
import { QuerySnapshot } from "../../../firebase"
import { docForSnapshot } from "./docForSnapshot"

export const collectionByIDForSnapshot = <T>(
  ref: QuerySnapshot,
): { string?: T & Document } => {
  const result: { string?: T & Document } = {}
  ref.forEach(docSnap => (result[docSnap.id] = docForSnapshot(docSnap)))
  return result
}
