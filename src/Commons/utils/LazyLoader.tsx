import * as React from "react"
import { ComponentLoader } from "./ComponentLoader"

export interface Props<P extends object> {
  // A function that returns the Component class
  loadComponent: ComponentLoader<P>
  // An optional component to display1 while loading
  waitComponent?: React.ComponentType<{}>
}

interface State<P extends object> {
  // thw component class, non-null once loaded
  component: React.ComponentType<P> | null
}

export class LazyLoader<P extends object> extends React.PureComponent<
  Props<P>,
  State<P>
> {
  state = {
    component: null,
  }

  componentDidMount() {
    const { loadComponent } = this.props
    loadComponent().then(component => this.setState({ component }))
  }

  render() {
    const { component } = this.state
    if (component) {
      return React.createElement(component, this.props)
    }
    const { waitComponent } = this.props
    return waitComponent && React.createElement(waitComponent)
  }
}
