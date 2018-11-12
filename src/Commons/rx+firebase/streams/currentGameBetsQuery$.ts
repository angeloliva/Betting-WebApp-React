import { Observable } from "rxjs"
import { Query } from "../../../firebase"
import { map } from "rxjs/operators"
import { currentGameBetsRef$ } from "./currentGameBetsRef$"

export const currentGameBetsQuery$: Observable<
  Query
> = currentGameBetsRef$.pipe(map(ref => ref.where("isPublic", "==", true)))
