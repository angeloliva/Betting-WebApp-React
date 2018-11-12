import { Observable } from "rxjs"
import { Profile } from "../../types/Profile"
import { topUsersQuery } from "../utils/topUsersQuery"
import { collectionForQuery$ } from "../utils/collectionForQuery$"

export const topUsers$ = (
  n: number,
  orderBy: string = "credits",
): Observable<Profile[]> =>
  collectionForQuery$<Profile>(
    topUsersQuery(n, orderBy),
    `top ${n} users ordered by ${orderBy}`,
  )
