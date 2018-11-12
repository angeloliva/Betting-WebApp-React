import { superBowlRef } from "../refs"
import { defer, Observable } from "rxjs"
import { map, publishReplay, refCount } from "rxjs/operators"
import { Game } from "../../types/Game"
import { docForSnapshot } from "../utils/docForSnapshot"

// retrieve the special "superbowl" database entry
export const superBowl$: Observable<Game> = defer(() =>
  superBowlRef.get(),
).pipe(
  map(snap => docForSnapshot<Game>(snap)),
  publishReplay(),
  refCount(),
)
