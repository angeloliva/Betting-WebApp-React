import { currentGameRef$ } from "./currentGameRef$"
import { map } from "rxjs/operators"

export const currentGameID$ = currentGameRef$.pipe(map(ref => ref.id))
