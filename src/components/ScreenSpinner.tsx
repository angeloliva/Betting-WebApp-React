import * as React from "react"
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles"
import Spinner from "./Spinner"

export type Props = WithStyles<typeof styles>

export const ScreenSpinner = ({ classes }: Props) => (
  <div className={classes.container}>
    <Spinner size="large" />
  </div>
)

const styles = createStyles({
  container: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
})

export default withStyles(styles)(ScreenSpinner)
