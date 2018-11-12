import { CollectionReference } from "../../../firebase"
import { debugRef } from "./debugRef"
import { SnapshotsForQuery } from "../../../utils/SnapshotForQuery"

export const SnapshotsForCollection = (ref: CollectionReference) =>
  SnapshotsForQuery(
    ref,
    process.env.NODE_ENV === "development" ? debugRef(ref) : "",
  )
