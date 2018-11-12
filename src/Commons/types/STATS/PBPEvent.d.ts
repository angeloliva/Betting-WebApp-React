import { Possession } from "./Possession"
import { KickType } from "./KickType"
import { PlayType } from "./PlayType"
import { PlayerInvolved } from "./PlayerInvolved"
import { RushType } from "./RushType"
import { PenaltyType } from "./PenaltyType"

export interface PBPEvent {
  playId: number
  period: number
  time: string
  down?: string | null
  distance?: string | null
  awayScoreBefore: number
  awayScoreAfter: number
  homeScoreBefore: number
  homeScoreAfter: number
  yardLine: string
  endYardLine: string
  driveId: number
  startPossession: Possession
  endPossession: Possession
  isContinuation: boolean
  kickType?: KickType | null
  isReview: boolean
  playText: string
  playType: PlayType
  playersInvolved?: Array<PlayerInvolved> | null
  direction?: string | null
  yards: number
  rushType?: RushType | null
  penaltyType?: PenaltyType | null
  reviewTeam?: string | null
}
