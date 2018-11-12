import * as React from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import { EMPTY, Observable, Subject, Subscription } from "rxjs"
import { catchError, finalize, map, switchMap, tap } from "rxjs/operators"
import { BetForm } from "./BetForm"
import { Bet } from "../../../Commons/types/Bet"
import { Game } from "../../../Commons/types/Game"
import { describe } from "../../../Commons/bets-logic/describe"
import { createPendingBetForGame$ } from "../../../Commons/rx+firebase/actions/createPendingBetForGame$"
import { Document } from "../../../Commons/types/Document"
import { TeamMember } from "../../../Commons/types/Team/TeamMember"
import { betValidator } from "../../../Commons/validators/betValidator"
import { withTeamMembers } from "../../../Commons/rx+firebase/withTeamMembers"

interface Props {
  game: Game & Document
  homeTeamMembers: TeamMember[]
  awayTeamMembers: TeamMember[]
  open: boolean
  onClose: () => void
  betForm: BetForm
  defaultBet: Bet
}

interface State {
  loading: boolean
  bet: Bet
}

class NewBetDialog extends React.PureComponent<Props, State> {
  state = {
    loading: false,
    bet: this.props.defaultBet,
  }
  onBet: (bet: Bet) => void
  onBet$: Observable<any>
  subscription: Subscription | undefined

  constructor(props: Props) {
    super(props)

    const subject = new Subject<Bet>()
    this.onBet = (bet: Bet) => subject.next(bet)
    this.onBet$ = subject.asObservable().pipe(
      tap(() => this.setState({ loading: true })),
      map(bet => {
        // we need to "default" the description if not provided
        const description = bet.description || describe(bet, this.props)
        return {
          ...bet,
          description,
        }
      }),
      switchMap((bet: Bet) =>
        createPendingBetForGame$(bet, this.props.game).pipe(
          tap(() => this.props.onClose()),
          catchError(err => {
            alert(err)
            return EMPTY
          }),
          finalize(() => this.setState({ loading: false })),
        ),
      ),
    )
  }

  componentDidMount() {
    this.subscription = this.onBet$.subscribe()
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  // reset the form when opened
  componentDidUpdate(prevProps: Props) {
    if (this.props.open && !prevProps.open) {
      const { defaultBet: bet } = this.props
      this.setState({ bet })
    }
  }

  onChangeBet = (bet: Bet) => this.setState({ bet })
  onConfirm = () => {
    const { bet } = this.state
    if (bet) {
      this.onBet(bet)
    }
  }

  renderForm() {
    const { betForm, game } = this.props
    const { bet } = this.state
    return React.createElement(betForm, {
      game,
      bet,
      onChangeBet: this.onChangeBet,
    })
  }

  render() {
    const { open, onClose, game, homeTeamMembers, awayTeamMembers } = this.props
    const { bet, loading } = this.state
    const error = betValidator(bet)
    const invalid = Boolean(error)
    const description = describe(bet, {
      game,
      homeTeamMembers,
      awayTeamMembers,
    })
    return (
      <Dialog
        fullScreen={true}
        open={open}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{description}</DialogTitle>
        <DialogContent>
          <div style={{ marginTop: "2em" }}>{this.renderForm()}</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary" disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={this.onConfirm}
            color="primary"
            autoFocus
            disabled={loading || invalid}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withTeamMembers(NewBetDialog)
