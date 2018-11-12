import * as React from "react"
import { distinctUntilChanged, map, startWith, switchMap } from "rxjs/operators"
import { combineLatest, from, Observable } from "rxjs"
import { componentFromStream } from "recompose"
import { Game } from "../types/Game"
import { RemoveProps } from "./utils/RemoveProps"
import { bets$ForGame } from "./streams/bets$ForGame"
import { Document } from "../types/Document"
import { Bet } from "../types/Bet"

export type Props = {
  betsLoaded: boolean
  bets: Array<Bet & Document>
  game: Game & Document
}

export interface ExternalProps {
  game: Game & Document
}

const props$ForGame = (game: Game & Document): Observable<Props> =>
  bets$ForGame(game).pipe(
    map(bets => ({
      betsLoaded: true,
      bets,
      game,
    })),
    startWith({
      betsLoaded: false,
      bets: [],
      game,
    }),
  )

export const withBetsForGame = <P extends object>(
  Component: React.ComponentType<P>,
): React.ComponentType<RemoveProps<P, Props> & ExternalProps> =>
  componentFromStream(props$ => {
    const game$ = from(props$).pipe(map(props => props.game))
    const betsProps$ = game$.pipe(
      distinctUntilChanged((l, r) => l.id === r.id),
      switchMap(props$ForGame),
    )
    return combineLatest(props$, betsProps$).pipe(
      map(([props, betsProps]) => Object.assign({}, props, betsProps)),
      map((props: P) => React.createElement(Component, props)),
    )
  })
