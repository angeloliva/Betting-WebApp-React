import { Query, QuerySnapshot } from "../../../firebase"
import { Document } from "../../types/Document"
import { Observable } from "rxjs"
import { SnapshotsForQuery } from "../../../utils/SnapshotForQuery"
import { map } from "rxjs/operators"
import { collectionByIDForSnapshot } from "./collectionByIDForSnapshot"

export const collectionByIDForQuery$ = <T>(
  ref: Query,
  description: string,
): Observable<{ string?: T & Document }> =>
  SnapshotsForQuery(ref, description).pipe(
    map((snap: QuerySnapshot) => collectionByIDForSnapshot<T>(snap)),
  )
