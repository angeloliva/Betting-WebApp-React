import * as React from "react"
import { map, startWith, switchMap } from "rxjs/operators"
import { combineLatest, from, Observable } from "rxjs"
import { componentFromStream } from "recompose"
import { Game } from "../types/Game"
import { RemoveProps } from "./utils/RemoveProps"
import { Document } from "../types/Document"
import { period$ForGame } from "./streams/period$ForGame"

export type Props = {
  period: number
}

export interface ExternalProps {
  game: Game & Document
}

const props$ForGame = (game: Game & Document): Observable<Props> => {
  return period$ForGame(game).pipe(
    map(period => ({
      period,
    })),
    startWith({
      period: 0,
    }),
  )
}

export const withCurrentPeriodForGame = <P extends object>(
  Component: React.ComponentType<P>,
): React.ComponentType<RemoveProps<P, Props> & ExternalProps> =>
  componentFromStream(props$ => {
    const game$ = from(props$).pipe(map(props => props.game))
    const periodProps$ = game$.pipe(switchMap(props$ForGame))
    return combineLatest(props$, periodProps$).pipe(
      map(([props, driveIDProps]) => Object.assign({}, props, driveIDProps)),
      map((props: P) => React.createElement(Component, props)),
    )
  })
