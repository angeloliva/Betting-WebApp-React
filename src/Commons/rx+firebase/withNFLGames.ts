import { map, startWith } from "rxjs/operators"
import { Observable } from "rxjs"
import { NFLGamesWithCurrent$ } from "./streams/NFLGamesWithCurrent$"
import { withFunction } from "./utils/withFunction"
import { GameWithIsCurrent } from "../types/GameWithIsCurrent"

export interface Props {
  gamesLoaded: boolean
  games: GameWithIsCurrent[]
}

const props$: Observable<Props> = NFLGamesWithCurrent$.pipe(
  map(games => ({
    gamesLoaded: true,
    games,
  })),
  startWith({
    gamesLoaded: false,
    games: [],
  }),
)

export const withNFLGames = withFunction(props$)
