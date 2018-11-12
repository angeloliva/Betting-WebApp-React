import * as React from "react"
import { EMPTY, Observable, Subject, Subscription } from "rxjs"
import { catchError, finalize, switchMap, tap } from "rxjs/operators"
import { IconButton, MenuItem, Menu } from "@material-ui/core"
import SettingsIcon from "@material-ui/icons/Settings"
import Spinner from "../../components/Spinner"
import { withGame, Props } from "../../Commons/rx+firebase/withGame"
import { reloadTeamData } from "../../Commons/rx+firebase/actions/reloadTeamData"
import { Game } from "../../Commons/types/Game"

export interface State {
  loading: boolean
  anchorEl: HTMLElement | null
}

export class ReloadTeamsMenuItem extends React.PureComponent<Props, State> {
  onReloadTeam: (teamID: number) => any
  onReloadTeam$: Observable<any>
  subscription: Subscription
  state = {
    loading: false,
    anchorEl: null,
  }

  constructor(props: Props) {
    super(props)

    const subject = new Subject<number>()
    this.onReloadTeam = teamID => subject.next(teamID)
    this.onReloadTeam$ = subject.asObservable().pipe(
      tap(() => this.setState({ loading: true })),
      switchMap(teamID =>
        reloadTeamData(teamID).pipe(
          catchError(() => EMPTY),
          finalize(() => this.setState({ loading: false })),
        ),
      ),
    )
  }

  componentDidMount() {
    this.subscription = this.onReloadTeam$.subscribe()
  }

  componentWillUnmount() {
    this.subscription.unsubscribe()
  }

  onOpenActionMenu = (event: React.MouseEvent<HTMLElement>) =>
    this.setState({ anchorEl: event.currentTarget })
  onCloseActionMenu = () => this.setState({ anchorEl: null })

  renderIcon() {
    const { game } = this.props
    const { anchorEl, loading } = this.state
    const open = Boolean(anchorEl)
    return !game || loading ? (
      <Spinner size={25} color="secondary" />
    ) : (
      <IconButton
        aria-owns={open ? "menu-appbar" : undefined}
        aria-haspopup="true"
        onClick={this.onOpenActionMenu}
        color="inherit"
      >
        <SettingsIcon />
      </IconButton>
    )
  }

  onClick = (teamID: number) => () => {
    this.onCloseActionMenu()
    this.onReloadTeam(teamID)
  }

  renderItems(game: Game) {
    const { teams } = game
    return [
      <MenuItem onClick={this.onClick(teams.home.statsID)} key="home">
        Reload {game.teams.home.name} info
      </MenuItem>,
      <MenuItem onClick={this.onClick(teams.away.statsID)} key="away">
        Reload {game.teams.away.name} info
      </MenuItem>,
    ]
  }

  render() {
    const { game } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)
    return (
      <div>
        {this.renderIcon()}
        {game && (
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={this.onCloseActionMenu}
          >
            {this.renderItems(game)}
          </Menu>
        )}
      </div>
    )
  }
}

export default withGame(ReloadTeamsMenuItem)
