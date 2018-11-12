import * as React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import Hidden from "@material-ui/core/Hidden"
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles"
import { RouteComponentProps, withRouter } from "react-router-dom"
import routes from "./Dashboard.routes"
import { ReloadGamesMenuItem } from "./UpcomingGames/ReloadGamesMenu"
import ReloadTeamsMenuItem from "./UpcomingGames/ReloadTeamsMenu"
import PauseGameMenuItem from "./UpcomingGames/PauseGameMenuItem"

export type Props = WithStyles<typeof styles> &
  RouteComponentProps<any> & {
    onTooggleMenu: () => void
  }

export interface State {
  anchorEl: HTMLElement | null
}

export class NavBar extends React.PureComponent<Props, State> {
  state = {
    anchorEl: null,
  }

  onOpenActionMenu = (event: React.MouseEvent<HTMLElement>) =>
    this.setState({ anchorEl: event.currentTarget })
  onCloseActionMenu = () => this.setState({ anchorEl: null })

  renderTitle() {
    // we lookup a route that matches the current history
    const { history, classes } = this.props
    const route = routes.find(r => history.location.pathname.startsWith(r.path))
    return route ? (
      <Typography variant="title" color="inherit" className={classes.flex}>
        {route.name}
      </Typography>
    ) : null // not found...
  }

  renderActionMenu() {
    const { history } = this.props
    if (history.location.pathname === "/upcoming") {
      return <ReloadGamesMenuItem />
    } else if (history.location.pathname.startsWith("/prepare")) {
      const gameID = history.location.pathname.slice(8)
      if (history.location.pathname === "/prepare") {
        // current game
        return [
          <PauseGameMenuItem gameID={gameID} key="pauseGame" />,
          <ReloadTeamsMenuItem key="reloadTeams" />,
        ]
      }
      return <ReloadTeamsMenuItem gameID={gameID} />
    }
    return null
  }

  render() {
    const { onTooggleMenu, classes } = this.props
    return (
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <Hidden mdUp>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={onTooggleMenu}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          {this.renderTitle()}
          {this.renderActionMenu()}
        </Toolbar>
      </AppBar>
    )
  }
}

const styles = createStyles({
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
})

export default withStyles(styles)(withRouter(NavBar))
