import { Observable } from "rxjs"
import { SeasonType } from "../../types/Game/SeasonType"
import { Game } from "../../types/Game"
import { authenticatedGet } from "../utils/authenticatedGet"

export interface SearchGameParams {
  league: "NFL"
  seasonType: SeasonType
}

// Triggers a reload of the games data from stats.com
export const reloadGamesData = (params: SearchGameParams): Observable<Game[]> =>
  authenticatedGet<Game[]>("upcomingGames", params)
