import { Observable } from "rxjs"
import { Game } from "../../types/Game"
import { documentForRef$ } from "../utils/documentForRef$"
import { gameRefForId } from "../utils/gameRefForId"

export const game$ForId = (id: string): Observable<Game> =>
  documentForRef$<Game>(gameRefForId(id))
