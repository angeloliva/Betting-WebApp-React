import { publishReplay, refCount, switchMap } from "rxjs/operators"
import { Observable } from "rxjs"
import { currentUserRef$ } from "./currentUserRef$"
import { Profile } from "../../types/Profile"
import { documentForRef$ } from "../utils/documentForRef$"
import { Document } from "../../types/Document"

export const profile$: Observable<Profile & Document> = currentUserRef$.pipe(
  switchMap(ref => documentForRef$<Profile>(ref)),
  publishReplay(),
  refCount(),
)
