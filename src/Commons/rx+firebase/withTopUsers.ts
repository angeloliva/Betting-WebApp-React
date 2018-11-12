import { combineLatest, Observable } from "rxjs"
import { topUsers$ } from "./streams/topUsers$"
import { map, startWith } from "rxjs/operators"
import { withFunction } from "./utils/withFunction"
import { Profile } from "../types/Profile"
import { Document } from "../types/Document"

export interface Props {
  usersLoaded: boolean
  scoreTopUsers: Array<Profile & Document>
  currentStreakTopUsers: Array<Profile & Document>
  longestStreakTopUsers: Array<Profile & Document>
}

const props$ForN = (n: number): Observable<Props> =>
  combineLatest(
    topUsers$(n, "credits"),
    topUsers$(n, "currentStreak"),
    topUsers$(n, "longestStreak"),
  ).pipe(
    map(([scoreTopUsers, currentStreakTopUsers, longestStreakTopUsers]) => ({
      usersLoaded: true,
      scoreTopUsers,
      currentStreakTopUsers,
      longestStreakTopUsers,
    })),
    startWith({
      usersLoaded: false,
      scoreTopUsers: [],
      currentStreakTopUsers: [],
      longestStreakTopUsers: [],
    }),
  )

export const withTopUsers = (n: number) => withFunction(props$ForN(n))
