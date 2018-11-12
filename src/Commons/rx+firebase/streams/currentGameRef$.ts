import { currentGameRef } from "../refs"
import { Observable } from "rxjs"
import { map, publishReplay, refCount } from "rxjs/operators"
import { CurrentGame } from "../../types/CurrentGame"
import { documentForRef$ } from "../utils/documentForRef$"
import { DocumentReference } from "../../../firebase"

const currentGameInfo$: Observable<CurrentGame> = documentForRef$<CurrentGame>(
  currentGameRef,
)

// retrieve the currently-active game
export const currentGameRef$: Observable<
  DocumentReference
> = currentGameInfo$.pipe(
  map(currentGame => currentGame.ref),
  publishReplay(),
  refCount(),
)
