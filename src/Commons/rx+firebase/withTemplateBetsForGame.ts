import * as React from "react"
import { distinctUntilChanged, map, startWith, switchMap } from "rxjs/operators"
import { combineLatest, from, Observable } from "rxjs"
import { componentFromStream } from "recompose"
import { Game } from "../types/Game"
import { RemoveProps } from "./utils/RemoveProps"
import { Bet } from "../types/Bet"
import { templateBets$ForGame } from "./streams/templateBets$ForGame"
import { Document } from "../types/Document"

export type Props = {
  betsLoaded: boolean
  bets: Array<Bet & Document>
}

export interface ExternalProps {
  game: Game & Document
}

const props$ForGame = (game: Game & Document): Observable<Props> =>
  templateBets$ForGame(game).pipe(
    map(
      (bets: Array<Bet & Document>): Props => ({
        betsLoaded: true,
        bets,
      }),
    ),
    startWith({
      betsLoaded: false,
      bets: [],
    }),
  )

export const withTemplateBetsForGame = <P extends object>(
  Component: React.ComponentType<P>,
): React.ComponentType<RemoveProps<P, Props> & ExternalProps> =>
  componentFromStream(props$ => {
    const game$ = from(props$).pipe(map(props => props.game))
    const gameProps$ = game$.pipe(
      distinctUntilChanged((l, r) => l.id === r.id),
      switchMap(props$ForGame),
    )
    return combineLatest(props$, gameProps$).pipe(
      map(([props, gameProps]) => Object.assign({}, props, gameProps)),
      map((props: P) => React.createElement(Component, props)),
    )
  })
