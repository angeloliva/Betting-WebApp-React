import * as React from "react"
import Button from "@material-ui/core/Button"
import { WithStyles, withStyles, createStyles } from "@material-ui/core/styles"

export interface Props extends WithStyles<typeof styles> {
  onPress: () => any
  loading?: boolean
  children: React.ReactChild
}
export const ActionButton = ({
  classes,
  children,
  loading,
  onPress,
}: Props) => (
  <Button
    size="small"
    variant="contained"
    color={loading ? "secondary" : "primary"}
    type="submit"
    onClick={onPress}
    disabled={loading}
    className={classes.button}
  >
    {children}
  </Button>
)

const styles = createStyles({
  button: {
    margin: 10,
  },
})

export default withStyles(styles)(ActionButton)
