import { combineLatest, Observable } from "rxjs"
import { NFLGames$ } from "./NFLGames$"
import { map } from "rxjs/operators"
import { currentGame$ } from "./currentGame$"
import { GameWithIsCurrent } from "../../types/GameWithIsCurrent"
import { Document } from "../../types/Document"

export const NFLGamesWithCurrent$: Observable<
  Array<GameWithIsCurrent & Document>
> = combineLatest(NFLGames$, currentGame$).pipe(
  map(([games, currentGame]) =>
    games.map(game => ({
      ...game,
      isCurrent: game.id === currentGame.id,
    })),
  ),
)
