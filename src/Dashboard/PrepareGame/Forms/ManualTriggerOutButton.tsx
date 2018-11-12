import * as React from "react"
import { ListItem, ListItemText, Theme } from "@material-ui/core"
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles"
import { Game } from "../../../Commons/types/Game"
import { Document } from "../../../Commons/types/Document"
import { EMPTY, Observable, Subject, Subscription } from "rxjs"
import { catchError, finalize, switchMap, tap } from "rxjs/operators"
import { Bet } from "../../../Commons/types/Bet"
import { updateBet$ } from "../../../Commons/rx+firebase/actions/updateBet"

interface Props extends WithStyles<typeof styles> {
  game: Game & Document
  bet: Bet & Document
}

interface State {
  loading: boolean
}

class ManualTriggerOutButton extends React.PureComponent<Props, State> {
  state = {
    loading: false,
  }
  onTriggerOut: () => void
  onTriggerOut$: Observable<any>
  subscription: Subscription

  constructor(props: Props) {
    super(props)

    const subject = new Subject<string>()
    this.onTriggerOut = () => subject.next(this.props.bet.id)
    this.onTriggerOut$ = subject.asObservable().pipe(
      tap(() => this.setState({ loading: true })),
      switchMap(betID =>
        updateBet$(this.props.game, betID, { isTriggeredOut: true }).pipe(
          tap({ error: alert }),
          catchError(() => EMPTY),
          finalize(() => this.setState({ loading: false })),
        ),
      ),
    )
  }

  componentDidMount() {
    this.subscription = this.onTriggerOut$.subscribe()
  }

  componentWillUnmount() {
    this.subscription.unsubscribe()
  }

  render() {
    const { classes, bet } = this.props
    const disabled = bet.isTriggeredOut
    return (
      <React.Fragment>
        <ListItem button disabled={disabled} onClick={this.onTriggerOut}>
          <ListItemText
            classes={{
              primary: classes.listItem,
            }}
            primary={disabled ? "TRIGGERED OUT" : "TRIGGER OUT"}
          />
        </ListItem>
      </React.Fragment>
    )
  }
}

const styles = ({ palette }: Theme) =>
  createStyles({
    listItem: {
      color: palette.secondary.main,
      fontSize: "0.9em",
    },
  })

export default withStyles(styles)(ManualTriggerOutButton)
