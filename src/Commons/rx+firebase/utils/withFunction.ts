import * as React from "react"
import { RemoveProps } from "./RemoveProps"
import { componentFromStream } from "recompose"
import { combineLatest, Observable } from "rxjs"
import { map } from "rxjs/operators"

export type WithFunction<Props extends object> = <P extends object>(
  Component: React.ComponentType<P>,
) => React.ComponentType<RemoveProps<P, Props>>

export const withFunction = <Props extends object>(
  propsStream$: Observable<Props>,
): WithFunction<Props> => <P>(
  Component: React.ComponentType<P>,
): React.ComponentType<RemoveProps<P, Props>> =>
  componentFromStream(props$ =>
    combineLatest(props$, propsStream$).pipe(
      map(([props, profileProps]: [object, object]) =>
        (Object as any).assign(profileProps, props),
      ),
      map((props: P & Props) => React.createElement(Component, props)),
    ),
  )
