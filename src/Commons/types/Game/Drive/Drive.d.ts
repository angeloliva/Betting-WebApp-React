import { DriveStart } from "./DriveStart"
import { DriveEnd } from "./DriveEnd"
import { DriveStats } from "./DriveStats"

// Information of the drive

export interface Drive {
  // When the drive was started
  driveStart: DriveStart
  // How the drive has ended
  driveEnd: DriveEnd
  // Stats of the drive
  driveStats: DriveStats
  // Drive id (auto-incremented number)
  driveId: number
  // Team id leading the drive
  teamId: number
}
