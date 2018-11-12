import * as React from "react"
import {
  createStyles,
  withStyles,
  WithStyles,
  Theme,
} from "@material-ui/core/styles"
import { drawerWidth } from "../theme"
import Sidebar from "./Sidebar"
import NavBar from "./NavBar"
import { BrowserRouter } from "react-router-dom"
import DashboardRouter from "./DashboardRouter"

export type Props = WithStyles<typeof styles>

export interface State {
  mobileOpen: boolean
}

export class Dashshboard extends React.PureComponent<Props, State> {
  state = {
    mobileOpen: false,
  }

  toggleMenu = () => this.setState(state => ({ mobileOpen: !state.mobileOpen }))

  render() {
    const { classes } = this.props
    const { mobileOpen } = this.state
    return (
      <BrowserRouter>
        <div className="root">
          <Sidebar open={mobileOpen} onClose={this.toggleMenu} />
          <div className={classes.mainPanel}>
            <NavBar onTooggleMenu={this.toggleMenu} />
            <div className={classes.content}>
              <DashboardRouter />
            </div>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

const styles = ({ breakpoints }: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    flex: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    mainPanel: {
      [breakpoints.up("md")]: {
        boxSizing: "border-box",
        width: `calc(100% - ${drawerWidth}px)`,
        minHeight: "100vh",
        overflow: "auto",
        position: "relative",
        float: "right",
      },
    },
    content: {
      padding: 30,
    },
  })

export default withStyles(styles)(Dashshboard)
