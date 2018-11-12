import * as React from "react"
import { default as Button, ButtonProps } from "@material-ui/core/Button"
import { Subscription } from "rxjs"
import { finalize, tap } from "rxjs/operators"
import { signOut } from "../Commons/rx+firebase/actions/signOut"

export type Props = ButtonProps

export interface State {
  loading: boolean
}

export default class SignOutButton extends React.PureComponent<Props, State> {
  state = {
    loading: false,
  }
  subscription: Subscription | null = null

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  onClick = () => {
    this.setState({ loading: true })
    this.subscription = signOut()
      .pipe(
        tap({ error: err => alert(err) }),
        finalize(() => this.setState({ loading: false })),
      )
      .subscribe()
  }

  render() {
    const { loading } = this.state
    return (
      <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={this.onClick}
        disabled={loading}
        {...this.props}
      >
        Sign Out
      </Button>
    )
  }
}
