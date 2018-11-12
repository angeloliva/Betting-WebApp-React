import { Observable } from "rxjs"
import { authenticatedGet } from "../utils/authenticatedGet"
import { Team } from "../../types/Team"

// Triggers a reload of the games data from stats.com
export const reloadTeamData = (teamID: number): Observable<Team[]> =>
  authenticatedGet<Team[]>(`teamInfo/${teamID}`)
