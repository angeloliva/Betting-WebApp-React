import * as React from "react"
import { TextField } from "@material-ui/core"
import {
  withGame,
  Props as WithGameProps,
} from "../../../../Commons/rx+firebase/withGame"
import { Bet } from "../../../../Commons/types/Bet"
import { minValue } from "../../../../Commons/validators/minValue"

export interface Props extends WithGameProps {
  bet: Bet
  onChangeBet: (bet: Bet) => any
}

const min1 = minValue(1)

class DriveIDTextField extends React.PureComponent<Props> {
  componentDidMount() {
    this.validateCurrentDriveID()
  }

  componentDidUpdate(prevProps: Props) {
    this.validateCurrentDriveID()
  }

  validateCurrentDriveID() {
    const { bet } = this.props
    const { timeframe } = bet
    const { driveId: activeDriveId } = this.activeDrive
    if (timeframe.type !== "drive") {
      return
    }

    if (activeDriveId > timeframe.sequenceNumber) {
      this.onChangeDriveID(activeDriveId)
    }
  }

  onChangeDriveID(driveID: number) {
    const { bet, onChangeBet } = this.props
    const newBet: Bet = {
      ...bet,
      timeframe: {
        type: "drive",
        sequenceNumber: driveID,
      },
    }
    onChangeBet(newBet)
  }

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { game } = this.props
    const driveID =
      parseInt(event.target.value, 10) ||
      (game && game.drive && game.drive.driveId) ||
      1
    this.onChangeDriveID(driveID)
  }

  get activeDrive() {
    // if current drive is in progress => bet on current drive
    // if current drive has ended => bet on next drive
    const { game } = this.props
    if (!game || !game.drive) {
      return {
        driveTeam: null,
        driveId: 1,
      }
    }
    const { driveId, teamId: driveTeamId } = game.drive
    const driveEnded =
      game.drive.driveEnd.yardLine.length > 0 ||
      (game.drive.driveStart.period <= 2 &&
        game.status.period === 2 &&
        game.status.seconds === 0 &&
        game.status.minutes === 0) ||
      false
    const { driveTeam, otherTeam } =
      driveTeamId === game.teams.away.statsID
        ? { driveTeam: game.teams.away, otherTeam: game.teams.home }
        : { driveTeam: game.teams.home, otherTeam: game.teams.away }
    return {
      driveTeam: driveEnded ? otherTeam : driveTeam,
      driveId: driveEnded ? driveId + 1 : driveId,
    }
  }

  render() {
    const { bet, onChangeBet } = this.props
    const {
      driveId: activeDriveId,
      driveTeam: activeDriveTeam,
    } = this.activeDrive
    const driveID =
      bet.timeframe.type === "drive"
        ? bet.timeframe.sequenceNumber > 0
          ? bet.timeframe.sequenceNumber
          : activeDriveId
        : activeDriveId
    const error = min1(driveID)
    const label =
      `Drive number (current drive is ${activeDriveId} by ` +
      `${activeDriveTeam && activeDriveTeam.shortName}):`
    return (
      <TextField
        fullWidth
        id="quantity"
        label={label}
        value={driveID}
        error={Boolean(error)}
        helperText={error}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onChangeBet(
            Object.assign({}, bet, {
              timeframe: {
                type: "drive",
                sequenceNumber:
                  parseInt(event.target.value, 10) || this.activeDrive.driveId,
              },
            }),
          )
        }
      />
    )
  }
}

export default withGame(DriveIDTextField)
