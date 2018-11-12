import * as React from "react"
import { ListItem, ListItemText, Theme } from "@material-ui/core"
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles"
import { Game } from "../../../Commons/types/Game"
import { Bet } from "../../../Commons/types/Bet"
import AnyBetForm from "./AnyBetForm"
import { withRawBet } from "../../../Commons/rx+firebase/withRawBet"
import NewBetDialog from "../utils/NewBetDialog"
import { cloneDeep } from "lodash"
import { Document } from "../../../Commons/types/Document"

interface Props extends WithStyles<typeof styles> {
  game: Game
  bet: (Bet & Document) | null
}

interface State {
  open: boolean
}

class CloneBetButton extends React.PureComponent<Props, State> {
  state = {
    open: false,
  }

  onToggle = () =>
    this.setState(state => ({
      open: !state.open,
    }))

  renderDialog() {
    const { game, bet } = this.props
    if (!bet) {
      return null
    }

    // Clone the original bet
    const { open } = this.state
    const newBet: any = cloneDeep(bet)
    newBet.description = ""
    newBet.isPublic = false
    newBet.isTemplate = false
    newBet.isTriggeredOut = false
    delete newBet.id
    if (newBet.isResolved) {
      newBet.isResolved = false
      delete newBet.result
    }

    // @ts-ignore
    return React.createElement(NewBetDialog, {
      game,
      betForm: AnyBetForm,
      open,
      onClose: this.onToggle,
      defaultBet: newBet,
    })
  }

  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        <ListItem button onClick={this.onToggle} className={classes.list}>
          <ListItemText
            classes={{
              primary: classes.listItem,
            }}
            primary="CLONE BET"
          />
        </ListItem>
        {this.renderDialog()}
      </React.Fragment>
    )
  }
}

const styles = ({ palette }: Theme) =>
  createStyles({
    listItem: {
      color: palette.primary.main,
      fontSize: "0.9em",
    },
    list: {
      width: "70%",
      float: "left",
    },
  })

export default withStyles(styles)(withRawBet(CloneBetButton))
