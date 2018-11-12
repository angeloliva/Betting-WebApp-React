import * as React from "react"
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles"
import { Button } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import BetTemplates from "./BetTemplates"
import { Game } from "../../../Commons/types/Game"
import { Document } from "../../../Commons/types/Document"

export interface Props extends WithStyles<typeof styles> {
  game: Game & Document
}

interface State {
  open: boolean
}

export class BetTemplatesActionButton extends React.PureComponent<
  Props,
  State
> {
  state = {
    open: false,
  }

  onToggleDrawer = () =>
    this.setState(state => ({
      open: !state.open,
    }))

  render() {
    const { classes, game } = this.props
    const { open } = this.state
    return (
      <React.Fragment>
        <Button
          variant="fab"
          color="primary"
          aria-label="Add"
          className={classes.fab}
          onClick={this.onToggleDrawer}
        >
          <AddIcon />
        </Button>
        <BetTemplates open={open} onClose={this.onToggleDrawer} game={game} />
      </React.Fragment>
    )
  }
}

const styles = ({ spacing }: Theme) =>
  createStyles({
    fab: {
      position: "absolute",
      bottom: spacing.unit * 4,
      right: spacing.unit * 4,
    },
  })

export default withStyles(styles)(BetTemplatesActionButton)
