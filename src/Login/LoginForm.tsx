import * as React from "react"
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { Subscription } from "rxjs"
import { finalize } from "rxjs/operators"
import { signIn } from "../Commons/rx+firebase/actions/signIn"

export type Props = WithStyles<typeof styles>

export interface State {
  email: string
  password: string
  loading: boolean
}

export class LoginForm extends React.PureComponent<Props, State> {
  state = {
    email: "",
    password: "",
    loading: false,
  }
  subscription: Subscription | null = null

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ email: event.target.value })
  onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ password: event.target.value })

  onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    this.setState({ loading: true })

    const { email, password } = this.state
    this.subscription = signIn({ email, password })
      .pipe(finalize(() => this.setState({ loading: false })))
      .subscribe()
  }

  render() {
    const { classes } = this.props
    const { email, password, loading } = this.state

    return (
      <form className={classes.container} onSubmit={this.onSubmit}>
        <TextField
          className={classes.formField}
          value={email}
          onChange={this.onChangeEmail}
          type="email"
          placeholder="Email"
          disabled={loading}
        />
        <TextField
          className={classes.formField}
          value={password}
          onChange={this.onChangePassword}
          type="password"
          placeholder="Password"
          disabled={loading}
        />
        <Button
          className={classes.formField}
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
        >
          Sign In
        </Button>
      </form>
    )
  }
}

const styles = createStyles({
  container: {
    width: "100%",
    maxWidth: 250,
    padding: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  formField: {
    marginTop: 15,
  },
})

export default withStyles(styles)(LoginForm)
