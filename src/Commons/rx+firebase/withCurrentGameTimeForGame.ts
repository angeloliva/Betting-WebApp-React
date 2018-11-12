import * as React from "react"
import { distinctUntilChanged, map, switchMap } from "rxjs/operators"
import { combineLatest, from, Observable } from "rxjs"
import { componentFromStream } from "recompose"
import { Game } from "../types/Game"
import { RemoveProps } from "./utils/RemoveProps"
import { Document } from "../types/Document"
import { currentGameTimeOrPregame$ForGame } from "./streams/currentGameTimeOrPregame$ForGame"
import { GameTimeOrPre } from "../types/GameTimeOrPre"

export type Props = {
  currentGameTime: GameTimeOrPre
}

export interface ExternalProps {
  game: Game & Document
}

const props$ForGame = (game: Game & Document): Observable<Props> => {
  return currentGameTimeOrPregame$ForGame(game).pipe(
    distinctUntilChanged(),
    map(currentGameTime => ({ currentGameTime })),
  )
}

export const withCurrentGameTimeForGame = <P extends object>(
  Component: React.ComponentType<P>,
): React.ComponentType<RemoveProps<P, Props> & ExternalProps> =>
  componentFromStream(props$ => {
    const game$ = from(props$).pipe(map(props => props.game))
    const driveProps$ = game$.pipe(switchMap(props$ForGame))
    return combineLatest(props$, driveProps$).pipe(
      map(([props, driveIDProps]) => Object.assign({}, props, driveIDProps)),
      map((props: P) => React.createElement(Component, props)),
    )
  })
