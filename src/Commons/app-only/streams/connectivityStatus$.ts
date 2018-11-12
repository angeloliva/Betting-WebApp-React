import { NetInfo, ConnectionInfo } from "react-native"
import { Observable, Observer } from "rxjs"
import { refCount, publishReplay, tap } from "rxjs/operators"

export const connectivityStatus$: Observable<
  ConnectionInfo
> = Observable.create((observer: Observer<ConnectionInfo>) => {
  const handler = observer.next.bind(observer)
  NetInfo.addEventListener("connectionChange", handler)
  return () => NetInfo.removeEventListener("connectionChange", handler)
}).pipe(
  tap((s: ConnectionInfo) => {
    if (process.env.NODE_ENV === "development") {
      console.log("Connection type:", s.type)
    }
  }),
  publishReplay(),
  refCount(),
)
