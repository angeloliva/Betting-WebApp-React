import { TimeOfPossession } from "./TimeOfPossession"

export interface DriveStats {
  firstDowns: number
  isRedZone: false
  isScoringDrive: boolean
  penaltyYards: number
  plays: number
  timeOfPossession: TimeOfPossession
  yards: number
}
