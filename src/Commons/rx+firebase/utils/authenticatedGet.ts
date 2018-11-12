import { Observable } from "rxjs"
import { apiHeaders$ } from "../streams/apiHeaders$"
import { switchMap, take } from "rxjs/operators"
import { ajax } from "rxjs/ajax"
import { getAdminPath } from "../../utils/getAdminPath"
import { URLPathWithParams } from "../../utils/URLPathWithParams"

const getPath = (path: string, queryParams: object = {}): string =>
  getAdminPath(URLPathWithParams(path, queryParams))

export const authenticatedGet = <T>(
  path: string,
  queryParams: object = {},
): Observable<T> =>
  apiHeaders$.pipe(
    switchMap(headers => ajax.getJSON<T>(getPath(path, queryParams), headers)),
    take(1),
  )
