import * as React from "react"
import { map, startWith, switchMap } from "rxjs/operators"
import { from, Observable } from "rxjs"
import { componentFromStream } from "recompose"
import { game$OrCurrentGame$ForId } from "./streams/game$OrCurrentGame$ForID"
import { Game } from "../types/Game"
import { RemoveProps } from "./utils/RemoveProps"
import { Document } from "../types/Document"

export type Props = {
  game: (Game & Document) | null
}

export interface ExternalProps {
  gameID?: string
}

const props$ForId = (gameID?: string): Observable<Props> =>
  game$OrCurrentGame$ForId(gameID).pipe(
    map(game => ({
      game,
    })),
    startWith({
      game: null,
    }),
  )

export const withGame = <P extends object>(
  Component: React.ComponentType<P>,
): React.ComponentType<RemoveProps<P, Props> & ExternalProps> =>
  componentFromStream(props$ =>
    from(props$).pipe(
      switchMap((props: ExternalProps) =>
        props$ForId(props.gameID).pipe(
          map((gameProps: Props) => ({
            ...props,
            ...gameProps,
          })),
          startWith(props),
        ),
      ),
      map((props: P) => React.createElement(Component, props)),
    ),
  )
