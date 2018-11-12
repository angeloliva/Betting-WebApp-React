import { Document } from "../../types/Document"
import { docForSnapshot } from "./docForSnapshot"
import { QuerySnapshot } from "../../../firebase"

export const collectionForSnapshot = <T>(
  ref: QuerySnapshot,
): Array<T & Document> => {
  const result: Array<T & Document> = []
  ref.forEach(docSnap => result.push(docForSnapshot(docSnap)))
  return result
}
