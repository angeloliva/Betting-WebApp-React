import * as React from "react"
import { createEventHandler } from "recompose"
import { EMPTY, Observable, Subscription } from "rxjs"
import { catchError, switchMap, tap } from "rxjs/operators"
import { IconButton, MenuItem, Menu } from "@material-ui/core"
import { menuItems } from "./ReloadGamesMenu.item"
import SettingsIcon from "@material-ui/icons/Settings"
import Spinner from "../../components/Spinner"
import {
  reloadGamesData,
  SearchGameParams,
} from "../../Commons/rx+firebase/actions/reloadGamesData"
import { Game } from "../../Commons/types/Game"

export interface State {
  loading: boolean
  anchorEl: HTMLElement | null
}

export class ReloadGamesMenuItem extends React.PureComponent<{}, State> {
  reloadGames$: Observable<Game[]>
  subscription: Subscription
  onReloadGames: (params: SearchGameParams) => any
  state = {
    loading: false,
    anchorEl: null,
  }

  constructor(props: {}) {
    super(props)
    const {
      stream: onReloadGames$,
      handler: onReloadGames,
    } = createEventHandler<SearchGameParams, Observable<SearchGameParams>>()
    this.onReloadGames = onReloadGames

    // on click(s) we reload the games.
    // only the "loading" state is impacted, by side effects
    this.reloadGames$ = onReloadGames$.pipe(
      switchMap(searchParams => {
        this.setState({ loading: true })
        return reloadGamesData(searchParams).pipe(
          tap({
            next: () => this.setState({ loading: false }),
            error: err => {
              alert(err)
              this.setState({ loading: false })
            },
          }),
          catchError(err => {
            if (process.env.NODE_ENV === "development") {
              console.warn("Error while reloading games:", err)
            }
            return EMPTY
          }),
        )
      }),
    )
  }

  componentDidMount() {
    this.subscription = this.reloadGames$.subscribe()
  }

  componentWillUnmount() {
    this.subscription.unsubscribe()
  }

  onOpenActionMenu = (event: React.MouseEvent<HTMLElement>) =>
    this.setState({ anchorEl: event.currentTarget })
  onCloseActionMenu = () => this.setState({ anchorEl: null })

  renderIcon() {
    const { anchorEl, loading } = this.state
    const open = Boolean(anchorEl)
    return loading ? (
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

  renderItems() {
    return menuItems.map(menuItem => {
      const { id, label, searchParams } = menuItem
      const onClick = () => {
        this.onCloseActionMenu()
        this.onReloadGames(searchParams)
      }
      return (
        <MenuItem onClick={onClick} key={id}>
          {label}
        </MenuItem>
      )
    })
  }

  render() {
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)
    return (
      <div>
        {this.renderIcon()}
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
          {this.renderItems()}
        </Menu>
      </div>
    )
  }
}
