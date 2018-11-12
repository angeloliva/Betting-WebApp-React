import * as React from "react"
import { EMPTY, Observable, Subject, Subscription } from "rxjs"
import { catchError, finalize, switchMap, tap } from "rxjs/operators"
import { IconButton } from "@material-ui/core"
import PlayIcon from "@material-ui/icons/PlayArrow"
import PauseIcon from "@material-ui/icons/Pause"
import Spinner from "../../components/Spinner"
import { withGame, Props } from "../../Commons/rx+firebase/withGame"
import { updateGame$ } from "../../Commons/rx+firebase/actions/updateGame"
import { gamesRef } from "../../Commons/rx+firebase/refs"

interface State {
  loading: boolean
}

export class PauseGameMenuItem extends React.PureComponent<Props, State> {
  onTogglePause: () => any
  onTogglePause$: Observable<any>
  subscription: Subscription
  state = {
    loading: false,
  }

  constructor(props: Props) {
    super(props)

    const subject = new Subject<void>()
    this.onTogglePause = () => subject.next()
    this.onTogglePause$ = subject.asObservable().pipe(
      tap(() => this.setState({ loading: true })),
      switchMap(() => {
        const { game } = this.props
        if (!game) {
          return EMPTY
        }

        const ref = gamesRef.doc(game.id)
        const isPaused = !game.isPaused // <- toggle !
        return updateGame$(ref, { isPaused }).pipe(
          catchError(() => EMPTY),
          finalize(() => this.setState({ loading: false })),
        )
      }),
    )
  }

  componentDidMount() {
    this.subscription = this.onTogglePause$.subscribe()
  }

  componentWillUnmount() {
    this.subscription.unsubscribe()
  }

  render() {
    const { game } = this.props
    if (!game) {
      return null
    }

    const { loading } = this.state
    return loading ? (
      <Spinner size={25} color="secondary" />
    ) : (
      <IconButton
        aria-haspopup="true"
        onClick={this.onTogglePause}
        color="inherit"
      >
        {game.isPaused ? <PlayIcon /> : <PauseIcon />}
      </IconButton>
    )
  }
}

export default withGame(PauseGameMenuItem)
