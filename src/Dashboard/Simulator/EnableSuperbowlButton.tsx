import * as React from "react"
import { merge, NEVER, Observable, Subject, Subscription, zip } from "rxjs"
import { catchError, map, mapTo, switchMap, tap } from "rxjs/operators"
import superBowlDefaultEvent from "./superBowlDefaultEvent"
import {
  superBowlBetsRef,
  superBowlEventsRef,
  superBowlRef,
} from "../../Commons/rx+firebase/refs"
import { currentGame$ } from "../../Commons/rx+firebase/streams/currentGame$"
import { Game } from "../../Commons/types/Game"
import { superBowl$ } from "../../Commons/rx+firebase/streams/superBowl$"
import { setCurrentGame } from "../../Commons/rx+firebase/actions/setCurrentGame"
import { updateGame$ } from "../../Commons/rx+firebase/actions/updateGame"
import { clearCollection } from "../../Commons/rx+firebase/actions/clearCollection"
import { setScore } from "../../Commons/rx+firebase/actions/setScore"
import { Button } from "@material-ui/core"

export interface Props {
  disabled?: boolean
}

export interface State {
  loading: boolean
  updating: boolean
  isSuperBowl: boolean
}

export default class EnableSuperbowlButton extends React.PureComponent<
  Props,
  State
> {
  state = {
    loading: true,
    updating: false,
    isSuperBowl: false,
  }
  onClick: () => any
  events$: Observable<any>
  subscription: Subscription

  constructor(props: {}) {
    super(props)

    const subject = new Subject<void>()
    this.onClick = () => subject.next()

    const isSuperBowl$ = currentGame$.pipe(
      map(game => game.id === superBowlRef.id),
      tap(isSuperBowl =>
        this.setState({
          isSuperBowl,
          loading: false,
        }),
      ),
      catchError(() => NEVER),
    )

    const setSuperBowl$ = subject.asObservable().pipe(
      tap(() => this.setState({ updating: true })),
      switchMap(() => superBowl$),
      switchMap((superBowl: Game) =>
        // here I run all the commands in parallel
        zip(
          setCurrentGame(superBowlRef),
          updateGame$(superBowlRef, superBowlDefaultEvent),
          clearCollection(superBowlEventsRef),
          clearCollection(superBowlBetsRef),
          setScore(superBowlRef, {
            home: 0,
            away: 0,
          }),
        ).pipe(
          // but I want the stream to just return the superBowl instance at the end
          mapTo(superBowl),
        ),
      ),
      // simple side-effect
      tap({
        next: () => this.setState({ updating: false }),
        error: err => {
          alert(err)
          this.setState({ updating: false })
        },
      }),
      catchError(() => NEVER),
    )

    this.events$ = merge(isSuperBowl$, setSuperBowl$)
  }

  componentDidMount() {
    this.subscription = this.events$.subscribe()
  }

  componentWillUnmount() {
    this.subscription.unsubscribe()
  }

  render() {
    const { disabled } = this.props
    const { loading, updating, isSuperBowl } = this.state
    return (
      <Button
        variant="contained"
        color={isSuperBowl ? "secondary" : "primary"}
        onClick={this.onClick}
        disabled={loading || updating || disabled}
      >
        {loading
          ? "Loading..."
          : isSuperBowl
            ? "Super Bowl active: click to RESET all data"
            : loading
              ? "Activating..."
              : "Make Super Bowl active"}
      </Button>
    )
  }
}
