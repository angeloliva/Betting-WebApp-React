import * as React from "react"
import { distinctUntilChanged, map, startWith, switchMap } from "rxjs/operators"
import { combineLatest, from, Observable } from "rxjs"
import { componentFromStream } from "recompose"
import { RemoveProps } from "./utils/RemoveProps"
import { Document } from "../types/Document"
import { rawBet$ForGameAndBetIDs } from "./streams/rawBet$ForGameAndBetIDs"
import { Bet } from "../types/Bet"
import { Game } from "../types/Game"

export type Props = {
  bet: (Bet & Document) | null
}

export interface ExternalProps {
  game: Game & Document
  betID: string
}

const props$ForId = (gameID: string, betID: string): Observable<Props> =>
  rawBet$ForGameAndBetIDs(gameID, betID).pipe(
    map(bet => ({
      bet,
    })),
    startWith({
      bet: null,
    }),
  )

export const withRawBet = <P extends object>(
  Component: React.ComponentType<P>,
): React.ComponentType<RemoveProps<P, Props> & ExternalProps> =>
  componentFromStream(props$ => {
    const p$ = from(props$)
    const game$ = p$.pipe(
      map(props => props.game),
      distinctUntilChanged(),
    )
    const betID$ = p$.pipe(
      map(props => props.betID),
      distinctUntilChanged(),
    )
    const betProps$ = combineLatest(game$, betID$).pipe(
      switchMap(([game, betID]) => props$ForId(game.id, betID)),
    )
    return combineLatest(props$, betProps$).pipe(
      map(([props, betProps]) => Object.assign({}, props, betProps)),
      map((props: P) => React.createElement(Component, props)),
    )
  })
