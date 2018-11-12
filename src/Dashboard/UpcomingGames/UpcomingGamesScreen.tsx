import * as React from "react"
import GameList from "./GamesList"
import GamesCount from "./GamesCount"
import Grid from "@material-ui/core/Grid"
import { EMPTY, Observable, Subscription, Subject } from "rxjs"
import { catchError, finalize, switchMap, tap } from "rxjs/operators"
import { Game } from "../../Commons/types/Game"
import { gamesRef } from "../../Commons/rx+firebase/refs"
import { withNFLGames } from "../../Commons/rx+firebase/withNFLGames"
import { setCurrentGame$ } from "../../Commons/rx+firebase/actions/setCurrentGame"
import { GameWithIsCurrent } from "../../Commons/types/GameWithIsCurrent"
import { FormControlLabel, Switch } from "@material-ui/core"
import { isToday } from "date-fns"
import { Document } from "../../Commons/types/Document"

export interface Props {
  games: Array<GameWithIsCurrent & Document>
  gamesLoaded: boolean
}

export interface State {
  onlyToday: boolean
  settingCurrentGame: boolean
}

export class UpcomingGamesScreen extends React.PureComponent<Props, State> {
  setCurrentGame: (game: Game) => void
  setCurrentGame$: Observable<any>
  subscription: Subscription
  state = {
    onlyToday: true,
    settingCurrentGame: false,
  }

  constructor(props: Props) {
    super(props)

    const subject = new Subject<Game & Document>()
    this.setCurrentGame = (game: Game & Document) => subject.next(game)
    this.setCurrentGame$ = subject.asObservable().pipe(
      // we "freeze the UI"
      tap(() => this.setState({ settingCurrentGame: true })),
      // and we call setCurrentGame
      switchMap(game =>
        setCurrentGame$(gamesRef.doc(game.id)).pipe(
          // error handling: should be better
          tap({ error: alert }),
          // we "unfreeze the UI"
          finalize(() => this.setState({ settingCurrentGame: false })),
          catchError(() => EMPTY),
        ),
      ),
    )
  }

  componentDidMount() {
    this.subscription = this.setCurrentGame$.subscribe()
  }

  componentWillUnmount() {
    this.subscription.unsubscribe()
  }

  onChangeOnlyToday = (_: any, onlyToday: boolean) =>
    this.setState({ onlyToday })

  render() {
    const { games: loadedGames, gamesLoaded } = this.props
    const { settingCurrentGame, onlyToday } = this.state
    const games = onlyToday
      ? loadedGames.filter(game => isToday(game.startDate.toDate()))
      : loadedGames
    return (
      <Grid container spacing={8}>
        <Grid item xs={8}>
          <GamesCount games={games} loaded={gamesLoaded} />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={
              <Switch
                id="isPregame"
                checked={onlyToday}
                onChange={this.onChangeOnlyToday}
              />
            }
            label="Only Today ?"
          />
        </Grid>
        <Grid item>
          <GameList
            games={games}
            loaded={gamesLoaded}
            settingCurrentGame={settingCurrentGame}
            setCurrentGame={this.setCurrentGame}
          />
        </Grid>
      </Grid>
    )
  }
}

export default withNFLGames(UpcomingGamesScreen)
