import { Observable } from "rxjs"
import { documentForRef$ } from "../utils/documentForRef$"
import { teamRefForId } from "../utils/teamRefForId"
import { Team } from "../../types/Team"

export const team$ForId = (id: number): Observable<Team> =>
  documentForRef$<Team>(teamRefForId(id))
