import { DocumentSnapshot } from "../../../firebase"
import { Document } from "../../types/Document"

export const docForSnapshot = <T>(snap: DocumentSnapshot): T & Document =>
  ({
    ...snap.data(),
    id: snap.id,
  } as T & Document)
