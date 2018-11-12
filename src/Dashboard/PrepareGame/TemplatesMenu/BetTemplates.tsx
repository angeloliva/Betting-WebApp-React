import * as React from "react"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import {
  createStyles,
  withStyles,
  WithStyles,
  Theme,
} from "@material-ui/core/styles"
import { drawerWidth } from "../../../theme"
import { PlayerWillGainYardsQuarterListItem } from "./ListItems/Quarter/PlayerWillGainYards"
import { Game } from "../../../Commons/types/Game"
import { PlayerWillRecordEventsQuarterListItem } from "./ListItems/Quarter/PlayerWillRecordEvents"
import { PlayerWillScoreTouchdownQuarterListItem } from "./ListItems/Quarter/PlayerWillScoreTouchdown"
import { TeamWillScoreQuarterListItem } from "./ListItems/Quarter/TeamWillScore"
import { TeamWillRecordDefenseQuarterListItem } from "./ListItems/Quarter/TeamWillRecordDefense"
import { PlayerWillGainYardsDriveListItem } from "./ListItems/Drive/PlayerWillGainYards"
import { PlayerWillRecordEventsDriveListItem } from "./ListItems/Drive/PlayerWillRecordEvents"
import { PlayerWillScoreTouchdownDriveListItem } from "./ListItems/Drive/PlayerWillScoreTouchdown"
import { TeamWillScoreDriveListItem } from "./ListItems/Drive/TeamWillScore"
import { TeamWillRecordDefenseDriveListItem } from "./ListItems/Drive/TeamWillRecordDefense"

export interface Props extends WithStyles<typeof styles> {
  open: boolean
  onClose: () => void
  game: Game
}

export class BetTemplates extends React.PureComponent<Props> {
  render() {
    const { game, classes, open, onClose } = this.props
    return (
      <Drawer
        classes={{
          paper: classes.drawer,
        }}
        variant="temporary"
        anchor="right"
        open={open}
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
          <List className={classes.listElements}>
            <ListItem divider>
              <ListItemText
                classes={{
                  primary: classes.listDivider,
                }}
                primary="Per Quarter bets"
              />
            </ListItem>

            <PlayerWillGainYardsQuarterListItem game={game} />
            <PlayerWillRecordEventsQuarterListItem game={game} />
            <PlayerWillScoreTouchdownQuarterListItem game={game} />
            <TeamWillScoreQuarterListItem game={game} />
            <TeamWillRecordDefenseQuarterListItem game={game} />

            <ListItem divider>
              <ListItemText
                classes={{
                  primary: classes.listDivider,
                }}
                primary="Per Drive bets"
              />
            </ListItem>

            <PlayerWillGainYardsDriveListItem game={game} />
            <PlayerWillRecordEventsDriveListItem game={game} />
            <PlayerWillScoreTouchdownDriveListItem game={game} />
            <TeamWillScoreDriveListItem game={game} />
            <TeamWillRecordDefenseDriveListItem game={game} />
          </List>
        </div>
      </Drawer>
    )
  }
}

const styles = ({ breakpoints, palette }: Theme) =>
  createStyles({
    drawer: {
      boxSizing: "border-box",
      padding: 0,
      width: drawerWidth * 1.2,
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
    logoContainer: {
      textAlign: "center",
      padding: 10,
      marginBottom: 10,
    },
    listElements: {
      flexGrow: 1,
    },
    listDivider: {
      color: palette.primary.contrastText,
      fontWeight: 700,
      textTransform: "uppercase",
    },
  })

export default withStyles(styles)(BetTemplates)
