import { Player } from "./Player"
import { Team } from "./Team"
import { Experience } from "./Experience"
import { City } from "./City"
import { Draft } from "./Draft"
import { Height } from "./Height"
import { Weight } from "./Weight"
import { Birth } from "./Birth"
import { College } from "./College"
import { Position } from "./Position"

export interface PlayerInformation extends Player {
  isSuspended: boolean
  isInjured: boolean
  isPhysicallyUnable: boolean
  isPracticeSquad: boolean
  isNonFootballInjuryReserve: boolean
  isExempt: boolean
  draft: Draft
  team: Team
  displayId: number
  isActive: boolean
  height: Height
  weight: Weight
  birth: Birth
  positions: Position[]
  college: College
  experience: Experience
  hometown: City
}
