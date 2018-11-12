import * as React from "react"
import { map, startWith, switchMap } from "rxjs/operators"
import { combineLatest, from, Observable, of } from "rxjs"
import { componentFromStream } from "recompose"
import { Game } from "../types/Game"
import { RemoveProps } from "./utils/RemoveProps"
import { TeamMember } from "../types/Team/TeamMember"
import { team$ForId } from "./streams/team$ForId"

export type Props = {
  homeTeamMembers: TeamMember[]
  awayTeamMembers: TeamMember[]
}

export interface ExternalProps {
  game: Game | null
}

const empty: Props = {
  homeTeamMembers: [],
  awayTeamMembers: [],
}

const props$ForGame = (game: Game | null): Observable<Props> => {
  if (!game) {
    return of(empty)
  }

  const { teams } = game
  const homeTeam$ = team$ForId(teams.home.statsID)
  const awayTeam$ = team$ForId(teams.away.statsID)
  return combineLatest(homeTeam$, awayTeam$).pipe(
    map(([homeTeam, awayTeam]) => ({
      homeTeamMembers: homeTeam.members || [],
      awayTeamMembers: awayTeam.members || [],
    })),
    startWith(empty),
  )
}

export const withTeamMembers = <P extends object>(
  Component: React.ComponentType<P>,
): React.ComponentType<RemoveProps<P, Props> & ExternalProps> =>
  componentFromStream(props$ =>
    from(props$).pipe(
      switchMap((props: ExternalProps) =>
        props$ForGame(props.game).pipe(
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
