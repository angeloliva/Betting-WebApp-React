import * as React from "react"
import { Game } from "../../../../Commons/types/Game"
import { BetForm } from "../../utils/BetForm"
import { Bet } from "../../../../Commons/types/Bet"
import { ListItem, ListItemText, Theme } from "@material-ui/core"
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles"
import NewBetDialog from "../../utils/NewBetDialog"

interface Props extends WithStyles<typeof styles> {
  game: Game
  betForm: BetForm
  title: string
  defaultBet: Bet
}

interface State {
  open: boolean
}

export class NewBetDialogListItem<T extends Bet> extends React.PureComponent<
  Props,
  State
> {
  state = {
    open: false,
  }

  onToggle = () =>
    this.setState(state => ({
      open: !state.open,
    }))

  renderDialog() {
    const { game, betForm, defaultBet } = this.props
    const { open } = this.state
    // @ts-ignore
    return React.createElement(NewBetDialog, {
      game,
      betForm,
      open,
      onClose: this.onToggle,
      defaultBet,
    })
  }

  render() {
    const { title, classes } = this.props
    return (
      <React.Fragment>
        <ListItem button onClick={this.onToggle}>
          <ListItemText
            classes={{
              primary: classes.listItem,
            }}
            primary={title}
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
      color: palette.primary.contrastText,
      fontSize: "0.9em",
    },
  })

export default withStyles(styles)(NewBetDialogListItem)
