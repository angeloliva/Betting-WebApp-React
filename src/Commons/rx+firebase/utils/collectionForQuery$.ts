import { Query, QuerySnapshot } from "../../../firebase"
import { Observable } from "rxjs"
import { SnapshotsForQuery } from "../../../utils/SnapshotForQuery"
import { map } from "rxjs/operators"
import { collectionForSnapshot } from "./collectionForSnapshot"
import { Document } from "../../types/Document"

export const collectionForQuery$ = <T>(
  ref: Query,
  description: string,
): Observable<Array<T & Document>> =>
  SnapshotsForQuery(ref, description).pipe(
    map(
      (snap: QuerySnapshot): Array<T & Document> =>
        collectionForSnapshot<T>(snap),
    ),
  )
