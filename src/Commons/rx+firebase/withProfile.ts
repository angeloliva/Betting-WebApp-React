import { map, startWith } from "rxjs/operators"
import { Observable } from "rxjs"
import { profile$ } from "./streams/profile$"
import { Profile } from "../types/Profile"
import { withFunction } from "./utils/withFunction"
import { Document } from "../types/Document"

export interface Props {
  profile: (Profile & Document) | null
}

const props$: Observable<Props> = profile$.pipe(
  map(profile => ({ profile })),
  startWith({ profile: null }),
)

// inject the User Profile into the props
export const withProfile = withFunction(props$)
