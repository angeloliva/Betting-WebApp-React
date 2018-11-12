import * as React from "react"

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles"
import LoginForm from "./LoginForm"

export type Props = WithStyles<typeof styles>
import logoImage from "./Logo-grey.svg"

export const LoginScreen = ({ classes }: Props) => (
  <div className={classes.container}>
    <img className={classes.logo} src={logoImage} alt="Yamble" />
    <LoginForm />
  </div>
)

const styles = createStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  logo: {
    width: 150,
    height: 150,
  },
})

export default withStyles(styles)(LoginScreen)
