import { Observable } from "rxjs"
import { game$ForId } from "./game$ForId"
import { currentGame$ } from "./currentGame$"
import { Game } from "../../types/Game"

// same as game$ForId, but default to the currentGame
export const game$OrCurrentGame$ForId = (id?: string): Observable<Game> =>
  id ? game$ForId(id) : currentGame$
