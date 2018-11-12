import * as React from "react"
import { NEVER, Observable, Subject, Subscription } from "rxjs"
import { catchError, switchMap, tap } from "rxjs/operators"
import ScreenSpinner from "../../components/ScreenSpinner"
import { Button, Typography } from "@material-ui/core"
import { resetPlayerScores } from "../../Commons/rx+firebase/actions/resetPlayerScores"
import Grid from "@material-ui/core/Grid/Grid"
import {
  withGame,
  Props as GameProps,
} from "../../Commons/rx+firebase/withGame"
import {
  withTopUsers,
  Props as TopUsersProps,
} from "../../Commons/rx+firebase/withTopUsers"

export interface Props extends GameProps, TopUsersProps {}

export interface State {
  resetingScores: boolean
}

export class PlayerScreen extends React.PureComponent<Props, State> {
  state = {
    resetingScores: false,
  }
  onClick: () => any
  subscription: Subscription
  events$: Observable<any>

  constructor(props: Props) {
    super(props)

    const subject = new Subject<void>()
    this.onClick = () => subject.next()

    const resetScores$ = subject.asObservable().pipe(
      tap(() => this.setState({ resetingScores: true })),
      switchMap(() => resetPlayerScores(20)),
      tap({
        next: () => this.setState({ resetingScores: false }),
        error: err => {
          alert(err)
          this.setState({ resetingScores: false })
        },
      }),
      catchError(() => NEVER),
    )

    this.events$ = resetScores$
  }

  componentDidMount() {
    this.subscription = this.events$.subscribe()
  }

  componentWillUnmount() {
    this.subscription.unsubscribe()
  }

  render() {
    if (!this.props.game) {
      return <ScreenSpinner />
    }

    const { scoreTopUsers, game } = this.props
    const { resetingScores } = this.state
    return (
      <div>
        <Grid container spacing={8}>
          <Grid item xs={4}>
            <Typography variant="display1" color="textPrimary">
              {game.teams.home.name} VS {game.teams.away.name} ({game.isPaused
                ? "P"
                : "R"})
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Button
              color="primary"
              onClick={this.onClick}
              variant="contained"
              disabled={resetingScores}
            >
              Reset Player Scores
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subheading" color="primary">
              Leaderboard
            </Typography>
          </Grid>
          <Grid container>
            <Grid item xs={2}>
              <Typography variant="body2">Username</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2">Score</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2">Best Streak</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body2">Current Streak</Typography>
            </Grid>
          </Grid>

          {scoreTopUsers.map(user => (
            <Grid container key={user.id}>
              <Grid item xs={2}>
                <Typography variant="body1">{user.displayName}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography key={user.id} variant="body1">
                  {user.credits}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography key={user.id} variant="body1">
                  {user.longestStreak || 0}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography key={user.id} variant="body1">
                  {user.currentStreak || 0}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </div>
    )
  }
}

export default withTopUsers(20)(withGame(PlayerScreen))
