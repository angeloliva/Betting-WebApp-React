import * as React from "react"
import { Button, Typography, TextField, Grid } from "@material-ui/core"
import EnableSuperbowlButton from "./EnableSuperbowlButton"
import { BehaviorSubject, EMPTY, Observable, Subject, Subscription } from "rxjs"
import {
  catchError,
  filter,
  flatMap,
  map,
  publishReplay,
  refCount,
  scan,
  tap,
  withLatestFrom,
} from "rxjs/operators"
import {
  makeGameTime$,
  makeJSONUpdates$,
  sendUpdatesToProcessor$,
} from "./Simulator.streams"
import { APIResponse } from "../../Commons/types/STATS/APIResponse"
import { GameTime } from "../../Commons/types/GameTime"

export type Props = {}
interface State extends GameTime {
  gameSpeed: number
  runState: RunState
}
type RunState = "idle" | "running" | "pause"
type Action = "start" | "pause"

export class Simulator extends React.PureComponent<Props, State> {
  state = {
    period: 1,
    time: "15:00",
    gameSpeed: 1,
    runState: "idle" as RunState,
  }

  // RxJS
  onAction: (action: Action) => void
  onGameSpeed: (gameSpeed: number) => void
  updatesToProcessor$: Observable<any>
  subscription: Subscription | null

  constructor(props: Props) {
    super(props)

    // events to "change running state"
    const actionSubject = new Subject<Action>()
    this.onAction = (action: Action) => {
      console.log(action)
      actionSubject.next(action)
    }
    const action$ = actionSubject.asObservable()

    // change of game speed
    const gameSpeedSubject = new BehaviorSubject<number>(1)
    this.onGameSpeed = (gameSpeed: number) => gameSpeedSubject.next(gameSpeed)
    const gameSpeed$: Observable<number> = gameSpeedSubject.asObservable().pipe(
      // we report all changes to react
      tap(gameSpeed => this.setState({ gameSpeed })),
      filter(gameSpeed => gameSpeed !== 0),
    )

    // the state as on observable: it changes on click
    const state$: Observable<RunState> = action$.pipe(
      tap(action => {
        console.log(action)
      }),
      scan((state: RunState, action: Action): RunState => {
        switch (state) {
          case "idle":
          case "pause":
            return action === "start" ? "running" : state
          case "running":
            return action === "pause" ? "pause" : state
        }
      }, "idle"),
      tap((runState: RunState) => this.setState({ runState })),
    )

    // helper: signals when to start/stop counting time
    const isRunning$: Observable<boolean> = state$.pipe(
      map(state => state === "running"),
    )

    // the current game time, as an observable
    const gameTime$: Observable<GameTime> = makeGameTime$(
      isRunning$,
      gameSpeed$,
      {
        period: 1,
        time: "15:00",
      },
    ).pipe(
      tap(gameTime => {
        this.setState(gameTime)
      }),
      publishReplay(),
      refCount(),
    )
    // when the game update
    // - we try to build a JSON response
    // - we send each response to the processor service
    const JSONUpdates$: Observable<APIResponse> = makeJSONUpdates$(gameTime$)
    // when (re)-starting the simulation, we add a header to flush the server cache
    const additionalHeaders$: Observable<object> = gameTime$.pipe(
      map(
        ({ period, time }) =>
          period === 1 && time === "15:00"
            ? { "X-Yamble-Force-Reset-Cache": "true" } // first events: force cache reset
            : {},
      ),
    )
    this.updatesToProcessor$ = JSONUpdates$.pipe(
      withLatestFrom(additionalHeaders$),
      flatMap(([json, headers]) =>
        sendUpdatesToProcessor$(json, headers).pipe(
          catchError(err => {
            alert(`Simulation failure: ${err}`)
            return EMPTY
          }),
        ),
      ),
    )
  }

  componentDidMount() {
    this.subscription = this.updatesToProcessor$.subscribe()
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  start = async () => {
    this.onAction("start")
  }

  onClick = () => {
    switch (this.state.runState) {
      case "idle":
        this.start()
        break
      case "pause":
        this.onAction("start")
        break
      case "running":
        this.onAction("pause")
        break
    }
  }

  onChangeGameSpeed = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.onGameSpeed(parseFloat(event.target.value) || 0)

  render() {
    const { runState, gameSpeed, period, time } = this.state
    return (
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Typography variant="body2">
            This simulator will load and replay the play-by-play events for the
            Super Bowl.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="headline">
            Step 1: Make Super Bowl as the active Game
          </Typography>
          <Typography variant="body1">
            This will activate the settings for the Super Bowl, making it the
            current game. Il will also clear the events and bets for the game.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <EnableSuperbowlButton disabled={runState !== "idle"} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="headline">
            Step 2: Start the simulation of the events from the SuperBowl
          </Typography>
          <Typography variant="body1">
            This will load all the events from the SuperBowl, and re-run them
            one after the other to simulate the game "live".
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <div>
            <Typography variant="body2">
              Period: {period} | Time: {time}
            </Typography>
            <Typography variant="body1" paragraph={true}>
              Make time flow faster:{" "}
              <TextField
                label="Simulation speed"
                disabled={runState === "running"}
                type="text"
                value={gameSpeed}
                onChange={this.onChangeGameSpeed}
              />
            </Typography>
            <Button color="primary" onClick={this.onClick} variant="contained">
              {runState === "idle"
                ? "Start Game"
                : runState === "pause"
                  ? "Resume Simulation"
                  : "Pause Simulation"}
            </Button>
          </div>
        </Grid>
      </Grid>
    )
  }
}
