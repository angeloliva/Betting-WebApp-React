import * as React from "react"

export type ComponentLoader<P extends object> = () => Promise<
  React.ComponentType<P>
>
