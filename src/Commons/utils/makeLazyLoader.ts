import * as React from "react"
import { ComponentLoader } from "./ComponentLoader"
import { LazyLoader, Props } from "./LazyLoader"

// Creates a LazyLoader, given a "waitComponent"
export const makeLazyLoader = <P extends object>(
  loadComponent: ComponentLoader<P>,
  waitComponent?: React.ComponentType<{}>,
): React.ComponentType<P> => (props: P) => {
  const extendedProps: P & Props<P> = Object.assign(
    {},
    {
      loadComponent,
      waitComponent,
    },
    props,
  )
  return React.createElement(LazyLoader, extendedProps as any)
}
