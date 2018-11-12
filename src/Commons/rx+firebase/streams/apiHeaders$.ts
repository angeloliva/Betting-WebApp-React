// A set of headers to add to the Admin API calls for authentication
import { token$ } from "./token$"
import { map } from "rxjs/operators"
import { Observable } from "rxjs"
import { APIHeaders } from "../../types/APIHeaders"

export const apiHeaders$: Observable<APIHeaders> = token$.pipe(
  map(token => ({
    Authorization: `Bearer ${token}`,
  })),
)
