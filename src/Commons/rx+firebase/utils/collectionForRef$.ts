import { CollectionReference, QuerySnapshot } from "../../../firebase"
import { Observable } from "rxjs"
import { SnapshotsForCollection } from "./SnapshotsForCollection"
import { map } from "rxjs/operators"
import { collectionForSnapshot } from "./collectionForSnapshot"
import { Document } from "../../types/Document"

export const collectionForRef$ = <T>(
  ref: CollectionReference,
): Observable<Array<T & Document>> =>
  SnapshotsForCollection(ref).pipe(
    map((snap: QuerySnapshot) => collectionForSnapshot<T>(snap)),
  )
