import { Game } from "../../types/Game"
import { Observable } from "rxjs"
import { Bet } from "../../types/Bet"
import { Document } from "../../types/Document"
import { map } from "rxjs/operators"
import { publicBetsQueryForGame } from "../utils/publicBetsQueryForGame"
import { collectionForQuery$ } from "../utils/collectionForQuery$"
import { RawTimestamped } from "../../types/Timestamped"
import { compareDesc } from "date-fns"

export const bets$ForGame = (game: Game & Document): Observable<Bet[]> =>
  collectionForQuery$<Bet & RawTimestamped>(
    publicBetsQueryForGame(game),
    `public bets for game #${game.id}`,
  ).pipe(map(bets => bets.sort(compareBets)))

const compareBets = (
  l: Bet & RawTimestamped,
  r: Bet & RawTimestamped,
): number => {
  return compareDesc(l.serverTimestamp.toDate(), r.serverTimestamp.toDate())
}