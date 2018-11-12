import * as React from "react"
import Hidden from "@material-ui/core/Hidden"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Divider from "@material-ui/core/Divider"
import { NavLink } from "react-router-dom"
import {
  createStyles,
  withStyles,
  WithStyles,
  Theme,
} from "@material-ui/core/styles"
import { drawerWidth } from "../theme"
import logoImage from "./Logo-white.svg"
import { default as routes, RouteSpec } from "./Dashboard.routes"
import SignOutButton from "../Login/SignOutButton"

export interface Props extends WithStyles<typeof styles> {
  open: boolean
  onClose: () => void
}

export class Sidebar extends React.PureComponent<Props> {
  renderDrawer(variant: "temporary" | "permanent") {
    const { classes, open, onClose } = this.props
    const isOpened = variant === "permanent" || open
    return (
      <Drawer
        classes={{
          paper: classes.drawer,
        }}
        variant={variant}
        anchor="left"
        open={isOpened}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <div
          tabIndex={0}
          role="button"
          onClick={onClose}
          className={classes.drawerContent}
        >
          <div className={classes.logoContainer}>
            <img src={logoImage} alt="Yamble" className={classes.logo} />
          </div>
          <List className={classes.listElements}>
            {routes
              .filter(({ rootRoute }) => rootRoute)
              .map(({ path, name }: RouteSpec) => (
                <NavLink
                  exact
                  activeClassName="activeRoute"
                  to={path}
                  key={path}
                >
                  <ListItem button>
                    <ListItemText
                      classes={{
                        primary: classes.listItem,
                      }}
                      primary={name}
                    />
                  </ListItem>
                </NavLink>
              ))}
          </List>

          <Divider classes={{ root: classes.listDivider }} />

          <List className={classes.buttonContainerItem}>
            <SignOutButton />
          </List>
        </div>
      </Drawer>
    )
  }

  render() {
    return (
      <div>
        <Hidden mdUp>{this.renderDrawer("temporary")}</Hidden>
        <Hidden smDown>{this.renderDrawer("permanent")}</Hidden>
      </div>
    )
  }
}

const styles = ({ breakpoints, palette }: Theme) =>
  createStyles({
    drawer: {
      boxSizing: "border-box",
      padding: 0,
      width: drawerWidth,
      backgroundColor: palette.primary.dark,
      [breakpoints.down("sm")]: {
        boxShadow:
          "0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
      },
      [breakpoints.up("md")]: {
        border: 0,
      },
    },
    drawerContent: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    },
    logo: {
      width: drawerWidth / 2,
      height: 0.8 * (drawerWidth / 2),
    },
    logoContainer: {
      textAlign: "center",
      padding: 10,
      marginBottom: 10,
    },
    listElements: {
      flexGrow: 1,
    },
    listItem: {
      color: palette.primary.contrastText,
      textTransform: "uppercase",
      ".activeRoute &": {
        fontWeight: 700,
      },
    },
    listDivider: {
      backgroundColor: palette.primary.contrastText,
      opacity: 0.1,
    },
    buttonContainerItem: {
      display: "flex",
      justifyContent: "center",
      paddingTop: 15,
      marginBottom: 100,
    },
  })

export default withStyles(styles)(Sidebar)
