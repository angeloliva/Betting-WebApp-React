import { currentGameRef$ } from "./currentGameRef$"
import { switchMap } from "rxjs/operators"
import { Observable } from "rxjs"
import { Game } from "../../types/Game"
import { documentForRef$ } from "../utils/documentForRef$"
import { Document } from "../../types/Document"

export const currentGame$: Observable<Game & Document> = currentGameRef$.pipe(
  switchMap(ref => documentForRef$<Game>(ref)),
)
