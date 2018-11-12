import * as React from "react"
import "./App.css"
import { Provider as ThemeProvider } from "./theme"
import AppLoader from "./AppLoader"
import AuthRouter from "./AuthRouter"

export interface State {
  failed: boolean
}

/**
 * The <App> component.
 *
 * It has two main roles:
 * - it loads the root Provider(s)
 * - it acts as a React error boundary
 */
export default class App extends React.PureComponent<{}, State> {
  state = {
    failed: false,
  }

  componentDidCatch(err: Error, info: object) {
    this.setState({ failed: true })
  }

  render() {
    const { failed } = this.state
    if (failed) {
      return <h1>Something went wrong...</h1>
    }

    return (
      <ThemeProvider>
        <AppLoader>
          <AuthRouter />
        </AppLoader>
      </ThemeProvider>
    )
  }
}
