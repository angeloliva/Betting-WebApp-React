import * as React from "react"
import { Typography, Theme } from "@material-ui/core"
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles"

interface Props extends WithStyles<typeof styles> {
  odds: number
  selected: boolean
}

interface State {
  open: boolean
}

class OddsShow extends React.PureComponent<Props, State> {
  render() {
    const { odds, classes, selected } = this.props
    return (
      <React.Fragment>
        <div className={classes.oddsArea}>
          <Typography
            variant="subheading"
            color={selected ? "primary" : "textPrimary"}
          >
            Odds: {odds}
          </Typography>
        </div>
      </React.Fragment>
    )
  }
}

const styles = ({ palette }: Theme) =>
  createStyles({
    oddsArea: {
      color: palette.primary.main,
      fontSize: "0.9em",
      display: "inline-block",
      borderColor: palette.secondary.main,
      borderWidth: 2,
      borderStyle: "solid",
      padding: 3,
      borderRadius: 4,
      float: "right",
      marginBottom: 5,
      marginRight: 5,
    },
  })

export default withStyles(styles)(OddsShow)
