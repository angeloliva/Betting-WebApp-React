import { DocumentReference, DocumentSnapshot } from "../../../firebase"
import { Observable } from "rxjs"
import { SnapshotsForDoc } from "../../../utils/SnapshotsForDoc"
import { map } from "rxjs/operators"
import { docForSnapshot } from "./docForSnapshot"
import { Document } from "../../types/Document"

export const documentForRef$ = <T>(
  ref: DocumentReference,
): Observable<T & Document> =>
  SnapshotsForDoc(ref).pipe(
    map((snap: DocumentSnapshot) => docForSnapshot<T>(snap)),
  )
