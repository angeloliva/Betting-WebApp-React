import * as React from "react"
import Typography from "@material-ui/core/Typography"
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles"
import SignOutButton from "./SignOutButton"
import logoImage from "./Logo-grey.svg"

export type Props = WithStyles<typeof styles>

export const UnauthorizedScreen = ({ classes }: Props) => (
  <div className={classes.container}>
    <img className={classes.logo} src={logoImage} alt="Yamble" />
    <Typography variant="body1" className={classes.warningText}>
      You don't have access to this administration Dashboard: Please contact the
      administrator.
    </Typography>
    <SignOutButton />
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
  warningText: {
    padding: 10,
    width: "100%",
    textAlign: "center",
    maxWidth: 300,
    marginBottom: 30,
  },
})

export default withStyles(styles)(UnauthorizedScreen)
